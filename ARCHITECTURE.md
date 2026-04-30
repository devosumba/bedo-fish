# ARCHITECTURE.md
> Living reference document for the Bedo Fish platform. Keep this file updated as the project evolves.

---

## 1. PROJECT OVERVIEW

Bedo Fish is a women-led social enterprise e-commerce platform selling premium smoked and roasted tilapia sourced from Lake Victoria, Kenya. The platform serves retail customers, institutional buyers, and export markets. It is built to be production-ready, scalable, and payment integrated.

**Development Phases:**

| Phase | Scope | Status |
|-------|-------|--------|
| 1 | Frontend - landing page, product browsing, cart, contact | In progress |
| 2 | Database design and backend API (Node.js, Express, PostgreSQL) | Planned |
| 3 | Payment integration - M-Pesa STK Push via PayHero, order confirmation, cart management, webhook handling | Planned |
| 4 | Admin dashboard, order tracking, inventory management | Planned |

---

## 2. TECH STACK

### Framework and Runtime
- **Next.js** 16.1.6 (App Router)
- **React** 19.2.3
- **React DOM** 19.2.3
- **Node.js** (project targets ES2017, runs on any LTS Node)

### Language
- **TypeScript** 5.9.3
- Strict mode disabled (`"strict": false` in tsconfig)
- Target: ES2017, Module: ESNext, JSX: react-jsx

### Styling
- **Tailwind CSS** v4.1.18 (via `@tailwindcss/postcss` PostCSS plugin)
- No separate `tailwind.config.js` - Tailwind v4 reads config from CSS directly
- Global styles in `app/globals.css`
- CSS custom properties declared on `:root`

### Animation
- **Framer Motion** v12.34.1
- Used for: entrance animations, scroll-driven word reveal, horizontal image strip, typewriter, navbar mobile menu, modal transitions

### Build Tools
- **PostCSS** via `postcss.config.mjs` using `@tailwindcss/postcss`
- Next.js built-in bundler (Turbopack available via `next dev --turbo`)

### Type Definitions
- `@types/node` ^20
- `@types/react` ^19
- `@types/react-dom` ^19

### External Services
- **Formspree** (`f/mqeykpvy`) - contact form submission (no backend required in Phase 1)
- **Google Fonts** - Urbanist font family

### Full package.json Dependencies
```json
{
  "dependencies": {
    "framer-motion": "^12.34.1",
    "next": "16.1.6",
    "react": "19.2.3",
    "react-dom": "19.2.3"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.18",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "tailwindcss": "^4.1.18",
    "typescript": "5.9.3"
  }
}
```

---

## 3. PROJECT STRUCTURE

