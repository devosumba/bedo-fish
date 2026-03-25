"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

// ─── Product types and data ───────────────────────────────────────────────────

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  size: string;
  badge?: string;
};

const TABS: Array<{ label: string; products: Product[] }> = [
  {
    label: 'Customer Favorites',
    products: [
      { id: 1, name: 'Roasted Tilapia',  description: 'Roasted tilapia from Lake Victoria', price: 'Ksh 380', image: '/images/roasted-tilapia.jpg', size: 'Small', badge: 'Best Seller' },
      { id: 2, name: 'Omena',            description: 'Crunchy deep fried omena',            price: 'Ksh 500', image: '/images/omena-prod.jpg',      size: '500ml', badge: 'Popular'     },
      { id: 3, name: 'Roasted Tilapia',  description: 'Roasted tilapia from Lake Victoria', price: 'Ksh 800', image: '/images/roasted-tilapia.jpg', size: 'Large', badge: 'Value'       },
    ],
  },
  {
    label: 'Roasted Tilapia',
    products: [
      { id: 4, name: 'Roasted Tilapia', description: 'Roasted tilapia from Lake Victoria', price: 'Ksh 380', image: '/images/roasted-tilapia.jpg', size: 'Small', badge: 'Best Seller' },
      { id: 5, name: 'Roasted Tilapia', description: 'Roasted tilapia from Lake Victoria', price: 'Ksh 600', image: '/images/roasted-tilapia.jpg', size: 'Medium'                      },
      { id: 6, name: 'Roasted Tilapia', description: 'Roasted tilapia from Lake Victoria', price: 'Ksh 800', image: '/images/roasted-tilapia.jpg', size: 'Large'                       },
    ],
  },
  {
    label: 'Omena',
    products: [
      { id: 7, name: 'Omena', description: 'Crunchy deep fried omena', price: 'Ksh 180', image: '/images/omena-prod.jpg', size: '250ml' },
      { id: 8, name: 'Omena', description: 'Crunchy deep fried omena', price: 'Ksh 300', image: '/images/omena-prod.jpg', size: '500ml' },
      { id: 9, name: 'Omena', description: 'Crunchy deep fried omena', price: 'Ksh 580', image: '/images/omena-prod.jpg', size: '1000ml' },
    ],
  },
];

// ─── Slider paragraphs (2 items — third paragraph deleted per spec) ──────────

const PARAGRAPHS = [
  `Sustainably sourced from Lake Victoria to your table. Roasted fresh daily using energy-efficient ovens. No preservatives, no shortcuts! Packaged to international standards.`,
  `Fresh, sustainably sourced fish roasted daily and delivered with the quality and care your table deserves.`,
] as const;

// ─── Product card ─────────────────────────────────────────────────────────────

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [qty,      setQty]      = useState(0);
  const [liked,    setLiked]    = useState(false);
  const [heartPop, setHeartPop] = useState(false);
  const { addToCart } = useCart();

  function handleLike(e: React.MouseEvent) {
    e.stopPropagation();
    setLiked((v) => !v);
    setHeartPop(true);
    setTimeout(() => setHeartPop(false), 200);
  }

  function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation();
    const qtyToAdd = qty === 0 ? 1 : qty;
    addToCart({ name: product.name, size: product.size, price: product.price }, qtyToAdd);
    setQty(0);
  }

  return (
    // Outer wrapper: overflow-visible so the ::before rotating ring (inset: -2px)
    // isn't clipped — mirrors the .portfolio-card two-layer pattern exactly.
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="product-card relative overflow-visible rounded-2xl"
    >
      {/* Inner wrapper: height driven by content, no fixed aspect ratio */}
      <div className="flex flex-col bg-white rounded-2xl overflow-hidden cursor-pointer border border-gray-100">

        {/* Image area — 3:2 aspect ratio, self-contained */}
        <div className="relative w-full aspect-[3/2] bg-gray-100 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover"
          />

          {/* Named badge — top-left, matches size badge visually */}
          {product.badge && (
            <span className="absolute top-2.5 left-2.5 z-10 text-[10px] font-semibold px-2 py-0.5 rounded-full text-white bg-[#014aad]">
              {product.badge}
            </span>
          )}

          {/* Size badge — top-right, same pill size as named badge */}
          <span className="absolute top-2.5 right-2.5 z-10 text-[10px] font-semibold px-2 py-0.5 rounded-full text-white bg-[#014aad]">
            {product.size}
          </span>

          {/* Like button — bottom-right: solid #014aad circle, white heart */}
          <motion.button
            aria-label={liked ? 'Unlike' : 'Like'}
            onClick={handleLike}
            whileHover={{ scale: 1.1 }}
            animate={heartPop ? { scale: [1, 0.9, 1] } : { scale: 1 }}
            transition={heartPop
              ? { duration: 0.2, ease: 'easeOut', times: [0, 0.5, 1] }
              : { duration: 0.2, ease: 'easeOut' }
            }
            className="absolute bottom-2 right-2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-[#014aad]"
          >
            <svg
              width="14" height="14" viewBox="0 0 24 24"
              fill={liked ? 'white' : 'none'}
              stroke="white"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </motion.button>
        </div>

        {/* Card content — natural height, ends after last element */}
        <div className="p-3 flex flex-col gap-2">

          {/* Name left, price right — same row */}
          <div className="flex flex-row items-center justify-between gap-2 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight truncate">{product.name}</h3>
            <span className="font-bold text-[#014aad] text-sm shrink-0">{product.price}</span>
          </div>

          {/* Description — own line below name/price row */}
          <p className="text-gray-400 text-xs truncate -mt-1">{product.description}</p>

          {/* Quantity counter — w-full, matches Add to Cart width */}
          <div className="w-full flex flex-row items-center justify-between bg-gray-100 rounded-full px-2 py-1">
            <button
              aria-label="Decrease quantity"
              onClick={(e) => { e.stopPropagation(); setQty((q) => Math.max(0, q - 1)); }}
              className="w-5 h-5 flex items-center justify-center rounded-full text-gray-600 hover:bg-white transition-colors text-xs font-bold leading-none"
            >−</button>
            <span className="text-xs font-semibold text-gray-800 w-5 text-center leading-none">{qty}</span>
            <button
              aria-label="Increase quantity"
              onClick={(e) => { e.stopPropagation(); setQty((q) => q + 1); }}
              className="w-5 h-5 flex items-center justify-center rounded-full text-gray-600 hover:bg-white transition-colors text-xs font-bold leading-none"
            >+</button>
          </div>

          {/* Add to Cart — w-full, same width as counter */}
          <button
            className="w-full bg-[#014aad] text-white text-xs font-semibold py-2.5 rounded-full hover:bg-[#0157cc] transition-colors flex items-center justify-center gap-1.5"
            onClick={handleAddToCart}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
      className="relative z-[2] bg-[#0e0e0e] md:w-full py-16 md:py-24 overflow-hidden rounded-[2rem] -mt-6"
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
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
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
