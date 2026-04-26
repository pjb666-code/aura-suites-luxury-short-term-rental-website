import { u as useNavigate, a as useLiveApartments, b as useLiveSiteConfig, r as reactExports, j as jsxRuntimeExports, H as Header, I as Input, B as Badge, A as ArrowRight, M as MapPin, C as Check, F as Footer } from "./index-Bi4BquR6.js";
import { S as Search } from "./search-ewAVo3sy.js";
function ApartmentsPage() {
  const navigate = useNavigate();
  const { data: apartments, isLoading } = useLiveApartments();
  const { data: siteConfig } = useLiveSiteConfig();
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const activeApartments = (apartments == null ? void 0 : apartments.filter((apt) => apt.isActive)) || [];
  const filteredApartments = activeApartments.filter(
    (apt) => apt.name.toLowerCase().includes(searchQuery.toLowerCase()) || apt.description.toLowerCase().includes(searchQuery.toLowerCase()) || apt.city.toLowerCase().includes(searchQuery.toLowerCase()) || apt.address.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const textColor = (siteConfig == null ? void 0 : siteConfig.textColor) || "#FFFFFF";
  const headerTextColor = (siteConfig == null ? void 0 : siteConfig.headerTextColor) || "#FFFFFF";
  const accentColor = (siteConfig == null ? void 0 : siteConfig.accentColor) || "#FFD700";
  const backgroundColor = (siteConfig == null ? void 0 : siteConfig.apartmentsPageBackgroundColor) || "#1a1a1a";
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
  const getApartmentImage = (apartment) => {
    if (apartment.photos && apartment.photos.length > 0 && apartment.photos[0]) {
      return apartment.photos[0];
    }
    return defaultImage;
  };
  const getAspectClass = (index) => index % 2 === 0 ? "aspect-video" : "aspect-[3/4]";
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
                children: "Our Apartments"
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
                style: { color: textColor, opacity: 0.8 },
                children: "Explore our collection of luxury artist lofts in Palermo Hollywood"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10 mx-auto max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
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
                placeholder: "Search apartments by name, location, or description...",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                className: "pl-10",
                "data-ocid": "apartments.search_input",
                style: {
                  backgroundColor: `${textColor}10`,
                  borderColor: `${textColor}20`,
                  color: textColor
                }
              }
            )
          ] }) }),
          isLoading ? (
            /* Loading skeleton — uniform grid */
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "masonry-grid",
                style: { columns: "3 280px", gap: "2rem" },
                children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "mb-8 break-inside-avoid overflow-hidden rounded-lg border",
                    style: {
                      borderColor: `${textColor}10`,
                      backgroundColor: `${textColor}05`
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `w-full animate-pulse ${i % 2 === 0 ? "aspect-video" : "aspect-[3/4]"}`,
                          style: { backgroundColor: `${textColor}10` }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "h-6 w-3/4 animate-pulse rounded",
                            style: { backgroundColor: `${textColor}10` }
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "h-4 w-full animate-pulse rounded",
                            style: { backgroundColor: `${textColor}10` }
                          }
                        )
                      ] })
                    ]
                  },
                  i
                ))
              }
            )
          ) : filteredApartments.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { columns: "3 280px", gap: "2rem" }, children: filteredApartments.map((apartment, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `apartments.item.${index + 1}`,
              className: "group mb-8 break-inside-avoid overflow-hidden rounded-lg cursor-pointer transition-all duration-[400ms] ease-in-out hover:shadow-2xl w-full text-left bg-transparent p-0",
              style: {
                border: `1px solid ${textColor}10`,
                backgroundColor: `${textColor}05`
              },
              onClick: () => navigate({
                to: "/apartments/$apartmentId",
                params: { apartmentId: apartment.id }
              }),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `relative overflow-hidden ${getAspectClass(index)}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: getApartmentImage(apartment),
                          alt: apartment.name,
                          className: "h-full w-full object-cover transition-transform duration-[400ms] ease-in-out group-hover:scale-[1.08]",
                          loading: "lazy",
                          onError: (e) => {
                            const target = e.target;
                            if (target.src !== defaultImage)
                              target.src = defaultImage;
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-luxury-gold/10 opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100 pointer-events-none" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          className: "absolute right-4 top-4",
                          style: { backgroundColor: accentColor, color: "#1a1a1a" },
                          children: apartment.city
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "absolute bottom-0 inset-x-0 flex items-center justify-center py-3 translate-y-full transition-transform duration-[400ms] ease-in-out group-hover:translate-y-0",
                          style: { backgroundColor: "rgba(0,0,0,0.65)" },
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold tracking-widest uppercase text-white", children: "View Apartment" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4 text-white" })
                          ]
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h3",
                    {
                      className: "mb-2 font-serif text-2xl font-light transition-colors duration-[400ms]",
                      style: { color: headerTextColor },
                      children: apartment.name
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "mb-4 flex items-center text-sm",
                      style: { color: textColor, opacity: 0.7 },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mr-2 h-4 w-4" }),
                        apartment.address
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "mb-4 line-clamp-3",
                      style: { color: textColor, opacity: 0.8 },
                      children: apartment.description
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "text-sm font-medium",
                        style: { color: accentColor },
                        children: "Amenities:"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-x-4 gap-y-1", children: apartment.amenities.slice(0, 4).map((amenity) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center text-sm",
                        style: { color: textColor, opacity: 0.7 },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Check,
                            {
                              className: "mr-1 h-3 w-3",
                              style: { color: accentColor }
                            }
                          ),
                          amenity
                        ]
                      },
                      amenity
                    )) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "mt-4 flex items-center text-sm font-medium transition-all duration-300 group-hover:gap-2",
                      style: { color: accentColor },
                      children: [
                        "View Details",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" })
                      ]
                    }
                  )
                ] })
              ]
            },
            apartment.id
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "text-center py-16",
              "data-ocid": "apartments.empty_state",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg", style: { color: textColor, opacity: 0.7 }, children: searchQuery ? "No apartments found matching your search." : "No apartments available at the moment." })
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  ApartmentsPage as default
};