```
bedo-fish/
├── app/
│   ├── layout.tsx          Root layout: CartProvider, PageLoader, Navbar, body wrapper
│   ├── page.tsx            Homepage: mounts all sections in order
│   ├── loading.tsx         Suspense fallback: shows bedo-loader.gif at 160x160px
│   └── globals.css         Global styles: fonts, CSS variables, Tailwind import,
│                           keyframe animations, scrollbar, portfolio card effects,
│                           product card styles, mobile overflow prevention
│
├── sections/
│   ├── HeroSection.tsx     Full-viewport hero with background image, typewriter,
│                           glassmorphic badge, and staggered CTA
│   ├── ServicesSection.tsx Product catalogue: tabs, product cards, scroll-hijack
│                           paragraph slider, Add to Cart integration
│   ├── ExperienceSection.tsx Our Story: scroll-driven word reveal paragraph +
│                           sticky horizontal image strip (300vh scroll room)
│   ├── ImpactSection.tsx   3 stat cards with offset blue frame and image placeholder
│   ├── PortfolioSection.tsx Dark section: project cards with modal, category tabs,
│                           rotating border hover effect
│   ├── ContactSection.tsx  Multi-step contact form (email then message),
│                           Formspree, social links, credential stats
│   ├── Hero.tsx            Placeholder template (unused in production page)
│   ├── Resume.tsx          Placeholder section (unused)
│   ├── Service.tsx         Placeholder section (unused)
│   └── Project.tsx         Placeholder section (unused)
│
├── components/
│   ├── Navbar.tsx          Sticky pill navbar, IntersectionObserver active state,
│                           cart badge, mobile hamburger, social icons
│   ├── PageLoader.tsx      Fixed overlay GIF loader, 2s minimum display
│   ├── ScrollToTop.tsx     Fixed bottom-right scroll-to-top button (shows at 300px)
│   ├── TypewriterName.tsx  Reusable typewriter with per-word cycling, dynamic width
│   ├── HelloBadge.tsx      Bordered "Hello!" pill badge
│   ├── Button.tsx          Motion-wrapped primary/outline button variants
│   ├── ExperienceCard.tsx  Empty placeholder file
│   └── QuoteCard.tsx       Empty placeholder file
│
├── context/
│   └── CartContext.tsx     Cart state: CartItem type, addToCart, cartCount, useCart hook
│
├── lib/
│   └── design-tokens.ts    COLORS, SPACING, RADII, SHADOWS, TYPOGRAPHY token objects
│                           (NAV_ITEMS here are stale from template - use Navbar.tsx)
│
├── public/
│   ├── images/
│   │   ├── hero-bg.jpg               Hero section background
│   │   ├── bedo-loader.gif           Page loader animation
│   │   ├── roasted-tilapia.jpg       Roasted Tilapia product image
│   │   ├── omena-prod.jpg            Omena product image
│   │   ├── landscape-scroll/         Our Story horizontal strip (1.jpg - 6.jpg)
│   │   └── portrait-scroll/          Our Story horizontal strip (1.jpg - 6.jpg)
│   └── assets/
│       ├── bedo-nav-logo.png         Navbar logo
│       ├── Vector 1 hello.png        Template asset (unused)
│       ├── austinehero.png           Template asset (unused)
│       ├── hero-image-1.png          Template asset (unused)
│       ├── portfolio/1-3.jpg         Portfolio card thumbnails
│       ├── website-thumbnails/1-6.jpg Portfolio modal thumbnails
│       └── UIUX-thumbnails/1-5.jpg   Portfolio modal thumbnails
│
├── ARCHITECTURE.md         This file
├── package.json
├── tsconfig.json
├── postcss.config.mjs
├── next.config.ts          (Next.js config - default generated)
└── .gitignore              Excludes: .next/, node_modules/, .env*, .DS_Store, Thumbs.db
```

---

## 4. DESIGN SYSTEM

### Primary Color
`#014aad` - used across navbar active state, CTAs, blue decorative elements, Impact section, scrollbar, and word highlights.

### CSS Custom Properties (`:root` in globals.css)
```css
--accent: #014aad;
--background: #ffffff;
--foreground: #0e0e0e;
```

### Color Tokens (lib/design-tokens.ts)
```typescript
primary:    '#014aad'
secondary:  '#232323'
accent:     '#014aad'
background: '#FFF'
surface:    '#F5F5F5'
text:       '#232323'
muted:      '#A1A1A1'
```

### Colors Used Across Components
| Value | Usage |
|-------|-------|
| `#014aad` | Primary blue - CTAs, active nav, impact blue shape, word highlights, scrollbar |
| `#0145a3` | Hover state of primary blue (ScrollToTop) |
| `#013d8f` | Active/pressed state of primary blue (ScrollToTop) |
| `#0e0e0e` | Dark section background (Services, Portfolio), body text |
| `#555555` | Muted description text (Impact stat card descriptions) |
| `#ffffff` | Page background, navbar background (with opacity) |
| `rgba(1,74,173,0.15)` | Faded blue start color for word reveal animation |
| `rgba(0,0,0,0.5)` | Hero image dark overlay |

### Typography
- **Font family:** Urbanist (Google Fonts, loaded in globals.css)
- **Fallback:** sans-serif
- Scale used in Tailwind classes:

| Class | Usage |
|-------|-------|
| `text-sm` | Descriptions, badges, card meta |
| `text-base` | Body paragraphs, Impact section paragraph |
| `text-2xl / text-3xl` | Stat numbers (Impact cards) |
| `text-3xl / text-4xl` | Our Story paragraph |
| `text-4xl / text-5xl` | Section headings (Impact "Our Impact") |
| `font-extrabold` | All major headings and stat numbers |
| `leading-tight` | Headings |
| `leading-relaxed` | Body copy |
| `tracking-tight` | Our Story paragraph |

