import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Lightbox from "@/components/Lightbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLiveApartments, useLiveSiteConfig } from "@/hooks/useQueries";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Check, ExternalLink, MapPin, ZoomIn } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function ApartmentDetailPage() {
  const navigate = useNavigate();
  const { apartmentId } = useParams({ from: "/apartments/$apartmentId" });
  const { data: apartments, isLoading } = useLiveApartments();
  const { data: siteConfig } = useLiveSiteConfig();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const apartment = apartments?.find((apt) => apt.id === apartmentId);
  const relatedApartments =
    apartments
      ?.filter((apt) => apt.id !== apartmentId && apt.isActive)
      .slice(0, 3) || [];

  const textColor = siteConfig?.textColor || "#000000";
  const headerTextColor = siteConfig?.headerTextColor || "#000000";
  const accentColor = siteConfig?.accentColor || "#FFD700";
  const backgroundColor =
    siteConfig?.apartmentDetailPageBackgroundColor || "#FFFFFF";

  const defaultImage = useMemo(() => {
    if (siteConfig?.defaultApartmentImage) {
      return `/assets/${siteConfig.defaultApartmentImage}`;
    }
    return "/assets/generated/luxury-bedroom-art.jpg";
  }, [siteConfig?.defaultApartmentImage]);

  useEffect(() => {
    if (siteConfig) {
      document.body.style.backgroundColor = backgroundColor;
    }
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [siteConfig, backgroundColor]);

  const handleBooking = () => {
    const bookingUrl =
      apartment?.bookingUrl || siteConfig?.bookingUrl || "https://booking.com";
    window.open(bookingUrl, "_blank", "noopener,noreferrer");
  };

  const getApartmentImage = (apt: typeof apartment) => {
    if (apt?.photos && apt.photos.length > 0 && apt.photos[0]) {
      return apt.photos[0];
    }
    return defaultImage;
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  if (isLoading) {
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

  if (!apartment) {
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
              Apartment Not Found
            </h1>
            <p className="mb-8" style={{ color: textColor, opacity: 0.7 }}>
              The apartment you're looking for doesn't exist.
            </p>
            <Button
              onClick={() => navigate({ to: "/apartments" })}
              variant="outline"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Apartments
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const photos =
    apartment.photos && apartment.photos.length > 0
      ? apartment.photos
      : [defaultImage];

  return (
    <>
      <Header />
      <main
        className="min-h-screen pt-24 pb-16"
        style={{ backgroundColor, color: textColor }}
      >
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button
            onClick={() => navigate({ to: "/apartments" })}
            variant="ghost"
            className="mb-6 hover:opacity-80"
            style={{ color: textColor }}
            data-ocid="apartment_detail.back_button"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Apartments
          </Button>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main image — click to open lightbox */}
              <button
                type="button"
                aria-label="Expand gallery"
                className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg border cursor-zoom-in block"
                style={{ borderColor: `${accentColor}33` }}
                onClick={() => openLightbox(selectedImage)}
                data-ocid="apartment_detail.main_image"
              >
                <img
                  src={photos[selectedImage]}
                  alt={`${apartment.name} — view ${selectedImage + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== defaultImage) target.src = defaultImage;
                  }}
                />
                {/* Magnifier hint */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1.5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
                  <ZoomIn className="h-4 w-4" />
                  <span className="text-xs font-medium tracking-wide">
                    Expand
                  </span>
                </div>
              </button>

              {/* Thumbnails */}
              {photos.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {photos.map((photo, idx) => (
                    <button
                      type="button"
                      key={photo || idx}
                      onClick={() => setSelectedImage(idx)}
                      data-ocid={`apartment_detail.thumbnail.${idx + 1}`}
                      className="group/thumb relative aspect-square overflow-hidden rounded-lg border-2 transition-all"
                      style={{
                        borderColor:
                          selectedImage === idx
                            ? accentColor
                            : `${textColor}33`,
                      }}
                    >
                      <img
                        src={photo}
                        alt={`Thumbnail ${idx + 1}`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src !== defaultImage)
                            target.src = defaultImage;
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Apartment Details */}
            <div className="space-y-6">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <Badge
                    style={{ backgroundColor: accentColor, color: "#1a1a1a" }}
                  >
                    {apartment.city}
                  </Badge>
                </div>
                <h1
                  className="mb-4 font-serif text-4xl font-light md:text-5xl"
                  style={{ color: headerTextColor }}
                >
                  {apartment.name}
                </h1>
                <div
                  className="flex items-center"
                  style={{ color: textColor, opacity: 0.7 }}
                >
                  <MapPin className="mr-2 h-5 w-5" />
                  {apartment.address}
                </div>
              </div>

              <div
                className="border-t pt-6"
                style={{ borderColor: `${textColor}1a` }}
              >
                <h2
                  className="mb-3 text-xl font-medium"
                  style={{ color: headerTextColor }}
                >
                  About This Apartment
                </h2>
                <p
                  style={{ color: textColor, opacity: 0.8 }}
                  className="leading-relaxed"
                >
                  {apartment.description}
                </p>
              </div>

              <div
                className="border-t pt-6"
                style={{ borderColor: `${textColor}1a` }}
              >
                <h2
                  className="mb-4 text-xl font-medium"
                  style={{ color: headerTextColor }}
                >
                  Amenities
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {apartment.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center"
                      style={{ color: textColor, opacity: 0.8 }}
                    >
                      <Check
                        className="mr-2 h-5 w-5 flex-shrink-0"
                        style={{ color: accentColor }}
                      />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="border-t pt-6"
                style={{ borderColor: `${textColor}1a` }}
              >
                <Button
                  onClick={handleBooking}
                  size="lg"
                  className="w-full transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: accentColor, color: "#1a1a1a" }}
                  data-ocid="apartment_detail.book_button"
                >
                  Book This Apartment
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Related Apartments */}
          {relatedApartments.length > 0 && (
            <div className="mt-20">
              <h2
                className="mb-8 text-center font-serif text-3xl font-light"
                style={{ color: headerTextColor }}
              >
                More Apartments
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedApartments.map((apt, index) => (
                  <Card
                    key={apt.id}
                    data-ocid={`apartment_detail.related.${index + 1}`}
                    className="group overflow-hidden transition-all duration-[400ms] hover:shadow-xl cursor-pointer"
                    onClick={() =>
                      navigate({
                        to: "/apartments/$apartmentId",
                        params: { apartmentId: apt.id },
                      })
                    }
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={getApartmentImage(apt)}
                        alt={apt.name}
                        className="h-full w-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.08]"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src !== defaultImage)
                            target.src = defaultImage;
                        }}
                      />
                      <div className="absolute inset-0 bg-luxury-gold/10 opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100 pointer-events-none" />
                    </div>
                    <CardContent className="p-4">
                      <h3
                        className="mb-2 font-serif text-xl font-light"
                        style={{ color: headerTextColor }}
                      >
                        {apt.name}
                      </h3>
                      <p
                        className="line-clamp-2 text-sm"
                        style={{ color: textColor, opacity: 0.7 }}
                      >
                        {apt.description}
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
          images={photos}
          initialIndex={lightboxIndex}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </>
  );
}
