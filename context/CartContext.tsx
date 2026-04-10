"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const STORAGE_KEY = 'bedo-cart';

// ─── Types ─────────────────────────────────────────────────────────────────────

type CartItem = {
  id: string;
  name: string;
  size: string;
  image: string;
  description: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
};

type CartContextType = {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  addToCart: (item: { name: string; size: string; price: string; image: string; description: string }, qty: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
};

// ─── Context ───────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextType>({
  items: [],
  totalItems: 0,
  totalAmount: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

// ─── Provider ──────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  // Always start with empty array — server and client first render must match
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  const totalItems  = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalAmount = items.reduce((sum, i) => sum + i.totalPrice, 0);

  // Hydrate cart from localStorage after mount (client only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored) as CartItem[]);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    setIsHydrated(true);
  }, []);

  // Sync to localStorage on change — only after hydration to avoid overwriting stored cart with []
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, isHydrated]);

  function addToCart(item: { name: string; size: string; price: string; image: string; description: string }, qty: number) {
    const unitPrice = parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 0;
    const id = item.name.toLowerCase().replace(/ +/g, '-') + '-' + item.size.toLowerCase().replace(/ +/g, '-');
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) =>
          i.id === id
            ? { ...i, quantity: i.quantity + qty, totalPrice: (i.quantity + qty) * unitPrice }
            : i
        );
      }
      return [...prev, { id, name: item.name, size: item.size, image: item.image, description: item.description, unitPrice, quantity: qty, totalPrice: unitPrice * qty }];
    });
  }

  function updateQuantity(id: string, qty: number) {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: qty, totalPrice: qty * i.unitPrice } : i
      )
    );
  }

  function removeFromCart(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function clearCart() {
    setItems([]);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }

  return (
    <CartContext.Provider value={{ items, totalItems, totalAmount, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// ─── Hook ──────────────────────────────────────────────────────────────────────

export const useCart = () => useContext(CartContext);
