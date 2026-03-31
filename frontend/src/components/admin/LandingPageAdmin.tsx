import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HeroAdmin from './HeroAdmin';
import AboutAdmin from './AboutAdmin';
import LogoAdmin from './LogoAdmin';
import BookingUrlAdmin from './BookingUrlAdmin';
import ColorCustomizationAdmin from './ColorCustomizationAdmin';
import AuraCollectionLandingAdmin from './AuraCollectionLandingAdmin';
import ContactInfoAdmin from './ContactInfoAdmin';

export default function LandingPageAdmin() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Landing Page Content</h2>
        <p className="text-sm text-white/70">Manage homepage sections including hero, about, art collection, contact info, logo, colors, and booking settings</p>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 bg-luxury-dark/50 border border-luxury-gold/20">
          <TabsTrigger value="hero" className="data-[state=active]:bg-luxury-gold/20 data-[state=active]:text-white text-white/70">Hero</TabsTrigger>
          <TabsTrigger value="about" className="data-[state=active]:bg-luxury-gold/20 data-[state=active]:text-white text-white/70">About</TabsTrigger>
          <TabsTrigger value="art" className="data-[state=active]:bg-luxury-gold/20 data-[state=active]:text-white text-white/70">Art Section</TabsTrigger>
          <TabsTrigger value="contact" className="data-[state=active]:bg-luxury-gold/20 data-[state=active]:text-white text-white/70">Contact Info</TabsTrigger>
          <TabsTrigger value="logo" className="data-[state=active]:bg-luxury-gold/20 data-[state=active]:text-white text-white/70">Logo</TabsTrigger>
          <TabsTrigger value="colors" className="data-[state=active]:bg-luxury-gold/20 data-[state=active]:text-white text-white/70">Colors</TabsTrigger>
          <TabsTrigger value="booking" className="data-[state=active]:bg-luxury-gold/20 data-[state=active]:text-white text-white/70">Book Now</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <HeroAdmin />
        </TabsContent>

        <TabsContent value="about">
          <AboutAdmin />
        </TabsContent>

        <TabsContent value="art">
          <AuraCollectionLandingAdmin />
        </TabsContent>

        <TabsContent value="contact">
          <ContactInfoAdmin />
        </TabsContent>

        <TabsContent value="logo">
          <LogoAdmin />
        </TabsContent>

        <TabsContent value="colors">
          <ColorCustomizationAdmin />
        </TabsContent>

        <TabsContent value="booking">
          <BookingUrlAdmin />
        </TabsContent>
      </Tabs>
    </div>
  );
}
