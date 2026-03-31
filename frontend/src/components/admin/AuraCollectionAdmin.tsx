import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ArtistsAdmin from './ArtistsAdmin';
import ArtworksAdmin from './ArtworksAdmin';

export default function AuraCollectionAdmin() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">Aura Collection</h2>
        <p className="text-sm text-white/70">Manage artists and artworks for your curated collection</p>
      </div>

      <Tabs defaultValue="artists" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-luxury-dark/50 border border-luxury-gold/20">
          <TabsTrigger value="artists" className="data-[state=active]:bg-luxury-gold/20 data-[state=active]:text-white text-white/70">Artists</TabsTrigger>
          <TabsTrigger value="artworks" className="data-[state=active]:bg-luxury-gold/20 data-[state=active]:text-white text-white/70">Artworks</TabsTrigger>
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
