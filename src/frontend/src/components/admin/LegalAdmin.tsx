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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  useDraftImprintPage,
  useDraftPrivacyPolicyPage,
  useDraftTermsPage,
  useUpdateImprintPage,
  useUpdatePrivacyPolicyPage,
  useUpdateTermsPage,
} from "@/hooks/useQueries";
import { Eye, Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function LegalAdmin() {
  const { data: draftImprint, isLoading: loadingImprint } =
    useDraftImprintPage();
  const { data: draftPrivacy, isLoading: loadingPrivacy } =
    useDraftPrivacyPolicyPage();
  const { data: draftTerms, isLoading: loadingTerms } = useDraftTermsPage();

  const { mutate: updateImprint, isPending: savingImprint } =
    useUpdateImprintPage();
  const { mutate: updatePrivacy, isPending: savingPrivacy } =
    useUpdatePrivacyPolicyPage();
  const { mutate: updateTerms, isPending: savingTerms } = useUpdateTermsPage();

  const [imprintContent, setImprintContent] = useState("");
  const [imprintTextColor, setImprintTextColor] = useState("#000000");
  const [imprintBgColor, setImprintBgColor] = useState("#FFFFFF");

  const [privacyContent, setPrivacyContent] = useState("");
  const [privacyTextColor, setPrivacyTextColor] = useState("#000000");
  const [privacyBgColor, setPrivacyBgColor] = useState("#FFFFFF");

  const [termsContent, setTermsContent] = useState("");
  const [termsTextColor, setTermsTextColor] = useState("#000000");
  const [termsBgColor, setTermsBgColor] = useState("#FFFFFF");

  const [previewMode, setPreviewMode] = useState<
    "imprint" | "privacy" | "terms" | null
  >(null);

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
      {
        content: imprintContent,
        textColor: imprintTextColor,
        backgroundColor: imprintBgColor,
      },
      {
        onSuccess: () => {
          toast.success("Imprint page saved to draft");
        },
        onError: () => {
          toast.error("Failed to save imprint page");
        },
      },
    );
  };

  const handleSavePrivacy = () => {
    updatePrivacy(
      {
        content: privacyContent,
        textColor: privacyTextColor,
        backgroundColor: privacyBgColor,
      },
      {
        onSuccess: () => {
          toast.success("Privacy policy saved to draft");
        },
        onError: () => {
          toast.error("Failed to save privacy policy");
        },
      },
    );
  };

  const handleSaveTerms = () => {
    updateTerms(
      {
        content: termsContent,
        textColor: termsTextColor,
        backgroundColor: termsBgColor,
      },
      {
        onSuccess: () => {
          toast.success("Terms & conditions saved to draft");
        },
        onError: () => {
          toast.error("Failed to save terms & conditions");
        },
      },
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
      <Card className="border-[#e2e5eb] bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#1a1d23]">
            Legal Pages Management
          </CardTitle>
          <CardDescription className="text-[#5a6378]">
            Manage your legal pages content. Changes are saved to draft and
            published when you click "Publish Changes".
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="imprint" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-[#f0f2f7] border border-[#e2e5eb]">
              <TabsTrigger
                value="imprint"
                className="data-[state=active]:bg-white data-[state=active]:text-[#1a1d23] data-[state=active]:shadow-sm text-[#5a6378]"
              >
                Imprint
              </TabsTrigger>
              <TabsTrigger
                value="privacy"
                className="data-[state=active]:bg-white data-[state=active]:text-[#1a1d23] data-[state=active]:shadow-sm text-[#5a6378]"
              >
                Privacy Policy
              </TabsTrigger>
              <TabsTrigger
                value="terms"
                className="data-[state=active]:bg-white data-[state=active]:text-[#1a1d23] data-[state=active]:shadow-sm text-[#5a6378]"
              >
                Terms & Conditions
              </TabsTrigger>
            </TabsList>

            {/* Imprint Tab */}
            <TabsContent value="imprint" className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="imprint-content"
                    className="text-[#1a1d23] font-medium"
                  >
                    Content
                  </Label>
                  <Textarea
                    id="imprint-content"
                    value={imprintContent}
                    onChange={(e) => setImprintContent(e.target.value)}
                    placeholder="Enter imprint content (use line breaks for paragraphs)"
                    className="min-h-[300px] border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
                  />
                  <p className="text-xs text-[#96a0b5]">
                    Use line breaks to separate paragraphs
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="imprint-text-color"
                      className="text-[#1a1d23] font-medium"
                    >
                      Text Color
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="imprint-text-color"
                        type="color"
                        value={imprintTextColor}
                        onChange={(e) => setImprintTextColor(e.target.value)}
                        className="h-10 w-20 cursor-pointer border-[#e2e5eb]"
                      />
                      <Input
                        type="text"
                        value={imprintTextColor}
                        onChange={(e) => setImprintTextColor(e.target.value)}
                        className="border-[#e2e5eb] bg-white text-[#1a1d23]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="imprint-bg-color"
                      className="text-[#1a1d23] font-medium"
                    >
                      Background Color
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="imprint-bg-color"
                        type="color"
                        value={imprintBgColor}
                        onChange={(e) => setImprintBgColor(e.target.value)}
                        className="h-10 w-20 cursor-pointer border-[#e2e5eb]"
                      />
                      <Input
                        type="text"
                        value={imprintBgColor}
                        onChange={(e) => setImprintBgColor(e.target.value)}
                        className="border-[#e2e5eb] bg-white text-[#1a1d23]"
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
                    onClick={() =>
                      setPreviewMode(
                        previewMode === "imprint" ? null : "imprint",
                      )
                    }
                    variant="outline"
                    className="border-[#e2e5eb] text-[#1a1d23] hover:bg-[#f0f2f7]"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    {previewMode === "imprint" ? "Hide Preview" : "Preview"}
                  </Button>
                </div>

                {previewMode === "imprint" && (
                  <div
                    className="rounded-lg border border-[#e2e5eb] p-8"
                    style={{ backgroundColor: imprintBgColor }}
                  >
                    <h2
                      className="mb-6 font-serif text-3xl font-light"
                      style={{ color: imprintTextColor }}
                    >
                      Imprint
                    </h2>
                    <div
                      className="prose prose-lg max-w-none"
                      style={{ color: imprintTextColor }}
                    >
                      {imprintContent.split("\n").map((paragraph) => (
                        <p key={paragraph} className="mb-4 leading-relaxed">
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
                  <Label
                    htmlFor="privacy-content"
                    className="text-[#1a1d23] font-medium"
                  >
                    Content
                  </Label>
                  <Textarea
                    id="privacy-content"
                    value={privacyContent}
                    onChange={(e) => setPrivacyContent(e.target.value)}
                    placeholder="Enter privacy policy content (use line breaks for paragraphs)"
                    className="min-h-[300px] border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
                  />
                  <p className="text-xs text-[#96a0b5]">
                    Use line breaks to separate paragraphs
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="privacy-text-color"
                      className="text-[#1a1d23] font-medium"
                    >
                      Text Color
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="privacy-text-color"
                        type="color"
                        value={privacyTextColor}
                        onChange={(e) => setPrivacyTextColor(e.target.value)}
                        className="h-10 w-20 cursor-pointer border-[#e2e5eb]"
                      />
                      <Input
                        type="text"
                        value={privacyTextColor}
                        onChange={(e) => setPrivacyTextColor(e.target.value)}
                        className="border-[#e2e5eb] bg-white text-[#1a1d23]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="privacy-bg-color"
                      className="text-[#1a1d23] font-medium"
                    >
                      Background Color
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="privacy-bg-color"
                        type="color"
                        value={privacyBgColor}
                        onChange={(e) => setPrivacyBgColor(e.target.value)}
                        className="h-10 w-20 cursor-pointer border-[#e2e5eb]"
                      />
                      <Input
                        type="text"
                        value={privacyBgColor}
                        onChange={(e) => setPrivacyBgColor(e.target.value)}
                        className="border-[#e2e5eb] bg-white text-[#1a1d23]"
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
                    onClick={() =>
                      setPreviewMode(
                        previewMode === "privacy" ? null : "privacy",
                      )
                    }
                    variant="outline"
                    className="border-[#e2e5eb] text-[#1a1d23] hover:bg-[#f0f2f7]"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    {previewMode === "privacy" ? "Hide Preview" : "Preview"}
                  </Button>
                </div>

                {previewMode === "privacy" && (
                  <div
                    className="rounded-lg border border-[#e2e5eb] p-8"
                    style={{ backgroundColor: privacyBgColor }}
                  >
                    <h2
                      className="mb-6 font-serif text-3xl font-light"
                      style={{ color: privacyTextColor }}
                    >
                      Privacy Policy
                    </h2>
                    <div
                      className="prose prose-lg max-w-none"
                      style={{ color: privacyTextColor }}
                    >
                      {privacyContent.split("\n").map((paragraph) => (
                        <p key={paragraph} className="mb-4 leading-relaxed">
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
                  <Label
                    htmlFor="terms-content"
                    className="text-[#1a1d23] font-medium"
                  >
                    Content
                  </Label>
                  <Textarea
                    id="terms-content"
                    value={termsContent}
                    onChange={(e) => setTermsContent(e.target.value)}
                    placeholder="Enter terms & conditions content (use line breaks for paragraphs)"
                    className="min-h-[300px] border-[#e2e5eb] bg-white text-[#1a1d23] placeholder:text-[#96a0b5]"
                  />
                  <p className="text-xs text-[#96a0b5]">
                    Use line breaks to separate paragraphs
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="terms-text-color"
                      className="text-[#1a1d23] font-medium"
                    >
                      Text Color
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="terms-text-color"
                        type="color"
                        value={termsTextColor}
                        onChange={(e) => setTermsTextColor(e.target.value)}
                        className="h-10 w-20 cursor-pointer border-[#e2e5eb]"
                      />
                      <Input
                        type="text"
                        value={termsTextColor}
                        onChange={(e) => setTermsTextColor(e.target.value)}
                        className="border-[#e2e5eb] bg-white text-[#1a1d23]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="terms-bg-color"
                      className="text-[#1a1d23] font-medium"
                    >
                      Background Color
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="terms-bg-color"
                        type="color"
                        value={termsBgColor}
                        onChange={(e) => setTermsBgColor(e.target.value)}
                        className="h-10 w-20 cursor-pointer border-[#e2e5eb]"
                      />
                      <Input
                        type="text"
                        value={termsBgColor}
                        onChange={(e) => setTermsBgColor(e.target.value)}
                        className="border-[#e2e5eb] bg-white text-[#1a1d23]"
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
                    onClick={() =>
                      setPreviewMode(previewMode === "terms" ? null : "terms")
                    }
                    variant="outline"
                    className="border-[#e2e5eb] text-[#1a1d23] hover:bg-[#f0f2f7]"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    {previewMode === "terms" ? "Hide Preview" : "Preview"}
                  </Button>
                </div>

                {previewMode === "terms" && (
                  <div
                    className="rounded-lg border border-[#e2e5eb] p-8"
                    style={{ backgroundColor: termsBgColor }}
                  >
                    <h2
                      className="mb-6 font-serif text-3xl font-light"
                      style={{ color: termsTextColor }}
                    >
                      Terms & Conditions
                    </h2>
                    <div
                      className="prose prose-lg max-w-none"
                      style={{ color: termsTextColor }}
                    >
                      {termsContent.split("\n").map((paragraph) => (
                        <p key={paragraph} className="mb-4 leading-relaxed">
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
