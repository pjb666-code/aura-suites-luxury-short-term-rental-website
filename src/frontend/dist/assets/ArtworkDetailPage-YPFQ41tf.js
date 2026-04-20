import { m as createLucideIcon, u as useNavigate, c as useParams, h as useLiveArtworks, g as useLiveArtists, b as useLiveSiteConfig, r as reactExports, j as jsxRuntimeExports, H as Header, F as Footer, d as Button, B as Badge, n as ChevronRight, o as Mail, e as Card, f as CardContent } from "./index-C_o2Uk8D.js";
import { Z as ZoomIn, L as Lightbox } from "./Lightbox-CvzQARQk.js";
import { A as ArrowLeft } from "./arrow-left-SQ9-x5y4.js";
import { C as ChevronLeft } from "./index-D83LVZZi.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode);
function ArtworkDetailPage() {
  const navigate = useNavigate();
  const { artworkId } = useParams({ from: "/artworks/$artworkId" });
  const { data: artworks, isLoading: loadingArtworks } = useLiveArtworks();
  const { data: artists, isLoading: loadingArtists } = useLiveArtists();
  const { data: siteConfig } = useLiveSiteConfig();
  const [currentImageIndex, setCurrentImageIndex] = reactExports.useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = reactExports.useState(false);
  const artwork = artworks == null ? void 0 : artworks.find((a) => a.id === artworkId);
  const artist = artists == null ? void 0 : artists.find((a) => a.id === (artwork == null ? void 0 : artwork.artistId));
  const relatedArtworks = (artworks == null ? void 0 : artworks.filter((a) => a.id !== artworkId && a.artistId === (artwork == null ? void 0 : artwork.artistId)).slice(0, 3)) || [];
  const otherArtworks = (artworks == null ? void 0 : artworks.filter((a) => a.id !== artworkId && a.artistId !== (artwork == null ? void 0 : artwork.artistId)).slice(0, 3)) || [];
  const textColor = (siteConfig == null ? void 0 : siteConfig.textColor) || "#000000";
  const headerTextColor = (siteConfig == null ? void 0 : siteConfig.headerTextColor) || "#000000";
  const accentColor = (siteConfig == null ? void 0 : siteConfig.accentColor) || "#FFD700";
  const backgroundColor = (siteConfig == null ? void 0 : siteConfig.artworkDetailPageBackgroundColor) || "#FFFFFF";
  const defaultArtworkImage = reactExports.useMemo(() => {
    if (siteConfig == null ? void 0 : siteConfig.defaultArtworkImage)
      return `/assets/${siteConfig.defaultArtworkImage}`;
    return "/assets/generated/abstract-geometric-art.jpg";
  }, [siteConfig == null ? void 0 : siteConfig.defaultArtworkImage]);
  const galleryImages = reactExports.useMemo(() => {
    if (!artwork) return [];
    const images = [];
    if (artwork.photo) images.push(artwork.photo);
    if (artwork.galleryImages && artwork.galleryImages.length > 0) {
      images.push(...artwork.galleryImages);
    }
    if (images.length === 0) images.push(defaultArtworkImage);
    return images;
  }, [artwork, defaultArtworkImage]);
  reactExports.useEffect(() => {
    setCurrentImageIndex(0);
  }, [artworkId]);
  reactExports.useEffect(() => {
    if (siteConfig) {
      document.body.style.backgroundColor = backgroundColor;
    }
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [siteConfig, backgroundColor]);
  const handlePreviousImage = () => {
    setCurrentImageIndex(
      (prev) => prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };
  const handleNextImage = () => {
    setCurrentImageIndex(
      (prev) => prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };
  const getCurrentImageUrl = () => {
    const imagePath = galleryImages[currentImageIndex];
    if (!imagePath) return defaultArtworkImage;
    if (imagePath.startsWith("http") || imagePath.startsWith("/assets/"))
      return imagePath;
    return `/assets/${imagePath}`;
  };
  const resolvedGalleryUrls = galleryImages.map((img) => {
    if (img.startsWith("http") || img.startsWith("/assets/")) return img;
    return `/assets/${img}`;
  });
  if (loadingArtworks || loadingArtists) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-screen pt-24 pb-16", style: { backgroundColor }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-pulse space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-96 bg-muted rounded-lg" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-3/4 bg-muted rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-full bg-muted rounded" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] });
  }
  if (!artwork) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "main",
        {
          className: "min-h-screen pt-24 pb-16",
          style: { backgroundColor, color: textColor },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h1",
              {
                className: "mb-4 font-serif text-4xl font-light",
                style: { color: headerTextColor },
                children: "Artwork Not Found"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-8", style: { color: textColor, opacity: 0.7 }, children: "The artwork you're looking for doesn't exist." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: () => navigate({ to: "/aura-collection" }),
                variant: "outline",
                style: { borderColor: accentColor, color: accentColor },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
                  "Back to Collection"
                ]
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "main",
      {
        className: "min-h-screen pt-24 pb-16",
        style: { backgroundColor, color: textColor },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: () => navigate({ to: "/aura-collection" }),
              variant: "ghost",
              className: "mb-6",
              style: { color: textColor },
              "data-ocid": "artwork_detail.back_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
                "Back to Collection"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "aria-label": "Expand gallery",
                  className: "group relative flex w-full items-center justify-center overflow-hidden rounded-lg cursor-zoom-in",
                  style: {
                    minHeight: "400px",
                    backgroundColor: `${textColor}08`
                  },
                  onClick: () => setIsLightboxOpen(true),
                  "data-ocid": "artwork_detail.gallery_image",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: getCurrentImageUrl(),
                        alt: `${artwork.title} — view ${currentImageIndex + 1}`,
                        className: "max-h-[600px] w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]",
                        onError: (e) => {
                          const target = e.target;
                          if (target.src !== defaultArtworkImage)
                            target.src = defaultArtworkImage;
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1.5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { className: "h-4 w-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium tracking-wide", children: "Expand" })
                    ] }),
                    artwork.isForSale && currentImageIndex === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        className: "absolute left-4 top-4 text-base px-4 py-2",
                        style: { backgroundColor: accentColor, color: "#1a1a1a" },
                        children: "Available for Purchase"
                      }
                    ),
                    galleryImages.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: (e) => {
                            e.stopPropagation();
                            handlePreviousImage();
                          },
                          className: "absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:bg-white hover:scale-110 focus:outline-none",
                          style: { color: accentColor },
                          "aria-label": "Previous image",
                          "data-ocid": "artwork_detail.gallery_prev",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-6 w-6" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: (e) => {
                            e.stopPropagation();
                            handleNextImage();
                          },
                          className: "absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:bg-white hover:scale-110 focus:outline-none",
                          style: { color: accentColor },
                          "aria-label": "Next image",
                          "data-ocid": "artwork_detail.gallery_next",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-6 w-6" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-sm text-white pointer-events-none", children: [
                        currentImageIndex + 1,
                        " / ",
                        galleryImages.length
                      ] })
                    ] })
                  ]
                }
              ),
              galleryImages.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex gap-2 overflow-x-auto pb-2", children: galleryImages.map((img, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setCurrentImageIndex(index),
                  "data-ocid": `artwork_detail.thumbnail.${index + 1}`,
                  className: `flex-shrink-0 overflow-hidden rounded border-2 transition-all focus:outline-none ${index === currentImageIndex ? "" : "opacity-60 hover:opacity-100"}`,
                  style: {
                    borderColor: index === currentImageIndex ? accentColor : "transparent"
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: img.startsWith("http") || img.startsWith("/assets/") ? img : `/assets/${img}`,
                      alt: `Thumbnail ${index + 1}`,
                      className: "h-16 w-16 object-cover",
                      onError: (e) => {
                        const target = e.target;
                        if (target.src !== defaultArtworkImage)
                          target.src = defaultArtworkImage;
                      }
                    }
                  )
                },
                img || index
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    className: "mb-4 font-serif text-4xl font-light md:text-5xl",
                    style: { color: headerTextColor },
                    children: artwork.title
                  }
                ),
                artist && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => navigate({
                      to: "/artists/$artistId",
                      params: { artistId: artist.id }
                    }),
                    className: "flex items-center gap-2 transition-colors hover:opacity-80",
                    style: { color: textColor, opacity: 0.7 },
                    "data-ocid": "artwork_detail.artist_link",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-5 w-5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg", children: [
                        "by ",
                        artist.name
                      ] })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "border-t pt-6",
                  style: { borderColor: `${textColor}1a` },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h2",
                      {
                        className: "mb-3 text-xl font-medium",
                        style: { color: headerTextColor },
                        children: "About This Artwork"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        style: { color: textColor, opacity: 0.8 },
                        className: "leading-relaxed",
                        children: artwork.description
                      }
                    )
                  ]
                }
              ),
              artwork.isForSale && artwork.price && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "border-t pt-6",
                  style: { borderColor: `${textColor}1a` },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h2",
                      {
                        className: "mb-3 text-xl font-medium",
                        style: { color: headerTextColor },
                        children: "Price"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: "text-3xl font-light",
                        style: { color: accentColor },
                        children: [
                          "$",
                          Number(artwork.price).toLocaleString()
                        ]
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "border-t pt-6 space-y-3",
                  style: { borderColor: `${textColor}1a` },
                  children: [
                    artwork.isForSale && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        onClick: () => {
                          window.location.href = "/#contact";
                        },
                        className: "w-full",
                        style: { backgroundColor: accentColor, color: "#1a1a1a" },
                        "data-ocid": "artwork_detail.inquire_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "mr-2 h-5 w-5" }),
                          "Inquire About Purchase"
                        ]
                      }
                    ),
                    artist && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        onClick: () => navigate({
                          to: "/artists/$artistId",
                          params: { artistId: artist.id }
                        }),
                        variant: "outline",
                        className: "w-full",
                        style: { borderColor: accentColor, color: accentColor },
                        "data-ocid": "artwork_detail.view_artist_button",
                        children: "View Artist Profile"
                      }
                    )
                  ]
                }
              )
            ] })
          ] }),
          (relatedArtworks.length > 0 || otherArtworks.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "mb-8 text-center font-serif text-3xl font-light",
                style: { color: headerTextColor },
                children: relatedArtworks.length > 0 ? `More by ${artist == null ? void 0 : artist.name}` : "More Artworks"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: (relatedArtworks.length > 0 ? relatedArtworks : otherArtworks).map((relatedArtwork, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                "data-ocid": `artwork_detail.related.${index + 1}`,
                className: "group overflow-hidden transition-all duration-[400ms] hover:shadow-xl cursor-pointer",
                onClick: () => navigate({
                  to: "/artworks/$artworkId",
                  params: { artworkId: relatedArtwork.id }
                }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: relatedArtwork.photo || defaultArtworkImage,
                        alt: relatedArtwork.title,
                        className: "h-full w-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.08]",
                        loading: "lazy",
                        onError: (e) => {
                          const target = e.target;
                          if (target.src !== defaultArtworkImage)
                            target.src = defaultArtworkImage;
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-luxury-gold/10 opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100 pointer-events-none" }),
                    relatedArtwork.isForSale && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        className: "absolute right-2 top-2",
                        style: {
                          backgroundColor: accentColor,
                          color: "#1a1a1a"
                        },
                        children: "Available"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h3",
                      {
                        className: "mb-1 font-medium",
                        style: { color: headerTextColor },
                        children: relatedArtwork.title
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "line-clamp-2 text-sm",
                        style: { color: textColor, opacity: 0.7 },
                        children: relatedArtwork.description
                      }
                    )
                  ] })
                ]
              },
              relatedArtwork.id
            )) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    isLightboxOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Lightbox,
      {
        images: resolvedGalleryUrls,
        initialIndex: currentImageIndex,
        onClose: () => setIsLightboxOpen(false)
      }
    )
  ] });
}
export {
  ArtworkDetailPage as default
};
