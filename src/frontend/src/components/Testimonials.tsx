import type { Testimonial } from "@/backend";
import { useActor } from "@/hooks/useActor";
import { useQuery } from "@tanstack/react-query";
import { Quote, Star } from "lucide-react";
import { motion } from "motion/react";

function useLiveTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery<Testimonial[]>({
    queryKey: ["liveTestimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listLiveTestimonials();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

type DisplayTestimonial = {
  id: string;
  name: string;
  text: string;
  stars: number;
  date?: string;
};

const FALLBACK_TESTIMONIALS: DisplayTestimonial[] = [
  {
    id: "fallback-1",
    name: "Sophie M.",
    text: "An absolutely stunning apartment in the heart of Palermo Hollywood. The art on the walls and the thoughtful design made our stay truly special. We felt like we were living in a gallery.",
    stars: 5,
    date: "March 2025",
  },
  {
    id: "fallback-2",
    name: "James & Lena R.",
    text: "Aura Suites exceeded every expectation. The space is immaculate, the location is perfect, and the personal concierge service made us feel like VIPs from the moment we arrived.",
    stars: 5,
    date: "February 2025",
  },
  {
    id: "fallback-3",
    name: "Carlos V.",
    text: "We have stayed in many luxury apartments around the world, but Aura Suites is something different. The fusion of contemporary art and high-end comfort is extraordinary.",
    stars: 5,
    date: "January 2025",
  },
];

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${stars} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`h-4 w-4 ${s <= stars ? "fill-luxury-gold text-luxury-gold" : "fill-white/10 text-white/10"}`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: { testimonial: DisplayTestimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex flex-col rounded-xl border border-luxury-gold/20 bg-luxury-dark/80 p-7 shadow-lg backdrop-blur"
    >
      <Quote
        className="absolute right-5 top-5 h-8 w-8 text-luxury-gold/10"
        aria-hidden="true"
      />
      <StarRating stars={testimonial.stars} />
      <p className="mt-4 flex-1 text-sm leading-relaxed text-white/80 italic">
        "{testimonial.text}"
      </p>
      <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-luxury-gold/20 text-sm font-semibold text-luxury-gold">
          {testimonial.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-sm font-medium text-white">{testimonial.name}</p>
          {testimonial.date && (
            <p className="text-xs text-white/40">{testimonial.date}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const { data: testimonials = [] } = useLiveTestimonials();
  const liveVisible: DisplayTestimonial[] = testimonials
    .filter((t) => t.visible)
    .sort((a, b) => Number(a.sortOrder) - Number(b.sortOrder))
    .map((t) => ({
      id: t.id,
      name: t.name,
      text: t.text,
      stars: Number(t.stars),
      date: t.date || undefined,
    }));

  const displayItems =
    liveVisible.length > 0 ? liveVisible : FALLBACK_TESTIMONIALS;

  return (
    <section className="bg-luxury-dark py-20" id="testimonials">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-luxury-gold">
            Guest Experiences
          </p>
          <h2 className="font-serif text-3xl font-light text-white md:text-4xl">
            What Our Guests Say
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayItems.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
