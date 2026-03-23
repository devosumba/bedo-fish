"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Shared prop type for all mockup components ───────────────────────────────
type MockupProps = { active: boolean; delayOffset: number };

// ─── CSS mockup previews for each service card ─────────────────────────────

const UIMockup = ({ active, delayOffset }: MockupProps) => {
  const p = active ? 'running' : 'paused';
  // Builds an inline style object for CSS keyframe animation on a single element.
  const a = (name: string, dur: string, delay: number, extra = {}) => ({
    animation: `${name} ${dur} ease-in-out infinite`,
    animationDelay: `${delayOffset + delay}s`,
    animationPlayState: p,
    willChange: 'transform, opacity',
    ...extra,
  });

  return (
    <div className="w-full h-full bg-[#1a1a2e] rounded-xl p-3 flex flex-col gap-2 overflow-hidden">
      <div className="flex gap-1.5 mb-0.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
      </div>
      <div className="flex gap-2 flex-1">
        {/* Sidebar — bars dance left-right */}
        <div className="w-1/4 bg-white/5 rounded-lg flex flex-col gap-1.5 p-1.5">
          <div className="h-2 bg-[#014aad]/50 rounded" style={a('barDance', '1.6s', 0,    { transformOrigin: 'left center' })} />
          <div className="h-2 bg-white/10 rounded"     style={a('barDance', '1.9s', 0.3,  { transformOrigin: 'left center' })} />
          <div className="h-2 bg-white/10 rounded"     style={a('barDance', '1.7s', 0.6,  { transformOrigin: 'left center' })} />
          <div className="h-2 bg-[#014aad]/20 rounded" style={a('barDance', '2.1s', 0.15, { transformOrigin: 'left center' })} />
          <div className="h-2 bg-white/8 rounded"      style={a('barDance', '1.8s', 0.45, { transformOrigin: 'left center' })} />
        </div>
        {/* Main content */}
        <div className="flex-1 flex flex-col gap-2">
          {/* Chart — bars grow/shrink from their base */}
          <div className="h-16 bg-gradient-to-br from-[#014aad]/15 to-white/5 rounded-lg flex items-center justify-center">
            <div className="flex gap-2 items-end">
              {[40, 65, 50, 80, 60].map((h, i) => (
                <div
                  key={i}
                  className="w-3 rounded-t bg-[#014aad]/60"
                  style={{
                    height: h * 0.5,
                    ...a('barDanceY', '1.4s', i * 0.18, { transformOrigin: 'bottom center' }),
                  }}
                />
              ))}
            </div>
          </div>
          {/* Stat cards */}
          <div className="flex gap-1.5">
            <div className="flex-1 h-8 bg-white/5 rounded-lg p-1.5 flex flex-col gap-1">
              <div className="h-1.5 bg-white/20 rounded w-3/4"    style={a('barDance',    '2s',   0.1, { transformOrigin: 'left center' })} />
              <div className="h-1.5 bg-[#014aad]/40 rounded w-1/2" style={a('glowFlicker', '1.8s', 0.4)} />
            </div>
            <div className="flex-1 h-8 bg-white/5 rounded-lg p-1.5 flex flex-col gap-1">
              <div className="h-1.5 bg-white/20 rounded w-2/3" style={a('barDance', '2.2s', 0.3, { transformOrigin: 'left center' })} />
              <div className="h-1.5 bg-white/10 rounded w-3/4" style={a('barDance', '1.9s', 0.5, { transformOrigin: 'left center' })} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WebMockup = ({ active, delayOffset }: MockupProps) => {
  const p = active ? 'running' : 'paused';
  const a = (name: string, dur: string, delay: number, extra = {}) => ({
    animation: `${name} ${dur} ease-in-out infinite`,
    animationDelay: `${delayOffset + delay}s`,
    animationPlayState: p,
    willChange: 'transform, opacity',
    ...extra,
  });

  return (
    <div className="w-full h-full bg-[#0d1117] rounded-xl overflow-hidden flex flex-col">
      {/* Browser chrome — window dots flicker in stagger, address bar glows */}
      <div className="bg-[#1c2128] px-3 py-2 flex items-center gap-2 shrink-0">
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-red-400/60"    style={a('glowFlicker', '2.2s', 0)} />
          <span className="w-2 h-2 rounded-full bg-yellow-400/60" style={a('glowFlicker', '2.2s', 0.3)} />
          <span className="w-2 h-2 rounded-full bg-green-400/60"  style={a('glowFlicker', '2.2s', 0.6)} />
        </div>
        <div className="flex-1 bg-[#0d1117]/80 rounded px-2 py-0.5 text-[8px] text-white/30 font-mono truncate" style={a('glowFlicker', '3s', 0.4)}>
          osumba.portfolio
        </div>
      </div>
      {/* Page content */}
      <div className="flex-1 p-3 flex flex-col gap-2">
        {/* Nav row — logo glows, nav items dance */}
        <div className="flex justify-between items-center">
          <div className="h-2 w-12 bg-[#014aad]/70 rounded" style={a('glowFlicker', '2s', 0)} />
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-1.5 w-5 bg-white/15 rounded" style={a('barDance', '1.9s', 0.15 + i * 0.25, { transformOrigin: 'right center' })} />
            ))}
          </div>
        </div>
        {/* Hero area — text bars dance, CTA pulses */}
        <div className="flex-1 bg-gradient-to-br from-[#014aad]/10 to-transparent rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-14 h-2 bg-white/40 rounded mx-auto mb-1.5"   style={a('barDance', '1.7s', 0.1,  { transformOrigin: 'center' })} />
            <div className="w-20 h-1.5 bg-white/20 rounded mx-auto mb-1"   style={a('barDance', '2.2s', 0.35, { transformOrigin: 'center' })} />
            <div className="w-16 h-1.5 bg-white/12 rounded mx-auto mb-2.5" style={a('barDance', '1.9s', 0.55, { transformOrigin: 'center' })} />
            <div className="w-14 h-4 bg-[#014aad]/80 rounded-full mx-auto" style={a('pulseMockup', '2.3s', 0.45)} />
          </div>
        </div>
      </div>
    </div>
  );
};

