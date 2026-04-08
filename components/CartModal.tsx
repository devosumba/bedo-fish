"use client";

import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function CartModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, totalAmount, updateQuantity, removeFromCart } = useCart();
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
                    <div className="flex items-start md:items-stretch gap-4 py-4">

                      {/* Thumbnail — fixed square on mobile, stretches to content height on desktop */}
                      <div className="relative w-16 h-16 md:w-20 md:h-auto rounded-xl overflow-hidden shrink-0 bg-gray-100">
                        <Image src={item.image} alt={item.name} fill sizes="(min-width:768px) 80px, 64px" className="object-cover" />
                      </div>

                      {/* Name, price/description, qty + delete */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm leading-tight">{item.name}</p>
                        {/* Mobile: description — Desktop: fixed unit price */}
                        <p className="text-gray-400 text-xs mt-0.5 line-clamp-2 md:hidden">{item.description}</p>
                        <p className="text-gray-400 text-xs mt-0.5 hidden md:block">Ksh {item.unitPrice}</p>
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
                          {/* Mobile only: delete inline after plus */}
                          <button
                            aria-label="Remove item"
                            onClick={() => removeFromCart(item.id)}
                            className="md:hidden w-7 h-7 flex items-center justify-center rounded bg-[#014aad] text-white hover:[filter:brightness(0.85)] transition-all duration-150 focus:outline-none"
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Item total + desktop delete stacked in right column */}
                      <div className="shrink-0 flex flex-col items-end justify-between">
                        <span className="font-bold text-gray-900 text-sm">Ksh {item.totalPrice.toFixed(2)}</span>
                        {/* Desktop only: delete below price */}
                        <button
                          aria-label="Remove item"
                          onClick={() => removeFromCart(item.id)}
                          className="hidden md:flex w-7 h-7 items-center justify-center rounded bg-[#014aad] text-white hover:[filter:brightness(0.85)] transition-all duration-150 focus:outline-none"
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
                <button className="w-full bg-[#014aad] text-white font-semibold py-3.5 rounded-full text-sm hover:bg-[#0157cc] transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
