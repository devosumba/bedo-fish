
"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const NAV_ITEMS_LEFT: { label: string; href: string; section: string }[] = [];

const NAV_ITEMS_RIGHT = [
  { label: 'Products', href: '#about', section: 'about' },
  { label: 'Shop', href: '#portfolio', section: 'portfolio' },
];

const ALL_NAV_ITEMS = [...NAV_ITEMS_LEFT, ...NAV_ITEMS_RIGHT];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navVisible, setNavVisible] = useState(true);

  useEffect(() => {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;

    const sentinel = document.createElement('div');
    sentinel.style.height = '1px';
    sentinel.style.position = 'absolute';
    sentinel.style.top = '0';
    heroSection.prepend(sentinel);

    const obs = new IntersectionObserver(
      ([entry]) => setNavVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    obs.observe(sentinel);

    return () => { obs.disconnect(); sentinel.remove(); };
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    ['hero', 'about', 'portfolio', 'contact'].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const isActive = (section: string) => section !== '' && activeSection === section;

  const linkClass = (section: string, base: string) =>
    base +
    (isActive(section)
      ? ' bg-[#014aad] text-white shadow-sm font-semibold '
      : ' text-[#014aad] font-normal hover:bg-[#014aad]/10 hover:text-[#014aad] ');

  const activeItem = ALL_NAV_ITEMS.find((item) => isActive(item.section));

  return (
    <motion.nav
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: navVisible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: 'easeOut', delay: 0.05 }}
      style={{ pointerEvents: navVisible ? 'auto' : 'none' }}
      className="relative w-full flex justify-center pt-3 pb-2 px-4 z-[1000]"
      aria-label="Main Navigation"
    >
      {/* ── Desktop pill ─────────────────────────────────────────────────── */}
      <div
        className="hidden md:flex relative z-50 items-center justify-between w-full max-w-6xl bg-white rounded-full shadow-md px-2 md:px-4 h-[72px] font-lufga overflow-visible"
        style={{ boxShadow: '0 4px 30px rgba(0,0,0,0.10)', border: '1px solid #e5e7eb' }}
      >
        {/* Logo on far left */}
        <div className="flex items-center">
          <a href="#hero" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setActiveSection('hero'); }}>
            <Image src="/assets/bedo-nav-logo.png" alt="Bedo Fish" width={120} height={40} className="object-contain" priority />
          </a>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-4">
          <a href="mailto:johnaustineosumba@gmail.com"
            className="text-[#014aad] hover:text-[#0145a3] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#014aad]" aria-label="Email">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/john-austine-osumba-689327207/" target="_blank" rel="noopener noreferrer"
            className="text-[#014aad] hover:text-[#0145a3] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#014aad]" aria-label="LinkedIn">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <a href="https://github.com/devosumba" target="_blank" rel="noopener noreferrer"
            className="text-[#014aad] hover:text-[#0145a3] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#014aad]" aria-label="GitHub">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
          </a>
        </div>

        {/* Right nav links */}
        <ul className="flex items-center gap-2 md:gap-6">
          {NAV_ITEMS_RIGHT.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={() => item.section && setActiveSection(item.section)}
                className={linkClass(item.section, 'px-7 py-3 text-base rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#014aad] ')}
                tabIndex={0}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Mobile pill ──────────────────────────────────────────────────── */}
      <div className="md:hidden w-full">
        <div
          className="flex items-center justify-between w-full bg-white rounded-full px-3 h-[60px] font-lufga"
          style={{ boxShadow: '0 4px 30px rgba(0,0,0,0.10)', borderRadius: '9999px', border: '1px solid #e5e7eb' }}
        >
          {/* Logo */}
          <a href="#hero" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="pl-2">
            <Image src="/assets/bedo-nav-logo.png" alt="Bedo Fish" width={90} height={30} className="object-contain" priority />
          </a>

          {/* Social icons + hamburger */}
          <div className="flex items-center gap-3 pr-4">
            <a href="mailto:johnaustineosumba@gmail.com"
              className="text-[#014aad] hover:text-[#0145a3] transition-colors duration-300" aria-label="Email">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/john-austine-osumba-689327207/" target="_blank" rel="noopener noreferrer"
              className="text-[#014aad] hover:text-[#0145a3] transition-colors duration-300" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="https://github.com/devosumba" target="_blank" rel="noopener noreferrer"
              className="text-[#014aad] hover:text-[#0145a3] transition-colors duration-300" aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </a>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="text-[#014aad] p-1 ml-1 focus:outline-none"
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
              className="mt-2 bg-white rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid #e5e7eb' }}
            >
              {ALL_NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    if (item.section === 'hero') {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                    item.section && setActiveSection(item.section);
                    setMobileOpen(false);
                  }}
                  className={`flex items-center px-5 py-3.5 text-base transition-colors duration-200 ${
                    isActive(item.section)
                      ? 'bg-[#014aad] text-white font-semibold'
                      : 'text-[#014aad] font-normal hover:bg-[#014aad]/10'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