const LandingMockup = ({ active, delayOffset }: MockupProps) => {
  const p = active ? 'running' : 'paused';
  const a = (name: string, dur: string, delay: number, extra = {}) => ({
    animation: `${name} ${dur} ease-in-out infinite`,
    animationDelay: `${delayOffset + delay}s`,
    animationPlayState: p,
    willChange: 'transform, opacity',
    ...extra,
  });

  return (
    <div className="w-full h-full bg-[#12101a] rounded-xl p-3 flex flex-col gap-2 overflow-hidden">
      {/* Nav bar */}
      <div className="h-5 bg-white/5 rounded-lg flex items-center px-2 gap-1 shrink-0">
        <div className="w-10 h-1.5 bg-[#014aad]/60 rounded" style={a('glowFlicker', '2s', 0)} />
        <div className="flex-1" />
        <div className="flex gap-1.5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-5 h-1.5 bg-white/15 rounded" style={a('glowFlicker', '2.5s', 0.2 + i * 0.2)} />
          ))}
        </div>
        <div className="w-8 h-3 bg-[#014aad]/70 rounded-full ml-2" style={a('pulseMockup', '2.2s', 0.1)} />
      </div>
      {/* Hero area */}
      <div className="flex-1 flex gap-2 items-center">
        {/* Text lines dance; CTA pulses */}
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="h-2.5 w-full bg-white/35 rounded" style={a('barDance', '2s',   0,   { transformOrigin: 'left center' })} />
          <div className="h-2 w-4/5 bg-white/20 rounded"    style={a('barDance', '2.3s', 0.2, { transformOrigin: 'left center' })} />
          <div className="h-1.5 w-2/3 bg-white/12 rounded"  style={a('barDance', '2.1s', 0.4, { transformOrigin: 'left center' })} />
          <div className="mt-1.5 h-5 w-16 bg-[#014aad]/80 rounded-full flex items-center justify-center" style={a('pulseMockup', '2.5s', 0.3)}>
            <span className="text-[7px] text-white/80 font-semibold">Get started</span>
          </div>
        </div>
        {/* Avatar float */}
        <div
          className="w-14 h-14 bg-gradient-to-br from-[#014aad]/25 to-[#014aad]/5 rounded-xl flex items-center justify-center"
          style={a('floatShape', '3.5s', 0.1)}
        >
          <div className="w-7 h-7 rounded-full bg-[#014aad]/40" style={a('glowFlicker', '2s', 0.3)} />
        </div>
      </div>
      {/* Stats row — cards flicker in sequence */}
      <div className="flex gap-1.5 shrink-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex-1 h-6 bg-white/[0.04] border border-white/[0.06] rounded-lg flex items-center justify-center"
            style={a('glowFlicker', '2.5s', 0.3 + i * 0.2)}
          >
            <div className="h-1.5 w-6 bg-white/20 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Slider paragraphs ───────────────────────────────────────────────────────

