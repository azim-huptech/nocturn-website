import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Leaf, Flame, Package, Truck } from 'lucide-react';

const steps = [
  {
    icon: Leaf,
    tag: '01',
    title: 'Harvested',
    desc: 'Hand-picked cherries at peak ripeness from farms across Ethiopia, Colombia, and Guatemala.',
    img: 'https://plus.unsplash.com/premium_photo-1670758291967-25ed2e90f21e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: Flame,
    tag: '02',
    title: 'Roasted',
    desc: 'Every Tuesday in a 15-kg Loring. Profiles tuned bean by bean for peak clarity and sweetness.',
    img: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: Package,
    tag: '03',
    title: 'Packed',
    desc: 'Nitrogen-flushed compostable bags, sealed within hours of the roast finishing.',
    img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: Truck,
    tag: '04',
    title: 'Delivered',
    desc: 'On your doorstep by Friday — carbon-neutral shipping, every single order.',
    img: 'https://images.unsplash.com/photo-1452827073306-6e6e661baf57?auto=format&fit=crop&w=800&q=80',
  },
];

export default function BrewProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

  return (
    <section id="brew" ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div data-reveal className="max-w-3xl mb-20">
          <span className="eyebrow text-terracotta">The Process</span>
          <h2 className="headline text-5xl lg:text-6xl font-extrabold mt-3 text-espresso">
            From cherry to <span className="italic-serif text-terracotta">cup</span>, in four moves.
          </h2>
          <p className="mt-5 text-espresso/70 max-w-xl text-lg leading-relaxed">
            No middlemen, no mystery. Here's exactly how your coffee gets from a farm in Yirgacheffe to your kettle.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-espresso/10 -translate-x-1/2 hidden sm:block" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 md:left-1/2 top-0 w-[2px] bg-terracotta -translate-x-1/2 origin-top hidden sm:block"
          />

          <div className="space-y-16 md:space-y-24">
            {steps.map((s, i) => {
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={s.tag}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                  className={`relative grid md:grid-cols-2 gap-8 md:gap-16 items-center`}
                >
                  {/* dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-terracotta border-4 border-cream z-10 hidden sm:block" />

                  <div className={`${left ? 'md:order-1' : 'md:order-2 md:text-right'} pl-14 md:pl-0`}>
                    <div className={`inline-flex items-center gap-3 mb-4 ${left ? '' : 'md:flex-row-reverse'}`}>
                      <motion.div
                        whileHover={{ rotate: 20, scale: 1.1 }}
                        className="w-14 h-14 rounded-2xl bg-terracotta/10 text-terracotta grid place-content-center"
                      >
                        <s.icon className="w-6 h-6" />
                      </motion.div>
                      <span className="font-display font-extrabold text-5xl text-espresso/15">{s.tag}</span>
                    </div>
                    <h3 className="headline text-3xl md:text-4xl font-extrabold text-espresso mb-3">{s.title}</h3>
                    <p className="text-espresso/70 text-lg leading-relaxed max-w-md md:inline-block">{s.desc}</p>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                    className={`${left ? 'md:order-2' : 'md:order-1'} pl-14 md:pl-0`}
                  >
                    <div className="relative overflow-hidden rounded-3xl aspect-[4/3] shadow-soft">
                      <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 to-transparent" />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
