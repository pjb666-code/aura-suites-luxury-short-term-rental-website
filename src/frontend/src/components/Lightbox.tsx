import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

interface LightboxProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({
  images,
  initialIndex,
  onClose,
}: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);

  const prev = useCallback(() => {
    setCurrent((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent((i) => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, prev, next]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const hasMultiple = images.length > 1;

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
        onClick={onClose}
        data-ocid="lightbox.dialog"
      >
        {/* Counter */}
        {hasMultiple && (
          <div
            className="absolute left-4 top-4 rounded px-3 py-1 text-sm font-medium text-white/80"
            style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
          >
            {current + 1} / {images.length}
          </div>
        )}

        {/* Close button */}
        <button
          type="button"
          aria-label="Close lightbox"
          data-ocid="lightbox.close_button"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left arrow */}
        {hasMultiple && (
          <button
            type="button"
            aria-label="Previous image"
            data-ocid="lightbox.prev_button"
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {/* Right arrow */}
        {hasMultiple && (
          <button
            type="button"
            aria-label="Next image"
            data-ocid="lightbox.next_button"
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}

        {/* Main image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current]}
            alt={`Gallery view ${current + 1} of ${images.length}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="max-h-[85vh] max-w-[90vw] select-none object-contain"
            style={{ pointerEvents: "none" }}
            onClick={(e) => e.stopPropagation()}
          />
        </AnimatePresence>

        {/* Dot indicators */}
        {hasMultiple && (
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                data-ocid={`lightbox.dot.${i + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent(i);
                }}
                className="h-2 w-2 rounded-full transition-all"
                style={{
                  backgroundColor:
                    i === current ? "white" : "rgba(255,255,255,0.35)",
                  width: i === current ? "1.5rem" : "0.5rem",
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
