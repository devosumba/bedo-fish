"use client";

/*
 * Navbar — sticky top-3 (12px offset), pill height h-[67px] desktop / h-[55px] mobile
 * Desktop pill width: max-w-6xl on md, lg:max-w-[74vw] on lg+ (~74% viewport, centered)
 * No scroll-conditional background. Pill floats directly over hero via z-[1000].
 * Icons (right, desktop): Cart | separator | TikTok | Instagram | Phone
 */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

const NAV_ITEMS = [
  { label: 'Products',  href: '#products',   section: 'products'   },
  { label: 'Shop',      href: '#portfolio',  section: 'portfolio'  },
  { label: 'Our Story', href: '#experience', section: 'experience' },
  { label: 'Impact',    href: '#impact',     section: 'impact'     },
  { label: 'Invest',    href: '#contact',    section: 'contact'    },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useCart();

  /* Active section tracking */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    ['hero', 'products', 'portfolio', 'experience', 'impact', 'contact'].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const isActive = (section: string) => section !== '' && activeSection === section;

  const linkCls = (section: string) =>
    'px-4 py-2 text-sm rounded-full transition-colors duration-200 focus:outline-none whitespace-nowrap ' +
    (isActive(section)
      ? 'bg-[#014aad] text-white font-semibold'
      : 'text-[#014aad] font-medium hover:bg-[#014aad]/10');

  return (
    <motion.nav
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
      className="sticky top-3 w-full flex justify-center pt-0 pb-2 px-4 z-[1000]"
      aria-label="Main Navigation"
    >
      {/* ── Desktop pill ─────────────────────────────────────────────── */}
      <div
        className="hidden md:grid w-full max-w-6xl lg:max-w-[74vw] bg-white rounded-full h-[67px] px-4 overflow-visible"
        style={{
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          boxShadow: '0 4px 30px rgba(0,0,0,0.12)',
          border: '1px solid #e5e7eb',
        }}
      >
        {/* Left — Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setActiveSection('hero'); }}
          className="flex items-center pl-2"
        >
          <Image src="/assets/bedo-nav-logo.png" alt="Bedo Fish" width={120} height={40} className="object-contain" priority />
        </a>

        {/* Center — Nav links */}
        <ul className="flex items-center justify-center gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={() => item.section && setActiveSection(item.section)}
                className={linkCls(item.section)}
                aria-current={isActive(item.section) ? 'page' : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right — Cart | | TikTok | Instagram | Phone */}
        <div className="flex items-center gap-3 pr-2">
          {/* Cart */}
          <a href="#portfolio" onClick={() => setActiveSection('portfolio')} aria-label="Cart"
            className="relative text-[#014aad] hover:text-[#0145a3] transition-colors duration-200 focus:outline-none">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 flex items-center justify-center rounded-full bg-[#014aad] text-white text-[9px] font-bold px-0.5 leading-none border border-white">
                {cartCount}
              </span>
            )}
          </a>

          {/* Separator */}
          <span className="text-gray-300 select-none font-light text-lg leading-none">|</span>

          {/* TikTok */}
          <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="TikTok"
            className="text-[#014aad] hover:text-[#0145a3] transition-colors duration-200 focus:outline-none">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
            </svg>
          </a>

          {/* Instagram */}
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
            className="text-[#014aad] hover:text-[#0145a3] transition-colors duration-200 focus:outline-none">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>

          {/* Phone */}
          <a href="tel:+" aria-label="Call us"
            className="text-[#014aad] hover:text-[#0145a3] transition-colors duration-200 focus:outline-none">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.59 3.38a2 2 0 0 1 2-2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* ── Mobile pill ───────────────────────────────────────────────── */}
      <div className="md:hidden w-full">
        <div
          className="flex items-center justify-between w-full bg-white rounded-full px-3 h-[55px]"
          style={{ boxShadow: '0 4px 30px rgba(0,0,0,0.12)', border: '1px solid #e5e7eb' }}
        >
          {/* Logo */}
          <a href="#hero" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="pl-2">
            <Image src="/assets/bedo-nav-logo.png" alt="Bedo Fish" width={90} height={30} className="object-contain" priority />
          </a>

          {/* Right: Cart + hamburger */}
          <div className="flex items-center gap-3 pr-2">
            <a href="#portfolio" aria-label="Cart" className="relative text-[#014aad] hover:text-[#0145a3] transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 flex items-center justify-center rounded-full bg-[#014aad] text-white text-[9px] font-bold px-0.5 leading-none border border-white">
                  {cartCount}
                </span>
              )}
            </a>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="text-[#014aad] p-1 focus:outline-none"
            >
              {mobileOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-2 rounded-2xl overflow-hidden"
              style={{ border: '1px solid #e5e7eb' }}
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => { item.section && setActiveSection(item.section); setMobileOpen(false); }}
                  className={`flex items-center px-5 py-3.5 text-base transition-colors duration-200 ${
                    isActive(item.section)
                      ? 'bg-[#014aad] text-white font-semibold'
                      : 'text-[#014aad] font-normal hover:bg-[#014aad]/10'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              {/* Icons row */}
              <div className="flex items-center gap-5 px-5 py-4 border-t border-gray-100">
                <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-[#014aad] hover:text-[#0145a3] transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#014aad] hover:text-[#0145a3] transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a href="tel:+" aria-label="Call us" className="text-[#014aad] hover:text-[#0145a3] transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.59 3.38a2 2 0 0 1 2-2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