### Border Radius
| Token | Value | Usage |
|-------|-------|-------|
| `pill` | `2rem` | Navbar pill, CTA buttons |
| `card` | `1.25rem` | Product cards |
| `button` | `1.5rem` | Button component |
| `rounded-2xl` | `1rem` | Image strip thumbnails |
| `rounded-[18px]` | `18px` | Impact image placeholder |
| `16px` | `16px` | Impact blue decorative shape |
| `12px` | `12px` | Impact image div border-radius |

### Spacing and Layout
- Max content width: `max-w-6xl` (72rem / 1152px) with `px-4 md:px-8`
- Navbar height: 67px desktop, 55px mobile
- Section vertical padding: `pb-16 md:pb-24` (Impact), varies per section
- Gap scale: `gap-3`, `gap-4 md:gap-5`, `gap-8 md:gap-10`

### Breakpoints (Tailwind defaults)
| Prefix | Min-width |
|--------|-----------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

---

## 5. COMPONENTS INVENTORY

### Navbar (`components/Navbar.tsx`)
**Purpose:** Sticky top navigation with active section tracking, cart badge, social links, mobile menu.

**Key details:**
- Positioned `sticky top-3`, pill shape, `h-[67px]` desktop / `h-[55px]` mobile
- Background: `bg-white/80 backdrop-blur-md` with `#014aad` box shadow
- Active section detection: `IntersectionObserver` with viewport coverage picker
  - Tracks: `hero`, `products`, `portfolio`, `our-story`, `impact`, `contact`
  - `threshold: 0` for `our-story` and `impact` (fires on first pixel)
  - `threshold: 0.1` for all others
  - `rootMargin: '0px 0px 0px 0px'`
  - `pickActive()` compares `getBoundingClientRect` coverage to find most visible section
- Nav items: Products (`#products`), Our Story (`#our-story`), Impact (`#impact`), Invest (`#contact`)
- Right icons: Cart (with badge count from `useCart`), separator, TikTok, Instagram, Phone
- Mobile: cart icon + hamburger only; dropdown with AnimatePresence
- Logo clicks smooth-scroll to `#hero`

### HeroSection (`sections/HeroSection.tsx`)
**Purpose:** Full-viewport landing hero with product identity and CTA.

**Key details:**
- `min-h-[95vh]` mobile, `lg:h-screen`
- `marginTop: -87px` pulls it behind the sticky navbar
- Background: `/images/hero-bg.jpg` with `bg-black/50` overlay
- Glassmorphic badge: `backdrop-blur-sm bg-white/10 border-white/20`
- Typewriter slot: absolutely positioned with ghost span for stable width
  - Cycles: "Smoked" / "Roasted" at 80ms/char type, 50ms/char delete, 800ms pause
- CTA: "Products" (solid `#014aad` pill) + "Shop" (text, white)
- All elements enter with `motion` stagger delays

### ServicesSection (`sections/ServicesSection.tsx`)
**Purpose:** Product catalogue with tab filters, product cards, cart integration, scroll-hijack paragraph slider.

**Key details:**
- Dark background `#0e0e0e` with decorative blobs
- Tabs: Customer Favorites, Roasted Tilapia, Omena
- **Roasted Tilapia sizes/prices:** Small Ksh 380 / Medium Ksh 600 / Large Ksh 800
- **Omena sizes/prices:** 250ml Ksh 180 / 500ml Ksh 300 / 1000ml Ksh 580
- Each card: quantity counter, Add to Cart, Like button, size badge
- Scroll hijack: captures `wheel` and `touchmove` events when section is 50% visible (desktop) or paragraph container 90% visible (mobile); 2-tick threshold, 400ms cooldown
- `useCart().addToCart` called on button press

### ExperienceSection (`sections/ExperienceSection.tsx`)
**Purpose:** "Our Story" - scroll-driven paragraph reveal and horizontal sticky image strip.

