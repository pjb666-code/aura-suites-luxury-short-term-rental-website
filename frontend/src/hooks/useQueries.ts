import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { 
  Apartment, 
  Artist, 
  Artwork, 
  ContactSubmission, 
  UserProfile, 
  SiteConfig, 
  LogoDisplayLocation,
  HeroSection,
  AboutSection,
  ExperiencePage,
  ApartmentsSection,
  AuraCollectionSection,
  FooterSection,
  ContactInfo,
  SectionTexts,
  LegalPage
} from '@/backend';

// User Profile
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

// Site Config - Live (for public)
export function useLiveSiteConfig() {
  const { actor, isFetching } = useActor();

  return useQuery<SiteConfig>({
    queryKey: ['liveSiteConfig'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getLiveSiteConfig();
    },
    enabled: !!actor && !isFetching,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Site Config - Draft (for admin)
export function useDraftSiteConfig() {
  const { actor, isFetching } = useActor();

  return useQuery<SiteConfig>({
    queryKey: ['draftSiteConfig'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getDraftSiteConfig();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateDraftSiteConfig() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: SiteConfig) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateDraftSiteConfig(config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

export function useUploadLogo() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ logoPath, placeholderPath }: { logoPath: string; placeholderPath: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.uploadLogo(logoPath, placeholderPath);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

export function useSetLogoDisplayLocation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (location: LogoDisplayLocation) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.setLogoDisplayLocation(location);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

export function useSetLogoSize() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (size: bigint) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.setLogoSize(size);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

export function useSetTextColor() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (color: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.setTextColor(color);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

export function useSetHeaderTextColor() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (color: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.setHeaderTextColor(color);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

export function useSetAccentColor() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (color: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.setAccentColor(color);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

export function useSetLandingPageBackgroundColor() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (color: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.setLandingPageBackgroundColor(color);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

export function useSetApartmentsPageBackgroundColor() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (color: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.setApartmentsPageBackgroundColor(color);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

export function useSetAuraCollectionPageBackgroundColor() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (color: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.setAuraCollectionPageBackgroundColor(color);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

export function useSetApartmentDetailPageBackgroundColor() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (color: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.setApartmentDetailPageBackgroundColor(color);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

export function useSetArtistDetailPageBackgroundColor() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (color: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.setArtistDetailPageBackgroundColor(color);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

export function useSetArtworkDetailPageBackgroundColor() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (color: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.setArtworkDetailPageBackgroundColor(color);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

// Section Updates
export function useUpdateHeroSection() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (section: HeroSection) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateHeroSection(section);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

export function useUpdateAboutSection() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (section: AboutSection) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateAboutSection(section);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

export function useUpdateExperiencePage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (page: ExperiencePage) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateExperiencePage(page);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

export function useUpdateApartmentsSection() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (section: ApartmentsSection) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateApartmentsSection(section);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

export function useUpdateAuraCollectionSection() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (section: AuraCollectionSection) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateAuraCollectionSection(section);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

export function useUpdateFooterSection() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (section: FooterSection) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateFooterSection(section);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

// Aura Collection Landing Page Controls
export function useSetFeaturedArtists() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (artistIds: string[]) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.setFeaturedArtists(artistIds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

export function useSetFeaturedArtworks() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (artworkIds: string[]) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.setFeaturedArtworks(artworkIds);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

export function useSetShowAuraCollectionOnLandingPage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (show: boolean) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.setShowAuraCollectionOnLandingPage(show);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

// Contact Info and Section Texts
export function useUpdateContactInfo() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (contactInfo: ContactInfo) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateContactInfo(contactInfo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

export function useUpdateSectionTexts() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sectionTexts: SectionTexts) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateSectionTexts(sectionTexts);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

// Media Management
export function useSetDefaultHeroImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (path: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.setDefaultHeroImage(path);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

export function useSetDefaultAboutImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (path: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.setDefaultAboutImage(path);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

export function useSetDefaultExperienceImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (path: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.setDefaultExperienceImage(path);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

export function useSetDefaultApartmentsImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (path: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.setDefaultApartmentsImage(path);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

export function useSetDefaultCollectionImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (path: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.setDefaultCollectionImage(path);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

export function useDeleteSectionImage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (section: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.deleteSectionImage(section);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftSiteConfig'] });
    },
  });
}

// Legal Pages - Live (for public)
export function useLiveImprintPage() {
  const { actor, isFetching } = useActor();

  return useQuery<LegalPage>({
    queryKey: ['liveImprintPage'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getLiveImprintPage();
    },
    enabled: !!actor && !isFetching,
    staleTime: 10 * 60 * 1000,
  });
}

export function useLivePrivacyPolicyPage() {
  const { actor, isFetching } = useActor();

  return useQuery<LegalPage>({
    queryKey: ['livePrivacyPolicyPage'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getLivePrivacyPolicyPage();
    },
    enabled: !!actor && !isFetching,
    staleTime: 10 * 60 * 1000,
  });
}

export function useLiveTermsPage() {
  const { actor, isFetching } = useActor();

  return useQuery<LegalPage>({
    queryKey: ['liveTermsPage'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getLiveTermsPage();
    },
    enabled: !!actor && !isFetching,
    staleTime: 10 * 60 * 1000,
  });
}

// Legal Pages - Draft (for admin)
export function useDraftImprintPage() {
  const { actor, isFetching } = useActor();

  return useQuery<LegalPage>({
    queryKey: ['draftImprintPage'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getDraftImprintPage();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDraftPrivacyPolicyPage() {
  const { actor, isFetching } = useActor();

  return useQuery<LegalPage>({
    queryKey: ['draftPrivacyPolicyPage'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getDraftPrivacyPolicyPage();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDraftTermsPage() {
  const { actor, isFetching } = useActor();

  return useQuery<LegalPage>({
    queryKey: ['draftTermsPage'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getDraftTermsPage();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateImprintPage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ content, textColor, backgroundColor }: { content: string; textColor: string; backgroundColor: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateImprintPage(content, textColor, backgroundColor);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftImprintPage'] });
    },
  });
}

export function useUpdatePrivacyPolicyPage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ content, textColor, backgroundColor }: { content: string; textColor: string; backgroundColor: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updatePrivacyPolicyPage(content, textColor, backgroundColor);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftPrivacyPolicyPage'] });
    },
  });
}

export function useUpdateTermsPage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ content, textColor, backgroundColor }: { content: string; textColor: string; backgroundColor: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateTermsPage(content, textColor, backgroundColor);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftTermsPage'] });
    },
  });
}

// Apartments - Live (for public)
export function useLiveApartments() {
  const { actor, isFetching } = useActor();

  return useQuery<Apartment[]>({
    queryKey: ['liveApartments'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listLiveApartments();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

// Apartments - Draft (for admin)
export function useDraftApartments() {
  const { actor, isFetching } = useActor();

  return useQuery<Apartment[]>({
    queryKey: ['draftApartments'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listDraftApartments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddDraftApartment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (apartment: Apartment) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.addDraftApartment(apartment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftApartments'] });
    },
  });
}

export function useUpdateDraftApartment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (apartment: Apartment) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateDraftApartment(apartment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftApartments'] });
    },
  });
}

export function useDeleteDraftApartment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.deleteDraftApartment(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftApartments'] });
    },
  });
}

export function usePermanentlyDeleteApartment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.permanentlyDeleteApartment(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftApartments'] });
      queryClient.invalidateQueries({ queryKey: ['liveApartments'] });
    },
  });
}

export function useUpdateApartmentGalleryImages() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ apartmentId, images }: { apartmentId: string; images: string[] }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateApartmentGalleryImages(apartmentId, images);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftApartments'] });
    },
  });
}

// Artists - Live (for public)
export function useLiveArtists() {
  const { actor, isFetching } = useActor();

  return useQuery<Artist[]>({
    queryKey: ['liveArtists'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listLiveArtists();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

// Artists - Draft (for admin)
export function useDraftArtists() {
  const { actor, isFetching } = useActor();

  return useQuery<Artist[]>({
    queryKey: ['draftArtists'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listDraftArtists();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddDraftArtist() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (artist: Artist) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.addDraftArtist(artist);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftArtists'] });
    },
  });
}

export function useUpdateDraftArtist() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (artist: Artist) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateDraftArtist(artist);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftArtists'] });
    },
  });
}

export function useDeleteDraftArtist() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.deleteDraftArtist(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftArtists'] });
    },
  });
}

export function usePermanentlyDeleteArtist() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.permanentlyDeleteArtist(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftArtists'] });
      queryClient.invalidateQueries({ queryKey: ['liveArtists'] });
    },
  });
}

export function useUpdateArtistGalleryImages() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ artistId, images }: { artistId: string; images: string[] }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateArtistGalleryImages(artistId, images);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftArtists'] });
    },
  });
}

