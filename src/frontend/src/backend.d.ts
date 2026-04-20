import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactSubmission {
    id: string;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface SiteConfig {
    defaultCollectionImage: string;
    aboutSection: AboutSection;
    heroSection: HeroSection;
    footerSection: FooterSection;
    artistDetailPageBackgroundColor: string;
    defaultHeroImage: string;
    logoDisplayLocation: LogoDisplayLocation;
    defaultArtworkImage: string;
    apartmentsSection: ApartmentsSection;
    headerTextColor: string;
    accentColor: string;
    logoPath: string;
    logoSize: bigint;
    language: string;
    defaultApartmentImage: string;
    auraCollectionPageBackgroundColor: string;
    defaultExperienceImage: string;
    defaultArtistImage: string;
    experiencePage: ExperiencePage;
    contactEmail: string;
    landingPageBackgroundColor: string;
    logoPlaceholderPath: string;
    defaultApartmentsImage: string;
    apartmentsPageBackgroundColor: string;
    bookingUrl: string;
    auraCollectionSection: AuraCollectionSection;
    textColor: string;
    apartmentDetailPageBackgroundColor: string;
    artworkDetailPageBackgroundColor: string;
    defaultAboutImage: string;
}
export interface SocialLink {
    url: string;
    platform: string;
}
export interface HeroSection {
    backgroundColor: string;
    title: string;
    layout: LayoutOption;
    backgroundImage: string;
    textColor: string;
    subtitle: string;
}
export interface LegalPage {
    backgroundColor: string;
    title: string;
    content: string;
    lastUpdated: bigint;
    textColor: string;
}
export interface Artist {
    id: string;
    bio: string;
    galleryImages: Array<string>;
    name: string;
    artworks: Array<string>;
    photo: string;
}
export interface Artwork {
    id: string;
    galleryImages: Array<string>;
    title: string;
    artistId: string;
    description: string;
    photo: string;
    price?: bigint;
    isForSale: boolean;
}
export interface ApartmentsSection {
    backgroundColor: string;
    title: string;
    layout: LayoutOption;
    description: string;
    backgroundImage: string;
    textColor: string;
}
export interface FileReference {
    hash: string;
    path: string;
}
export interface ContactInfo {
    contactText: string;
    socialLinks: Array<SocialLink>;
    email: string;
    address: string;
    phone: string;
}
export interface CityGuideEntry {
    id: string;
    title: string;
    externalLink?: string;
    sortOrder: bigint;
    description: string;
    imageKey?: string;
    pdfKey?: string;
    visible: boolean;
    category: string;
}
export interface AboutSection {
    backgroundColor: string;
    title: string;
    content: string;
    layout: LayoutOption;
    image: string;
    textColor: string;
}
export interface Highlight {
    id: string;
    title: string;
    icon: string;
    description: string;
    isActive: boolean;
}
export interface AuraCollectionSection {
    backgroundColor: string;
    title: string;
    contactInfo: ContactInfo;
    auraCollectionMainImageKey?: string;
    showOnLandingPage: boolean;
    layout: LayoutOption;
    description: string;
    sectionTexts: SectionTexts;
    featuredArtworks: Array<string>;
    backgroundImage: string;
    featuredArtists: Array<string>;
    textColor: string;
}
export interface MapMarker {
    id: string;
    lat: number;
    lng: number;
    sortOrder: bigint;
    name: string;
    description: string;
    website?: string;
    imageKey?: string;
    address: string;
    visible: boolean;
    category: string;
}
export interface ExperienceSection {
    id: string;
    title: string;
    order: bigint;
    animationType: string;
    layout: LayoutOption;
    description: string;
    isActive: boolean;
    videos: Array<string>;
    images: Array<string>;
}
export interface SectionTexts {
    featuredText: string;
    discoverText: string;
}
export interface ExperiencePage {
    backgroundColor: string;
    title: string;
    layout: LayoutOption;
    description: string;
    highlights: Array<Highlight>;
    backgroundImage: string;
    sections: Array<ExperienceSection>;
    cardStyle: CardStyle;
    textColor: string;
}
export interface FooterSection {
    backgroundColor: string;
    contactInfo: string;
    socialLinks: Array<string>;
    layout: LayoutOption;
    textColor: string;
}
export interface ExclusiveService {
    id: string;
    sortOrder: bigint;
    name: string;
    description: string;
    imageKey?: string;
    visible: boolean;
    category: string;
    priceInfo?: string;
    requestLink?: string;
}
export interface Apartment {
    id: string;
    city: string;
    name: string;
    description: string;
    amenities: Array<string>;
    isActive: boolean;
    address: string;
    bookingUrl: string;
    photos: Array<string>;
}
export interface UserProfile {
    name: string;
}
export interface Testimonial {
    id: string;
    sortOrder: bigint;
    date: string;
    name: string;
    text: string;
    authorPhoto?: Uint8Array;
    stars: bigint;
    visible: boolean;
}
export enum CardStyle {
    minimal = "minimal",
    classic = "classic",
    modern = "modern"
}
export enum LayoutOption {
    grid = "grid",
    list = "list",
    centered = "centered",
    simple = "simple",
    leftImage = "leftImage",
    gallery = "gallery"
}
export enum LogoDisplayLocation {
    both = "both",
    footer = "footer",
    header = "header"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addDraftApartment(apartment: Apartment): Promise<void>;
    addDraftArtist(artist: Artist): Promise<void>;
    addDraftArtwork(artwork: Artwork): Promise<void>;
    addDraftCityGuideEntry(entry: CityGuideEntry): Promise<void>;
    addDraftExclusiveService(service: ExclusiveService): Promise<void>;
    addDraftMapMarker(marker: MapMarker): Promise<void>;
    addDraftTestimonial(testimonial: Testimonial): Promise<void>;
    addExperienceHighlight(highlight: Highlight): Promise<void>;
    addExperienceSection(section: ExperienceSection): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteDraftApartment(id: string): Promise<void>;
    deleteDraftArtist(id: string): Promise<void>;
    deleteDraftArtwork(id: string): Promise<void>;
    deleteDraftCityGuideEntry(id: string): Promise<void>;
    deleteDraftExclusiveService(id: string): Promise<void>;
    deleteDraftMapMarker(id: string): Promise<void>;
    deleteDraftTestimonial(id: string): Promise<void>;
    deleteExperienceHighlight(id: string): Promise<void>;
    deleteExperienceSection(id: string): Promise<void>;
    deleteSectionImage(section: string): Promise<void>;
    dropFileReference(path: string): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDraftApartment(id: string): Promise<Apartment | null>;
    getDraftArtist(id: string): Promise<Artist | null>;
    getDraftArtwork(id: string): Promise<Artwork | null>;
    getDraftCityGuideEntry(id: string): Promise<CityGuideEntry | null>;
    getDraftExclusiveService(id: string): Promise<ExclusiveService | null>;
    getDraftImprintPage(): Promise<LegalPage>;
    getDraftMapMarker(id: string): Promise<MapMarker | null>;
    getDraftPrivacyPolicyPage(): Promise<LegalPage>;
    getDraftSiteConfig(): Promise<SiteConfig>;
    getDraftTermsPage(): Promise<LegalPage>;
    getFileReference(path: string): Promise<FileReference | null>;
    getLiveApartment(id: string): Promise<Apartment | null>;
    getLiveArtist(id: string): Promise<Artist | null>;
    getLiveArtwork(id: string): Promise<Artwork | null>;
    getLiveCityGuideEntry(id: string): Promise<CityGuideEntry | null>;
    getLiveExclusiveService(id: string): Promise<ExclusiveService | null>;
    getLiveImprintPage(): Promise<LegalPage>;
    getLiveMapMarker(id: string): Promise<MapMarker | null>;
    getLivePrivacyPolicyPage(): Promise<LegalPage>;
    getLiveSiteConfig(): Promise<SiteConfig>;
    getLiveTermsPage(): Promise<LegalPage>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listContactSubmissions(): Promise<Array<ContactSubmission>>;
    listDraftApartments(): Promise<Array<Apartment>>;
    listDraftArtists(): Promise<Array<Artist>>;
    listDraftArtworks(): Promise<Array<Artwork>>;
    listDraftCityGuideEntries(): Promise<Array<CityGuideEntry>>;
    listDraftExclusiveServices(): Promise<Array<ExclusiveService>>;
    listDraftMapMarkers(): Promise<Array<MapMarker>>;
    listDraftTestimonials(): Promise<Array<Testimonial>>;
    listFileReferences(): Promise<Array<FileReference>>;
    listLiveApartments(): Promise<Array<Apartment>>;
    listLiveArtists(): Promise<Array<Artist>>;
    listLiveArtworks(): Promise<Array<Artwork>>;
    listLiveCityGuideEntries(): Promise<Array<CityGuideEntry>>;
    listLiveExclusiveServices(): Promise<Array<ExclusiveService>>;
    listLiveMapMarkers(): Promise<Array<MapMarker>>;
    listLiveTestimonials(): Promise<Array<Testimonial>>;
    permanentlyDeleteApartment(id: string): Promise<void>;
    permanentlyDeleteArtist(id: string): Promise<void>;
    permanentlyDeleteArtwork(id: string): Promise<void>;
    publishChanges(): Promise<void>;
    registerFileReference(path: string, hash: string): Promise<void>;
    reorderCityGuideEntries(orderedIds: Array<string>): Promise<void>;
    reorderExclusiveServices(orderedIds: Array<string>): Promise<void>;
    reorderExperienceSections(sectionIds: Array<string>): Promise<void>;
    reorderMapMarkers(orderedIds: Array<string>): Promise<void>;
    reorderTestimonials(orderedIds: Array<string>): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setAccentColor(color: string): Promise<void>;
    setApartmentDetailPageBackgroundColor(color: string): Promise<void>;
    setApartmentsPageBackgroundColor(color: string): Promise<void>;
    setArtistDetailPageBackgroundColor(color: string): Promise<void>;
    setArtworkDetailPageBackgroundColor(color: string): Promise<void>;
    /**
     * / Set or clear the object-storage key for the Aura Collection main landing image.
     */
    setAuraCollectionLandingImageKey(key: string | null): Promise<void>;
    setAuraCollectionPageBackgroundColor(color: string): Promise<void>;
    setBookingUrl(url: string): Promise<void>;
    setDefaultAboutImage(path: string): Promise<void>;
    setDefaultApartmentsImage(path: string): Promise<void>;
    setDefaultCollectionImage(path: string): Promise<void>;
    setDefaultExperienceImage(path: string): Promise<void>;
    setDefaultHeroImage(path: string): Promise<void>;
    /**
     * / Set or clear the image object-storage key on a draft city guide entry.
     */
    setDraftCityGuideImageKey(id: string, imageKey: string | null): Promise<void>;
    /**
     * / Set or clear the PDF object-storage key on a draft city guide entry.
     */
    setDraftCityGuidePdfKey(id: string, pdfKey: string | null): Promise<void>;
    /**
     * / Set or clear the image object-storage key on a draft exclusive service.
     */
    setDraftExclusiveServiceImageKey(id: string, imageKey: string | null): Promise<void>;
    /**
     * / Set or clear the image object-storage key on a draft map marker.
     */
    setDraftMapMarkerImageKey(id: string, imageKey: string | null): Promise<void>;
    setFeaturedArtists(artistIds: Array<string>): Promise<void>;
    setFeaturedArtworks(artworkIds: Array<string>): Promise<void>;
    setHeaderTextColor(color: string): Promise<void>;
    setLandingPageBackgroundColor(color: string): Promise<void>;
    setLogoDisplayLocation(location: LogoDisplayLocation): Promise<void>;
    /**
     * / Store an object-storage key for the uploaded logo (preferred over raw path).
     */
    setLogoKey(key: string): Promise<void>;
    setLogoSize(size: bigint): Promise<void>;
    setShowAuraCollectionOnLandingPage(show: boolean): Promise<void>;
    setTextColor(color: string): Promise<void>;
    submitContactForm(name: string, email: string, message: string): Promise<void>;
    updateAboutSection(section: AboutSection): Promise<void>;
    updateApartmentGalleryImages(apartmentId: string, images: Array<string>): Promise<void>;
    updateApartmentsSection(section: ApartmentsSection): Promise<void>;
    updateArtistGalleryImages(artistId: string, images: Array<string>): Promise<void>;
    updateArtworkGalleryImages(artworkId: string, images: Array<string>): Promise<void>;
    updateAuraCollectionSection(section: AuraCollectionSection): Promise<void>;
    updateContactInfo(contactInfo: ContactInfo): Promise<void>;
    updateDraftApartment(apartment: Apartment): Promise<void>;
    updateDraftArtist(artist: Artist): Promise<void>;
    updateDraftArtwork(artwork: Artwork): Promise<void>;
    updateDraftCityGuideEntry(entry: CityGuideEntry): Promise<void>;
    updateDraftExclusiveService(service: ExclusiveService): Promise<void>;
    updateDraftMapMarker(marker: MapMarker): Promise<void>;
    updateDraftSiteConfig(config: SiteConfig): Promise<void>;
    updateDraftTestimonial(testimonial: Testimonial): Promise<void>;
    updateExperienceHighlight(highlight: Highlight): Promise<void>;
    updateExperiencePage(page: ExperiencePage): Promise<void>;
    updateExperienceSection(section: ExperienceSection): Promise<void>;
    updateFooterSection(section: FooterSection): Promise<void>;
    updateHeroSection(section: HeroSection): Promise<void>;
    updateImprintPage(content: string, textColor: string, backgroundColor: string): Promise<void>;
    updatePrivacyPolicyPage(content: string, textColor: string, backgroundColor: string): Promise<void>;
    updateSectionTexts(sectionTexts: SectionTexts): Promise<void>;
    updateTermsPage(content: string, textColor: string, backgroundColor: string): Promise<void>;
    uploadLogo(path: string, placeholderPath: string): Promise<void>;
}
