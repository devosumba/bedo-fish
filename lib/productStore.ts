"use client";

import { useCallback, useEffect, useState } from 'react';
import { PRODUCTS, Product } from './products';

const STORAGE_KEY = 'bedo-admin-products';

function readOverrides(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Product[]) : [];
  } catch {
    return [];
  }
}

function mergeProducts(overrides: Product[]): Product[] {
  const byId = new Map(PRODUCTS.map((p) => [p.id, p]));
  for (const override of overrides) {
    const base = byId.get(override.id);
    if (base) byId.set(override.id, { ...base, ...override });
  }
  return Array.from(byId.values());
}

// Shared by the public Our Offerings section and the admin dashboard so both
// read/write the exact same localStorage-backed override layer on top of the
// default product data file.
export function useProducts() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

  const reload = useCallback(() => {
    setProducts(mergeProducts(readOverrides()));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const updateProduct = useCallback((updated: Product) => {
    const next = readOverrides().filter((p) => p.id !== updated.id);
    next.push(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
    reload();
  }, [reload]);

  const resetProducts = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    reload();
  }, [reload]);

  return { products, updateProduct, resetProducts };
}
