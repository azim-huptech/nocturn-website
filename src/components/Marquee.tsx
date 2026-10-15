import { Fragment } from 'react';

const items = [
  'Ethically Sourced',
  '✦',
  'Roasted Weekly',
  '✦',
  'Shipped Fresh',
  '✦',
  '47 Farmer Partners',
  '✦',
  'Carbon Neutral Delivery',
  '✦',
];

export default function Marquee() {
  const content = (
    <div className="flex items-center gap-12 pr-12 flex-shrink-0">
      {items.map((t, i) => (
        <span
          key={i}
          className={`font-display font-bold text-2xl whitespace-nowrap ${
            t === '✦' ? 'text-terracotta text-3xl' : i % 4 === 2 ? 'italic-serif' : ''
          }`}
        >
          {t}
        </span>
      ))}
    </div>
  );

  return (
    <section className="espresso-section py-6 border-y border-cream/10 overflow-hidden">
      <div className="marquee-mask flex">
        <div className="marquee-track flex items-center">
          <Fragment>
            {content}
            {content}
          </Fragment>
        </div>
      </div>
    </section>
  );
}
