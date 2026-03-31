import { useLiveSiteConfig } from '@/hooks/useQueries';
import { useEffect } from 'react';

export default function About() {
  const { data: siteConfig } = useLiveSiteConfig();

  const aboutSection = siteConfig?.aboutSection;
  const textColor = aboutSection?.textColor || siteConfig?.textColor || '#000000';
  const headerTextColor = siteConfig?.headerTextColor || '#000000';
  const accentColor = siteConfig?.accentColor || '#FFD700';
  const backgroundColor = aboutSection?.backgroundColor || '#FFFFFF';
  const title = aboutSection?.title || 'About Aura Suites';
  const content = aboutSection?.content || 'Experience luxury living and exquisite art in the heart of the city.';
  const image = aboutSection?.image || '/assets/generated/curated-living-space.jpg';

  useEffect(() => {
    if (siteConfig) {
      document.documentElement.style.setProperty('--dynamic-text-color', textColor);
      document.documentElement.style.setProperty('--dynamic-header-color', headerTextColor);
      document.documentElement.style.setProperty('--dynamic-accent-color', accentColor);
    }
  }, [siteConfig, textColor, headerTextColor, accentColor]);

  const paragraphs = content.split('\n').filter(p => p.trim());

  return (
    <section className="relative overflow-hidden py-24 md:py-32" style={{ backgroundColor }}>
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
            <div className="mx-auto h-1 w-24" style={{ backgroundColor: accentColor }} />
          </div>

          {/* Content Grid */}
          <div className="grid gap-12 md:grid-cols-2">
            {/* Left Column - Image */}
            {image && (
              <div className="relative overflow-hidden rounded-lg shadow-2xl">
                <img 
                  src={image} 
                  alt="About Aura Suites"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            )}

            {/* Right Column - Text */}
            <div className={`flex flex-col justify-center space-y-6 ${!image ? 'md:col-span-2' : ''}`}>
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-lg leading-relaxed opacity-85" style={{ color: textColor }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute -right-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full blur-3xl opacity-10" style={{ backgroundColor: accentColor }} />
    </section>
  );
}
