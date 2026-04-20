import { LogoDisplayLocation } from "@/backend";
import { useFileUrl } from "@/blob-storage/FileStorage";
import { useLiveSiteConfig } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useMemo } from "react";

export default function Footer() {
  const { data: siteConfig } = useLiveSiteConfig();

  const shouldShowLogo =
    siteConfig?.logoDisplayLocation === LogoDisplayLocation.footer ||
    siteConfig?.logoDisplayLocation === LogoDisplayLocation.both;

  // Check if logo is uploaded (starts with 'logos/') or is a static asset
  const isUploadedLogo = siteConfig?.logoPath?.startsWith("logos/");

  // Only fetch uploaded logo URL if it's an uploaded logo
  const { data: uploadedLogoUrl } = useFileUrl(
    isUploadedLogo && siteConfig?.logoPath ? siteConfig.logoPath : "",
  );

  // Memoize logo URL to prevent unnecessary recalculations
  const logoUrl = useMemo(() => {
    if (!siteConfig?.logoPath) return null;
    if (isUploadedLogo && uploadedLogoUrl) return uploadedLogoUrl;
    if (!isUploadedLogo) return `/assets/${siteConfig.logoPath}`;
    return null;
  }, [siteConfig?.logoPath, isUploadedLogo, uploadedLogoUrl]);

  const logoSize = siteConfig?.logoSize
    ? Number(siteConfig.logoSize) * 0.6
    : 60;

  const showTextFallback = !shouldShowLogo || !logoUrl;

  return (
    <footer className="border-t border-border bg-luxury-dark py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            {showTextFallback ? (
              <h3 className="mb-4 font-serif text-2xl font-light tracking-wider">
                AURA SUITES
              </h3>
            ) : (
              <div className="mb-4">
                <img
                  src={logoUrl!}
                  alt="Aura Suites Logo"
                  className="h-auto w-auto object-contain"
                  style={{
                    maxHeight: `${logoSize}px`,
                    maxWidth: `${logoSize * 2}px`,
                  }}
                  loading="lazy"
                />
              </div>
            )}
            <p className="text-sm text-white/70">
              Luxury Artist Lofts in the Heart of Palermo Hollywood
            </p>
            <p className="mt-4 text-sm text-white/70">
              <a
                href="mailto:contact@aurasuites.info"
                className="hover:text-luxury-gold transition-colors"
              >
                contact@aurasuites.info
              </a>
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-medium">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link
                  to="/experience"
                  className="hover:text-luxury-gold transition-colors"
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link
                  to="/aura-collection"
                  className="hover:text-luxury-gold transition-colors"
                >
                  Art Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-luxury-gold transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="mailto:contact@aurasuites.info"
                  className="hover:text-luxury-gold transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-medium">Legal</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link
                  to="/imprint"
                  className="hover:text-luxury-gold transition-colors"
                >
                  Imprint
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-luxury-gold transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-luxury-gold transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/70">
          <p className="flex items-center justify-center gap-2">
            © {new Date().getFullYear()}. Built with{" "}
            <Heart className="h-4 w-4 fill-luxury-gold text-luxury-gold" />{" "}
            using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "aurasuites.info")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-luxury-gold hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
