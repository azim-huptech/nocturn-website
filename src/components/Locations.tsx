import { motion } from 'framer-motion';

const spots = [
  { name: 'Division St. Flagship', addr: '2184 SE Division St, Portland', hours: '7a — 6p', days: 'Daily' },
  { name: 'Alberta Arts', addr: '1402 NE Alberta St, Portland', hours: '6:30a — 5p', days: 'Mon — Sat' },
  { name: 'Pearl District', addr: '915 NW 11th Ave, Portland', hours: '7a — 4p', days: 'Daily' },
];

export default function Locations() {
  return (
    <section id="locations" className="py-20 bg-cream-2/60">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-10 items-center">
        <div data-reveal>
          <span className="eyebrow text-terracotta">Visit</span>
          <h2 className="headline text-4xl lg:text-5xl font-extrabold mt-3 text-espresso">
            Three cafés. One <span className="italic-serif text-terracotta">roastery</span>.
          </h2>
          <div className="mt-8 space-y-6">
            {spots.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 6 }}
                className={`flex justify-between items-start gap-6 ${
                  i < spots.length - 1 ? 'pb-6 border-b border-espresso/10' : ''
                }`}
              >
                <div>
                  <h4 className="font-display font-bold text-xl text-espresso">{s.name}</h4>
                  <p className="text-espresso/70 text-sm mt-1">{s.addr}</p>
                </div>
                <div className="text-sm text-right">
                  <div className="font-semibold text-espresso">{s.hours}</div>
                  <div className="text-espresso/60">{s.days}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          data-reveal
          whileHover={{ scale: 1.01 }}
          className="rounded-3xl overflow-hidden border border-espresso/5 h-[420px] shadow-soft"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.5987757540856!2d72.50844967436815!3d23.038499515735463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9ac245700001%3A0x297eca4a87ac459e!2sHuptech%20Web%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1791541945833!5m2!1sen!2sin"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Nocturn Coffee Portland locations"
          />
        </motion.div>
      </div>
    </section>
  );
}
