import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArtistsAdmin from "./ArtistsAdmin";
import ArtworksAdmin from "./ArtworksAdmin";

export default function AuraCollectionAdmin() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-[#1a1d23]">
          Aura Collection
        </h2>
        <p className="text-sm text-[#5a6378]">
          Manage artists and artworks for your curated collection
        </p>
      </div>

      <Tabs defaultValue="artists" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-[#f0f2f7] border border-[#e2e5eb]">
          <TabsTrigger
            value="artists"
            className="data-[state=active]:bg-white data-[state=active]:text-[#1a1d23] data-[state=active]:shadow-sm text-[#5a6378]"
          >
            Artists
          </TabsTrigger>
          <TabsTrigger
            value="artworks"
            className="data-[state=active]:bg-white data-[state=active]:text-[#1a1d23] data-[state=active]:shadow-sm text-[#5a6378]"
          >
            Artworks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="artists">
          <ArtistsAdmin />
        </TabsContent>

        <TabsContent value="artworks">
          <ArtworksAdmin />
        </TabsContent>
      </Tabs>
    </div>
  );
}
