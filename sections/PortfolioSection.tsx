"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────
type Project = {
  name: string;
  tag: string;
  src: string;
  alt: string;
  modalTags?: string;
  headingWhite?: string;
  headingOrange?: string;
  description?: string;
  techStack?: string[];
  features?: string[];
  url?: string;
};

// ─── Top Personal Projects ─────────────────────────────────────────────────
const TOP_PROJECTS: Project[] = [
  {
    name: 'Peak Mobile CSV Cleaner',
    tag: 'Telco',
    src: '/assets/portfolio/1.jpg',
    alt: 'Project 1 thumbnail',
    modalTags: 'Telco · CSV Cleaning Web App',
    headingWhite: 'Peak Mobile',
    headingOrange: 'CSV Cleaner',
    description:
      'Built for telecoms and mobile-first teams. Upload messy CSV files, automatically validate and format mobile number data, catch errors at a glance, fix them inline, and export a clean, submission-ready file in seconds.',
    features: [
      'Sign In with Auth0',
      'CSV Upload & Automated Validation',
      'Mobile Number Formatting & Error Detection',
      'Inline Issue Fixing & Data Correction',
      'Clean CSV Export ready for API submission',
      'Deployed on Vercel',
    ],
    url: 'https://peakhackathon.vercel.app/',
  },
  {
    name: 'Vaultmont Wealth Lab',
    tag: 'Fintech',
    src: '/assets/portfolio/2.jpg',
    alt: 'Project 2 thumbnail',
    modalTags: 'Fintech · Trading & Investment Platform',
    headingWhite: 'Vaultmont',
    headingOrange: 'Wealth Lab',
    description:
      'Your all-in-one ecosystem for mastering trading and investing. Vaultmont brings together financial education, market insights, and investor tools to help you move from learning to earning with confidence.',
    features: [
      'Sign In with Google Auth',
      'Payments via Paystack, Whoop & Crypto',
      'Real-Time Investor Monitoring Dashboard',
      'Email Marketing Integration',
      'Corporate Website & Brand Identity',
      'Fully featured Fintech Platform',
    ],
    url: 'https://www.vaultmont.com/',
  },
  {
    name: 'Nyumbani Greens',
    tag: 'E-Commerce',
    src: '/assets/portfolio/3.jpg',
    alt: 'Project 3 thumbnail',
    modalTags: 'AgriTech · E-Commerce Platform',
    headingWhite: 'Nyumbani',
    headingOrange: 'Greens',
    description:
      'Farm to doorstep, the way it should be. Nyumbani Greens connects you directly to local farmers growing fresh African Indigenous Vegetables and wholesome staples using organic and regenerative methods — delivered straight to your door.',
    features: [
      'User Authentication & Account Management',
      'Real-Time Order Tracking',
      'Mobile Money Payments via M-Pesa API',
      'Farmer & Product Catalogue',
      'Mobile-First Responsive Design',
    ],
    url: 'https://nyumbanigreens.com/?srsltid=AfmBOoqXMqPLn3a3ZPRCkxyIXYotRKD_LmrWzSdar-ERhmHHSmB9Hdi_',
  },
];

