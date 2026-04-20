import { useFileUpload, useFileUrl } from "@/blob-storage/FileStorage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  useDraftArtists,
  useDraftArtworks,
  useDraftSiteConfig,
  useSetFeaturedArtists,
  useSetFeaturedArtworks,
  useSetShowAuraCollectionOnLandingPage,
  useUpdateAuraCollectionSection,
  useUpdateSectionTexts,
} from "@/hooks/useQueries";
import {
  Eye,
  EyeOff,
  ImageIcon,
  Loader2,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function AuraCollectionLandingAdmin() {
  const { data: siteConfig, isLoading: configLoading } = useDraftSiteConfig();
  const { data: artists, isLoading: artistsLoading } = useDraftArtists();
  const { data: artworks, isLoading: artworksLoading } = useDraftArtworks();
  const { uploadFile, isUploading } = useFileUpload();
  const imageFileRef = useRef<HTMLInputElement>(null);

  const { mutate: setFeaturedArtists, isPending: savingArtists } =
    useSetFeaturedArtists();
  const { mutate: setFeaturedArtworks, isPending: savingArtworks } =
    useSetFeaturedArtworks();
  const { mutate: setShowOnLandingPage, isPending: savingVisibility } =
    useSetShowAuraCollectionOnLandingPage();
  const { mutate: updateSectionTexts, isPending: savingTexts } =
    useUpdateSectionTexts();
  const { mutate: updateAuraCollectionSection, isPending: savingMainImage } =
    useUpdateAuraCollectionSection();

  const [showSection, setShowSection] = useState(true);
  const [selectedArtistIds, setSelectedArtistIds] = useState<string[]>([]);
  const [selectedArtworkIds, setSelectedArtworkIds] = useState<string[]>([]);
  const [discoverText, setDiscoverText] = useState("");
  const [featuredText, setFeaturedText] = useState("");

  // Current main image key from config
  const mainImageKey =
    siteConfig?.auraCollectionSection?.auraCollectionMainImageKey ?? undefined;
  const { data: mainImageUrl } = useFileUrl(mainImageKey ?? "");

  useEffect(() => {
    if (siteConfig?.auraCollectionSection) {
      setShowSection(
        siteConfig.auraCollectionSection.showOnLandingPage ?? true,
      );
      setSelectedArtistIds(
        siteConfig.auraCollectionSection.featuredArtists || [],
      );
      setSelectedArtworkIds(
        siteConfig.auraCollectionSection.featuredArtworks || [],
      );
      setDiscoverText(
        siteConfig.auraCollectionSection.sectionTexts?.discoverText || "",
      );
      setFeaturedText(
        siteConfig.auraCollectionSection.sectionTexts?.featuredText || "",
      );
    }
  }, [siteConfig]);

  const handleMainImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file || !siteConfig?.auraCollectionSection) return;
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `aura-collection/main-${Date.now()}.${ext}`;
    try {
      const res = await uploadFile(path, file);
      const section = siteConfig.auraCollectionSection;
      updateAuraCollectionSection(
        { ...section, auraCollectionMainImageKey: res.path },
        {
          onSuccess: () => toast.success("Main image updated in draft"),
          onError: () => toast.error("Failed to save image key"),
        },
      );
    } catch {
      toast.error("Upload failed");
    }
    if (imageFileRef.current) imageFileRef.current.value = "";
  };

  const handleRemoveMainImage = () => {
    if (!siteConfig?.auraCollectionSection) return;
    const section = siteConfig.auraCollectionSection;
    updateAuraCollectionSection(
      { ...section, auraCollectionMainImageKey: undefined },
      {
        onSuccess: () => toast.success("Main image removed — default restored"),
        onError: () => toast.error("Failed to remove image"),
      },
    );
  };

  const handleToggleArtist = (artistId: string) => {
    setSelectedArtistIds((prev) =>
      prev.includes(artistId)
        ? prev.filter((id) => id !== artistId)
        : [...prev, artistId],
    );
  };

  const handleToggleArtwork = (artworkId: string) => {
    setSelectedArtworkIds((prev) =>
      prev.includes(artworkId)
        ? prev.filter((id) => id !== artworkId)
        : [...prev, artworkId],
    );
  };

  const handleSaveVisibility = () => {
    setShowOnLandingPage(showSection, {
      onSuccess: () => {
        toast.success("Visibility setting saved successfully");
      },
      onError: (error) => {
        console.error("Failed to save visibility:", error);
        toast.error("Failed to save visibility setting");
      },
    });
  };

  const handleSaveArtists = () => {
    setFeaturedArtists(selectedArtistIds, {
      onSuccess: () => {
        toast.success("Featured artists saved successfully");
      },
      onError: (error) => {
        console.error("Failed to save artists:", error);
        toast.error("Failed to save featured artists");
      },
    });
  };

  const handleSaveArtworks = () => {
    setFeaturedArtworks(selectedArtworkIds, {
      onSuccess: () => {
        toast.success("Featured artworks saved successfully");
      },
      onError: (error) => {
        console.error("Failed to save artworks:", error);
        toast.error("Failed to save featured artworks");
      },
    });
  };

  const handleSaveTexts = () => {
    updateSectionTexts(
      { discoverText, featuredText },
      {
        onSuccess: () => {
          toast.success("Section texts saved successfully");
        },
        onError: (error) => {
          console.error("Failed to save texts:", error);
          toast.error("Failed to save section texts");
        },
      },
    );
  };

  if (configLoading || artistsLoading || artworksLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-luxury-gold" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Collection Image */}
      <Card className="border-[#e2e5eb] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#1a1d23]">
            Main Collection Image
          </CardTitle>
          <CardDescription className="text-[#5a6378]">
            The large clickable artwork shown on the landing page. Upload your
            own image or remove it to restore the default.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mainImageKey && mainImageUrl ? (
            <div className="space-y-3">
              <img
                src={mainImageUrl}
                alt="Main collection artwork preview"
                className="w-full rounded-lg border border-luxury-gold/20 object-contain"
                style={{ maxHeight: "200px" }}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemoveMainImage}
                disabled={savingMainImage}
                className="text-red-400/70 hover:text-red-400 hover:bg-red-400/10"
              >
                <Trash2 className="mr-1 h-3 w-3" />
                Remove — restore default
              </Button>
            </div>
          ) : (
            <div className="rounded-lg border border-[#e2e5eb] bg-[#f7f8fa] p-4 text-sm text-[#96a0b5]">
              Using default artwork image. Upload a custom image below.
            </div>
          )}
          <div>
            <button
              type="button"
              onClick={() => imageFileRef.current?.click()}
              disabled={isUploading || savingMainImage}
              className="admin-upload-zone flex w-full flex-col items-center justify-center gap-2 py-4 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUploading || savingMainImage ? (
                <Loader2 className="h-5 w-5 animate-spin text-luxury-gold" />
              ) : (
                <>
                  <div className="flex items-center gap-1.5">
                    <Upload className="h-4 w-4" />
                    <ImageIcon className="h-4 w-4" />
                  </div>
                  <span className="text-xs">
                    Upload image (.png, .jpg, .webp, .svg)
                  </span>
                </>
              )}
            </button>
            <input
              ref={imageFileRef}
              type="file"
              accept=".png,.jpg,.jpeg,.webp,.svg"
              className="hidden"
              onChange={handleMainImageUpload}
            />
          </div>
        </CardContent>
      </Card>

      {/* Section Texts */}
      <Card className="border-[#e2e5eb] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#1a1d23]">Section Text Content</CardTitle>
          <CardDescription className="text-[#5a6378]">
            Customize the text content displayed in the Aura Collection section
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="discover-text" className="text-[#1a1d23]">
              Discover Text
            </Label>
            <Input
              id="discover-text"
              value={discoverText}
              onChange={(e) => setDiscoverText(e.target.value)}
              placeholder="Discover curated artworks by local artists – available online or on-site"
              className="bg-white border-[#e2e5eb] text-[#1a1d23] placeholder:text-[#96a0b5]"
            />
            <p className="text-xs text-white/60">
              This text appears below the section title
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="featured-text" className="text-[#1a1d23]">
              Featured Text
            </Label>
            <Textarea
              id="featured-text"
              value={featuredText}
              onChange={(e) => setFeaturedText(e.target.value)}
              placeholder="Featured: Modern art inspired by Palermo Hollywood and Latin American culture"
              rows={3}
              className="bg-white border-[#e2e5eb] text-[#1a1d23] placeholder:text-[#96a0b5]"
            />
            <p className="text-xs text-white/60">
              This text appears below the large featured artwork image
            </p>
          </div>
          <div className="flex justify-end pt-2">
            <Button
              onClick={handleSaveTexts}
              disabled={savingTexts}
              className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
            >
              {savingTexts ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Texts
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Visibility Control */}
      <Card className="border-[#e2e5eb] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#1a1d23]">Section Visibility</CardTitle>
          <CardDescription className="text-[#5a6378]">
            Control whether the Aura Collection section appears on the landing
            page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="show-section" className="text-[#1a1d23]">
                Show Aura Collection on Landing Page
              </Label>
              <p className="text-sm text-white/60">
                Toggle to hide or show the entire art collection section
              </p>
            </div>
            <Switch
              id="show-section"
              checked={showSection}
              onCheckedChange={setShowSection}
            />
          </div>
          <div className="flex justify-end pt-2">
            <Button
              onClick={handleSaveVisibility}
              disabled={savingVisibility}
              className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
            >
              {savingVisibility ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Visibility
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Featured Artists Selection */}
      <Card className="border-[#e2e5eb] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#1a1d23]">Featured Artists</CardTitle>
          <CardDescription className="text-[#5a6378]">
            Select which artists to feature on the landing page. Leave empty to
            show the first 3 artists automatically.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {artists && artists.length > 0 ? (
            <>
              <div className="space-y-3">
                {artists.map((artist) => (
                  <div
                    key={artist.id}
                    className="flex items-center space-x-3 rounded-lg border border-[#e2e5eb] bg-[#f7f8fa] p-3"
                  >
                    <Checkbox
                      id={`artist-${artist.id}`}
                      checked={selectedArtistIds.includes(artist.id)}
                      onCheckedChange={() => handleToggleArtist(artist.id)}
                    />
                    <Label
                      htmlFor={`artist-${artist.id}`}
                      className="flex-1 cursor-pointer text-white"
                    >
                      <div className="font-medium">{artist.name}</div>
                      <div className="text-sm text-white/60 line-clamp-1">
                        {artist.bio}
                      </div>
                    </Label>
                    {artist.photo && (
                      <img
                        src={artist.photo}
                        alt={artist.name}
                        className="h-12 w-12 rounded object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-2">
                <p className="text-sm text-white/60">
                  {selectedArtistIds.length === 0
                    ? "No selection - will show first 3 artists"
                    : `${selectedArtistIds.length} artist${selectedArtistIds.length !== 1 ? "s" : ""} selected`}
                </p>
                <Button
                  onClick={handleSaveArtists}
                  disabled={savingArtists}
                  className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
                >
                  {savingArtists ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Artists
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <p className="text-white/60">
              No artists available. Add artists in the Aura Collection tab
              first.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Featured Artworks Selection */}
      <Card className="border-[#e2e5eb] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#1a1d23]">Featured Artworks</CardTitle>
          <CardDescription className="text-[#5a6378]">
            Select which artworks to feature on the landing page. Leave empty to
            show the first 4 artworks automatically.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {artworks && artworks.length > 0 ? (
            <>
              <div className="space-y-3">
                {artworks.map((artwork) => (
                  <div
                    key={artwork.id}
                    className="flex items-center space-x-3 rounded-lg border border-[#e2e5eb] bg-[#f7f8fa] p-3"
                  >
                    <Checkbox
                      id={`artwork-${artwork.id}`}
                      checked={selectedArtworkIds.includes(artwork.id)}
                      onCheckedChange={() => handleToggleArtwork(artwork.id)}
                    />
                    <Label
                      htmlFor={`artwork-${artwork.id}`}
                      className="flex-1 cursor-pointer text-white"
                    >
                      <div className="font-medium">{artwork.title}</div>
                      <div className="text-sm text-white/60 line-clamp-1">
                        {artwork.description}
                      </div>
                    </Label>
                    {artwork.photo && (
                      <img
                        src={artwork.photo}
                        alt={artwork.title}
                        className="h-12 w-12 rounded object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-2">
                <p className="text-sm text-white/60">
                  {selectedArtworkIds.length === 0
                    ? "No selection - will show first 4 artworks"
                    : `${selectedArtworkIds.length} artwork${selectedArtworkIds.length !== 1 ? "s" : ""} selected`}
                </p>
                <Button
                  onClick={handleSaveArtworks}
                  disabled={savingArtworks}
                  className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
                >
                  {savingArtworks ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Artworks
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <p className="text-white/60">
              No artworks available. Add artworks in the Aura Collection tab
              first.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Preview */}
      <Card className="border-[#e2e5eb] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#1a1d23]">Preview</CardTitle>
          <CardDescription className="text-[#5a6378]">
            How the section will appear on the landing page
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showSection ? (
            <div className="space-y-4 rounded-lg bg-white p-6">
              <div className="flex items-center gap-2 text-luxury-gold">
                <Eye className="h-5 w-5" />
                <span className="font-medium">Section Visible</span>
              </div>
              <p className="text-sm text-gray-600">
                {selectedArtistIds.length === 0 &&
                  selectedArtworkIds.length === 0 &&
                  "Will display first 3 artists and first 4 artworks automatically"}
                {selectedArtistIds.length > 0 &&
                  `Will display ${selectedArtistIds.length} selected artist${selectedArtistIds.length !== 1 ? "s" : ""}`}
                {selectedArtistIds.length > 0 &&
                  selectedArtworkIds.length > 0 &&
                  " and "}
                {selectedArtworkIds.length > 0 &&
                  `${selectedArtworkIds.length} selected artwork${selectedArtworkIds.length !== 1 ? "s" : ""}`}
              </p>
            </div>
          ) : (
            <div className="space-y-4 rounded-lg bg-gray-100 p-6">
              <div className="flex items-center gap-2 text-gray-500">
                <EyeOff className="h-5 w-5" />
                <span className="font-medium">Section Hidden</span>
              </div>
              <p className="text-sm text-gray-600">
                The Aura Collection section will not appear on the landing page
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
