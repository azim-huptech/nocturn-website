import { motion } from 'framer-motion';
import { ArrowRight, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="espresso-section pt-20 pb-10 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[16rem] md:text-[22rem] font-display font-extrabold text-cream/[0.04] select-none pointer-events-none whitespace-nowrap"
      >
        NOCTURN
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid md:grid-cols-5 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <motion.span
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 rounded-full bg-terracotta grid place-content-center font-display font-bold"
              >
                N°
              </motion.span>
              <span className="font-display font-bold text-xl">Nocturn Coffee</span>
            </div>
            <p className="mt-5 text-cream/70 max-w-sm text-sm leading-relaxed">
              Small-batch roasters shipping single-origin coffee across the US since 2017.
            </p>
            <form className="mt-6 flex gap-2 max-w-sm" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email for the Friday drop"
                className="flex-1 bg-cream/10 border border-cream/20 rounded-full px-5 py-3 text-sm placeholder:text-cream/50 focus:outline-none focus:border-terracotta text-cream"
              />
              <motion.button
                whileHover={{ scale: 1.08, rotate: -10 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-12 h-12 rounded-full bg-terracotta hover:bg-terracotta-2 grid place-content-center flex-shrink-0 transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </form>
          </div>

          <div>
            <h5 className="eyebrow text-cream/60 mb-5">Buy</h5>
            <ul className="space-y-3 text-cream/80 text-sm">
              {['Whole Bean', 'Ground', 'Subscriptions', 'Gift Cards'].map((t) => (
                <li key={t}>
                  <a href="#" className="hover:text-terracotta transition-colors">
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="eyebrow text-cream/60 mb-5">Company</h5>
            <ul className="space-y-3 text-cream/80 text-sm">
              <li><a href="#about" className="hover:text-terracotta transition-colors">About</a></li>
              <li><a href="#locations" className="hover:text-terracotta transition-colors">Locations</a></li>
              <li><a href="#" className="hover:text-terracotta transition-colors">Wholesale</a></li>
              <li><a href="#" className="hover:text-terracotta transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h5 className="eyebrow text-cream/60 mb-5">Hours</h5>
            <ul className="space-y-2 text-cream/80 text-sm">
              <li className="flex justify-between"><span>Mon — Fri</span><span>7a — 6p</span></li>
              <li className="flex justify-between"><span>Saturday</span><span>8a — 6p</span></li>
              <li className="flex justify-between"><span>Sunday</span><span>8a — 4p</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-cream/60 text-sm">© 2026 Nocturn Coffee Roasters. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {[
              { Icon: Instagram, label: 'Instagram' },
              { Icon: Twitter, label: 'Twitter' },
              { Icon: Facebook, label: 'Facebook' },
              { Icon: Youtube, label: 'YouTube' },
            ].map(({ Icon, label }) => (
              <motion.a
                key={label}
                href="#"
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={label}
                className="w-10 h-10 rounded-full border border-cream/20 grid place-content-center hover:bg-terracotta hover:border-terracotta transition-colors"
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
