import type { CityGuideEntry, ExclusiveService, MapMarker } from "@/backend";
import { useFileUrl } from "@/blob-storage/FileStorage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  useListLiveCityGuideEntries,
  useListLiveExclusiveServices,
  useListLiveMapMarkers,
  useLiveSiteConfig,
} from "@/hooks/useQueries";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Award,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  ExternalLink,
  Heart,
  Loader2,
  MapIcon,
  MapPin,
  Moon,
  Music,
  Palette,
  ShoppingBag,
  Sparkles,
  Star,
  Utensils,
  UtensilsCrossed,
  Zap,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

// Fix leaflet default marker icons (known webpack/vite issue)
const iconDefault = L.Icon.Default.prototype as L.Icon.Default & {
  _getIconUrl?: unknown;
};
iconDefault._getIconUrl = undefined;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Set up the PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

// ─── Icon maps ────────────────────────────────────────────────────────────────

const iconMap: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  star: Star,
  award: Award,
  heart: Heart,
  zap: Zap,
  mapPin: MapPin,
  music: Music,
  utensils: Utensils,
  sparkles: Sparkles,
};

const categoryColorMap: Record<string, string> = {
  Dining: "#C9A84C",
  "Art & Culture": "#9B59B6",
  Nightlife: "#4B6FC9",
  Shopping: "#27AE60",
  Local: "#16A085",
};

const categoryIconMap: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  Dining: UtensilsCrossed,
  "Art & Culture": Palette,
  Nightlife: Moon,
  Shopping: ShoppingBag,
  Local: Compass,
};

// ─── Parallax Hero ────────────────────────────────────────────────────────────

