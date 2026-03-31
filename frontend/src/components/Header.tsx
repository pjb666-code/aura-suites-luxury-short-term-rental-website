import { useLiveSiteConfig } from '@/hooks/useQueries';
import { useFileUrl } from '@/blob-storage/FileStorage';
import { LogoDisplayLocation } from '@/backend';
import { useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const { data: siteConfig } = useLiveSiteConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const shouldShowLogo = 
    siteConfig?.logoDisplayLocation === LogoDisplayLocation.header ||
    siteConfig?.logoDisplayLocation === LogoDisplayLocation.both;

  // Check if logo is uploaded (starts with 'logos/') or is a static asset
  const isUploadedLogo = siteConfig?.logoPath?.startsWith('logos/');
  
  // Only fetch uploaded logo URL if it's an uploaded logo
  const { data: uploadedLogoUrl } = useFileUrl(
    isUploadedLogo && siteConfig?.logoPath ? siteConfig.logoPath : ''
  );

  // Memoize logo URL to prevent unnecessary recalculations
  const logoUrl = useMemo(() => {
    if (!siteConfig?.logoPath) return null;
    if (isUploadedLogo && uploadedLogoUrl) return uploadedLogoUrl;
    if (!isUploadedLogo) return `/assets/${siteConfig.logoPath}`;
    return null;
  }, [siteConfig?.logoPath, isUploadedLogo, uploadedLogoUrl]);

  const logoSize = siteConfig?.logoSize ? Number(siteConfig.logoSize) : 100;
  const headerTextColor = siteConfig?.headerTextColor || '#FFFFFF';

  const showTextFallback = !shouldShowLogo || !logoUrl;

  const handleNavigation = (path: string) => {
    setMobileMenuOpen(false);
    navigate({ to: path });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-luxury-dark/95 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => handleNavigation('/')}
              className="flex items-center min-h-[40px] cursor-pointer hover:opacity-80 transition-opacity"
            >
              {showTextFallback ? (
                <h2 
                  className="font-serif text-2xl font-light tracking-wider"
                  style={{ color: headerTextColor }}
                >
                  AURA SUITES
                </h2>
              ) : (
                <img 
                  src={logoUrl!} 
                  alt="Aura Suites Logo" 
                  className="h-auto w-auto object-contain"
                  style={{ 
                    maxHeight: `${logoSize}px`,
                    maxWidth: `${logoSize * 2}px`
                  }}
                  loading="eager"
                  fetchPriority="high"
                />
              )}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => handleNavigation('/apartments')}
                className="transition-colors text-sm"
                style={{ color: `${headerTextColor}cc` }}
                onMouseEnter={(e) => e.currentTarget.style.color = headerTextColor}
                onMouseLeave={(e) => e.currentTarget.style.color = `${headerTextColor}cc`}
              >
                Apartments
              </button>
              <button 
                onClick={() => handleNavigation('/aura-collection')}
                className="transition-colors text-sm"
                style={{ color: `${headerTextColor}cc` }}
                onMouseEnter={(e) => e.currentTarget.style.color = headerTextColor}
                onMouseLeave={(e) => e.currentTarget.style.color = `${headerTextColor}cc`}
              >
                Art Collection
              </button>
              <button 
                onClick={() => handleNavigation('/experience')}
                className="transition-colors text-sm"
                style={{ color: `${headerTextColor}cc` }}
                onMouseEnter={(e) => e.currentTarget.style.color = headerTextColor}
                onMouseLeave={(e) => e.currentTarget.style.color = `${headerTextColor}cc`}
              >
                Experience
              </button>
              <a 
                href="/#contact" 
                className="transition-colors text-sm"
                style={{ color: `${headerTextColor}cc` }}
                onMouseEnter={(e) => e.currentTarget.style.color = headerTextColor}
                onMouseLeave={(e) => e.currentTarget.style.color = `${headerTextColor}cc`}
              >
                Contact
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              style={{ color: headerTextColor }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-white/10 pt-4">
              <button 
                onClick={() => handleNavigation('/apartments')}
                className="transition-colors text-sm text-left"
                style={{ color: `${headerTextColor}cc` }}
              >
                Apartments
              </button>
              <button 
                onClick={() => handleNavigation('/aura-collection')}
                className="transition-colors text-sm text-left"
                style={{ color: `${headerTextColor}cc` }}
              >
                Art Collection
              </button>
              <button 
                onClick={() => handleNavigation('/experience')}
                className="transition-colors text-sm text-left"
                style={{ color: `${headerTextColor}cc` }}
              >
                Experience
              </button>
              <a 
                href="/#contact" 
                className="transition-colors text-sm"
                style={{ color: `${headerTextColor}cc` }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </nav>
          )}
        </div>
      </header>
      {/* Spacer to prevent content from being hidden under fixed header */}
      <div style={{ height: `${logoSize + 32}px` }} />
    </>
  );
}
