import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Check } from 'lucide-react';

const bullets = [
  { b: 'Direct trade only.', r: 'We know every farm by name.' },
  { b: 'Roasted Tuesday.', r: 'Shipped Wednesday. On your table by Friday.' },
  { b: 'Compostable bags.', r: 'Even the valve.' },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 0.95]);
  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section id="about" className="py-24 lg:py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-16 items-center">
        <motion.div data-reveal className="relative">
          <div className="relative overflow-hidden rounded-3xl aspect-[4/5]">
            <motion.img
              style={{ scale: imgScale, y: imgY }}
              src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=1200&q=80"
              alt="Barista pouring coffee"
              className="w-full h-full object-cover"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -4 }}
            className="absolute -bottom-6 -right-6 bg-cream rounded-2xl p-5 shadow-xl max-w-[240px] border border-espresso/5"
            data-cursor-hover
          >
            <div className="flex -space-x-2 mb-3">
              {[12, 32, 47].map((n) => (
                <img
                  key={n}
                  className="w-9 h-9 rounded-full border-2 border-cream"
                  src={`https://i.pravatar.cc/80?img=${n}`}
                  alt=""
                />
              ))}
            </div>
            <p className="text-sm text-espresso/70">
              <span className="font-bold text-espresso">12,000+</span> subscribers hooked on Friday deliveries.
            </p>
          </motion.div>

          {/* Floating decorative bean */}
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-8 -left-8 w-16 h-16 bg-terracotta rounded-full grid place-content-center shadow-xl"
          >
            <svg viewBox="0 0 40 40" className="w-10 h-10">
              <ellipse cx="20" cy="20" rx="10" ry="16" fill="#F9F6EE" transform="rotate(-20 20 20)" />
              <path d="M20 6 Q 24 20 20 34" stroke="#C84B20" strokeWidth="1.6" fill="none" transform="rotate(-20 20 20)" />
            </svg>
          </motion.div>
        </motion.div>

        <div data-reveal>
          <span className="eyebrow text-terracotta">Our Story</span>
          <h2 className="headline text-5xl lg:text-6xl font-extrabold mt-4 text-espresso">
            Coffee as it <span className="italic-serif text-terracotta">should</span> be.
          </h2>
          <p className="mt-6 text-lg text-espresso/70 leading-relaxed">
            We started Nocturn out of a garage in Southeast Portland because the specialty scene felt gatekept.
            Nine years in, we're still obsessed with the same thing: pulling the best flavor out of every bean we touch —
            and paying the farmers who grew them a wage that reflects that.
          </p>

          <ul className="mt-8 space-y-4">
            {bullets.map((it, i) => (
              <motion.li
                key={it.b}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-terracotta/15 text-terracotta grid place-content-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span className="text-espresso/80">
                  <strong className="text-espresso">{it.b}</strong> {it.r}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
