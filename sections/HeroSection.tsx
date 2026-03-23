"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/*
 * Typewriter cycling through two phrases on a fixed template:
 *   "Africa's [TYPED] Tilapia,"
 * Phrases: "Smoked & Roasted" → "& Roasted"
 */
const PHRASES = ['Smoked & Roasted', '& Roasted'];
const TYPE_MS = 80;
const DELETE_MS = 50;
const PAUSE_MS = 800;

function useTypewriter(phrases: string[]) {
  const [displayed, setDisplayed] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [typing, setTyping] = useState(true);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const phrase = phrases[phraseIdx];

    if (typing) {
      if (displayed.length < phrase.length) {
        timeout.current = setTimeout(
          () => setDisplayed(phrase.slice(0, displayed.length + 1)),
          TYPE_MS
        );
      } else {
        timeout.current = setTimeout(() => setTyping(false), PAUSE_MS);
      }
    } else {
      if (displayed.length > 0) {
        timeout.current = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          DELETE_MS
        );
      } else {
        setPhraseIdx((i) => (i + 1) % phrases.length);
        setTyping(true);
      }
    }

    return () => { if (timeout.current) clearTimeout(timeout.current); };
  }, [displayed, typing, phraseIdx, phrases]);

  return displayed;
}

/*
 * Hero section
 * - Background image zooms subtly from 1.05→1.0 on load (Framer Motion)
 * - Negative margin-top (-92px) overlaps the sticky nav so the image fills
 *   the full viewport from the top; matching padding-top pushes content clear
 * - rounded-t-3xl rounds only top corners (bottom is flush with ServicesSection)
 */
const HeroSection = () => {
  const typed = useTypewriter(PHRASES);

  return (
    <section
      id="hero"
      className="relative w-full flex flex-col items-center justify-center overflow-hidden rounded-t-3xl"
      style={{
        marginTop: '-92px',
        minHeight: '95vh',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      }}
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

      {/* Content — top padding accounts for sticky nav overlap */}
      <div
        className="relative z-10 w-full flex flex-col items-center px-4 gap-8"
        style={{ paddingTop: '148px', paddingBottom: '80px' }}
      >

        {/* Heading — two lines */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="font-extrabold text-center tracking-tight leading-tight"
          style={{ fontSize: 'clamp(0.9rem, 3.6vw, 3.5rem)' }}
        >
          <span className="block text-white whitespace-nowrap">
            Africa&apos;s{' '}
            <span style={{ color: '#014aad' }}>
              {typed}
              <span className="typewriter-cursor" aria-hidden="true" />
            </span>
            {' '}Tilapia,
          </span>
          <span className="block text-white whitespace-nowrap">
            Delivered{' '}
            <span style={{ color: '#014aad' }}>Fresh!</span>
          </span>
        </motion.h1>

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
