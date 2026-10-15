# Nocturn Coffee — React + Vite + TypeScript

Modern, animated rebuild of the Nocturn Coffee single-page site.

## Stack

- **React 18 + TypeScript**
- **Vite 5** build tool
- **Tailwind CSS 3** utility styling
- **Framer Motion** component / scroll animations
- **Lenis** smooth scroll
- **lucide-react** icons
- **Google reCAPTCHA v2** + **Web3Forms** contact pipeline (preserved from the original)

## Getting started

```bash
npm install
npm run dev        # start Vite on http://localhost:5173
npm run build      # type-check + production build
npm run preview    # preview the production bundle
```

## Contact form

The form submits to `https://api.web3forms.com/submit` using the same access key as the original HTML
(`src/components/Contact.tsx`). The `g-recaptcha-response` token is included in the payload. Swap the
localhost test site key for your production reCAPTCHA key before deploying.

## Highlights added in this rebuild

- Fully responsive React component architecture (mobile / tablet / desktop).
- Custom cursor with magnetic hover ring.
- Smooth scroll via Lenis + scroll progress bar.
- Scroll-linked hero parallax and reveal animations.
- 3D tilt collection cards (mouse-position aware).
- New **Brew Process** vertical timeline with growing progress line.
- New **Flavor Wheel** — interactive six-slice SVG with animated detail panel.
- Animated marquee with gradient mask.
- Testimonial carousel with auto-advance.
- Preserved Web3Forms + reCAPTCHA + client-side validation.

## Project structure

```
src/
  App.tsx
  main.tsx
  index.css
  components/
    Navbar.tsx
    Hero.tsx
    Marquee.tsx
    About.tsx
    Collections.tsx
    BrewProcess.tsx
    FlavorWheel.tsx
    Gallery.tsx
    Testimonials.tsx
    Contact.tsx
    Locations.tsx
    Footer.tsx
    CustomCursor.tsx
    ScrollProgress.tsx
```
