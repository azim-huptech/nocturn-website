import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const quotes = [
  {
    q: "Nocturn ruined every other bag of coffee for me. Tuesday roast, Friday brew. That's it. That's the pitch.",
    name: 'Priya Mehta',
    role: 'Food & Wine, 2025',
    img: 'https://i.pravatar.cc/120?img=15',
  },
  {
    q: "The Autumn Reserve tastes like blueberry pie. I don't know how else to say it. Nocturn is doing something different.",
    name: 'James Okafor',
    role: 'Sprudge, 2025',
    img: 'https://i.pravatar.cc/120?img=56',
  },
  {
    q: "The best subscription coffee in America — hands down. Transparent sourcing, pristine roasts, and bags that actually compost.",
    name: 'Lena Kowalski',
    role: 'Bon Appétit, 2024',
    img: 'https://i.pravatar.cc/120?img=23',
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % quotes.length), 7000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setI((p) => (p - 1 + quotes.length) % quotes.length);
  const next = () => setI((p) => (p + 1) % quotes.length);
  const cur = quotes[i];

  return (
    <section className="espresso-section py-20 lg:py-28 overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center">
        <Quote className="w-10 h-10 mx-auto text-terracotta mb-6" />

        <div className="relative min-h-[280px] md:min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <p className="headline text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
                "{cur.q}"
              </p>

              <div className="mt-10 flex items-center justify-center gap-3">
                <img className="w-12 h-12 rounded-full" src={cur.img} alt={cur.name} />
                <div className="text-left">
                  <div className="font-semibold">{cur.name}</div>
                  <div className="text-cream/60 text-sm">{cur.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={prev}
            className="w-11 h-11 rounded-full border border-cream/20 grid place-content-center hover:bg-terracotta hover:border-terracotta transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <div className="flex gap-2">
            {quotes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === i ? 'bg-terracotta w-8' : 'bg-cream/30 w-2'
                }`}
                aria-label={`Go to quote ${idx + 1}`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={next}
            className="w-11 h-11 rounded-full border border-cream/20 grid place-content-center hover:bg-terracotta hover:border-terracotta transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