function ParallaxHero({
  title,
  description,
  backgroundImage,
  accentColor,
}: {
  title: string;
  description: string;
  backgroundImage: string;
  accentColor: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track scroll progress of the hero section (from its top entering the viewport
  // to its bottom leaving the top of the viewport)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Move the background image at 50% of scroll speed:
  // When the hero is fully in view (progress=0) the image sits at 0%.
  // By the time the hero scrolls out of view (progress=1) it has moved down 30%,
  // which makes it appear to travel at ~half the page-scroll speed.
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "30%"],
  );

  return (
    <div
      ref={ref}
      // Extra height so the oversized background image has room to travel
      className="relative h-[60vh] min-h-[400px] overflow-hidden"
      data-ocid="experience-hero"
    >
      {/* Background image is scaled up so it never shows gaps during parallax */}
      <motion.div
        className="absolute inset-0 scale-110 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})`, y }}
        aria-hidden="true"
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.42) 100%)",
        }}
        aria-hidden="true"
      />
      {/* Hero content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-4 font-serif text-4xl font-light text-white drop-shadow-lg md:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mb-5 h-0.5 w-24 origin-center"
          style={{ backgroundColor: accentColor }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="max-w-2xl text-lg font-light text-white/90 drop-shadow"
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
}

// ─── Section Panel ────────────────────────────────────────────────────────────

interface SectionPanelProps {
  id: string;
  title: string;
  description: string;
  images: string[];
  videos: string[];
  isExpanded: boolean;
  onToggle: () => void;
  accentColor: string;
  textColor: string;
  headerTextColor: string;
  defaultImage: string;
  index: number;
}

function SectionPanel({
  id,
  title,
  description,
  images,
  videos,
  isExpanded,
  onToggle,
  accentColor,
  textColor,
  headerTextColor,
  defaultImage,
  index,
}: SectionPanelProps) {
  const [galleryIdx, setGalleryIdx] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const bgImages = images.length > 0 ? images : [defaultImage];

  const iconKey = title.toLowerCase().includes("location")
    ? "mapPin"
    : title.toLowerCase().includes("culture") ||
        title.toLowerCase().includes("nightlife")
      ? "music"
      : title.toLowerCase().includes("gastronomy") ||
          title.toLowerCase().includes("food")
        ? "utensils"
        : "sparkles";
  const IconComponent = iconMap[iconKey] ?? Sparkles;

  // Section entrance: slide up from +40px with fade, respecting reduced motion
  const sectionInitial = shouldReduceMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 40 };
  const sectionAnimate = { opacity: 1, y: 0 };

  return (
    <motion.div
      initial={sectionInitial}
      whileInView={sectionAnimate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeInOut", delay: index * 0.1 }}
      className="overflow-hidden rounded-2xl shadow-lg"
      style={{ background: "rgba(255,255,255,0.97)" }}
      data-ocid={`experience-section-${id}`}
    >
      {/* Toggle header */}
      <motion.button
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
        onClick={onToggle}
        whileHover={shouldReduceMotion ? {} : { scale: 1.003 }}
        transition={{ duration: 0.2 }}
        aria-expanded={isExpanded}
        style={{
          background: isExpanded ? `${accentColor}10` : "transparent",
          border: "none",
        }}
      >
        <div className="flex min-w-0 items-center gap-4">
          <motion.div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: `${accentColor}20` }}
            animate={shouldReduceMotion ? {} : { scale: isExpanded ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <IconComponent className="h-6 w-6" style={{ color: accentColor }} />
          </motion.div>
          <div className="min-w-0">
            <h2
              className="truncate font-serif text-2xl font-light md:text-3xl"
              style={{ color: headerTextColor }}
            >
              {title}
            </h2>
            {!isExpanded && (
              <p
                className="mt-0.5 line-clamp-1 text-sm opacity-70"
                style={{ color: textColor }}
              >
                {description}
              </p>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.35 }}
        >
          <ChevronDown
            className="h-6 w-6 shrink-0"
            style={{ color: accentColor }}
          />
        </motion.div>
      </motion.button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div
              className="space-y-6 border-t px-6 pb-8 pt-6"
              style={{ borderColor: `${accentColor}20` }}
            >
              {/* Image gallery fades in first */}
              {bgImages.length > 0 && (
                <motion.div
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.98 }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05, duration: 0.45 }}
                  className="relative overflow-hidden rounded-xl"
                >
                  <div className="relative aspect-video overflow-hidden rounded-xl">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={galleryIdx}
                        src={bgImages[galleryIdx]}
                        alt={`${title} — view ${galleryIdx + 1}`}
                        className="h-full w-full object-cover"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        loading="lazy"
                        onError={(e) => {
                          const t = e.target as HTMLImageElement;
                          if (t.src !== defaultImage) t.src = defaultImage;
                        }}
                      />
                    </AnimatePresence>
                  </div>
                  {bgImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setGalleryIdx(
                            (i) => (i - 1 + bgImages.length) % bgImages.length,
                          )
                        }
                        className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110"
                        style={{ backgroundColor: `${accentColor}CC` }}
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-5 w-5 text-white" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setGalleryIdx((i) => (i + 1) % bgImages.length)
                        }
                        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110"
                        style={{ backgroundColor: `${accentColor}CC` }}
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-5 w-5 text-white" />
                      </button>
                      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                        {bgImages.map((imgUrl, dotIdx) => (
                          <button
                            type="button"
                            key={imgUrl}
                            onClick={() => setGalleryIdx(dotIdx)}
                            className="h-2 w-2 rounded-full transition-all"
                            style={{
                              backgroundColor:
                                dotIdx === galleryIdx
                                  ? accentColor
                                  : "rgba(255,255,255,0.6)",
                            }}
                            aria-label={`Go to image ${dotIdx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              {/* Text content fades in 200ms after image for sequential reveal */}
              <motion.p
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="text-lg leading-relaxed"
                style={{ color: textColor }}
              >
                {description}
              </motion.p>

              {/* Videos */}
              {videos.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className={`grid gap-4 ${videos.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}
                >
                  {videos.map((video) => (
                    <div
                      key={video}
                      className="overflow-hidden rounded-xl shadow-md"
                    >
                      <video
                        src={video}
                        controls
                        loop
                        className="h-full w-full"
                        style={{ maxHeight: "400px" }}
                      >
                        <track kind="captions" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Decorative Panel (subtle parallax background panel) ─────────────────────

function ParallaxPanel({
  children,
  backgroundImage,
  accentColor,
  className = "",
}: {
  children: React.ReactNode;
  backgroundImage?: string;
  accentColor: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Decorative panels scroll at 0.3x speed relative to viewport
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["-8%", "8%"],
  );

  if (!backgroundImage) {
    return (
      <div className={className} ref={ref}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 scale-110 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${backgroundImage})`, y }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-5"
        style={{ backgroundColor: accentColor }}
        aria-hidden="true"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ─── Map Section ──────────────────────────────────────────────────────────────

function MapSection({
  markers,
  accentColor,
  textColor,
  headerTextColor,
}: {
  markers: MapMarker[];
  accentColor: string;
  textColor: string;
  headerTextColor: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const visibleMarkers = markers.filter((m) => m.visible);

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="overflow-hidden rounded-2xl shadow-xl"
      data-ocid="experience-map"
    >
      <div
        className="px-6 pb-4 pt-6"
        style={{ background: "rgba(255,255,255,0.97)" }}
      >
        <div className="mb-4 flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: `${accentColor}20` }}
          >
            <MapIcon className="h-5 w-5" style={{ color: accentColor }} />
          </div>
          <div>
            <h2
              className="font-serif text-2xl font-light"
              style={{ color: headerTextColor }}
            >
              Palermo Hollywood
            </h2>
            <p className="text-sm opacity-70" style={{ color: textColor }}>
              Explore our neighborhood
            </p>
          </div>
        </div>
        {visibleMarkers.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {Array.from(new Set(visibleMarkers.map((m) => m.category))).map(
              (cat) => {
                const color = categoryColorMap[cat] ?? accentColor;
                return (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium"
                    style={{ backgroundColor: `${color}18`, color }}
                  >
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    {cat}
                  </span>
                );
              },
            )}
          </div>
        )}
      </div>

      <div style={{ height: "500px", width: "100%" }}>
        <MapContainer
          center={[-34.6037, -58.3816]}
          zoom={14}
          style={{ height: "500px", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {visibleMarkers.map((marker) => {
            const color = categoryColorMap[marker.category] ?? accentColor;
            return (
              <CircleMarker
                key={marker.id}
                center={[marker.lat, marker.lng]}
                radius={10}
                pathOptions={{
                  color: color,
                  fillColor: color,
                  fillOpacity: 0.8,
                  weight: 2,
                }}
              >
                <Popup>
                  <strong>{marker.name}</strong>
                  {marker.description && (
                    <>
                      <br />
                      {marker.description}
                    </>
                  )}
                  {marker.address && (
                    <>
                      <br />
                      <em>{marker.address}</em>
                    </>
                  )}
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>
    </motion.div>
  );
}

// ─── City Guide Entry Card ────────────────────────────────────────────────────

function CityGuideEntryCard({
  entry,
  catColor,
  headerTextColor,
  textColor,
  delay,
}: {
  entry: CityGuideEntry;
  catColor: string;
  headerTextColor: string;
  textColor: string;
  delay: number;
}) {
  const { data: imageUrl } = useFileUrl(entry.imageKey ?? "");
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="flex items-start gap-3 overflow-hidden rounded-xl border p-4"
      style={{ borderColor: `${catColor}20` }}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={entry.title}
          className="h-12 w-12 shrink-0 rounded-lg object-cover"
          loading="lazy"
        />
      )}
      <div className="min-w-0 flex-1">
        <h4
          className="mb-1 font-serif text-base font-medium leading-tight"
          style={{ color: headerTextColor }}
        >
          {entry.title}
        </h4>
        <p
          className="line-clamp-3 text-sm leading-relaxed opacity-75"
          style={{ color: textColor }}
        >
          {entry.description}
        </p>
        {entry.externalLink && (
          <a
            href={entry.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-xs font-medium transition-opacity hover:opacity-70"
            style={{ color: catColor }}
          >
            Explore <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ─── City Guide PDF Viewer (react-pdf) ───────────────────────────────────────

function CityGuidePdfViewer({
  pdfUrl,
  accentColor,
  textColor,
}: {
  pdfUrl: string;
  accentColor: string;
  textColor: string;
}) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(800);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const onLoadSuccess = useCallback(({ numPages: n }: { numPages: number }) => {
    setNumPages(n);
    setIsLoading(false);
  }, []);
  const onLoadError = useCallback(() => {
    setHasError(true);
    setIsLoading(false);
  }, []);

  if (hasError) {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <p className="text-sm opacity-60" style={{ color: textColor }}>
          Unable to display PDF in browser.
        </p>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-80"
          style={{
            backgroundColor: `${accentColor}18`,
            color: accentColor,
            border: `1px solid ${accentColor}40`,
          }}
        >
          <ExternalLink className="h-4 w-4" />
          Open PDF
        </a>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full">
      {isLoading && (
        <div
          className="flex h-48 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${accentColor}08` }}
        >
          <Loader2
            className="h-8 w-8 animate-spin"
            style={{ color: accentColor }}
          />
        </div>
      )}
      <div
        className={
          isLoading
            ? "opacity-0 transition-opacity duration-200 ease-in-out"
            : "opacity-100 transition-opacity duration-200 ease-in-out"
        }
      >
        <div
          style={{ minHeight: "600px" }}
          className="overflow-hidden relative"
        >
          <Document
            file={pdfUrl}
            onLoadSuccess={onLoadSuccess}
            onLoadError={onLoadError}
            loading={null}
          >
            <Page
              pageNumber={pageNumber}
              width={containerWidth}
              renderMode="canvas"
              renderAnnotationLayer
              renderTextLayer
              loading={
                <div className="flex justify-center py-8">
                  <Loader2 className="animate-spin h-8 w-8 text-gray-400" />
                </div>
              }
            />
            {pageNumber < numPages && (
              <Page
                pageNumber={pageNumber + 1}
                width={containerWidth}
                renderMode="canvas"
                className="hidden"
              />
            )}
          </Document>
        </div>
        {numPages > 1 && (
          <div className="mt-4 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
              disabled={pageNumber <= 1}
              className="flex h-8 w-8 items-center justify-center rounded-full border transition-opacity disabled:opacity-30 hover:opacity-70"
              style={{ borderColor: `${accentColor}40`, color: accentColor }}
              aria-label="Previous page"
              data-ocid="city-guide-pdf-prev"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm opacity-60" style={{ color: textColor }}>
              Page {pageNumber} of {numPages}
            </span>
            <button
              type="button"
              onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
              disabled={pageNumber >= numPages}
              className="flex h-8 w-8 items-center justify-center rounded-full border transition-opacity disabled:opacity-30 hover:opacity-70"
              style={{ borderColor: `${accentColor}40`, color: accentColor }}
              aria-label="Next page"
              data-ocid="city-guide-pdf-next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── City Guide PDF in Accordion ─────────────────────────────────────────────

function CityGuidePdfInAccordion({
  pdfKey,
  accentColor,
  textColor,
  headerTextColor,
}: {
  pdfKey: string;
  accentColor: string;
  textColor: string;
  headerTextColor: string;
}) {
  const { data: pdfUrl, isLoading } = useFileUrl(pdfKey);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!pdfUrl) return;
    setIsDownloading(true);
    try {
      const res = await fetch(pdfUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "city-guide.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Download failed", e);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!pdfUrl && !isLoading) return null;

  return (
    <div className="px-6 pb-8 pt-2">
      <div className="mb-3 flex items-center gap-2">
        <BookOpen className="h-4 w-4" style={{ color: accentColor }} />
        <span
          className="font-serif text-lg font-light"
          style={{ color: headerTextColor }}
        >
          City Guide PDF
        </span>
      </div>
      {isLoading ? (
        <div
          className="flex h-32 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${accentColor}08` }}
        >
          <Loader2
            className="h-6 w-6 animate-spin"
            style={{ color: accentColor }}
          />
        </div>
      ) : pdfUrl ? (
        <>
          <div
            className="w-full overflow-hidden rounded-xl border shadow-md"
            style={{ borderColor: `${accentColor}20` }}
            data-ocid="city-guide-pdf-viewer"
          >
            <CityGuidePdfViewer
              pdfUrl={pdfUrl}
              accentColor={accentColor}
              textColor={textColor}
            />
          </div>
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-80 disabled:opacity-60"
              style={{
                backgroundColor: `${accentColor}18`,
                color: accentColor,
                border: `1px solid ${accentColor}40`,
              }}
              data-ocid="city-guide-pdf-download"
            >
              {isDownloading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <BookOpen className="h-4 w-4" />
              )}
              Download City Guide
            </button>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open in new tab"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-opacity hover:opacity-70"
              style={{
                borderColor: `${accentColor}40`,
                color: accentColor,
              }}
              data-ocid="city-guide-pdf-open-tab"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </>
      ) : null}
    </div>
  );
}

// ─── City Guide ───────────────────────────────────────────────────────────────

function CityGuideSection({
  entries,
  accentColor,
  textColor,
  headerTextColor,
}: {
  entries: CityGuideEntry[];
  accentColor: string;
  textColor: string;
  headerTextColor: string;
}) {
  const [openCats, setOpenCats] = useState<Set<string>>(new Set());
  const shouldReduceMotion = useReducedMotion();

  const visible = entries.filter((e) => e.visible);
  const grouped = visible.reduce<Record<string, CityGuideEntry[]>>((acc, e) => {
    if (!acc[e.category]) acc[e.category] = [];
    acc[e.category].push(e);
    return acc;
  }, {});

  const toggle = (cat: string) => {
    setOpenCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  return (
    <motion.section
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="space-y-4"
      data-ocid="city-guide"
    >
      <div className="mb-10 text-center">
        <h2
          className="mb-3 font-serif text-3xl font-light md:text-4xl"
          style={{ color: headerTextColor }}
        >
          Discover Buenos Aires
        </h2>
        <div
          className="mx-auto h-0.5 w-16"
          style={{ backgroundColor: accentColor }}
        />
        <p className="mt-4 text-base opacity-70" style={{ color: textColor }}>
          Our curated guide to the best Palermo has to offer
        </p>
      </div>

      {visible.length === 0 ? (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl px-8 py-12 text-center shadow-sm"
          style={{ background: "rgba(255,255,255,0.97)" }}
          data-ocid="city-guide.empty_state"
        >
          <BookOpen
            className="mx-auto mb-4 h-10 w-10 opacity-30"
            style={{ color: accentColor }}
          />
          <p
            className="font-serif text-xl font-light opacity-50"
            style={{ color: headerTextColor }}
          >
            City guide coming soon
          </p>
          <p className="mt-2 text-sm opacity-40" style={{ color: textColor }}>
            Our curated recommendations will be available here shortly.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {Object.entries(grouped).map(([cat, items], catIdx) => {
            const isOpen = openCats.has(cat);
            const CatIcon = categoryIconMap[cat] ?? Compass;
            const catColor = categoryColorMap[cat] ?? accentColor;
            return (
              <motion.div
                key={cat}
                initial={
                  shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  delay: catIdx * 0.07,
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                className="overflow-hidden rounded-2xl shadow-sm"
                style={{ background: "rgba(255,255,255,0.97)" }}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                  onClick={() => toggle(cat)}
                  aria-expanded={isOpen}
                  data-ocid={`city-guide-cat-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  style={{ border: "none", background: "none" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${catColor}18` }}
                    >
                      <CatIcon
                        className="h-5 w-5"
                        style={{ color: catColor }}
                      />
                    </div>
                    <span
                      className="font-serif text-xl font-light"
                      style={{ color: headerTextColor }}
                    >
                      {cat}
                    </span>
                    <span
                      className="text-sm opacity-50"
                      style={{ color: textColor }}
                    >
                      ({items.length})
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown
                      className="h-5 w-5"
                      style={{ color: catColor }}
                    />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-3 px-6 pb-6 pt-2 sm:grid-cols-2">
                        {items.map((entry, ei) => (
                          <CityGuideEntryCard
                            key={entry.id}
                            entry={entry}
                            catColor={catColor}
                            headerTextColor={headerTextColor}
                            textColor={textColor}
                            delay={ei * 0.06}
                          />
                        ))}
                      </div>
                      {items.some((e) => e.pdfKey) && (
                        <CityGuidePdfInAccordion
                          pdfKey={items.find((e) => e.pdfKey)!.pdfKey!}
                          accentColor={accentColor}
                          textColor={textColor}
                          headerTextColor={headerTextColor}
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.section>
  );
}

// ─── Exclusive Service Card ───────────────────────────────────────────────────

function ExclusiveServiceCard({
  service,
  accentColor,
  textColor,
  headerTextColor,
  delay,
}: {
  service: ExclusiveService;
  accentColor: string;
  textColor: string;
  headerTextColor: string;
  delay: number;
}) {
  const { data: imageUrl } = useFileUrl(service.imageKey ?? "");
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay, duration: 0.45, ease: "easeInOut" }}
      whileHover={
        shouldReduceMotion
          ? {}
          : { y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }
      }
      className="group overflow-hidden rounded-2xl shadow-md transition-shadow duration-300"
      style={{ background: "rgba(255,255,255,0.97)" }}
      data-ocid={`service-card-${service.id}`}
    >
      {imageUrl && (
        <div className="aspect-video overflow-hidden">
          <img
            src={imageUrl}
            alt={service.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-5">
        <div className="mb-3 flex items-start gap-3">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: `${accentColor}18` }}
          >
            <Sparkles className="h-4 w-4" style={{ color: accentColor }} />
          </div>
          <div className="min-w-0">
            <h3
              className="font-serif text-lg font-light leading-tight"
              style={{ color: headerTextColor }}
            >
              {service.name}
            </h3>
            {service.category && (
              <Badge
                variant="outline"
                className="mt-0.5 text-xs"
                style={{
                  borderColor: `${accentColor}40`,
                  color: accentColor,
                }}
              >
                {service.category}
              </Badge>
            )}
          </div>
        </div>

        <p
          className="mb-3 text-sm leading-relaxed opacity-75"
          style={{ color: textColor }}
        >
          {service.description}
        </p>

        <div className="flex items-center justify-between gap-2">
          {service.priceInfo && (
            <span
              className="text-sm font-medium"
              style={{ color: accentColor }}
            >
              {service.priceInfo}
            </span>
          )}
          {service.requestLink && (
            <a
              href={service.requestLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto"
            >
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                style={{
                  borderColor: accentColor,
                  color: accentColor,
                }}
              >
                Inquire
              </Button>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ExclusiveServicesSection({
  services,
  accentColor,
  textColor,
  headerTextColor,
}: {
  services: ExclusiveService[];
  accentColor: string;
  textColor: string;
  headerTextColor: string;
}) {
  const visible = services.filter((s) => s.visible);
  const shouldReduceMotion = useReducedMotion();
  if (visible.length === 0) return null;

  return (
    <motion.section
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="pt-4"
      data-ocid="exclusive-services"
    >
      <div className="mb-10 text-center">
        <h2
          className="mb-3 font-serif text-3xl font-light md:text-4xl"
          style={{ color: headerTextColor }}
        >
          Exclusive Services
        </h2>
        <div
          className="mx-auto h-0.5 w-16"
          style={{ backgroundColor: accentColor }}
        />
        <p className="mt-4 text-base opacity-70" style={{ color: textColor }}>
          Bespoke experiences crafted for our guests
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((service, si) => (
          <ExclusiveServiceCard
            key={service.id}
            service={service}
            accentColor={accentColor}
            textColor={textColor}
            headerTextColor={headerTextColor}
            delay={si * 0.08}
          />
        ))}
      </div>
    </motion.section>
  );
}

// ─── Default sections fallback ────────────────────────────────────────────────

const DEFAULT_SECTIONS = [
  {
    id: "location",
    title: "Central Location",
    description:
      "In the heart of Palermo Hollywood, surrounded by culture and history. All major attractions are within walking distance.",
    images: ["/assets/generated/cultural-district-street.jpg"],
    videos: [],
    isActive: true,
    order: 0n,
    animationType: "fade",
    layout: "grid" as const,
  },
  {
    id: "culture",
    title: "Culture & Nightlife",
    description:
      "Experience tango shows, live music, and the vibrant nightlife of the Argentine capital.",
    images: ["/assets/generated/buenos-aires-sunset-skyline.jpg"],
    videos: [],
    isActive: true,
    order: 1n,
    animationType: "fade",
    layout: "grid" as const,
  },
  {
    id: "gastronomy",
    title: "Gastronomy",
    description:
      "Discover world-class restaurants, authentic parrillas, and exquisite wine bars in the immediate vicinity.",
    images: ["/assets/generated/lifestyle-wine-balcony.jpg"],
    videos: [],
    isActive: true,
    order: 2n,
    animationType: "fade",
    layout: "grid" as const,
  },
  {
    id: "exclusive",
    title: "Exclusive Services",
    description:
      "Personal concierge service, private city tours, and curated experiences for our guests.",
    images: ["/assets/generated/curated-living-space.jpg"],
    videos: [],
    isActive: true,
    order: 3n,
    animationType: "fade",
    layout: "grid" as const,
  },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ExperiencePage() {
  const { data: siteConfig } = useLiveSiteConfig();
  const { data: mapMarkers = [] } = useListLiveMapMarkers();
  const { data: cityGuideEntries = [] } = useListLiveCityGuideEntries();
  const { data: exclusiveServices = [] } = useListLiveExclusiveServices();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const textColor =
    siteConfig?.experiencePage?.textColor || siteConfig?.textColor || "#4A4A4A";
  const headerTextColor = siteConfig?.headerTextColor || "#1A1A1A";
  const accentColor = siteConfig?.accentColor || "#C9A84C";
  const backgroundColor =
    siteConfig?.experiencePage?.backgroundColor || "#F9F7F4";

  const highlights = useMemo(
    () =>
      (siteConfig?.experiencePage?.highlights || []).filter((h) => h.isActive),
    [siteConfig],
  );

  const activeSections = useMemo(() => {
    const cfg = siteConfig?.experiencePage?.sections || [];
    const sorted = cfg
      .filter((s) => s.isActive)
      .sort((a, b) => Number(a.order) - Number(b.order));
    return sorted.length > 0 ? sorted : DEFAULT_SECTIONS;
  }, [siteConfig]);

  const defaultImage = "/assets/generated/hero-apartment-interior.jpg";
  const heroImage =
    siteConfig?.experiencePage?.backgroundImage ||
    siteConfig?.defaultExperienceImage ||
    "/assets/generated/cultural-district-street.jpg";
  const { data: heroImageUrl } = useFileUrl(heroImage ?? "");
  const title = siteConfig?.experiencePage?.title || "The Aura Experience";
  const description =
    siteConfig?.experiencePage?.description ||
    "More than just accommodation – a world-class lifestyle experience";

  useEffect(() => {
    if (siteConfig) {
      document.body.style.backgroundColor = backgroundColor;
      document.documentElement.style.setProperty(
        "--dynamic-text-color",
        textColor,
      );
      document.documentElement.style.setProperty(
        "--dynamic-header-color",
        headerTextColor,
      );
      document.documentElement.style.setProperty(
        "--dynamic-accent-color",
        accentColor,
      );
    }
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [siteConfig, backgroundColor, textColor, headerTextColor, accentColor]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" as const },
    },
  };

  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ backgroundColor }}>
        <ParallaxHero
          title={title}
          description={description}
          backgroundImage={heroImageUrl ?? heroImage}
          accentColor={accentColor}
        />

        <div className="container mx-auto space-y-16 px-4 py-16">
          {/* Highlights — staggered fade-in */}
          {highlights.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
              data-ocid="highlights-grid"
            >
              {highlights.map((h) => {
                const IconComponent = iconMap[h.icon] ?? Sparkles;
                return (
                  <motion.div
                    key={h.id}
                    variants={itemVariants}
                    className="group rounded-2xl p-6 text-center shadow-sm transition-shadow hover:shadow-lg"
                    style={{ background: "rgba(255,255,255,0.97)" }}
                  >
                    <div
                      className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${accentColor}18` }}
                    >
                      <IconComponent
                        className="h-7 w-7"
                        style={{ color: accentColor }}
                      />
                    </div>
                    <h3
                      className="mb-2 font-serif text-lg font-light"
                      style={{ color: headerTextColor }}
                    >
                      {h.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed opacity-75"
                      style={{ color: textColor }}
                    >
                      {h.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Expandable Experience Sections */}
          <div className="space-y-4" data-ocid="experience-sections">
            {activeSections.map((section, i) => (
              <SectionPanel
                key={section.id}
                id={section.id}
                title={section.title}
                description={section.description}
                images={section.images}
                videos={section.videos}
                isExpanded={expandedSection === section.id}
                onToggle={() =>
                  setExpandedSection(
                    expandedSection === section.id ? null : section.id,
                  )
                }
                accentColor={accentColor}
                textColor={textColor}
                headerTextColor={headerTextColor}
                defaultImage={defaultImage}
                index={i}
              />
            ))}
          </div>

          {/* Interactive Map */}
          <MapSection
            markers={mapMarkers}
            accentColor={accentColor}
            textColor={textColor}
            headerTextColor={headerTextColor}
          />

          {/* City Guide — with subtle decorative parallax panel */}
          <ParallaxPanel
            backgroundImage="/assets/generated/buenos-aires-sunset-skyline.jpg"
            accentColor={accentColor}
            className="rounded-3xl py-2"
          >
            <CityGuideSection
              entries={cityGuideEntries}
              accentColor={accentColor}
              textColor={textColor}
              headerTextColor={headerTextColor}
            />
          </ParallaxPanel>

          {/* Exclusive Services */}
          <ExclusiveServicesSection
            services={exclusiveServices}
            accentColor={accentColor}
            textColor={textColor}
            headerTextColor={headerTextColor}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
