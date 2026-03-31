import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Apartment {
  'id' : string,
  'city' : string,
  'name' : string,
  'description' : string,
  'amenities' : Array<string>,
  'isActive' : boolean,
  'address' : string,
  'photos' : Array<string>,
}
export interface Artist {
  'id' : string,
  'bio' : string,
  'name' : string,
  'artworks' : Array<string>,
  'photo' : string,
}
export interface Artwork {
  'id' : string,
  'title' : string,
  'artistId' : string,
  'description' : string,
  'photo' : string,
  'price' : [] | [bigint],
  'isForSale' : boolean,
}
export interface ContactSubmission {
  'id' : string,
  'name' : string,
  'email' : string,
  'message' : string,
  'timestamp' : bigint,
}
export interface FileReference { 'hash' : string, 'path' : string }
export type LogoDisplayLocation = { 'both' : null } |
  { 'footer' : null } |
  { 'header' : null };
export interface SiteConfig {
  'logoDisplayLocation' : LogoDisplayLocation,
  'logoPath' : string,
  'logoSize' : bigint,
  'language' : string,
  'contactEmail' : string,
}
export interface UserProfile { 'name' : string }
export type UserRole = { 'admin' : null } |
  { 'user' : null } |
  { 'guest' : null };
export interface _SERVICE {
  'addApartment' : ActorMethod<[Apartment], undefined>,
  'addArtist' : ActorMethod<[Artist], undefined>,
  'addArtwork' : ActorMethod<[Artwork], undefined>,
  'assignCallerUserRole' : ActorMethod<[Principal, UserRole], undefined>,
  'dropFileReference' : ActorMethod<[string], undefined>,
  'getApartment' : ActorMethod<[string], [] | [Apartment]>,
  'getArtist' : ActorMethod<[string], [] | [Artist]>,
  'getArtwork' : ActorMethod<[string], [] | [Artwork]>,
  'getCallerUserProfile' : ActorMethod<[], [] | [UserProfile]>,
  'getCallerUserRole' : ActorMethod<[], UserRole>,
  'getFileReference' : ActorMethod<[string], FileReference>,
  'getSiteConfig' : ActorMethod<[], SiteConfig>,
  'getUserProfile' : ActorMethod<[Principal], [] | [UserProfile]>,
  'initializeAccessControl' : ActorMethod<[], undefined>,
  'isCallerAdmin' : ActorMethod<[], boolean>,
  'listApartments' : ActorMethod<[], Array<Apartment>>,
  'listArtists' : ActorMethod<[], Array<Artist>>,
  'listArtworks' : ActorMethod<[], Array<Artwork>>,
  'listContactSubmissions' : ActorMethod<[], Array<ContactSubmission>>,
  'listFileReferences' : ActorMethod<[], Array<FileReference>>,
  'registerFileReference' : ActorMethod<[string, string], undefined>,
  'saveCallerUserProfile' : ActorMethod<[UserProfile], undefined>,
  'setLogoDisplayLocation' : ActorMethod<[LogoDisplayLocation], undefined>,
  'setLogoSize' : ActorMethod<[bigint], undefined>,
  'submitContactForm' : ActorMethod<[string, string, string], undefined>,
  'updateApartment' : ActorMethod<[Apartment], undefined>,
  'updateArtist' : ActorMethod<[Artist], undefined>,
  'updateArtwork' : ActorMethod<[Artwork], undefined>,
  'updateSiteConfig' : ActorMethod<[SiteConfig], undefined>,
  'uploadLogo' : ActorMethod<[string], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
