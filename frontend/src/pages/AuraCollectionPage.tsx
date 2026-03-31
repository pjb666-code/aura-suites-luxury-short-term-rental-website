import { useEffect } from 'react';
import { useLiveArtists, useLiveArtworks, useLiveSiteConfig } from '@/hooks/useQueries';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Search } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AuraCollectionPage() {
  const navigate = useNavigate();
  const { data: artists, isLoading: loadingArtists } = useLiveArtists();
  const { data: artworks, isLoading: loadingArtworks } = useLiveArtworks();
  const { data: siteConfig } = useLiveSiteConfig();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArtists = artists?.filter(artist =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artist.bio.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const filteredArtworks = artworks?.filter(artwork =>
    artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artwork.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const textColor = siteConfig?.textColor || '#000000';
  const headerTextColor = siteConfig?.headerTextColor || '#000000';
  const accentColor = siteConfig?.accentColor || '#FFD700';
  const backgroundColor = siteConfig?.auraCollectionPageBackgroundColor || '#FFFFFF';

  useEffect(() => {
    if (siteConfig) {
      document.body.style.backgroundColor = backgroundColor;
    }
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [siteConfig, backgroundColor]);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16" style={{ backgroundColor, color: textColor }}>
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 font-serif text-5xl font-light md:text-6xl lg:text-7xl" style={{ color: headerTextColor }}>
              The Aura Collection
            </h1>
            <div className="mx-auto h-1 w-24" style={{ backgroundColor: accentColor }} />
            <p className="mx-auto mt-6 max-w-2xl text-lg" style={{ color: textColor, opacity: 0.7 }}>
              Explore our curated collection of artworks by talented local artists
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8 mx-auto max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: textColor, opacity: 0.5 }} />
              <Input
                type="text"
                placeholder="Search artists or artworks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                style={{ color: textColor }}
              />
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="artists">Artists</TabsTrigger>
              <TabsTrigger value="artworks">Artworks</TabsTrigger>
            </TabsList>

            {/* All Tab */}
            <TabsContent value="all" className="space-y-16">
              {/* Artists Section */}
              {filteredArtists.length > 0 && (
                <div>
                  <h2 className="mb-6 text-2xl font-light" style={{ color: headerTextColor }}>Artists</h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredArtists.map((artist) => (
                      <Card 
                        key={artist.id}
                        className="group overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
                        onClick={() => navigate({ to: '/artists/$artistId', params: { artistId: artist.id } })}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={artist.photo || '/assets/generated/artist-profile-studio.jpg'}
                            alt={artist.name}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                        <CardContent className="p-6">
                          <h3 className="mb-2 font-serif text-xl font-light" style={{ color: headerTextColor }}>{artist.name}</h3>
                          <p className="line-clamp-3 text-sm" style={{ color: textColor, opacity: 0.7 }}>{artist.bio}</p>
                          <div className="mt-4 flex items-center text-sm font-medium group-hover:gap-2 transition-all" style={{ color: accentColor }}>
                            View Profile
                            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Artworks Section */}
              {filteredArtworks.length > 0 && (
                <div>
                  <h2 className="mb-6 text-2xl font-light" style={{ color: headerTextColor }}>Artworks</h2>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {filteredArtworks.map((artwork) => (
                      <Card 
                        key={artwork.id}
                        className="group overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
                        onClick={() => navigate({ to: '/artworks/$artworkId', params: { artworkId: artwork.id } })}
                      >
                        <div className="relative aspect-square overflow-hidden">
                          <img 
                            src={artwork.photo || '/assets/generated/abstract-geometric-art.jpg'}
                            alt={artwork.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          {artwork.isForSale && (
                            <Badge className="absolute right-2 top-2" style={{ backgroundColor: accentColor, color: '#1a1a1a' }}>
                              Available
                            </Badge>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <h4 className="mb-1 font-medium" style={{ color: headerTextColor }}>{artwork.title}</h4>
                          <p className="line-clamp-2 text-sm" style={{ color: textColor, opacity: 0.7 }}>{artwork.description}</p>
                          <div className="mt-3 flex items-center text-sm font-medium group-hover:gap-2 transition-all" style={{ color: accentColor }}>
                            View Details
                            <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {filteredArtists.length === 0 && filteredArtworks.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg" style={{ color: textColor, opacity: 0.7 }}>
                    {searchQuery ? 'No results found matching your search.' : 'No content available at the moment.'}
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Artists Tab */}
            <TabsContent value="artists">
              {loadingArtists ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="h-48 animate-pulse bg-muted" />
                      <CardContent className="p-6">
                        <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredArtists.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredArtists.map((artist) => (
                    <Card 
                      key={artist.id}
                      className="group overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
                      onClick={() => navigate({ to: '/artists/$artistId', params: { artistId: artist.id } })}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={artist.photo || '/assets/generated/artist-profile-studio.jpg'}
                          alt={artist.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="mb-2 font-serif text-xl font-light" style={{ color: headerTextColor }}>{artist.name}</h3>
                        <p className="line-clamp-3 text-sm" style={{ color: textColor, opacity: 0.7 }}>{artist.bio}</p>
                        <div className="mt-4 flex items-center text-sm font-medium group-hover:gap-2 transition-all" style={{ color: accentColor }}>
                          View Profile
                          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg" style={{ color: textColor, opacity: 0.7 }}>
                    {searchQuery ? 'No artists found matching your search.' : 'No artists available at the moment.'}
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Artworks Tab */}
            <TabsContent value="artworks">
              {loadingArtworks ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="aspect-square animate-pulse bg-muted" />
                      <CardContent className="p-4">
                        <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredArtworks.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {filteredArtworks.map((artwork) => (
                    <Card 
                      key={artwork.id}
                      className="group overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
                      onClick={() => navigate({ to: '/artworks/$artworkId', params: { artworkId: artwork.id } })}
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <img 
                          src={artwork.photo || '/assets/generated/abstract-geometric-art.jpg'}
                          alt={artwork.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {artwork.isForSale && (
                          <Badge className="absolute right-2 top-2" style={{ backgroundColor: accentColor, color: '#1a1a1a' }}>
                            Available
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h4 className="mb-1 font-medium" style={{ color: headerTextColor }}>{artwork.title}</h4>
                        <p className="line-clamp-2 text-sm" style={{ color: textColor, opacity: 0.7 }}>{artwork.description}</p>
                        <div className="mt-3 flex items-center text-sm font-medium group-hover:gap-2 transition-all" style={{ color: accentColor }}>
                          View Details
                          <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg" style={{ color: textColor, opacity: 0.7 }}>
                    {searchQuery ? 'No artworks found matching your search.' : 'No artworks available at the moment.'}
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
