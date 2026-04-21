import { u as useNavigate, c as useParams, a as useLiveApartments, b as useLiveSiteConfig, r as reactExports, j as jsxRuntimeExports, H as Header, F as Footer, d as Button, B as Badge, M as MapPin, C as Check, E as ExternalLink, e as Card, f as CardContent } from "./index-Db3bI8ig.js";
import { Z as ZoomIn, L as Lightbox } from "./Lightbox-C1VjZY-H.js";
import { A as ArrowLeft } from "./arrow-left-DUgYjaDT.js";
import "./index--ABVMKEn.js";
function ApartmentDetailPage() {
  const navigate = useNavigate();
  const { apartmentId } = useParams({ from: "/apartments/$apartmentId" });
  const { data: apartments, isLoading } = useLiveApartments();
  const { data: siteConfig } = useLiveSiteConfig();
  const [selectedImage, setSelectedImage] = reactExports.useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = reactExports.useState(false);
  const [lightboxIndex, setLightboxIndex] = reactExports.useState(0);
  const apartment = apartments == null ? void 0 : apartments.find((apt) => apt.id === apartmentId);
  const relatedApartments = (apartments == null ? void 0 : apartments.filter((apt) => apt.id !== apartmentId && apt.isActive).slice(0, 3)) || [];
  const textColor = (siteConfig == null ? void 0 : siteConfig.textColor) || "#000000";
  const headerTextColor = (siteConfig == null ? void 0 : siteConfig.headerTextColor) || "#000000";
  const accentColor = (siteConfig == null ? void 0 : siteConfig.accentColor) || "#FFD700";
  const backgroundColor = (siteConfig == null ? void 0 : siteConfig.apartmentDetailPageBackgroundColor) || "#FFFFFF";
  const defaultImage = reactExports.useMemo(() => {
    if (siteConfig == null ? void 0 : siteConfig.defaultApartmentImage) {
      return `/assets/${siteConfig.defaultApartmentImage}`;
    }
    return "/assets/generated/luxury-bedroom-art.jpg";
  }, [siteConfig == null ? void 0 : siteConfig.defaultApartmentImage]);
  reactExports.useEffect(() => {
    if (siteConfig) {
      document.body.style.backgroundColor = backgroundColor;
    }
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [siteConfig, backgroundColor]);
  const handleBooking = () => {
    const bookingUrl = (apartment == null ? void 0 : apartment.bookingUrl) || (siteConfig == null ? void 0 : siteConfig.bookingUrl) || "https://booking.com";
    window.open(bookingUrl, "_blank", "noopener,noreferrer");
  };
  const getApartmentImage = (apt) => {
    if ((apt == null ? void 0 : apt.photos) && apt.photos.length > 0 && apt.photos[0]) {
      return apt.photos[0];
    }
    return defaultImage;
  };
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };
  if (isLoading) {
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
  if (!apartment) {
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
                children: "Apartment Not Found"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-8", style: { color: textColor, opacity: 0.7 }, children: "The apartment you're looking for doesn't exist." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                onClick: () => navigate({ to: "/apartments" }),
                variant: "outline",
                style: { borderColor: accentColor, color: accentColor },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
                  "Back to Apartments"
                ]
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] });
  }
  const photos = apartment.photos && apartment.photos.length > 0 ? apartment.photos : [defaultImage];
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
              onClick: () => navigate({ to: "/apartments" }),
              variant: "ghost",
              className: "mb-6 hover:opacity-80",
              style: { color: textColor },
              "data-ocid": "apartment_detail.back_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-2 h-4 w-4" }),
                "Back to Apartments"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-8 lg:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "aria-label": "Expand gallery",
                  className: "group relative aspect-[4/3] w-full overflow-hidden rounded-lg border cursor-zoom-in block",
                  style: { borderColor: `${accentColor}33` },
                  onClick: () => openLightbox(selectedImage),
                  "data-ocid": "apartment_detail.main_image",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: photos[selectedImage],
                        alt: `${apartment.name} — view ${selectedImage + 1}`,
                        className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]",
                        onError: (e) => {
                          const target = e.target;
                          if (target.src !== defaultImage) target.src = defaultImage;
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1.5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { className: "h-4 w-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium tracking-wide", children: "Expand" })
                    ] })
                  ]
                }
              ),
              photos.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: photos.map((photo, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setSelectedImage(idx),
                  "data-ocid": `apartment_detail.thumbnail.${idx + 1}`,
                  className: "group/thumb relative aspect-square overflow-hidden rounded-lg border-2 transition-all",
                  style: {
                    borderColor: selectedImage === idx ? accentColor : `${textColor}33`
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: photo,
                      alt: `Thumbnail ${idx + 1}`,
                      className: "h-full w-full object-cover transition-transform duration-300 group-hover/thumb:scale-105",
                      onError: (e) => {
                        const target = e.target;
                        if (target.src !== defaultImage)
                          target.src = defaultImage;
                      }
                    }
                  )
                },
                photo || idx
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    style: { backgroundColor: accentColor, color: "#1a1a1a" },
                    children: apartment.city
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h1",
                  {
                    className: "mb-4 font-serif text-4xl font-light md:text-5xl",
                    style: { color: headerTextColor },
                    children: apartment.name
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center",
                    style: { color: textColor, opacity: 0.7 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mr-2 h-5 w-5" }),
                      apartment.address
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
                        children: "About This Apartment"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        style: { color: textColor, opacity: 0.8 },
                        className: "leading-relaxed",
                        children: apartment.description
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "border-t pt-6",
                  style: { borderColor: `${textColor}1a` },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h2",
                      {
                        className: "mb-4 text-xl font-medium",
                        style: { color: headerTextColor },
                        children: "Amenities"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: apartment.amenities.map((amenity) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center",
                        style: { color: textColor, opacity: 0.8 },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Check,
                            {
                              className: "mr-2 h-5 w-5 flex-shrink-0",
                              style: { color: accentColor }
                            }
                          ),
                          amenity
                        ]
                      },
                      amenity
                    )) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "border-t pt-6",
                  style: { borderColor: `${textColor}1a` },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      onClick: handleBooking,
                      size: "lg",
                      className: "w-full transition-all duration-300 hover:scale-105",
                      style: { backgroundColor: accentColor, color: "#1a1a1a" },
                      "data-ocid": "apartment_detail.book_button",
                      children: [
                        "Book This Apartment",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "ml-2 h-5 w-5" })
                      ]
                    }
                  )
                }
              )
            ] })
          ] }),
          relatedApartments.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                className: "mb-8 text-center font-serif text-3xl font-light",
                style: { color: headerTextColor },
                children: "More Apartments"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 md:grid-cols-3", children: relatedApartments.map((apt, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Card,
              {
                "data-ocid": `apartment_detail.related.${index + 1}`,
                className: "group overflow-hidden transition-all duration-[400ms] hover:shadow-xl cursor-pointer",
                onClick: () => navigate({
                  to: "/apartments/$apartmentId",
                  params: { apartmentId: apt.id }
                }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-48 overflow-hidden", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: getApartmentImage(apt),
                        alt: apt.name,
                        className: "h-full w-full object-cover transition-transform duration-[400ms] group-hover:scale-[1.08]",
                        loading: "lazy",
                        onError: (e) => {
                          const target = e.target;
                          if (target.src !== defaultImage)
                            target.src = defaultImage;
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-luxury-gold/10 opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100 pointer-events-none" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h3",
                      {
                        className: "mb-2 font-serif text-xl font-light",
                        style: { color: headerTextColor },
                        children: apt.name
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "line-clamp-2 text-sm",
                        style: { color: textColor, opacity: 0.7 },
                        children: apt.description
                      }
                    )
                  ] })
                ]
              },
              apt.id
            )) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    isLightboxOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Lightbox,
      {
        images: photos,
        initialIndex: lightboxIndex,
        onClose: () => setIsLightboxOpen(false)
      }
    )
  ] });
}
export {
  ApartmentDetailPage as default
};
