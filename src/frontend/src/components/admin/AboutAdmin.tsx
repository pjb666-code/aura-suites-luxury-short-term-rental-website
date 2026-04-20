import type { AboutSection } from "@/backend";
import { useFileUpload } from "@/blob-storage/FileStorage";
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
import { Textarea } from "@/components/ui/textarea";
import { useDraftSiteConfig, useUpdateAboutSection } from "@/hooks/useQueries";
import { Loader2, Save, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AboutAdmin() {
  const { uploadFile, isUploading } = useFileUpload();
  const { data: siteConfig, isLoading: configLoading } = useDraftSiteConfig();
  const { mutate: updateSection, isPending: updating } =
    useUpdateAboutSection();

  const [title, setTitle] = useState("About Aura Suites");
  const [content, setContent] = useState(
    "Experience luxury living and exquisite art in the heart of the city.",
  );
  const [image, setImage] = useState("");
  const [textColor, setTextColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (siteConfig?.aboutSection) {
      const section = siteConfig.aboutSection;
      setTitle(section.title || "About Aura Suites");
      setContent(
        section.content ||
          "Experience luxury living and exquisite art in the heart of the city.",
      );
      setImage(section.image || "");
      setTextColor(section.textColor || "#000000");
      setBackgroundColor(section.backgroundColor || "#FFFFFF");
    }
  }, [siteConfig]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
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
      toast.error("Please select an image first");
      return;
    }

    try {
      const path = `about/image-${Date.now()}.${selectedFile.name.split(".").pop()}`;
      const { url } = await uploadFile(path, selectedFile);
      setImage(url);
      toast.success("Image uploaded — click Save Changes to apply");
      setSelectedFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
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
        toast.success("About section updated successfully in draft");
      },
      onError: (error) => {
        console.error("Failed to update about section:", error);
        toast.error("Failed to update about section");
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
      <Card className="border-[#e2e5eb] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#1a1d23]">
            About Section Content
          </CardTitle>
          <CardDescription className="text-[#5a6378]">
            Customize the about section content and imagery
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Section Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-[#1a1d23] font-medium">
              Section Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="About Aura Suites"
              className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
            />
          </div>

          {/* Side Image */}
          <div className="space-y-4">
            <Label className="text-[#1a1d23] font-medium">Side Image</Label>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="relative aspect-square overflow-hidden rounded-lg border border-[#e2e5eb] bg-[#f7f8fa]">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display =
                          "none";
                      }}
                    />
                  ) : image ? (
                    <img
                      src={image}
                      alt="About section"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const el = e.currentTarget as HTMLImageElement;
                        el.style.display = "none";
                        const parent = el.parentElement;
                        if (parent && !parent.querySelector(".img-fallback")) {
                          const fb = document.createElement("div");
                          fb.className =
                            "img-fallback flex h-full w-full items-center justify-center text-[#96a0b5] text-xs";
                          fb.textContent = "Image unavailable";
                          parent.appendChild(fb);
                        }
                      }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center rounded-lg bg-[#f0f2f7]">
                      <p className="text-xs text-[#96a0b5]">
                        No image selected
                      </p>
                    </div>
                  )}
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="cursor-pointer border-[#e2e5eb] bg-white text-[#1a1d23]"
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
                <Label
                  htmlFor="imageUrl"
                  className="text-[#1a1d23] font-medium"
                >
                  Or enter image URL
                </Label>
                <Input
                  id="imageUrl"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="/assets/generated/curated-living-space.jpg"
                  className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
                />
                <p className="text-xs text-[#96a0b5]">
                  Use uploaded image URL or path from /assets/ directory
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content" className="text-[#1a1d23] font-medium">
              Content Text
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter about section content..."
              rows={6}
              className="border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
            />
            <p className="text-xs text-[#96a0b5]">
              Use line breaks to separate paragraphs
            </p>
          </div>

          {/* Colors */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="textColor" className="text-[#1a1d23] font-medium">
                Text Color
              </Label>
              <div className="flex gap-2">
                <Input
                  id="textColor"
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="h-10 w-20 cursor-pointer border-[#e2e5eb] bg-white"
                />
                <Input
                  type="text"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="flex-1 border-[#e2e5eb] bg-white text-[#1a1d23]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="backgroundColor"
                className="text-[#1a1d23] font-medium"
              >
                Background Color
              </Label>
              <div className="flex gap-2">
                <Input
                  id="backgroundColor"
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="h-10 w-20 cursor-pointer border-[#e2e5eb] bg-white"
                />
                <Input
                  type="text"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="flex-1 border-[#e2e5eb] bg-white text-[#1a1d23]"
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
      <Card className="border-[#e2e5eb] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#1a1d23]">Live Preview</CardTitle>
          <CardDescription className="text-[#5a6378]">
            See how your about section will look
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="space-y-6 rounded-lg p-6 border border-[#e2e5eb]"
            style={{ backgroundColor }}
          >
            <div className="text-center">
              <h2
                className="mb-4 font-serif text-3xl font-light"
                style={{ color: textColor }}
              >
                {title}
              </h2>
              <div className="mx-auto h-1 w-24 bg-luxury-gold" />
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="overflow-hidden rounded-lg">
                {image ? (
                  <img
                    src={image}
                    alt="About"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const el = e.currentTarget as HTMLImageElement;
                      el.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex h-32 w-full items-center justify-center rounded-lg bg-[#f0f2f7]">
                    <span className="text-xs text-[#96a0b5]">
                      Image preview
                    </span>
                  </div>
                )}
              </div>
              <div
                className={`space-y-4 text-sm ${!image ? "md:col-span-2" : ""}`}
              >
                {content.split("\n").map(
                  (paragraph) =>
                    paragraph.trim() && (
                      <p
                        key={paragraph}
                        style={{ color: textColor, opacity: 0.85 }}
                      >
                        {paragraph}
                      </p>
                    ),
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
