"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import AdminLogin from '../../components/admin/AdminLogin';
import ProductEditModal from '../../components/admin/ProductEditModal';
import { useProducts } from '../../lib/productStore';
import { Product } from '../../lib/products';

const AUTH_STORAGE_KEY = 'bedo-admin-auth';

function StatusPill({ product }: { product: Product }) {
  if (!product.isLive) {
    return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-200 text-gray-600">Hidden</span>;
  }
  if (product.isOutOfStock) {
    return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-100 text-orange-600">Out of Stock</span>;
  }
  return <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">Live</span>;
}

function ToggleButton({ product, onUpdate }: { product: Product; onUpdate: (p: Product) => void }) {
  const base = 'text-xs font-semibold px-3 py-1.5 rounded-full text-white whitespace-nowrap transition-opacity hover:opacity-90';

  if (!product.isLive) {
    return (
      <button className={base} style={{ background: '#22c55e' }} onClick={() => onUpdate({ ...product, isLive: true })}>
        Publish
      </button>
    );
  }
  if (product.isOutOfStock) {
    return (
      <button className={base} style={{ background: '#014aad' }} onClick={() => onUpdate({ ...product, isOutOfStock: false, isLive: true })}>
        Mark as Live
      </button>
    );
  }
  return (
    <button className={base} style={{ background: '#f97316' }} onClick={() => onUpdate({ ...product, isOutOfStock: true })}>
      Mark Out of Stock
    </button>
  );
}

function AdminDashboard({ email, onLogout }: { email: string; onLogout: () => void }) {
  const { products, updateProduct, resetProducts } = useProducts();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen" style={{ background: '#f5f5f5' }}>
      {/* Admin navbar */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <Image src="/assets/bedo-nav-logo.png" alt="Bedo Fish" width={100} height={34} className="object-contain" priority />
        <span className="text-xs text-gray-400 hidden sm:block">{email}</span>
        <button
          onClick={onLogout}
          className="text-xs font-semibold px-4 py-2 rounded-full border transition-colors hover:bg-[#014aad] hover:text-white"
          style={{ borderColor: '#014aad', color: '#014aad' }}
        >
          Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold" style={{ color: '#014aad' }}>Product Management</h1>
            <p className="text-sm text-gray-400 mt-1">Manage your product catalogue, availability, and stock status</p>
          </div>
          <button
            onClick={resetProducts}
            className="self-start sm:self-auto text-xs font-semibold px-4 py-2 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 transition-colors whitespace-nowrap"
          >
            Reset to Defaults
          </button>
        </div>

        <div className="bg-white rounded-2xl overflow-x-auto shadow-sm">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs text-gray-400 uppercase tracking-wide">
                <th className="px-4 py-3 font-medium">Photo</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Description</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Size</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Badge</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-50 last:border-0">
                  <td className="px-4 py-3">
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                        unoptimized={product.image.startsWith('data:')}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 font-bold text-gray-900 whitespace-nowrap">{product.name}</td>
                  <td className="px-4 py-3 text-gray-500 max-w-[180px] truncate" title={product.description}>
                    {product.description}
                  </td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{product.category}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{product.size}</td>
                  <td className="px-4 py-3 text-gray-900 font-semibold whitespace-nowrap">Ksh {product.price}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{product.badge || 'None'}</td>
                  <td className="px-4 py-3 whitespace-nowrap"><StatusPill product={product} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        Edit
                      </button>
                      <ToggleButton product={product} onUpdate={updateProduct} />
                      <button
                        onClick={() => updateProduct({ ...product, isLive: false })}
                        className="text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        Hide
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingProduct && (
        <ProductEditModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={(updated) => { updateProduct(updated); setEditingProduct(null); }}
        />
      )}
    </div>
  );
}

export default function AdminPage() {
  const [authEmail, setAuthEmail] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(AUTH_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { token?: string; email?: string };
        if (parsed.token && parsed.email) setAuthEmail(parsed.email);
      }
    } catch {}
    setChecked(true);
  }, []);

  function handleLogout() {
    try { sessionStorage.removeItem(AUTH_STORAGE_KEY); } catch {}
    setAuthEmail(null);
  }

  if (!checked) return null;

  if (!authEmail) {
    return <AdminLogin onLogin={setAuthEmail} />;
  }

  return <AdminDashboard email={authEmail} onLogout={handleLogout} />;
}
