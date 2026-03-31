import { useLiveArtists, useLiveArtworks, useLiveSiteConfig } from '@/hooks/useQueries';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Palette, ArrowRight } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useMemo } from 'react';

export default function ArtCollection() {
  const navigate = useNavigate();
  const { data: artists, isLoading: loadingArtists } = useLiveArtists();
  const { data: artworks, isLoading: loadingArtworks } = useLiveArtworks();
  const { data: siteConfig } = useLiveSiteConfig();

  const textColor = siteConfig?.textColor || '#000000';
  const accentColor = siteConfig?.accentColor || '#FFD700';
  const sectionTexts = siteConfig?.auraCollectionSection?.sectionTexts;
  
  // Memoize default images to prevent recalculation
  const defaultArtistImage = useMemo(() => {
    if (siteConfig?.defaultArtistImage) {
      return `/assets/${siteConfig.defaultArtistImage}`;
    }
    return '/assets/generated/artist-profile-studio.jpg';
  }, [siteConfig?.defaultArtistImage]);

  const defaultArtworkImage = useMemo(() => {
    if (siteConfig?.defaultArtworkImage) {
      return `/assets/${siteConfig.defaultArtworkImage}`;
    }
    return '/assets/generated/abstract-geometric-art.jpg';
  }, [siteConfig?.defaultArtworkImage]);

  useEffect(() => {
    if (siteConfig) {
      document.documentElement.style.setProperty('--dynamic-text-color', textColor);
      document.documentElement.style.setProperty('--dynamic-accent-color', accentColor);
    }
  }, [siteConfig, textColor, accentColor]);

  const isLoading = loadingArtists || loadingArtworks;
  
  // Check if section should be shown
  const showOnLandingPage = siteConfig?.auraCollectionSection?.showOnLandingPage ?? true;
  
  if (!showOnLandingPage) {
    return null;
  }

  // Get featured artists and artworks from config, or fallback to first few
  const featuredArtistIds = siteConfig?.auraCollectionSection?.featuredArtists || [];
  const featuredArtworkIds = siteConfig?.auraCollectionSection?.featuredArtworks || [];
  
  const featuredArtists = featuredArtistIds.length > 0
    ? artists?.filter(a => featuredArtistIds.includes(a.id)) || []
    : artists?.slice(0, 3) || [];
    
  const featuredArtworks = featuredArtworkIds.length > 0
    ? artworks?.filter(a => featuredArtworkIds.includes(a.id)) || []
    : artworks?.slice(0, 4) || [];

  // Helper functions to get images with guaranteed fallback
  const getArtistImage = (artist: typeof featuredArtists[0]) => {
    return artist.photo || defaultArtistImage;
  };

  const getArtworkImage = (artwork: typeof featuredArtworks[0]) => {
    return artwork.photo || defaultArtworkImage;
  };

  return (
    <section id="art" className="relative overflow-hidden bg-background py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 
            className="mb-4 font-serif text-4xl font-light md:text-5xl lg:text-6xl"
            style={{ color: textColor }}
          >
            The Aura Collection
          </h2>
          <div className="mx-auto h-1 w-24" style={{ backgroundColor: accentColor }} />
          <p className="mx-auto mt-6 max-w-2xl text-lg opacity-80" style={{ color: textColor }}>
            {sectionTexts?.discoverText || 'Discover curated artworks by local artists – available online or on-site'}
          </p>
        </div>

        {/* Large clickable artwork linking to collection page */}
        <div className="mb-20">
          <div 
            className="group mx-auto max-w-6xl cursor-pointer overflow-hidden rounded-lg shadow-2xl transition-all duration-300 hover:shadow-3xl" 
            style={{ backgroundColor: `${textColor}0d` }}
            onClick={() => navigate({ to: '/aura-collection' })}
          >
            <AspectRatio ratio={2 / 1}>
              <img 
                src="/assets/pjbtps_modern_art_painting_inspired_by_buenos_aires_and_latin_71d0b888-e7c6-47ac-940c-80bbde9cc543_1.png"
                alt="Modern art inspired by Palermo Hollywood and Latin American culture"
                className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </AspectRatio>
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/10">
              <div className="translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <Button
                  size="lg"
                  style={{ backgroundColor: accentColor, color: '#1a1a1a' }}
                  className="font-medium shadow-lg hover:opacity-90"
                >
                  View Full Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          <p className="mt-6 text-center text-sm italic opacity-70" style={{ color: textColor }}>
            {sectionTexts?.featuredText || 'Featured: Modern art inspired by Palermo Hollywood and Latin American culture'}
          </p>
        </div>

        {!isLoading && featuredArtists.length > 0 && (
          <div className="mb-20">
            <h3 className="mb-8 flex items-center justify-center gap-2 text-2xl font-light" style={{ color: textColor }}>
              <Palette className="h-6 w-6" style={{ color: accentColor }} />
              Our Artists
            </h3>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredArtists.map((artist) => (
                <Card 
                  key={artist.id} 
                  className="group overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
                  onClick={() => navigate({ to: '/artists/$artistId', params: { artistId: artist.id } })}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={getArtistImage(artist)}
                      alt={artist.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== defaultArtistImage) {
                          target.src = defaultArtistImage;
                        }
                      }}
                    />
                  </div>
                  <CardContent className="p-6">
                    <h4 className="mb-2 font-serif text-xl font-light" style={{ color: textColor }}>{artist.name}</h4>
                    <p className="line-clamp-3 text-sm opacity-70" style={{ color: textColor }}>{artist.bio}</p>
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

        {!isLoading && featuredArtworks.length > 0 && (
          <div>
            <h3 className="mb-8 text-center text-2xl font-light" style={{ color: textColor }}>
              Featured Artworks
            </h3>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredArtworks.map((artwork) => (
                <Card 
                  key={artwork.id} 
                  className="group overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
                  onClick={() => navigate({ to: '/artworks/$artworkId', params: { artworkId: artwork.id } })}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img 
                      src={getArtworkImage(artwork)}
                      alt={artwork.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== defaultArtworkImage) {
                          target.src = defaultArtworkImage;
                        }
                      }}
                    />
                    {artwork.isForSale && (
                      <Badge 
                        className="absolute right-2 top-2"
                        style={{ backgroundColor: accentColor, color: '#1a1a1a' }}
                      >
                        Available
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h5 className="mb-1 font-medium" style={{ color: textColor }}>{artwork.title}</h5>
                    <p className="line-clamp-2 text-sm opacity-70" style={{ color: textColor }}>{artwork.description}</p>
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

        {!isLoading && (artists && artists.length > 0 || artworks && artworks.length > 0) && (
          <div className="mt-12 text-center">
            <Button
              onClick={() => navigate({ to: '/aura-collection' })}
              variant="outline"
              size="lg"
              style={{ borderColor: accentColor, color: accentColor }}
              className="hover:opacity-90"
            >
              View Full Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        )}

        {!isLoading && (!artists?.length && !artworks?.length) && (
          <div className="text-center">
            <p className="text-lg opacity-70" style={{ color: textColor }}>
              Our art collection will be presented soon. Stay tuned!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