const PARAGRAPHS = [
  `I build scalable digital products and systems that users depend on and teams trust. Over the past five plus years, I've engineered full-stack platforms across fintech, blockchain, healthcare, and e-commerce, designing them not just to function, but to withstand growth. My focus is on building systems that remain stable under pressure, APIs that are predictable, and interfaces that make complexity feel simple. I think in terms of architecture, data integrity, and long-term maintainability, not just shipping features.`,
  `My work sits at the intersection of product thinking and engineering execution. That means collaborating closely with product managers and designers, understanding the real problem behind a request, and architecting solutions that scale beyond version one. From authentication flows to transaction systems to performance optimization, I build with clarity and durability in mind. Strong software is rarely accidental. It is shaped through context, refined through iteration, and strengthened through collaboration.`,
  `Ultimately, the impact of great engineering goes beyond clean code. It shows up in stable systems, empowered teams, and products that genuinely improve how people work and live. Contributing to that kind of impact is what drives me, and it is the standard I bring to every system and every team I join.`,
] as const;

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
  { title: 'Bespoke Software Engineer', Mockup: WebMockup },
  { title: 'Product (UI/UX) Designer',  Mockup: UIMockup },
  { title: 'Landing Page Designer',     Mockup: LandingMockup },
];

// ─── Section ─────────────────────────────────────────────────────────────────

const ServicesSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeCards, setActiveCards] = useState<boolean[]>([false, false, false]);
  const sectionRef             = useRef<HTMLElement>(null);
  const cardRefs               = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const paragraphContainerRef  = useRef<HTMLDivElement>(null);

  // ── Refs that carry scroll-hijack state into event handlers ──────────────
  const hijackedRef    = useRef(false);
  const releasedRef    = useRef(false);   // true after a voluntary release
  const activeSlideRef = useRef(0);       // mirrors activeSlide for handlers
  const tickCountRef   = useRef(0);
  const lastDirRef     = useRef<'down' | 'up' | null>(null);
  const cooldownRef    = useRef(false);

  // Keep activeSlideRef in sync with state
  useEffect(() => {
    activeSlideRef.current = activeSlide;
  }, [activeSlide]);

  // ── Card visibility — activates/pauses mockup looping animations ──────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const observers = cardRefs.current.map((card, i) => {
      if (!card) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          setActiveCards(prev => {
            const next = [...prev];
            next[i] = entry.isIntersecting;
            return next;
          });
        },
        { threshold: 0.3 },
      );
      obs.observe(card);
      return obs;
    });
    return () => observers.forEach(obs => obs?.disconnect());
  }, []);

  // ── Scroll-hijack effect ──────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const section = sectionRef.current;
    if (!section) return;

    const TICKS   = 2;    // wheel ticks needed to advance one paragraph
    const COOLDOWN = 400; // ms gap between paragraph transitions
    const TOTAL   = PARAGRAPHS.length;

    const isMobile = window.innerWidth < 768;

    // ── Section observer — handles deactivation on both platforms ────────────
    // On desktop it also handles activation at 0.5 threshold (unchanged).
    function onSectionIntersect(entries: IntersectionObserverEntry[]) {
      const entry = entries[0];
      if (!isMobile && entry.isIntersecting) {
        // Desktop activation: lock when 50% of section is visible
        if (!releasedRef.current) hijackedRef.current = true;
      } else if (!entry.isIntersecting) {
        // Both platforms: reset everything when section leaves viewport
        hijackedRef.current  = false;
        releasedRef.current  = false;
        tickCountRef.current = 0;
        lastDirRef.current   = null;
      }
    }

    const sectionObserver = new IntersectionObserver(
      onSectionIntersect,
      { threshold: isMobile ? 0 : 0.5 },
    );
    sectionObserver.observe(section);

    // ── Mobile-only: paragraph observer — activates lock only once the
    //    paragraph container is 90 %+ visible (first paragraph fully in view) ─
    let paragraphObserver: IntersectionObserver | null = null;
    if (isMobile) {
      const paragraphContainer = paragraphContainerRef.current;
      if (paragraphContainer) {
        paragraphObserver = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && entry.intersectionRatio >= 0.9) {
              if (!releasedRef.current) hijackedRef.current = true;
            } else {
              hijackedRef.current = false;
            }
          },
          { threshold: [0, 0.9, 1.0] },
        );
        paragraphObserver.observe(paragraphContainer);
      }
    }

    // Core logic called by both wheel and touch handlers
    function processScroll(direction: 'down' | 'up') {
      if (!hijackedRef.current) return;
      if (cooldownRef.current)  return; // still in transition gap

      // Reset counter when direction reverses
      if (lastDirRef.current !== direction) {
        lastDirRef.current   = direction;
        tickCountRef.current = 0;
      }

      tickCountRef.current++;
      if (tickCountRef.current < TICKS) return; // not enough ticks yet

      // Enough ticks — commit the action
      tickCountRef.current = 0;
      cooldownRef.current  = true;
      setTimeout(() => { cooldownRef.current = false; }, COOLDOWN);

      const slide = activeSlideRef.current;
      if (direction === 'down') {
        if (slide < TOTAL - 1) {
          setActiveSlide(slide + 1);
        } else {
          // Past last paragraph — release hijack downward
          hijackedRef.current = false;
          releasedRef.current = true;
        }
      } else {
        if (slide > 0) {
          setActiveSlide(slide - 1);
        } else {
          // Before first paragraph — release hijack upward
          hijackedRef.current = false;
          releasedRef.current = true;
        }
      }
    }

    // Wheel handler (desktop)
    function onWheel(e: WheelEvent) {
      if (!hijackedRef.current) return;
      e.preventDefault();
      processScroll(e.deltaY > 0 ? 'down' : 'up');
    }

    // Touch handlers — attached to section for reliable preventDefault on iOS
    let touchStartY = 0;
    function onTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY;
    }
    function onTouchMove(e: TouchEvent) {
      if (hijackedRef.current) e.preventDefault();
    }
    function onTouchEnd(e: TouchEvent) {
      if (!hijackedRef.current) return;
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 40) return; // ignore accidental small swipes
      processScroll(dy > 0 ? 'down' : 'up');
    }

    window.addEventListener('wheel',       onWheel,      { passive: false });
    section.addEventListener('touchstart', onTouchStart, { passive: false });
    section.addEventListener('touchmove',  onTouchMove,  { passive: false });
    section.addEventListener('touchend',   onTouchEnd,   { passive: false });

    return () => {
      sectionObserver.disconnect();
      paragraphObserver?.disconnect();
      window.removeEventListener('wheel',       onWheel);
      section.removeEventListener('touchstart', onTouchStart);
      section.removeEventListener('touchmove',  onTouchMove);
      section.removeEventListener('touchend',   onTouchEnd);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
  <section ref={sectionRef} id="about" className="relative z-[2] bg-[#0e0e0e] md:w-full py-16 md:py-24 overflow-hidden rounded-3xl mx-3 md:mx-0 -mt-0.5 md:mt-0">

    {/* Decorative blobs */}
    <div className="absolute -top-24 left-[20%] w-96 h-96 bg-[#014aad] opacity-[0.07] rounded-full blur-[80px] pointer-events-none" />
    <div className="absolute bottom-0 right-[15%] w-[500px] h-[400px] bg-[#014aad] opacity-[0.05] rounded-full blur-[100px] pointer-events-none" />
    <div className="absolute top-1/2 left-[5%] w-48 h-48 bg-[#2a6fd4] opacity-[0.04] rounded-full blur-[60px] pointer-events-none" />

    <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">

      {/* ── Header row ──────────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12 md:mb-16 gap-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight"
        >
          About <span className="text-[#014aad]">Me</span>
        </motion.h2>

        {/* Vertical indicator + paragraph */}
        <div className="md:flex-1 md:max-w-[60%] flex items-start gap-4">
          {/* Vertical dots — clickable slider controls */}
          <div className="flex flex-col items-center gap-2 pt-1 shrink-0">
            {PARAGRAPHS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                aria-label={`Paragraph ${i + 1}`}
                className={`block rounded-full transition-all duration-300 focus:outline-none ${
                  i === activeSlide
                    ? 'w-2 h-6 bg-[#014aad]'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* Animated paragraph */}
          <div ref={paragraphContainerRef} className="relative overflow-hidden flex-1">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeSlide}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="text-gray-400 text-[15px] leading-relaxed"
              >
                {PARAGRAPHS[activeSlide]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Cards ────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {SERVICES.map(({ title, Mockup }, i) => (
          <motion.div
            key={title}
            ref={(el: HTMLDivElement | null) => { cardRefs.current[i] = el; }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="relative flex flex-col gap-4 bg-white/[0.04] border border-white/[0.08] backdrop-blur-md rounded-3xl overflow-hidden p-5"
          >
            {/* Card title */}
            <span className="text-white font-semibold text-base">{title}</span>

            {/* Mockup preview */}
            <div className="h-44 rounded-xl overflow-hidden">
              <Mockup active={activeCards[i]} delayOffset={i * 0.2} />
            </div>

          </motion.div>
        ))}
      </div>

      {/* ── Tech Stack row ──────────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mt-12 md:mt-16 gap-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight"
        >
          Tech <span className="text-[#014aad]">Stack</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="md:flex-1 md:max-w-[60%] text-gray-400 text-[15px] leading-relaxed"
        >
          <span className="text-[#014aad]">Frontend:</span>
          <span className="text-white"> Next.js, React, TypeScript, JavaScript (ES6+), Tailwind CSS, Redux Toolkit, Sass</span>
          <br />
          <span className="text-[#014aad]">Backend &amp; Database:</span>
          <span className="text-white"> Node.js, Express.js, Nest.js, RESTful APIs, Prisma ORM, PostgreSQL, MongoDB</span>
          <br />
          <span className="text-[#014aad]">Tools &amp; Methodologies:</span>
          <span className="text-white"> Git, CI/CD, Jest, SEO, Web Performance, Agile/Scrum, Workflow Automation</span>
        </motion.p>
      </div>

    </div>
  </section>
  );
};

export default ServicesSection;
