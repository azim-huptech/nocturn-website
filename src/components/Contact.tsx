// import { motion } from 'framer-motion';
// import { FormEvent, useEffect, useRef, useState } from 'react';
// import { Mail, Phone, MapPin, Send, Check, RefreshCw, Loader2 } from 'lucide-react';

// type FormState = 'idle' | 'loading' | 'success' | 'error';

// const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
// // Google reCAPTCHA v2 test key (works on localhost; swap for prod)
// const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_KEY;

// declare global {
//   interface Window {
//     grecaptcha?: {
//       render: (el: HTMLElement, opts: Record<string, unknown>) => number;
//       reset: (id?: number) => void;
//       getResponse: (id?: number) => string;
//     };
//     onRecaptchaLoad?: () => void;
//   }
// }

// export default function Contact() {
//   const [state, setState] = useState<FormState>('idle');
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const captchaRef = useRef<HTMLDivElement>(null);
//   const captchaIdRef = useRef<number | null>(null);
//   const formRef = useRef<HTMLFormElement>(null);

//   useEffect(() => {
//     let timer: number | undefined;
//     const tryRender = () => {
//       if (
//         captchaRef.current &&
//         window.grecaptcha &&
//         typeof window.grecaptcha.render === 'function' &&
//         captchaIdRef.current === null
//       ) {
//         try {
//           captchaIdRef.current = window.grecaptcha.render(captchaRef.current, {
//             sitekey: RECAPTCHA_SITE_KEY,
//           });
//         } catch {
//           /* already rendered */
//         }
//       } else {
//         timer = window.setTimeout(tryRender, 300);
//       }
//     };
//     tryRender();
//     return () => {
//       if (timer) window.clearTimeout(timer);
//     };
//   }, []);

//   const validate = (data: Record<string, string>) => {
//     const e: Record<string, string> = {};
//     if (!data.name || data.name.trim().length < 2) e.name = 'Please add your name';
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || '')) e.email = 'Enter a valid email';
//     if (!data.message || data.message.trim().length < 10) e.message = 'A little more detail please';

//     const captchaResponse =
//       window.grecaptcha && captchaIdRef.current !== null
//         ? window.grecaptcha.getResponse(captchaIdRef.current)
//         : '';
//     if (!captchaResponse) e.captcha = 'Please confirm you are not a robot';

//     return { e, captchaResponse };
//   };

//   const submit = async (ev: FormEvent<HTMLFormElement>) => {
//     ev.preventDefault();
//     if (!formRef.current) return;

//     const fd = new FormData(formRef.current);
//     const data = Object.fromEntries(fd.entries()) as Record<string, string>;

//     const { e, captchaResponse } = validate(data);
//     setErrors(e);
//     if (Object.keys(e).length) return;

//     setState('loading');
//     try {
//       const payload = {
//         ...data,
//         'g-recaptcha-response': captchaResponse,
//       };
//       const res = await fetch('https://api.web3forms.com/submit', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });
//       const json = await res.json();
//       if (json.success) {
//         setState('success');
//         formRef.current.reset();
//         if (window.grecaptcha && captchaIdRef.current !== null) {
//           window.grecaptcha.reset(captchaIdRef.current);
//         }
//         setTimeout(() => setState('idle'), 4000);
//       } else {
//         setState('error');
//       }
//     } catch {
//       setState('error');
//     }
//   };

//   return (
//     <section id="contact" className="py-24 lg:py-32">
//       <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-5 gap-16 items-start">
//         <div data-reveal className="lg:col-span-2">
//           <span className="eyebrow text-terracotta">Say Hello</span>
//           <h2 className="headline text-5xl lg:text-6xl font-extrabold mt-3 text-espresso">
//             Got a <span className="italic-serif text-terracotta">question</span>?
//           </h2>
//           <p className="mt-6 text-lg text-espresso/70 leading-relaxed">
//             Wholesale, custom blends, press, or just want to geek out about process methods — we read every message.
//           </p>

//           <div className="mt-10 space-y-5">
//             {[
//               { icon: Mail, label: 'Email', value: 'hello@nocturncoffee.com', href: 'mailto:hello@nocturncoffee.com' },
//               { icon: Phone, label: 'Phone', value: '(503) 555-0199', href: 'tel:+15035550199' },
//               { icon: MapPin, label: 'Roastery', value: '2184 SE Division St, Portland OR' },
//             ].map((c, i) => (
//               <motion.div
//                 key={c.label}
//                 initial={{ opacity: 0, x: -20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.1 + i * 0.1 }}
//                 className="flex items-center gap-4"
//               >
//                 <div className="w-11 h-11 rounded-full bg-terracotta/10 text-terracotta grid place-content-center">
//                   <c.icon className="w-5 h-5" />
//                 </div>
//                 <div>
//                   <div className="text-xs uppercase tracking-wider text-espresso/60 font-semibold">{c.label}</div>
//                   {c.href ? (
//                     <a href={c.href} className="text-espresso font-medium link-underline">
//                       {c.value}
//                     </a>
//                   ) : (
//                     <div className="text-espresso font-medium">{c.value}</div>
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         <motion.form
//           ref={formRef}
//           onSubmit={submit}
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7 }}
//           className="lg:col-span-3 bg-cream-2/60 rounded-3xl p-8 lg:p-10 border border-espresso/5"
//           noValidate
//         >
//           <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
//           <input type="hidden" name="subject" value="New message from Nocturn site" />
//           <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

