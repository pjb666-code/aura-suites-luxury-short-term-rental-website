import { Button } from "@/components/ui/button";
import { useLiveSiteConfig } from "@/hooks/useQueries";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

const DEFAULT_HERO_IMAGE = "/assets/generated/hero-apartment-interior.jpg";

export default function Hero() {
  const { data: siteConfig } = useLiveSiteConfig();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(DEFAULT_HERO_IMAGE);

  const heroSection = siteConfig?.heroSection;
  const textColor = heroSection?.textColor || "#FFFFFF";
  const accentColor = siteConfig?.accentColor || "#FFD700";

  // Compute background image only when siteConfig changes — never during render
  const backgroundImage = useMemo(() => {
    const path = heroSection?.backgroundImage;
    if (path && path.trim() !== "") return path;
    return DEFAULT_HERO_IMAGE;
  }, [heroSection?.backgroundImage]);

  // Update src only when the resolved background image URL changes
  useEffect(() => {
    setImgLoaded(false);
    setImgSrc(backgroundImage);
  }, [backgroundImage]);

  const handleImgLoad = useCallback(() => {
    setImgLoaded(true);
  }, []);

  const handleImgError = useCallback(() => {
    // Set fallback once — don't loop
    setImgSrc(DEFAULT_HERO_IMAGE);
    setImgLoaded(true);
  }, []);

  const title =
    heroSection?.title ||
    "Luxury Artist Lofts in the Heart of Palermo Hollywood";
  const subtitle =
    heroSection?.subtitle ||
    "Where Luxury Meets Art – Experience Exclusive Living in a Curated Atmosphere";

  useEffect(() => {
    if (siteConfig) {
      document.documentElement.style.setProperty(
        "--dynamic-text-color",
        textColor,
      );
      document.documentElement.style.setProperty(
        "--dynamic-accent-color",
        accentColor,
      );
    }
  }, [siteConfig, textColor, accentColor]);

  const handleBooking = () => {
    const bookingUrl = siteConfig?.bookingUrl || "https://booking.com";
    window.open(bookingUrl, "_blank", "noopener,noreferrer");
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image — Ken Burns effect */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={imgSrc}
          alt=""
          aria-hidden="true"
          onLoad={handleImgLoad}
          onError={handleImgError}
          className="h-full w-full object-cover transition-opacity duration-700 animate-ken-burns"
          style={{ opacity: imgLoaded ? 1 : 0 }}
          loading="eager"
          fetchPriority="high"
        />
        {/* Fallback solid background while image loads */}
        {!imgLoaded && <div className="absolute inset-0 bg-luxury-dark" />}
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-dark/80 via-luxury-dark/60 to-luxury-dark/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <h1
          className="mb-6 max-w-4xl animate-fade-in-up font-serif text-4xl font-light leading-tight md:text-6xl lg:text-7xl drop-shadow-2xl"
          style={{ color: textColor }}
        >
          {title}
        </h1>

        <p
          className="mb-12 max-w-2xl animate-fade-in-up text-lg delay-100 md:text-xl drop-shadow-lg opacity-90"
          style={{ color: textColor }}
        >
          {subtitle}
        </p>

        <Button
          type="button"
          size="lg"
          onClick={handleBooking}
          className="animate-fade-in-up delay-200 px-8 py-6 text-lg font-medium shadow-2xl transition-all duration-300 hover:scale-105"
          style={{ backgroundColor: accentColor, color: "#1a1a1a" }}
        >
          Book Your Stay
        </Button>

        <button
          type="button"
          aria-label="Scroll to contact"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={scrollToContact}
        >
          <ChevronDown
            className="h-8 w-8 opacity-70"
            style={{ color: accentColor }}
          />
        </button>
      </div>
    </section>
  );
}
