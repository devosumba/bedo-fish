"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { useCart } from '../../context/CartContext';
import Image from 'next/image';

const ADDR_KEY = 'bedo-delivery-addresses';

// Nominatim (OpenStreetMap) is used for address search — free, no API key required.
// Results are restricted to Kenyan addresses via countrycodes=ke.
const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';

type SavedAddress = { id: string; label: string; lat: string; lon: string; };
type NominatimResult = { place_id: number; display_name: string; lat: string; lon: string; };
type FormState = { firstName: string; lastName: string; email: string; phone: string; apartment: string; city: string; altPhone: string; };
const empty: FormState = { firstName: '', lastName: '', email: '', phone: '', apartment: '', city: '', altPhone: '' };

function validate(f: FormState, addr: SavedAddress | null) {
  const errs: Partial<Record<keyof FormState | 'address', string>> = {};
  if (!f.firstName.trim()) errs.firstName = 'First name is required';
  if (!f.lastName.trim()) errs.lastName = 'Last name is required';
  if (!f.email.trim()) errs.email = 'Email is required';
  else if (!/^[^s@]+@[^s@]+.[^s@]+$/.test(f.email)) errs.email = 'Invalid email address';
  if (!f.phone.trim()) errs.phone = 'Phone number is required';
  if (!addr) errs.address = 'Please select a delivery address';
  return errs;
}

