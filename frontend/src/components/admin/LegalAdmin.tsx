import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Save, Eye } from 'lucide-react';
import { toast } from 'sonner';
import {
  useDraftImprintPage,
  useDraftPrivacyPolicyPage,
  useDraftTermsPage,
  useUpdateImprintPage,
  useUpdatePrivacyPolicyPage,
  useUpdateTermsPage,
} from '@/hooks/useQueries';

export default function LegalAdmin() {
  const { data: draftImprint, isLoading: loadingImprint } = useDraftImprintPage();
  const { data: draftPrivacy, isLoading: loadingPrivacy } = useDraftPrivacyPolicyPage();
  const { data: draftTerms, isLoading: loadingTerms } = useDraftTermsPage();

  const { mutate: updateImprint, isPending: savingImprint } = useUpdateImprintPage();
  const { mutate: updatePrivacy, isPending: savingPrivacy } = useUpdatePrivacyPolicyPage();
  const { mutate: updateTerms, isPending: savingTerms } = useUpdateTermsPage();

  const [imprintContent, setImprintContent] = useState('');
  const [imprintTextColor, setImprintTextColor] = useState('#000000');
  const [imprintBgColor, setImprintBgColor] = useState('#FFFFFF');

  const [privacyContent, setPrivacyContent] = useState('');
  const [privacyTextColor, setPrivacyTextColor] = useState('#000000');
  const [privacyBgColor, setPrivacyBgColor] = useState('#FFFFFF');

  const [termsContent, setTermsContent] = useState('');
  const [termsTextColor, setTermsTextColor] = useState('#000000');
  const [termsBgColor, setTermsBgColor] = useState('#FFFFFF');

  const [previewMode, setPreviewMode] = useState<'imprint' | 'privacy' | 'terms' | null>(null);

  useEffect(() => {
    if (draftImprint) {
      setImprintContent(draftImprint.content);
      setImprintTextColor(draftImprint.textColor);
      setImprintBgColor(draftImprint.backgroundColor);
    }
  }, [draftImprint]);

  useEffect(() => {
    if (draftPrivacy) {
      setPrivacyContent(draftPrivacy.content);
      setPrivacyTextColor(draftPrivacy.textColor);
      setPrivacyBgColor(draftPrivacy.backgroundColor);
    }
  }, [draftPrivacy]);

  useEffect(() => {
    if (draftTerms) {
      setTermsContent(draftTerms.content);
      setTermsTextColor(draftTerms.textColor);
      setTermsBgColor(draftTerms.backgroundColor);
    }
  }, [draftTerms]);

  const handleSaveImprint = () => {
    updateImprint(
      { content: imprintContent, textColor: imprintTextColor, backgroundColor: imprintBgColor },
      {
        onSuccess: () => {
          toast.success('Imprint page saved to draft');
        },
        onError: () => {
          toast.error('Failed to save imprint page');
        },
      }
    );
  };

  const handleSavePrivacy = () => {
    updatePrivacy(
      { content: privacyContent, textColor: privacyTextColor, backgroundColor: privacyBgColor },
      {
        onSuccess: () => {
          toast.success('Privacy policy saved to draft');
        },
        onError: () => {
          toast.error('Failed to save privacy policy');
        },
      }
    );
  };

  const handleSaveTerms = () => {
    updateTerms(
      { content: termsContent, textColor: termsTextColor, backgroundColor: termsBgColor },
      {
        onSuccess: () => {
          toast.success('Terms & conditions saved to draft');
        },
        onError: () => {
          toast.error('Failed to save terms & conditions');
        },
      }
    );
  };

  if (loadingImprint || loadingPrivacy || loadingTerms) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-luxury-gold" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-luxury-gold/20 bg-luxury-dark/50">
        <CardHeader>
          <CardTitle className="text-white">Legal Pages Management</CardTitle>
          <CardDescription className="text-white/70">
            Manage your legal pages content. Changes are saved to draft and published when you click "Publish Changes".
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="imprint" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-luxury-dark/50 border border-luxury-gold/20">
              <TabsTrigger value="imprint" className="data-[state=active]:bg-luxury-gold data-[state=active]:text-luxury-dark text-white/70">
                Imprint
              </TabsTrigger>
              <TabsTrigger value="privacy" className="data-[state=active]:bg-luxury-gold data-[state=active]:text-luxury-dark text-white/70">
                Privacy Policy
              </TabsTrigger>
              <TabsTrigger value="terms" className="data-[state=active]:bg-luxury-gold data-[state=active]:text-luxury-dark text-white/70">
                Terms & Conditions
              </TabsTrigger>
            </TabsList>

            {/* Imprint Tab */}
            <TabsContent value="imprint" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="imprint-content" className="text-white">Content</Label>
                  <Textarea
                    id="imprint-content"
                    value={imprintContent}
                    onChange={(e) => setImprintContent(e.target.value)}
                    placeholder="Enter imprint content (use line breaks for paragraphs)"
                    className="min-h-[300px] border-luxury-gold/30 bg-white/5 text-white"
                  />
                  <p className="text-xs text-white/50">Use line breaks to separate paragraphs</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="imprint-text-color" className="text-white">Text Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="imprint-text-color"
                        type="color"
                        value={imprintTextColor}
                        onChange={(e) => setImprintTextColor(e.target.value)}
                        className="h-10 w-20 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={imprintTextColor}
                        onChange={(e) => setImprintTextColor(e.target.value)}
                        className="border-luxury-gold/30 bg-white/5 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="imprint-bg-color" className="text-white">Background Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="imprint-bg-color"
                        type="color"
                        value={imprintBgColor}
                        onChange={(e) => setImprintBgColor(e.target.value)}
                        className="h-10 w-20 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={imprintBgColor}
                        onChange={(e) => setImprintBgColor(e.target.value)}
                        className="border-luxury-gold/30 bg-white/5 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleSaveImprint}
                    disabled={savingImprint}
                    className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
                  >
                    {savingImprint ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save to Draft
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => setPreviewMode(previewMode === 'imprint' ? null : 'imprint')}
                    variant="outline"
                    className="border-luxury-gold/30 text-white hover:bg-luxury-gold/10"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    {previewMode === 'imprint' ? 'Hide Preview' : 'Preview'}
                  </Button>
                </div>

                {previewMode === 'imprint' && (
                  <div 
                    className="rounded-lg border border-luxury-gold/30 p-8"
                    style={{ backgroundColor: imprintBgColor }}
                  >
                    <h2 className="mb-6 font-serif text-3xl font-light" style={{ color: imprintTextColor }}>
                      Imprint
                    </h2>
                    <div className="prose prose-lg max-w-none" style={{ color: imprintTextColor }}>
                      {imprintContent.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Privacy Policy Tab */}
            <TabsContent value="privacy" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="privacy-content" className="text-white">Content</Label>
                  <Textarea
                    id="privacy-content"
                    value={privacyContent}
                    onChange={(e) => setPrivacyContent(e.target.value)}
                    placeholder="Enter privacy policy content (use line breaks for paragraphs)"
                    className="min-h-[300px] border-luxury-gold/30 bg-white/5 text-white"
                  />
                  <p className="text-xs text-white/50">Use line breaks to separate paragraphs</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="privacy-text-color" className="text-white">Text Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="privacy-text-color"
                        type="color"
                        value={privacyTextColor}
                        onChange={(e) => setPrivacyTextColor(e.target.value)}
                        className="h-10 w-20 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={privacyTextColor}
                        onChange={(e) => setPrivacyTextColor(e.target.value)}
                        className="border-luxury-gold/30 bg-white/5 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="privacy-bg-color" className="text-white">Background Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="privacy-bg-color"
                        type="color"
                        value={privacyBgColor}
                        onChange={(e) => setPrivacyBgColor(e.target.value)}
                        className="h-10 w-20 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={privacyBgColor}
                        onChange={(e) => setPrivacyBgColor(e.target.value)}
                        className="border-luxury-gold/30 bg-white/5 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleSavePrivacy}
                    disabled={savingPrivacy}
                    className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
                  >
                    {savingPrivacy ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save to Draft
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => setPreviewMode(previewMode === 'privacy' ? null : 'privacy')}
                    variant="outline"
                    className="border-luxury-gold/30 text-white hover:bg-luxury-gold/10"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    {previewMode === 'privacy' ? 'Hide Preview' : 'Preview'}
                  </Button>
                </div>

                {previewMode === 'privacy' && (
                  <div 
                    className="rounded-lg border border-luxury-gold/30 p-8"
                    style={{ backgroundColor: privacyBgColor }}
                  >
                    <h2 className="mb-6 font-serif text-3xl font-light" style={{ color: privacyTextColor }}>
                      Privacy Policy
                    </h2>
                    <div className="prose prose-lg max-w-none" style={{ color: privacyTextColor }}>
                      {privacyContent.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Terms & Conditions Tab */}
            <TabsContent value="terms" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="terms-content" className="text-white">Content</Label>
                  <Textarea
                    id="terms-content"
                    value={termsContent}
                    onChange={(e) => setTermsContent(e.target.value)}
                    placeholder="Enter terms & conditions content (use line breaks for paragraphs)"
                    className="min-h-[300px] border-luxury-gold/30 bg-white/5 text-white"
                  />
                  <p className="text-xs text-white/50">Use line breaks to separate paragraphs</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="terms-text-color" className="text-white">Text Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="terms-text-color"
                        type="color"
                        value={termsTextColor}
                        onChange={(e) => setTermsTextColor(e.target.value)}
                        className="h-10 w-20 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={termsTextColor}
                        onChange={(e) => setTermsTextColor(e.target.value)}
                        className="border-luxury-gold/30 bg-white/5 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="terms-bg-color" className="text-white">Background Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="terms-bg-color"
                        type="color"
                        value={termsBgColor}
                        onChange={(e) => setTermsBgColor(e.target.value)}
                        className="h-10 w-20 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={termsBgColor}
                        onChange={(e) => setTermsBgColor(e.target.value)}
                        className="border-luxury-gold/30 bg-white/5 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleSaveTerms}
                    disabled={savingTerms}
                    className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
                  >
                    {savingTerms ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save to Draft
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => setPreviewMode(previewMode === 'terms' ? null : 'terms')}
                    variant="outline"
                    className="border-luxury-gold/30 text-white hover:bg-luxury-gold/10"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    {previewMode === 'terms' ? 'Hide Preview' : 'Preview'}
                  </Button>
                </div>

                {previewMode === 'terms' && (
                  <div 
                    className="rounded-lg border border-luxury-gold/30 p-8"
                    style={{ backgroundColor: termsBgColor }}
                  >
                    <h2 className="mb-6 font-serif text-3xl font-light" style={{ color: termsTextColor }}>
                      Terms & Conditions
                    </h2>
                    <div className="prose prose-lg max-w-none" style={{ color: termsTextColor }}>
                      {termsContent.split('\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
