// Domain logic for site-config-and-services
// Stateless helpers for ExclusiveService and CityGuideEntry CRUD,
// and for merging landingImageKey into AuraCollectionSection.

import Types "../types/site-config-and-services";
import Map "mo:core/Map";
import Text "mo:core/Text";

module {

  // ── AuraCollectionSection helpers ─────────────────────────────────────────

  /// Set or clear the landing image key on an AuraCollectionSection record.
  public func setLandingImageKey(
    section : Types.AuraCollectionSection,
    key : ?Text,
  ) : Types.AuraCollectionSection {
    { section with landingImageKey = key };
  };

  // ── ExclusiveService helpers ───────────────────────────────────────────────

  /// Create a new ExclusiveService with a generated id.
  public func newExclusiveService(
    id : Text,
    name : Text,
    description : Text,
    category : Text,
    priceInfo : ?Text,
    imageKey : ?Text,
    requestLink : ?Text,
    sortOrder : Nat,
  ) : Types.ExclusiveService {
    {
      id;
      name;
      description;
      category;
      priceInfo;
      imageKey;
      requestLink;
      visible = true;
      sortOrder;
    };
  };

  /// Apply an update record to an existing ExclusiveService (id preserved).
  public func applyServiceUpdate(
    existing : Types.ExclusiveService,
    update : Types.ExclusiveService,
  ) : Types.ExclusiveService {
    { update with id = existing.id };
  };

  /// Re-index sort orders across all services after a reorder operation.
  public func reorderServices(
    services : Map.Map<Text, Types.ExclusiveService>,
    orderedIds : [Text],
  ) : () {
    for ((i, id) in orderedIds.enumerate()) {
      switch (services.get(id)) {
        case (?svc) { services.add(id, { svc with sortOrder = i }) };
        case null {};
      };
    };
  };

  // ── CityGuideEntry helpers ─────────────────────────────────────────────────

  /// Create a new CityGuideEntry with a generated id.
  public func newCityGuideEntry(
    id : Text,
    category : Text,
    title : Text,
    description : Text,
    imageKey : ?Text,
    pdfKey : ?Text,
    externalLink : ?Text,
    sortOrder : Nat,
  ) : Types.CityGuideEntry {
    {
      id;
      category;
      title;
      description;
      imageKey;
      pdfKey;
      externalLink;
      visible = true;
      sortOrder;
    };
  };

  /// Set or clear the pdfKey on an existing CityGuideEntry.
  public func setPdfKey(
    entry : Types.CityGuideEntry,
    key : ?Text,
  ) : Types.CityGuideEntry {
    { entry with pdfKey = key };
  };

  /// Re-index sort orders across all entries after a reorder operation.
  public func reorderEntries(
    entries : Map.Map<Text, Types.CityGuideEntry>,
    orderedIds : [Text],
  ) : () {
    for ((i, id) in orderedIds.enumerate()) {
      switch (entries.get(id)) {
        case (?e) { entries.add(id, { e with sortOrder = i }) };
        case null {};
      };
    };
  };

};
