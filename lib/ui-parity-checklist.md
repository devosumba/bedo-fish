# UI Parity Checklist

- Typography matches Figma: All font sizes, weights, and styles are mapped in tailwind.config.js and applied in components/sections.
- Spacing matches Figma: Custom spacing tokens defined in Tailwind theme and used throughout layout.
- Navbar active states: Pill style, color, and shadow as per Figma; IntersectionObserver for active highlighting.
- Mobile responsiveness: Responsive menu and layout, breakpoints as in Figma.
- No scroll snapping bugs: Anchor navigation uses smooth scroll, no snap-back.
- Scroll-to-top button works: Floating button appears after 400px scroll, smooth scroll to top.

## Mapping
- Figma section → /sections/SectionName.tsx
- Figma component → /components/ComponentName.tsx

## Where Implemented
- Typography: tailwind.config.js, components, sections
- Spacing: tailwind.config.js, layout, sections
- Navbar: /components/Navbar.tsx, /app/layout.tsx
- Responsiveness: Tailwind breakpoints, layout, Navbar
- Scroll-to-top: /components/ScrollToTopButton.tsx
