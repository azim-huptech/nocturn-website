import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Coffee } from 'lucide-react';

const words = ['An', 'Elevated', 'Coffee'];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yProduct = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden"
    >
      {/* Decorative background text */}
      <motion.div
        style={{ y: bgY }}
        aria-hidden="true"
        className="absolute -top-10 right-[-6%] text-[18rem] xl:text-[22rem] font-display font-extrabold text-espresso/[0.04] select-none pointer-events-none hidden lg:block"
      >
        NOCTURN
      </motion.div>

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-32 left-10 w-32 h-32 rounded-full bg-terracotta/10 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-gold/10 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-12 items-center">
        {/* Left */}
        <motion.div style={{ y: yText, opacity }} className="lg:col-span-7 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <motion.span
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2.5 h-2.5 rounded-full bg-terracotta"
            />
            <span className="eyebrow text-espresso/70">Portland, OR — Est. 2017</span>
          </motion.div>

          <h1 className="headline text-[3.2rem] sm:text-7xl lg:text-[6.2rem] font-extrabold text-espresso">
            {words.map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
                className="inline-block mr-4"
              >
                {w}
              </motion.span>
            ))}
            <br />
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative inline-block"
            >
              <span className="italic-serif text-terracotta">Experience</span>
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 1.1, ease: 'easeInOut' }}
                className="absolute left-0 -bottom-2 w-full"
                viewBox="0 0 300 12"
                fill="none"
              >
                <motion.path
                  d="M2 8 C 60 2, 160 12, 298 4"
                  stroke="#C84B20"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 1.1 }}
                />
              </motion.svg>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-8 max-w-xl text-lg text-espresso/70 leading-relaxed"
          >
            Small-batch, single-origin beans from farmers we actually know. Roasted this week in Portland. On your doorstep by Friday.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a href="#collections" className="btn-primary">
              <ArrowRight className="w-4 h-4" /> Shop the Range
            </a>
            <a href="#about" className="btn-ghost">
              <Play className="w-4 h-4" /> Our Story
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="mt-14 grid grid-cols-3 gap-4 max-w-lg"
          >
            {[
              { n: '47', l: 'Farmer\nPartners' },
              { n: '6', suf: 'd', l: 'Avg. Bean\nto Doorstep' },
              { n: '4.9', suf: '★', l: 'From 12,400\nReviews' },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                whileHover={{ y: -6 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 + i * 0.1 }}
              >
                <div className="font-display font-extrabold text-3xl text-espresso">
                  {s.n}
                  {s.suf && <span className="text-terracotta">{s.suf}</span>}
                </div>
                <div className="text-xs text-espresso/60 uppercase tracking-wider mt-1 whitespace-pre-line">
                  {s.l}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — product */}
        <motion.div style={{ y: yProduct }} className="lg:col-span-5 relative flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative w-[320px] sm:w-[400px] lg:w-[460px] aspect-square"
          >
            {/* Circular backdrop */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full bg-gradient-to-br from-terracotta via-terracotta-2 to-espresso"
            />
            <div className="absolute inset-6 rounded-full border-2 border-dashed border-cream/40" />

            {/* Cup svg */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 flex items-center justify-center -mt-6 sm:-mt-10"
            >
              <svg
                viewBox="0 0 240 240"
                className="w-[72%] drop-shadow-[0_30px_40px_rgba(0,0,0,0.4)]"
              >
                <g opacity="0.7" stroke="#F9F6EE" strokeWidth="4" strokeLinecap="round" fill="none">
                  <path className="animate-steam" d="M100 60 Q 95 45 105 30 Q 115 15 100 0" />
                  <path className="animate-steam [animation-delay:1.2s]" d="M120 60 Q 115 45 125 30 Q 135 15 120 0" />
                  <path className="animate-steam [animation-delay:2.4s]" d="M140 60 Q 135 45 145 30 Q 155 15 140 0" />
                </g>
                <ellipse cx="120" cy="210" rx="92" ry="12" fill="#2A1109" />
                <path d="M50 90 L62 200 Q65 215 80 215 L160 215 Q175 215 178 200 L190 90 Z" fill="#F9F6EE" />
                <ellipse cx="120" cy="92" rx="70" ry="12" fill="#3C1B10" />
                <ellipse cx="120" cy="90" rx="68" ry="10" fill="#5A2E1C" />
                <path d="M60 100 L70 180" stroke="#E6DFCF" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                <path d="M190 110 Q 220 115 220 150 Q 220 185 185 185" stroke="#F9F6EE" strokeWidth="12" fill="none" strokeLinecap="round" />
                <text x="120" y="160" textAnchor="middle" fontFamily="Commissioner, sans-serif" fontWeight="700" fontSize="22" fill="#3C1B10">N°</text>
              </svg>
            </motion.div>

            {/* Floating beans */}
            <motion.svg
              animate={{ y: [0, -18, 0], rotate: [0, 12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-6 left-2 w-10 h-10"
              viewBox="0 0 40 40"
            >
              <ellipse cx="20" cy="20" rx="10" ry="16" fill="#3C1B10" transform="rotate(-20 20 20)" />
              <path d="M20 6 Q 24 20 20 34" stroke="#F9F6EE" strokeWidth="1.4" fill="none" transform="rotate(-20 20 20)" />
            </motion.svg>
            <motion.svg
              animate={{ y: [0, -22, 0], rotate: [0, -14, 0] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-10 -right-2 w-14 h-14"
              viewBox="0 0 40 40"
            >
              <ellipse cx="20" cy="20" rx="10" ry="16" fill="#3C1B10" transform="rotate(30 20 20)" />
              <path d="M20 6 Q 24 20 20 34" stroke="#F9F6EE" strokeWidth="1.4" fill="none" transform="rotate(30 20 20)" />
            </motion.svg>
            <motion.svg
              animate={{ y: [0, 14, 0], rotate: [0, -8, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-20 -right-6 w-8 h-8"
              viewBox="0 0 40 40"
            >
              <ellipse cx="20" cy="20" rx="10" ry="16" fill="#3C1B10" transform="rotate(-45 20 20)" />
              <path d="M20 6 Q 24 20 20 34" stroke="#F9F6EE" strokeWidth="1.4" fill="none" transform="rotate(-45 20 20)" />
            </motion.svg>

            {/* Spinning badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
              className="absolute -top-4 -left-6 sm:-top-6 sm:-left-10 w-28 h-28 sm:w-36 sm:h-36 bg-cream rounded-full grid place-content-center shadow-xl"
              style={{ filter: 'drop-shadow(0 10px 20px rgba(60,27,16,0.25))' }}
            >
              <div className="relative">
                <motion.svg
                  animate={{ rotate: 360 }}
                  transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 100"
                >
                  <defs>
                    <path id="circle" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
                  </defs>
                  <text fontFamily="Commissioner, sans-serif" fontSize="10" fontWeight="700" fill="#3C1B10" letterSpacing="2">
                    <textPath href="#circle">SINGLE ORIGIN • ETHIOPIA • SMALL BATCH •</textPath>
                  </text>
                </motion.svg>
                <div className="w-14 h-14 sm:w-16 sm:h-16 grid place-content-center">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 text-terracotta" fill="currentColor">
                    <path d="M12 2 L14 9 L21 9 L15.5 13 L17.5 20 L12 16 L6.5 20 L8.5 13 L3 9 L10 9 Z" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Price tag */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.7 }}
              whileHover={{ y: -4, scale: 1.03 }}
              className="absolute -bottom-6 right-2 sm:right-6 bg-cream rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-espresso/5 cursor-pointer"
              data-cursor-hover
            >
              <div className="w-10 h-10 rounded-full bg-terracotta grid place-content-center">
                <Coffee className="w-5 h-5 text-cream" />
              </div>
              <div>
                <div className="text-[0.65rem] uppercase tracking-wider text-espresso/60 font-semibold">
                  Ethiopia Yirgacheffe
                </div>
                <div className="font-display font-bold text-espresso">
                  $22<span className="text-xs font-sans text-espresso/60">/12oz</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden lg:flex absolute bottom-4 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-espresso/50">
        <span className="eyebrow text-[0.6rem]">Scroll</span>
        <div className="w-px h-10 bg-espresso/30 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-4 bg-terracotta scroll-indicator" />
        </div>
      </div>
    </section>
  );
}
