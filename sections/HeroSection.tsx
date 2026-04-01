"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/*
 * Hero section
 * ─── Layout ───────────────────────────────────────────────────────────────────
 * Negative margin-top pulls the hero behind the sticky navbar so the background
 * image fills the full viewport including the nav area. Content padding-top
 * pushes text below the navbar visually.
 *
 * Heading: Africa's Finest [animated] Tilapia, / Delivered Fresh!
 * Animated slot uses a hidden ghost "Roasted" span to hold its exact rendered
 * width so surrounding text never reflows. No arbitrary min-width used.
 *
 * Nav height: 67px pill + 8px bottom pad + 12px sticky top offset = 87px
 * → marginTop: -87px  |  paddingTop: 87px + 56px breathing room = 143px
 *
 * Height:
 *   Desktop (lg, ≥1024px) : h-screen (100vh) — hero fills entire viewport
 *   Mobile / tablet        : min-h-[95vh]
 *
 * Rounded corner effect at the hero ↔ ServicesSection junction is achieved by
 * ServicesSection having z-[2] + rounded-t-3xl + negative margin-top (-mt-6),
 * NOT by rounding this container.
 */

// ─── Typewriter hook ──────────────────────────────────────────────────────────

const WORDS     = ['Smoked', 'Roasted'] as const;
const TYPE_MS   =  80;   // ms per character typed
const DELETE_MS =  50;   // ms per character deleted
const PAUSE_MS  = 800;   // ms pause at full word before deleting

function useTypewriter(words: readonly string[]) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx,   setWordIdx]   = useState(0);
  const [typing,    setTyping]    = useState(true);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const word = words[wordIdx];

    if (typing) {
      if (displayed.length < word.length) {
        timeout.current = setTimeout(
          () => setDisplayed(word.slice(0, displayed.length + 1)),
          TYPE_MS,
        );
      } else {
        timeout.current = setTimeout(() => setTyping(false), PAUSE_MS);
      }
    } else {
      if (displayed.length > 0) {
        timeout.current = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          DELETE_MS,
        );
      } else {
        setWordIdx((i) => (i + 1) % words.length);
        setTyping(true);
      }
    }

    return () => { if (timeout.current) clearTimeout(timeout.current); };
  }, [displayed, typing, wordIdx, words]);

  return displayed;
}

// ─── Component ───────────────────────────────────────────────────────────────

const HeroSection = () => {
  const typed = useTypewriter(WORDS);

  return (
    <section
      id="hero"
      className="relative w-full flex flex-col items-center justify-center min-h-[95vh] lg:h-screen"
      style={{ marginTop: '-87px', zIndex: 1 }}
    >
      {/* Animated background image — slow zoom-in on load */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        aria-hidden="true"
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      {/* Content */}
      <div
        className="relative z-10 w-full flex flex-col items-center px-4 gap-8 pt-[107px] md:pt-[193px]"
        style={{ paddingBottom: '80px' }}
      >

        {/* Glassmorphism badge + heading share a tighter vertical gap */}
        <div className="flex flex-col items-center gap-3">

          {/* Badge — decorative, not interactive */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            aria-hidden="true"
            style={{
              marginTop: '-44px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '999px',
              color: 'white',
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '6px 16px',
              display: 'inline-block',
            }}
          >
            IT&apos;S ABOUT TO GET FISHY
          </motion.span>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="font-extrabold text-center tracking-tight leading-tight"
            style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3.5rem)' }}
          >
            {/* Line 1
                'Finest' is static white text.
                The animated slot uses a hidden ghost of 'Roasted' to hold its
                exact rendered width — the browser measures it naturally at the
                heading font/size. Typed text is overlaid via position:absolute
                so surrounding words never shift or reflow during the animation. */}
            <span className="block text-white whitespace-nowrap">
              Africa&apos;s Finest{' '}
              <span style={{ display: 'inline-block', position: 'relative' }}>
                {/* Ghost — invisible but occupies exact 'Roasted' width */}
                <span style={{ visibility: 'hidden', userSelect: 'none' }} aria-hidden="true">Roasted</span>
                {/* Typed text overlaid — does not affect surrounding layout */}
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    color: '#014aad',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {typed}
                  <span className="typewriter-cursor" aria-hidden="true" />
                </span>
              </span>
              {' '}Tilapia,
            </span>

            {/* Line 2 */}
            <span className="block text-white whitespace-nowrap">
              Delivered{' '}
              <span style={{ color: '#014aad' }}>Fresh!</span>
            </span>
          </motion.h1>

        </div>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="text-white/85 text-center leading-relaxed max-w-xl"
          style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)' }}
        >
          Every fish we roast fuels healthier diets, empowers women, and scales a
          sustainable future from Lake Victoria to your table.
        </motion.p>

        {/* Find Us Online — social icons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex items-center rounded-full bg-white/10 border border-white/30 backdrop-blur-sm px-3 py-1.5 gap-2"
        >
          <span className="text-white font-bold" style={{ fontSize: '0.8rem' }}>Find Us Online</span>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@bedo_fish_ke"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            style={{
              color: '#014aad',
              background: 'rgba(255,255,255,0.85)',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 200ms ease, transform 200ms ease',
              flexShrink: 0,
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#fff'; el.style.transform = 'scale(1.1)'; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'rgba(255,255,255,0.85)'; el.style.transform = 'scale(1)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/bedo_fish?igsh=cnlpeXhvZzA2Z2Yz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            style={{
              color: '#014aad',
              background: 'rgba(255,255,255,0.85)',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 200ms ease, transform 200ms ease',
              flexShrink: 0,
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#fff'; el.style.transform = 'scale(1.1)'; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'rgba(255,255,255,0.85)'; el.style.transform = 'scale(1)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/people/Bedo-Fish/61576884642289/#"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            style={{
              color: '#014aad',
              background: 'rgba(255,255,255,0.85)',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 200ms ease, transform 200ms ease',
              flexShrink: 0,
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#fff'; el.style.transform = 'scale(1.1)'; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'rgba(255,255,255,0.85)'; el.style.transform = 'scale(1)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/254722144319"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            style={{
              color: '#014aad',
              background: 'rgba(255,255,255,0.85)',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 200ms ease, transform 200ms ease',
              flexShrink: 0,
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#fff'; el.style.transform = 'scale(1.1)'; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'rgba(255,255,255,0.85)'; el.style.transform = 'scale(1)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
