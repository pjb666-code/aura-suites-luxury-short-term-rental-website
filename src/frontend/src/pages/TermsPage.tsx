import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useLiveTermsPage } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function TermsPage() {
  const { data: termsPage, isLoading } = useLiveTermsPage();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-luxury-gold" />
      </div>
    );
  }

  const backgroundColor = termsPage?.backgroundColor || "#FFFFFF";
  const textColor = termsPage?.textColor || "#000000";

  return (
    <div className="min-h-screen" style={{ backgroundColor }}>
      <Header />
      <main className="container mx-auto px-4 py-16">
        <article className="mx-auto max-w-4xl">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm opacity-60 transition-opacity hover:opacity-100"
            style={{ color: textColor }}
            data-ocid="terms-back-home"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <h1
            className="mb-8 mt-6 font-serif text-4xl font-light md:text-5xl"
            style={{ color: textColor }}
          >
            {termsPage?.title || "Terms & Conditions"}
          </h1>

          {termsPage?.content ? (
            <div
              className="prose prose-lg max-w-none"
              style={{ color: textColor }}
            >
              {termsPage.content.split("\n").map((paragraph) => (
                <p
                  key={paragraph || Math.random().toString(36)}
                  className="mb-4 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-lg opacity-60" style={{ color: textColor }}>
              Terms & Conditions have not been added yet. Please check back
              later or contact us at{" "}
              <a href="mailto:contact@aurasuites.info" className="underline">
                contact@aurasuites.info
              </a>
              .
            </p>
          )}

          {termsPage?.lastUpdated && (
            <p className="mt-8 text-sm opacity-70" style={{ color: textColor }}>
              Last updated:{" "}
              {new Date(
                Number(termsPage.lastUpdated) / 1000000,
              ).toLocaleDateString()}
            </p>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
