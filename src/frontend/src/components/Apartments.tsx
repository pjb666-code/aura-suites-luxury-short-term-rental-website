import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLiveApartments, useLiveSiteConfig } from "@/hooks/useQueries";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { useEffect, useMemo } from "react";

export default function Apartments() {
  const navigate = useNavigate();
  const { data: apartments, isLoading } = useLiveApartments();
  const { data: siteConfig } = useLiveSiteConfig();

  const textColor = siteConfig?.textColor || "#000000";
  const headerTextColor = siteConfig?.headerTextColor || "#000000";
  const accentColor = siteConfig?.accentColor || "#FFD700";

  const defaultImage = useMemo(() => {
    if (siteConfig?.defaultApartmentImage) {
      return `/assets/${siteConfig.defaultApartmentImage}`;
    }
    return "/assets/generated/hero-apartment-interior.jpg";
  }, [siteConfig?.defaultApartmentImage]);

  useEffect(() => {
    if (siteConfig) {
      document.documentElement.style.setProperty(
        "--dynamic-text-color",
        textColor,
      );
      document.documentElement.style.setProperty(
        "--dynamic-header-color",
        headerTextColor,
      );
      document.documentElement.style.setProperty(
        "--dynamic-accent-color",
        accentColor,
      );
    }
  }, [siteConfig, textColor, headerTextColor, accentColor]);

  const activeApartments = apartments?.filter((apt) => apt.isActive) || [];
  const featuredApartments = activeApartments.slice(0, 3);

  const getApartmentImage = (apartment: (typeof activeApartments)[0]) => {
    if (
      apartment.photos &&
      apartment.photos.length > 0 &&
      apartment.photos[0]
    ) {
      return apartment.photos[0];
    }
    return defaultImage;
  };

  return (
    <section
      id="apartments"
      className="relative overflow-hidden bg-background py-24 md:py-32"
    >
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2
            className="mb-4 font-serif text-4xl font-light md:text-5xl lg:text-6xl"
            style={{ color: headerTextColor }}
          >
            Luxury Apartments
          </h2>
          <div
            className="mx-auto h-1 w-24"
            style={{ backgroundColor: accentColor }}
          />
          <p
            className="mx-auto mt-6 max-w-2xl text-lg opacity-80"
            style={{ color: textColor }}
          >
            Experience refined living in our curated collection of artist lofts
          </p>
        </div>

        {!isLoading && featuredApartments.length > 0 && (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredApartments.map((apartment) => (
                <Card
                  key={apartment.id}
                  data-ocid={`apartments.card.${apartment.id}`}
                  className="group relative overflow-hidden border-luxury-gold/20 bg-white shadow-lg transition-all duration-[400ms] hover:shadow-2xl cursor-pointer"
                  style={{ transitionTimingFunction: "ease-in-out" }}
                  onClick={() =>
                    navigate({
                      to: "/apartments/$apartmentId",
                      params: { apartmentId: apartment.id },
                    })
                  }
                >
                  {/* Image container */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={getApartmentImage(apartment)}
                      alt={apartment.name}
                      className="h-full w-full object-cover transition-transform duration-[400ms] ease-in-out group-hover:scale-[1.08]"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== defaultImage)
                          target.src = defaultImage;
                      }}
                    />
                    {/* Golden overlay on hover */}
                    <div className="absolute inset-0 bg-luxury-gold/10 opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100 pointer-events-none" />

                    <Badge
                      className="absolute right-4 top-4"
                      style={{ backgroundColor: accentColor, color: "#1a1a1a" }}
                    >
                      {apartment.city}
                    </Badge>

                    {/* "View Apartment" slide-up bar */}
                    <div
                      className="absolute bottom-0 inset-x-0 flex items-center justify-center py-3 translate-y-full transition-transform duration-[400ms] ease-in-out group-hover:translate-y-0"
                      style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
                    >
                      <span className="text-sm font-semibold tracking-widest uppercase text-white">
                        View Apartment
                      </span>
                      <ArrowRight className="ml-2 h-4 w-4 text-white" />
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3
                      className="mb-2 font-serif text-2xl font-light transition-colors duration-[400ms] group-hover:opacity-80"
                      style={{ color: headerTextColor }}
                    >
                      {apartment.name}
                    </h3>

                    <div
                      className="mb-4 flex items-center text-sm opacity-70"
                      style={{ color: textColor }}
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      {apartment.address}
                    </div>

                    <p
                      className="mb-4 line-clamp-3 opacity-80"
                      style={{ color: textColor }}
                    >
                      {apartment.description}
                    </p>

                    <div className="space-y-2">
                      <p
                        className="text-sm font-medium"
                        style={{ color: accentColor }}
                      >
                        Amenities:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {apartment.amenities.slice(0, 3).map((amenity) => (
                          <div
                            key={amenity}
                            className="flex items-center text-sm opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                            style={{ color: textColor }}
                          >
                            <Check
                              className="mr-1 h-3 w-3"
                              style={{ color: accentColor }}
                            />
                            {amenity}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div
                      className="mt-4 flex items-center text-sm font-medium transition-all duration-300 group-hover:gap-2"
                      style={{ color: accentColor }}
                    >
                      View Details
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {activeApartments.length > 3 && (
              <div className="mt-12 text-center">
                <Button
                  onClick={() => navigate({ to: "/apartments" })}
                  variant="outline"
                  size="lg"
                  style={{ borderColor: accentColor, color: accentColor }}
                  className="hover:opacity-90"
                  data-ocid="apartments.view_all_button"
                >
                  View All Apartments
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </>
        )}

        {!isLoading && featuredApartments.length === 0 && (
          <div className="text-center" data-ocid="apartments.empty_state">
            <p className="text-lg opacity-70" style={{ color: textColor }}>
              Our luxury apartments will be available soon. Stay tuned!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
