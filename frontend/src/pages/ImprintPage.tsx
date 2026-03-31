import { useLiveImprintPage } from '@/hooks/useQueries';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Loader2 } from 'lucide-react';

export default function ImprintPage() {
  const { data: imprintPage, isLoading } = useLiveImprintPage();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-luxury-gold" />
      </div>
    );
  }

  const backgroundColor = imprintPage?.backgroundColor || '#FFFFFF';
  const textColor = imprintPage?.textColor || '#000000';

  return (
    <div className="min-h-screen" style={{ backgroundColor }}>
      <Header />
      <main className="container mx-auto px-4 py-16">
        <article className="mx-auto max-w-4xl">
          <h1 
            className="mb-8 font-serif text-4xl font-light md:text-5xl"
            style={{ color: textColor }}
          >
            {imprintPage?.title || 'Imprint'}
          </h1>
          <div 
            className="prose prose-lg max-w-none"
            style={{ color: textColor }}
          >
            {imprintPage?.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          {imprintPage?.lastUpdated && (
            <p className="mt-8 text-sm opacity-70" style={{ color: textColor }}>
              Last updated: {new Date(Number(imprintPage.lastUpdated) / 1000000).toLocaleDateString()}
            </p>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
