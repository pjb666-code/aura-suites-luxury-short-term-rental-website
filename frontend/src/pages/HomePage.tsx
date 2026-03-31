import { useEffect } from 'react';
import { useLiveSiteConfig } from '@/hooks/useQueries';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Apartments from '../components/Apartments';
import Experience from '../components/Experience';
import ArtCollection from '../components/ArtCollection';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function HomePage() {
  const { data: siteConfig } = useLiveSiteConfig();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  useEffect(() => {
    if (siteConfig) {
      document.body.style.backgroundColor = siteConfig.landingPageBackgroundColor || '#FFFFFF';
    }
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [siteConfig]);

  return (
    <>
      <Header />
      <Hero />
      <About />
      <Apartments />
      <Experience />
      <ArtCollection />
      <Contact />
      <Footer />
    </>
  );
}