**Key details:**
- `id="our-story"`, no `overflow-hidden` on section (required for `sticky` to work)
- **Paragraph:** 51 tokens, `useScroll({ target: sectionRef, offset: ['start 0.8', 'start 0.2'] })`, per-word `useTransform` from `rgba(1,74,173,0.15)` to black/blue. Blue tokens: "great fish", "Bedo Fish", "women-led", "Lake Victoria", "dignified work", "Bedo,", "better food system", "fishing communities."
- **Image strip:** `300vh` outer container, `sticky top-0 h-screen` inner, `motion.div` with `x: xVal`
  - `imageProgress.on('change')` computes `maxTranslate = strip.scrollWidth - sticky.clientWidth`
  - 13 slots: 5 portrait + 2 landscape per set, 2 bridge images, 1 set-3 entry
  - Portrait: `w-[120px] md:w-[180px] aspect-[3/4]`, Landscape: `w-[200px] md:w-[290px] aspect-[16/9]`
  - Images from `/images/portrait-scroll/1-6.jpg` and `/images/landscape-scroll/1-6.jpg`

### ImpactSection (`sections/ImpactSection.tsx`)
**Purpose:** Three stat cards showing social and business impact metrics.

**Key details:**
- `id="impact"`, `marginTop: -48px` to close gap with ExperienceSection
- Grid: `grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8 md:gap-10`
- **Stats:** 300+ (women empowered), 40% (emissions reduced), 3+ (export markets)
- Card image composition:
  - Container: `position: relative`, `paddingBottom: 70%` (height = 70% of width)
  - Blue shape: `position: absolute, top:0, right:0, bottom:0, width:33%`, `borderRadius:16px`, `zIndex:1`
  - Image placeholder: `position: absolute, top:14px, left:0, right:14px, bottom:14px`, `borderRadius:12px`, `bg-gray-200`, `zIndex:2`
  - **Recommended image size for this slot: 640x420px (3:2 landscape, 2x retina)**

### PortfolioSection (`sections/PortfolioSection.tsx`)
**Purpose:** Portfolio of past client projects with modal detail view.

**Key details:**
- Dark `bg-[#0e0e0e]`, category tabs with pagination (3 cards per page)
- 14 projects across 3 categories: Personal Projects, Landing Pages, Enterprise UI/UX
- Cards use `.portfolio-card` CSS class (rotating animated border on hover)
- Modal: fixed overlay, `bg-[#0f0f1a]`, closes on Escape or backdrop click

### ContactSection (`sections/ContactSection.tsx`)
**Purpose:** Multi-step contact form + social links + credential stats.

**Key details:**
- `id="contact"` (linked from Invest nav item)
- Step 1: email input; Step 2: message textarea; Step 3: sent confirmation
- Submits to Formspree endpoint `f/mqeykpvy`
- Email: `johnaustineosumba@gmail.com`
- Social: LinkedIn, GitHub (`devosumba`), email
- Stats: 4.9/5 ratings, 5+ years experience, Certified Software Engineer

### PageLoader (`components/PageLoader.tsx`)
**Purpose:** Full-screen white overlay with animated GIF shown on initial page load.

**Key details:**
- `position: fixed, inset-0, z-index: 9999`
- Shows `/images/bedo-loader.gif` at 160x160px
- Minimum 2 seconds display, dismisses after `window` load event fires

### ScrollToTop (`components/ScrollToTop.tsx`)
**Purpose:** Fixed bottom-right button that scrolls to top of page.

**Key details:**
- Appears after 300px scroll
- 48px circular button, `#014aad` background
- Hover: scale 1.1, `#0145a3`; Active: `#013d8f`

### Button (`components/Button.tsx`)
**Purpose:** Reusable CTA button, two variants.

**Props:** `variant?: 'primary' | 'outline'`, `href?: string`, `children`
- Motion-wrapped anchor, hover: `y: -2` + shadow

### TypewriterName (`components/TypewriterName.tsx`)
**Purpose:** Reusable typewriter text component with word cycling.

**Props:** words array, typingSpeed, deletingSpeed, pause
- IntersectionObserver stops typing when not in viewport
- Dynamic width via hidden ghost span (prevents layout shift)

---

## 6. CART AND STATE MANAGEMENT

### Implementation
React Context API via `context/CartContext.tsx`. No external state library.

### CartItem Type
```typescript
type CartItem = {
  key: string;   // Deduplication key: `${name}__${size}`
  name: string;  // Product name e.g. "Roasted Tilapia"
  size: string;  // Size/variant e.g. "Medium"
  price: string; // Price string e.g. "Ksh 600"
  qty: number;   // Quantity
};
```

