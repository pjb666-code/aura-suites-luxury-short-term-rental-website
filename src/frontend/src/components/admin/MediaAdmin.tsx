import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useDeleteSectionImage,
  useDraftSiteConfig,
  useSetDefaultAboutImage,
  useSetDefaultApartmentsImage,
  useSetDefaultCollectionImage,
  useSetDefaultExperienceImage,
  useSetDefaultHeroImage,
} from "@/hooks/useQueries";
import { Check, Download, ExternalLink, Loader2, Trash2 } from "lucide-react";
import { AlertCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

interface StockImage {
  path: string;
  name: string;
  category: string;
}

const stockImages: StockImage[] = [
  {
    path: "/assets/generated/hero-apartment-interior.jpg",
    name: "Hero Apartment Interior",
    category: "Hero",
  },
  {
    path: "/assets/generated/buenos-aires-sunset-skyline.jpg",
    name: "Buenos Aires Sunset Skyline",
    category: "Hero",
  },
  {
    path: "/assets/generated/curated-living-space.jpg",
    name: "Curated Living Space",
    category: "About",
  },
  {
    path: "/assets/generated/lifestyle-wine-balcony.jpg",
    name: "Lifestyle Wine Balcony",
    category: "About",
  },
  {
    path: "/assets/generated/luxury-bedroom-art.jpg",
    name: "Luxury Bedroom Art",
    category: "Apartments",
  },
  {
    path: "/assets/generated/featured-artwork-gallery.jpg",
    name: "Featured Artwork Gallery",
    category: "Collection",
  },
  {
    path: "/assets/generated/cultural-district-street.jpg",
    name: "Cultural District Street",
    category: "Experience",
  },
  {
    path: "/assets/generated/artist-profile-studio.jpg",
    name: "Artist Profile Studio",
    category: "Artists",
  },
  {
    path: "/assets/generated/abstract-geometric-art.jpg",
    name: "Abstract Geometric Art",
    category: "Artworks",
  },
  {
    path: "/assets/generated/aura-suites-logo-transparent.png",
    name: "Aura Suites Logo",
    category: "Logo",
  },
];

type SectionType =
  | "hero"
  | "about"
  | "experience"
  | "apartments"
  | "collection";

export default function MediaAdmin() {
  const { data: siteConfig, isLoading: configLoading } = useDraftSiteConfig();
  const { mutate: setDefaultHero, isPending: settingHero } =
    useSetDefaultHeroImage();
  const { mutate: setDefaultAbout, isPending: settingAbout } =
    useSetDefaultAboutImage();
  const { mutate: setDefaultExperience, isPending: settingExperience } =
    useSetDefaultExperienceImage();
  const { mutate: setDefaultApartments, isPending: settingApartments } =
    useSetDefaultApartmentsImage();
  const { mutate: setDefaultCollection, isPending: settingCollection } =
    useSetDefaultCollectionImage();
  const { mutate: deleteSectionImage, isPending: deleting } =
    useDeleteSectionImage();

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const cats = new Set(stockImages.map((img) => img.category));
    return ["All", ...Array.from(cats)];
  }, []);

  const filteredImages = useMemo(() => {
    if (selectedCategory === "All") return stockImages;
    return stockImages.filter((img) => img.category === selectedCategory);
  }, [selectedCategory]);

  const handleSetDefault = (section: SectionType, path: string) => {
    const mutations = {
      hero: setDefaultHero,
      about: setDefaultAbout,
      experience: setDefaultExperience,
      apartments: setDefaultApartments,
      collection: setDefaultCollection,
    };

    mutations[section](path, {
      onSuccess: () => {
        toast.success(`Default ${section} image updated successfully`);
      },
      onError: (error) => {
        console.error(`Failed to set default ${section} image:`, error);
        toast.error(`Failed to set default ${section} image`);
      },
    });
  };

  const handleDeleteSectionImage = (section: SectionType) => {
    deleteSectionImage(section, {
      onSuccess: () => {
        toast.success(
          `${section.charAt(0).toUpperCase() + section.slice(1)} section image deleted, reverted to fallback`,
        );
      },
      onError: (error) => {
        console.error(`Failed to delete ${section} section image:`, error);
        toast.error(`Failed to delete ${section} section image`);
      },
    });
  };

  const handleDownload = async (path: string, name: string) => {
    try {
      const response = await fetch(path);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download =
        name.replace(/\s+/g, "-").toLowerCase() +
        path.substring(path.lastIndexOf("."));
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Image downloaded successfully");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download image");
    }
  };

  const handleOpenInNewTab = (path: string) => {
    window.open(path, "_blank");
  };

  const isDefaultImage = (section: SectionType, path: string): boolean => {
    if (!siteConfig) return false;
    const defaults = {
      hero: siteConfig.defaultHeroImage,
      about: siteConfig.defaultAboutImage,
      experience: siteConfig.defaultExperienceImage,
      apartments: siteConfig.defaultApartmentsImage,
      collection: siteConfig.defaultCollectionImage,
    };
    return defaults[section] === path;
  };

  const getCurrentImage = (section: SectionType): string => {
    if (!siteConfig) return "";
    const current = {
      hero: siteConfig.heroSection.backgroundImage,
      about: siteConfig.aboutSection.image,
      experience: siteConfig.experiencePage.backgroundImage,
      apartments: siteConfig.apartmentsSection.backgroundImage,
      collection: siteConfig.auraCollectionSection.backgroundImage,
    };
    return current[section];
  };

  const getDefaultImage = (section: SectionType): string => {
    if (!siteConfig) return "";
    const defaults = {
      hero: siteConfig.defaultHeroImage,
      about: siteConfig.defaultAboutImage,
      experience: siteConfig.defaultExperienceImage,
      apartments: siteConfig.defaultApartmentsImage,
      collection: siteConfig.defaultCollectionImage,
    };
    return defaults[section];
  };

  const isUsingFallback = (section: SectionType): boolean => {
    const current = getCurrentImage(section);
    const fallback = getDefaultImage(section);
    return current === fallback;
  };

  if (configLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-luxury-gold" />
      </div>
    );
  }

  const isPending =
    settingHero ||
    settingAbout ||
    settingExperience ||
    settingApartments ||
    settingCollection ||
    deleting;

  return (
    <div className="space-y-6">
      <Alert className="border-luxury-gold/50 bg-luxury-gold/10">
        <AlertCircle className="h-4 w-4 text-luxury-gold" />
        <AlertDescription className="text-sm text-[#1a1d23]">
          <strong>Media Management:</strong> Set default fallback images for
          each section. When you delete an uploaded image, the system
          automatically reverts to the selected fallback.
        </AlertDescription>
      </Alert>

      {/* Current Section Images */}
      <Card className="border-[#e2e5eb] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#1a1d23]">
            Current Section Images
          </CardTitle>
          <CardDescription className="text-[#5a6378]">
            View and manage images currently used in each section
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {(
            [
              "hero",
              "about",
              "experience",
              "apartments",
              "collection",
            ] as SectionType[]
          ).map((section) => {
            const currentImage = getCurrentImage(section);
            const fallbackImage = getDefaultImage(section);
            const usingFallback = isUsingFallback(section);

            return (
              <div
                key={section}
                className="space-y-3 rounded-lg border border-[#e2e5eb] bg-[#f7f8fa] p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium capitalize text-white">
                      {section} Section
                    </h3>
                    <p className="text-xs text-white/60">
                      {usingFallback
                        ? "Using fallback image"
                        : "Using custom uploaded image"}
                    </p>
                  </div>
                  {!usingFallback && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteSectionImage(section)}
                      disabled={deleting}
                    >
                      {deleting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete & Revert
                        </>
                      )}
                    </Button>
                  )}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-xs text-[#5a6378]">
                      Current Image
                    </Label>
                    <div className="group relative aspect-video overflow-hidden rounded-lg border border-luxury-gold/30 bg-muted">
                      <img
                        src={currentImage}
                        alt={`Current ${section}`}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = fallbackImage;
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleOpenInNewTab(currentImage)}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-[#5a6378]">
                      Fallback Image
                    </Label>
                    <div className="group relative aspect-video overflow-hidden rounded-lg border border-luxury-gold/30 bg-muted">
                      <img
                        src={fallbackImage}
                        alt={`Fallback ${section}`}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleOpenInNewTab(fallbackImage)}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Stock Images Gallery */}
      <Card className="border-[#e2e5eb] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#1a1d23]">Stock Images Gallery</CardTitle>
          <CardDescription className="text-[#5a6378]">
            Browse and set default fallback images for each section
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category Filter */}
          <div className="flex items-center gap-4">
            <Label className="text-[#1a1d23]">Filter by Category:</Label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-48 border-[#e2e5eb] bg-white text-[#1a1d23]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Images Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredImages.map((image) => (
              <Card
                key={image.path}
                className="overflow-hidden border-[#e2e5eb] bg-[#f7f8fa]"
              >
                <div className="group relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={image.path}
                    alt={image.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleOpenInNewTab(image.path)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleDownload(image.path, image.name)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="space-y-3 p-4">
                  <div>
                    <h3 className="font-medium text-white">{image.name}</h3>
                    <p className="text-xs text-white/60">{image.category}</p>
                  </div>

                  {/* Set as Default Buttons */}
                  <div className="space-y-2">
                    <Label className="text-xs text-[#5a6378]">
                      Set as default for:
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {(
                        [
                          "hero",
                          "about",
                          "experience",
                          "apartments",
                          "collection",
                        ] as SectionType[]
                      ).map((section) => {
                        const isDefault = isDefaultImage(section, image.path);
                        return (
                          <Button
                            key={section}
                            size="sm"
                            variant={isDefault ? "default" : "outline"}
                            onClick={() =>
                              handleSetDefault(section, image.path)
                            }
                            disabled={isPending || isDefault}
                            className={
                              isDefault
                                ? "bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
                                : "border-[#e2e5eb] text-[#1a1d23] hover:bg-[#f0f2f7]"
                            }
                          >
                            {isDefault && <Check className="mr-1 h-3 w-3" />}
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
