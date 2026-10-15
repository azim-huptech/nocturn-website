import { motion } from 'framer-motion';

const images = [
  { src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80', alt: 'Latte art', className: 'col-span-2 row-span-2 aspect-square' },
  { src: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80', alt: 'Beans in hand', className: 'aspect-square' },
  { src: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80', alt: 'Pour over', className: 'aspect-square' },
  { src: 'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?auto=format&fit=crop&w=800&q=80', alt: 'Espresso shot', className: 'aspect-square' },
  { src: 'https://images.unsplash.com/photo-1442550528053-c431ecb55509?auto=format&fit=crop&w=800&q=80', alt: 'Roaster', className: 'aspect-square' },
  { src: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1600&q=80', alt: 'Cafe interior', className: 'col-span-2 aspect-[2/1]' },
  { src: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=800&q=80', alt: 'Grinder', className: 'aspect-square' },
];

export default function Gallery() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div data-reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <span className="eyebrow text-terracotta">The Craft</span>
            <h2 className="headline text-5xl lg:text-6xl font-extrabold mt-3 text-espresso max-w-xl">
              From green bean to <span className="italic-serif text-terracotta">last sip</span>.
            </h2>
          </div>
          <p className="text-espresso/70 max-w-sm">
            A look inside the roastery, the farms, and the hands that touch every bag.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {images.map((im, i) => (
            <motion.div
              key={im.src}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.08, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              className={`gallery-item ${im.className}`}
              data-cursor-hover
            >
              <img src={im.src} alt={im.alt} loading="lazy" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
