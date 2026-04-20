import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CityGuideAdmin from "./CityGuideAdmin";
import ExclusiveServicesAdmin from "./ExclusiveServicesAdmin";
import ExperienceAdmin from "./ExperienceAdmin";
import MapManagerAdmin from "./MapManagerAdmin";

/**
 * Consolidated Experience admin — groups all experience-related sections
 * under one tab: Experience Content, Map, City Guide, Services.
 */
export default function ExperienceFullAdmin() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-[#1a1d23]">
          The Experience
        </h2>
        <p className="text-sm text-[#5a6378]">
          Manage experience page content, map highlights, city guide
          recommendations, and exclusive services
        </p>
      </div>

      <Tabs defaultValue="content" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-[#f0f2f7] border border-[#e2e5eb]">
          <TabsTrigger
            value="content"
            className="data-[state=active]:bg-white data-[state=active]:text-[#1a1d23] data-[state=active]:shadow-sm text-[#5a6378] text-xs"
            data-ocid="experience-content-tab"
          >
            Content
          </TabsTrigger>
          <TabsTrigger
            value="map"
            className="data-[state=active]:bg-white data-[state=active]:text-[#1a1d23] data-[state=active]:shadow-sm text-[#5a6378] text-xs"
            data-ocid="experience-map-tab"
          >
            Map
          </TabsTrigger>
          <TabsTrigger
            value="cityguide"
            className="data-[state=active]:bg-white data-[state=active]:text-[#1a1d23] data-[state=active]:shadow-sm text-[#5a6378] text-xs"
            data-ocid="experience-cityguide-tab"
          >
            City Guide
          </TabsTrigger>
          <TabsTrigger
            value="services"
            className="data-[state=active]:bg-white data-[state=active]:text-[#1a1d23] data-[state=active]:shadow-sm text-[#5a6378] text-xs"
            data-ocid="experience-services-tab"
          >
            Services
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <ExperienceAdmin />
        </TabsContent>
        <TabsContent value="map">
          <MapManagerAdmin />
        </TabsContent>
        <TabsContent value="cityguide">
          <CityGuideAdmin />
        </TabsContent>
        <TabsContent value="services">
          <ExclusiveServicesAdmin />
        </TabsContent>
      </Tabs>
    </div>
  );
}