### CartContextType
```typescript
type CartContextType = {
  cartCount: number;
  addToCart: (item: { name: string; size: string; price: string }, qty: number) => void;
};
```

### How It Works
- `CartProvider` wraps the entire app in `app/layout.tsx`
- `addToCart(item, qty)` checks if an item with the same `key` exists
  - If yes: increments `qty` by the passed amount
  - If no: appends a new `CartItem` to state
- `cartCount` is the sum of all `qty` values across all items
- `useCart()` hook exports the context for any component to consume

### Navbar Cart Badge
- `Navbar.tsx` calls `useCart()` and reads `cartCount`
- Displayed as a small absolute-positioned circle on the cart icon
- Updates reactively on every `addToCart` call

### Quantity Adjustment
- ServicesSection manages a local `qty` state per product card (not in global cart)
- The `+` / `-` counter adjusts local qty before the user presses Add to Cart
- Pressing Add to Cart calls `addToCart(product, localQty)` and resets local qty to 1

---

## 7. NAVIGATION AND ROUTING

### Routes
| Route | Description |
|-------|-------------|
| `/` | Single-page application homepage, all content rendered here |

No additional routes exist currently. All navigation is in-page scroll.

### Smooth Scroll
All navbar links use `href="#section-id"`. Smooth scrolling is handled natively via CSS (`scroll-behavior: smooth` or browser default). Logo click uses `window.scrollTo({ top: 0, behavior: 'smooth' })`.

### Active State Detection
`IntersectionObserver` in `Navbar.tsx`:
1. One observer per tracked section ID
2. Maintains a `visible: Set<string>` of all currently intersecting sections
3. On each intersection change, `pickActive()` runs:
   - Iterates `visible` set
   - Calls `getBoundingClientRect()` on each visible section
   - Computes `coverage = Math.min(window.innerHeight, r.bottom) - Math.max(0, r.top)`
   - Sets `activeSection` to the ID with highest coverage
4. Active nav item gets `color: #014aad` and `font-weight: extrabold`

### Section IDs and Nav Links
| Section ID | Nav Label | Threshold |
|------------|-----------|-----------|
| `hero` | (logo) | 0.1 |
| `products` | Products | 0.1 |
| `our-story` | Our Story | 0 |
| `impact` | Impact | 0 |
| `contact` | Invest | 0.1 |
| `portfolio` | (not in nav) | 0.1 |

---

## 8. ASSETS

### Hero
- `/public/images/hero-bg.jpg` - Full-viewport hero background image

### Branding
- `/public/assets/bedo-nav-logo.png` - Navbar logo (displayed at ~120px width)
- `/public/images/bedo-loader.gif` - Page loader animation (displayed at 160x160px)

### Favicon
- Configured in `app/layout.tsx` metadata (Next.js default favicon or custom via metadata API)

### Product Images
| File | Product |
|------|---------|
| `/public/images/roasted-tilapia.jpg` | Roasted Tilapia (all sizes) |
| `/public/images/omena-prod.jpg` | Omena (all sizes) |

### Our Story Scroll Images
- `/public/images/portrait-scroll/1.jpg` through `6.jpg` - Portrait orientation (3:4)
- `/public/images/landscape-scroll/1.jpg` through `6.jpg` - Landscape orientation (16:9)
- Used in ExperienceSection 13-slot horizontal strip
- Portraits cycle indices: slots 0, 2, 4, 7, 9, 11, 12
- Landscapes cycle indices: slots 1, 3, 5, 6, 8, 10

### Impact Card Images (To Be Added)
- Target slot size: approximately **640x420px** (3:2 landscape, 2x retina)
- To be placed at a path added to each `STAT_CARDS` entry in `ImpactSection.tsx`

### Portfolio Thumbnails
- `/public/assets/portfolio/1.jpg`, `2.jpg`, `3.jpg`
- `/public/assets/website-thumbnails/1.jpg` through `6.jpg`
- `/public/assets/UIUX-thumbnails/1.jpg` through `5.jpg`

---

## 9. BACKEND AND DATABASE PLAN (PHASE 2)

### API Design
- RESTful API built with **Node.js** and **Express.js**
- All endpoints prefixed `/api/v1/`
- JSON request and response bodies
- Authentication via **JWT** (Bearer token in Authorization header)

