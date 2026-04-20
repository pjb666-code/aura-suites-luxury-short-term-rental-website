import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLiveSiteConfig } from "@/hooks/useQueries";
import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect } from "react";
import { FaLinkedin } from "react-icons/fa";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

export default function Contact() {
  const { data: siteConfig } = useLiveSiteConfig();

  const textColor = siteConfig?.textColor || "#000000";
  const accentColor = siteConfig?.accentColor || "#FFD700";
  const contactInfo = siteConfig?.auraCollectionSection?.contactInfo;

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

  const getSocialIcon = (platform: string) => {
    const lowerPlatform = platform.toLowerCase();
    if (lowerPlatform.includes("instagram")) return SiInstagram;
    if (lowerPlatform.includes("facebook")) return SiFacebook;
    if (lowerPlatform.includes("x") || lowerPlatform.includes("twitter"))
      return SiX;
    if (lowerPlatform.includes("linkedin")) return FaLinkedin;
    return Mail;
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-background py-24 md:py-32"
    >
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <h2
            className="mb-4 font-serif text-4xl font-light md:text-5xl lg:text-6xl"
            style={{ color: textColor }}
          >
            Contact & Booking
          </h2>
          <div
            className="mx-auto h-1 w-24"
            style={{ backgroundColor: accentColor }}
          />
          {contactInfo?.contactText && (
            <p
              className="mx-auto mt-6 max-w-2xl text-lg opacity-80"
              style={{ color: textColor }}
            >
              {contactInfo.contactText}
            </p>
          )}
        </div>

        {/* Contact Info — centered, no form */}
        <div className="mx-auto max-w-xl space-y-8">
          <Card className="shadow-xl">
            <CardContent className="p-8">
              <h3
                className="mb-6 font-serif text-2xl font-light"
                style={{ color: textColor }}
              >
                Contact Information
              </h3>
              <div className="space-y-4">
                {contactInfo?.email && (
                  <div className="flex items-start gap-3">
                    <Mail
                      className="mt-1 h-5 w-5 shrink-0"
                      style={{ color: accentColor }}
                    />
                    <div>
                      <p className="font-medium" style={{ color: textColor }}>
                        Email
                      </p>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="opacity-70 transition-opacity hover:opacity-100"
                        style={{ color: textColor }}
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                )}
                {contactInfo?.phone && (
                  <div className="flex items-start gap-3">
                    <Phone
                      className="mt-1 h-5 w-5 shrink-0"
                      style={{ color: accentColor }}
                    />
                    <div>
                      <p className="font-medium" style={{ color: textColor }}>
                        Phone
                      </p>
                      <a
                        href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                        className="opacity-70 transition-opacity hover:opacity-100"
                        style={{ color: textColor }}
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>
                )}
                {contactInfo?.address && (
                  <div className="flex items-start gap-3">
                    <MapPin
                      className="mt-1 h-5 w-5 shrink-0"
                      style={{ color: accentColor }}
                    />
                    <div>
                      <p className="font-medium" style={{ color: textColor }}>
                        Address
                      </p>
                      <p
                        className="whitespace-pre-line opacity-70"
                        style={{ color: textColor }}
                      >
                        {contactInfo.address}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {contactInfo?.socialLinks && contactInfo.socialLinks.length > 0 && (
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <h3
                  className="mb-6 font-serif text-2xl font-light"
                  style={{ color: textColor }}
                >
                  Follow Us
                </h3>
                <div className="flex flex-wrap gap-4">
                  {contactInfo.socialLinks.map((link) => {
                    const Icon = getSocialIcon(link.platform);
                    return (
                      <Button
                        key={`${link.platform}-${link.url}`}
                        size="icon"
                        variant="outline"
                        style={{
                          borderColor: `${accentColor}4d`,
                          color: textColor,
                        }}
                        className="hover:opacity-90"
                        asChild
                      >
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={link.platform}
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Decorative Element */}
      <div
        className="absolute -left-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full blur-3xl"
        style={{ backgroundColor: `${accentColor}0d` }}
      />
    </section>
  );
}
