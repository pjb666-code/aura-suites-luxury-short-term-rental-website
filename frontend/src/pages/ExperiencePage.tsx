import { useEffect, useMemo, useState } from 'react';
import { useLiveSiteConfig } from '@/hooks/useQueries';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Music, Utensils, Sparkles, ChevronDown, Star, Award, Heart, Zap } from 'lucide-react';

// Icon mapping for highlights
const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  star: Star,
  award: Award,
  heart: Heart,
  zap: Zap,
  mapPin: MapPin,
  music: Music,
  utensils: Utensils,
  sparkles: Sparkles,
};

export default function ExperiencePage() {
  const { data: siteConfig } = useLiveSiteConfig();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const textColor = siteConfig?.experiencePage?.textColor || siteConfig?.textColor || '#000000';
  const headerTextColor = siteConfig?.headerTextColor || '#000000';
  const accentColor = siteConfig?.accentColor || '#FFD700';
  const backgroundColor = siteConfig?.experiencePage?.backgroundColor || '#FFFFFF';

  // Get highlights and sections from config
  const highlights = siteConfig?.experiencePage?.highlights || [];
  const sections = siteConfig?.experiencePage?.sections || [];

  // Filter active sections and sort by order
  const activeSections = sections
    .filter(s => s.isActive)
    .sort((a, b) => Number(a.order) - Number(b.order));

  // Memoize default fallback image
  const defaultImage = useMemo(() => '/assets/generated/hero-apartment-interior.jpg', []);

  useEffect(() => {
    if (siteConfig) {
      document.body.style.backgroundColor = backgroundColor;
      document.documentElement.style.setProperty('--dynamic-text-color', textColor);
      document.documentElement.style.setProperty('--dynamic-header-color', headerTextColor);
      document.documentElement.style.setProperty('--dynamic-accent-color', accentColor);
    }
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [siteConfig, backgroundColor, textColor, headerTextColor, accentColor]);

  const title = siteConfig?.experiencePage?.title || 'The Aura Experience';
  const description = siteConfig?.experiencePage?.description || 'More than just accommodation – a world-class lifestyle experience';

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const getIconComponent = (iconName: string) => {
    return iconMap[iconName] || Sparkles;
  };

  return (
    <>
      <Header />
      <main className="min-h-screen py-24 md:py-32" style={{ backgroundColor }}>
        <div className="container mx-auto px-4">
          {/* Page Title */}
          <div className="mb-16 text-center">
            <h1 
              className="mb-4 font-serif text-4xl font-light md:text-5xl lg:text-6xl"
              style={{ color: headerTextColor }}
            >
              {title}
            </h1>
            <div className="mx-auto h-1 w-24" style={{ backgroundColor: accentColor }} />
            <p className="mx-auto mt-6 max-w-2xl text-lg" style={{ color: textColor }}>
              {description}
            </p>
          </div>

          {/* Highlights Section */}
          {highlights.length > 0 && highlights.some(h => h.isActive) && (
            <div className="mb-16">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {highlights.filter(h => h.isActive).map((highlight) => {
                  const IconComponent = getIconComponent(highlight.icon);
                  return (
                    <Card 
                      key={highlight.id}
                      className="group overflow-hidden border-none bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                    >
                      <CardContent className="p-6 text-center">
                        <div 
                          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110"
                          style={{ backgroundColor: `${accentColor}20` }}
                        >
                          <IconComponent className="h-8 w-8" style={{ color: accentColor }} />
                        </div>
                        <h3 
                          className="mb-2 font-serif text-xl font-light"
                          style={{ color: headerTextColor }}
                        >
                          {highlight.title}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: textColor }}>
                          {highlight.description}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Expandable Experience Sections */}
          {activeSections.length > 0 ? (
            <div className="space-y-6">
              {activeSections.map((section) => {
                const isExpanded = expandedSection === section.id;
                const IconComponent = getIconComponent(section.title.toLowerCase().includes('location') ? 'mapPin' :
                  section.title.toLowerCase().includes('culture') || section.title.toLowerCase().includes('nightlife') ? 'music' :
                  section.title.toLowerCase().includes('gastronomy') || section.title.toLowerCase().includes('food') ? 'utensils' :
                  'sparkles');

                return (
                  <Card 
                    key={section.id}
                    className="group overflow-hidden border-none bg-white shadow-lg transition-all duration-500 hover:shadow-2xl"
                  >
                    {/* Section Header - Clickable */}
                    <div 
                      className="cursor-pointer p-6 transition-all duration-300 hover:bg-gray-50"
                      onClick={() => toggleSection(section.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div 
                            className="flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300"
                            style={{ backgroundColor: `${accentColor}20` }}
                          >
                            <IconComponent className="h-6 w-6" style={{ color: accentColor }} />
                          </div>
                          <div>
                            <h2 
                              className="font-serif text-2xl font-light md:text-3xl"
                              style={{ color: headerTextColor }}
                            >
                              {section.title}
                            </h2>
                            {!isExpanded && (
                              <p className="mt-1 text-sm line-clamp-1" style={{ color: textColor }}>
                                {section.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <ChevronDown 
                          className={`h-6 w-6 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`}
                          style={{ color: accentColor }}
                        />
                      </div>
                    </div>

                    {/* Expandable Content */}
                    <div 
                      className={`overflow-hidden transition-all duration-500 ${
                        isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="border-t border-gray-100 p-6 space-y-6">
                        {/* Description */}
                        <p className="text-lg leading-relaxed" style={{ color: textColor }}>
                          {section.description}
                        </p>

                        {/* Images Gallery */}
                        {section.images.length > 0 && (
                          <div className={`grid gap-4 ${
                            section.images.length === 1 ? 'grid-cols-1' :
                            section.images.length === 2 ? 'grid-cols-2' :
                            'grid-cols-2 md:grid-cols-3'
                          }`}>
                            {section.images.map((image, idx) => (
                              <div 
                                key={idx}
                                className="group/img relative overflow-hidden rounded-lg shadow-md transition-all duration-500 hover:shadow-xl"
                                style={{
                                  animation: isExpanded ? `fadeInScale 0.6s ease-out ${idx * 0.1}s both` : 'none'
                                }}
                              >
                                <div className="aspect-video overflow-hidden">
                                  <img 
                                    src={image}
                                    alt={`${section.title} - Image ${idx + 1}`}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                                    loading="lazy"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      if (target.src !== defaultImage) {
                                        target.src = defaultImage;
                                      }
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Videos */}
                        {section.videos.length > 0 && (
                          <div className={`grid gap-4 ${
                            section.videos.length === 1 ? 'grid-cols-1' :
                            'grid-cols-1 md:grid-cols-2'
                          }`}>
                            {section.videos.map((video, idx) => (
                              <div 
                                key={idx}
                                className="overflow-hidden rounded-lg shadow-md"
                                style={{
                                  animation: isExpanded ? `fadeInScale 0.6s ease-out ${(section.images.length + idx) * 0.1}s both` : 'none'
                                }}
                              >
                                <video 
                                  src={video}
                                  controls
                                  loop
                                  className="h-full w-full"
                                  style={{ maxHeight: '400px' }}
                                >
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            /* Fallback to default experience cards if no sections configured */
            <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
              {[
                {
                  icon: MapPin,
                  title: 'Central Location',
                  description: 'In the heart of Palermo Hollywood, surrounded by culture and history. All major attractions are within walking distance.',
                  image: '/assets/generated/cultural-district-street.jpg'
                },
                {
                  icon: Music,
                  title: 'Culture & Nightlife',
                  description: 'Experience tango shows, live music, and the vibrant nightlife of the Argentine capital.',
                  image: '/assets/generated/buenos-aires-sunset-skyline.jpg'
                },
                {
                  icon: Utensils,
                  title: 'Gastronomy',
                  description: 'Discover world-class restaurants, authentic parrillas, and exquisite wine bars in the immediate vicinity.',
                  image: '/assets/generated/lifestyle-wine-balcony.jpg'
                },
                {
                  icon: Sparkles,
                  title: 'Exclusive Services',
                  description: 'Personal concierge service, private city tours, and curated experiences for our guests.',
                  image: '/assets/generated/curated-living-space.jpg'
                }
              ].map((experience, index) => {
                const Icon = experience.icon;
                return (
                  <Card 
                    key={index}
                    className="group overflow-hidden border-none bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
                  >
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
                      <div className="absolute bottom-4 left-6">
                        <div 
                          className="rounded-full p-3 backdrop-blur-sm transition-all duration-300 group-hover:scale-110"
                          style={{ backgroundColor: `${accentColor}20` }}
                        >
                          <Icon className="h-6 w-6" style={{ color: accentColor }} />
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
                      <p className="leading-relaxed" style={{ color: textColor }}>
                        {experience.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Animation Keyframes */}
      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
}
