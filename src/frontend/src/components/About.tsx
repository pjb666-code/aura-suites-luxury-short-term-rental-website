import { useLiveSiteConfig } from "@/hooks/useQueries";
import { useEffect, useState } from "react";

const FALLBACK_IMAGE = "/assets/generated/curated-living-space.jpg";

export default function About() {
  const { data: siteConfig } = useLiveSiteConfig();
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  const aboutSection = siteConfig?.aboutSection;
  const textColor =
    aboutSection?.textColor || siteConfig?.textColor || "#000000";
  const headerTextColor = siteConfig?.headerTextColor || "#000000";
  const accentColor = siteConfig?.accentColor || "#B8860B";
  const backgroundColor = aboutSection?.backgroundColor || "#FFFFFF";
  const title = aboutSection?.title || "About Aura Suites";
  const content =
    aboutSection?.content ||
    "Experience luxury living and exquisite art in the heart of the city.";

  // Resolve the image source whenever siteConfig loads
  useEffect(() => {
    const raw = aboutSection?.image || "";
    if (raw && raw.trim().length > 0) {
      setImgSrc(raw.trim());
    } else {
      setImgSrc(FALLBACK_IMAGE);
    }
    setImgError(false);
  }, [aboutSection?.image]);

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

  const paragraphs = content.split("\n").filter((p) => p.trim());

  const handleImgError = () => {
    if (imgSrc !== FALLBACK_IMAGE) {
      setImgSrc(FALLBACK_IMAGE);
    } else {
      // Even fallback failed — show styled placeholder
      setImgError(true);
    }
  };

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor }}
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Section Title */}
          <div className="mb-16 text-center">
            <h2
              className="mb-4 font-serif text-4xl font-light md:text-5xl lg:text-6xl"
              style={{ color: headerTextColor }}
            >
              {title}
            </h2>
            <div
              className="mx-auto h-1 w-24"
              style={{ backgroundColor: accentColor }}
            />
          </div>

          {/* Content Grid */}
          <div className="grid gap-12 md:grid-cols-2">
            {/* Left Column - Image or Placeholder */}
            <div className="relative overflow-hidden rounded-lg shadow-2xl">
              {imgError ? (
                /* Beautiful styled placeholder when all image sources fail */
                <div
                  className="flex h-full min-h-[320px] w-full items-center justify-center rounded-lg"
                  style={{
                    background:
                      "linear-gradient(135deg, #f5f0eb 0%, #e8ddd4 50%, #d4c5b5 100%)",
                  }}
                >
                  <div className="text-center" style={{ color: accentColor }}>
                    <div className="mb-3 text-5xl opacity-40">✦</div>
                    <p
                      className="font-serif text-sm font-light tracking-widest opacity-60"
                      style={{ color: "#8a7560" }}
                    >
                      AURA SUITES
                    </p>
                  </div>
                </div>
              ) : (
                <img
                  src={imgSrc ?? FALLBACK_IMAGE}
                  alt="About Aura Suites"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  onError={handleImgError}
                />
              )}
            </div>

            {/* Right Column - Text */}
            <div className="flex flex-col justify-center space-y-6">
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-lg leading-relaxed opacity-85"
                  style={{ color: textColor }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div
        className="absolute -right-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: accentColor }}
      />
    </section>
  );
}
