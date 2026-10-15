import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';

const links = [
  { href: '#about', label: 'About' },
  { href: '#collections', label: 'Collections' },
  { href: '#brew', label: 'Brew' },
  { href: '#locations', label: 'Locations' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${scrolled ? 'nav-scrolled' : ''}`}
      >
        <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2 group">
            <motion.span
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              className="w-9 h-9 rounded-full bg-espresso text-cream grid place-content-center font-display font-bold text-sm group-hover:bg-terracotta transition-colors"
            >
              N°
            </motion.span>
            <span className="font-display font-bold tracking-tight text-espresso text-lg">Nocturn</span>
          </a>

          <ul className="hidden md:flex items-center gap-9 text-[0.95rem] font-medium text-espresso">
            {links.map((l, i) => (
              <motion.li
                key={l.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
              >
                <a href={l.href} className="link-underline">
                  {l.label}
                </a>
              </motion.li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a href="#collections" className="btn-primary text-sm hidden sm:inline-flex">
              <ShoppingBag className="w-4 h-4" />
              Buy
            </a>
            <button
              onClick={() => setOpen(true)}
              className="md:hidden w-11 h-11 grid place-content-center rounded-full border border-espresso/20"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-espresso" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/50 md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
              className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-cream p-7 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-display font-bold text-lg text-espresso">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  className="w-10 h-10 grid place-content-center rounded-full border border-espresso/20"
                >
                  <X className="w-5 h-5 text-espresso" />
                </button>
              </div>
              <ul className="flex flex-col gap-5 font-display font-bold text-3xl text-espresso">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                  >
                    <a onClick={() => setOpen(false)} href={l.href}>
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a
                onClick={() => setOpen(false)}
                href="#collections"
                className="btn-primary mt-auto justify-center"
              >
                <ShoppingBag className="w-4 h-4" /> Shop the Range
              </a>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
