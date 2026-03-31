import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Loader2, Upload, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useDraftSiteConfig, useUploadLogo, useSetLogoDisplayLocation, useSetLogoSize } from '@/hooks/useQueries';
import { useFileUpload, useFileUrl } from '@/blob-storage/FileStorage';
import { LogoDisplayLocation } from '@/backend';

export default function LogoAdmin() {
  const { data: siteConfig, isLoading: configLoading } = useDraftSiteConfig();
  const uploadLogo = useUploadLogo();
  const setLogoDisplayLocation = useSetLogoDisplayLocation();
  const setLogoSize = useSetLogoSize();
  const { uploadFile, isUploading } = useFileUpload();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [localLogoSize, setLocalLogoSize] = useState<number>(100);

  const isUploadedLogo = siteConfig?.logoPath?.startsWith('logos/');
  const { data: uploadedLogoUrl } = useFileUrl(isUploadedLogo ? (siteConfig?.logoPath || '') : '');

  const currentLogoUrl = isUploadedLogo && uploadedLogoUrl
    ? uploadedLogoUrl
    : siteConfig?.logoPath 
      ? `/assets/${siteConfig.logoPath}` 
      : null;

  useEffect(() => {
    if (siteConfig?.logoSize) {
      setLocalLogoSize(Number(siteConfig.logoSize));
    }
  }, [siteConfig?.logoSize]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please select a valid image file (PNG, JPEG, or SVG)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setSelectedFile(file);
    
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const blobUrl = URL.createObjectURL(file);
    setPreviewUrl(blobUrl);
  };

  const createPlaceholder = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      img.onload = () => {
        const scale = 0.1;
        canvas.width = Math.max(20, img.width * scale);
        canvas.height = Math.max(20, img.height * scale);
        
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'low';
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          canvas.toBlob((blob) => {
            if (blob) {
              const placeholderFile = new File([blob], 'placeholder.jpg', { 
                type: 'image/jpeg',
                lastModified: Date.now()
              });
              resolve(placeholderFile);
            } else {
              reject(new Error('Failed to create placeholder'));
            }
          }, 'image/jpeg', 0.5);
        } else {
          reject(new Error('Canvas context not available'));
        }
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file first');
      return;
    }

    try {
      const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase() || 'png';
      const timestamp = Date.now();
      
      const logoPath = `logos/logo-${timestamp}.${fileExtension}`;
      await uploadFile(logoPath, selectedFile);

      let placeholderPath = logoPath;
      if (fileExtension !== 'svg') {
        try {
          const placeholderFile = await createPlaceholder(selectedFile);
          placeholderPath = `logos/logo-${timestamp}-placeholder.jpg`;
          await uploadFile(placeholderPath, placeholderFile);
        } catch (error) {
          console.warn('Failed to create placeholder, using original:', error);
        }
      }

      await uploadLogo.mutateAsync({ logoPath, placeholderPath });

      toast.success('Logo uploaded successfully to draft');
      
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setSelectedFile(null);
      setPreviewUrl(null);
      
      const fileInput = document.getElementById('logo-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error('Logo upload error:', error);
      toast.error('Failed to upload logo. Please try again.');
    }
  };

  const handleCancel = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    const fileInput = document.getElementById('logo-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleDisplayLocationChange = async (value: string) => {
    try {
      const location = value as LogoDisplayLocation;
      await setLogoDisplayLocation.mutateAsync(location);
      toast.success('Logo display location updated in draft');
    } catch (error) {
      console.error('Failed to update logo display location:', error);
      toast.error('Failed to update logo display location');
    }
  };

  const handleLogoSizeChange = (value: number[]) => {
    setLocalLogoSize(value[0]);
  };

  const handleLogoSizeCommit = async () => {
    try {
      await setLogoSize.mutateAsync(BigInt(localLogoSize));
      toast.success('Logo size updated in draft');
    } catch (error) {
      console.error('Failed to update logo size:', error);
      toast.error('Failed to update logo size');
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
          <CardTitle>Site Logo (Draft)</CardTitle>
          <CardDescription>
            Upload and manage the site logo - changes saved to draft until published
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="mb-2 block">Current Logo</Label>
            {currentLogoUrl ? (
              <div className="flex items-center justify-center rounded-lg border border-border bg-muted p-8">
                <img
                  src={currentLogoUrl}
                  alt="Current site logo"
                  className="h-auto w-auto object-contain"
                  style={{ maxHeight: '8rem', maxWidth: '100%' }}
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    console.error('Failed to load logo image');
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-lg border border-dashed border-border bg-muted p-8">
                <div className="text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">No logo uploaded</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <Label htmlFor="logo-upload">Upload New Logo</Label>
            <Input
              id="logo-upload"
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/svg+xml"
              onChange={handleFileSelect}
              disabled={isUploading || uploadLogo.isPending}
            />
            <p className="text-xs text-muted-foreground">
              Supported formats: PNG, JPEG, SVG. Max size: 5MB. Transparent backgrounds recommended for PNG. 
              A low-resolution placeholder will be automatically generated for faster initial loading.
            </p>
          </div>

          {previewUrl && (
            <div>
              <Label className="mb-2 block">Preview</Label>
              <div className="flex items-center justify-center rounded-lg border border-border bg-muted p-8">
                <img
                  src={previewUrl}
                  alt="Logo preview"
                  className="h-auto w-auto object-contain"
                  style={{ maxHeight: '8rem', maxWidth: '100%' }}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          )}

          {selectedFile && (
            <div className="flex gap-3">
              <Button
                onClick={handleUpload}
                disabled={isUploading || uploadLogo.isPending}
                className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
              >
                {isUploading || uploadLogo.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
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
              >
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Logo Display Location</CardTitle>
          <CardDescription>
            Choose where the logo should be displayed on the site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={siteConfig?.logoDisplayLocation || LogoDisplayLocation.header}
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

      <Card>
        <CardHeader>
          <CardTitle>Logo Size</CardTitle>
          <CardDescription>
            Adjust the size of the logo in the header (height in pixels)
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
              Recommended range: 60-120px. The logo will maintain its aspect ratio.
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
                    maxWidth: `${localLogoSize * 2}px`
                  }}
                  loading="eager"
                  decoding="async"
                  onError={(e) => {
                    console.error('Failed to load logo preview');
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
