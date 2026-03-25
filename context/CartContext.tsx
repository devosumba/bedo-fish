"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

// ─── Types ─────────────────────────────────────────────────────────────────────

type CartItem = {
  key: string;   // name + '__' + size — dedup key
  name: string;
  size: string;
  price: string;
  qty: number;
};

type CartContextType = {
  cartCount: number;
  addToCart: (item: { name: string; size: string; price: string }, qty: number) => void;
};

// ─── Context ───────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  addToCart: () => {},
});

// ─── Provider ──────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const cartCount = items.reduce((sum, item) => sum + item.qty, 0);

  function addToCart(item: { name: string; size: string; price: string }, qty: number) {
    const key = `${item.name}__${item.size}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => i.key === key ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { ...item, key, qty }];
    });
  }

  return (
    <CartContext.Provider value={{ cartCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

// ─── Hook ──────────────────────────────────────────────────────────────────────

export const useCart = () => useContext(CartContext);
