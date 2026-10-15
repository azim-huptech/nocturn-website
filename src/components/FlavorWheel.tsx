import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

type Flavor = {
  key: string;
  label: string;
  color: string;
  notes: string[];
  pairing: string;
  origin: string;
};

const flavors: Flavor[] = [
  {
    key: 'fruity',
    label: 'Fruity',
    color: '#C84B20',
    notes: ['Blueberry', 'Jasmine', 'Peach', 'Red Apple'],
    pairing: 'Croissant · soft cheese',
    origin: 'Ethiopia Yirgacheffe · Natural',
  },
  {
    key: 'nutty',
    label: 'Nutty',
    color: '#A83C15',
    notes: ['Hazelnut', 'Almond', 'Toasted Walnut', 'Peanut Butter'],
    pairing: 'Dark chocolate · banana bread',
    origin: 'Brazil Cerrado · Pulped Natural',
  },
  {
    key: 'chocolate',
    label: 'Chocolate',
    color: '#3C1B10',
    notes: ['Dark Cocoa', 'Molasses', 'Fudge', 'Brown Sugar'],
    pairing: 'Espresso · tiramisu',
    origin: 'Colombia Huila · Washed',
  },
  {
    key: 'floral',
    label: 'Floral',
    color: '#D4A574',
    notes: ['Bergamot', 'Rose', 'Honeysuckle', 'Earl Grey'],
    pairing: 'Shortbread · fresh berries',
    origin: 'Kenya Nyeri · Washed',
  },
  {
    key: 'citrus',
    label: 'Citrus',
    color: '#E8A838',
    notes: ['Lemon', 'Grapefruit', 'Orange Zest', 'Lime'],
    pairing: 'Lemon tart · yogurt',
    origin: 'Guatemala Antigua · Washed',
  },
  {
    key: 'spice',
    label: 'Spice',
    color: '#8A3A14',
    notes: ['Clove', 'Cinnamon', 'Cardamom', 'Black Pepper'],
    pairing: 'Oat cookies · masala chai',
    origin: 'Indonesia Sumatra · Wet-Hulled',
  },
];

export default function FlavorWheel() {
  const [active, setActive] = useState<Flavor>(flavors[0]);

  const r = 110;
  const cx = 150;
  const cy = 150;
  const sliceAngle = 360 / flavors.length;

  const polarToCartesian = (angle: number, radius: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  };

  const slicePath = (i: number) => {
    const start = i * sliceAngle;
    const end = (i + 1) * sliceAngle;
    const p1 = polarToCartesian(start, r);
    const p2 = polarToCartesian(end, r);
    return `M${cx},${cy} L${p1.x},${p1.y} A${r},${r} 0 0,1 ${p2.x},${p2.y} Z`;
  };

  const labelPos = (i: number) => {
    const mid = i * sliceAngle + sliceAngle / 2;
    return polarToCartesian(mid, r * 0.68);
  };

  return (
    <section className="py-24 lg:py-32 relative bg-cream">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div data-reveal className="max-w-3xl mb-14">
          <span className="eyebrow text-terracotta">Flavor Profile</span>
          <h2 className="headline text-5xl lg:text-6xl font-extrabold mt-3 text-espresso">
            Taste the <span className="italic-serif text-terracotta">wheel</span>.
          </h2>
          <p className="mt-5 text-espresso/70 text-lg leading-relaxed">
            Six flavor families. Six origins. Click a slice to find your match.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Wheel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto"
          >
            <svg viewBox="0 0 300 300" className="w-full max-w-[400px] mx-auto">
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {flavors.map((f, i) => (
                <motion.path
                  key={f.key}
                  d={slicePath(i)}
                  fill={f.color}
                  stroke="#F9F6EE"
                  strokeWidth="2"
                  className="flavor-slice"
                  onClick={() => setActive(f)}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: active.key === f.key ? 1 : 0.75 }}
                  animate={{ opacity: active.key === f.key ? 1 : 0.75 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  style={{
                    filter: active.key === f.key ? 'url(#glow)' : 'none',
                    cursor: 'pointer',
                  }}
                  whileHover={{ scale: 1.03 }}
                  data-cursor-hover
                />
              ))}

              {flavors.map((f, i) => {
                const p = labelPos(i);
                return (
                  <text
                    key={`${f.key}-l`}
                    x={p.x}
                    y={p.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="Commissioner, sans-serif"
                    fontWeight="700"
                    fontSize="11"
                    fill="#F9F6EE"
                    letterSpacing="1.5"
                    style={{ pointerEvents: 'none', textTransform: 'uppercase' }}
                  >
                    {f.label}
                  </text>
                );
              })}

              {/* Center circle */}
              <circle cx={cx} cy={cy} r="42" fill="#F9F6EE" stroke="#3C1B10" strokeWidth="2" />
              <text
                x={cx}
                y={cy - 4}
                textAnchor="middle"
                fontFamily="Instrument Serif, serif"
                fontStyle="italic"
                fontSize="16"
                fill="#3C1B10"
              >
                Nocturn
              </text>
              <text
                x={cx}
                y={cy + 14}
                textAnchor="middle"
                fontFamily="Commissioner, sans-serif"
                fontWeight="700"
                fontSize="9"
                fill="#C84B20"
                letterSpacing="2"
              >
                FLAVOR
              </text>
            </svg>
          </motion.div>

          {/* Details */}
          <div className="relative min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.key}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <div
                  className="w-16 h-16 rounded-full mb-6 shadow-soft"
                  style={{ background: active.color }}
                />
                <h3 className="headline text-4xl font-extrabold text-espresso">
                  {active.label}{' '}
                  <span className="italic-serif" style={{ color: active.color }}>
                    profile
                  </span>
                </h3>

                <div className="mt-6">
                  <span className="eyebrow text-espresso/60">Tasting Notes</span>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {active.notes.map((n, i) => (
                      <motion.span
                        key={n}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="px-4 py-2 rounded-full border border-espresso/15 text-espresso text-sm font-medium bg-cream"
                      >
                        {n}
                      </motion.span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-cream-2/60 border border-espresso/5">
                    <span className="eyebrow text-espresso/60 text-[0.65rem]">Pairing</span>
                    <p className="mt-1 text-espresso font-medium">{active.pairing}</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-cream-2/60 border border-espresso/5">
                    <span className="eyebrow text-espresso/60 text-[0.65rem]">Origin</span>
                    <p className="mt-1 text-espresso font-medium">{active.origin}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
