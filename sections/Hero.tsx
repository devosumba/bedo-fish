"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="relative flex flex-col items-center justify-center min-h-[90vh] pt-16 pb-10 px-4 md:px-0">
      {/* Decorative doodle left */}
      <svg className="absolute left-0 top-1/3 w-24 h-24 text-primary opacity-60" fill="none" viewBox="0 0 96 96"><path d="M16 48c8-16 32-32 64-32" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>
      {/* Decorative doodle right */}
      <svg className="absolute right-0 top-1/2 w-20 h-20 text-primary opacity-60" fill="none" viewBox="0 0 80 80"><path d="M8 72c16-8 48-24 64-56" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>
      {/* Speech bubble */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="mb-4 flex items-center gap-2">
        <span className="border border-primary rounded-full px-4 py-1 text-primary font-medium text-sm bg-white shadow-sm">Hello!</span>
        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24"><path d="M12 2v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      </motion.div>
      {/* Headline */}
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="text-hero-title text-center font-bold mb-2">
        I’m <span className="text-primary">Jenny</span>,<br className="hidden md:inline"/> Product Designer
      </motion.h1>
      {/* Profile image composition */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
        className="relative flex flex-col items-center mt-4 mb-6">
        {/* Orange half-circle background */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-72 h-36 bg-primary rounded-b-full z-0" style={{ zIndex: 0 }} />
        {/* Profile image placeholder */}
        <Image src="/assets/profile-placeholder.png" alt="Jenny" width={220} height={220} className="relative z-10 rounded-full object-cover border-4 border-white shadow-lg" />
      </motion.div>
      {/* CTA Buttons */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="flex gap-4 mb-8">
        {/* <Button variant="primary" href="#portfolio">Portfolio ↗</Button>
        <Button variant="outline" href="#contact">Hire me</Button> */}
      </motion.div>
      {/* Testimonial and Experience blocks */}
      <div className="w-full flex justify-between items-center max-w-4xl mx-auto mt-8">
        <div className="flex-1 max-w-xs">
          {/* <QuoteCard text="Jenny’s Exceptional product design ensure our website’s success. Highly Recommended" /> */}
        </div>
        <div className="flex-1 flex flex-col items-end max-w-xs">
          {/* <ExperienceCard years={10} /> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
