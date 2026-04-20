import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AboutAdmin from "./AboutAdmin";
import AuraCollectionLandingAdmin from "./AuraCollectionLandingAdmin";
import BookingUrlAdmin from "./BookingUrlAdmin";
import ColorCustomizationAdmin from "./ColorCustomizationAdmin";
import ContactInfoAdmin from "./ContactInfoAdmin";
import HeroAdmin from "./HeroAdmin";
import LogoAdmin from "./LogoAdmin";

export default function LandingPageAdmin() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-[#1a1d23]">
          Landing Page Content
        </h2>
        <p className="text-sm text-[#5a6378]">
          Manage homepage sections including hero, about, art collection,
          contact info, logo, colors, and booking settings
        </p>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 bg-[#f0f2f7] border border-[#e2e5eb]">
          <TabsTrigger
            value="hero"
            className="data-[state=active]:bg-white data-[state=active]:text-[#1a1d23] data-[state=active]:shadow-sm text-[#5a6378]"
          >
            Hero
          </TabsTrigger>
          <TabsTrigger
            value="about"
            className="data-[state=active]:bg-white data-[state=active]:text-[#1a1d23] data-[state=active]:shadow-sm text-[#5a6378]"
          >
            About
          </TabsTrigger>
          <TabsTrigger
            value="art"
            className="data-[state=active]:bg-white data-[state=active]:text-[#1a1d23] data-[state=active]:shadow-sm text-[#5a6378]"
          >
            Art Section
          </TabsTrigger>
          <TabsTrigger
            value="contact"
            className="data-[state=active]:bg-white data-[state=active]:text-[#1a1d23] data-[state=active]:shadow-sm text-[#5a6378]"
          >
            Contact Info
          </TabsTrigger>
          <TabsTrigger
            value="logo"
            className="data-[state=active]:bg-white data-[state=active]:text-[#1a1d23] data-[state=active]:shadow-sm text-[#5a6378]"
          >
            Logo
          </TabsTrigger>
          <TabsTrigger
            value="colors"
            className="data-[state=active]:bg-white data-[state=active]:text-[#1a1d23] data-[state=active]:shadow-sm text-[#5a6378]"
          >
            Colors
          </TabsTrigger>
          <TabsTrigger
            value="booking"
            className="data-[state=active]:bg-white data-[state=active]:text-[#1a1d23] data-[state=active]:shadow-sm text-[#5a6378]"
          >
            Book Now
          </TabsTrigger>
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
