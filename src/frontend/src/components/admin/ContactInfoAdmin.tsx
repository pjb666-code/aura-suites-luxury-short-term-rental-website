import type { ContactInfo } from "@/backend";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDraftSiteConfig, useUpdateContactInfo } from "@/hooks/useQueries";
import { Loader2, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ContactInfoAdmin() {
  const { data: siteConfig, isLoading: configLoading } = useDraftSiteConfig();
  const { mutate: updateContactInfo, isPending: saving } =
    useUpdateContactInfo();

  const [contactText, setContactText] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [socialLinks, setSocialLinks] = useState<
    Array<{ platform: string; url: string }>
  >([]);

  useEffect(() => {
    if (siteConfig?.auraCollectionSection?.contactInfo) {
      const info = siteConfig.auraCollectionSection.contactInfo;
      setContactText(info.contactText || "");
      setEmail(info.email || "");
      setPhone(info.phone || "");
      setAddress(info.address || "");
      setSocialLinks(info.socialLinks || []);
    }
  }, [siteConfig]);

  const handleAddSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: "", url: "" }]);
  };

  const handleRemoveSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const handleUpdateSocialLink = (
    index: number,
    field: "platform" | "url",
    value: string,
  ) => {
    const updated = [...socialLinks];
    updated[index][field] = value;
    setSocialLinks(updated);
  };

  const handleSave = () => {
    const contactInfo: ContactInfo = {
      contactText,
      email,
      phone,
      address,
      socialLinks: socialLinks.filter((link) => link.platform && link.url),
    };

    updateContactInfo(contactInfo, {
      onSuccess: () => {
        toast.success("Contact information saved successfully");
      },
      onError: (error) => {
        console.error("Failed to save contact info:", error);
        toast.error("Failed to save contact information");
      },
    });
  };

  if (configLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-luxury-gold" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-[#e2e5eb] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#1a1d23]">Contact Information</CardTitle>
          <CardDescription className="text-[#5a6378]">
            Manage the contact information displayed on the landing page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Contact Text */}
          <div className="space-y-2">
            <Label htmlFor="contact-text" className="text-[#1a1d23]">
              Contact Text
            </Label>
            <Textarea
              id="contact-text"
              value={contactText}
              onChange={(e) => setContactText(e.target.value)}
              placeholder="Contact us for more information about our art collection and luxury apartments."
              rows={3}
              className="bg-white border-[#e2e5eb] text-[#1a1d23] placeholder:text-[#96a0b5]"
            />
            <p className="text-xs text-white/60">
              This text appears at the top of the contact section
            </p>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#1a1d23]">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@aurasuites.info"
              className="bg-white border-[#e2e5eb] text-[#1a1d23] placeholder:text-[#96a0b5]"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-[#1a1d23]">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+54 11 1234 5678"
              className="bg-white border-[#e2e5eb] text-[#1a1d23] placeholder:text-[#96a0b5]"
            />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label htmlFor="address" className="text-[#1a1d23]">
              Address
            </Label>
            <Textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Palermo Hollywood, Buenos Aires, Argentina"
              rows={3}
              className="bg-white border-[#e2e5eb] text-[#1a1d23] placeholder:text-[#96a0b5]"
            />
            <p className="text-xs text-white/60">
              Use line breaks for multi-line addresses
            </p>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-[#1a1d23]">Social Media Links</Label>
              <Button
                type="button"
                size="sm"
                onClick={handleAddSocialLink}
                className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Link
              </Button>
            </div>

            {socialLinks.length > 0 ? (
              <div className="space-y-3">
                {socialLinks.map((link, index) => (
                  <div
                    key={`${link.platform}-${index}`}
                    className="flex gap-2 items-start rounded-lg border border-[#e2e5eb] bg-[#f7f8fa] p-3"
                  >
                    <div className="flex-1 space-y-2">
                      <Input
                        value={link.platform}
                        onChange={(e) =>
                          handleUpdateSocialLink(
                            index,
                            "platform",
                            e.target.value,
                          )
                        }
                        placeholder="Platform (e.g., Instagram, Facebook)"
                        className="bg-white border-[#e2e5eb] text-[#1a1d23] placeholder:text-[#96a0b5]"
                      />
                      <Input
                        value={link.url}
                        onChange={(e) =>
                          handleUpdateSocialLink(index, "url", e.target.value)
                        }
                        placeholder="https://..."
                        className="bg-white border-[#e2e5eb] text-[#1a1d23] placeholder:text-[#96a0b5]"
                      />
                    </div>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => handleRemoveSocialLink(index)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-white/60">
                No social media links added yet
              </p>
            )}
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Contact Information
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card className="border-[#e2e5eb] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#1a1d23]">Preview</CardTitle>
          <CardDescription className="text-[#5a6378]">
            How the contact information will appear on the landing page
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 rounded-lg bg-white p-6">
            {contactText && (
              <p className="text-gray-700 italic">{contactText}</p>
            )}
            {email && (
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">Email:</span>
                <span className="text-gray-700">{email}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">Phone:</span>
                <span className="text-gray-700">{phone}</span>
              </div>
            )}
            {address && (
              <div className="flex items-start gap-2">
                <span className="font-medium text-gray-900">Address:</span>
                <span className="text-gray-700 whitespace-pre-line">
                  {address}
                </span>
              </div>
            )}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">Social:</span>
                <div className="flex gap-2">
                  {socialLinks
                    .filter((link) => link.platform && link.url)
                    .map((link, index) => (
                      <span
                        key={`${link.platform}-${index}`}
                        className="text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded"
                      >
                        {link.platform}
                      </span>
                    ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
