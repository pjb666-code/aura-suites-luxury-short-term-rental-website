import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import { useLiveSiteConfig } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { SiFacebook, SiInstagram, SiX, SiLinkedin } from 'react-icons/si';
import { toast } from 'sonner';
import { useEffect } from 'react';

export default function Contact() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const { data: siteConfig } = useLiveSiteConfig();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const textColor = siteConfig?.textColor || '#000000';
  const accentColor = siteConfig?.accentColor || '#FFD700';
  const contactInfo = siteConfig?.auraCollectionSection?.contactInfo;

  useEffect(() => {
    if (siteConfig) {
      document.documentElement.style.setProperty('--dynamic-text-color', textColor);
      document.documentElement.style.setProperty('--dynamic-accent-color', accentColor);
    }
  }, [siteConfig, textColor, accentColor]);

  const submitMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (!actor) throw new Error('Backend not available');
      await actor.submitContactForm(data.name, data.email, data.message);
    },
    onSuccess: () => {
      toast.success('Message sent successfully!', {
        description: 'We will get back to you shortly.'
      });
      setFormData({ name: '', email: '', message: '' });
      queryClient.invalidateQueries({ queryKey: ['contactSubmissions'] });
    },
    onError: () => {
      toast.error('Error sending message', {
        description: 'Please try again later.'
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }
    submitMutation.mutate(formData);
  };

  const getSocialIcon = (platform: string) => {
    const lowerPlatform = platform.toLowerCase();
    if (lowerPlatform.includes('instagram')) return SiInstagram;
    if (lowerPlatform.includes('facebook')) return SiFacebook;
    if (lowerPlatform.includes('x') || lowerPlatform.includes('twitter')) return SiX;
    if (lowerPlatform.includes('linkedin')) return SiLinkedin;
    return Mail;
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <h2 
            className="mb-4 font-serif text-4xl font-light md:text-5xl lg:text-6xl"
            style={{ color: textColor }}
          >
            Contact & Booking
          </h2>
          <div className="mx-auto h-1 w-24" style={{ backgroundColor: accentColor }} />
          {contactInfo?.contactText && (
            <p className="mx-auto mt-6 max-w-2xl text-lg opacity-80" style={{ color: textColor }}>
              {contactInfo.contactText}
            </p>
          )}
        </div>

        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <Card className="shadow-xl">
            <CardContent className="p-8">
              <h3 className="mb-6 font-serif text-2xl font-light" style={{ color: textColor }}>Contact Us</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" style={{ color: textColor }}>Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email" style={{ color: textColor }}>Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="message" style={{ color: textColor }}>Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message to us..."
                    rows={5}
                    className="mt-2"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  style={{ backgroundColor: accentColor, color: '#1a1a1a' }}
                  disabled={submitMutation.isPending}
                >
                  {submitMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <h3 className="mb-6 font-serif text-2xl font-light" style={{ color: textColor }}>Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo?.email && (
                    <div className="flex items-start gap-3">
                      <Mail className="mt-1 h-5 w-5" style={{ color: accentColor }} />
                      <div>
                        <p className="font-medium" style={{ color: textColor }}>Email</p>
                        <a 
                          href={`mailto:${contactInfo.email}`}
                          className="opacity-70 hover:opacity-100"
                          style={{ color: textColor }}
                        >
                          {contactInfo.email}
                        </a>
                      </div>
                    </div>
                  )}
                  {contactInfo?.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="mt-1 h-5 w-5" style={{ color: accentColor }} />
                      <div>
                        <p className="font-medium" style={{ color: textColor }}>Phone</p>
                        <a 
                          href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                          className="opacity-70 hover:opacity-100"
                          style={{ color: textColor }}
                        >
                          {contactInfo.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  {contactInfo?.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-1 h-5 w-5" style={{ color: accentColor }} />
                      <div>
                        <p className="font-medium" style={{ color: textColor }}>Address</p>
                        <p className="whitespace-pre-line opacity-70" style={{ color: textColor }}>
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
                  <h3 className="mb-6 font-serif text-2xl font-light" style={{ color: textColor }}>Follow Us</h3>
                  <div className="flex flex-wrap gap-4">
                    {contactInfo.socialLinks.map((link, index) => {
                      const Icon = getSocialIcon(link.platform);
                      return (
                        <Button 
                          key={index}
                          size="icon" 
                          variant="outline"
                          style={{ borderColor: `${accentColor}4d`, color: textColor }}
                          className="hover:opacity-90"
                          asChild
                        >
                          <a href={link.url} target="_blank" rel="noopener noreferrer" title={link.platform}>
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
      </div>

      {/* Decorative Element */}
      <div className="absolute -left-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full blur-3xl" style={{ backgroundColor: `${accentColor}0d` }} />
    </section>
  );
}
