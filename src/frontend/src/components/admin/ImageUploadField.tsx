import { useFileUpload, useFileUrl } from "@/blob-storage/FileStorage";
import { Button } from "@/components/ui/button";
import { ImageIcon, Loader2, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/svg+xml",
];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

interface ImageUploadFieldProps {
  imageKey: string | undefined;
  onImageKeyChange: (key: string | undefined) => void;
  /** Folder prefix for the storage path, e.g. "apartments" */
  folder: string;
  label?: string;
  /** Additional accepted mime types beyond the default image set */
  extraAccept?: string[];
}

function ImagePreview({ imageKey }: { imageKey: string }) {
  const { data: url, isLoading } = useFileUrl(imageKey);

  if (isLoading) {
    return (
      <div className="flex h-24 w-full items-center justify-center rounded-md border border-[#e2e5eb] bg-[#f7f8fa]">
        <Loader2 className="h-5 w-5 animate-spin text-luxury-gold" />
      </div>
    );
  }

  if (!url) return null;

  return (
    <img
      src={url}
      alt="Preview"
      className="h-24 w-full rounded-md object-cover border border-[#e2e5eb]"
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}

export function ImageUploadField({
  imageKey,
  onImageKeyChange,
  folder,
  label = "Image (optional)",
  extraAccept = [],
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFile, isUploading } = useFileUpload();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const acceptedTypes = [...ACCEPTED_IMAGE_TYPES, ...extraAccept];
  const acceptAttr = [
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".svg",
    ...extraAccept.map((t) => `.${t.split("/")[1]}`),
  ].join(",");

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    // Validate file type — check both MIME and extension for SVGs which report blank MIME
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    const isSvg = ext === "svg" || file.type === "image/svg+xml";
    if (!isSvg && !acceptedTypes.includes(file.type)) {
      const msg = `Unsupported file type: ${file.type || ext}. Please use PNG, JPG, or WEBP.`;
      setError(msg);
      toast.error(msg);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      const msg = `File too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum size is 10 MB.`;
      setError(msg);
      toast.error(msg);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const uniqueName = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    try {
      setUploadProgress(0);
      const result = await uploadFile(uniqueName, file, (pct) =>
        setUploadProgress(pct),
      );
      onImageKeyChange(result.path);
      toast.success("Image uploaded successfully");
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Upload failed. Please try again.";
      setError(msg);
      toast.error(`Upload failed: ${msg}`);
    } finally {
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <span className="text-sm font-medium text-[#1a1d23]">{label}</span>

      {imageKey ? (
        <div className="space-y-2">
          <ImagePreview imageKey={imageKey} />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setError(null);
              onImageKeyChange(undefined);
            }}
            className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="mr-1 h-3 w-3" />
            Remove image
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => {
            setError(null);
            fileInputRef.current?.click();
          }}
          disabled={isUploading}
          className="admin-upload-zone flex w-full flex-col items-center justify-center gap-2 py-5 disabled:cursor-not-allowed disabled:opacity-50"
          data-ocid="image-upload-area"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin text-luxury-gold" />
              <span className="text-xs text-luxury-gold">
                Uploading {uploadProgress}%
              </span>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 text-[#96a0b5]">
                <Upload className="h-4 w-4" />
                <ImageIcon className="h-4 w-4" />
              </div>
              <span className="text-xs text-[#96a0b5]">
                Click to upload .png, .jpg, .webp, .svg
              </span>
            </>
          )}
        </button>
      )}

      {error && (
        <p className="text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded px-2 py-1">
          {error}
        </p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptAttr}
        className="hidden"
        onChange={handleFileSelect}
        data-ocid="image-file-input"
      />
    </div>
  );
}
