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
        className="relative z-10 w-full flex flex-col items-center px-4 gap-8"
        style={{ paddingTop: '143px', paddingBottom: '80px' }}
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
            {/* Line 1 — animated word slot reserved at min-width of 'Roasted' */}
            <span className="block text-white whitespace-nowrap">
              Africa&apos;s{' '}
              <span
                style={{
                  color: '#014aad',
                  display: 'inline-block',
                  minWidth: '7ch',
                }}
              >
                {typed}
                <span className="typewriter-cursor" aria-hidden="true" />
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

        {/* CTA pill — centered */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex items-center rounded-full bg-white/10 border border-white/30 backdrop-blur-sm px-2 py-1 gap-2"
        >
          <button
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#014aad] text-white font-semibold rounded-full px-6 py-2 text-base flex items-center gap-2 transition hover:bg-[#0157cc] focus:outline-none"
          >
            Products{' '}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M7 7h10v10"/>
            </svg>
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-white font-medium rounded-full px-6 py-2 text-base transition hover:bg-white/20 focus:outline-none"
          >
            Shop
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroSection;