// Artworks - Live (for public)
export function useLiveArtworks() {
  const { actor, isFetching } = useActor();

  return useQuery<Artwork[]>({
    queryKey: ['liveArtworks'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listLiveArtworks();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

// Artworks - Draft (for admin)
export function useDraftArtworks() {
  const { actor, isFetching } = useActor();

  return useQuery<Artwork[]>({
    queryKey: ['draftArtworks'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listDraftArtworks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddDraftArtwork() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (artwork: Artwork) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.addDraftArtwork(artwork);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftArtworks'] });
    },
  });
}

export function useUpdateDraftArtwork() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (artwork: Artwork) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateDraftArtwork(artwork);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftArtworks'] });
    },
  });
}

export function useDeleteDraftArtwork() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.deleteDraftArtwork(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftArtworks'] });
    },
  });
}

export function usePermanentlyDeleteArtwork() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.permanentlyDeleteArtwork(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftArtworks'] });
      queryClient.invalidateQueries({ queryKey: ['liveArtworks'] });
    },
  });
}

export function useUpdateArtworkGalleryImages() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ artworkId, images }: { artworkId: string; images: string[] }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.updateArtworkGalleryImages(artworkId, images);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['draftArtworks'] });
    },
  });
}

// Publish Changes
export function usePublishChanges() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.publishChanges();
    },
    onSuccess: () => {
      // Invalidate all live queries to reflect published changes
      queryClient.invalidateQueries({ queryKey: ['liveApartments'] });
      queryClient.invalidateQueries({ queryKey: ['liveArtists'] });
      queryClient.invalidateQueries({ queryKey: ['liveArtworks'] });
      queryClient.invalidateQueries({ queryKey: ['liveSiteConfig'] });
      queryClient.invalidateQueries({ queryKey: ['liveImprintPage'] });
      queryClient.invalidateQueries({ queryKey: ['livePrivacyPolicyPage'] });
      queryClient.invalidateQueries({ queryKey: ['liveTermsPage'] });
    },
  });
}

// Contact Submissions
export function useSubmitContact() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; email: string; message: string }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.submitContactForm(data.name, data.email, data.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactSubmissions'] });
    },
  });
}

export function useContactSubmissions() {
  const { actor, isFetching } = useActor();

  return useQuery<ContactSubmission[]>({
    queryKey: ['contactSubmissions'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listContactSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}
