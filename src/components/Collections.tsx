import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, MouseEvent } from 'react';
import { ArrowRight, ArrowUpRight, Flame, MapPin, Sparkles } from 'lucide-react';

type Card = {
  title: string;
  tag: string;
  tagColor: string;
  desc: string;
  price: string;
  img: string;
  dark?: boolean;
};

const cards: Card[] = [
  {
    title: 'Midnight Series',
    tag: 'Dark Roast',
    tagColor: 'bg-cream text-espresso',
    desc: 'Deep, syrupy, built for espresso. Notes of dark chocolate, molasses, toasted walnut.',
    price: 'From $24',
    img: 'https://images.unsplash.com/photo-1583165278997-0250ea5d72e2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Daybreak Blend',
    tag: 'Most Loved',
    tagColor: 'bg-cream text-espresso',
    desc: 'A medium roast built for the first cup. Honey, stone fruit, a clean caramel finish.',
    price: 'From $22',
    img: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1200&q=80',
    dark: true,
  },
  {
    title: 'Autumn Reserve',
    tag: 'Seasonal',
    tagColor: 'bg-terracotta text-cream',
    desc: 'Natural-process Ethiopian lots. Blueberry, jasmine, a long syrupy finish. Limited.',
    price: 'From $28',
    img: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80',
  },
];

const features = [
  { icon: Flame, title: 'Roast Profiles', desc: 'Every bag ships with the exact profile — curve, drop temp, development time. No mystery.' },
  { icon: MapPin, title: 'Sourcing, Open Book', desc: 'FOB price, farmer name, elevation, and processing method printed on every bag. Always.' },
  { icon: Sparkles, title: 'Seasonal Drops', desc: 'New micro-lots every eight weeks. Subscribers get first access — plus 10% off.' },
];

function TiltCard({ card }: { card: Card }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-50, 50], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-50, 50], [-8, 8]), { stiffness: 200, damping: 20 });

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      data-reveal
      data-cursor-hover
      className={`rounded-3xl p-8 flex flex-col ${
        card.dark ? 'bg-espresso text-cream' : 'bg-cream border border-espresso/5'
      }`}
    >
      <div className="relative h-56 mb-6 rounded-2xl overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6 }}
          src={card.img}
          className={`w-full h-full object-cover ${card.dark ? 'mix-blend-luminosity opacity-90' : ''}`}
          alt={card.title}
        />
        <span className={`absolute top-4 left-4 ${card.tagColor} text-xs font-semibold px-3 py-1.5 rounded-full`}>
          {card.tag}
        </span>
      </div>
      <h3 className={`headline text-2xl font-extrabold ${card.dark ? '' : 'text-espresso'}`}>{card.title}</h3>
      <p className={`mt-3 text-sm leading-relaxed flex-1 ${card.dark ? 'text-cream/70' : 'text-espresso/70'}`}>
        {card.desc}
      </p>
      <div className="mt-6 flex items-center justify-between">
        <span className={`font-display font-bold text-xl ${card.dark ? '' : 'text-espresso'}`}>{card.price}</span>
        <motion.button
          whileHover={{ rotate: -45 }}
          className={`w-10 h-10 rounded-full grid place-content-center ${
            card.dark
              ? 'bg-terracotta text-cream hover:bg-cream hover:text-espresso'
              : 'bg-espresso text-cream hover:bg-terracotta'
          } transition-colors`}
        >
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.article>
  );
}

export default function Collections() {
  return (
    <section id="collections" className="py-24 lg:py-32 bg-cream-2/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div
          data-reveal
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16"
        >
          <div>
            <span className="eyebrow text-terracotta">Collections</span>
            <h2 className="headline text-5xl lg:text-6xl font-extrabold mt-3 text-espresso max-w-2xl">
              Three ways in.
              <br />
              All the <span className="italic-serif text-terracotta">good stuff</span>.
            </h2>
          </div>
          <a href="#" className="link-underline font-semibold text-espresso inline-flex items-center gap-2 self-start">
            Browse all 24 roasts <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6" style={{ perspective: 1200 }}>
          {cards.map((c) => (
            <TiltCard key={c.title} card={c} />
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-10 mt-24">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-14 h-14 rounded-2xl bg-terracotta/10 text-terracotta grid place-content-center mb-5"
              >
                <f.icon className="w-6 h-6" />
              </motion.div>
              <h4 className="headline font-extrabold text-xl text-espresso mb-2">{f.title}</h4>
              <p className="text-espresso/70 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
