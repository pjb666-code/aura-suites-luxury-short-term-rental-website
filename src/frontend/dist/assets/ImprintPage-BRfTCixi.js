import { ab as useLiveImprintPage, j as jsxRuntimeExports, a7 as LoaderCircle, H as Header, ac as Link, F as Footer } from "./index-Bi4BquR6.js";
import { A as ArrowLeft } from "./arrow-left-DYM9eIsd.js";
function ImprintPage() {
  const { data: imprintPage, isLoading } = useLiveImprintPage();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-luxury-gold" }) });
  }
  const backgroundColor = (imprintPage == null ? void 0 : imprintPage.backgroundColor) || "#FFFFFF";
  const textColor = (imprintPage == null ? void 0 : imprintPage.textColor) || "#000000";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", style: { backgroundColor }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "container mx-auto px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "mx-auto max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/",
          className: "mb-8 inline-flex items-center gap-2 text-sm opacity-60 transition-opacity hover:opacity-100",
          style: { color: textColor },
          "data-ocid": "imprint-back-home",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
            "Back to Home"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h1",
        {
          className: "mb-8 mt-6 font-serif text-4xl font-light md:text-5xl",
          style: { color: textColor },
          children: (imprintPage == null ? void 0 : imprintPage.title) || "Imprint"
        }
      ),
      (imprintPage == null ? void 0 : imprintPage.content) ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "prose prose-lg max-w-none",
          style: { color: textColor },
          children: imprintPage.content.split("\n").map((paragraph) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "mb-4 leading-relaxed",
              children: paragraph
            },
            paragraph || Math.random().toString(36)
          ))
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg opacity-60", style: { color: textColor }, children: [
        "Imprint information has not been added yet. Please check back later or contact us at",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:contact@aurasuites.info", className: "underline", children: "contact@aurasuites.info" }),
        "."
      ] }),
      (imprintPage == null ? void 0 : imprintPage.lastUpdated) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-8 text-sm opacity-70", style: { color: textColor }, children: [
        "Last updated:",
        " ",
        new Date(
          Number(imprintPage.lastUpdated) / 1e6
        ).toLocaleDateString()
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  ImprintPage as default
};
