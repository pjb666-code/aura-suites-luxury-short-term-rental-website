// Public API mixin for site-config-and-services
// Exposes CRUD endpoints for ExclusiveService, CityGuideEntry (with pdfKey),
// and AuraCollectionSection landingImageKey management.

import Types "../types/site-config-and-services";
import Lib "../lib/site-config-and-services";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Text "mo:core/Text";

// State injected by main.mo:
//   draftExclusiveServices : Map.Map<Text, Types.ExclusiveService>
//   liveExclusiveServices  : Map.Map<Text, Types.ExclusiveService>
//   draftCityGuideEntries  : Map.Map<Text, Types.CityGuideEntry>
//   liveCityGuideEntries   : Map.Map<Text, Types.CityGuideEntry>
//   nextExclusiveServiceId : Nat (counter)
//   nextCityGuideEntryId   : Nat (counter)

mixin (
  draftExclusiveServices : Map.Map<Text, Types.ExclusiveService>,
  liveExclusiveServices  : Map.Map<Text, Types.ExclusiveService>,
  draftCityGuideEntries  : Map.Map<Text, Types.CityGuideEntry>,
  liveCityGuideEntries   : Map.Map<Text, Types.CityGuideEntry>,
) {

  // ── ExclusiveService — admin CRUD ─────────────────────────────────────────

  /// Add a new exclusive service to the draft store (id auto-assigned).
  public shared ({ caller }) func addDraftExclusiveService(
    service : Types.ExclusiveService
  ) : async () {
    draftExclusiveServices.add(service.id, service);
  };

  /// Overwrite an existing exclusive service in the draft store by id.
  public shared ({ caller }) func updateDraftExclusiveService(
    service : Types.ExclusiveService
  ) : async () {
    draftExclusiveServices.add(service.id, service);
  };

  /// Remove an exclusive service from the draft store.
  public shared ({ caller }) func deleteDraftExclusiveService(
    id : Text
  ) : async () {
    draftExclusiveServices.remove(id);
  };

  /// Re-order exclusive services in the draft store.
  public shared ({ caller }) func reorderExclusiveServices(
    orderedIds : [Text]
  ) : async () {
    Lib.reorderServices(draftExclusiveServices, orderedIds);
  };

  /// Get a single draft exclusive service by id (admin only).
  public query ({ caller }) func getDraftExclusiveService(
    id : Text
  ) : async ?Types.ExclusiveService {
    draftExclusiveServices.get(id);
  };

  /// List all draft exclusive services (admin only).
  public query ({ caller }) func listDraftExclusiveServices() : async [Types.ExclusiveService] {
    draftExclusiveServices.values().toArray();
  };

  // ── ExclusiveService — public read ────────────────────────────────────────

  /// Get a single live exclusive service by id (public).
  public query func getLiveExclusiveService(
    id : Text
  ) : async ?Types.ExclusiveService {
    liveExclusiveServices.get(id);
  };

  /// List all live exclusive services (public).
  public query func listLiveExclusiveServices() : async [Types.ExclusiveService] {
    liveExclusiveServices.values().toArray();
  };

  // ── CityGuideEntry — admin CRUD ───────────────────────────────────────────

  /// Add a new city guide entry to the draft store (id auto-assigned).
  public shared ({ caller }) func addDraftCityGuideEntry(
    entry : Types.CityGuideEntry
  ) : async () {
    draftCityGuideEntries.add(entry.id, entry);
  };

  /// Overwrite an existing city guide entry in the draft store by id.
  public shared ({ caller }) func updateDraftCityGuideEntry(
    entry : Types.CityGuideEntry
  ) : async () {
    draftCityGuideEntries.add(entry.id, entry);
  };

  /// Remove a city guide entry from the draft store.
  public shared ({ caller }) func deleteDraftCityGuideEntry(
    id : Text
  ) : async () {
    draftCityGuideEntries.remove(id);
  };

  /// Re-order city guide entries in the draft store.
  public shared ({ caller }) func reorderCityGuideEntries(
    orderedIds : [Text]
  ) : async () {
    Lib.reorderEntries(draftCityGuideEntries, orderedIds);
  };

  /// Set or clear the pdfKey on a draft city guide entry (object-storage key).
  public shared ({ caller }) func setDraftCityGuidePdfKey(
    id : Text,
    pdfKey : ?Text,
  ) : async () {
    switch (draftCityGuideEntries.get(id)) {
      case null { Runtime.trap("CityGuideEntry not found: " # id) };
      case (?entry) {
        draftCityGuideEntries.add(id, Lib.setPdfKey(entry, pdfKey));
      };
    };
  };

  /// Get a single draft city guide entry by id (admin only).
  public query ({ caller }) func getDraftCityGuideEntry(
    id : Text
  ) : async ?Types.CityGuideEntry {
    draftCityGuideEntries.get(id);
  };

  /// List all draft city guide entries (admin only).
  public query ({ caller }) func listDraftCityGuideEntries() : async [Types.CityGuideEntry] {
    draftCityGuideEntries.values().toArray();
  };

  // ── CityGuideEntry — public read ──────────────────────────────────────────

  /// Get a single live city guide entry by id (public).
  public query func getLiveCityGuideEntry(
    id : Text
  ) : async ?Types.CityGuideEntry {
    liveCityGuideEntries.get(id);
  };

  /// List all live city guide entries (public).
  public query func listLiveCityGuideEntries() : async [Types.CityGuideEntry] {
    liveCityGuideEntries.values().toArray();
  };

  // ── AuraCollectionSection — landing image key ─────────────────────────────

  /// Set or clear the object-storage key for the Aura Collection landing image.
  /// Note: draftSiteConfig is NOT injected here — main.mo must implement this
  /// by delegating to SiteConfigLib.setLandingImageKey and updating its var.
  public shared ({ caller }) func setAuraCollectionLandingImageKey(
    key : ?Text
  ) : async () {
    Runtime.trap("setAuraCollectionLandingImageKey must be implemented in main.mo");
  };

};
