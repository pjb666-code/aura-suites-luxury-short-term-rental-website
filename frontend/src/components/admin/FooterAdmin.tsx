import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function FooterAdmin() {
  const [formData, setFormData] = useState({
    copyrightText: '© 2025 Aura Suites. All rights reserved.',
    legalText: 'Built with love using caffeine.ai',
    contactEmail: 'contact@aurasuites.info',
    instagramUrl: 'https://instagram.com',
    facebookUrl: 'https://facebook.com',
  });

  const handleSave = () => {
    // TODO: Save to backend when endpoint is available
    toast.success('Footer settings updated successfully');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Footer Settings</CardTitle>
          <CardDescription>
            Customize footer content, legal information, and social media links
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Copyright Text */}
          <div className="space-y-2">
            <Label htmlFor="copyrightText">Copyright Text</Label>
            <Input
              id="copyrightText"
              value={formData.copyrightText}
              onChange={(e) => setFormData({ ...formData, copyrightText: e.target.value })}
              placeholder="© 2025 Aura Suites. All rights reserved."
            />
          </div>

          {/* Legal Text */}
          <div className="space-y-2">
            <Label htmlFor="legalText">Legal / Attribution Text</Label>
            <Textarea
              id="legalText"
              value={formData.legalText}
              onChange={(e) => setFormData({ ...formData, legalText: e.target.value })}
              placeholder="Built with love using caffeine.ai"
              rows={2}
            />
          </div>

          {/* Contact Email */}
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input
              id="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              placeholder="contact@aurasuites.info"
            />
          </div>

          {/* Social Media Links */}
          <div className="space-y-4">
            <Label>Social Media Links</Label>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="instagramUrl" className="text-sm">Instagram URL</Label>
                <Input
                  id="instagramUrl"
                  value={formData.instagramUrl}
                  onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                  placeholder="https://instagram.com/aurasuites"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebookUrl" className="text-sm">Facebook URL</Label>
                <Input
                  id="facebookUrl"
                  value={formData.facebookUrl}
                  onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                  placeholder="https://facebook.com/aurasuites"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <Button onClick={handleSave} className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>See how your footer will look</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 rounded-lg border bg-card p-6">
            <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{formData.copyrightText}</p>
                <p className="text-xs text-muted-foreground">{formData.legalText}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">{formData.contactEmail}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
