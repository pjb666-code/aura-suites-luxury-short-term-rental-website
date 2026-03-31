export const idlFactory = ({ IDL }) => {
  const Apartment = IDL.Record({
    'id' : IDL.Text,
    'city' : IDL.Text,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'amenities' : IDL.Vec(IDL.Text),
    'isActive' : IDL.Bool,
    'address' : IDL.Text,
    'photos' : IDL.Vec(IDL.Text),
  });
  const Artist = IDL.Record({
    'id' : IDL.Text,
    'bio' : IDL.Text,
    'name' : IDL.Text,
    'artworks' : IDL.Vec(IDL.Text),
    'photo' : IDL.Text,
  });
  const Artwork = IDL.Record({
    'id' : IDL.Text,
    'title' : IDL.Text,
    'artistId' : IDL.Text,
    'description' : IDL.Text,
    'photo' : IDL.Text,
    'price' : IDL.Opt(IDL.Nat),
    'isForSale' : IDL.Bool,
  });
  const UserRole = IDL.Variant({
    'admin' : IDL.Null,
    'user' : IDL.Null,
    'guest' : IDL.Null,
  });
  const UserProfile = IDL.Record({ 'name' : IDL.Text });
  const FileReference = IDL.Record({ 'hash' : IDL.Text, 'path' : IDL.Text });
  const LogoDisplayLocation = IDL.Variant({
    'both' : IDL.Null,
    'footer' : IDL.Null,
    'header' : IDL.Null,
  });
  const SiteConfig = IDL.Record({
    'logoDisplayLocation' : LogoDisplayLocation,
    'logoPath' : IDL.Text,
    'logoSize' : IDL.Nat,
    'language' : IDL.Text,
    'contactEmail' : IDL.Text,
  });
  const ContactSubmission = IDL.Record({
    'id' : IDL.Text,
    'name' : IDL.Text,
    'email' : IDL.Text,
    'message' : IDL.Text,
    'timestamp' : IDL.Int,
  });
  return IDL.Service({
    'addApartment' : IDL.Func([Apartment], [], []),
    'addArtist' : IDL.Func([Artist], [], []),
    'addArtwork' : IDL.Func([Artwork], [], []),
    'assignCallerUserRole' : IDL.Func([IDL.Principal, UserRole], [], []),
    'dropFileReference' : IDL.Func([IDL.Text], [], []),
    'getApartment' : IDL.Func([IDL.Text], [IDL.Opt(Apartment)], ['query']),
    'getArtist' : IDL.Func([IDL.Text], [IDL.Opt(Artist)], ['query']),
    'getArtwork' : IDL.Func([IDL.Text], [IDL.Opt(Artwork)], ['query']),
    'getCallerUserProfile' : IDL.Func([], [IDL.Opt(UserProfile)], ['query']),
    'getCallerUserRole' : IDL.Func([], [UserRole], ['query']),
    'getFileReference' : IDL.Func([IDL.Text], [FileReference], ['query']),
    'getSiteConfig' : IDL.Func([], [SiteConfig], ['query']),
    'getUserProfile' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(UserProfile)],
        ['query'],
      ),
    'initializeAccessControl' : IDL.Func([], [], []),
    'isCallerAdmin' : IDL.Func([], [IDL.Bool], ['query']),
    'listApartments' : IDL.Func([], [IDL.Vec(Apartment)], ['query']),
    'listArtists' : IDL.Func([], [IDL.Vec(Artist)], ['query']),
    'listArtworks' : IDL.Func([], [IDL.Vec(Artwork)], ['query']),
    'listContactSubmissions' : IDL.Func(
        [],
        [IDL.Vec(ContactSubmission)],
        ['query'],
      ),
    'listFileReferences' : IDL.Func([], [IDL.Vec(FileReference)], ['query']),
    'registerFileReference' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'saveCallerUserProfile' : IDL.Func([UserProfile], [], []),
    'setLogoDisplayLocation' : IDL.Func([LogoDisplayLocation], [], []),
    'setLogoSize' : IDL.Func([IDL.Nat], [], []),
    'submitContactForm' : IDL.Func([IDL.Text, IDL.Text, IDL.Text], [], []),
    'updateApartment' : IDL.Func([Apartment], [], []),
    'updateArtist' : IDL.Func([Artist], [], []),
    'updateArtwork' : IDL.Func([Artwork], [], []),
    'updateSiteConfig' : IDL.Func([SiteConfig], [], []),
    'uploadLogo' : IDL.Func([IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
