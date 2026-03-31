import { useLiveTermsPage } from '@/hooks/useQueries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Loader2 } from 'lucide-react';

export default function TermsPage() {
  const { data: termsPage, isLoading } = useLiveTermsPage();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-luxury-gold" />
      </div>
    );
  }

  const backgroundColor = termsPage?.backgroundColor || '#FFFFFF';
  const textColor = termsPage?.textColor || '#000000';

  return (
    <div className="min-h-screen" style={{ backgroundColor }}>
      <Header />
      <main className="container mx-auto px-4 py-16">
        <article className="mx-auto max-w-4xl">
          <h1 
            className="mb-8 font-serif text-4xl font-light md:text-5xl"
            style={{ color: textColor }}
          >
            {termsPage?.title || 'Terms & Conditions'}
          </h1>
          <div 
            className="prose prose-lg max-w-none"
            style={{ color: textColor }}
          >
            {termsPage?.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          {termsPage?.lastUpdated && (
            <p className="mt-8 text-sm opacity-70" style={{ color: textColor }}>
              Last updated: {new Date(Number(termsPage.lastUpdated) / 1000000).toLocaleDateString()}
            </p>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
