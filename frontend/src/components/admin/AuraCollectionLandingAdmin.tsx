import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Save, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useDraftSiteConfig, useDraftArtists, useDraftArtworks, useSetFeaturedArtists, useSetFeaturedArtworks, useSetShowAuraCollectionOnLandingPage, useUpdateSectionTexts } from '@/hooks/useQueries';

export default function AuraCollectionLandingAdmin() {
  const { data: siteConfig, isLoading: configLoading } = useDraftSiteConfig();
  const { data: artists, isLoading: artistsLoading } = useDraftArtists();
  const { data: artworks, isLoading: artworksLoading } = useDraftArtworks();
  
  const { mutate: setFeaturedArtists, isPending: savingArtists } = useSetFeaturedArtists();
  const { mutate: setFeaturedArtworks, isPending: savingArtworks } = useSetFeaturedArtworks();
  const { mutate: setShowOnLandingPage, isPending: savingVisibility } = useSetShowAuraCollectionOnLandingPage();
  const { mutate: updateSectionTexts, isPending: savingTexts } = useUpdateSectionTexts();

  const [showSection, setShowSection] = useState(true);
  const [selectedArtistIds, setSelectedArtistIds] = useState<string[]>([]);
  const [selectedArtworkIds, setSelectedArtworkIds] = useState<string[]>([]);
  const [discoverText, setDiscoverText] = useState('');
  const [featuredText, setFeaturedText] = useState('');

  useEffect(() => {
    if (siteConfig?.auraCollectionSection) {
      setShowSection(siteConfig.auraCollectionSection.showOnLandingPage ?? true);
      setSelectedArtistIds(siteConfig.auraCollectionSection.featuredArtists || []);
      setSelectedArtworkIds(siteConfig.auraCollectionSection.featuredArtworks || []);
      setDiscoverText(siteConfig.auraCollectionSection.sectionTexts?.discoverText || '');
      setFeaturedText(siteConfig.auraCollectionSection.sectionTexts?.featuredText || '');
    }
  }, [siteConfig]);

  const handleToggleArtist = (artistId: string) => {
    setSelectedArtistIds(prev => 
      prev.includes(artistId) 
        ? prev.filter(id => id !== artistId)
        : [...prev, artistId]
    );
  };

  const handleToggleArtwork = (artworkId: string) => {
    setSelectedArtworkIds(prev => 
      prev.includes(artworkId) 
        ? prev.filter(id => id !== artworkId)
        : [...prev, artworkId]
    );
  };

  const handleSaveVisibility = () => {
    setShowOnLandingPage(showSection, {
      onSuccess: () => {
        toast.success('Visibility setting saved successfully');
      },
      onError: (error) => {
        console.error('Failed to save visibility:', error);
        toast.error('Failed to save visibility setting');
      },
    });
  };

  const handleSaveArtists = () => {
    setFeaturedArtists(selectedArtistIds, {
      onSuccess: () => {
        toast.success('Featured artists saved successfully');
      },
      onError: (error) => {
        console.error('Failed to save artists:', error);
        toast.error('Failed to save featured artists');
      },
    });
  };

  const handleSaveArtworks = () => {
    setFeaturedArtworks(selectedArtworkIds, {
      onSuccess: () => {
        toast.success('Featured artworks saved successfully');
      },
      onError: (error) => {
        console.error('Failed to save artworks:', error);
        toast.error('Failed to save featured artworks');
      },
    });
  };

  const handleSaveTexts = () => {
    updateSectionTexts({ discoverText, featuredText }, {
      onSuccess: () => {
        toast.success('Section texts saved successfully');
      },
      onError: (error) => {
        console.error('Failed to save texts:', error);
        toast.error('Failed to save section texts');
      },
    });
  };

  if (configLoading || artistsLoading || artworksLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-luxury-gold" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section Texts */}
      <Card className="border-luxury-gold/20 bg-luxury-dark/50">
        <CardHeader>
          <CardTitle className="text-white">Section Text Content</CardTitle>
          <CardDescription className="text-white/70">
            Customize the text content displayed in the Aura Collection section
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="discover-text" className="text-white">
              Discover Text
            </Label>
            <Input
              id="discover-text"
              value={discoverText}
              onChange={(e) => setDiscoverText(e.target.value)}
              placeholder="Discover curated artworks by local artists – available online or on-site"
              className="bg-white/5 border-luxury-gold/20 text-white placeholder:text-white/40"
            />
            <p className="text-xs text-white/60">
              This text appears below the section title
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="featured-text" className="text-white">
              Featured Text
            </Label>
            <Textarea
              id="featured-text"
              value={featuredText}
              onChange={(e) => setFeaturedText(e.target.value)}
              placeholder="Featured: Modern art inspired by Palermo Hollywood and Latin American culture"
              rows={3}
              className="bg-white/5 border-luxury-gold/20 text-white placeholder:text-white/40"
            />
            <p className="text-xs text-white/60">
              This text appears below the large featured artwork image
            </p>
          </div>
          <div className="flex justify-end pt-2">
            <Button 
              onClick={handleSaveTexts} 
              disabled={savingTexts}
              className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
            >
              {savingTexts ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Texts
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Visibility Control */}
      <Card className="border-luxury-gold/20 bg-luxury-dark/50">
        <CardHeader>
          <CardTitle className="text-white">Section Visibility</CardTitle>
          <CardDescription className="text-white/70">
            Control whether the Aura Collection section appears on the landing page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="show-section" className="text-white">
                Show Aura Collection on Landing Page
              </Label>
              <p className="text-sm text-white/60">
                Toggle to hide or show the entire art collection section
              </p>
            </div>
            <Switch
              id="show-section"
              checked={showSection}
              onCheckedChange={setShowSection}
            />
          </div>
          <div className="flex justify-end pt-2">
            <Button 
              onClick={handleSaveVisibility} 
              disabled={savingVisibility}
              className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
            >
              {savingVisibility ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Visibility
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Featured Artists Selection */}
      <Card className="border-luxury-gold/20 bg-luxury-dark/50">
        <CardHeader>
          <CardTitle className="text-white">Featured Artists</CardTitle>
          <CardDescription className="text-white/70">
            Select which artists to feature on the landing page. Leave empty to show the first 3 artists automatically.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {artists && artists.length > 0 ? (
            <>
              <div className="space-y-3">
                {artists.map((artist) => (
                  <div key={artist.id} className="flex items-center space-x-3 rounded-lg border border-luxury-gold/20 bg-white/5 p-3">
                    <Checkbox
                      id={`artist-${artist.id}`}
                      checked={selectedArtistIds.includes(artist.id)}
                      onCheckedChange={() => handleToggleArtist(artist.id)}
                    />
                    <Label
                      htmlFor={`artist-${artist.id}`}
                      className="flex-1 cursor-pointer text-white"
                    >
                      <div className="font-medium">{artist.name}</div>
                      <div className="text-sm text-white/60 line-clamp-1">{artist.bio}</div>
                    </Label>
                    {artist.photo && (
                      <img 
                        src={artist.photo} 
                        alt={artist.name}
                        className="h-12 w-12 rounded object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-2">
                <p className="text-sm text-white/60">
                  {selectedArtistIds.length === 0 
                    ? 'No selection - will show first 3 artists' 
                    : `${selectedArtistIds.length} artist${selectedArtistIds.length !== 1 ? 's' : ''} selected`}
                </p>
                <Button 
                  onClick={handleSaveArtists} 
                  disabled={savingArtists}
                  className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
                >
                  {savingArtists ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Artists
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <p className="text-white/60">No artists available. Add artists in the Aura Collection tab first.</p>
          )}
        </CardContent>
      </Card>

      {/* Featured Artworks Selection */}
      <Card className="border-luxury-gold/20 bg-luxury-dark/50">
        <CardHeader>
          <CardTitle className="text-white">Featured Artworks</CardTitle>
          <CardDescription className="text-white/70">
            Select which artworks to feature on the landing page. Leave empty to show the first 4 artworks automatically.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {artworks && artworks.length > 0 ? (
            <>
              <div className="space-y-3">
                {artworks.map((artwork) => (
                  <div key={artwork.id} className="flex items-center space-x-3 rounded-lg border border-luxury-gold/20 bg-white/5 p-3">
                    <Checkbox
                      id={`artwork-${artwork.id}`}
                      checked={selectedArtworkIds.includes(artwork.id)}
                      onCheckedChange={() => handleToggleArtwork(artwork.id)}
                    />
                    <Label
                      htmlFor={`artwork-${artwork.id}`}
                      className="flex-1 cursor-pointer text-white"
                    >
                      <div className="font-medium">{artwork.title}</div>
                      <div className="text-sm text-white/60 line-clamp-1">{artwork.description}</div>
                    </Label>
                    {artwork.photo && (
                      <img 
                        src={artwork.photo} 
                        alt={artwork.title}
                        className="h-12 w-12 rounded object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-2">
                <p className="text-sm text-white/60">
                  {selectedArtworkIds.length === 0 
                    ? 'No selection - will show first 4 artworks' 
                    : `${selectedArtworkIds.length} artwork${selectedArtworkIds.length !== 1 ? 's' : ''} selected`}
                </p>
                <Button 
                  onClick={handleSaveArtworks} 
                  disabled={savingArtworks}
                  className="bg-luxury-gold text-luxury-dark hover:bg-luxury-gold/90"
                >
                  {savingArtworks ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Artworks
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <p className="text-white/60">No artworks available. Add artworks in the Aura Collection tab first.</p>
          )}
        </CardContent>
      </Card>

      {/* Preview */}
      <Card className="border-luxury-gold/20 bg-luxury-dark/50">
        <CardHeader>
          <CardTitle className="text-white">Preview</CardTitle>
          <CardDescription className="text-white/70">
            How the section will appear on the landing page
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showSection ? (
            <div className="space-y-4 rounded-lg bg-white p-6">
              <div className="flex items-center gap-2 text-luxury-gold">
                <Eye className="h-5 w-5" />
                <span className="font-medium">Section Visible</span>
              </div>
              <p className="text-sm text-gray-600">
                {selectedArtistIds.length === 0 && selectedArtworkIds.length === 0 && (
                  'Will display first 3 artists and first 4 artworks automatically'
                )}
                {selectedArtistIds.length > 0 && (
                  `Will display ${selectedArtistIds.length} selected artist${selectedArtistIds.length !== 1 ? 's' : ''}`
                )}
                {selectedArtistIds.length > 0 && selectedArtworkIds.length > 0 && ' and '}
                {selectedArtworkIds.length > 0 && (
                  `${selectedArtworkIds.length} selected artwork${selectedArtworkIds.length !== 1 ? 's' : ''}`
                )}
              </p>
            </div>
          ) : (
            <div className="space-y-4 rounded-lg bg-gray-100 p-6">
              <div className="flex items-center gap-2 text-gray-500">
                <EyeOff className="h-5 w-5" />
                <span className="font-medium">Section Hidden</span>
              </div>
              <p className="text-sm text-gray-600">
                The Aura Collection section will not appear on the landing page
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
