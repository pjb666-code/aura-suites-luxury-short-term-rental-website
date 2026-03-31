import OrderedMap "mo:base/OrderedMap";
import BlobStorage "blob-storage/Mixin";
import Text "mo:base/Text";
import List "mo:base/List";
import Time "mo:base/Time";
import Registry "blob-storage/registry";
import Int "mo:base/Int";
import AccessControl "authorization/access-control";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Array "mo:base/Array";

actor AuraSuites {
  let registry = Registry.new();

  transient let textMap = OrderedMap.Make<Text>(Text.compare);
  transient let principalMap = OrderedMap.Make<Principal>(Principal.compare);

  var draftApartments : OrderedMap.Map<Text, Apartment> = textMap.empty();
  var liveApartments : OrderedMap.Map<Text, Apartment> = textMap.empty();

  var draftArtists : OrderedMap.Map<Text, Artist> = textMap.empty();
  var liveArtists : OrderedMap.Map<Text, Artist> = textMap.empty();

  var draftArtworks : OrderedMap.Map<Text, Artwork> = textMap.empty();
  var liveArtworks : OrderedMap.Map<Text, Artwork> = textMap.empty();

  var contactSubmissions : OrderedMap.Map<Text, ContactSubmission> = textMap.empty();

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
          {
            platform = "Instagram";
            url = "https://instagram.com/aurasuites";
          },
          {
            platform = "Facebook";
            url = "https://facebook.com/aurasuites";
          },
        ];
      };
      sectionTexts = {
        discoverText = "Discover curated artworks by local artists – available online or on-site.";
        featuredText = "Featured: Modern art inspired by Palermo Hollywood and Latin American culture.";
      };
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

  var liveSiteConfig : SiteConfig = {
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
          {
            platform = "Instagram";
            url = "https://instagram.com/aurasuites";
          },
          {
            platform = "Facebook";
            url = "https://facebook.com/aurasuites";
          },
        ];
      };
      sectionTexts = {
        discoverText = "Discover curated artworks by local artists – available online or on-site.";
        featuredText = "Featured: Modern art inspired by Palermo Hollywood and Latin American culture.";
      };
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

  var liveLegalPages : LegalPages = {
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

  var accessControlState = AccessControl.initState();
  var userProfiles = principalMap.empty<UserProfile>();

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

  type LogoDisplayLocation = {
    #header;
    #footer;
    #both;
  };

  type LayoutOption = {
    #centered;
    #leftImage;
    #grid;
    #list;
    #gallery;
    #simple;
  };

  type CardStyle = {
    #modern;
    #classic;
    #minimal;
  };

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

  type SocialLink = {
    platform : Text;
    url : Text;
  };

  type ContactInfo = {
    contactText : Text;
    email : Text;
    phone : Text;
    address : Text;
    socialLinks : [SocialLink];
  };

  type SectionTexts = {
    discoverText : Text;
    featuredText : Text;
  };

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

  type UserProfile = {
    name : Text;
  };

  public shared ({ caller }) func initializeAccessControl() : async () {
    AccessControl.initialize(accessControlState, caller);
  };

  public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
    AccessControl.getUserRole(accessControlState, caller);
  };

  public shared ({ caller }) func assignCallerUserRole(user : Principal, role : AccessControl.UserRole) : async () {
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  public query ({ caller }) func isCallerAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view profiles");
    };
    principalMap.get(userProfiles, caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    // Guests cannot view any profiles
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can view profiles");
    };
    // Users can only view their own profile, admins can view any profile
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Debug.trap("Unauthorized: Can only view your own profile");
    };
    principalMap.get(userProfiles, user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles := principalMap.put(userProfiles, caller, profile);
  };

  // Draft Operations
  public shared ({ caller }) func addDraftApartment(apartment : Apartment) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can add apartments");
    };
    draftApartments := textMap.put(draftApartments, apartment.id, apartment);
  };

  public shared ({ caller }) func updateDraftApartment(apartment : Apartment) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update apartments");
    };
    draftApartments := textMap.put(draftApartments, apartment.id, apartment);
  };

  public shared ({ caller }) func deleteDraftApartment(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can delete apartments");
    };
    draftApartments := textMap.remove(draftApartments, id).0;
  };

  public shared ({ caller }) func addDraftArtist(artist : Artist) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can add artists");
    };
    draftArtists := textMap.put(draftArtists, artist.id, artist);
  };

  public shared ({ caller }) func updateDraftArtist(artist : Artist) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update artists");
    };
    draftArtists := textMap.put(draftArtists, artist.id, artist);
  };

  public shared ({ caller }) func deleteDraftArtist(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can delete artists");
    };
    draftArtists := textMap.remove(draftArtists, id).0;
    liveArtists := textMap.remove(liveArtists, id).0;
  };

  public shared ({ caller }) func addDraftArtwork(artwork : Artwork) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can add artworks");
    };
    draftArtworks := textMap.put(draftArtworks, artwork.id, artwork);
  };

  public shared ({ caller }) func updateDraftArtwork(artwork : Artwork) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update artworks");
    };
    draftArtworks := textMap.put(draftArtworks, artwork.id, artwork);
  };

  public shared ({ caller }) func deleteDraftArtwork(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can delete artworks");
    };
    draftArtworks := textMap.remove(draftArtworks, id).0;
    liveArtworks := textMap.remove(liveArtworks, id).0;
  };

  public shared ({ caller }) func updateDraftSiteConfig(config : SiteConfig) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update site config");
    };
    draftSiteConfig := config;
  };

  // Live Operations
  public query func getLiveApartment(id : Text) : async ?Apartment {
    textMap.get(liveApartments, id);
  };

  public query func listLiveApartments() : async [Apartment] {
    var result = List.nil<Apartment>();
    for ((_, apartment) in textMap.entries(liveApartments)) {
      result := List.push(apartment, result);
    };
    List.toArray(result);
  };

  public query func getLiveArtist(id : Text) : async ?Artist {
    textMap.get(liveArtists, id);
  };

  public query func listLiveArtists() : async [Artist] {
    var result = List.nil<Artist>();
    for ((_, artist) in textMap.entries(liveArtists)) {
      result := List.push(artist, result);
    };
    List.toArray(result);
  };

  public query func getLiveArtwork(id : Text) : async ?Artwork {
    textMap.get(liveArtworks, id);
  };

  public query func listLiveArtworks() : async [Artwork] {
    var result = List.nil<Artwork>();
    for ((_, artwork) in textMap.entries(liveArtworks)) {
      result := List.push(artwork, result);
    };
    List.toArray(result);
  };

  public query func getLiveSiteConfig() : async SiteConfig {
    liveSiteConfig;
  };

  // Draft Queries
  public query ({ caller }) func getDraftApartment(id : Text) : async ?Apartment {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can view draft apartments");
    };
    textMap.get(draftApartments, id);
  };

  public query ({ caller }) func listDraftApartments() : async [Apartment] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can list draft apartments");
    };
    var result = List.nil<Apartment>();
    for ((_, apartment) in textMap.entries(draftApartments)) {
      result := List.push(apartment, result);
    };
    List.toArray(result);
  };

  public query ({ caller }) func getDraftArtist(id : Text) : async ?Artist {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can view draft artists");
    };
    textMap.get(draftArtists, id);
  };

  public query ({ caller }) func listDraftArtists() : async [Artist] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can list draft artists");
    };
    var result = List.nil<Artist>();
    for ((_, artist) in textMap.entries(draftArtists)) {
      result := List.push(artist, result);
    };
    List.toArray(result);
  };

  public query ({ caller }) func getDraftArtwork(id : Text) : async ?Artwork {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can view draft artworks");
    };
    textMap.get(draftArtworks, id);
  };

  public query ({ caller }) func listDraftArtworks() : async [Artwork] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can list draft artworks");
    };
    var result = List.nil<Artwork>();
    for ((_, artwork) in textMap.entries(draftArtworks)) {
      result := List.push(artwork, result);
    };
    List.toArray(result);
  };

  public query ({ caller }) func getDraftSiteConfig() : async SiteConfig {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can view draft site config");
    };
    draftSiteConfig;
  };

  // Publish Changes
  public shared ({ caller }) func publishChanges() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can publish changes");
    };
    liveApartments := draftApartments;
    liveArtists := draftArtists;
    liveArtworks := draftArtworks;
    liveSiteConfig := draftSiteConfig;
    liveLegalPages := draftLegalPages;
  };

  // Permanent Deletion
  public shared ({ caller }) func permanentlyDeleteApartment(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can permanently delete apartments");
    };
    draftApartments := textMap.remove(draftApartments, id).0;
    liveApartments := textMap.remove(liveApartments, id).0;
  };

  public shared ({ caller }) func permanentlyDeleteArtist(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can permanently delete artists");
    };
    draftArtists := textMap.remove(draftArtists, id).0;
    liveArtists := textMap.remove(liveArtists, id).0;
  };

  public shared ({ caller }) func permanentlyDeleteArtwork(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can permanently delete artworks");
    };
    draftArtworks := textMap.remove(draftArtworks, id).0;
    liveArtworks := textMap.remove(liveArtworks, id).0;
  };

  // Contact Form
  public shared func submitContactForm(name : Text, email : Text, message : Text) : async () {
    let id = Text.concat(email, Int.toText(Time.now()));
    let submission : ContactSubmission = {
      id;
      name;
      email;
      message;
      timestamp = Time.now();
    };
    contactSubmissions := textMap.put(contactSubmissions, id, submission);
  };

  public query ({ caller }) func listContactSubmissions() : async [ContactSubmission] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can view contact submissions");
    };
    var result = List.nil<ContactSubmission>();
    for ((_, submission) in textMap.entries(contactSubmissions)) {
      result := List.push(submission, result);
    };
    List.toArray(result);
  };

  // File Management
  public shared ({ caller }) func registerFileReference(path : Text, hash : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can register file references");
    };
    if (path == ".well-known/ic-domains") {
      Debug.trap("Cannot modify .well-known/ic-domains file");
    };
    Registry.add(registry, path, hash);
  };

  public query ({ caller }) func getFileReference(path : Text) : async Registry.FileReference {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can get file references");
    };
    Registry.get(registry, path);
  };

  public query ({ caller }) func listFileReferences() : async [Registry.FileReference] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can list file references");
    };
    Registry.list(registry);
  };

  public shared ({ caller }) func dropFileReference(path : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can drop file references");
    };
    if (path == ".well-known/ic-domains") {
      Debug.trap("Cannot delete .well-known/ic-domains file");
    };
    Registry.remove(registry, path);
  };

  public shared ({ caller }) func uploadLogo(path : Text, placeholderPath : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can upload logo");
    };
    draftSiteConfig := {
      draftSiteConfig with logoPath = path;
      logoPlaceholderPath = placeholderPath;
    };
  };

  public shared ({ caller }) func setLogoDisplayLocation(location : LogoDisplayLocation) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can set logo display location");
    };
    draftSiteConfig := {
      draftSiteConfig with logoDisplayLocation = location;
    };
  };

  public shared ({ caller }) func setLogoSize(size : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can set logo size");
    };
    draftSiteConfig := {
      draftSiteConfig with logoSize = size;
    };
  };

  public shared ({ caller }) func setBookingUrl(url : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can set booking URL");
    };
    draftSiteConfig := {
      draftSiteConfig with bookingUrl = url;
    };
  };

  public shared ({ caller }) func setTextColor(color : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can set text color");
    };
    draftSiteConfig := {
      draftSiteConfig with textColor = color;
    };
  };

  public shared ({ caller }) func setHeaderTextColor(color : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can set header text color");
    };
    draftSiteConfig := {
      draftSiteConfig with headerTextColor = color;
    };
  };

  public shared ({ caller }) func setAccentColor(color : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can set accent color");
    };
    draftSiteConfig := {
      draftSiteConfig with accentColor = color;
    };
  };

  public shared ({ caller }) func setLandingPageBackgroundColor(color : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can set landing page background color");
    };
    draftSiteConfig := {
      draftSiteConfig with landingPageBackgroundColor = color;
    };
  };

  public shared ({ caller }) func setApartmentsPageBackgroundColor(color : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can set apartments page background color");
    };
    draftSiteConfig := {
      draftSiteConfig with apartmentsPageBackgroundColor = color;
    };
  };

  public shared ({ caller }) func setAuraCollectionPageBackgroundColor(color : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can set aura collection page background color");
    };
    draftSiteConfig := {
      draftSiteConfig with auraCollectionPageBackgroundColor = color;
    };
  };

  public shared ({ caller }) func setApartmentDetailPageBackgroundColor(color : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can set apartment detail page background color");
    };
    draftSiteConfig := {
      draftSiteConfig with apartmentDetailPageBackgroundColor = color;
    };
  };

  public shared ({ caller }) func setArtistDetailPageBackgroundColor(color : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can set artist detail page background color");
    };
    draftSiteConfig := {
      draftSiteConfig with artistDetailPageBackgroundColor = color;
    };
  };

  public shared ({ caller }) func setArtworkDetailPageBackgroundColor(color : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can set artwork detail page background color");
    };
    draftSiteConfig := {
      draftSiteConfig with artworkDetailPageBackgroundColor = color;
    };
  };

  public shared ({ caller }) func updateApartmentGalleryImages(apartmentId : Text, images : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update apartment gallery images");
    };
    switch (textMap.get(draftApartments, apartmentId)) {
      case (null) { Debug.trap("Apartment not found") };
      case (?apartment) {
        let updatedApartment = {
          apartment with photos = images;
        };
        draftApartments := textMap.put(draftApartments, apartmentId, updatedApartment);
      };
    };
  };

  public shared ({ caller }) func updateArtistGalleryImages(artistId : Text, images : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update artist gallery images");
    };
    switch (textMap.get(draftArtists, artistId)) {
      case (null) { Debug.trap("Artist not found") };
      case (?artist) {
        let updatedArtist = {
          artist with galleryImages = images;
        };
        draftArtists := textMap.put(draftArtists, artistId, updatedArtist);
      };
    };
  };

  public shared ({ caller }) func updateArtworkGalleryImages(artworkId : Text, images : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update artwork gallery images");
    };
    switch (textMap.get(draftArtworks, artworkId)) {
      case (null) { Debug.trap("Artwork not found") };
      case (?artwork) {
        let updatedArtwork = {
          artwork with galleryImages = images;
        };
        draftArtworks := textMap.put(draftArtworks, artworkId, updatedArtwork);
      };
    };
  };

  // Section Customization
  public shared ({ caller }) func updateHeroSection(section : HeroSection) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update hero section");
    };
    draftSiteConfig := {
      draftSiteConfig with heroSection = section;
    };
  };

  public shared ({ caller }) func updateAboutSection(section : AboutSection) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update about section");
    };
    draftSiteConfig := {
      draftSiteConfig with aboutSection = section;
    };
  };

  public shared ({ caller }) func updateExperiencePage(page : ExperiencePage) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update experience page");
    };
    draftSiteConfig := {
      draftSiteConfig with experiencePage = page;
    };
  };

  public shared ({ caller }) func updateApartmentsSection(section : ApartmentsSection) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update apartments section");
    };
    draftSiteConfig := {
      draftSiteConfig with apartmentsSection = section;
    };
  };

  public shared ({ caller }) func updateAuraCollectionSection(section : AuraCollectionSection) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update aura collection section");
    };
    draftSiteConfig := {
      draftSiteConfig with auraCollectionSection = section;
    };
  };

  public shared ({ caller }) func updateFooterSection(section : FooterSection) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update footer section");
    };
    draftSiteConfig := {
      draftSiteConfig with footerSection = section;
    };
  };

  // Media Management
  public shared ({ caller }) func setDefaultHeroImage(path : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can set default hero image");
    };
    draftSiteConfig := {
      draftSiteConfig with defaultHeroImage = path;
    };
  };

  public shared ({ caller }) func setDefaultAboutImage(path : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can set default about image");
    };
    draftSiteConfig := {
      draftSiteConfig with defaultAboutImage = path;
    };
  };

  public shared ({ caller }) func setDefaultExperienceImage(path : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can set default experience image");
    };
    draftSiteConfig := {
      draftSiteConfig with defaultExperienceImage = path;
    };
  };

  public shared ({ caller }) func setDefaultApartmentsImage(path : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can set default apartments image");
    };
    draftSiteConfig := {
      draftSiteConfig with defaultApartmentsImage = path;
    };
  };

  public shared ({ caller }) func setDefaultCollectionImage(path : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can set default collection image");
    };
    draftSiteConfig := {
      draftSiteConfig with defaultCollectionImage = path;
    };
  };

  public shared ({ caller }) func deleteSectionImage(section : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can delete section images");
    };
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
      case (_) { Debug.trap("Invalid section") };
    };
  };

  // Aura Collection Management
  public shared ({ caller }) func setFeaturedArtists(artistIds : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can set featured artists");
    };
    draftSiteConfig := {
      draftSiteConfig with auraCollectionSection = {
        draftSiteConfig.auraCollectionSection with featuredArtists = artistIds;
      };
    };
  };

  public shared ({ caller }) func setFeaturedArtworks(artworkIds : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can set featured artworks");
    };
    draftSiteConfig := {
      draftSiteConfig with auraCollectionSection = {
        draftSiteConfig.auraCollectionSection with featuredArtworks = artworkIds;
      };
    };
  };

  public shared ({ caller }) func setShowAuraCollectionOnLandingPage(show : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can set show aura collection on landing page");
    };
    draftSiteConfig := {
      draftSiteConfig with auraCollectionSection = {
        draftSiteConfig.auraCollectionSection with showOnLandingPage = show;
      };
    };
  };

  // Contact Information Management
  public shared ({ caller }) func updateContactInfo(contactInfo : ContactInfo) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update contact info");
    };
    draftSiteConfig := {
      draftSiteConfig with auraCollectionSection = {
        draftSiteConfig.auraCollectionSection with contactInfo = contactInfo;
      };
    };
  };

  public shared ({ caller }) func updateSectionTexts(sectionTexts : SectionTexts) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update section texts");
    };
    draftSiteConfig := {
      draftSiteConfig with auraCollectionSection = {
        draftSiteConfig.auraCollectionSection with sectionTexts = sectionTexts;
      };
    };
  };

  // Experience Page Management
  public shared ({ caller }) func addExperienceHighlight(highlight : Highlight) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can add experience highlights");
    };
    let currentHighlights = draftSiteConfig.experiencePage.highlights;
    let newHighlights = Array.append(currentHighlights, [highlight]);
    draftSiteConfig := {
      draftSiteConfig with experiencePage = {
        draftSiteConfig.experiencePage with highlights = newHighlights;
      };
    };
  };

  public shared ({ caller }) func updateExperienceHighlight(highlight : Highlight) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update experience highlights");
    };
    let currentHighlights = draftSiteConfig.experiencePage.highlights;
    let updatedHighlights = Array.map<Highlight, Highlight>(
      currentHighlights,
      func(h) {
        if (h.id == highlight.id) { highlight } else { h };
      },
    );
    draftSiteConfig := {
      draftSiteConfig with experiencePage = {
        draftSiteConfig.experiencePage with highlights = updatedHighlights;
      };
    };
  };

  public shared ({ caller }) func deleteExperienceHighlight(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can delete experience highlights");
    };
    let currentHighlights = draftSiteConfig.experiencePage.highlights;
    let filteredHighlights = Array.filter<Highlight>(
      currentHighlights,
      func(h) { h.id != id },
    );
    draftSiteConfig := {
      draftSiteConfig with experiencePage = {
        draftSiteConfig.experiencePage with highlights = filteredHighlights;
      };
    };
  };

  public shared ({ caller }) func addExperienceSection(section : ExperienceSection) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can add experience sections");
    };
    let currentSections = draftSiteConfig.experiencePage.sections;
    let newSections = Array.append(currentSections, [section]);
    draftSiteConfig := {
      draftSiteConfig with experiencePage = {
        draftSiteConfig.experiencePage with sections = newSections;
      };
    };
  };

  public shared ({ caller }) func updateExperienceSection(section : ExperienceSection) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update experience sections");
    };
    let currentSections = draftSiteConfig.experiencePage.sections;
    let updatedSections = Array.map<ExperienceSection, ExperienceSection>(
      currentSections,
      func(s) {
        if (s.id == section.id) { section } else { s };
      },
    );
    draftSiteConfig := {
      draftSiteConfig with experiencePage = {
        draftSiteConfig.experiencePage with sections = updatedSections;
      };
    };
  };

  public shared ({ caller }) func deleteExperienceSection(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can delete experience sections");
    };
    let currentSections = draftSiteConfig.experiencePage.sections;
    let filteredSections = Array.filter<ExperienceSection>(
      currentSections,
      func(s) { s.id != id },
    );
    draftSiteConfig := {
      draftSiteConfig with experiencePage = {
        draftSiteConfig.experiencePage with sections = filteredSections;
      };
    };
  };

  public shared ({ caller }) func reorderExperienceSections(sectionIds : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can reorder experience sections");
    };
    let currentSections = draftSiteConfig.experiencePage.sections;
    let reorderedSections = Array.map<Text, ExperienceSection>(
      sectionIds,
      func(id) {
        switch (Array.find<ExperienceSection>(currentSections, func(s) { s.id == id })) {
          case (?section) { section };
          case (null) { Debug.trap("Section not found") };
        };
      },
    );
    draftSiteConfig := {
      draftSiteConfig with experiencePage = {
        draftSiteConfig.experiencePage with sections = reorderedSections;
      };
    };
  };

  // Legal Pages Management
  public shared ({ caller }) func updateImprintPage(content : Text, textColor : Text, backgroundColor : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update imprint page");
    };
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update privacy policy page");
    };
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
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can update terms page");
    };
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

  public query func getLiveImprintPage() : async LegalPage {
    liveLegalPages.imprint;
  };

  public query func getLivePrivacyPolicyPage() : async LegalPage {
    liveLegalPages.privacyPolicy;
  };

  public query func getLiveTermsPage() : async LegalPage {
    liveLegalPages.terms;
  };

  public query ({ caller }) func getDraftImprintPage() : async LegalPage {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can view draft imprint page");
    };
    draftLegalPages.imprint;
  };

  public query ({ caller }) func getDraftPrivacyPolicyPage() : async LegalPage {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can view draft privacy policy page");
    };
    draftLegalPages.privacyPolicy;
  };

  public query ({ caller }) func getDraftTermsPage() : async LegalPage {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Debug.trap("Unauthorized: Only admins can view draft terms page");
    };
    draftLegalPages.terms;
  };

  include BlobStorage(registry);
};