### Database
- **PostgreSQL** - relational database
- ORM: TBD (Prisma recommended for TypeScript compatibility)
- Connection pooling via pg or Prisma connection pool

### Authentication
- JWT-based auth for admin and customer accounts
- Access token (short-lived) + refresh token (long-lived, HTTP-only cookie)
- Bcrypt password hashing

### Key Entities
```
Users
  id, email, password_hash, phone, role (admin|customer),
  created_at, updated_at

Products
  id, name, description, category, image_url,
  created_at, updated_at

ProductVariants
  id, product_id (FK), size_label, price_ksh,
  stock_qty, sku

Orders
  id, user_id (FK), status (pending|confirmed|failed|fulfilled),
  total_ksh, created_at, updated_at

OrderItems
  id, order_id (FK), variant_id (FK), qty, unit_price_ksh

Cart
  id, user_id (FK), created_at, updated_at

CartItems
  id, cart_id (FK), variant_id (FK), qty

Payments
  id, order_id (FK), provider (payhero), method (mpesa),
  phone_number, amount_ksh, status (pending|success|failed),
  provider_reference, created_at

Webhooks
  id, payment_id (FK), payload (jsonb), hmac_signature,
  verified (bool), received_at
```

### Role-Based Access Control
| Role | Permissions |
|------|-------------|
| `customer` | Browse products, manage own cart, place orders, view own order history |
| `admin` | All customer permissions + manage products, view all orders, update order status, access inventory |

---

## 10. PAYMENT INTEGRATION PLAN (PHASE 3)

### Provider
- **PayHero** - M-Pesa STK Push API
- Endpoint: PayHero REST API (credentials via environment variables)

### Method
M-Pesa STK Push (Safaricom Kenya)

### Checkout Flow
1. Customer reviews cart and proceeds to checkout
2. Customer enters M-Pesa registered phone number
3. Backend calls PayHero STK Push API with amount and phone number
4. Customer receives M-Pesa payment prompt on their phone
5. Customer confirms payment by entering M-Pesa PIN on their phone
6. PayHero sends a webhook POST to the backend with the payment result
7. Backend verifies the webhook using **HMAC signature verification**
8. **On successful payment:**
   - Order status updated to `confirmed`
   - Cart cleared
   - Order confirmation sent to customer (email or SMS)
9. **On failed payment:**
   - Order status updated to `failed`
   - Cart preserved
   - Customer notified of failure with option to retry

### Webhook Security
- Webhook endpoint: `POST /api/v1/webhooks/payhero`
- HMAC-SHA256 signature verification using PayHero webhook secret
- Raw request body must be used for signature computation (not parsed JSON)
- Reject any webhook that fails signature verification with `401`

### Environment Variables Required
```
PAYHERO_API_KEY=
PAYHERO_API_SECRET=
PAYHERO_WEBHOOK_SECRET=
DATABASE_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
```

### Order Confirmation Delivery
- Email via SendGrid or Nodemailer (SMTP) - TBD
- SMS via Africa's Talking or Twilio - TBD

---

## 11. CONVENTIONS AND RULES

### Git
- All commits use **conventional commit format**: `type(scope): description`
  - Types: `feat`, `fix`, `docs`, `chore`, `refactor`, `style`, `test`
- No AI attribution in any commit message, body, or contributor list
- Git identity must always be **devosumba**
- Force push only permitted when cleaning AI attribution from history
- Never commit `.next/`, `node_modules/`, or `.env*` files (all in `.gitignore`)

### Content and Copy
- No em dashes or en dashes in any written content
- All documents delivered as PDF, not Word

### Code
- Primary color `#014aad` must be used from `lib/design-tokens.ts` or the CSS variable `--accent`; never hardcode in a new location without referencing the token
- No new libraries installed unless nothing suitable already exists in the project
- Hooks must not be called inside `.map()` callbacks - extract into a child component
- Never add `overflow-hidden` to a section that contains `position: sticky` children
- Tailwind CSS v4 is in use - no `tailwind.config.js`; extend via `@theme` in CSS if needed

### Component Conventions
- All section components default-exported from `sections/`
- All shared UI components default-exported from `components/`
- Context files live in `context/`
- Design tokens live in `lib/design-tokens.ts`
- `"use client"` directive required on any component using hooks, browser APIs, or motion
