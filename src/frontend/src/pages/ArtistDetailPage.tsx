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
  ZoomIn,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function ArtistDetailPage() {
  const navigate = useNavigate();
  const { artistId } = useParams({ from: "/artists/$artistId" });
  const { data: artists, isLoading: loadingArtists } = useLiveArtists();
  const { data: artworks, isLoading: loadingArtworks } = useLiveArtworks();
  const { data: siteConfig } = useLiveSiteConfig();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const artist = artists?.find((a) => a.id === artistId);
  const artistArtworks =
    artworks?.filter((artwork) => artwork.artistId === artistId) || [];
  const relatedArtists =
    artists?.filter((a) => a.id !== artistId).slice(0, 3) || [];

  const textColor = siteConfig?.textColor || "#000000";
  const headerTextColor = siteConfig?.headerTextColor || "#000000";
  const accentColor = siteConfig?.accentColor || "#FFD700";
  const backgroundColor =
    siteConfig?.artistDetailPageBackgroundColor || "#FFFFFF";

  const defaultArtistImage = useMemo(() => {
    if (siteConfig?.defaultArtistImage)
      return `/assets/${siteConfig.defaultArtistImage}`;
    return "/assets/generated/artist-profile-studio.jpg";
  }, [siteConfig?.defaultArtistImage]);

  const defaultArtworkImage = useMemo(() => {
    if (siteConfig?.defaultArtworkImage)
      return `/assets/${siteConfig.defaultArtworkImage}`;
    return "/assets/generated/abstract-geometric-art.jpg";
  }, [siteConfig?.defaultArtworkImage]);

  const galleryImages = useMemo(() => {
    if (!artist) return [];
    const images: string[] = [];
    if (artist.photo) images.push(artist.photo);
    if (artist.galleryImages && artist.galleryImages.length > 0) {
      images.push(...artist.galleryImages);
    }
    if (images.length === 0) images.push(defaultArtistImage);
    return images;
  }, [artist, defaultArtistImage]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: setCurrentImageIndex is stable
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [artistId]);

  useEffect(() => {
    if (siteConfig) {
      document.body.style.backgroundColor = backgroundColor;
    }
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [siteConfig, backgroundColor]);

  const getArtworkImage = (artwork: (typeof artistArtworks)[0]) =>
    artwork.photo || defaultArtworkImage;

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
    if (!imagePath) return defaultArtistImage;
    if (imagePath.startsWith("http") || imagePath.startsWith("/assets/"))
      return imagePath;
    return `/assets/${imagePath}`;
  };

  const resolvedGalleryUrls = galleryImages.map((img) => {
    if (img.startsWith("http") || img.startsWith("/assets/")) return img;
    return `/assets/${img}`;
  });

  if (loadingArtists || loadingArtworks) {
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

  if (!artist) {
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
              Artist Not Found
            </h1>
            <p className="mb-8" style={{ color: textColor, opacity: 0.7 }}>
              The artist you're looking for doesn't exist.
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
            data-ocid="artist_detail.back_button"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Collection
          </Button>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Artist Photo Gallery */}
            <div className="relative">
              {/* Main image — click to expand */}
              <button
                type="button"
                aria-label="Expand gallery"
                className="group relative flex w-full items-center justify-center overflow-hidden rounded-lg cursor-zoom-in"
                style={{
                  minHeight: "400px",
                  backgroundColor: `${textColor}08`,
                }}
                onClick={() => setIsLightboxOpen(true)}
                data-ocid="artist_detail.gallery_image"
              >
                <img
                  src={getCurrentImageUrl()}
                  alt={`${artist.name} — view ${currentImageIndex + 1}`}
                  className="max-h-[600px] w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== defaultArtistImage)
                      target.src = defaultArtistImage;
                  }}
                />

                {/* Magnifier hint */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1.5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
                  <ZoomIn className="h-4 w-4" />
                  <span className="text-xs font-medium tracking-wide">
                    Expand
                  </span>
                </div>

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
                      data-ocid="artist_detail.gallery_prev"
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
                      data-ocid="artist_detail.gallery_next"
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
                      data-ocid={`artist_detail.thumbnail.${index + 1}`}
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
                          if (target.src !== defaultArtistImage)
                            target.src = defaultArtistImage;
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Artist Details */}
            <div className="space-y-6">
              <div>
                <h1
                  className="mb-4 font-serif text-4xl font-light md:text-5xl"
                  style={{ color: headerTextColor }}
                >
                  {artist.name}
                </h1>
                <Badge
                  style={{ backgroundColor: accentColor, color: "#1a1a1a" }}
                >
                  Featured Artist
                </Badge>
              </div>

              <div
                className="border-t pt-6"
                style={{ borderColor: `${textColor}1a` }}
              >
                <h2
                  className="mb-3 text-xl font-medium"
                  style={{ color: headerTextColor }}
                >
                  Biography
                </h2>
                <p
                  style={{ color: textColor, opacity: 0.8 }}
                  className="leading-relaxed"
                >
                  {artist.bio}
                </p>
              </div>

              <div
                className="border-t pt-6"
                style={{ borderColor: `${textColor}1a` }}
              >
                <Button
                  onClick={() => {
                    window.location.href = "/#contact";
                  }}
                  variant="outline"
                  className="w-full"
                  style={{ borderColor: accentColor, color: accentColor }}
                  data-ocid="artist_detail.contact_button"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Contact About This Artist
                </Button>
              </div>
            </div>
          </div>

          {/* Artist's Artworks */}
          {artistArtworks.length > 0 && (
            <div className="mt-20">
              <h2
                className="mb-8 text-center font-serif text-3xl font-light"
                style={{ color: headerTextColor }}
              >
                Artworks by {artist.name}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {artistArtworks.map((artwork, index) => (
                  <Card
                    key={artwork.id}
                    data-ocid={`artist_detail.artwork.${index + 1}`}
                    className="group overflow-hidden transition-all duration-[400ms] hover:shadow-xl cursor-pointer"
                    onClick={() =>
                      navigate({
                        to: "/artworks/$artworkId",
                        params: { artworkId: artwork.id },
                      })
                    }
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={getArtworkImage(artwork)}
                        alt={artwork.title}
                        className="h-full w-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.08]"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src !== defaultArtworkImage)
                            target.src = defaultArtworkImage;
                        }}
                      />
                      <div className="absolute inset-0 bg-luxury-gold/10 opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100 pointer-events-none" />
                      {artwork.isForSale && (
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
                        {artwork.title}
                      </h3>
                      <p
                        className="line-clamp-2 text-sm"
                        style={{ color: textColor, opacity: 0.7 }}
                      >
                        {artwork.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Related Artists */}
          {relatedArtists.length > 0 && (
            <div className="mt-20">
              <h2
                className="mb-8 text-center font-serif text-3xl font-light"
                style={{ color: headerTextColor }}
              >
                More Artists
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedArtists.map((relatedArtist, index) => (
                  <Card
                    key={relatedArtist.id}
                    data-ocid={`artist_detail.related.${index + 1}`}
                    className="group overflow-hidden transition-all duration-[400ms] hover:shadow-xl cursor-pointer"
                    onClick={() =>
                      navigate({
                        to: "/artists/$artistId",
                        params: { artistId: relatedArtist.id },
                      })
                    }
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={relatedArtist.photo || defaultArtistImage}
                        alt={relatedArtist.name}
                        className="h-full w-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.08]"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src !== defaultArtistImage)
                            target.src = defaultArtistImage;
                        }}
                      />
                      <div className="absolute inset-0 bg-luxury-gold/10 opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100 pointer-events-none" />
                    </div>
                    <CardContent className="p-4">
                      <h3
                        className="mb-2 font-serif text-xl font-light"
                        style={{ color: headerTextColor }}
                      >
                        {relatedArtist.name}
                      </h3>
                      <p
                        className="line-clamp-2 text-sm"
                        style={{ color: textColor, opacity: 0.7 }}
                      >
                        {relatedArtist.bio}
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
