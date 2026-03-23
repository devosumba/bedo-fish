"use client";

import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section id="hero" className="relative z-[1] bg-white w-full">
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-10 pb-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-x-16 items-center mt-6 md:mt-12">

          {/* Left: Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-start"
          >
            <h1 className="font-extrabold text-[clamp(1.8rem,5vw,3.25rem)] leading-tight tracking-tight">
              <span className="text-gray-900">Africa&apos;s Nutritious Smoked Tilapia,</span>
              <br />
              <span className="text-[#014aad]">Delivered Fresh.</span>
            </h1>
          </motion.div>

          {/* Right: Paragraph + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-col items-center gap-8"
          >
            <p className="text-gray-600 text-[16px] leading-relaxed text-center">
              Every fish we roast fuels healthier diets, empowers women, and scales a sustainable future from Lake Victoria to your table.
            </p>

            <div className="flex rounded-full bg-white/80 border border-gray-200 shadow-md backdrop-blur px-2 py-1 gap-2">
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
                className="text-gray-700 font-medium rounded-full px-6 py-2 text-base transition hover:bg-gray-100 focus:outline-none"
              >
                Shop
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
