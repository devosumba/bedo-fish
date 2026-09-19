"use client";

import { useState } from 'react';
import Image from 'next/image';
import { BADGES, CATEGORIES, Product, ProductBadge, ProductCategory } from '../../lib/products';

export default function ProductEditModal({
  product,
  onClose,
  onSave,
}: {
  product: Product;
  onClose: () => void;
  onSave: (updated: Product) => void;
}) {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.image);
  const [category, setCategory] = useState<ProductCategory>(product.category);
  const [size, setSize] = useState(product.size);
  const [price, setPrice] = useState(String(product.price));
  const [badge, setBadge] = useState<ProductBadge | ''>(product.badge || '');

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') setImage(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function handleSave() {
    onSave({
      ...product,
      name,
      description,
      image,
      category,
      size,
      price: Number(price) || 0,
      badge: badge || undefined,
    });
  }

  const inputClass =
    'w-full rounded-xl px-3 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 outline-none transition-colors focus:border-[#014aad]';

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-lg" style={{ color: '#014aad' }}>Edit Product</h2>
          <button
            aria-label="Close"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#014aad] text-white hover:[filter:brightness(0.85)] transition-all duration-150"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-4 p-6">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className={inputClass} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-500">Photo</label>
            <div className="flex items-center gap-3">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                <Image src={image} alt={name} fill sizes="64px" className="object-cover" unoptimized={image.startsWith('data:')} />
              </div>
              <input type="file" accept="image/*" onChange={handlePhotoChange} className="text-xs text-gray-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value as ProductCategory)} className={inputClass}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">Size</label>
              <input value={size} onChange={(e) => setSize(e.target.value)} className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">Price (Ksh)</label>
              <input type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">Badge</label>
              <select value={badge} onChange={(e) => setBadge(e.target.value as ProductBadge | '')} className={inputClass}>
                <option value="">None</option>
                {BADGES.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full py-3 rounded-full font-bold text-sm text-white mt-2"
            style={{ background: '#014aad' }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
