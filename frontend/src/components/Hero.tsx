import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useLiveSiteConfig } from '@/hooks/useQueries';
import { useEffect, useMemo } from 'react';

export default function Hero() {
  const { data: siteConfig } = useLiveSiteConfig();

  const heroSection = siteConfig?.heroSection;
  const textColor = heroSection?.textColor || '#FFFFFF';
  const accentColor = siteConfig?.accentColor || '#FFD700';
  
  // Memoize background image to prevent recalculation
  const backgroundImage = useMemo(() => {
    if (heroSection?.backgroundImage) {
      return heroSection.backgroundImage;
    }
    return '/assets/generated/hero-apartment-interior.jpg';
  }, [heroSection?.backgroundImage]);

  const title = heroSection?.title || 'Luxury Artist Lofts in the Heart of Palermo Hollywood';
  const subtitle = heroSection?.subtitle || 'Where Luxury Meets Art – Experience Exclusive Living in a Curated Atmosphere';

  useEffect(() => {
    if (siteConfig) {
      document.documentElement.style.setProperty('--dynamic-text-color', textColor);
      document.documentElement.style.setProperty('--dynamic-accent-color', accentColor);
    }
  }, [siteConfig, textColor, accentColor]);

  const handleBooking = () => {
    const bookingUrl = siteConfig?.bookingUrl || 'https://booking.com';
    window.open(bookingUrl, '_blank', 'noopener,noreferrer');
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          transform: 'scale(1.1)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-dark/80 via-luxury-dark/60 to-luxury-dark/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        {/* Main Claim */}
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

        {/* CTA Button */}
        <Button 
          size="lg"
          onClick={handleBooking}
          className="animate-fade-in-up delay-200 px-8 py-6 text-lg font-medium shadow-2xl transition-all duration-300 hover:scale-105"
          style={{ backgroundColor: accentColor, color: '#1a1a1a' }}
        >
          Book Your Stay
        </Button>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 opacity-70" style={{ color: accentColor }} />
        </div>
      </div>
    </section>
  );
}