export default function CheckoutPage() {
  const { items, totalAmount, updateQuantity } = useCart();
  const [form, setForm] = useState<FormState>(empty);
  const [touched, setTouched] = useState<Partial<Record<keyof FormState | 'address', boolean>>>({});
  const [selectedAddr, setSelectedAddr] = useState<SavedAddress | null>(null);
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [addrSearch, setAddrSearch] = useState('');
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingAddr, setIsLoadingAddr] = useState(false);
  const [expandedItems, setExpandedItems] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Set body background to black on checkout page, restore on unmount
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#000';
    return () => { document.body.style.backgroundColor = prev; };
  }, []);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => { setForm(prev => ({ ...prev, [k]: e.target.value })); setTouched(prev => ({ ...prev, [k]: true })); };
  useEffect(() => { try { const stored = localStorage.getItem(ADDR_KEY); if (stored) setSavedAddresses(JSON.parse(stored)); } catch {} }, []);
  const saveAddress = (addr: SavedAddress) => { setSavedAddresses(prev => { const next = prev.find(a => a.id === addr.id) ? prev : [addr, ...prev]; try { localStorage.setItem(ADDR_KEY, JSON.stringify(next)); } catch {} return next; }); };
  const deleteAddress = (id: string) => {
    setSavedAddresses(prev => {
      const next = prev.filter(a => a.id !== id);
      try { localStorage.setItem(ADDR_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
    if (selectedAddr?.id === id) { setSelectedAddr(null); setAddrSearch(''); }
  };
  const onAddrSearchChange = useCallback((val: string) => {
    setAddrSearch(val);
    setShowSuggestions(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!val.trim()) { setSuggestions([]); setIsLoadingAddr(false); return; }
    setIsLoadingAddr(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const params = new URLSearchParams({ q: val, format: 'json', addressdetails: '1', countrycodes: 'ke', limit: '5' });
        const res = await fetch(NOMINATIM_URL + '?' + params.toString(), { headers: { 'User-Agent': 'BedoFish/1.0 (info@bedofish.com)' } });
        const data: NominatimResult[] = await res.json();
        setSuggestions(data);
      } catch { setSuggestions([]); } finally { setIsLoadingAddr(false); }
    }, 400);
  }, []);
  const pickSuggestion = (result: NominatimResult) => {
    const addr: SavedAddress = { id: String(result.place_id), label: result.display_name, lat: result.lat, lon: result.lon };
    setSelectedAddr(addr); saveAddress(addr); setAddrSearch(result.display_name);
    setSuggestions([]); setShowSuggestions(false); setTouched(prev => ({ ...prev, address: true }));
  };
  const errors = validate(form, selectedAddr);
  const hasAddress = !!selectedAddr;
  const deliveryFee = 0;
  const total = totalAmount + deliveryFee;
  const visibleItems = expandedItems ? items : items.slice(0, 3);
  return (
    <div className="min-h-screen" style={{ background: "#000" }}>
      <div className="w-full max-w-6xl lg:max-w-[74vw] mx-auto px-4 pt-10 pb-10 md:pt-14 md:pb-16">
        <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start">
          <div className="w-full md:w-[55%] flex flex-col gap-6">
            <h1 className="text-2xl md:text-3xl font-bold">
              <span className="inline-flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#014aad" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span className="text-white">Shipping </span>
                <span style={{ color: "#014aad" }}>Information</span>
              </span>
            </h1>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="firstName" className="text-white/70 text-xs font-medium">First Name</label>
                <input id="firstName" type="text" value={form.firstName} onChange={set('firstName')} onBlur={() => setTouched(p => ({ ...p, firstName: true }))} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/60 transition-colors" />
                {touched.firstName && errors.firstName && <p className="text-red-400 text-xs">{errors.firstName}</p>}
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="lastName" className="text-white/70 text-xs font-medium">Last Name</label>
                <input id="lastName" type="text" value={form.lastName} onChange={set('lastName')} onBlur={() => setTouched(p => ({ ...p, lastName: true }))} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/60 transition-colors" />
                {touched.lastName && errors.lastName && <p className="text-red-400 text-xs">{errors.lastName}</p>}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-white/70 text-xs font-medium">Email Address</label>
              <div className="relative">
                <input id="email" type="email" value={form.email} onChange={set('email')} onBlur={() => setTouched(p => ({ ...p, email: true }))} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pr-11 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/60 transition-colors" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg></span>
              </div>
              {touched.email && errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="phone" className="text-white/70 text-xs font-medium">Phone Number</label>
              <div className="relative">
                <input id="phone" type="tel" value={form.phone} onChange={set('phone')} onBlur={() => setTouched(p => ({ ...p, phone: true }))} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pr-11 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/60 transition-colors" />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4a2 2 0 0 1 1.99-2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.7-1.7a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
              </div>
              {touched.phone && errors.phone && <p className="text-red-400 text-xs">{errors.phone}</p>}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="apartment" className="text-white/70 text-xs font-medium">Apartment / Building (optional)</label>
              <input id="apartment" type="text" value={form.apartment} onChange={set('apartment')} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/60 transition-colors" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="city" className="text-white/70 text-xs font-medium">City</label>
                <input id="city" type="text" value={form.city} onChange={set('city')} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/60 transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="altPhone" className="text-white/70 text-xs font-medium">Alt. Phone (optional)</label>
                <input id="altPhone" type="tel" value={form.altPhone} onChange={set('altPhone')} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/60 transition-colors" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-white font-semibold text-base">Delivery Location</h2>
              {savedAddresses.length > 0 && (
                <div className="flex flex-col gap-2">
                  {savedAddresses.map(addr => (
                    <div key={addr.id} className={'flex items-center rounded-xl overflow-hidden transition-colors ' + (selectedAddr?.id === addr.id ? 'border border-[#014aad]' : 'border border-transparent')} style={{ background: selectedAddr?.id === addr.id ? 'rgba(1,74,173,0.2)' : 'rgba(1,74,173,0.1)' }}>
                      <button onClick={() => { setSelectedAddr(addr); setAddrSearch(addr.label); setTouched(p => ({ ...p, address: true })); }} className="flex-1 text-left px-4 py-3 text-sm text-white/80 hover:text-white transition-colors">
                        {addr.label}
                      </button>
                      <button aria-label="Delete address" onClick={() => deleteAddress(addr.id)} className="shrink-0 w-7 h-7 flex items-center justify-center rounded bg-[#014aad] text-white hover:[filter:brightness(0.85)] transition-all duration-150 mr-2 focus:outline-none">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="relative">
                <div className="relative">
                  {isLoadingAddr ? (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                    </span>
                  ) : (
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                    </span>
                  )}
                  <input type="text" placeholder="Search for delivery location..." value={addrSearch} onChange={e => onAddrSearchChange(e.target.value)} onFocus={() => setShowSuggestions(true)} onBlur={() => setTimeout(() => setShowSuggestions(false), 150)} className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-10 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/60 transition-colors" />
                  {addrSearch && (
                    <button onClick={() => { setAddrSearch(''); setSuggestions([]); setSelectedAddr(null); setIsLoadingAddr(false); if (debounceRef.current) clearTimeout(debounceRef.current); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  )}
                </div>
                {showSuggestions && addrSearch.trim() && (
                  <div className="absolute z-50 w-full mt-1 bg-[#1a1a1a] border border-white/20 rounded-xl overflow-hidden shadow-2xl">
                    {!isLoadingAddr && suggestions.length > 0 ? suggestions.map(result => (
                      <button key={result.place_id} onMouseDown={() => pickSuggestion(result)} className="w-full text-left px-4 py-3 text-white/80 text-sm hover:bg-white/10 transition-colors border-b border-white/10 last:border-0">{result.display_name}</button>
                    )) : !isLoadingAddr ? (
                      <div className="px-4 py-4 flex flex-col gap-3">
                        <p className="text-white/50 text-sm">No addresses found</p>
                        <button onMouseDown={() => { const addr: SavedAddress = { id: Date.now().toString(), label: addrSearch, lat: '', lon: '' }; setSelectedAddr(addr); saveAddress(addr); setSuggestions([]); setShowSuggestions(false); setTouched(p => ({ ...p, address: true })); }} className="self-start bg-[#014aad] text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#0157cc] transition-colors">+ Add new address</button>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
              {touched.address && errors.address && <p className="text-red-400 text-xs">{errors.address}</p>}
            </div>
          </div>
          <div className="w-full md:w-[45%] md:sticky md:top-24">
            <div className="rounded-2xl p-6 flex flex-col gap-5" style={{ background: "#014aad" }}>
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6"/><path d="M9 16h4"/></svg>
                <h2 className="text-white font-bold text-lg">Order Summary</h2>
              </div>
              {items.length === 0 ? (
                <p className="text-white/60 text-sm">Your cart is empty</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {visibleItems.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-white/20"><Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" /></div>
                      <div className="flex-1 min-w-0"><p className="text-white font-semibold text-sm truncate">{item.name}</p><p className="text-white/60 text-xs">Ksh {item.unitPrice}</p></div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button aria-label="Decrease" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} className="w-6 h-6 flex items-center justify-center rounded border border-white/40 text-white text-xs font-bold hover:bg-white/20 transition-colors">-</button>
                        <span className="text-white text-xs font-semibold min-w-[18px] text-center">{item.quantity}</span>
                        <button aria-label="Increase" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center rounded border border-white/40 text-white text-xs font-bold hover:bg-white/20 transition-colors">+</button>
                      </div>
                      <span className="text-white font-bold text-sm shrink-0 ml-1">Ksh {item.totalPrice.toFixed(0)}</span>
                    </div>
                  ))}
                  {items.length > 3 && (
                    <button onClick={() => setExpandedItems(v => !v)} className="text-white/70 text-xs underline self-start hover:text-white transition-colors">
                      {expandedItems ? 'Show less' : ('Show details (+' + (items.length - 3) + ' more)')}
                    </button>
                  )}
                </div>
              )}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.3)" }} />
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm"><span className="text-white/70">Subtotal</span><span className="text-white font-semibold">Ksh {totalAmount.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm"><span className="text-white/70">Delivery Fee</span><span className="text-white/70">Ksh 0.00</span></div>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.3)" }} className="pt-2 flex justify-between"><span className="text-white font-bold">Total</span><span className="text-white font-bold">Ksh {total.toFixed(2)}</span></div>
              </div>
              <button
                onClick={() => { if (!hasAddress) setTouched(p => ({ ...p, address: true })); }}
                style={hasAddress ? { pointerEvents: "auto" } : { pointerEvents: "none" }}
                className={'w-full flex items-center justify-center gap-2 py-4 rounded-full font-bold text-sm transition-all duration-300 ease-in-out ' + (hasAddress ? 'bg-white text-[#014aad]' : 'bg-white/30 text-white/70')}
              >
                <img src="/images/mpesa-logo.jpg" alt="M-Pesa" style={{ height: "22px", width: "auto", objectFit: "contain", mixBlendMode: "multiply" }} />
                Pay With M-Pesa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}