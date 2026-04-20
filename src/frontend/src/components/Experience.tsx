import ScrollReveal from "@/components/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLiveSiteConfig } from "@/hooks/useQueries";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, MapPin, Music, Sparkles, Utensils } from "lucide-react";
import { useEffect, useMemo } from "react";

const experiences = [
  {
    icon: MapPin,
    title: "Central Location",
    description:
      "In the heart of Palermo Hollywood, surrounded by culture and history.",
    image: "/assets/generated/cultural-district-street.jpg",
  },
  {
    icon: Music,
    title: "Culture & Nightlife",
    description: "Experience tango shows, live music, and vibrant nightlife.",
    image: "/assets/generated/buenos-aires-sunset-skyline.jpg",
  },
  {
    icon: Utensils,
    title: "Gastronomy",
    description: "World-class restaurants and authentic parrillas nearby.",
    image: "/assets/generated/lifestyle-wine-balcony.jpg",
  },
  {
    icon: Sparkles,
    title: "Exclusive Services",
    description: "Personal concierge and curated experiences for our guests.",
    image: "/assets/generated/curated-living-space.jpg",
  },
];

export default function Experience() {
  const navigate = useNavigate();
  const { data: siteConfig } = useLiveSiteConfig();

  const textColor = siteConfig?.textColor || "#000000";
  const headerTextColor = siteConfig?.headerTextColor || "#000000";
  const accentColor = siteConfig?.accentColor || "#FFD700";

  // Memoize default fallback image
  const defaultImage = useMemo(
    () => "/assets/generated/hero-apartment-interior.jpg",
    [],
  );

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

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-background py-24 md:py-32"
    >
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2
            className="mb-4 font-serif text-4xl font-light md:text-5xl lg:text-6xl"
            style={{ color: headerTextColor }}
          >
            The Aura Experience
          </h2>
          <div
            className="mx-auto h-1 w-24"
            style={{ backgroundColor: accentColor }}
          />
          <p
            className="mx-auto mt-6 max-w-2xl text-lg opacity-80"
            style={{ color: textColor }}
          >
            More than accommodation – a world-class lifestyle experience
          </p>
        </div>

        {/* Experience Grid - NO DARK OVERLAYS */}
        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {experiences.map((experience, index) => {
            const Icon = experience.icon;
            return (
              <ScrollReveal
                key={experience.title}
                delay={index * 0.1}
                direction="up"
              >
                <Card className="group overflow-hidden border-luxury-gold/20 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl h-full">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== defaultImage) {
                          target.src = defaultImage;
                        }
                      }}
                    />
                    {/* Icon overlay at bottom - NO DARK BACKGROUND */}
                    <div className="absolute bottom-4 left-6">
                      <div
                        className="rounded-full p-3 backdrop-blur-sm transition-all duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${accentColor}20` }}
                      >
                        <Icon
                          className="h-6 w-6"
                          style={{ color: accentColor }}
                        />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3
                      className="mb-3 font-serif text-2xl font-light transition-colors duration-300"
                      style={{ color: headerTextColor }}
                    >
                      {experience.title}
                    </h3>
                    <p
                      className="leading-relaxed opacity-80"
                      style={{ color: textColor }}
                    >
                      {experience.description}
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button
            onClick={() => navigate({ to: "/experience" })}
            variant="outline"
            size="lg"
            style={{ borderColor: accentColor, color: accentColor }}
            className="hover:opacity-90"
          >
            Discover More
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
