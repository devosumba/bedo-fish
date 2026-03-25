"use client";

import { useEffect, useRef, useState } from 'react';

// ─── Mission paragraph tokens ──────────────────────────────────────────────────
// Multi-word blue phrases are kept as single token units so they animate
// and color together. Punctuation stays attached to its token.

const TOKENS: { text: string; blue: boolean }[] = [
  { text: 'We',                       blue: false },
  { text: 'believe',                  blue: false },
  { text: 'great',                    blue: false },
  { text: 'fish',                     blue: true  },
  { text: 'should',                   blue: false },
  { text: 'do',                       blue: false },
  { text: 'more',                     blue: false },
  { text: 'than',                     blue: false },
  { text: 'taste',                    blue: false },
  { text: 'good.',                    blue: false },
  { text: 'Bedo Fish',                blue: true  },
  { text: 'is',                       blue: false },
  { text: 'a',                        blue: false },
  { text: 'women-led',                blue: true  },
  { text: 'social',                   blue: false },
  { text: 'enterprise',               blue: false },
  { text: 'roasting',                 blue: false },
  { text: 'premium',                  blue: false },
  { text: 'Lake Victoria',            blue: true  },
  { text: 'tilapia',                  blue: false },
  { text: 'while',                    blue: false },
  { text: 'creating',                 blue: false },
  { text: 'dignified work',           blue: true  },
  { text: 'for',                      blue: false },
  { text: 'women',                    blue: false },
  { text: 'in',                       blue: false },
  { text: 'fishing communities.',     blue: true  },
  { text: 'When',                     blue: false },
  { text: 'you',                      blue: false },
  { text: 'choose',                   blue: false },
  { text: 'Bedo,',                    blue: true  },
  { text: 'you',                      blue: false },
  { text: 'are',                      blue: false },
  { text: 'backing',                  blue: false },
  { text: 'a',                        blue: false },
  { text: 'better',                   blue: false },
  { text: 'food system',              blue: true  },
  { text: 'from',                     blue: false },
  { text: 'the',                      blue: false },
  { text: 'source.',                  blue: false },
];

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
  const sectionRef    = useRef<HTMLElement>(null);
  const paragraphRef  = useRef<HTMLParagraphElement>(null);
  const [revealedCount, setRevealedCount] = useState(0);

  // ── Word-by-word reveal observer (threshold 0.25) ────────────────────────
  useEffect(() => {
    const para = paragraphRef.current;
    if (!para) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        TOKENS.forEach((_, i) => {
          setTimeout(() => setRevealedCount(i + 1), i * 100);
        });
      },
      { threshold: 0.25 },
    );

    observer.observe(para);
    return () => observer.disconnect();
  }, []);

  // ── Timeline reveal observer (existing, unchanged) ───────────────────────
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

        {/* ── Mission paragraph — word-by-word scroll reveal ─────────────── */}
        <p
          ref={paragraphRef}
          className="text-center text-2xl md:text-3xl font-bold leading-relaxed mb-10 md:mb-12 max-w-3xl mx-auto"
        >
          {TOKENS.map((token, i) => (
            <span
              key={i}
              style={{
                color: i < revealedCount
                  ? (token.blue ? '#014aad' : '#000000')
                  : 'rgba(1, 74, 173, 0.15)',
                transition: 'color 300ms ease',
              }}
            >
              {token.text}{' '}
            </span>
          ))}
        </p>

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
