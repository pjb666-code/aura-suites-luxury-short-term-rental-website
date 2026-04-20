import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLiveArtists,
  useLiveArtworks,
  useLiveSiteConfig,
} from "@/hooks/useQueries";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function AuraCollectionPage() {
  const navigate = useNavigate();
  const { data: artists, isLoading: loadingArtists } = useLiveArtists();
  const { data: artworks, isLoading: loadingArtworks } = useLiveArtworks();
  const { data: siteConfig } = useLiveSiteConfig();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArtists =
    artists?.filter(
      (artist) =>
        artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artist.bio.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

  const filteredArtworks =
    artworks?.filter(
      (artwork) =>
        artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artwork.description.toLowerCase().includes(searchQuery.toLowerCase()),
    ) || [];

  const textColor = siteConfig?.textColor || "#000000";
  const headerTextColor = siteConfig?.headerTextColor || "#000000";
  const accentColor = siteConfig?.accentColor || "#FFD700";
  const backgroundColor =
    siteConfig?.auraCollectionPageBackgroundColor || "#FFFFFF";

  useEffect(() => {
    if (siteConfig) {
      document.body.style.backgroundColor = backgroundColor;
    }
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [siteConfig, backgroundColor]);

  // Alternate aspect ratios for artwork masonry: portrait vs landscape feel
  const getArtworkAspect = (index: number) =>
    index % 2 === 0 ? "aspect-[2/3]" : "aspect-[4/3]";

  const ArtistCard = ({
    artist,
    index,
  }: { artist: (typeof filteredArtists)[0]; index: number }) => (
    <button
      type="button"
      data-ocid={`collection.artist.${index + 1}`}
      className="group mb-6 break-inside-avoid overflow-hidden rounded-lg cursor-pointer transition-all duration-[400ms] ease-in-out hover:shadow-2xl w-full text-left bg-transparent p-0"
      style={{
        border: `1px solid ${textColor}10`,
        backgroundColor: `${textColor}03`,
      }}
      onClick={() =>
        navigate({ to: "/artists/$artistId", params: { artistId: artist.id } })
      }
    >
      {/* Square image for artists — portrait style */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={artist.photo || "/assets/generated/artist-profile-studio.jpg"}
          alt={artist.name}
          className="h-full w-full object-cover transition-transform duration-[400ms] ease-in-out group-hover:scale-[1.08]"
        />
        {/* Golden overlay */}
        <div className="absolute inset-0 bg-luxury-gold/10 opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100 pointer-events-none" />
        {/* Gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="p-5">
        <h3
          className="mb-2 font-serif text-xl font-light"
          style={{ color: headerTextColor }}
        >
          {artist.name}
        </h3>
        <p
          className="line-clamp-3 text-sm"
          style={{ color: textColor, opacity: 0.7 }}
        >
          {artist.bio}
        </p>
        <div
          className="mt-4 flex items-center text-sm font-medium transition-all duration-300 group-hover:gap-2"
          style={{ color: accentColor }}
        >
          View Profile
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </button>
  );

  const ArtworkCard = ({
    artwork,
    index,
    aspectClass,
  }: {
    artwork: (typeof filteredArtworks)[0];
    index: number;
    aspectClass: string;
  }) => (
    <button
      type="button"
      data-ocid={`collection.artwork.${index + 1}`}
      className="group mb-6 break-inside-avoid overflow-hidden rounded-lg cursor-pointer transition-all duration-[400ms] ease-in-out hover:shadow-2xl w-full text-left bg-transparent p-0"
      style={{
        border: `1px solid ${textColor}10`,
        backgroundColor: `${textColor}03`,
      }}
      onClick={() =>
        navigate({
          to: "/artworks/$artworkId",
          params: { artworkId: artwork.id },
        })
      }
    >
      <div className={`relative ${aspectClass} overflow-hidden`}>
        <img
          src={artwork.photo || "/assets/generated/abstract-geometric-art.jpg"}
          alt={artwork.title}
          className="h-full w-full object-cover transition-transform duration-[400ms] ease-in-out group-hover:scale-[1.08]"
        />
        <div className="absolute inset-0 bg-luxury-gold/10 opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100 pointer-events-none" />
        {artwork.isForSale && (
          <Badge
            className="absolute right-2 top-2"
            style={{ backgroundColor: accentColor, color: "#1a1a1a" }}
          >
            Available
          </Badge>
        )}
      </div>
      <div className="p-4">
        <h4 className="mb-1 font-medium" style={{ color: headerTextColor }}>
          {artwork.title}
        </h4>
        <p
          className="line-clamp-2 text-sm"
          style={{ color: textColor, opacity: 0.7 }}
        >
          {artwork.description}
        </p>
        <div
          className="mt-3 flex items-center text-sm font-medium transition-all duration-300 group-hover:gap-2"
          style={{ color: accentColor }}
        >
          View Details
          <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </button>
  );

  return (
    <>
      <Header />
      <main
        className="min-h-screen pt-24 pb-16"
        style={{ backgroundColor, color: textColor }}
      >
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1
              className="mb-4 font-serif text-5xl font-light md:text-6xl lg:text-7xl"
              style={{ color: headerTextColor }}
            >
              The Aura Collection
            </h1>
            <div
              className="mx-auto h-1 w-24"
              style={{ backgroundColor: accentColor }}
            />
            <p
              className="mx-auto mt-6 max-w-2xl text-lg"
              style={{ color: textColor, opacity: 0.7 }}
            >
              Explore our curated collection of artworks by talented local
              artists
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8 mx-auto max-w-2xl">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5"
                style={{ color: textColor, opacity: 0.5 }}
              />
              <Input
                type="text"
                placeholder="Search artists or artworks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-ocid="collection.search_input"
                style={{ color: textColor }}
              />
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-10">
              <TabsTrigger value="all" data-ocid="collection.tab.all">
                All
              </TabsTrigger>
              <TabsTrigger value="artists" data-ocid="collection.tab.artists">
                Artists
              </TabsTrigger>
              <TabsTrigger value="artworks" data-ocid="collection.tab.artworks">
                Artworks
              </TabsTrigger>
            </TabsList>

            {/* All Tab */}
            <TabsContent value="all" className="space-y-14">
              {filteredArtists.length > 0 && (
                <div>
                  <h2
                    className="mb-6 text-2xl font-light"
                    style={{ color: headerTextColor }}
                  >
                    Artists
                  </h2>
                  <div style={{ columns: "3 240px", gap: "1.5rem" }}>
                    {filteredArtists.map((artist, i) => (
                      <ArtistCard key={artist.id} artist={artist} index={i} />
                    ))}
                  </div>
                </div>
              )}

              {filteredArtworks.length > 0 && (
                <div>
                  <h2
                    className="mb-6 text-2xl font-light"
                    style={{ color: headerTextColor }}
                  >
                    Artworks
                  </h2>
                  <div style={{ columns: "3 240px", gap: "1.5rem" }}>
                    {filteredArtworks.map((artwork, i) => (
                      <ArtworkCard
                        key={artwork.id}
                        artwork={artwork}
                        index={i}
                        aspectClass={getArtworkAspect(i)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {filteredArtists.length === 0 &&
                filteredArtworks.length === 0 && (
                  <div
                    className="text-center py-12"
                    data-ocid="collection.empty_state"
                  >
                    <p
                      className="text-lg"
                      style={{ color: textColor, opacity: 0.7 }}
                    >
                      {searchQuery
                        ? "No results found matching your search."
                        : "No content available at the moment."}
                    </p>
                  </div>
                )}
            </TabsContent>

            {/* Artists Tab */}
            <TabsContent value="artists">
              {loadingArtists ? (
                <div style={{ columns: "3 240px", gap: "1.5rem" }}>
                  {[1, 2, 3].map((i) => (
                    <Card
                      key={i}
                      className="mb-6 break-inside-avoid overflow-hidden"
                    >
                      <div className="aspect-square animate-pulse bg-muted" />
                      <CardContent className="p-6">
                        <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredArtists.length > 0 ? (
                <div style={{ columns: "3 240px", gap: "1.5rem" }}>
                  {filteredArtists.map((artist, i) => (
                    <ArtistCard key={artist.id} artist={artist} index={i} />
                  ))}
                </div>
              ) : (
                <div
                  className="text-center py-12"
                  data-ocid="collection.artists.empty_state"
                >
                  <p
                    className="text-lg"
                    style={{ color: textColor, opacity: 0.7 }}
                  >
                    {searchQuery
                      ? "No artists found matching your search."
                      : "No artists available at the moment."}
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Artworks Tab */}
            <TabsContent value="artworks">
              {loadingArtworks ? (
                <div style={{ columns: "3 240px", gap: "1.5rem" }}>
                  {[1, 2, 3, 4].map((i) => (
                    <Card
                      key={i}
                      className="mb-6 break-inside-avoid overflow-hidden"
                    >
                      <div
                        className={`${getArtworkAspect(i)} animate-pulse bg-muted`}
                      />
                      <CardContent className="p-4">
                        <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredArtworks.length > 0 ? (
                <div style={{ columns: "3 240px", gap: "1.5rem" }}>
                  {filteredArtworks.map((artwork, i) => (
                    <ArtworkCard
                      key={artwork.id}
                      artwork={artwork}
                      index={i}
                      aspectClass={getArtworkAspect(i)}
                    />
                  ))}
                </div>
              ) : (
                <div
                  className="text-center py-12"
                  data-ocid="collection.artworks.empty_state"
                >
                  <p
                    className="text-lg"
                    style={{ color: textColor, opacity: 0.7 }}
                  >
                    {searchQuery
                      ? "No artworks found matching your search."
                      : "No artworks available at the moment."}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
}
