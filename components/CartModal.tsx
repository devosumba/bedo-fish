"use client";

import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CartModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, totalAmount, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const deliveryFee = 0;
  const total = totalAmount + deliveryFee;
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (isOpen) {
      scrollYRef.current = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = '-' + scrollYRef.current + 'px';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, scrollYRef.current);
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex justify-end">

          {/* Overlay — does not close modal on click */}
          <motion.div
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Drawer panel */}
          <motion.div
            className="relative w-full md:w-[440px] h-full bg-white flex flex-col shadow-2xl overflow-hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
              <h2 className="font-bold text-xl text-[#014aad]">Your Cart</h2>
              <button
                aria-label="Close cart"
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#014aad] text-white hover:[filter:brightness(0.85)] transition-all duration-150 focus:outline-none shrink-0"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#014aad" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <p className="font-semibold text-[#014aad] text-base">Your cart is empty</p>
                <button
                  onClick={() => { onClose(); setTimeout(() => { document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }); }, 50); }}
                  className="bg-[#014aad] text-white font-bold px-6 py-[10px] rounded-full hover:[filter:brightness(0.85)] transition-all duration-150 focus:outline-none"
                >
                  Explore Our Offerings
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="px-6">
                    {/* md:items-stretch lets the thumbnail grow to match the content column height */}
                    <div className="flex items-stretch gap-4 py-4">

                      {/* Thumbnail — fixed square on mobile, stretches to content height on desktop */}
                      <div className="relative w-16 h-16 md:w-20 md:h-auto rounded-xl overflow-hidden shrink-0 bg-gray-100">
                        <Image src={item.image} alt={item.name} fill sizes="(min-width:768px) 80px, 64px" className="object-cover" />
                      </div>

                      {/* Name, price/description, qty + delete */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm leading-tight">{item.name}</p>
                        <p className="text-gray-400 text-xs mt-0.5">Ksh {item.unitPrice}</p>
                        {/* Counter row — minus, count, plus only; delete inline on mobile only */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            aria-label="Decrease quantity"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-7 h-7 flex items-center justify-center rounded bg-[#014aad] text-white text-sm font-bold hover:[filter:brightness(0.85)] transition-all duration-150 focus:outline-none leading-none"
                          >-</button>
                          <span className="text-sm font-semibold text-gray-800 min-w-[20px] text-center">{item.quantity}</span>
                          <button
                            aria-label="Increase quantity"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center rounded bg-[#014aad] text-white text-sm font-bold hover:[filter:brightness(0.85)] transition-all duration-150 focus:outline-none leading-none"
                          >+</button>

                        </div>
                      </div>

                      {/* Item total + desktop delete stacked in right column */}
                      <div className="shrink-0 flex flex-col items-end justify-between">
                        <span className="font-bold text-gray-900 text-sm">Ksh {item.totalPrice.toFixed(2)}</span>
                        {/* Desktop only: delete below price */}
                        <button
                          aria-label="Remove item"
                          onClick={() => setPendingDeleteId(item.id)}
                          className="flex w-7 h-7 items-center justify-center rounded bg-[#014aad] text-white hover:[filter:brightness(0.85)] transition-all duration-150 focus:outline-none"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="border-b border-gray-100" />
                  </div>
                ))}
              </div>
            )}

            {/* Footer */}
            {items.length > 0 && (
              <div className="shrink-0 px-6 py-5 bg-white border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-[#014aad] text-sm">Subtotal</span>
                  <span className="font-bold text-[#014aad] text-sm">Ksh {totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-400 text-sm">Delivery Fee</span>
                  <span className="text-gray-400 text-sm">Ksh 0.00</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex items-center justify-between mb-4">
                  <span className="font-bold text-[#014aad] text-base">Total</span>
                  <span className="font-bold text-[#014aad] text-base">Ksh {total.toFixed(2)}</span>
                </div>
                <button onClick={() => { onClose(); router.push('/checkout'); }} className="w-full bg-[#014aad] text-white font-semibold py-3.5 rounded-full text-sm hover:bg-[#0157cc] transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            )}

          </motion.div>

          {/* Delete confirmation dialog */}
          {pendingDeleteId && (
            <div
              className="absolute inset-0 flex items-center justify-center z-10 px-6"
              style={{ background: 'rgba(0,0,0,0.5)' }}
              onClick={() => setPendingDeleteId(null)}
            >
              <div
                className="bg-white rounded-2xl p-8 w-full max-w-sm flex flex-col items-center gap-4"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full" style={{ background: 'rgba(1,74,173,0.10)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#014aad" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 text-lg text-center">Remove Item?</h3>
                <p className="text-gray-400 text-sm text-center leading-relaxed">Are you sure you want to remove this item from your cart? This action cannot be undone.</p>
                <div className="flex gap-3 w-full pt-1">
                  <button
                    onClick={() => setPendingDeleteId(null)}
                    className="flex-1 py-3 rounded-full text-sm font-semibold transition-colors focus:outline-none"
                    style={{ border: '1.5px solid #014aad', color: '#014aad', background: 'white' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(1,74,173,0.05)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'white'; }}
                  >No, Keep It</button>
                  <button
                    onClick={() => { removeFromCart(pendingDeleteId); setPendingDeleteId(null); }}
                    className="flex-1 py-3 rounded-full bg-[#014aad] text-white text-sm font-semibold hover:[filter:brightness(0.85)] transition-all duration-150 focus:outline-none"
                  >Yes, Remove</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
