"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

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
  const [items, setItems] = useState<CartItem[]>([]);

  const totalItems  = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalAmount = items.reduce((sum, i) => sum + i.totalPrice, 0);

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
  }

  return (
    <CartContext.Provider value={{ items, totalItems, totalAmount, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// ─── Hook ──────────────────────────────────────────────────────────────────────

export const useCart = () => useContext(CartContext);