//           <div className="grid sm:grid-cols-2 gap-5">
//             <div>
//               <label className="field-label block mb-2" htmlFor="name">Your name</label>
//               <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 maxLength={60}
//                 placeholder="Jamie Rivera"
//                 className={`field ${errors.name ? 'invalid' : ''}`}
//               />
//               {errors.name && <p className="text-terracotta text-xs mt-1.5">{errors.name}</p>}
//             </div>
//             <div>
//               <label className="field-label block mb-2" htmlFor="email">Email</label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="jamie@email.com"
//                 className={`field ${errors.email ? 'invalid' : ''}`}
//               />
//               {errors.email && <p className="text-terracotta text-xs mt-1.5">{errors.email}</p>}
//             </div>
//           </div>

//           <div className="mt-5">
//             <label className="field-label block mb-2" htmlFor="topic">What's this about?</label>
//             <select id="topic" name="topic" className="field" defaultValue="General question">
//               <option>General question</option>
//               <option>Wholesale / cafe</option>
//               <option>Custom blend</option>
//               <option>Press</option>
//               <option>Something else</option>
//             </select>
//           </div>

//           <div className="mt-5">
//             <label className="field-label block mb-2" htmlFor="message">Message</label>
//             <textarea
//               id="message"
//               name="message"
//               rows={5}
//               placeholder="Tell us a bit..."
//               className={`field resize-none ${errors.message ? 'invalid' : ''}`}
//             />
//             {errors.message && <p className="text-terracotta text-xs mt-1.5">{errors.message}</p>}
//           </div>

//           <div className="mt-6">
//             <div ref={captchaRef} className="g-recaptcha" />
//             {errors.captcha && <p className="text-terracotta text-xs mt-2">{errors.captcha}</p>}
//           </div>

//           <div className="mt-7 flex flex-wrap items-center gap-4">
//             <motion.button
//               whileHover={{ scale: state === 'loading' ? 1 : 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               type="submit"
//               disabled={state === 'loading'}
//               className="btn-primary disabled:opacity-70"
//             >
//               {state === 'idle' && (
//                 <>
//                   Send message <Send className="w-4 h-4" />
//                 </>
//               )}
//               {state === 'loading' && (
//                 <>
//                   <Loader2 className="w-4 h-4 animate-spin" /> Sending…
//                 </>
//               )}
//               {state === 'success' && (
//                 <>
//                   Sent — thanks! <Check className="w-4 h-4" />
//                 </>
//               )}
//               {state === 'error' && (
//                 <>
//                   Try again <RefreshCw className="w-4 h-4" />
//                 </>
//               )}
//             </motion.button>
//             <p className="text-xs text-espresso/60">We reply within one business day.</p>
//           </div>
//         </motion.form>
//       </div>
//     </section>
//   );
// }


import { motion } from 'framer-motion';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, Check, RefreshCw, Loader2 } from 'lucide-react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
// Official Google reCAPTCHA v2 test key (Always works on localhost & 127.0.0.1)
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

declare global {
  interface Window {
    grecaptcha?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => number;
      reset: (id?: number) => void;
      getResponse: (id?: number) => string;
    };
  }
}

