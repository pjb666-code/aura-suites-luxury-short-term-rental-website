import { m as createLucideIcon, r as reactExports, j as jsxRuntimeExports, p as motion, X, n as ChevronRight } from "./index-BRLY7AmW.js";
import { A as AnimatePresence, C as ChevronLeft } from "./index-B39T_luR.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "11", x2: "11", y1: "8", y2: "14", key: "1vmskp" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
];
const ZoomIn = createLucideIcon("zoom-in", __iconNode);
function Lightbox({
  images,
  initialIndex,
  onClose
}) {
  const [current, setCurrent] = reactExports.useState(initialIndex);
  const prev = reactExports.useCallback(() => {
    setCurrent((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);
  const next = reactExports.useCallback(() => {
    setCurrent((i) => (i + 1) % images.length);
  }, [images.length]);
  reactExports.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, prev, next]);
  reactExports.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  const hasMultiple = images.length > 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.25 },
      className: "fixed inset-0 z-[9999] flex items-center justify-center",
      style: { backgroundColor: "rgba(0,0,0,0.9)" },
      onClick: onClose,
      "data-ocid": "lightbox.dialog",
      children: [
        hasMultiple && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "absolute left-4 top-4 rounded px-3 py-1 text-sm font-medium text-white/80",
            style: { backgroundColor: "rgba(0,0,0,0.4)" },
            children: [
              current + 1,
              " / ",
              images.length
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Close lightbox",
            "data-ocid": "lightbox.close_button",
            className: "absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20",
            onClick: onClose,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" })
          }
        ),
        hasMultiple && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Previous image",
            "data-ocid": "lightbox.prev_button",
            className: "absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20",
            onClick: (e) => {
              e.stopPropagation();
              prev();
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-6 w-6" })
          }
        ),
        hasMultiple && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Next image",
            "data-ocid": "lightbox.next_button",
            className: "absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20",
            onClick: (e) => {
              e.stopPropagation();
              next();
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-6 w-6" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.img,
          {
            src: images[current],
            alt: `Gallery view ${current + 1} of ${images.length}`,
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.95 },
            transition: { duration: 0.25 },
            className: "max-h-[85vh] max-w-[90vw] select-none object-contain",
            style: { pointerEvents: "none" },
            onClick: (e) => e.stopPropagation()
          },
          current
        ) }),
        hasMultiple && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2", children: images.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": `Go to image ${i + 1}`,
            "data-ocid": `lightbox.dot.${i + 1}`,
            onClick: (e) => {
              e.stopPropagation();
              setCurrent(i);
            },
            className: "h-2 w-2 rounded-full transition-all",
            style: {
              backgroundColor: i === current ? "white" : "rgba(255,255,255,0.35)",
              width: i === current ? "1.5rem" : "0.5rem"
            }
          },
          src
        )) })
      ]
    },
    "lightbox-overlay"
  ) });
}
export {
  Lightbox as L,
  ZoomIn as Z
};
