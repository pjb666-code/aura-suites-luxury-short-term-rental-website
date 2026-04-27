import { u as useNavigate, g as useLiveArtists, h as useLiveArtworks, b as useLiveSiteConfig, r as reactExports, j as jsxRuntimeExports, H as Header, I as Input, T as Tabs, i as TabsList, k as TabsTrigger, l as TabsContent, e as Card, f as CardContent, F as Footer, A as ArrowRight, B as Badge } from "./index-BRLY7AmW.js";
import { S as Search } from "./search-DOSaG4aJ.js";
function AuraCollectionPage() {
  const navigate = useNavigate();
  const { data: artists, isLoading: loadingArtists } = useLiveArtists();
  const { data: artworks, isLoading: loadingArtworks } = useLiveArtworks();
  const { data: siteConfig } = useLiveSiteConfig();
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const filteredArtists = (artists == null ? void 0 : artists.filter(
    (artist) => artist.name.toLowerCase().includes(searchQuery.toLowerCase()) || artist.bio.toLowerCase().includes(searchQuery.toLowerCase())
  )) || [];
  const filteredArtworks = (artworks == null ? void 0 : artworks.filter(
    (artwork) => artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) || artwork.description.toLowerCase().includes(searchQuery.toLowerCase())
  )) || [];
  const textColor = (siteConfig == null ? void 0 : siteConfig.textColor) || "#000000";
  const headerTextColor = (siteConfig == null ? void 0 : siteConfig.headerTextColor) || "#000000";
  const accentColor = (siteConfig == null ? void 0 : siteConfig.accentColor) || "#FFD700";
  const backgroundColor = (siteConfig == null ? void 0 : siteConfig.auraCollectionPageBackgroundColor) || "#FFFFFF";
  reactExports.useEffect(() => {
    if (siteConfig) {
      document.body.style.backgroundColor = backgroundColor;
    }
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [siteConfig, backgroundColor]);
  const getArtworkAspect = (index) => index % 2 === 0 ? "aspect-[2/3]" : "aspect-[4/3]";
  const ArtistCard = ({
    artist,
    index
  }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "data-ocid": `collection.artist.${index + 1}`,
      className: "group mb-6 break-inside-avoid overflow-hidden rounded-lg cursor-pointer transition-all duration-[400ms] ease-in-out hover:shadow-2xl w-full text-left bg-transparent p-0",
      style: {
        border: `1px solid ${textColor}10`,
        backgroundColor: `${textColor}03`
      },
      onClick: () => navigate({ to: "/artists/$artistId", params: { artistId: artist.id } }),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: artist.photo || "/assets/generated/artist-profile-studio.jpg",
              alt: artist.name,
              className: "h-full w-full object-cover transition-transform duration-[400ms] ease-in-out group-hover:scale-[1.08]"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-luxury-gold/10 opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h3",
            {
              className: "mb-2 font-serif text-xl font-light",
              style: { color: headerTextColor },
              children: artist.name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "line-clamp-3 text-sm",
              style: { color: textColor, opacity: 0.7 },
              children: artist.bio
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "mt-4 flex items-center text-sm font-medium transition-all duration-300 group-hover:gap-2",
              style: { color: accentColor },
              children: [
                "View Profile",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" })
              ]
            }
          )
        ] })
      ]
    }
  );
  const ArtworkCard = ({
    artwork,
    index,
    aspectClass
  }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "data-ocid": `collection.artwork.${index + 1}`,
      className: "group mb-6 break-inside-avoid overflow-hidden rounded-lg cursor-pointer transition-all duration-[400ms] ease-in-out hover:shadow-2xl w-full text-left bg-transparent p-0",
      style: {
        border: `1px solid ${textColor}10`,
        backgroundColor: `${textColor}03`
      },
      onClick: () => navigate({
        to: "/artworks/$artworkId",
        params: { artworkId: artwork.id }
      }),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative ${aspectClass} overflow-hidden`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: artwork.photo || "/assets/generated/abstract-geometric-art.jpg",
              alt: artwork.title,
              className: "h-full w-full object-cover transition-transform duration-[400ms] ease-in-out group-hover:scale-[1.08]"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-luxury-gold/10 opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100 pointer-events-none" }),
          artwork.isForSale && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: "absolute right-2 top-2",
              style: { backgroundColor: accentColor, color: "#1a1a1a" },
              children: "Available"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mb-1 font-medium", style: { color: headerTextColor }, children: artwork.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "line-clamp-2 text-sm",
              style: { color: textColor, opacity: 0.7 },
              children: artwork.description
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "mt-3 flex items-center text-sm font-medium transition-all duration-300 group-hover:gap-2",
              style: { color: accentColor },
              children: [
                "View Details",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" })
              ]
            }
          )
        ] })
      ]
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "main",
      {
        className: "min-h-screen pt-24 pb-16",
        style: { backgroundColor, color: textColor },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h1",
              {
                className: "mb-4 font-serif text-5xl font-light md:text-6xl lg:text-7xl",
                style: { color: headerTextColor },
                children: "The Aura Collection"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "mx-auto h-1 w-24",
                style: { backgroundColor: accentColor }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "mx-auto mt-6 max-w-2xl text-lg",
                style: { color: textColor, opacity: 0.7 },
                children: "Explore our curated collection of artworks by talented local artists"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-8 mx-auto max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Search,
              {
                className: "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5",
                style: { color: textColor, opacity: 0.5 }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "text",
                placeholder: "Search artists or artworks...",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                className: "pl-10",
                "data-ocid": "collection.search_input",
                style: { color: textColor }
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "all", className: "w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full max-w-md mx-auto grid-cols-3 mb-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "all", "data-ocid": "collection.tab.all", children: "All" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "artists", "data-ocid": "collection.tab.artists", children: "Artists" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "artworks", "data-ocid": "collection.tab.artworks", children: "Artworks" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "all", className: "space-y-14", children: [
              filteredArtists.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    className: "mb-6 text-2xl font-light",
                    style: { color: headerTextColor },
                    children: "Artists"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { columns: "3 240px", gap: "1.5rem" }, children: filteredArtists.map((artist, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ArtistCard, { artist, index: i }, artist.id)) })
              ] }),
              filteredArtworks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    className: "mb-6 text-2xl font-light",
                    style: { color: headerTextColor },
                    children: "Artworks"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { columns: "3 240px", gap: "1.5rem" }, children: filteredArtworks.map((artwork, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ArtworkCard,
                  {
                    artwork,
                    index: i,
                    aspectClass: getArtworkAspect(i)
                  },
                  artwork.id
                )) })
              ] }),
              filteredArtists.length === 0 && filteredArtworks.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "text-center py-12",
                  "data-ocid": "collection.empty_state",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-lg",
                      style: { color: textColor, opacity: 0.7 },
                      children: searchQuery ? "No results found matching your search." : "No content available at the moment."
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "artists", children: loadingArtists ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { columns: "3 240px", gap: "1.5rem" }, children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                className: "mb-6 break-inside-avoid overflow-hidden",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square animate-pulse bg-muted" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-3/4 animate-pulse rounded bg-muted" }) })
                ]
              },
              i
            )) }) : filteredArtists.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { columns: "3 240px", gap: "1.5rem" }, children: filteredArtists.map((artist, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ArtistCard, { artist, index: i }, artist.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "text-center py-12",
                "data-ocid": "collection.artists.empty_state",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-lg",
                    style: { color: textColor, opacity: 0.7 },
                    children: searchQuery ? "No artists found matching your search." : "No artists available at the moment."
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "artworks", children: loadingArtworks ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { columns: "3 240px", gap: "1.5rem" }, children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                className: "mb-6 break-inside-avoid overflow-hidden",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `${getArtworkAspect(i)} animate-pulse bg-muted`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-3/4 animate-pulse rounded bg-muted" }) })
                ]
              },
              i
            )) }) : filteredArtworks.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { columns: "3 240px", gap: "1.5rem" }, children: filteredArtworks.map((artwork, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              ArtworkCard,
              {
                artwork,
                index: i,
                aspectClass: getArtworkAspect(i)
              },
              artwork.id
            )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "text-center py-12",
                "data-ocid": "collection.artworks.empty_state",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-lg",
                    style: { color: textColor, opacity: 0.7 },
                    children: searchQuery ? "No artworks found matching your search." : "No artworks available at the moment."
                  }
                )
              }
            ) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  AuraCollectionPage as default
};
