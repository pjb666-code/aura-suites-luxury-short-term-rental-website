import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Upload, Save } from 'lucide-react';
import { toast } from 'sonner';
import { useFileUpload } from '@/blob-storage/FileStorage';
import { useDraftSiteConfig, useUpdateAboutSection } from '@/hooks/useQueries';
import type { AboutSection } from '@/backend';

export default function AboutAdmin() {
  const { uploadFile, isUploading } = useFileUpload();
  const { data: siteConfig, isLoading: configLoading } = useDraftSiteConfig();
  const { mutate: updateSection, isPending: updating } = useUpdateAboutSection();

  const [title, setTitle] = useState('About Aura Suites');
  const [content, setContent] = useState('Experience luxury living and exquisite art in the heart of the city.');
  const [image, setImage] = useState('');
  const [textColor, setTextColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (siteConfig?.aboutSection) {
      const section = siteConfig.aboutSection;
      setTitle(section.title || 'About Aura Suites');
      setContent(section.content || 'Experience luxury living and exquisite art in the heart of the city.');
      setImage(section.image || '');
      setTextColor(section.textColor || '#000000');
      setBackgroundColor(section.backgroundColor || '#FFFFFF');
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
      const path = `about/image-${Date.now()}.${selectedFile.name.split('.').pop()}`;
      const { url } = await uploadFile(path, selectedFile);
      setImage(url);
      toast.success('Image uploaded successfully');
      setSelectedFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    }
  };

  const handleSave = () => {
    if (!siteConfig?.aboutSection) return;

    const updatedSection: AboutSection = {
      title,
      content,
      image,
      textColor,
      backgroundColor,
      layout: siteConfig.aboutSection.layout,
    };

    updateSection(updatedSection, {
      onSuccess: () => {
        toast.success('About section updated successfully in draft');
      },
      onError: (error) => {
        console.error('Failed to update about section:', error);
        toast.error('Failed to update about section');
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
          <CardTitle className="text-white">About Section Content</CardTitle>
          <CardDescription className="text-white/70">
            Customize the about section content and imagery
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Section Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">Section Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="About Aura Suites"
              className="border-luxury-gold/30 bg-white/5 text-white"
            />
          </div>

          {/* Side Image */}
          <div className="space-y-4">
            <Label className="text-white">Side Image</Label>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="relative aspect-square overflow-hidden rounded-lg border border-luxury-gold/30 bg-muted">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                  ) : image ? (
                    <img
                      src={image}
                      alt="Current image"
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
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="/assets/generated/curated-living-space.jpg"
                  className="border-luxury-gold/30 bg-white/5 text-white"
                />
                <p className="text-xs text-white/60">
                  Use uploaded image URL or path from /assets/ directory
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content" className="text-white">Content Text</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter about section content..."
              rows={6}
              className="border-luxury-gold/30 bg-white/5 text-white"
            />
            <p className="text-xs text-white/60">
              Use line breaks to separate paragraphs
            </p>
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
              <Label htmlFor="backgroundColor" className="text-white">Background Color</Label>
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
          <CardDescription className="text-white/70">See how your about section will look</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 rounded-lg p-6" style={{ backgroundColor }}>
            <div className="text-center">
              <h2 className="mb-4 font-serif text-3xl font-light" style={{ color: textColor }}>{title}</h2>
              <div className="mx-auto h-1 w-24 bg-luxury-gold" />
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {image && (
                <div className="overflow-hidden rounded-lg">
                  <img src={image} alt="About" className="h-full w-full object-cover" />
                </div>
              )}
              <div className={`space-y-4 text-sm ${!image ? 'md:col-span-2' : ''}`}>
                {content.split('\n').map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} style={{ color: textColor, opacity: 0.85 }}>
                      {paragraph}
                    </p>
                  )
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
