// Domain types for site-config-and-services
// AuraCollectionSection extended with landingImageKey for object-storage-based landing image
// ExclusiveService — full CRUD fields
// CityGuideEntry — includes pdfKey for PDF upload/retrieval

module {

  // ── Shared sub-types ───────────────────────────────────────────────────────

  public type LayoutOption = { #centered; #leftImage; #grid; #list; #gallery; #simple };

  public type SocialLink = { platform : Text; url : Text };

  public type ContactInfo = {
    contactText : Text;
    email : Text;
    phone : Text;
    address : Text;
    socialLinks : [SocialLink];
  };

  public type SectionTexts = { discoverText : Text; featuredText : Text };

  // ── AuraCollectionSection ─────────────────────────────────────────────────
  // landingImageKey: object-storage key for the primary landing-page image
  // (distinct from backgroundImage which is a generated/static path)

  public type AuraCollectionSection = {
    title : Text;
    description : Text;
    backgroundImage : Text;
    landingImageKey : ?Text;        // object-storage key; null = use default
    textColor : Text;
    backgroundColor : Text;
    layout : LayoutOption;
    featuredArtists : [Text];
    featuredArtworks : [Text];
    showOnLandingPage : Bool;
    contactInfo : ContactInfo;
    sectionTexts : SectionTexts;
  };

  // ── CityGuideEntry ────────────────────────────────────────────────────────
  // pdfKey: object-storage key for an uploaded PDF city guide

  public type CityGuideEntry = {
    id : Text;
    category : Text;
    title : Text;
    description : Text;
    imageKey : ?Text;
    pdfKey : ?Text;                 // object-storage key for a PDF file
    externalLink : ?Text;
    visible : Bool;
    sortOrder : Nat;
  };

  // ── ExclusiveService ──────────────────────────────────────────────────────

  public type ExclusiveService = {
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

};
