"use client";

import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative z-[1] w-full flex flex-col items-center justify-center"
      style={{
        backgroundImage: "url('/images/hero-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '85vh',
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      <div className="relative z-10 w-full flex flex-col items-center justify-center px-4 py-24 gap-8">

        {/* Heading — single line, full width, centered */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-extrabold text-white text-center tracking-tight leading-none"
          style={{
            fontSize: 'clamp(0.85rem, 3.6vw, 3.2rem)',
            whiteSpace: 'nowrap',
            width: '100%',
          }}
        >
          Africa&apos;s Nutritious Smoked Tilapia, Delivered Fresh.
        </motion.h1>

        {/* Paragraph — centered below heading */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
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
          transition={{ delay: 0.48 }}
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
