"use client";

import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function CartModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, totalAmount, updateQuantity } = useCart();
  const deliveryFee = 0;
  const total = totalAmount + deliveryFee;

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
              <h2 className="font-bold text-xl text-gray-900">Your Cart</h2>
              <button
                aria-label="Close cart"
                onClick={onClose}
                className="text-[#014aad] hover:opacity-70 transition-opacity focus:outline-none"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 text-center">
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#014aad" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <p className="font-semibold text-gray-900 text-base">Your cart is empty</p>
                <p className="text-gray-400 text-sm">Add products from our offerings to get started</p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="px-6">
                    <div className="flex items-start gap-4 py-4">

                      {/* Thumbnail */}
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                        <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                      </div>

                      {/* Name, price, qty */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm leading-tight">{item.name}</p>
                        <p className="text-gray-400 text-xs mt-0.5">Ksh {item.unitPrice}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            aria-label="Decrease quantity"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded text-gray-700 text-sm font-bold hover:border-[#014aad] transition-colors leading-none"
                          >-</button>
                          <span className="text-sm font-semibold text-gray-800 min-w-[20px] text-center">{item.quantity}</span>
                          <button
                            aria-label="Increase quantity"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded text-gray-700 text-sm font-bold hover:border-[#014aad] transition-colors leading-none"
                          >+</button>
                        </div>
                      </div>

                      {/* Item total */}
                      <div className="shrink-0 text-right">
                        <span className="font-bold text-gray-900 text-sm">Ksh {item.totalPrice.toFixed(2)}</span>
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
                  <span className="font-bold text-gray-900 text-sm">Subtotal</span>
                  <span className="font-bold text-gray-900 text-sm">Ksh {totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-400 text-sm">Delivery Fee</span>
                  <span className="text-gray-400 text-sm">Ksh 0.00</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex items-center justify-between mb-4">
                  <span className="font-bold text-gray-900 text-base">Total</span>
                  <span className="font-bold text-gray-900 text-base">Ksh {total.toFixed(2)}</span>
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