export default function Contact() {
  const [state, setState] = useState<FormState>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const captchaRef = useRef<HTMLDivElement>(null);
  const captchaIdRef = useRef<number | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    let timer: number | undefined;

    const tryRender = () => {
      if (
        captchaRef.current &&
        window.grecaptcha &&
        typeof window.grecaptcha.render === 'function' &&
        captchaIdRef.current === null
      ) {
        try {
          captchaIdRef.current = window.grecaptcha.render(captchaRef.current, {
            sitekey: RECAPTCHA_SITE_KEY,
          });
        } catch {
          /* Widget already initialized */
        }
      } else {
        timer = window.setTimeout(tryRender, 300);
      }
    };

    tryRender();
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  const validate = (data: Record<string, string>) => {
    const e: Record<string, string> = {};
    if (!data.name || data.name.trim().length < 2) e.name = 'Please add your name';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || '')) e.email = 'Enter a valid email';
    if (!data.message || data.message.trim().length < 10) e.message = 'A little more detail please';

    // Safely check getResponse (Widget ID 0 is valid and numeric!)
    let captchaResponse = '';
    if (window.grecaptcha) {
      captchaResponse = captchaIdRef.current !== null 
        ? window.grecaptcha.getResponse(captchaIdRef.current)
        : window.grecaptcha.getResponse();
    }

    if (!captchaResponse) {
      e.captcha = 'Please confirm you are not a robot';
    }

    return { e, captchaResponse };
  };

  const submit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!formRef.current) return;

    const fd = new FormData(formRef.current);
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;

    const { e, captchaResponse } = validate(data);
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setState('loading');
    try {
      const payload = {
        ...data,
        access_key: WEB3FORMS_KEY,
        'g-recaptcha-response': captchaResponse,
      };

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (json.success) {
        setState('success');
        formRef.current.reset();
        
        // Reset reCAPTCHA after success
        if (window.grecaptcha) {
          if (captchaIdRef.current !== null) {
            window.grecaptcha.reset(captchaIdRef.current);
          } else {
            window.grecaptcha.reset();
          }
        }
        setTimeout(() => setState('idle'), 4000);
      } else {
        console.error('Web3Forms Error:', json);
        setState('error');
      }
    } catch (err) {
      console.error('Submission Failed:', err);
      setState('error');
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-5 gap-16 items-start">
        <div data-reveal className="lg:col-span-2">
          <span className="eyebrow text-terracotta">Say Hello</span>
          <h2 className="headline text-5xl lg:text-6xl font-extrabold mt-3 text-espresso">
            Got a <span className="italic-serif text-terracotta">question</span>?
          </h2>
          <p className="mt-6 text-lg text-espresso/70 leading-relaxed">
            Wholesale, custom blends, press, or just want to geek out about process methods — we read every message.
          </p>

          <div className="mt-10 space-y-5">
            {[
              { icon: Mail, label: 'Email', value: 'hello@nocturncoffee.com', href: 'mailto:hello@nocturncoffee.com' },
              { icon: Phone, label: 'Phone', value: '(503) 555-0199', href: 'tel:+15035550199' },
              { icon: MapPin, label: 'Roastery', value: '2184 SE Division St, Portland OR' },
            ].map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-11 h-11 rounded-full bg-terracotta/10 text-terracotta grid place-content-center">
                  <c.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-espresso/60 font-semibold">{c.label}</div>
                  {c.href ? (
                    <a href={c.href} className="text-espresso font-medium link-underline">
                      {c.value}
                    </a>
                  ) : (
                    <div className="text-espresso font-medium">{c.value}</div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.form
          ref={formRef}
          onSubmit={submit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-3 bg-cream-2/60 rounded-3xl p-8 lg:p-10 border border-espresso/5"
          noValidate
        >
          <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
          <input type="hidden" name="subject" value="New message from Nocturn site" />
          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="field-label block mb-2" htmlFor="name">Your name</label>
              <input
                id="name"
                name="name"
                type="text"
                maxLength={60}
                placeholder="Jamie Rivera"
                className={`field ${errors.name ? 'invalid' : ''}`}
              />
              {errors.name && <p className="text-terracotta text-xs mt-1.5">{errors.name}</p>}
            </div>
            <div>
              <label className="field-label block mb-2" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="jamie@email.com"
                className={`field ${errors.email ? 'invalid' : ''}`}
              />
              {errors.email && <p className="text-terracotta text-xs mt-1.5">{errors.email}</p>}
            </div>
          </div>

          <div className="mt-5">
            <label className="field-label block mb-2" htmlFor="topic">What's this about?</label>
            <select id="topic" name="topic" className="field" defaultValue="General question">
              <option>General question</option>
              <option>Wholesale / cafe</option>
              <option>Custom blend</option>
              <option>Press</option>
              <option>Something else</option>
            </select>
          </div>

          <div className="mt-5">
            <label className="field-label block mb-2" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us a bit..."
              className={`field resize-none ${errors.message ? 'invalid' : ''}`}
            />
            {errors.message && <p className="text-terracotta text-xs mt-1.5">{errors.message}</p>}
          </div>

          <div className="mt-6">
            <div ref={captchaRef} className="g-recaptcha" />
            {errors.captcha && <p className="text-terracotta text-xs mt-2">{errors.captcha}</p>}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <motion.button
              whileHover={{ scale: state === 'loading' ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={state === 'loading'}
              className="btn-primary disabled:opacity-70"
            >
              {state === 'idle' && (
                <>
                  Send message <Send className="w-4 h-4" />
                </>
              )}
              {state === 'loading' && (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                </>
              )}
              {state === 'success' && (
                <>
                  Sent — thanks! <Check className="w-4 h-4" />
                </>
              )}
              {state === 'error' && (
                <>
                  Try again <RefreshCw className="w-4 h-4" />
                </>
              )}
            </motion.button>
            <p className="text-xs text-espresso/60">We reply within one business day.</p>
          </div>
        </motion.form>
      </div>
    </section>
  );
}