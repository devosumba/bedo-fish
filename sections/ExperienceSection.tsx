"use client";

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, type MotionValue } from 'framer-motion';

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

// ─── Image strip ──────────────────────────────────────────────────────────────
// Strictly alternating portrait / landscape with staggered vertical offsets.
// BASE_IMAGES[0,2,4] are portraits; [1,3] are landscapes.

type ImageDef = { portrait: boolean; yOffset: number };

const BASE_IMAGES: ImageDef[] = [
  { portrait: true,  yOffset: -32 }, // 0 → Image 1 — portrait, shifted up
  { portrait: false, yOffset:  32 }, // 1 → Image 2 — landscape, shifted down
  { portrait: true,  yOffset:   0 }, // 2 → Image 3 — portrait, centered
  { portrait: false, yOffset:  32 }, // 3 → Image 4 — landscape, shifted down
  { portrait: true,  yOffset: -32 }, // 4 → Image 5 — portrait, shifted up
];

// 2 full sets of [0,1,2,3,4] plus the first slot of a third set.
// Each set ends on portrait (index 4); the next set starts on portrait (index 0),
// creating a P→P collision at every boundary.
// Fix: insert defIndex 1 (landscape) as a bridge at each set boundary.
// Result: [set1] L [set2] L [P] = 5+1+5+1+1 = 13 slots.
// Orientation: P L P L P | L | P L P L P | L | P
// Every adjacent pair is P-L or L-P — no two consecutive same orientations.
const IMG_SLOTS = [
  0, 1, 2, 3, 4,  // set 1
  1,              // bridge — preserves alternation at set boundary
  0, 1, 2, 3, 4,  // set 2
  1,              // bridge
  0,              // first image of set 3 — scroll terminates here
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

// ─── Per-word span — calls useTransform inside so hooks rules are satisfied ──

function Word({
  progress, start, end, blue, text,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
  blue: boolean;
  text: string;
}) {
  const color = useTransform(
    progress,
    [start, end],
    ['rgba(1, 74, 173, 0.15)', blue ? '#014aad' : '#000000'],
  );
  return <motion.span style={{ color }}>{text}{' '}</motion.span>;
}

// ─── Section ──────────────────────────────────────────────────────────────────

const ExperienceSection = () => {
  const sectionRef         = useRef<HTMLElement>(null);
  const imageContainerRef  = useRef<HTMLDivElement>(null);
  const stickyRef          = useRef<HTMLDivElement>(null);
  const stripRef           = useRef<HTMLDivElement>(null);

  // ── Paragraph scroll-driven word reveal ──────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'start 0.2'],
  });
  const N = TOKENS.length;

  // ── Image strip horizontal scroll ────────────────────────────────────────
  // imageProgress goes 0→1 as the container scrolls from entering to leaving viewport.
  // xVal is updated on every progress tick using actual DOM measurements so the
  // translation ends precisely when the last image is flush with the container edge.
  const { scrollYProgress: imageProgress } = useScroll({
    target: imageContainerRef,
    offset: ['start end', 'end start'],
  });
  const xVal = useMotionValue(0);

  useEffect(() => {
    return imageProgress.on('change', (latest) => {
      const sticky = stickyRef.current;
      const strip  = stripRef.current;
      if (!sticky || !strip) return;
      const maxTranslate = Math.max(0, strip.scrollWidth - sticky.clientWidth);
      xVal.set(-latest * maxTranslate);
    });
  }, [imageProgress, xVal]);

  // ── Timeline reveal observer (unchanged) ─────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const threshold = window.innerWidth < 768 ? 0.15 : 0.2;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        section.querySelectorAll<HTMLElement>('.timeline-line').forEach(el => {
          el.classList.add('animate-in');
        });
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
    // overflow-hidden removed: sticky inside this section requires unclipped
    // vertical scroll. overflow-x is clipped by the sticky inner div itself.
    <section
      id="our-story"
      ref={sectionRef}
      className="relative z-[2] bg-white w-full py-10 md:py-14"
    >

      {/* ── Paragraph — font matches Our Offerings heading (text-4xl md:text-5xl font-extrabold) */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 mb-0">
        <p
          className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight text-justify max-w-3xl mx-auto"
        >
          {TOKENS.map((token, i) => (
            <Word
              key={i}
              progress={scrollYProgress}
              start={i / N}
              end={(i + 1) / N}
              blue={token.blue}
              text={token.text}
            />
          ))}
        </p>
      </div>

      {/* ── Scroll-driven image strip ─────────────────────────────────────
           300vh outer div creates scroll room. Inner sticky div pins to
           viewport. 13-slot strip (2 sets × 5 + 2 bridges + set-3 entry)
           translates left. xVal uses actual DOM widths so the strip ends
           precisely when the set-3 entry image is flush with the right edge. */}
      <div ref={imageContainerRef} style={{ height: '300vh', marginTop: '-70px' }}>
        <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden flex items-center">
          <motion.div
            ref={stripRef}
            style={{ x: xVal }}
            className="flex items-center gap-4 md:gap-5 px-6 md:px-10 will-change-transform"
          >
            {IMG_SLOTS.map((defIndex, slotIndex) => {
              const def = BASE_IMAGES[defIndex];
              return (
                <div
                  key={slotIndex}
                  className={`relative shrink-0 rounded-2xl bg-gray-200 overflow-hidden ${
                    def.portrait
                      ? 'w-[120px] md:w-[180px] aspect-[3/4]'
                      : 'w-[200px] md:w-[290px] aspect-[16/9]'
                  }`}
                  style={{ transform: `translateY(${def.yOffset}px)` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-[10px] font-medium">
                    Image {defIndex + 1}
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ── Timeline ───────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 pt-10 md:pt-14">

        {/* Desktop */}
        <div className="hidden md:block relative">
          <div
            className="absolute left-1/2 -translate-x-px timeline-line"
            style={{ top: 8, bottom: 8, borderLeft: '2px dashed #1a1a2e' }}
          />
          <div className="flex flex-col gap-8">
            {ENTRIES.map(({ company, dates, title, orange }, i) => (
              <div key={i} className="grid grid-cols-[1fr_56px_1fr] items-start">
                <div
                  className="text-right pr-8 timeline-entry-left"
                  style={{ transitionDelay: `${i * 0.2}s` }}
                >
                  <p className="text-[#0e0e0e] font-bold text-base leading-snug">{company}</p>
                  <p className="text-[#555555] text-sm mt-0.5">{dates}</p>
                </div>
                <div
                  className="flex items-start justify-center pt-[3px] timeline-dot"
                  style={{ transitionDelay: `${i * 0.2 + 0.1}s` }}
                >
                  {orange ? <OrangeDot /> : <DarkDot />}
                </div>
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

        {/* Mobile */}
        <div className="md:hidden relative">
          <div
            className="absolute left-1/2 -translate-x-px timeline-line"
            style={{ top: 7, bottom: 7, borderLeft: '2px dashed #1a1a2e' }}
          />
          <div className="flex flex-col gap-6">
            {ENTRIES.map(({ company, dates, title, orange }, i) => (
              <div key={i} className="grid grid-cols-[1fr_32px_1fr] items-start">
                <div
                  className="text-right pr-3 timeline-entry-left"
                  style={{ transitionDelay: `${i * 0.2}s` }}
                >
                  <p className="text-[#0e0e0e] font-bold text-xs leading-snug">{company}</p>
                  <p className="text-[#555555] text-[11px] mt-0.5">{dates}</p>
                </div>
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
