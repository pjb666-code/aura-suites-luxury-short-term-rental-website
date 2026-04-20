import { LogoDisplayLocation } from "@/backend";
import { useFileUrl } from "@/blob-storage/FileStorage";
import { Button } from "@/components/ui/button";
import { useLiveSiteConfig } from "@/hooks/useQueries";
import { useNavigate } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useMemo, useState } from "react";

const NAV_LINKS = [
  { label: "Apartments", to: "/apartments" },
  { label: "Art Collection", to: "/aura-collection" },
  { label: "Experience", to: "/experience" },
];

export default function Header() {
  const navigate = useNavigate();
  const { data: siteConfig } = useLiveSiteConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const shouldShowLogo =
    siteConfig?.logoDisplayLocation === LogoDisplayLocation.header ||
    siteConfig?.logoDisplayLocation === LogoDisplayLocation.both;

  const isUploadedLogo = siteConfig?.logoPath?.startsWith("logos/");

  const { data: uploadedLogoUrl } = useFileUrl(
    isUploadedLogo && siteConfig?.logoPath ? siteConfig.logoPath : "",
  );

  const logoUrl = useMemo(() => {
    if (!siteConfig?.logoPath) return null;
    if (isUploadedLogo && uploadedLogoUrl) return uploadedLogoUrl;
    if (!isUploadedLogo) return `/assets/${siteConfig.logoPath}`;
    return null;
  }, [siteConfig?.logoPath, isUploadedLogo, uploadedLogoUrl]);

  const logoSize = siteConfig?.logoSize ? Number(siteConfig.logoSize) : 100;
  const headerTextColor = siteConfig?.headerTextColor || "#FFFFFF";
  const showTextFallback = !shouldShowLogo || !logoUrl;

  const closeMobile = () => setMobileMenuOpen(false);

  const navTextStyle = { color: `${headerTextColor}cc` };

  const handleNav = (path: string) => {
    closeMobile();
    navigate({ to: path });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-luxury-dark/95 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => handleNav("/")}
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
                    maxWidth: `${logoSize * 2}px`,
                  }}
                  loading="eager"
                  fetchPriority="high"
                />
              )}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map(({ label, to }) => (
                <button
                  key={to}
                  type="button"
                  onClick={() => handleNav(to)}
                  className="transition-colors text-sm hover:opacity-100"
                  style={navTextStyle}
                >
                  {label}
                </button>
              ))}
              <a
                href="/#contact"
                className="transition-colors text-sm hover:opacity-100"
                style={navTextStyle}
              >
                Contact
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="md:hidden"
              style={{ color: headerTextColor }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-white/10 pt-4">
              {NAV_LINKS.map(({ label, to }) => (
                <button
                  key={to}
                  type="button"
                  onClick={() => handleNav(to)}
                  className="transition-colors text-sm text-left hover:opacity-100"
                  style={navTextStyle}
                >
                  {label}
                </button>
              ))}
              <button
                type="button"
                className="transition-colors text-sm text-left hover:opacity-100"
                style={navTextStyle}
                onClick={() => {
                  closeMobile();
                  window.location.href = "/#contact";
                }}
              >
                Contact
              </button>
            </nav>
          )}
        </div>
      </header>
      {/* Spacer to prevent content from being hidden under fixed header */}
      <div style={{ height: `${logoSize + 32}px` }} />
    </>
  );
}