// ─── Landing Pages & Funnels — Page 1 ─────────────────────────────────────
const LANDING_PAGE_1: Project[] = [
  {
    name: 'Connar Consultants',
    tag: 'Consulting',
    src: '/assets/website-thumbnails/1.jpg',
    alt: 'Connar Consultants website thumbnail',
    modalTags: 'Corporate Website · Environmental & Development Consulting',
    headingWhite: 'Connar',
    headingOrange: 'Consultants',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'GitHub Pages'],
    features: [
      'Full corporate web presence',
      'Research portfolio showcase',
      'Advisory services pages',
      'Team profiles section',
      'Responsive design for all devices',
      'Deployed on GitHub Pages',
    ],
    url: 'http://connarkenya.org/',
  },
  {
    name: 'NRG Radio',
    tag: 'Media',
    src: '/assets/website-thumbnails/2.jpg',
    alt: 'NRG Radio website thumbnail',
    modalTags: 'MVP Application Portal · Media & Talent Recruitment',
    headingWhite: 'NRG',
    headingOrange: 'Radio',
    techStack: ['HTML', 'CSS', 'JavaScript', 'GitHub Pages'],
    features: [
      'Branded job application portal',
      'Job listing pages',
      'Application flow and form system',
      'Contact system',
      'NRG visual identity implementation',
      'Deployed on GitHub Pages',
    ],
    url: 'https://osumbaaustine.github.io/MVP-s.grind.nrgradio/index.html',
  },
  {
    name: 'Kivu Noir Café',
    tag: 'Hospitality',
    src: '/assets/website-thumbnails/3.jpg',
    alt: 'Kivu Noir Café website thumbnail',
    modalTags: 'Web App · Hospitality & Online Ordering',
    headingWhite: 'Kivu Noir',
    headingOrange: 'Café',
    techStack: ['Online Menu System', 'Table Reservation', 'Space Booking', 'AWS S3', 'Responsive Design'],
    features: [
      'Full online menu with categorised drink listings',
      'Table reservation system',
      'Space booking functionality',
      'AWS S3 hosted media',
      'High-end customer experience design',
      'Mobile-responsive interface',
    ],
    url: 'https://www.kivunoir.rw/',
  },
];

// ─── Landing Pages & Funnels — Page 2 ─────────────────────────────────────
const LANDING_PAGE_2: Project[] = [
  {
    name: 'Climate4Women',
    tag: 'Advocacy',
    src: '/assets/website-thumbnails/4.jpg',
    alt: 'Climate4Women website thumbnail',
    modalTags: 'Corporate Website · Climate & Gender Advocacy',
    headingWhite: 'Climate4',
    headingOrange: 'Women',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'SEO'],
    features: [
      'Mission and vision communication',
      'Research projects showcase',
      'Services pages',
      'SEO optimised for international audience',
      'Responsive design',
      'Professional advocacy-focused UI',
    ],
    url: 'https://climate4women.org/',
  },
  {
    name: 'Statsspeak',
    tag: 'Data & Tech',
    src: '/assets/website-thumbnails/5.jpg',
    alt: 'Statsspeak website thumbnail',
    modalTags: 'Corporate Website · Data & Technology',
    headingWhite: 'Stats',
    headingOrange: 'speak',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    features: [
      'Brand positioning for analytics company',
      'Services and solutions pages',
      'Clean professional enterprise interface',
      'Responsive design',
      'Business-focused information architecture',
    ],
    url: 'https://statsspeak.co.ke/',
  },
  {
    name: 'Getavin',
    tag: 'Trade & Finance',
    src: '/assets/website-thumbnails/6.jpg',
    alt: 'Getavin website thumbnail',
    modalTags: 'Corporate Website · International Trade & Finance',
    headingWhite: 'Get',
    headingOrange: 'avin',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'GitHub Pages'],
    features: [
      'Global reach and expertise showcase',
      'Customised financial solutions pages',
      'Professional enterprise web presence',
      'Structured information architecture',
      'Responsive design',
      'Deployed on GitHub Pages',
    ],
    url: 'https://devosumba.github.io/getavin/',
  },
];

