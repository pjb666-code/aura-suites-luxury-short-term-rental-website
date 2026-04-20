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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDraftSiteConfig } from "@/hooks/useQueries";
import {
  useSetAccentColor,
  useSetApartmentDetailPageBackgroundColor,
  useSetApartmentsPageBackgroundColor,
  useSetArtistDetailPageBackgroundColor,
  useSetArtworkDetailPageBackgroundColor,
  useSetAuraCollectionPageBackgroundColor,
  useSetHeaderTextColor,
  useSetLandingPageBackgroundColor,
  useSetTextColor,
} from "@/hooks/useQueries";
import { Loader2, Palette, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ColorCustomizationAdmin() {
  const { data: siteConfig, isLoading } = useDraftSiteConfig();
  const { mutate: setTextColor, isPending: settingTextColor } =
    useSetTextColor();
  const { mutate: setHeaderTextColor, isPending: settingHeaderTextColor } =
    useSetHeaderTextColor();
  const { mutate: setAccentColor, isPending: settingAccentColor } =
    useSetAccentColor();
  const { mutate: setLandingPageBg, isPending: settingLandingBg } =
    useSetLandingPageBackgroundColor();
  const { mutate: setApartmentsPageBg, isPending: settingApartmentsBg } =
    useSetApartmentsPageBackgroundColor();
  const {
    mutate: setAuraCollectionPageBg,
    isPending: settingAuraCollectionBg,
  } = useSetAuraCollectionPageBackgroundColor();
  const {
    mutate: setApartmentDetailPageBg,
    isPending: settingApartmentDetailBg,
  } = useSetApartmentDetailPageBackgroundColor();
  const { mutate: setArtistDetailPageBg, isPending: settingArtistDetailBg } =
    useSetArtistDetailPageBackgroundColor();
  const { mutate: setArtworkDetailPageBg, isPending: settingArtworkDetailBg } =
    useSetArtworkDetailPageBackgroundColor();

  const [textColor, setTextColorLocal] = useState("#000000");
  const [headerTextColor, setHeaderTextColorLocal] = useState("#000000");
  const [accentColor, setAccentColorLocal] = useState("#FFD700");
  const [landingPageBg, setLandingPageBgLocal] = useState("#FFFFFF");
  const [apartmentsPageBg, setApartmentsPageBgLocal] = useState("#FFFFFF");
  const [auraCollectionPageBg, setAuraCollectionPageBgLocal] =
    useState("#FFFFFF");
  const [apartmentDetailPageBg, setApartmentDetailPageBgLocal] =
    useState("#FFFFFF");
  const [artistDetailPageBg, setArtistDetailPageBgLocal] = useState("#FFFFFF");
  const [artworkDetailPageBg, setArtworkDetailPageBgLocal] =
    useState("#FFFFFF");

  useEffect(() => {
    if (siteConfig) {
      setTextColorLocal(siteConfig.textColor || "#000000");
      setHeaderTextColorLocal(siteConfig.headerTextColor || "#000000");
      setAccentColorLocal(siteConfig.accentColor || "#FFD700");
      setLandingPageBgLocal(siteConfig.landingPageBackgroundColor || "#FFFFFF");
      setApartmentsPageBgLocal(
        siteConfig.apartmentsPageBackgroundColor || "#FFFFFF",
      );
      setAuraCollectionPageBgLocal(
        siteConfig.auraCollectionPageBackgroundColor || "#FFFFFF",
      );
      setApartmentDetailPageBgLocal(
        siteConfig.apartmentDetailPageBackgroundColor || "#FFFFFF",
      );
      setArtistDetailPageBgLocal(
        siteConfig.artistDetailPageBackgroundColor || "#FFFFFF",
      );
      setArtworkDetailPageBgLocal(
        siteConfig.artworkDetailPageBackgroundColor || "#FFFFFF",
      );
    }
  }, [siteConfig]);

  const handleSaveTextColor = () => {
    setTextColor(textColor, {
      onSuccess: () => toast.success("Normal text color updated successfully"),
      onError: (error) => {
        console.error("Failed to update text color:", error);
        toast.error("Failed to update text color");
      },
    });
  };

  const handleSaveHeaderTextColor = () => {
    setHeaderTextColor(headerTextColor, {
      onSuccess: () => toast.success("Header text color updated successfully"),
      onError: (error) => {
        console.error("Failed to update header text color:", error);
        toast.error("Failed to update header text color");
      },
    });
  };

  const handleSaveAccentColor = () => {
    setAccentColor(accentColor, {
      onSuccess: () => toast.success("Accent color updated successfully"),
      onError: (error) => {
        console.error("Failed to update accent color:", error);
        toast.error("Failed to update accent color");
      },
    });
  };

  const handleSaveLandingPageBg = () => {
    setLandingPageBg(landingPageBg, {
      onSuccess: () => toast.success("Landing page background color updated"),
      onError: () => toast.error("Failed to update landing page background"),
    });
  };

  const handleSaveApartmentsPageBg = () => {
    setApartmentsPageBg(apartmentsPageBg, {
      onSuccess: () =>
        toast.success("Apartments page background color updated"),
      onError: () => toast.error("Failed to update apartments page background"),
    });
  };

  const handleSaveAuraCollectionPageBg = () => {
    setAuraCollectionPageBg(auraCollectionPageBg, {
      onSuccess: () =>
        toast.success("Aura Collection page background color updated"),
      onError: () =>
        toast.error("Failed to update Aura Collection page background"),
    });
  };

  const handleSaveApartmentDetailPageBg = () => {
    setApartmentDetailPageBg(apartmentDetailPageBg, {
      onSuccess: () =>
        toast.success("Apartment detail page background color updated"),
      onError: () =>
        toast.error("Failed to update apartment detail page background"),
    });
  };

  const handleSaveArtistDetailPageBg = () => {
    setArtistDetailPageBg(artistDetailPageBg, {
      onSuccess: () =>
        toast.success("Artist detail page background color updated"),
      onError: () =>
        toast.error("Failed to update artist detail page background"),
    });
  };

  const handleSaveArtworkDetailPageBg = () => {
    setArtworkDetailPageBg(artworkDetailPageBg, {
      onSuccess: () =>
        toast.success("Artwork detail page background color updated"),
      onError: () =>
        toast.error("Failed to update artwork detail page background"),
    });
  };

  const handleResetColors = () => {
    setTextColorLocal("#000000");
    setHeaderTextColorLocal("#000000");
    setAccentColorLocal("#FFD700");
    setLandingPageBgLocal("#FFFFFF");
    setApartmentsPageBgLocal("#FFFFFF");
    setAuraCollectionPageBgLocal("#FFFFFF");
    setApartmentDetailPageBgLocal("#FFFFFF");
    setArtistDetailPageBgLocal("#FFFFFF");
    setArtworkDetailPageBgLocal("#FFFFFF");
  };

  if (isLoading) {
    return (
      <Card className="border-[#e2e5eb] bg-white shadow-sm">
        <CardContent className="flex items-center justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-luxury-gold" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="text" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-[#f0f2f7] border border-[#e2e5eb]">
          <TabsTrigger
            value="text"
            className="data-[state=active]:bg-white data-[state=active]:text-[#1a1d23] data-[state=active]:shadow-sm text-[#5a6378]"
          >
            Text Colors
          </TabsTrigger>
          <TabsTrigger
            value="accent"
            className="data-[state=active]:bg-white data-[state=active]:text-[#1a1d23] data-[state=active]:shadow-sm text-[#5a6378]"
          >
            Accent Color
          </TabsTrigger>
          <TabsTrigger
            value="backgrounds"
            className="data-[state=active]:bg-white data-[state=active]:text-[#1a1d23] data-[state=active]:shadow-sm text-[#5a6378]"
          >
            Page Backgrounds
          </TabsTrigger>
        </TabsList>

        {/* Text Colors Tab */}
        <TabsContent value="text">
          <Card className="border-[#e2e5eb] bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Palette className="h-5 w-5 text-luxury-gold" />
                Text Color Customization
              </CardTitle>
              <CardDescription className="text-[#5a6378]">
                Customize normal text and header text colors separately for
                enhanced typography control
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Normal Text Color */}
              <div className="space-y-3">
                <Label htmlFor="textColor" className="text-[#1a1d23]">
                  Normal Text Color (Body Text & Descriptions)
                </Label>
                <div className="flex gap-3">
                  <div className="flex-1 space-y-2">
                    <div className="flex gap-2">
                      <Input
                        id="textColor"
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColorLocal(e.target.value)}
                        className="h-12 w-20 cursor-pointer border-luxury-gold/30 bg-white/5"
                      />
                      <Input
                        type="text"
                        value={textColor}
                        onChange={(e) => setTextColorLocal(e.target.value)}
                        placeholder="#000000"
                        className="flex-1 border-[#e2e5eb] bg-white text-[#1a1d23]"
                      />
                    </div>
                    <p className="text-xs text-white/60">
                      Used for body text, descriptions, and general content
                    </p>
                  </div>
                  <Button
                    onClick={handleSaveTextColor}
                    disabled={settingTextColor}
                    className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
                  >
                    {settingTextColor ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </div>

              {/* Header Text Color */}
              <div className="space-y-3">
                <Label htmlFor="headerTextColor" className="text-[#1a1d23]">
                  Header Text Color (Headings & Titles)
                </Label>
                <div className="flex gap-3">
                  <div className="flex-1 space-y-2">
                    <div className="flex gap-2">
                      <Input
                        id="headerTextColor"
                        type="color"
                        value={headerTextColor}
                        onChange={(e) =>
                          setHeaderTextColorLocal(e.target.value)
                        }
                        className="h-12 w-20 cursor-pointer border-luxury-gold/30 bg-white/5"
                      />
                      <Input
                        type="text"
                        value={headerTextColor}
                        onChange={(e) =>
                          setHeaderTextColorLocal(e.target.value)
                        }
                        placeholder="#000000"
                        className="flex-1 border-[#e2e5eb] bg-white text-[#1a1d23]"
                      />
                    </div>
                    <p className="text-xs text-white/60">
                      Used for headings, titles, and navigation elements
                    </p>
                  </div>
                  <Button
                    onClick={handleSaveHeaderTextColor}
                    disabled={settingHeaderTextColor}
                    className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
                  >
                    {settingHeaderTextColor ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Accent Color Tab */}
        <TabsContent value="accent">
          <Card className="border-[#e2e5eb] bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Palette className="h-5 w-5 text-luxury-gold" />
                Accent Color Customization
              </CardTitle>
              <CardDescription className="text-[#5a6378]">
                Customize the accent color used for buttons, links, and
                interactive elements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="accentColor" className="text-[#1a1d23]">
                  Accent Color (Buttons & Highlights)
                </Label>
                <div className="flex gap-3">
                  <div className="flex-1 space-y-2">
                    <div className="flex gap-2">
                      <Input
                        id="accentColor"
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColorLocal(e.target.value)}
                        className="h-12 w-20 cursor-pointer border-luxury-gold/30 bg-white/5"
                      />
                      <Input
                        type="text"
                        value={accentColor}
                        onChange={(e) => setAccentColorLocal(e.target.value)}
                        placeholder="#FFD700"
                        className="flex-1 border-[#e2e5eb] bg-white text-[#1a1d23]"
                      />
                    </div>
                    <p className="text-xs text-white/60">
                      Used for buttons, links, badges, and accent elements
                    </p>
                  </div>
                  <Button
                    onClick={handleSaveAccentColor}
                    disabled={settingAccentColor}
                    className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
                  >
                    {settingAccentColor ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Page Backgrounds Tab */}
        <TabsContent value="backgrounds">
          <Card className="border-[#e2e5eb] bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Palette className="h-5 w-5 text-luxury-gold" />
                Page Background Colors
              </CardTitle>
              <CardDescription className="text-[#5a6378]">
                Customize background colors for each page individually
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Landing Page Background */}
              <div className="space-y-3">
                <Label className="text-[#1a1d23]">
                  Landing Page Background
                </Label>
                <div className="flex gap-3">
                  <div className="flex-1 flex gap-2">
                    <Input
                      type="color"
                      value={landingPageBg}
                      onChange={(e) => setLandingPageBgLocal(e.target.value)}
                      className="h-12 w-20 cursor-pointer border-luxury-gold/30 bg-white/5"
                    />
                    <Input
                      type="text"
                      value={landingPageBg}
                      onChange={(e) => setLandingPageBgLocal(e.target.value)}
                      className="flex-1 border-luxury-gold/30 bg-white/5 text-white"
                    />
                  </div>
                  <Button
                    onClick={handleSaveLandingPageBg}
                    disabled={settingLandingBg}
                    className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
                  >
                    {settingLandingBg ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </div>

              {/* Apartments Page Background */}
              <div className="space-y-3">
                <Label className="text-[#1a1d23]">
                  Apartments Page Background
                </Label>
                <div className="flex gap-3">
                  <div className="flex-1 flex gap-2">
                    <Input
                      type="color"
                      value={apartmentsPageBg}
                      onChange={(e) => setApartmentsPageBgLocal(e.target.value)}
                      className="h-12 w-20 cursor-pointer border-luxury-gold/30 bg-white/5"
                    />
                    <Input
                      type="text"
                      value={apartmentsPageBg}
                      onChange={(e) => setApartmentsPageBgLocal(e.target.value)}
                      className="flex-1 border-luxury-gold/30 bg-white/5 text-white"
                    />
                  </div>
                  <Button
                    onClick={handleSaveApartmentsPageBg}
                    disabled={settingApartmentsBg}
                    className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
                  >
                    {settingApartmentsBg ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </div>

              {/* Aura Collection Page Background */}
              <div className="space-y-3">
                <Label className="text-[#1a1d23]">
                  Aura Collection Page Background
                </Label>
                <div className="flex gap-3">
                  <div className="flex-1 flex gap-2">
                    <Input
                      type="color"
                      value={auraCollectionPageBg}
                      onChange={(e) =>
                        setAuraCollectionPageBgLocal(e.target.value)
                      }
                      className="h-12 w-20 cursor-pointer border-luxury-gold/30 bg-white/5"
                    />
                    <Input
                      type="text"
                      value={auraCollectionPageBg}
                      onChange={(e) =>
                        setAuraCollectionPageBgLocal(e.target.value)
                      }
                      className="flex-1 border-luxury-gold/30 bg-white/5 text-white"
                    />
                  </div>
                  <Button
                    onClick={handleSaveAuraCollectionPageBg}
                    disabled={settingAuraCollectionBg}
                    className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
                  >
                    {settingAuraCollectionBg ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </div>

              {/* Apartment Detail Page Background */}
              <div className="space-y-3">
                <Label className="text-[#1a1d23]">
                  Apartment Detail Page Background
                </Label>
                <div className="flex gap-3">
                  <div className="flex-1 flex gap-2">
                    <Input
                      type="color"
                      value={apartmentDetailPageBg}
                      onChange={(e) =>
                        setApartmentDetailPageBgLocal(e.target.value)
                      }
                      className="h-12 w-20 cursor-pointer border-luxury-gold/30 bg-white/5"
                    />
                    <Input
                      type="text"
                      value={apartmentDetailPageBg}
                      onChange={(e) =>
                        setApartmentDetailPageBgLocal(e.target.value)
                      }
                      className="flex-1 border-luxury-gold/30 bg-white/5 text-white"
                    />
                  </div>
                  <Button
                    onClick={handleSaveApartmentDetailPageBg}
                    disabled={settingApartmentDetailBg}
                    className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
                  >
                    {settingApartmentDetailBg ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </div>

              {/* Artist Detail Page Background */}
              <div className="space-y-3">
                <Label className="text-[#1a1d23]">
                  Artist Detail Page Background
                </Label>
                <div className="flex gap-3">
                  <div className="flex-1 flex gap-2">
                    <Input
                      type="color"
                      value={artistDetailPageBg}
                      onChange={(e) =>
                        setArtistDetailPageBgLocal(e.target.value)
                      }
                      className="h-12 w-20 cursor-pointer border-luxury-gold/30 bg-white/5"
                    />
                    <Input
                      type="text"
                      value={artistDetailPageBg}
                      onChange={(e) =>
                        setArtistDetailPageBgLocal(e.target.value)
                      }
                      className="flex-1 border-luxury-gold/30 bg-white/5 text-white"
                    />
                  </div>
                  <Button
                    onClick={handleSaveArtistDetailPageBg}
                    disabled={settingArtistDetailBg}
                    className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
                  >
                    {settingArtistDetailBg ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </div>

              {/* Artwork Detail Page Background */}
              <div className="space-y-3">
                <Label className="text-[#1a1d23]">
                  Artwork Detail Page Background
                </Label>
                <div className="flex gap-3">
                  <div className="flex-1 flex gap-2">
                    <Input
                      type="color"
                      value={artworkDetailPageBg}
                      onChange={(e) =>
                        setArtworkDetailPageBgLocal(e.target.value)
                      }
                      className="h-12 w-20 cursor-pointer border-luxury-gold/30 bg-white/5"
                    />
                    <Input
                      type="text"
                      value={artworkDetailPageBg}
                      onChange={(e) =>
                        setArtworkDetailPageBgLocal(e.target.value)
                      }
                      className="flex-1 border-luxury-gold/30 bg-white/5 text-white"
                    />
                  </div>
                  <Button
                    onClick={handleSaveArtworkDetailPageBg}
                    disabled={settingArtworkDetailBg}
                    className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
                  >
                    {settingArtworkDetailBg ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Reset Button */}
      <Card className="border-[#e2e5eb] bg-white shadow-sm">
        <CardContent className="flex justify-between items-center p-6">
          <div>
            <p className="text-white font-medium">Reset All Colors</p>
            <p className="text-sm text-white/60">
              Reset all color settings to default values
            </p>
          </div>
          <Button
            onClick={handleResetColors}
            variant="outline"
            className="border-luxury-gold/30 text-white hover:bg-luxury-gold/10"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset to Defaults
          </Button>
        </CardContent>
      </Card>

      {/* Live Preview */}
      <Card className="border-[#e2e5eb] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#1a1d23]">Live Preview</CardTitle>
          <CardDescription className="text-[#5a6378]">
            See how your color choices will look on the site
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            className="rounded-lg border border-white/10 p-8 space-y-6"
            style={{ backgroundColor: landingPageBg }}
          >
            <div>
              <h1
                className="font-serif text-4xl font-light mb-2"
                style={{ color: headerTextColor }}
              >
                Sample Header Text
              </h1>
              <p className="text-lg" style={{ color: textColor }}>
                This is how your body text will appear throughout the site. The
                normal text color you choose will be applied to all content.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                className="px-6 py-3 rounded-md font-medium transition-all hover:opacity-90"
                style={{
                  backgroundColor: accentColor,
                  color: "#1a1a1a",
                }}
              >
                Primary Button
              </button>
              <button
                type="button"
                className="px-6 py-3 rounded-md font-medium border-2 transition-all hover:opacity-90"
                style={{
                  borderColor: accentColor,
                  color: accentColor,
                  backgroundColor: "transparent",
                }}
              >
                Secondary Button
              </button>
            </div>

            <div className="space-y-2">
              <span
                className="inline-flex items-center gap-2 font-medium"
                style={{ color: accentColor }}
              >
                Sample Link Text →
              </span>
              <div
                className="h-1 w-24 rounded"
                style={{ backgroundColor: accentColor }}
              />
            </div>
          </div>

          <p className="text-sm text-white/60 text-center">
            Remember to click "Publish Changes" in the header to make these
            colors live on your public site
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
