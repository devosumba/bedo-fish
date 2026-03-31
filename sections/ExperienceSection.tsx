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

// Real image paths from public/images/
const PORTRAIT_IMGS = [
  '/images/portrait-scroll/1.jpg',
  '/images/portrait-scroll/2.jpg',
  '/images/portrait-scroll/3.jpg',
  '/images/portrait-scroll/4.jpg',
  '/images/portrait-scroll/5.jpg',
  '/images/portrait-scroll/6.jpg',
];
const LANDSCAPE_IMGS = [
  '/images/landscape-scroll/1.jpg',
  '/images/landscape-scroll/2.jpg',
  '/images/landscape-scroll/3.jpg',
  '/images/landscape-scroll/4.jpg',
  '/images/landscape-scroll/5.jpg',
  '/images/landscape-scroll/6.jpg',
];

// Precompute full slot data: assign real image src to each slot by cycling
// through the appropriate portrait/landscape array in slot order.
let _pc = 0, _lc = 0;
const FULL_SLOTS = IMG_SLOTS.map((defIndex) => {
  const def = BASE_IMAGES[defIndex];
  const src = def.portrait
    ? PORTRAIT_IMGS[_pc++ % PORTRAIT_IMGS.length]
    : LANDSCAPE_IMGS[_lc++ % LANDSCAPE_IMGS.length];
  return { ...def, src };
});

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
  return <motion.span style={{ color, display: 'inline' }}>{text}{' '}</motion.span>;
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

  return (
    // overflow-hidden removed: sticky inside this section requires unclipped
    // vertical scroll. overflow-x is clipped by the sticky inner div itself.
    <section
      id="our-story"
      ref={sectionRef}
      className="relative z-[2] bg-white w-full pt-10 md:pt-14 pb-0"
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
      <div ref={imageContainerRef} className="h-[160vh] md:h-[300vh]" style={{ marginTop: '-70px' }}>
        <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden flex items-center">
          <motion.div
            ref={stripRef}
            style={{ x: xVal }}
            className="flex items-center gap-4 md:gap-5 px-6 md:px-10 will-change-transform"
          >
            {FULL_SLOTS.map((slot, slotIndex) => (
              <div
                key={slotIndex}
                className={`relative shrink-0 rounded-2xl overflow-hidden ${
                  slot.portrait
                    ? 'w-[120px] md:w-[180px] aspect-[3/4]'
                    : 'w-[200px] md:w-[290px] aspect-[16/9]'
                }`}
                style={{ transform: `translateY(${slot.yOffset}px)` }}
              >
                <img
                  src={slot.src}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default ExperienceSection;
