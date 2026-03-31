import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Upload, Save } from 'lucide-react';
import { toast } from 'sonner';
import { useFileUpload } from '@/blob-storage/FileStorage';
import { useDraftSiteConfig, useUpdateHeroSection } from '@/hooks/useQueries';
import type { HeroSection } from '@/backend';

export default function HeroAdmin() {
  const { uploadFile, isUploading } = useFileUpload();
  const { data: siteConfig, isLoading: configLoading } = useDraftSiteConfig();
  const { mutate: updateSection, isPending: updating } = useUpdateHeroSection();

  const [title, setTitle] = useState('Welcome to Aura Suites');
  const [subtitle, setSubtitle] = useState('Luxury Apartments & Art Collection');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [backgroundColor, setBackgroundColor] = useState('#000000');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (siteConfig?.heroSection) {
      const section = siteConfig.heroSection;
      setTitle(section.title || 'Welcome to Aura Suites');
      setSubtitle(section.subtitle || 'Luxury Apartments & Art Collection');
      setBackgroundImage(section.backgroundImage || '');
      setTextColor(section.textColor || '#FFFFFF');
      setBackgroundColor(section.backgroundColor || '#000000');
    }
  }, [siteConfig]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select an image first');
      return;
    }

    try {
      const path = `hero/background-${Date.now()}.${selectedFile.name.split('.').pop()}`;
      const { url } = await uploadFile(path, selectedFile);
      setBackgroundImage(url);
      toast.success('Image uploaded successfully');
      setSelectedFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    }
  };

  const handleSave = () => {
    if (!siteConfig?.heroSection) return;

    const updatedSection: HeroSection = {
      title,
      subtitle,
      backgroundImage,
      textColor,
      backgroundColor,
      layout: siteConfig.heroSection.layout,
    };

    updateSection(updatedSection, {
      onSuccess: () => {
        toast.success('Hero section updated successfully in draft');
      },
      onError: (error) => {
        console.error('Failed to update hero section:', error);
        toast.error('Failed to update hero section');
      },
    });
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
      <Card className="border-luxury-gold/20 bg-luxury-dark/50">
        <CardHeader>
          <CardTitle className="text-white">Hero Section Content</CardTitle>
          <CardDescription className="text-white/70">
            Customize the main hero section that appears at the top of your homepage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Background Image */}
          <div className="space-y-4">
            <Label className="text-white">Background Image</Label>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="relative aspect-video overflow-hidden rounded-lg border border-luxury-gold/30 bg-muted">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                  ) : backgroundImage ? (
                    <img
                      src={backgroundImage}
                      alt="Current background"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-white/50">
                      No image selected
                    </div>
                  )}
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="cursor-pointer border-luxury-gold/30 bg-white/5 text-white"
                />
                {selectedFile && (
                  <Button
                    onClick={handleImageUpload}
                    disabled={isUploading}
                    className="w-full bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
                    variant="outline"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                      </>
                    )}
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="text-white">Or enter image URL</Label>
                <Input
                  id="imageUrl"
                  value={backgroundImage}
                  onChange={(e) => setBackgroundImage(e.target.value)}
                  placeholder="/assets/generated/hero-apartment-interior.jpg"
                  className="border-luxury-gold/30 bg-white/5 text-white"
                />
                <p className="text-xs text-white/60">
                  Use uploaded image URL or path from /assets/ directory
                </p>
              </div>
            </div>
          </div>

          {/* Main Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">Main Title</Label>
            <Textarea
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter main title..."
              rows={2}
              className="border-luxury-gold/30 bg-white/5 text-white"
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-2">
            <Label htmlFor="subtitle" className="text-white">Subtitle</Label>
            <Textarea
              id="subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Enter subtitle..."
              rows={2}
              className="border-luxury-gold/30 bg-white/5 text-white"
            />
          </div>

          {/* Colors */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="textColor" className="text-white">Text Color</Label>
              <div className="flex gap-2">
                <Input
                  id="textColor"
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="h-10 w-20 cursor-pointer border-luxury-gold/30 bg-white/5"
                />
                <Input
                  type="text"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="flex-1 border-luxury-gold/30 bg-white/5 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="backgroundColor" className="text-white">Overlay Color</Label>
              <div className="flex gap-2">
                <Input
                  id="backgroundColor"
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="h-10 w-20 cursor-pointer border-luxury-gold/30 bg-white/5"
                />
                <Input
                  type="text"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="flex-1 border-luxury-gold/30 bg-white/5 text-white"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <Button 
              onClick={handleSave} 
              disabled={updating}
              className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
            >
              {updating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview Card */}
      <Card className="border-luxury-gold/20 bg-luxury-dark/50">
        <CardHeader>
          <CardTitle className="text-white">Live Preview</CardTitle>
          <CardDescription className="text-white/70">See how your hero section will look</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-video overflow-hidden rounded-lg">
            {backgroundImage ? (
              <img
                src={backgroundImage}
                alt="Hero preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gray-800" />
            )}
            <div 
              className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"
              style={{ backgroundColor: `${backgroundColor}40` }}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <h1 className="mb-4 font-serif text-2xl font-light md:text-4xl" style={{ color: textColor }}>
                {title}
              </h1>
              <p className="mb-6 text-sm md:text-base" style={{ color: textColor, opacity: 0.9 }}>
                {subtitle}
              </p>
              <Button className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90">
                Book Your Stay
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
