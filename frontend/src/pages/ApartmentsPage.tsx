import { useEffect, useMemo } from 'react';
import { useLiveApartments, useLiveSiteConfig } from '@/hooks/useQueries';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MapPin, Check, ArrowRight, Search } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ApartmentsPage() {
  const navigate = useNavigate();
  const { data: apartments, isLoading } = useLiveApartments();
  const { data: siteConfig } = useLiveSiteConfig();
  const [searchQuery, setSearchQuery] = useState('');

  const activeApartments = apartments?.filter(apt => apt.isActive) || [];
  
  const filteredApartments = activeApartments.filter(apt => 
    apt.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const textColor = siteConfig?.textColor || '#FFFFFF';
  const headerTextColor = siteConfig?.headerTextColor || '#FFFFFF';
  const accentColor = siteConfig?.accentColor || '#FFD700';
  const backgroundColor = siteConfig?.apartmentsPageBackgroundColor || '#1a1a1a';
  
  // Memoize default image to prevent recalculation
  const defaultImage = useMemo(() => {
    if (siteConfig?.defaultApartmentImage) {
      return `/assets/${siteConfig.defaultApartmentImage}`;
    }
    return '/assets/generated/luxury-bedroom-art.jpg';
  }, [siteConfig?.defaultApartmentImage]);

  useEffect(() => {
    if (siteConfig) {
      document.body.style.backgroundColor = backgroundColor;
    }
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [siteConfig, backgroundColor]);

  // Helper function to get apartment image with guaranteed fallback
  const getApartmentImage = (apartment: typeof activeApartments[0]) => {
    if (apartment.photos && apartment.photos.length > 0 && apartment.photos[0]) {
      return apartment.photos[0];
    }
    return defaultImage;
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-16" style={{ backgroundColor, color: textColor }}>
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 font-serif text-5xl font-light md:text-6xl lg:text-7xl" style={{ color: headerTextColor }}>
              Our Apartments
            </h1>
            <div className="mx-auto h-1 w-24" style={{ backgroundColor: accentColor }} />
            <p className="mx-auto mt-6 max-w-2xl text-lg" style={{ color: textColor, opacity: 0.8 }}>
              Explore our collection of luxury artist lofts in Palermo Hollywood
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8 mx-auto max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" style={{ color: textColor, opacity: 0.5 }} />
              <Input
                type="text"
                placeholder="Search apartments by name, location, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                style={{ 
                  backgroundColor: `${textColor}10`, 
                  borderColor: `${textColor}20`,
                  color: textColor
                }}
              />
            </div>
          </div>

          {/* Apartments Grid */}
          {isLoading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden" style={{ borderColor: `${textColor}10`, backgroundColor: `${textColor}05` }}>
                  <div className="h-64 animate-pulse" style={{ backgroundColor: `${textColor}10` }} />
                  <CardContent className="p-6">
                    <div className="h-6 w-3/4 animate-pulse rounded" style={{ backgroundColor: `${textColor}10` }} />
                    <div className="mt-4 h-4 w-full animate-pulse rounded" style={{ backgroundColor: `${textColor}10` }} />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredApartments.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredApartments.map((apartment) => (
                <Card 
                  key={apartment.id} 
                  className="group overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-pointer"
                  style={{ 
                    borderColor: `${textColor}10`, 
                    backgroundColor: `${textColor}05` 
                  }}
                  onClick={() => navigate({ to: '/apartments/$apartmentId', params: { apartmentId: apartment.id } })}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={getApartmentImage(apartment)}
                      alt={apartment.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== defaultImage) {
                          target.src = defaultImage;
                        }
                      }}
                    />
                    <Badge className="absolute right-4 top-4" style={{ backgroundColor: accentColor, color: '#1a1a1a' }}>
                      {apartment.city}
                    </Badge>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="mb-2 font-serif text-2xl font-light" style={{ color: headerTextColor }}>{apartment.name}</h3>
                    
                    <div className="mb-4 flex items-center text-sm" style={{ color: textColor, opacity: 0.7 }}>
                      <MapPin className="mr-2 h-4 w-4" />
                      {apartment.address}
                    </div>

                    <p className="mb-4 line-clamp-3" style={{ color: textColor, opacity: 0.8 }}>
                      {apartment.description}
                    </p>

                    <div className="space-y-2">
                      <p className="text-sm font-medium" style={{ color: accentColor }}>Amenities:</p>
                      <div className="flex flex-wrap gap-2">
                        {apartment.amenities.slice(0, 4).map((amenity, idx) => (
                          <div key={idx} className="flex items-center text-sm" style={{ color: textColor, opacity: 0.7 }}>
                            <Check className="mr-1 h-3 w-3" style={{ color: accentColor }} />
                            {amenity}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center text-sm font-medium group-hover:gap-2 transition-all" style={{ color: accentColor }}>
                      View Details
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg" style={{ color: textColor, opacity: 0.7 }}>
                {searchQuery ? 'No apartments found matching your search.' : 'No apartments available at the moment.'}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
