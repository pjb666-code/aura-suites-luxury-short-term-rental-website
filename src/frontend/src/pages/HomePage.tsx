import { useLiveSiteConfig } from "@/hooks/useQueries";
import { useEffect } from "react";
import About from "../components/About";
import ArtCollection from "../components/ArtCollection";
import Contact from "../components/Contact";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Testimonials from "../components/Testimonials";

export default function HomePage() {
  const { data: siteConfig } = useLiveSiteConfig();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  useEffect(() => {
    if (siteConfig) {
      document.body.style.backgroundColor =
        siteConfig.landingPageBackgroundColor || "#FFFFFF";
    }
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [siteConfig]);

  return (
    <>
      <Header />
      <Hero />
      <About />
      <ArtCollection />
      <Experience />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
