import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Lightbox from "@/components/Lightbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  useLiveArtists,
  useLiveArtworks,
  useLiveSiteConfig,
} from "@/hooks/useQueries";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Mail,
  User,
  ZoomIn,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function ArtworkDetailPage() {
  const navigate = useNavigate();
  const { artworkId } = useParams({ from: "/artworks/$artworkId" });
  const { data: artworks, isLoading: loadingArtworks } = useLiveArtworks();
  const { data: artists, isLoading: loadingArtists } = useLiveArtists();
  const { data: siteConfig } = useLiveSiteConfig();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const artwork = artworks?.find((a) => a.id === artworkId);
  const artist = artists?.find((a) => a.id === artwork?.artistId);
  const relatedArtworks =
    artworks
      ?.filter((a) => a.id !== artworkId && a.artistId === artwork?.artistId)
      .slice(0, 3) || [];
  const otherArtworks =
    artworks
      ?.filter((a) => a.id !== artworkId && a.artistId !== artwork?.artistId)
      .slice(0, 3) || [];

  const textColor = siteConfig?.textColor || "#000000";
  const headerTextColor = siteConfig?.headerTextColor || "#000000";
  const accentColor = siteConfig?.accentColor || "#FFD700";
  const backgroundColor =
    siteConfig?.artworkDetailPageBackgroundColor || "#FFFFFF";

  const defaultArtworkImage = useMemo(() => {
    if (siteConfig?.defaultArtworkImage)
      return `/assets/${siteConfig.defaultArtworkImage}`;
    return "/assets/generated/abstract-geometric-art.jpg";
  }, [siteConfig?.defaultArtworkImage]);

  const galleryImages = useMemo(() => {
    if (!artwork) return [];
    const images: string[] = [];
    if (artwork.photo) images.push(artwork.photo);
    if (artwork.galleryImages && artwork.galleryImages.length > 0) {
      images.push(...artwork.galleryImages);
    }
    if (images.length === 0) images.push(defaultArtworkImage);
    return images;
  }, [artwork, defaultArtworkImage]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: setCurrentImageIndex is stable
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [artworkId]);

  useEffect(() => {
    if (siteConfig) {
      document.body.style.backgroundColor = backgroundColor;
    }
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [siteConfig, backgroundColor]);

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1,
    );
  };

  const getCurrentImageUrl = () => {
    const imagePath = galleryImages[currentImageIndex];
    if (!imagePath) return defaultArtworkImage;
    if (imagePath.startsWith("http") || imagePath.startsWith("/assets/"))
      return imagePath;
    return `/assets/${imagePath}`;
  };

  const resolvedGalleryUrls = galleryImages.map((img) => {
    if (img.startsWith("http") || img.startsWith("/assets/")) return img;
    return `/assets/${img}`;
  });

  if (loadingArtworks || loadingArtists) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-24 pb-16" style={{ backgroundColor }}>
          <div className="container mx-auto px-4">
            <div className="animate-pulse space-y-8">
              <div className="h-96 bg-muted rounded-lg" />
              <div className="h-8 w-3/4 bg-muted rounded" />
              <div className="h-4 w-full bg-muted rounded" />
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!artwork) {
    return (
      <>
        <Header />
        <main
          className="min-h-screen pt-24 pb-16"
          style={{ backgroundColor, color: textColor }}
        >
          <div className="container mx-auto px-4 text-center">
            <h1
              className="mb-4 font-serif text-4xl font-light"
              style={{ color: headerTextColor }}
            >
              Artwork Not Found
            </h1>
            <p className="mb-8" style={{ color: textColor, opacity: 0.7 }}>
              The artwork you're looking for doesn't exist.
            </p>
            <Button
              onClick={() => navigate({ to: "/aura-collection" })}
              variant="outline"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Collection
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main
        className="min-h-screen pt-24 pb-16"
        style={{ backgroundColor, color: textColor }}
      >
        <div className="container mx-auto px-4">
          <Button
            onClick={() => navigate({ to: "/aura-collection" })}
            variant="ghost"
            className="mb-6"
            style={{ color: textColor }}
            data-ocid="artwork_detail.back_button"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Collection
          </Button>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Artwork Image Gallery */}
            <div className="relative">
              {/* Main image — click to open lightbox */}
              <button
                type="button"
                aria-label="Expand gallery"
                className="group relative flex w-full items-center justify-center overflow-hidden rounded-lg cursor-zoom-in"
                style={{
                  minHeight: "400px",
                  backgroundColor: `${textColor}08`,
                }}
                onClick={() => setIsLightboxOpen(true)}
                data-ocid="artwork_detail.gallery_image"
              >
                <img
                  src={getCurrentImageUrl()}
                  alt={`${artwork.title} — view ${currentImageIndex + 1}`}
                  className="max-h-[600px] w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== defaultArtworkImage)
                      target.src = defaultArtworkImage;
                  }}
                />

                {/* Magnifier hint */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1.5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
                  <ZoomIn className="h-4 w-4" />
                  <span className="text-xs font-medium tracking-wide">
                    Expand
                  </span>
                </div>

                {artwork.isForSale && currentImageIndex === 0 && (
                  <Badge
                    className="absolute left-4 top-4 text-base px-4 py-2"
                    style={{ backgroundColor: accentColor, color: "#1a1a1a" }}
                  >
                    Available for Purchase
                  </Badge>
                )}

                {/* Navigation Controls */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePreviousImage();
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:bg-white hover:scale-110 focus:outline-none"
                      style={{ color: accentColor }}
                      aria-label="Previous image"
                      data-ocid="artwork_detail.gallery_prev"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextImage();
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:bg-white hover:scale-110 focus:outline-none"
                      style={{ color: accentColor }}
                      aria-label="Next image"
                      data-ocid="artwork_detail.gallery_next"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-sm text-white pointer-events-none">
                      {currentImageIndex + 1} / {galleryImages.length}
                    </div>
                  </>
                )}
              </button>

              {/* Thumbnail Strip */}
              {galleryImages.length > 1 && (
                <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                  {galleryImages.map((img, index) => (
                    <button
                      type="button"
                      key={img || index}
                      onClick={() => setCurrentImageIndex(index)}
                      data-ocid={`artwork_detail.thumbnail.${index + 1}`}
                      className={`flex-shrink-0 overflow-hidden rounded border-2 transition-all focus:outline-none ${
                        index === currentImageIndex
                          ? ""
                          : "opacity-60 hover:opacity-100"
                      }`}
                      style={{
                        borderColor:
                          index === currentImageIndex
                            ? accentColor
                            : "transparent",
                      }}
                    >
                      <img
                        src={
                          img.startsWith("http") || img.startsWith("/assets/")
                            ? img
                            : `/assets/${img}`
                        }
                        alt={`Thumbnail ${index + 1}`}
                        className="h-16 w-16 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src !== defaultArtworkImage)
                            target.src = defaultArtworkImage;
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Artwork Details */}
            <div className="space-y-6">
              <div>
                <h1
                  className="mb-4 font-serif text-4xl font-light md:text-5xl"
                  style={{ color: headerTextColor }}
                >
                  {artwork.title}
                </h1>
                {artist && (
                  <button
                    type="button"
                    onClick={() =>
                      navigate({
                        to: "/artists/$artistId",
                        params: { artistId: artist.id },
                      })
                    }
                    className="flex items-center gap-2 transition-colors hover:opacity-80"
                    style={{ color: textColor, opacity: 0.7 }}
                    data-ocid="artwork_detail.artist_link"
                  >
                    <User className="h-5 w-5" />
                    <span className="text-lg">by {artist.name}</span>
                  </button>
                )}
              </div>

              <div
                className="border-t pt-6"
                style={{ borderColor: `${textColor}1a` }}
              >
                <h2
                  className="mb-3 text-xl font-medium"
                  style={{ color: headerTextColor }}
                >
                  About This Artwork
                </h2>
                <p
                  style={{ color: textColor, opacity: 0.8 }}
                  className="leading-relaxed"
                >
                  {artwork.description}
                </p>
              </div>

              {artwork.isForSale && artwork.price && (
                <div
                  className="border-t pt-6"
                  style={{ borderColor: `${textColor}1a` }}
                >
                  <h2
                    className="mb-3 text-xl font-medium"
                    style={{ color: headerTextColor }}
                  >
                    Price
                  </h2>
                  <p
                    className="text-3xl font-light"
                    style={{ color: accentColor }}
                  >
                    ${Number(artwork.price).toLocaleString()}
                  </p>
                </div>
              )}

              <div
                className="border-t pt-6 space-y-3"
                style={{ borderColor: `${textColor}1a` }}
              >
                {artwork.isForSale && (
                  <Button
                    onClick={() => {
                      window.location.href = "/#contact";
                    }}
                    className="w-full"
                    style={{ backgroundColor: accentColor, color: "#1a1a1a" }}
                    data-ocid="artwork_detail.inquire_button"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Inquire About Purchase
                  </Button>
                )}
                {artist && (
                  <Button
                    onClick={() =>
                      navigate({
                        to: "/artists/$artistId",
                        params: { artistId: artist.id },
                      })
                    }
                    variant="outline"
                    className="w-full"
                    style={{ borderColor: accentColor, color: accentColor }}
                    data-ocid="artwork_detail.view_artist_button"
                  >
                    View Artist Profile
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Related Artworks */}
          {(relatedArtworks.length > 0 || otherArtworks.length > 0) && (
            <div className="mt-20">
              <h2
                className="mb-8 text-center font-serif text-3xl font-light"
                style={{ color: headerTextColor }}
              >
                {relatedArtworks.length > 0
                  ? `More by ${artist?.name}`
                  : "More Artworks"}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {(relatedArtworks.length > 0
                  ? relatedArtworks
                  : otherArtworks
                ).map((relatedArtwork, index) => (
                  <Card
                    key={relatedArtwork.id}
                    data-ocid={`artwork_detail.related.${index + 1}`}
                    className="group overflow-hidden transition-all duration-[400ms] hover:shadow-xl cursor-pointer"
                    onClick={() =>
                      navigate({
                        to: "/artworks/$artworkId",
                        params: { artworkId: relatedArtwork.id },
                      })
                    }
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={relatedArtwork.photo || defaultArtworkImage}
                        alt={relatedArtwork.title}
                        className="h-full w-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.08]"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src !== defaultArtworkImage)
                            target.src = defaultArtworkImage;
                        }}
                      />
                      <div className="absolute inset-0 bg-luxury-gold/10 opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100 pointer-events-none" />
                      {relatedArtwork.isForSale && (
                        <Badge
                          className="absolute right-2 top-2"
                          style={{
                            backgroundColor: accentColor,
                            color: "#1a1a1a",
                          }}
                        >
                          Available
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3
                        className="mb-1 font-medium"
                        style={{ color: headerTextColor }}
                      >
                        {relatedArtwork.title}
                      </h3>
                      <p
                        className="line-clamp-2 text-sm"
                        style={{ color: textColor, opacity: 0.7 }}
                      >
                        {relatedArtwork.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Lightbox */}
      {isLightboxOpen && (
        <Lightbox
          images={resolvedGalleryUrls}
          initialIndex={currentImageIndex}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </>
  );
}
