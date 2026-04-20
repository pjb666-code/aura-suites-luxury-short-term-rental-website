import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useLiveApartments, useLiveSiteConfig } from "@/hooks/useQueries";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check, MapPin, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function ApartmentsPage() {
  const navigate = useNavigate();
  const { data: apartments, isLoading } = useLiveApartments();
  const { data: siteConfig } = useLiveSiteConfig();
  const [searchQuery, setSearchQuery] = useState("");

  const activeApartments = apartments?.filter((apt) => apt.isActive) || [];

  const filteredApartments = activeApartments.filter(
    (apt) =>
      apt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.address.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const textColor = siteConfig?.textColor || "#FFFFFF";
  const headerTextColor = siteConfig?.headerTextColor || "#FFFFFF";
  const accentColor = siteConfig?.accentColor || "#FFD700";
  const backgroundColor =
    siteConfig?.apartmentsPageBackgroundColor || "#1a1a1a";

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

  // Alternate aspect ratio for editorial masonry feel: even=landscape, odd=portrait
  const getAspectClass = (index: number) =>
    index % 2 === 0 ? "aspect-video" : "aspect-[3/4]";

  return (
    <>
      <Header />
      <main
        className="min-h-screen pt-24 pb-16"
        style={{ backgroundColor, color: textColor }}
      >
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1
              className="mb-4 font-serif text-5xl font-light md:text-6xl lg:text-7xl"
              style={{ color: headerTextColor }}
            >
              Our Apartments
            </h1>
            <div
              className="mx-auto h-1 w-24"
              style={{ backgroundColor: accentColor }}
            />
            <p
              className="mx-auto mt-6 max-w-2xl text-lg"
              style={{ color: textColor, opacity: 0.8 }}
            >
              Explore our collection of luxury artist lofts in Palermo Hollywood
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-10 mx-auto max-w-2xl">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5"
                style={{ color: textColor, opacity: 0.5 }}
              />
              <Input
                type="text"
                placeholder="Search apartments by name, location, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-ocid="apartments.search_input"
                style={{
                  backgroundColor: `${textColor}10`,
                  borderColor: `${textColor}20`,
                  color: textColor,
                }}
              />
            </div>
          </div>

          {/* Masonry Grid */}
          {isLoading ? (
            /* Loading skeleton — uniform grid */
            <div
              className="masonry-grid"
              style={{ columns: "3 280px", gap: "2rem" }}
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="mb-8 break-inside-avoid overflow-hidden rounded-lg border"
                  style={{
                    borderColor: `${textColor}10`,
                    backgroundColor: `${textColor}05`,
                  }}
                >
                  <div
                    className={`w-full animate-pulse ${i % 2 === 0 ? "aspect-video" : "aspect-[3/4]"}`}
                    style={{ backgroundColor: `${textColor}10` }}
                  />
                  <div className="p-6 space-y-3">
                    <div
                      className="h-6 w-3/4 animate-pulse rounded"
                      style={{ backgroundColor: `${textColor}10` }}
                    />
                    <div
                      className="h-4 w-full animate-pulse rounded"
                      style={{ backgroundColor: `${textColor}10` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredApartments.length > 0 ? (
            <div style={{ columns: "3 280px", gap: "2rem" }}>
              {filteredApartments.map((apartment, index) => (
                <button
                  key={apartment.id}
                  type="button"
                  data-ocid={`apartments.item.${index + 1}`}
                  className="group mb-8 break-inside-avoid overflow-hidden rounded-lg cursor-pointer transition-all duration-[400ms] ease-in-out hover:shadow-2xl w-full text-left bg-transparent p-0"
                  style={{
                    border: `1px solid ${textColor}10`,
                    backgroundColor: `${textColor}05`,
                  }}
                  onClick={() =>
                    navigate({
                      to: "/apartments/$apartmentId",
                      params: { apartmentId: apartment.id },
                    })
                  }
                >
                  {/* Image — alternating aspect ratios */}
                  <div
                    className={`relative overflow-hidden ${getAspectClass(index)}`}
                  >
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
                    {/* Golden overlay */}
                    <div className="absolute inset-0 bg-luxury-gold/10 opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100 pointer-events-none" />

                    <Badge
                      className="absolute right-4 top-4"
                      style={{ backgroundColor: accentColor, color: "#1a1a1a" }}
                    >
                      {apartment.city}
                    </Badge>

                    {/* Slide-up bar */}
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

                  {/* Card Content */}
                  <div className="p-6">
                    <h3
                      className="mb-2 font-serif text-2xl font-light transition-colors duration-[400ms]"
                      style={{ color: headerTextColor }}
                    >
                      {apartment.name}
                    </h3>

                    <div
                      className="mb-4 flex items-center text-sm"
                      style={{ color: textColor, opacity: 0.7 }}
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      {apartment.address}
                    </div>

                    <p
                      className="mb-4 line-clamp-3"
                      style={{ color: textColor, opacity: 0.8 }}
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
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        {apartment.amenities.slice(0, 4).map((amenity) => (
                          <div
                            key={amenity}
                            className="flex items-center text-sm"
                            style={{ color: textColor, opacity: 0.7 }}
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
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div
              className="text-center py-16"
              data-ocid="apartments.empty_state"
            >
              <p className="text-lg" style={{ color: textColor, opacity: 0.7 }}>
                {searchQuery
                  ? "No apartments found matching your search."
                  : "No apartments available at the moment."}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
