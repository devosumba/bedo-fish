"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Product types and data ───────────────────────────────────────────────────

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  badge?: string;
};

const TABS: Array<{ label: string; products: Product[] }> = [
  {
    label: 'Customer Favorites',
    products: [
      { id: 1, name: 'Smoked Tilapia Whole',  description: 'Classic whole smoked tilapia',    price: 'KSh 0.00', badge: 'Best Seller' },
      { id: 2, name: 'Tilapia Fillet Pack',   description: 'Boneless roasted fillet, 500g',   price: 'KSh 0.00', badge: 'New'         },
      { id: 3, name: 'Family Value Pack',      description: 'Feeds a family of four',           price: 'KSh 0.00', badge: 'Popular'     },
    ],
  },
  {
    label: 'Roasted Tilapia',
    products: [
      { id: 4, name: 'Original Roasted Tilapia', description: 'Slow-roasted to perfection',  price: 'KSh 0.00', badge: 'Featured' },
      { id: 5, name: 'Spiced Roasted Tilapia',   description: 'Blend of local spices',        price: 'KSh 0.00', badge: 'New'      },
      { id: 6, name: 'Roasted Tilapia Fillet',   description: 'Boneless, oven-roasted',       price: 'KSh 0.00'                   },
    ],
  },
  {
    label: 'Omena',
    products: [
      { id: 7, name: 'Sundried Omena',       description: 'Lake Victoria sun-dried',  price: 'KSh 0.00', badge: 'Best Seller' },
      { id: 8, name: 'Roasted Omena Pack',   description: 'Crispy roasted omena',     price: 'KSh 0.00', badge: 'New'         },
      { id: 9, name: 'Omena Family Bundle',  description: 'Bulk pack, 1kg',           price: 'KSh 0.00', badge: 'Value'       },
    ],
  },
];

// ─── Slider paragraphs (2 items — third paragraph deleted per spec) ──────────

const PARAGRAPHS = [
  `Sustainably sourced from Lake Victoria to your table. Roasted fresh daily using energy-efficient ovens. No preservatives, no shortcuts! Packaged to international standards.`,
  `Bedo Fish operates a vertically integrated production model anchored in sustainable sourcing from Lake Victoria, energy-efficient roasting process and international-grade packaging standards position us to meet growing demand across retail, export, and institutional supply chains.`,
] as const;

// ─── Product card ─────────────────────────────────────────────────────────────

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="aspect-square flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* Image placeholder — fills top ~54% of the square card */}
      <div className="relative flex-[0_0_54%] bg-gray-100 flex items-center justify-center overflow-hidden">
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 z-10 text-[10px] font-semibold px-2 py-0.5 rounded-full text-white bg-[#014aad]">
            {product.badge}
          </span>
        )}
        {/* Neutral image placeholder icon */}
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-gray-300">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Card content — fills remaining ~46% */}
      <div className="flex-1 flex flex-col justify-between p-3 min-h-0">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm leading-tight truncate">{product.name}</h3>
          <p className="text-gray-400 text-xs mt-0.5 truncate">{product.description}</p>
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="font-bold text-gray-900 text-sm">{product.price}</span>
          <button
            className="bg-[#014aad] text-white text-[9px] font-semibold px-2 py-1.5 rounded-full hover:bg-[#0157cc] transition-colors flex items-center gap-1 whitespace-nowrap"
            onClick={(e) => e.stopPropagation()}
          >
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

const ServicesSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTab,   setActiveTab]   = useState(0);

  const sectionRef            = useRef<HTMLElement>(null);
  const paragraphContainerRef = useRef<HTMLDivElement>(null);

  // ── Refs that carry scroll-hijack state into event handlers ─────────────────
  const hijackedRef    = useRef(false);
  const releasedRef    = useRef(false);
  const activeSlideRef = useRef(0);
  const tickCountRef   = useRef(0);
  const lastDirRef     = useRef<'down' | 'up' | null>(null);
  const cooldownRef    = useRef(false);

  useEffect(() => {
    activeSlideRef.current = activeSlide;
  }, [activeSlide]);

  // ── Scroll-hijack effect (unchanged — drives the paragraph slider) ───────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const section = sectionRef.current;
    if (!section) return;

    const TICKS   = 2;
    const COOLDOWN = 400;
    const TOTAL   = PARAGRAPHS.length;

    const isMobile = window.innerWidth < 768;

    function onSectionIntersect(entries: IntersectionObserverEntry[]) {
      const entry = entries[0];
      if (!isMobile && entry.isIntersecting) {
        if (!releasedRef.current) hijackedRef.current = true;
      } else if (!entry.isIntersecting) {
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

    function processScroll(direction: 'down' | 'up') {
      if (!hijackedRef.current) return;
      if (cooldownRef.current)  return;

      if (lastDirRef.current !== direction) {
        lastDirRef.current   = direction;
        tickCountRef.current = 0;
      }

      tickCountRef.current++;
      if (tickCountRef.current < TICKS) return;

      tickCountRef.current = 0;
      cooldownRef.current  = true;
      setTimeout(() => { cooldownRef.current = false; }, COOLDOWN);

      const slide = activeSlideRef.current;
      if (direction === 'down') {
        if (slide < TOTAL - 1) {
          setActiveSlide(slide + 1);
        } else {
          hijackedRef.current = false;
          releasedRef.current = true;
        }
      } else {
        if (slide > 0) {
          setActiveSlide(slide - 1);
        } else {
          hijackedRef.current = false;
          releasedRef.current = true;
        }
      }
    }

    function onWheel(e: WheelEvent) {
      if (!hijackedRef.current) return;
      e.preventDefault();
      processScroll(e.deltaY > 0 ? 'down' : 'up');
    }

    let touchStartY = 0;
    function onTouchStart(e: TouchEvent) { touchStartY = e.touches[0].clientY; }
    function onTouchMove(e: TouchEvent)  { if (hijackedRef.current) e.preventDefault(); }
    function onTouchEnd(e: TouchEvent) {
      if (!hijackedRef.current) return;
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 40) return;
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
    <section
      ref={sectionRef}
      id="products"
      className="relative z-[2] bg-[#0e0e0e] md:w-full py-16 md:py-24 overflow-hidden rounded-t-[2rem] -mt-6"
    >
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
            Our <span className="text-[#014aad]">Offerings</span>
          </motion.h2>

          {/* Vertical dots + animated paragraph */}
          <div className="md:flex-1 md:max-w-[60%] flex items-start gap-4">
            {/* Dot slider controls */}
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

        {/* ── Pill tabs ────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          {TABS.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none ${
                activeTab === i
                  ? 'bg-[#014aad] text-white shadow-sm'
                  : 'bg-white/[0.08] text-white/60 hover:bg-white/[0.14] hover:text-white border border-white/[0.10]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Product grid — transitions on tab change ─────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {TABS[activeTab].products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default ServicesSection;
