import Map "mo:core/Map";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Time "mo:base/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";





actor AuraSuites {

  // ── Types ──────────────────────────────────────────────────────────────────

  type LogoDisplayLocation = { #header; #footer; #both };
  type LayoutOption = { #centered; #leftImage; #grid; #list; #gallery; #simple };
  type CardStyle = { #modern; #classic; #minimal };

  type Highlight = {
    id : Text;
    title : Text;
    icon : Text;
    description : Text;
    isActive : Bool;
  };

  type ExperienceSection = {
    id : Text;
    title : Text;
    description : Text;
    images : [Text];
    videos : [Text];
    isActive : Bool;
    order : Nat;
    animationType : Text;
    layout : LayoutOption;
  };

  type HeroSection = {
    title : Text;
    subtitle : Text;
    backgroundImage : Text;
    textColor : Text;
    backgroundColor : Text;
    layout : LayoutOption;
  };

  type AboutSection = {
    title : Text;
    content : Text;
    image : Text;
    textColor : Text;
    backgroundColor : Text;
    layout : LayoutOption;
  };

  type ExperiencePage = {
    title : Text;
    description : Text;
    backgroundImage : Text;
    cardStyle : CardStyle;
    textColor : Text;
    backgroundColor : Text;
    layout : LayoutOption;
    highlights : [Highlight];
    sections : [ExperienceSection];
  };

  type ApartmentsSection = {
    title : Text;
    description : Text;
    backgroundImage : Text;
    textColor : Text;
    backgroundColor : Text;
    layout : LayoutOption;
  };

  type SocialLink = { platform : Text; url : Text };

  type ContactInfo = {
    contactText : Text;
    email : Text;
    phone : Text;
    address : Text;
    socialLinks : [SocialLink];
  };

  type SectionTexts = { discoverText : Text; featuredText : Text };

  type AuraCollectionSection = {
    title : Text;
    description : Text;
    backgroundImage : Text;
    textColor : Text;
    backgroundColor : Text;
    layout : LayoutOption;
    featuredArtists : [Text];
    featuredArtworks : [Text];
    showOnLandingPage : Bool;
    contactInfo : ContactInfo;
    sectionTexts : SectionTexts;
    auraCollectionMainImageKey : ?Text;
  };

  type FooterSection = {
    contactInfo : Text;
    socialLinks : [Text];
    backgroundColor : Text;
    textColor : Text;
    layout : LayoutOption;
  };

  type SiteConfig = {
    contactEmail : Text;
    logoPath : Text;
    logoPlaceholderPath : Text;
    language : Text;
    logoDisplayLocation : LogoDisplayLocation;
    logoSize : Nat;
    bookingUrl : Text;
    textColor : Text;
    headerTextColor : Text;
    accentColor : Text;
    landingPageBackgroundColor : Text;
    apartmentsPageBackgroundColor : Text;
    auraCollectionPageBackgroundColor : Text;
    apartmentDetailPageBackgroundColor : Text;
    artistDetailPageBackgroundColor : Text;
    artworkDetailPageBackgroundColor : Text;
    heroSection : HeroSection;
    aboutSection : AboutSection;
    experiencePage : ExperiencePage;
    apartmentsSection : ApartmentsSection;
    auraCollectionSection : AuraCollectionSection;
    footerSection : FooterSection;
    defaultApartmentImage : Text;
    defaultArtistImage : Text;
    defaultArtworkImage : Text;
    defaultHeroImage : Text;
    defaultAboutImage : Text;
    defaultExperienceImage : Text;
    defaultApartmentsImage : Text;
    defaultCollectionImage : Text;
  };

  type LegalPage = {
    title : Text;
    content : Text;
    lastUpdated : Int;
    textColor : Text;
    backgroundColor : Text;
  };

  type LegalPages = {
    imprint : LegalPage;
    privacyPolicy : LegalPage;
    terms : LegalPage;
  };

  type Apartment = {
    id : Text;
    name : Text;
    description : Text;
    amenities : [Text];
    city : Text;
    address : Text;
    photos : [Text];
    isActive : Bool;
    bookingUrl : Text;
  };

  type Artist = {
    id : Text;
    name : Text;
    bio : Text;
    photo : Text;
    artworks : [Text];
    galleryImages : [Text];
  };

  type Artwork = {
    id : Text;
    title : Text;
    description : Text;
    artistId : Text;
    photo : Text;
    isForSale : Bool;
    price : ?Nat;
    galleryImages : [Text];
  };

  type ContactSubmission = {
    id : Text;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  type UserProfile = { name : Text };

  // New types
  type Testimonial = {
    id : Text;
    name : Text;
    stars : Nat;
    text : Text;
    date : Text;
    authorPhoto : ?Blob;
    visible : Bool;
    sortOrder : Nat;
  };

  type MapMarker = {
    id : Text;
    name : Text;
    category : Text;
    address : Text;
    description : Text;
    lat : Float;
    lng : Float;
    website : ?Text;
    imageKey : ?Text;
    visible : Bool;
    sortOrder : Nat;
  };

  type CityGuideEntry = {
    id : Text;
    category : Text;
    title : Text;
    description : Text;
    imageKey : ?Text;
    pdfKey : ?Text;
    externalLink : ?Text;
    visible : Bool;
    sortOrder : Nat;
  };

  type ExclusiveService = {
    id : Text;
    name : Text;
    description : Text;
    category : Text;
    priceInfo : ?Text;
    imageKey : ?Text;
    requestLink : ?Text;
    visible : Bool;
    sortOrder : Nat;
  };

  // ── Types ── (inline registry) ─────────────────────────────────────────────

  type FileReference = { path : Text; hash : Text };

  // ── State ──────────────────────────────────────────────────────────────────

  var fileReferences = Map.empty<Text, FileReference>();

  var draftApartments = Map.empty<Text, Apartment>();
  var liveApartments = Map.empty<Text, Apartment>();

  var draftArtists = Map.empty<Text, Artist>();
  var liveArtists = Map.empty<Text, Artist>();

  var draftArtworks = Map.empty<Text, Artwork>();
  var liveArtworks = Map.empty<Text, Artwork>();

  var contactSubmissions = Map.empty<Text, ContactSubmission>();

  var draftSiteConfig : SiteConfig = {
    contactEmail = "contact@aurasuites.info";
    logoPath = "generated/aura-suites-logo-transparent.png";
    logoPlaceholderPath = "generated/aura-suites-logo-placeholder.png";
    language = "en";
    logoDisplayLocation = #header;
    logoSize = 100;
    bookingUrl = "https://booking.com";
    textColor = "#000000";
    headerTextColor = "#000000";
    accentColor = "#FFD700";
    landingPageBackgroundColor = "#FFFFFF";
    apartmentsPageBackgroundColor = "#FFFFFF";
    auraCollectionPageBackgroundColor = "#FFFFFF";
    apartmentDetailPageBackgroundColor = "#FFFFFF";
    artistDetailPageBackgroundColor = "#FFFFFF";
    artworkDetailPageBackgroundColor = "#FFFFFF";
    heroSection = {
      title = "Welcome to Aura Suites";
      subtitle = "Luxury Apartments & Art Collection";
      backgroundImage = "generated/hero-bg.png";
      textColor = "#000000";
      backgroundColor = "#FFFFFF";
      layout = #centered;
    };
    aboutSection = {
      title = "About Aura Suites";
      content = "Experience luxury living and exquisite art in the heart of the city.";
      image = "generated/about-image.png";
      textColor = "#000000";
      backgroundColor = "#FFFFFF";
      layout = #leftImage;
    };
    experiencePage = {
      title = "Experience Aura";
      description = "Discover our luxury apartments and curated art collection.";
      backgroundImage = "generated/experience-bg.png";
      cardStyle = #modern;
      textColor = "#000000";
      backgroundColor = "#FFFFFF";
      layout = #grid;
      highlights = [];
      sections = [];
    };
    apartmentsSection = {
      title = "Luxury Apartments";
      description = "Find your perfect stay in our premium apartments.";
      backgroundImage = "generated/apartments-bg.png";
      textColor = "#000000";
      backgroundColor = "#FFFFFF";
      layout = #list;
    };
    auraCollectionSection = {
      title = "Aura Collection";
      description = "Explore our curated collection of contemporary art.";
      backgroundImage = "generated/collection-bg.png";
      textColor = "#000000";
      backgroundColor = "#FFFFFF";
      layout = #gallery;
      featuredArtists = [];
      featuredArtworks = [];
      showOnLandingPage = true;
      contactInfo = {
        contactText = "Contact us for more information about our art collection and luxury apartments.";
        email = "contact@aurasuites.info";
        phone = "+54 11 1234 5678";
        address = "Palermo Hollywood, Buenos Aires, Argentina";
        socialLinks = [
          { platform = "Instagram"; url = "https://instagram.com/aurasuites" },
          { platform = "Facebook"; url = "https://facebook.com/aurasuites" },
        ];
      };
      sectionTexts = {
          discoverText = "Discover curated artworks by local artists – available online or on-site.";
          featuredText = "Featured: Modern art inspired by Palermo Hollywood and Latin American culture.";
        };
        auraCollectionMainImageKey = null;
      };
    footerSection = {
      contactInfo = "Contact us at contact@aurasuites.info";
      socialLinks = ["https://instagram.com/aurasuites", "https://facebook.com/aurasuites"];
      backgroundColor = "#000000";
      textColor = "#FFFFFF";
      layout = #simple;
    };
    defaultApartmentImage = "generated/default-apartment.png";
    defaultArtistImage = "generated/default-artist.png";
    defaultArtworkImage = "generated/default-artwork.png";
    defaultHeroImage = "generated/hero-bg.png";
    defaultAboutImage = "generated/about-image.png";
    defaultExperienceImage = "generated/experience-bg.png";
    defaultApartmentsImage = "generated/apartments-bg.png";
    defaultCollectionImage = "generated/collection-bg.png";
  };

  var liveSiteConfig : SiteConfig = draftSiteConfig;

  var draftLegalPages : LegalPages = {
    imprint = {
      title = "Imprint";
      content = "Company Name: Aura Suites\nAddress: Palermo Hollywood, Buenos Aires, Argentina\nContact: contact@aurasuites.info\nLegal Registration: Registered in Argentina";
      lastUpdated = Time.now();
      textColor = "#000000";
      backgroundColor = "#FFFFFF";
    };
    privacyPolicy = {
      title = "Privacy Policy";
      content = "We respect your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and store your information.";
      lastUpdated = Time.now();
      textColor = "#000000";
      backgroundColor = "#FFFFFF";
    };
    terms = {
      title = "Terms & Conditions";
      content = "By using our services, you agree to our terms and conditions. Please read them carefully before making a booking.";
      lastUpdated = Time.now();
      textColor = "#000000";
      backgroundColor = "#FFFFFF";
    };
  };

  var liveLegalPages : LegalPages = draftLegalPages;

  var accessControlState = AccessControl.initState();
  var userProfiles = Map.empty<Principal, UserProfile>();

  // New collections
  var draftTestimonials = Map.empty<Text, Testimonial>();
  var liveTestimonials = Map.empty<Text, Testimonial>();

  var draftMapMarkers = Map.empty<Text, MapMarker>();
  var liveMapMarkers = Map.empty<Text, MapMarker>();

  var draftCityGuideEntries = Map.empty<Text, CityGuideEntry>();
  var liveCityGuideEntries = Map.empty<Text, CityGuideEntry>();

  var draftExclusiveServices = Map.empty<Text, ExclusiveService>();
  var liveExclusiveServices = Map.empty<Text, ExclusiveService>();

  var nextTestimonialId : Nat = 1;
  var nextMapMarkerId : Nat = 1;
  var nextCityGuideEntryId : Nat = 1;
  var nextExclusiveServiceId : Nat = 1;

  // ── Helper ─────────────────────────────────────────────────────────────────

  func requireAdmin(caller : Principal) {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
  };

  func mapToArray<V>(m : Map.Map<Text, V>) : [V] {
    m.values().toArray();
  };

  // ── Access Control ─────────────────────────────────────────────────────────

  include MixinAuthorization(accessControlState);

  /// Safe variant of isCallerAdmin that returns false instead of trapping for
  /// unregistered callers (callers who have not yet called _initializeAccessControl).
  public query ({ caller }) func isCallerAdminSafe() : async Bool {
    if (caller.isAnonymous()) { return false };
    switch (accessControlState.userRoles.get(caller)) {
      case (?(#admin)) { true };
      case (_) { false };
    };
  };

  /// Returns true if no active admin principal exists in the access control state.
  /// Used by the frontend to decide whether to show the "Claim Admin" button.
  public query func hasNoAdmin() : async Bool {
    let hasActiveAdmin = accessControlState.userRoles.entries().find(
      func((_, role) : (Principal, AccessControl.UserRole)) : Bool { role == #admin }
    ) != null;
    not hasActiveAdmin;
  };

  /// Allows a caller to reclaim admin when adminAssigned=true but no active admin
  /// exists in userRoles (e.g. after a canister upgrade that reset state).
  /// If the caller already has a #user role (assigned on a previous attempt),
  /// their role is cleared first so initialize() can promote them to #admin.
  public shared ({ caller }) func _reinitializeAccessControl() : async () {
    if (caller.isAnonymous()) { return };
    // Only proceed if there is no active admin.
    let hasActiveAdmin = accessControlState.userRoles.entries().find(
      func((_, role) : (Principal, AccessControl.UserRole)) : Bool { role == #admin }
    ) != null;
    if (hasActiveAdmin) { return };
    // Clear any existing role for this caller so initialize() can re-evaluate.
    accessControlState.userRoles.remove(caller);
    // Reset the flag so initialize() takes the "first caller → admin" branch.
    accessControlState.adminAssigned := false;
    AccessControl.initialize(accessControlState, caller);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // ── Apartments ─────────────────────────────────────────────────────────────

  public shared ({ caller }) func addDraftApartment(apartment : Apartment) : async () {
    requireAdmin(caller);
    draftApartments.add(apartment.id, apartment);
  };

  public shared ({ caller }) func updateDraftApartment(apartment : Apartment) : async () {
    requireAdmin(caller);
    draftApartments.add(apartment.id, apartment);
  };

  public shared ({ caller }) func deleteDraftApartment(id : Text) : async () {
    requireAdmin(caller);
    draftApartments.remove(id);
  };

  public shared ({ caller }) func permanentlyDeleteApartment(id : Text) : async () {
    requireAdmin(caller);
    draftApartments.remove(id);
    liveApartments.remove(id);
  };

  public query func getLiveApartment(id : Text) : async ?Apartment {
    liveApartments.get(id);
  };

  public query func listLiveApartments() : async [Apartment] {
    mapToArray(liveApartments);
  };

  public query ({ caller }) func getDraftApartment(id : Text) : async ?Apartment {
    requireAdmin(caller);
    draftApartments.get(id);
  };

  public query ({ caller }) func listDraftApartments() : async [Apartment] {
    requireAdmin(caller);
    mapToArray(draftApartments);
  };

  public shared ({ caller }) func updateApartmentGalleryImages(apartmentId : Text, images : [Text]) : async () {
    requireAdmin(caller);
    switch (draftApartments.get(apartmentId)) {
      case (null) { Runtime.trap("Apartment not found") };
      case (?apartment) {
        draftApartments.add(apartmentId, { apartment with photos = images });
      };
    };
  };

  // ── Artists ────────────────────────────────────────────────────────────────

  public shared ({ caller }) func addDraftArtist(artist : Artist) : async () {
    requireAdmin(caller);
    draftArtists.add(artist.id, artist);
  };

  public shared ({ caller }) func updateDraftArtist(artist : Artist) : async () {
    requireAdmin(caller);
    draftArtists.add(artist.id, artist);
  };

  public shared ({ caller }) func deleteDraftArtist(id : Text) : async () {
    requireAdmin(caller);
    draftArtists.remove(id);
    liveArtists.remove(id);
  };

  public shared ({ caller }) func permanentlyDeleteArtist(id : Text) : async () {
    requireAdmin(caller);
    draftArtists.remove(id);
    liveArtists.remove(id);
  };

  public query func getLiveArtist(id : Text) : async ?Artist {
    liveArtists.get(id);
  };

  public query func listLiveArtists() : async [Artist] {
    mapToArray(liveArtists);
  };

  public query ({ caller }) func getDraftArtist(id : Text) : async ?Artist {
    requireAdmin(caller);
    draftArtists.get(id);
  };

  public query ({ caller }) func listDraftArtists() : async [Artist] {
    requireAdmin(caller);
    mapToArray(draftArtists);
  };

  public shared ({ caller }) func updateArtistGalleryImages(artistId : Text, images : [Text]) : async () {
    requireAdmin(caller);
    switch (draftArtists.get(artistId)) {
      case (null) { Runtime.trap("Artist not found") };
      case (?artist) {
        draftArtists.add(artistId, { artist with galleryImages = images });
      };
    };
  };

  // ── Artworks ───────────────────────────────────────────────────────────────

  public shared ({ caller }) func addDraftArtwork(artwork : Artwork) : async () {
    requireAdmin(caller);
    draftArtworks.add(artwork.id, artwork);
  };

  public shared ({ caller }) func updateDraftArtwork(artwork : Artwork) : async () {
    requireAdmin(caller);
    draftArtworks.add(artwork.id, artwork);
  };

  public shared ({ caller }) func deleteDraftArtwork(id : Text) : async () {
    requireAdmin(caller);
    draftArtworks.remove(id);
    liveArtworks.remove(id);
  };

  public shared ({ caller }) func permanentlyDeleteArtwork(id : Text) : async () {
    requireAdmin(caller);
    draftArtworks.remove(id);
    liveArtworks.remove(id);
  };

  public query func getLiveArtwork(id : Text) : async ?Artwork {
    liveArtworks.get(id);
  };

  public query func listLiveArtworks() : async [Artwork] {
    mapToArray(liveArtworks);
  };

  public query ({ caller }) func getDraftArtwork(id : Text) : async ?Artwork {
    requireAdmin(caller);
    draftArtworks.get(id);
  };

  public query ({ caller }) func listDraftArtworks() : async [Artwork] {
    requireAdmin(caller);
    mapToArray(draftArtworks);
  };

  public shared ({ caller }) func updateArtworkGalleryImages(artworkId : Text, images : [Text]) : async () {
    requireAdmin(caller);
    switch (draftArtworks.get(artworkId)) {
      case (null) { Runtime.trap("Artwork not found") };
      case (?artwork) {
        draftArtworks.add(artworkId, { artwork with galleryImages = images });
      };
    };
  };

  // ── Site Config ────────────────────────────────────────────────────────────

  public shared ({ caller }) func updateDraftSiteConfig(config : SiteConfig) : async () {
    requireAdmin(caller);
    draftSiteConfig := config;
  };

  public query func getLiveSiteConfig() : async SiteConfig {
    liveSiteConfig;
  };

  public query ({ caller }) func getDraftSiteConfig() : async SiteConfig {
    requireAdmin(caller);
    draftSiteConfig;
  };

  public shared ({ caller }) func uploadLogo(path : Text, placeholderPath : Text) : async () {
    requireAdmin(caller);
    draftSiteConfig := { draftSiteConfig with logoPath = path; logoPlaceholderPath = placeholderPath };
  };

  public shared ({ caller }) func setLogoDisplayLocation(location : LogoDisplayLocation) : async () {
    requireAdmin(caller);
    draftSiteConfig := { draftSiteConfig with logoDisplayLocation = location };
  };

  public shared ({ caller }) func setLogoSize(size : Nat) : async () {
    requireAdmin(caller);
    draftSiteConfig := { draftSiteConfig with logoSize = size };
  };

  public shared ({ caller }) func setBookingUrl(url : Text) : async () {
    requireAdmin(caller);
    draftSiteConfig := { draftSiteConfig with bookingUrl = url };
  };

  public shared ({ caller }) func setTextColor(color : Text) : async () {
    requireAdmin(caller);
    draftSiteConfig := { draftSiteConfig with textColor = color };
  };

  public shared ({ caller }) func setHeaderTextColor(color : Text) : async () {
    requireAdmin(caller);
    draftSiteConfig := { draftSiteConfig with headerTextColor = color };
  };

  public shared ({ caller }) func setAccentColor(color : Text) : async () {
    requireAdmin(caller);
    draftSiteConfig := { draftSiteConfig with accentColor = color };
  };

  public shared ({ caller }) func setLandingPageBackgroundColor(color : Text) : async () {
    requireAdmin(caller);
    draftSiteConfig := { draftSiteConfig with landingPageBackgroundColor = color };
  };

  public shared ({ caller }) func setApartmentsPageBackgroundColor(color : Text) : async () {
    requireAdmin(caller);
    draftSiteConfig := { draftSiteConfig with apartmentsPageBackgroundColor = color };
  };

  public shared ({ caller }) func setAuraCollectionPageBackgroundColor(color : Text) : async () {
    requireAdmin(caller);
    draftSiteConfig := { draftSiteConfig with auraCollectionPageBackgroundColor = color };
  };

  public shared ({ caller }) func setApartmentDetailPageBackgroundColor(color : Text) : async () {
    requireAdmin(caller);
    draftSiteConfig := { draftSiteConfig with apartmentDetailPageBackgroundColor = color };
  };

  public shared ({ caller }) func setArtistDetailPageBackgroundColor(color : Text) : async () {
    requireAdmin(caller);
    draftSiteConfig := { draftSiteConfig with artistDetailPageBackgroundColor = color };
  };

  public shared ({ caller }) func setArtworkDetailPageBackgroundColor(color : Text) : async () {
    requireAdmin(caller);
    draftSiteConfig := { draftSiteConfig with artworkDetailPageBackgroundColor = color };
  };

  // ── Section Customization ──────────────────────────────────────────────────

  public shared ({ caller }) func updateHeroSection(section : HeroSection) : async () {
    requireAdmin(caller);
    draftSiteConfig := { draftSiteConfig with heroSection = section };
  };

  public shared ({ caller }) func updateAboutSection(section : AboutSection) : async () {
    requireAdmin(caller);
    draftSiteConfig := { draftSiteConfig with aboutSection = section };
  };

  public shared ({ caller }) func updateExperiencePage(page : ExperiencePage) : async () {
    requireAdmin(caller);
    draftSiteConfig := { draftSiteConfig with experiencePage = page };
  };

  public shared ({ caller }) func updateApartmentsSection(section : ApartmentsSection) : async () {
    requireAdmin(caller);
    draftSiteConfig := { draftSiteConfig with apartmentsSection = section };
  };

  public shared ({ caller }) func updateAuraCollectionSection(section : AuraCollectionSection) : async () {
    requireAdmin(caller);
    draftSiteConfig := { draftSiteConfig with auraCollectionSection = section };
  };

  public shared ({ caller }) func updateFooterSection(section : FooterSection) : async () {
    requireAdmin(caller);
    draftSiteConfig := { draftSiteConfig with footerSection = section };
  };

  public shared ({ caller }) func setFeaturedArtists(artistIds : [Text]) : async () {
    requireAdmin(caller);
    draftSiteConfig := {
      draftSiteConfig with auraCollectionSection = {
        draftSiteConfig.auraCollectionSection with featuredArtists = artistIds;
      };
    };
  };

  public shared ({ caller }) func setFeaturedArtworks(artworkIds : [Text]) : async () {
    requireAdmin(caller);
    draftSiteConfig := {
      draftSiteConfig with auraCollectionSection = {
        draftSiteConfig.auraCollectionSection with featuredArtworks = artworkIds;
      };
    };
  };

  public shared ({ caller }) func setShowAuraCollectionOnLandingPage(show : Bool) : async () {
    requireAdmin(caller);
    draftSiteConfig := {
      draftSiteConfig with auraCollectionSection = {
        draftSiteConfig.auraCollectionSection with showOnLandingPage = show;
      };
    };
  };

  public shared ({ caller }) func updateContactInfo(contactInfo : ContactInfo) : async () {
    requireAdmin(caller);
    draftSiteConfig := {
      draftSiteConfig with auraCollectionSection = {
        draftSiteConfig.auraCollectionSection with contactInfo = contactInfo;
      };
    };
  };

  public shared ({ caller }) func updateSectionTexts(sectionTexts : SectionTexts) : async () {
    requireAdmin(caller);
    draftSiteConfig := {
      draftSiteConfig with auraCollectionSection = {
        draftSiteConfig.auraCollectionSection with sectionTexts = sectionTexts;
      };
    };
  };

  // ── Experience Highlights & Sections ──────────────────────────────────────

  public shared ({ caller }) func addExperienceHighlight(highlight : Highlight) : async () {
    requireAdmin(caller);
    let current = draftSiteConfig.experiencePage.highlights;
    draftSiteConfig := {
      draftSiteConfig with experiencePage = {
        draftSiteConfig.experiencePage with highlights = current.concat([highlight]);
      };
    };
  };

  public shared ({ caller }) func updateExperienceHighlight(highlight : Highlight) : async () {
    requireAdmin(caller);
    let updated = draftSiteConfig.experiencePage.highlights.map(
      func(h) { if (h.id == highlight.id) { highlight } else { h } }
    );
    draftSiteConfig := {
      draftSiteConfig with experiencePage = {
        draftSiteConfig.experiencePage with highlights = updated;
      };
    };
  };

  public shared ({ caller }) func deleteExperienceHighlight(id : Text) : async () {
    requireAdmin(caller);
    let filtered = draftSiteConfig.experiencePage.highlights.filter(
      func(h) { h.id != id }
    );
    draftSiteConfig := {
      draftSiteConfig with experiencePage = {
        draftSiteConfig.experiencePage with highlights = filtered;
      };
    };
  };

  public shared ({ caller }) func addExperienceSection(section : ExperienceSection) : async () {
    requireAdmin(caller);
    let current = draftSiteConfig.experiencePage.sections;
    draftSiteConfig := {
      draftSiteConfig with experiencePage = {
        draftSiteConfig.experiencePage with sections = current.concat([section]);
      };
    };
  };

  public shared ({ caller }) func updateExperienceSection(section : ExperienceSection) : async () {
    requireAdmin(caller);
    let updated = draftSiteConfig.experiencePage.sections.map(
      func(s) { if (s.id == section.id) { section } else { s } }
    );
    draftSiteConfig := {
      draftSiteConfig with experiencePage = {
        draftSiteConfig.experiencePage with sections = updated;
      };
    };
  };

  public shared ({ caller }) func deleteExperienceSection(id : Text) : async () {
    requireAdmin(caller);
    let filtered = draftSiteConfig.experiencePage.sections.filter(
      func(s) { s.id != id }
    );
    draftSiteConfig := {
      draftSiteConfig with experiencePage = {
        draftSiteConfig.experiencePage with sections = filtered;
      };
    };
  };

  public shared ({ caller }) func reorderExperienceSections(sectionIds : [Text]) : async () {
    requireAdmin(caller);
    let current = draftSiteConfig.experiencePage.sections;
    let reordered = sectionIds.map(func(id) {
      switch (current.find(func(s) { s.id == id })) {
        case (?section) { section };
        case (null) { Runtime.trap("Section not found") };
      };
    });
    draftSiteConfig := {
      draftSiteConfig with experiencePage = {
        draftSiteConfig.experiencePage with sections = reordered;
      };
    };
  };

  // ── Media Management ───────────────────────────────────────────────────────

  public shared ({ caller }) func setDefaultHeroImage(path : Text) : async () {
    requireAdmin(caller);
    draftSiteConfig := { draftSiteConfig with defaultHeroImage = path };
  };

  public shared ({ caller }) func setDefaultAboutImage(path : Text) : async () {
    requireAdmin(caller);
    draftSiteConfig := { draftSiteConfig with defaultAboutImage = path };
  };

  public shared ({ caller }) func setDefaultExperienceImage(path : Text) : async () {
    requireAdmin(caller);
    draftSiteConfig := { draftSiteConfig with defaultExperienceImage = path };
  };

  public shared ({ caller }) func setDefaultApartmentsImage(path : Text) : async () {
    requireAdmin(caller);
    draftSiteConfig := { draftSiteConfig with defaultApartmentsImage = path };
  };

  public shared ({ caller }) func setDefaultCollectionImage(path : Text) : async () {
    requireAdmin(caller);
    draftSiteConfig := { draftSiteConfig with defaultCollectionImage = path };
  };

  /// Set or clear the object-storage key for the Aura Collection main landing image.
  public shared ({ caller }) func setAuraCollectionLandingImageKey(key : ?Text) : async () {
    requireAdmin(caller);
    draftSiteConfig := {
      draftSiteConfig with auraCollectionSection = {
        draftSiteConfig.auraCollectionSection with auraCollectionMainImageKey = key;
      };
    };
  };

  /// Store an object-storage key for the uploaded logo (preferred over raw path).
  public shared ({ caller }) func setLogoKey(key : Text) : async () {
    requireAdmin(caller);
    draftSiteConfig := { draftSiteConfig with logoPath = key };
  };

  public shared ({ caller }) func deleteSectionImage(section : Text) : async () {
    requireAdmin(caller);
    switch (section) {
      case ("hero") {
        draftSiteConfig := {
          draftSiteConfig with heroSection = {
            draftSiteConfig.heroSection with backgroundImage = draftSiteConfig.defaultHeroImage;
          };
        };
      };
      case ("about") {
        draftSiteConfig := {
          draftSiteConfig with aboutSection = {
            draftSiteConfig.aboutSection with image = draftSiteConfig.defaultAboutImage;
          };
        };
      };
      case ("experience") {
        draftSiteConfig := {
          draftSiteConfig with experiencePage = {
            draftSiteConfig.experiencePage with backgroundImage = draftSiteConfig.defaultExperienceImage;
          };
        };
      };
      case ("apartments") {
        draftSiteConfig := {
          draftSiteConfig with apartmentsSection = {
            draftSiteConfig.apartmentsSection with backgroundImage = draftSiteConfig.defaultApartmentsImage;
          };
        };
      };
      case ("collection") {
        draftSiteConfig := {
          draftSiteConfig with auraCollectionSection = {
            draftSiteConfig.auraCollectionSection with backgroundImage = draftSiteConfig.defaultCollectionImage;
          };
        };
      };
      case (_) { Runtime.trap("Invalid section") };
    };
  };

  // ── Legal Pages ────────────────────────────────────────────────────────────

  public shared ({ caller }) func updateImprintPage(content : Text, textColor : Text, backgroundColor : Text) : async () {
    requireAdmin(caller);
    draftLegalPages := {
      draftLegalPages with imprint = {
        title = "Imprint";
        content;
        lastUpdated = Time.now();
        textColor;
        backgroundColor;
      };
    };
  };

  public shared ({ caller }) func updatePrivacyPolicyPage(content : Text, textColor : Text, backgroundColor : Text) : async () {
    requireAdmin(caller);
    draftLegalPages := {
      draftLegalPages with privacyPolicy = {
        title = "Privacy Policy";
        content;
        lastUpdated = Time.now();
        textColor;
        backgroundColor;
      };
    };
  };

  public shared ({ caller }) func updateTermsPage(content : Text, textColor : Text, backgroundColor : Text) : async () {
    requireAdmin(caller);
    draftLegalPages := {
      draftLegalPages with terms = {
        title = "Terms & Conditions";
        content;
        lastUpdated = Time.now();
        textColor;
        backgroundColor;
      };
    };
  };

  public query func getLiveImprintPage() : async LegalPage { liveLegalPages.imprint };
  public query func getLivePrivacyPolicyPage() : async LegalPage { liveLegalPages.privacyPolicy };
  public query func getLiveTermsPage() : async LegalPage { liveLegalPages.terms };

  public query ({ caller }) func getDraftImprintPage() : async LegalPage {
    requireAdmin(caller);
    draftLegalPages.imprint;
  };

  public query ({ caller }) func getDraftPrivacyPolicyPage() : async LegalPage {
    requireAdmin(caller);
    draftLegalPages.privacyPolicy;
  };

  public query ({ caller }) func getDraftTermsPage() : async LegalPage {
    requireAdmin(caller);
    draftLegalPages.terms;
  };

  // ── Contact Form ───────────────────────────────────────────────────────────

  public shared func submitContactForm(name : Text, email : Text, message : Text) : async () {
    let id = email.concat(Time.now().toText());
    let submission : ContactSubmission = { id; name; email; message; timestamp = Time.now() };
    contactSubmissions.add(id, submission);
  };

  public query ({ caller }) func listContactSubmissions() : async [ContactSubmission] {
    requireAdmin(caller);
    mapToArray(contactSubmissions);
  };

  // ── File Management ────────────────────────────────────────────────────────

  public shared ({ caller }) func registerFileReference(path : Text, hash : Text) : async () {
    requireAdmin(caller);
    if (path == ".well-known/ic-domains") {
      Runtime.trap("Cannot modify .well-known/ic-domains file");
    };
    fileReferences.add(path, { path; hash });
  };

  public query ({ caller }) func getFileReference(path : Text) : async ?FileReference {
    requireAdmin(caller);
    fileReferences.get(path);
  };

  public query ({ caller }) func listFileReferences() : async [FileReference] {
    requireAdmin(caller);
    fileReferences.values().toArray();
  };

  public shared ({ caller }) func dropFileReference(path : Text) : async () {
    requireAdmin(caller);
    if (path == ".well-known/ic-domains") {
      Runtime.trap("Cannot delete .well-known/ic-domains file");
    };
    fileReferences.remove(path);
  };

  // ── Testimonials ───────────────────────────────────────────────────────────

  public shared ({ caller }) func addDraftTestimonial(testimonial : Testimonial) : async () {
    requireAdmin(caller);
    let id = "t" # nextTestimonialId.toText();
    nextTestimonialId += 1;
    draftTestimonials.add(id, { testimonial with id });
  };

  public shared ({ caller }) func updateDraftTestimonial(testimonial : Testimonial) : async () {
    requireAdmin(caller);
    draftTestimonials.add(testimonial.id, testimonial);
  };

  public shared ({ caller }) func deleteDraftTestimonial(id : Text) : async () {
    requireAdmin(caller);
    draftTestimonials.remove(id);
  };

  public shared ({ caller }) func reorderTestimonials(orderedIds : [Text]) : async () {
    requireAdmin(caller);
    for ((i, id) in orderedIds.enumerate()) {
      switch (draftTestimonials.get(id)) {
        case (?t) { draftTestimonials.add(id, { t with sortOrder = i }) };
        case (null) {};
      };
    };
  };

  public query ({ caller }) func listDraftTestimonials() : async [Testimonial] {
    requireAdmin(caller);
    mapToArray(draftTestimonials);
  };

  public query func listLiveTestimonials() : async [Testimonial] {
    mapToArray(liveTestimonials);
  };

  // ── Map Markers ────────────────────────────────────────────────────────────

  public shared ({ caller }) func addDraftMapMarker(marker : MapMarker) : async () {
    requireAdmin(caller);
    let id = "m" # nextMapMarkerId.toText();
    nextMapMarkerId += 1;
    draftMapMarkers.add(id, { marker with id });
  };

  public shared ({ caller }) func updateDraftMapMarker(marker : MapMarker) : async () {
    requireAdmin(caller);
    draftMapMarkers.add(marker.id, marker);
  };

  public shared ({ caller }) func deleteDraftMapMarker(id : Text) : async () {
    requireAdmin(caller);
    draftMapMarkers.remove(id);
  };

  public shared ({ caller }) func reorderMapMarkers(orderedIds : [Text]) : async () {
    requireAdmin(caller);
    for ((i, id) in orderedIds.enumerate()) {
      switch (draftMapMarkers.get(id)) {
        case (?m) { draftMapMarkers.add(id, { m with sortOrder = i }) };
        case (null) {};
      };
    };
  };

  /// Set or clear the image object-storage key on a draft map marker.
  public shared ({ caller }) func setDraftMapMarkerImageKey(id : Text, imageKey : ?Text) : async () {
    requireAdmin(caller);
    switch (draftMapMarkers.get(id)) {
      case (null) { Runtime.trap("MapMarker not found: " # id) };
      case (?marker) {
        draftMapMarkers.add(id, { marker with imageKey });
      };
    };
  };

  public query ({ caller }) func getDraftMapMarker(id : Text) : async ?MapMarker {
    requireAdmin(caller);
    draftMapMarkers.get(id);
  };

  public query ({ caller }) func listDraftMapMarkers() : async [MapMarker] {
    requireAdmin(caller);
    mapToArray(draftMapMarkers);
  };

  public query func getLiveMapMarker(id : Text) : async ?MapMarker {
    liveMapMarkers.get(id);
  };

  public query func listLiveMapMarkers() : async [MapMarker] {
    mapToArray(liveMapMarkers);
  };

  // ── City Guide Entries ─────────────────────────────────────────────────────

  public shared ({ caller }) func addDraftCityGuideEntry(entry : CityGuideEntry) : async () {
    requireAdmin(caller);
    let id = "cg" # nextCityGuideEntryId.toText();
    nextCityGuideEntryId += 1;
    draftCityGuideEntries.add(id, { entry with id });
  };

  public shared ({ caller }) func updateDraftCityGuideEntry(entry : CityGuideEntry) : async () {
    requireAdmin(caller);
    draftCityGuideEntries.add(entry.id, entry);
  };

  public shared ({ caller }) func deleteDraftCityGuideEntry(id : Text) : async () {
    requireAdmin(caller);
    draftCityGuideEntries.remove(id);
  };

  public shared ({ caller }) func reorderCityGuideEntries(orderedIds : [Text]) : async () {
    requireAdmin(caller);
    for ((i, id) in orderedIds.enumerate()) {
      switch (draftCityGuideEntries.get(id)) {
        case (?e) { draftCityGuideEntries.add(id, { e with sortOrder = i }) };
        case (null) {};
      };
    };
  };

  /// Set or clear the PDF object-storage key on a draft city guide entry.
  public shared ({ caller }) func setDraftCityGuidePdfKey(id : Text, pdfKey : ?Text) : async () {
    requireAdmin(caller);
    switch (draftCityGuideEntries.get(id)) {
      case (null) { Runtime.trap("CityGuideEntry not found: " # id) };
      case (?entry) {
        draftCityGuideEntries.add(id, { entry with pdfKey });
      };
    };
  };

  /// Set or clear the image object-storage key on a draft city guide entry.
  public shared ({ caller }) func setDraftCityGuideImageKey(id : Text, imageKey : ?Text) : async () {
    requireAdmin(caller);
    switch (draftCityGuideEntries.get(id)) {
      case (null) { Runtime.trap("CityGuideEntry not found: " # id) };
      case (?entry) {
        draftCityGuideEntries.add(id, { entry with imageKey });
      };
    };
  };

  public query ({ caller }) func getDraftCityGuideEntry(id : Text) : async ?CityGuideEntry {
    requireAdmin(caller);
    draftCityGuideEntries.get(id);
  };

  public query ({ caller }) func listDraftCityGuideEntries() : async [CityGuideEntry] {
    requireAdmin(caller);
    mapToArray(draftCityGuideEntries);
  };

  public query func getLiveCityGuideEntry(id : Text) : async ?CityGuideEntry {
    liveCityGuideEntries.get(id);
  };

  public query func listLiveCityGuideEntries() : async [CityGuideEntry] {
    mapToArray(liveCityGuideEntries);
  };

  // ── Exclusive Services ─────────────────────────────────────────────────────

  public shared ({ caller }) func addDraftExclusiveService(service : ExclusiveService) : async () {
    requireAdmin(caller);
    let id = "es" # nextExclusiveServiceId.toText();
    nextExclusiveServiceId += 1;
    draftExclusiveServices.add(id, { service with id });
  };

  public shared ({ caller }) func updateDraftExclusiveService(service : ExclusiveService) : async () {
    requireAdmin(caller);
    draftExclusiveServices.add(service.id, service);
  };

  public shared ({ caller }) func deleteDraftExclusiveService(id : Text) : async () {
    requireAdmin(caller);
    draftExclusiveServices.remove(id);
  };

  public shared ({ caller }) func reorderExclusiveServices(orderedIds : [Text]) : async () {
    requireAdmin(caller);
    for ((i, id) in orderedIds.enumerate()) {
      switch (draftExclusiveServices.get(id)) {
        case (?s) { draftExclusiveServices.add(id, { s with sortOrder = i }) };
        case (null) {};
      };
    };
  };

  /// Set or clear the image object-storage key on a draft exclusive service.
  public shared ({ caller }) func setDraftExclusiveServiceImageKey(id : Text, imageKey : ?Text) : async () {
    requireAdmin(caller);
    switch (draftExclusiveServices.get(id)) {
      case (null) { Runtime.trap("ExclusiveService not found: " # id) };
      case (?svc) {
        draftExclusiveServices.add(id, { svc with imageKey });
      };
    };
  };

  public query ({ caller }) func getDraftExclusiveService(id : Text) : async ?ExclusiveService {
    requireAdmin(caller);
    draftExclusiveServices.get(id);
  };

  public query ({ caller }) func listDraftExclusiveServices() : async [ExclusiveService] {
    requireAdmin(caller);
    mapToArray(draftExclusiveServices);
  };

  public query func getLiveExclusiveService(id : Text) : async ?ExclusiveService {
    liveExclusiveServices.get(id);
  };

  public query func listLiveExclusiveServices() : async [ExclusiveService] {
    mapToArray(liveExclusiveServices);
  };

  // ── Publish Changes ────────────────────────────────────────────────────────

  public shared ({ caller }) func publishChanges() : async () {
    requireAdmin(caller);
    liveApartments := draftApartments;
    liveArtists := draftArtists;
    liveArtworks := draftArtworks;
    liveSiteConfig := draftSiteConfig;
    liveLegalPages := draftLegalPages;
    liveTestimonials := draftTestimonials;
    liveMapMarkers := draftMapMarkers;
    liveCityGuideEntries := draftCityGuideEntries;
    liveExclusiveServices := draftExclusiveServices;
  };

  // ── Blob Storage ───────────────────────────────────────────────────────────

  include MixinObjectStorage();
};