// ─── Enterprise UI/UX Designs — Page 1 ────────────────────────────────────
const UIUX_PAGE_1: Project[] = [
  {
    name: 'Mara DeFi',
    tag: 'Fintech',
    src: '/assets/UIUX-thumbnails/1.jpg',
    alt: 'Mara DeFi UI/UX thumbnail',
    modalTags: 'Fintech · Web3 · Mobile Application',
    headingWhite: 'Mara',
    headingOrange: 'DeFi',
    techStack: ['Figma', 'User Flow Architecture', 'Design Systems', 'Web3 UX', 'Mobile-First Design', 'Prototyping'],
    features: [
      'Smart contract transaction flow with step-by-step confirmation UI',
      'NFT land title visualisation and ownership transfer screens',
      'Sign In with Google Auth & Facebook',
      'Wallet connection and blockchain payment interface',
      'Role-based user flows — conservationist vs. land seller',
      'Mobile-first responsive design system',
      'Accessibility-first typography and contrast standards',
    ],
    url: '#',
  },
  {
    name: 'D.light Sales Leaderboard',
    tag: 'Enterprise',
    src: '/assets/UIUX-thumbnails/2.jpg',
    alt: 'D.light Sales Leaderboard UI/UX thumbnail',
    modalTags: 'Enterprise Dashboard · Internal Tooling · Data Visualisation',
    headingWhite: 'D.light Sales',
    headingOrange: 'Leaderboard',
    techStack: ['Figma', 'Dashboard UX', 'Data Visualisation Design', 'Enterprise UI', 'Design Systems', 'Responsive Design'],
    features: [
      'Real-time commission tracking with data visualisation components',
      'Live agent location mapping during active workdays',
      'Regional leaderboard with ranking and performance indicators',
      'Sign In with Google Auth & Facebook',
      'Role-based dashboard views — agent vs. regional manager',
      'Responsive layout optimised for tablet and mobile field use',
      'Design system with reusable data card and chart components',
    ],
    url: '#',
  },
  {
    name: 'D.light Consignment Tracker',
    tag: 'Inventory',
    src: '/assets/UIUX-thumbnails/3.jpg',
    alt: 'D.light Consignment Tracker UI/UX thumbnail',
    modalTags: 'Inventory Management · Internal Operations · Mobile Application',
    headingWhite: 'D.light Consignment',
    headingOrange: 'Tracker',
    techStack: ['Figma', 'Operations UX', 'Workflow Design', 'Inventory UI', 'Mobile-First Design', 'Prototyping', 'Design Systems'],
    features: [
      'Live inventory dashboard with real-time stock change tracking',
      'Consignment allocation and live tracking interface',
      'Goods booking, quarantine flagging and checkout workflows',
      'Sign In with Google Auth & Facebook',
      'Role-based access — storekeeper vs. operations manager',
      'Offline-tolerant UI patterns for low-connectivity environments',
      'Reusable component library for scalable design handoff',
    ],
    url: '#',
  },
];

// ─── Enterprise UI/UX Designs — Page 2 ────────────────────────────────────
const UIUX_PAGE_2: Project[] = [
  {
    name: 'Farmers Connect',
    tag: 'AgriTech',
    src: '/assets/UIUX-thumbnails/4.jpg',
    alt: 'Farmers Connect UI/UX thumbnail',
    modalTags: 'AgriTech · Mobile Application · South Africa',
    headingWhite: 'Farmers',
    headingOrange: 'Connect',
    techStack: ['Figma', 'User Research', 'Mobile UX', 'AgriTech Design', 'Onboarding UX', 'Icon Design', 'Accessibility'],
    features: [
      'Service provider discovery and connection interface',
      'Farming resource library with categorised content',
      'Peer support and community feed UI',
      'Sign In with Google Auth & Facebook',
      'Onboarding flow tailored to low-digital-literacy users',
      'Location-aware service recommendations',
      'Mobile-first design optimised for Android-first markets',
    ],
    url: '#',
  },
  {
    name: 'House of Maji',
    tag: 'Consumer',
    src: '/assets/UIUX-thumbnails/5.jpg',
    alt: 'House of Maji UI/UX thumbnail',
    modalTags: 'Consumer App · Order Management · Real-Time Tracking',
    headingWhite: 'House of',
    headingOrange: 'Maji',
    techStack: ['Figma', 'Consumer UX', 'Order Flow Design', 'Real-Time UI', 'Delivery Tracking', 'Mobile-First Design', 'Prototyping'],
    features: [
      'Order placement flow with address and container selection',
      'Real-time delivery tracking with live status updates',
      'Repeat order and scheduling functionality',
      'Sign In with Google Auth & Facebook',
      'Driver-facing delivery confirmation interface',
      'Notification design for order and delivery milestones',
      'Clean, high-contrast UI optimised for quick daily use',
    ],
    url: '#',
  },
];

// ─── Category structure ────────────────────────────────────────────────────
// Each category holds an array of pages; each page holds up to 3 projects.
const CATEGORIES: { pages: Project[][] }[] = [
  { pages: [TOP_PROJECTS] },
  { pages: [LANDING_PAGE_1, LANDING_PAGE_2] },
  { pages: [UIUX_PAGE_1, UIUX_PAGE_2] },
];

