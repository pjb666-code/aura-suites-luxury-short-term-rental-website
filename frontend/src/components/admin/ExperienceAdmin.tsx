import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Loader2, Upload, Save, Plus, Trash2, GripVertical, X } from 'lucide-react';
import { toast } from 'sonner';
import { useFileUpload } from '@/blob-storage/FileStorage';
import { useDraftSiteConfig, useUpdateExperiencePage } from '@/hooks/useQueries';
import { LayoutOption } from '@/backend';
import type { ExperiencePage, Highlight, ExperienceSection } from '@/backend';

const iconOptions = [
  { value: 'star', label: 'Star' },
  { value: 'award', label: 'Award' },
  { value: 'heart', label: 'Heart' },
  { value: 'zap', label: 'Zap' },
  { value: 'mapPin', label: 'Map Pin' },
  { value: 'music', label: 'Music' },
  { value: 'utensils', label: 'Utensils' },
  { value: 'sparkles', label: 'Sparkles' },
];

export default function ExperienceAdmin() {
  const { uploadFile, isUploading } = useFileUpload();
  const { data: siteConfig, isLoading: configLoading } = useDraftSiteConfig();
  const { mutate: updatePage, isPending: updating } = useUpdateExperiencePage();

  const [pageTitle, setPageTitle] = useState('The Aura Experience');
  const [pageDescription, setPageDescription] = useState('More than just accommodation – a world-class lifestyle experience');
  const [textColor, setTextColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [sections, setSections] = useState<ExperienceSection[]>([]);
  
  const [editingHighlight, setEditingHighlight] = useState<string | null>(null);
  const [editingSection, setEditingSection] = useState<string | null>(null);

  useEffect(() => {
    if (siteConfig?.experiencePage) {
      const page = siteConfig.experiencePage;
      setPageTitle(page.title || 'The Aura Experience');
      setPageDescription(page.description || 'More than just accommodation – a world-class lifestyle experience');
      setTextColor(page.textColor || '#000000');
      setBackgroundColor(page.backgroundColor || '#FFFFFF');
      setHighlights(page.highlights || []);
      setSections(page.sections || []);
    }
  }, [siteConfig]);

  const handleAddHighlight = () => {
    const newHighlight: Highlight = {
      id: `highlight-${Date.now()}`,
      title: 'New Highlight',
      icon: 'star',
      description: 'Description',
      isActive: true,
    };
    setHighlights([...highlights, newHighlight]);
    setEditingHighlight(newHighlight.id);
  };

  const handleUpdateHighlight = (id: string, field: keyof Highlight, value: any) => {
    setHighlights(highlights.map(h => h.id === id ? { ...h, [field]: value } : h));
  };

  const handleDeleteHighlight = (id: string) => {
    setHighlights(highlights.filter(h => h.id !== id));
  };

  const handleAddSection = () => {
    const newSection: ExperienceSection = {
      id: `section-${Date.now()}`,
      title: 'New Experience',
      description: 'Description of this experience',
      images: [],
      videos: [],
      isActive: true,
      order: BigInt(sections.length),
      animationType: 'fadeInScale',
      layout: LayoutOption.grid,
    };
    setSections([...sections, newSection]);
    setEditingSection(newSection.id);
  };

  const handleUpdateSection = (id: string, field: keyof ExperienceSection, value: any) => {
    setSections(sections.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleDeleteSection = (id: string) => {
    setSections(sections.filter(s => s.id !== id));
  };

  const handleImageUpload = async (sectionId: string, file: File) => {
    try {
      const path = `experience/${Date.now()}-${file.name}`;
      const { url } = await uploadFile(path, file);
      
      setSections(sections.map(s => 
        s.id === sectionId 
          ? { ...s, images: [...s.images, url] }
          : s
      ));
      
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    }
  };

  const handleVideoUpload = async (sectionId: string, file: File) => {
    try {
      const path = `experience/videos/${Date.now()}-${file.name}`;
      const { url } = await uploadFile(path, file);
      
      setSections(sections.map(s => 
        s.id === sectionId 
          ? { ...s, videos: [...s.videos, url] }
          : s
      ));
      
      toast.success('Video uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload video');
    }
  };

  const handleRemoveImage = (sectionId: string, imageUrl: string) => {
    setSections(sections.map(s => 
      s.id === sectionId 
        ? { ...s, images: s.images.filter(img => img !== imageUrl) }
        : s
    ));
  };

  const handleRemoveVideo = (sectionId: string, videoUrl: string) => {
    setSections(sections.map(s => 
      s.id === sectionId 
        ? { ...s, videos: s.videos.filter(vid => vid !== videoUrl) }
        : s
    ));
  };

  const handleReorderSections = (fromIndex: number, toIndex: number) => {
    const reordered = [...sections];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    
    // Update order values
    const updated = reordered.map((s, idx) => ({ ...s, order: BigInt(idx) }));
    setSections(updated);
  };

  const handleSave = () => {
    if (!siteConfig?.experiencePage) return;

    const updatedPage: ExperiencePage = {
      title: pageTitle,
      description: pageDescription,
      backgroundImage: siteConfig.experiencePage.backgroundImage,
      cardStyle: siteConfig.experiencePage.cardStyle,
      textColor: textColor,
      backgroundColor: backgroundColor,
      layout: siteConfig.experiencePage.layout,
      highlights: highlights,
      sections: sections,
    };

    updatePage(updatedPage, {
      onSuccess: () => {
        toast.success('Experience page updated successfully in draft');
      },
      onError: (error) => {
        console.error('Failed to update experience page:', error);
        toast.error('Failed to update experience page');
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
      {/* Page Settings */}
      <Card className="border-luxury-gold/20 bg-luxury-dark/50">
        <CardHeader>
          <CardTitle className="text-white">Page Settings</CardTitle>
          <CardDescription className="text-white/70">
            Configure the main experience page title, description, and colors
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="pageTitle" className="text-white">Page Title</Label>
            <Input
              id="pageTitle"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              placeholder="The Aura Experience"
              className="border-luxury-gold/30 bg-white/5 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pageDescription" className="text-white">Page Description</Label>
            <Textarea
              id="pageDescription"
              value={pageDescription}
              onChange={(e) => setPageDescription(e.target.value)}
              placeholder="More than just accommodation..."
              rows={2}
              className="border-luxury-gold/30 bg-white/5 text-white"
            />
          </div>

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
        </CardContent>
      </Card>

      {/* Highlights Management */}
      <Card className="border-luxury-gold/20 bg-luxury-dark/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Highlights</CardTitle>
              <CardDescription className="text-white/70">
                Quick facts or key features displayed at the top of the page
              </CardDescription>
            </div>
            <Button 
              onClick={handleAddHighlight}
              className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Highlight
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {highlights.map((highlight) => (
            <Card key={highlight.id} className="border-luxury-gold/20 bg-luxury-dark/30">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={highlight.isActive}
                      onCheckedChange={(checked) => handleUpdateHighlight(highlight.id, 'isActive', checked)}
                    />
                    <Label className="text-white">Active</Label>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteHighlight(highlight.id)}
                    className="text-red-400 hover:bg-red-400/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-white">Title</Label>
                    <Input
                      value={highlight.title}
                      onChange={(e) => handleUpdateHighlight(highlight.id, 'title', e.target.value)}
                      className="border-luxury-gold/30 bg-white/5 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Icon</Label>
                    <Select
                      value={highlight.icon}
                      onValueChange={(value) => handleUpdateHighlight(highlight.id, 'icon', value)}
                    >
                      <SelectTrigger className="border-luxury-gold/30 bg-white/5 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Description</Label>
                  <Textarea
                    value={highlight.description}
                    onChange={(e) => handleUpdateHighlight(highlight.id, 'description', e.target.value)}
                    rows={2}
                    className="border-luxury-gold/30 bg-white/5 text-white"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          {highlights.length === 0 && (
            <p className="text-center text-white/60 py-8">No highlights added yet. Click "Add Highlight" to create one.</p>
          )}
        </CardContent>
      </Card>

      {/* Experience Sections Management */}
      <Card className="border-luxury-gold/20 bg-luxury-dark/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Experience Sections</CardTitle>
              <CardDescription className="text-white/70">
                Expandable sections with images and videos
              </CardDescription>
            </div>
            <Button 
              onClick={handleAddSection}
              className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Section
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {sections.map((section, index) => (
            <Card key={section.id} className="border-luxury-gold/20 bg-luxury-dark/30">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GripVertical className="h-5 w-5 text-white/40 cursor-move" />
                    <Switch
                      checked={section.isActive}
                      onCheckedChange={(checked) => handleUpdateSection(section.id, 'isActive', checked)}
                    />
                    <Label className="text-white">Active</Label>
                    <span className="text-sm text-white/60">Order: {Number(section.order) + 1}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteSection(section.id)}
                    className="text-red-400 hover:bg-red-400/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Title</Label>
                  <Input
                    value={section.title}
                    onChange={(e) => handleUpdateSection(section.id, 'title', e.target.value)}
                    className="border-luxury-gold/30 bg-white/5 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Description</Label>
                  <Textarea
                    value={section.description}
                    onChange={(e) => handleUpdateSection(section.id, 'description', e.target.value)}
                    rows={3}
                    className="border-luxury-gold/30 bg-white/5 text-white"
                  />
                </div>

                {/* Images */}
                <div className="space-y-2">
                  <Label className="text-white">Images</Label>
                  <div className="grid gap-2 grid-cols-2 md:grid-cols-3">
                    {section.images.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img src={img} alt="" className="w-full h-24 object-cover rounded" />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveImage(section.id, img)}
                          className="absolute top-1 right-1 h-6 w-6 bg-red-500 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      files.forEach(file => handleImageUpload(section.id, file));
                    }}
                    className="cursor-pointer border-luxury-gold/30 bg-white/5 text-white"
                    disabled={isUploading}
                  />
                </div>

                {/* Videos */}
                <div className="space-y-2">
                  <Label className="text-white">Videos</Label>
                  <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
                    {section.videos.map((vid, idx) => (
                      <div key={idx} className="relative group">
                        <video src={vid} className="w-full h-24 object-cover rounded" />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveVideo(section.id, vid)}
                          className="absolute top-1 right-1 h-6 w-6 bg-red-500 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleVideoUpload(section.id, file);
                    }}
                    className="cursor-pointer border-luxury-gold/30 bg-white/5 text-white"
                    disabled={isUploading}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          {sections.length === 0 && (
            <p className="text-center text-white/60 py-8">No sections added yet. Click "Add Section" to create one.</p>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={updating}
          size="lg"
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
              Save All Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
