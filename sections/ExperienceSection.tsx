"use client";

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// ─── Timeline data ────────────────────────────────────────────────────────────

const ENTRIES = [
  { company: 'Vaultmont Wealth Lab', dates: '2025 – Present', title: 'Software Engineer',  orange: true  },
  { company: 'Avrello Tech',         dates: '2023 – 2025',    title: 'Software Engineer',  orange: false },
  { company: 'Phynix Media UK',      dates: '2021 – 2023',    title: 'Fullstack Engineer', orange: true  },
  { company: 'D.Light',              dates: '2021 – 2022',    title: 'UX Designer',        orange: false },
];

// Dot components — filled circle + dashed outline ring via outline-offset
const OrangeDot = () => (
  <div
    className="w-4 h-4 rounded-full bg-[#014aad] relative z-10"
    style={{ outline: '2px dashed #014aad', outlineOffset: '4px' }}
  />
);

const DarkDot = () => (
  <div
    className="w-4 h-4 rounded-full bg-[#1a1a2e] relative z-10"
    style={{ outline: '2px dashed #1a1a2e', outlineOffset: '4px' }}
  />
);

// ─── Section ──────────────────────────────────────────────────────────────────

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Lower threshold on mobile since the viewport is smaller
    const threshold = window.innerWidth < 768 ? 0.15 : 0.2;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        // Draw the timeline lines (both desktop + mobile; CSS hides the irrelevant one)
        section.querySelectorAll<HTMLElement>('.timeline-line').forEach(el => {
          el.classList.add('animate-in');
        });

        // Trigger all entry elements simultaneously — CSS transition-delay per element
        // handles the visual stagger (0s, 0.2s, 0.4s, 0.6s per entry row).
        section.querySelectorAll<HTMLElement>(
          '.timeline-entry-left, .timeline-entry-right, .timeline-dot'
        ).forEach(el => {
          el.classList.add('animate-in');
        });

        observer.disconnect();
      },
      { threshold }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative z-[2] bg-white w-full py-10 md:py-14 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* ── Heading ────────────────────────────────────────────────────── */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-extrabold text-center text-[#0e0e0e] mb-3 leading-tight tracking-tight"
        >
          <span className="text-black">Work </span><span className="text-[#014aad]">Experience</span>
        </motion.h2>

        {/* ── Subheading ─────────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="text-center text-[#555555] text-[16px] leading-relaxed mb-10 md:mb-12"
        >
          Five years in, I&apos;ve shipped full-stack systems across fintech, health-tech, and humanitarian tech
        </motion.p>

        {/* ── Desktop timeline ───────────────────────────────────────────── */}
        <div className="hidden md:block relative">
          {/* Vertical dashed line — draws top-to-bottom via clip-path animation */}
          <div
            className="absolute left-1/2 -translate-x-px timeline-line"
            style={{ top: 8, bottom: 8, borderLeft: '2px dashed #1a1a2e' }}
          />

          <div className="flex flex-col gap-8">
            {ENTRIES.map(({ company, dates, title, orange }, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_56px_1fr] items-start"
              >
                {/* Left — slides in from left */}
                <div
                  className="text-right pr-8 timeline-entry-left"
                  style={{ transitionDelay: `${i * 0.2}s` }}
                >
                  <p className="text-[#0e0e0e] font-bold text-base leading-snug">{company}</p>
                  <p className="text-[#555555] text-sm mt-0.5">{dates}</p>
                </div>

                {/* Center — dot scales up with slight bounce */}
                <div
                  className="flex items-start justify-center pt-[3px] timeline-dot"
                  style={{ transitionDelay: `${i * 0.2 + 0.1}s` }}
                >
                  {orange ? <OrangeDot /> : <DarkDot />}
                </div>

                {/* Right — slides in from right */}
                <div
                  className="pl-8 timeline-entry-right"
                  style={{ transitionDelay: `${i * 0.2}s` }}
                >
                  <p className="text-[#0e0e0e] font-bold text-base leading-snug">{title}</p>
                  <p className="text-[#555555] text-sm mt-0.5">Full-time</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile timeline ────────────────────────────────────────────── */}
        <div className="md:hidden relative">
          {/* Center dashed line — same draw animation */}
          <div
            className="absolute left-1/2 -translate-x-px timeline-line"
            style={{ top: 7, bottom: 7, borderLeft: '2px dashed #1a1a2e' }}
          />

          <div className="flex flex-col gap-6">
            {ENTRIES.map(({ company, dates, title, orange }, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_32px_1fr] items-start"
              >
                {/* Left: company + dates — slides from left */}
                <div
                  className="text-right pr-3 timeline-entry-left"
                  style={{ transitionDelay: `${i * 0.2}s` }}
                >
                  <p className="text-[#0e0e0e] font-bold text-xs leading-snug">{company}</p>
                  <p className="text-[#555555] text-[11px] mt-0.5">{dates}</p>
                </div>

                {/* Center: dot scales up */}
                <div
                  className="flex items-start justify-center pt-[3px] timeline-dot"
                  style={{ transitionDelay: `${i * 0.2 + 0.1}s` }}
                >
                  {orange ? (
                    <div
                      className="w-[14px] h-[14px] rounded-full bg-[#014aad] relative z-10"
                      style={{ outline: '2px dashed #014aad', outlineOffset: '3px' }}
                    />
                  ) : (
                    <div
                      className="w-[14px] h-[14px] rounded-full bg-[#1a1a2e] relative z-10"
                      style={{ outline: '2px dashed #1a1a2e', outlineOffset: '3px' }}
                    />
                  )}
                </div>

                {/* Right: title + Full-time — slides from right */}
                <div
                  className="pl-3 timeline-entry-right"
                  style={{ transitionDelay: `${i * 0.2}s` }}
                >
                  <p className="text-[#0e0e0e] font-bold text-xs leading-snug">{title}</p>
                  <p className="text-[#555555] text-[11px] mt-0.5">Full-time</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;
