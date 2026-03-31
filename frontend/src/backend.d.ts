import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
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
export interface ContactSubmission {
    id: string;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface Highlight {
    id: string;
    title: string;
    icon: string;
    description: string;
    isActive: boolean;
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
export interface LegalPage {
    backgroundColor: string;
    title: string;
    content: string;
    lastUpdated: bigint;
    textColor: string;
}
export interface AuraCollectionSection {
    backgroundColor: string;
    title: string;
    contactInfo: ContactInfo;
    showOnLandingPage: boolean;
    layout: LayoutOption;
    description: string;
    sectionTexts: SectionTexts;
    featuredArtworks: Array<string>;
    backgroundImage: string;
    featuredArtists: Array<string>;
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
export interface AboutSection {
    backgroundColor: string;
    title: string;
    content: string;
    layout: LayoutOption;
    image: string;
    textColor: string;
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
export interface ApartmentsSection {
    backgroundColor: string;
    title: string;
    layout: LayoutOption;
    description: string;
    backgroundImage: string;
    textColor: string;
}
export interface FooterSection {
    backgroundColor: string;
    contactInfo: string;
    socialLinks: Array<string>;
    layout: LayoutOption;
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
export interface UserProfile {
    name: string;
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
    addExperienceHighlight(highlight: Highlight): Promise<void>;
    addExperienceSection(section: ExperienceSection): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteDraftApartment(id: string): Promise<void>;
    deleteDraftArtist(id: string): Promise<void>;
    deleteDraftArtwork(id: string): Promise<void>;
    deleteExperienceHighlight(id: string): Promise<void>;
    deleteExperienceSection(id: string): Promise<void>;
    deleteSectionImage(section: string): Promise<void>;
    dropFileReference(path: string): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDraftApartment(id: string): Promise<Apartment | null>;
    getDraftArtist(id: string): Promise<Artist | null>;
    getDraftArtwork(id: string): Promise<Artwork | null>;
    getDraftImprintPage(): Promise<LegalPage>;
    getDraftPrivacyPolicyPage(): Promise<LegalPage>;
    getDraftSiteConfig(): Promise<SiteConfig>;
    getDraftTermsPage(): Promise<LegalPage>;
    getFileReference(path: string): Promise<FileReference>;
    getLiveApartment(id: string): Promise<Apartment | null>;
    getLiveArtist(id: string): Promise<Artist | null>;
    getLiveArtwork(id: string): Promise<Artwork | null>;
    getLiveImprintPage(): Promise<LegalPage>;
    getLivePrivacyPolicyPage(): Promise<LegalPage>;
    getLiveSiteConfig(): Promise<SiteConfig>;
    getLiveTermsPage(): Promise<LegalPage>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    initializeAccessControl(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    listContactSubmissions(): Promise<Array<ContactSubmission>>;
    listDraftApartments(): Promise<Array<Apartment>>;
    listDraftArtists(): Promise<Array<Artist>>;
    listDraftArtworks(): Promise<Array<Artwork>>;
    listFileReferences(): Promise<Array<FileReference>>;
    listLiveApartments(): Promise<Array<Apartment>>;
    listLiveArtists(): Promise<Array<Artist>>;
    listLiveArtworks(): Promise<Array<Artwork>>;
    permanentlyDeleteApartment(id: string): Promise<void>;
    permanentlyDeleteArtist(id: string): Promise<void>;
    permanentlyDeleteArtwork(id: string): Promise<void>;
    publishChanges(): Promise<void>;
    registerFileReference(path: string, hash: string): Promise<void>;
    reorderExperienceSections(sectionIds: Array<string>): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setAccentColor(color: string): Promise<void>;
    setApartmentDetailPageBackgroundColor(color: string): Promise<void>;
    setApartmentsPageBackgroundColor(color: string): Promise<void>;
    setArtistDetailPageBackgroundColor(color: string): Promise<void>;
    setArtworkDetailPageBackgroundColor(color: string): Promise<void>;
    setAuraCollectionPageBackgroundColor(color: string): Promise<void>;
    setBookingUrl(url: string): Promise<void>;
    setDefaultAboutImage(path: string): Promise<void>;
    setDefaultApartmentsImage(path: string): Promise<void>;
    setDefaultCollectionImage(path: string): Promise<void>;
    setDefaultExperienceImage(path: string): Promise<void>;
    setDefaultHeroImage(path: string): Promise<void>;
    setFeaturedArtists(artistIds: Array<string>): Promise<void>;
    setFeaturedArtworks(artworkIds: Array<string>): Promise<void>;
    setHeaderTextColor(color: string): Promise<void>;
    setLandingPageBackgroundColor(color: string): Promise<void>;
    setLogoDisplayLocation(location: LogoDisplayLocation): Promise<void>;
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
    updateDraftSiteConfig(config: SiteConfig): Promise<void>;
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