const TAGS = ['Top Personal Projects', 'Landing Pages & Funnels', 'Enterprise UI/UX Designs'];

// ─── Project Modal ────────────────────────────────────────────────────────────
const ProjectModal = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={project.name}
        className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl"
        style={{
          background: '#0f0f1a',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
        }}
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 text-sm hover:bg-white/20 hover:text-white transition-colors focus:outline-none z-10"
        >
          ✕
        </button>

        <div className="p-8 md:p-10 flex flex-col gap-8">

          {/* ── ROW 1 — Heading + Description + Tech Stack ─────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 items-start">

            <h3 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight pr-8 md:pr-0">
              <span className="text-white">{project.headingWhite ?? project.name} </span>
              {project.headingOrange && (
                <span className="text-[#014aad]">{project.headingOrange}</span>
              )}
            </h3>

            <div className="flex flex-col gap-4">
              {project.description && (
                <p className="text-white/65 text-[15px] leading-relaxed">
                  {project.description}
                </p>
              )}

              {/* Tech stack pills */}
              {project.techStack && project.techStack.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: 'rgba(1,74,173,0.10)',
                        color: '#014aad',
                        border: '1px solid rgba(1,74,173,0.25)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── ROW 2 — Thumbnail + Features + CTA ────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">

            {/* Thumbnail */}
            <div
              className="rounded-2xl overflow-hidden flex items-center justify-center"
              style={{ background: '#1a1a2e', minHeight: '200px' }}
            >
              {project.src ? (
                <img
                  src={project.src}
                  alt={project.alt}
                  className="w-full h-full object-cover"
                  style={{ minHeight: '200px' }}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-8" style={{ minHeight: '200px' }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <span className="text-white/20 text-xs font-medium">No preview</span>
                </div>
              )}
            </div>

            {/* Features + CTA */}
            <div className="flex flex-col gap-4">

              <p className="text-white font-bold text-sm tracking-wide">Features</p>

              <ul className="flex flex-col gap-2 flex-1">
                {project.features?.map((feat, i) => (
                  <li key={i} className="flex gap-3 text-[14px] text-white/70 items-start">
                    <svg
                      className="shrink-0 mt-0.5"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle cx="7.5" cy="7.5" r="7.5" fill="#014aad" fillOpacity="0.18" />
                      <path d="M4.5 7.5L6.5 9.5L10.5 5.5" stroke="#014aad" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-[#014aad] hover:bg-[#1a5cbf] text-white font-bold text-sm py-3 rounded-full transition-colors focus:outline-none"
                >
                  <span className="flex items-center justify-center gap-2">View Project <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M7 7h10v10"/></svg></span>
                </a>
              )}
            </div>

          </div>

        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Section ──────────────────────────────────────────────────────────────────
const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [subPage, setSubPage] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Reset sub-page when switching categories
  const handleCategoryChange = useCallback((i: number) => {
    setActiveCategory(i);
    setSubPage(0);
  }, []);

  const openModal = useCallback((project: Project) => {
    if (!project.name) return;
    setSelectedProject(project);
  }, []);

  const closeModal = useCallback(() => setSelectedProject(null), []);

  const currentPages = CATEGORIES[activeCategory].pages;
  const currentCards = currentPages[subPage] ?? currentPages[0];

  return (
    <>
      <section id="portfolio" className="relative z-[2] bg-[#0e0e0e] w-full py-16 md:py-24 overflow-hidden rounded-3xl">

        {/* Decorative blobs */}
        <div className="absolute -top-24 right-[20%] w-96 h-96 bg-[#014aad] opacity-[0.07] rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-[15%] w-[500px] h-[400px] bg-[#014aad] opacity-[0.05] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 right-[5%] w-48 h-48 bg-[#2a6fd4] opacity-[0.04] rounded-full blur-[60px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">

          {/* ── Header row ────────────────────────────────────────────────── */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12 md:mb-16 gap-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight"
            >
              My <span className="text-[#014aad]">Portfolio</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:flex-1 md:max-w-[60%] text-white text-[15px] leading-relaxed"
            >
              Technical lean: End-to-end builds. From architecture decisions to deployed, production-ready software.
            </motion.p>
          </div>

          {/* ── Filter tags ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="flex flex-row flex-wrap justify-center gap-2 md:gap-3 mb-10 w-full"
          >
            {TAGS.map((label, i) => (
              <button
                key={label}
                onClick={() => handleCategoryChange(i)}
                className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold border transition-colors duration-200 focus:outline-none whitespace-nowrap ${
                  i === activeCategory
                    ? 'bg-[#014aad] border-[#014aad] text-white'
                    : 'bg-transparent border-white text-white hover:bg-white/10'
                }`}
              >
                {label}
              </button>
            ))}
          </motion.div>

          {/* ── Pagination dots — mobile only (above cards) ───────────────── */}
          {currentPages.length > 1 && (
            <div className="flex md:hidden items-center justify-center gap-2 mb-6">
              {currentPages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSubPage(i)}
                  aria-label={`Page ${i + 1}`}
                  className={`rounded-full transition-all duration-300 focus:outline-none ${
                    i === subPage
                      ? 'w-6 h-2 bg-[#014aad]'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}

          {/* ── Cards ─────────────────────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${subPage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {currentCards.map((project, i) => {
                const { name, tag, src, alt } = project;
                const isReal = !!name;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.08 }}
                    className="portfolio-card relative overflow-visible rounded-3xl"
                  >
                    <div
                      className={`relative flex flex-col bg-white rounded-3xl overflow-hidden ${isReal ? 'cursor-pointer' : ''}`}
                      onClick={() => openModal(project)}
                      role={isReal ? 'button' : undefined}
                      tabIndex={isReal ? 0 : undefined}
                      aria-label={isReal ? `Open ${name} details` : undefined}
                      onKeyDown={(e) => { if (isReal && (e.key === 'Enter' || e.key === ' ')) openModal(project); }}
                    >
                      {/* Thumbnail */}
                      <div
                        className="relative h-52 w-full overflow-hidden rounded-t-3xl"
                        style={{ backgroundColor: '#f0f0f0' }}
                      >
                        {src ? (
                          <>
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none select-none">
                              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                <circle cx="12" cy="13" r="4" />
                              </svg>
                              <span className="text-[#b0b0b0] text-xs font-medium">Upload thumbnail</span>
                            </div>
                            <img
                              src={src}
                              alt={alt}
                              className="absolute inset-0 w-full h-full object-cover"
                              onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                          </>
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 select-none">
                            {isReal ? (
                              <>
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                  <circle cx="12" cy="13" r="4" />
                                </svg>
                                <span className="text-[#b0b0b0] text-xs font-medium">Upload thumbnail</span>
                              </>
                            ) : (
                              <>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c8c8c8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                  <circle cx="12" cy="12" r="10" />
                                  <line x1="12" y1="8" x2="12" y2="12" />
                                  <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                <span className="text-[#c8c8c8] text-xs font-medium tracking-wide">Coming Soon</span>
                              </>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Bottom info bar */}
                      <div className="flex items-center justify-between px-4 py-3">
                        <span className="text-[#0e0e0e] font-bold text-base">{name || '—'}</span>
                        <div className="flex items-center gap-2">
                          {tag && (
                            <span className="bg-gray-100 text-gray-500 text-xs font-medium px-3 py-1 rounded-full">{tag}</span>
                          )}
                          <button
                            aria-label={isReal ? `Open ${name} details` : 'Coming soon'}
                            disabled={!isReal}
                            onClick={(e) => { e.stopPropagation(); openModal(project); }}
                            className="w-8 h-8 rounded-full bg-[#014aad] flex items-center justify-center text-white text-sm font-bold hover:bg-[#1a5cbf] transition-colors focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M7 7h10v10"/></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* ── Pagination dots — desktop only (below cards) ──────────────── */}
          {currentPages.length > 1 && (
            <div className="hidden md:flex items-center justify-center gap-2 mt-8">
              {currentPages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSubPage(i)}
                  aria-label={`Page ${i + 1}`}
                  className={`rounded-full transition-all duration-300 focus:outline-none ${
                    i === subPage
                      ? 'w-6 h-2 bg-[#014aad]'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}

        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeModal} />
        )}
      </AnimatePresence>
    </>
  );
};

export default PortfolioSection;
