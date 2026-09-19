// Single source of truth for all product data on the public site and the
// admin dashboard. Admin edits are layered on top of this file at runtime via
// lib/productStore.ts (localStorage) — this file itself is never written to.

export type ProductCategory = 'Customer Favorites' | 'Roasted Tilapia' | 'Omena' | 'Deep-Fried Tilapia';

export type ProductBadge = 'Best Seller' | 'Popular' | 'Value';

export type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  size: string;
  price: number; // unit price in KES
  category: ProductCategory;
  badge?: ProductBadge;
  flavorToggle: boolean;
  isLive: boolean;
  isOutOfStock: boolean;
};

export const CATEGORIES: ProductCategory[] = ['Customer Favorites', 'Roasted Tilapia', 'Omena', 'Deep-Fried Tilapia'];

export const BADGES: ProductBadge[] = ['Best Seller', 'Popular', 'Value'];

export const PRODUCTS: Product[] = [
  // ── Customer Favorites ──────────────────────────────────────────────────
  { id: 1, name: 'Roasted Tilapia', description: 'Roasted tilapia from Lake Victoria', image: '/images/bedo-fish-roasted.jpeg', size: 'Small', price: 300, category: 'Customer Favorites', badge: 'Best Seller', flavorToggle: true, isLive: true, isOutOfStock: false },
  { id: 2, name: 'Omena',           description: 'Crunchy deep fried omena',            image: '/images/omenaa.jpeg',            size: '500ml', price: 300, category: 'Customer Favorites', badge: 'Popular',     flavorToggle: false, isLive: true, isOutOfStock: false },
  { id: 3, name: 'Roasted Tilapia', description: 'Roasted tilapia from Lake Victoria', image: '/images/bedo-fish-roasted.jpeg', size: 'Large', price: 600, category: 'Customer Favorites', badge: 'Value',       flavorToggle: true, isLive: true, isOutOfStock: false },

  // ── Roasted Tilapia ──────────────────────────────────────────────────────
  { id: 4,  name: 'Roasted Tilapia', description: 'Roasted tilapia from Lake Victoria', image: '/images/bedo-fish-roasted.jpeg', size: 'Small',        price: 300, category: 'Roasted Tilapia', badge: 'Best Seller', flavorToggle: true, isLive: true, isOutOfStock: false },
  { id: 5,  name: 'Roasted Tilapia', description: 'Roasted tilapia from Lake Victoria', image: '/images/bedo-fish-roasted.jpeg', size: 'Small-Medium', price: 380, category: 'Roasted Tilapia',                       flavorToggle: true, isLive: true, isOutOfStock: false },
  { id: 6,  name: 'Roasted Tilapia', description: 'Roasted tilapia from Lake Victoria', image: '/images/bedo-fish-roasted.jpeg', size: 'Medium',       price: 480, category: 'Roasted Tilapia',                       flavorToggle: true, isLive: true, isOutOfStock: false },
  { id: 10, name: 'Roasted Tilapia', description: 'Roasted tilapia from Lake Victoria', image: '/images/bedo-fish-roasted.jpeg', size: 'Large',        price: 600, category: 'Roasted Tilapia',                       flavorToggle: true, isLive: true, isOutOfStock: false },
  { id: 11, name: 'Roasted Tilapia', description: 'Roasted tilapia from Lake Victoria', image: '/images/bedo-fish-roasted.jpeg', size: 'Extra Large',  price: 800, category: 'Roasted Tilapia',                       flavorToggle: true, isLive: true, isOutOfStock: false },

  // ── Omena ────────────────────────────────────────────────────────────────
  { id: 7, name: 'Omena', description: 'Crunchy deep fried omena', image: '/images/omenaa.jpeg', size: '250ml',  price: 180, category: 'Omena', flavorToggle: false, isLive: true, isOutOfStock: false },
  { id: 8, name: 'Omena', description: 'Crunchy deep fried omena', image: '/images/omenaa.jpeg', size: '500ml',  price: 300, category: 'Omena', flavorToggle: false, isLive: true, isOutOfStock: false },
  { id: 9, name: 'Omena', description: 'Crunchy deep fried omena', image: '/images/omenaa.jpeg', size: '1000ml', price: 580, category: 'Omena', flavorToggle: false, isLive: true, isOutOfStock: false },

  // ── Deep-Fried Tilapia ───────────────────────────────────────────────────
  { id: 12, name: 'Deep-Fried Tilapia', description: 'Deep fried tilapia from Lake Victoria', image: '/images/deep-fried-tilapia.jpg', size: 'Small',        price: 300, category: 'Deep-Fried Tilapia', badge: 'Best Seller', flavorToggle: false, isLive: true, isOutOfStock: false },
  { id: 13, name: 'Deep-Fried Tilapia', description: 'Deep fried tilapia from Lake Victoria', image: '/images/deep-fried-tilapia.jpg', size: 'Small-Medium', price: 380, category: 'Deep-Fried Tilapia',                       flavorToggle: false, isLive: true, isOutOfStock: false },
  { id: 14, name: 'Deep-Fried Tilapia', description: 'Deep fried tilapia from Lake Victoria', image: '/images/deep-fried-tilapia.jpg', size: 'Medium',       price: 480, category: 'Deep-Fried Tilapia',                       flavorToggle: false, isLive: true, isOutOfStock: false },
  { id: 15, name: 'Deep-Fried Tilapia', description: 'Deep fried tilapia from Lake Victoria', image: '/images/deep-fried-tilapia.jpg', size: 'Large',        price: 600, category: 'Deep-Fried Tilapia',                       flavorToggle: false, isLive: true, isOutOfStock: false },
  { id: 16, name: 'Deep-Fried Tilapia', description: 'Deep fried tilapia from Lake Victoria', image: '/images/deep-fried-tilapia.jpg', size: 'Extra Large',  price: 800, category: 'Deep-Fried Tilapia',                       flavorToggle: false, isLive: true, isOutOfStock: false },
];
