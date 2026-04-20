import { LogoDisplayLocation } from "@/backend";
import { useFileUpload, useFileUrl } from "@/blob-storage/FileStorage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import {
  useDraftSiteConfig,
  useSetLogoDisplayLocation,
  useSetLogoSize,
  useUploadLogo,
} from "@/hooks/useQueries";
import { Image as ImageIcon, Loader2, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const ACCEPTED_LOGO_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/svg+xml",
  // some browsers report empty MIME for SVG — handle by extension
];
const MAX_LOGO_SIZE = 5 * 1024 * 1024;

export default function LogoAdmin() {
  const { data: siteConfig, isLoading: configLoading } = useDraftSiteConfig();
  const uploadLogo = useUploadLogo();
  const setLogoDisplayLocation = useSetLogoDisplayLocation();
  const setLogoSize = useSetLogoSize();
  const { uploadFile, isUploading } = useFileUpload();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [localLogoSize, setLocalLogoSize] = useState<number>(100);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const isUploadedLogo = siteConfig?.logoPath?.startsWith("logos/");
  const { data: uploadedLogoUrl } = useFileUrl(
    isUploadedLogo ? siteConfig?.logoPath || "" : "",
  );

  const currentLogoUrl =
    isUploadedLogo && uploadedLogoUrl
      ? uploadedLogoUrl
      : siteConfig?.logoPath
        ? `/assets/${siteConfig.logoPath}`
        : null;

  useEffect(() => {
    if (siteConfig?.logoSize) {
      setLocalLogoSize(Number(siteConfig.logoSize));
    }
  }, [siteConfig?.logoSize]);

  // Cleanup object URL on unmount or when previewUrl changes
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    const isSvg = ext === "svg" || file.type === "image/svg+xml";
    // Allow empty MIME for SVG (common in some browsers/OS)
    if (!isSvg && !ACCEPTED_LOGO_TYPES.includes(file.type)) {
      const msg = `Unsupported file type "${file.type || ext}". Please use PNG, JPG, or SVG.`;
      setUploadError(msg);
      toast.error(msg);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (file.size > MAX_LOGO_SIZE) {
      const msg = `File size is ${(file.size / 1024 / 1024).toFixed(1)} MB — maximum is 5 MB.`;
      setUploadError(msg);
      toast.error(msg);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    setUploadError(null);

    try {
      const ext = selectedFile.name.split(".").pop()?.toLowerCase() || "png";
      const timestamp = Date.now();
      const logoPath = `logos/logo-${timestamp}.${ext}`;

      await uploadFile(logoPath, selectedFile);

      // For non-SVG logos, generate a small placeholder thumbnail for fast initial load
      let placeholderPath = logoPath;
      if (ext !== "svg") {
        try {
          const placeholderFile = await createThumbnail(selectedFile);
          if (placeholderFile) {
            placeholderPath = `logos/logo-${timestamp}-thumb.jpg`;
            await uploadFile(placeholderPath, placeholderFile);
          }
        } catch {
          // Thumbnail generation is best-effort; continue with original
        }
      }

      await uploadLogo.mutateAsync({ logoPath, placeholderPath });

      toast.success("Logo uploaded successfully!");

      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setSelectedFile(null);
      setPreviewUrl(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Upload failed. Please try again.";
      setUploadError(msg);
      toast.error(`Logo upload failed: ${msg}`);
      console.error("Logo upload error:", err);
    }
  };

  const handleCancel = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDisplayLocationChange = async (value: string) => {
    try {
      await setLogoDisplayLocation.mutateAsync(value as LogoDisplayLocation);
      toast.success("Logo display location updated");
    } catch (err) {
      console.error("Failed to update logo display location:", err);
      toast.error("Failed to update logo display location");
    }
  };

  const handleLogoSizeChange = (value: number[]) => {
    setLocalLogoSize(value[0]);
  };

  const handleLogoSizeCommit = async () => {
    try {
      await setLogoSize.mutateAsync(BigInt(localLogoSize));
      toast.success("Logo size updated");
    } catch (err) {
      console.error("Failed to update logo size:", err);
      toast.error("Failed to update logo size");
    }
  };

  if (configLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-luxury-gold" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Site Logo</CardTitle>
          <CardDescription>
            Upload your logo (PNG, JPG, or SVG). Changes are saved to draft
            until you publish.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current logo preview */}
          <div>
            <Label className="mb-2 block">Current Logo</Label>
            {currentLogoUrl ? (
              <div className="flex items-center justify-center rounded-lg border border-border bg-muted p-8">
                <img
                  src={currentLogoUrl}
                  alt="Current site logo"
                  className="h-auto w-auto object-contain"
                  style={{ maxHeight: "8rem", maxWidth: "100%" }}
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    console.warn("Logo preview failed to load");
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-lg border border-dashed border-border bg-muted p-8">
                <div className="text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    No logo uploaded
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* File picker */}
          <div className="space-y-2">
            <Label htmlFor="logo-upload">Upload New Logo</Label>
            <Input
              id="logo-upload"
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/svg+xml,.png,.jpg,.jpeg,.svg"
              onChange={handleFileSelect}
              disabled={isUploading || uploadLogo.isPending}
            />
            <p className="text-xs text-muted-foreground">
              Supported: PNG, JPEG, SVG · Max 5 MB · Transparent PNG recommended
            </p>
          </div>

          {/* Error message — always visible in red */}
          {uploadError && (
            <div className="rounded-md border border-red-400/40 bg-red-50 px-3 py-2">
              <p className="text-sm font-medium text-red-600">{uploadError}</p>
            </div>
          )}

          {/* Local preview */}
          {previewUrl && (
            <div>
              <Label className="mb-2 block">Preview</Label>
              <div className="flex items-center justify-center rounded-lg border border-border bg-muted p-8">
                <img
                  src={previewUrl}
                  alt="Logo preview"
                  className="h-auto w-auto object-contain"
                  style={{ maxHeight: "8rem", maxWidth: "100%" }}
                />
              </div>
            </div>
          )}

          {/* Action buttons */}
          {selectedFile && (
            <div className="flex gap-3">
              <Button
                onClick={handleUpload}
                disabled={isUploading || uploadLogo.isPending}
                className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
                data-ocid="logo-upload-button"
              >
                {isUploading || uploadLogo.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading…
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Logo
                  </>
                )}
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                disabled={isUploading || uploadLogo.isPending}
                data-ocid="logo-cancel-button"
              >
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Display location */}
      <Card>
        <CardHeader>
          <CardTitle>Logo Display Location</CardTitle>
          <CardDescription>
            Choose where the logo should be displayed on the site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={
              siteConfig?.logoDisplayLocation || LogoDisplayLocation.header
            }
            onValueChange={handleDisplayLocationChange}
            disabled={setLogoDisplayLocation.isPending}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={LogoDisplayLocation.header} id="header" />
              <Label htmlFor="header" className="cursor-pointer">
                Header only (top left corner)
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={LogoDisplayLocation.footer} id="footer" />
              <Label htmlFor="footer" className="cursor-pointer">
                Footer only
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={LogoDisplayLocation.both} id="both" />
              <Label htmlFor="both" className="cursor-pointer">
                Both header and footer
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Logo size */}
      <Card>
        <CardHeader>
          <CardTitle>Logo Size</CardTitle>
          <CardDescription>
            Adjust the logo height in the header (pixels)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Logo Height</Label>
              <span className="text-sm font-medium text-muted-foreground">
                {localLogoSize}px
              </span>
            </div>
            <Slider
              value={[localLogoSize]}
              onValueChange={handleLogoSizeChange}
              onValueCommit={handleLogoSizeCommit}
              min={40}
              max={200}
              step={5}
              className="w-full"
              disabled={setLogoSize.isPending}
            />
            <p className="text-xs text-muted-foreground">
              Recommended: 60–120 px. The logo maintains its aspect ratio.
            </p>
          </div>

          {currentLogoUrl && (
            <div>
              <Label className="mb-2 block">Size Preview</Label>
              <div className="flex items-center justify-start rounded-lg border border-border bg-muted p-8">
                <img
                  src={currentLogoUrl}
                  alt="Logo size preview"
                  className="h-auto w-auto object-contain"
                  style={{
                    maxHeight: `${localLogoSize}px`,
                    maxWidth: `${localLogoSize * 3}px`,
                  }}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/** Creates a small 10% thumbnail JPEG for fast initial load */
async function createThumbnail(file: File): Promise<File | null> {
  return new Promise((resolve) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const scale = 0.1;
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(20, Math.round(img.width * scale));
      canvas.height = Math.max(20, Math.round(img.height * scale));
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(null);
        return;
      }
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "low";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(null);
            return;
          }
          resolve(
            new File([blob], "thumb.jpg", {
              type: "image/jpeg",
              lastModified: Date.now(),
            }),
          );
        },
        "image/jpeg",
        0.5,
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(null);
    };

    img.src = objectUrl;
  });
}
