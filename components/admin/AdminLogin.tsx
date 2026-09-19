"use client";

import { useState } from 'react';
import Image from 'next/image';

const AUTH_STORAGE_KEY = 'bedo-admin-auth';

export default function AdminLogin({ onLogin }: { onLogin: (email: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Invalid email or password. Access denied.');
        setSubmitting(false);
        return;
      }

      try {
        sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ token: data.token, email: data.email }));
      } catch {}
      onLogin(data.email);
    } catch {
      setError('Something went wrong. Please try again.');
      setSubmitting(false);
    }
  }

  const inputClass =
    'w-full rounded-xl px-4 py-3 text-sm text-gray-900 bg-white border border-gray-200 outline-none transition-colors focus:border-[#014aad]';

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#0e0e0e' }}>
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-6">
        <Image src="/assets/bedo-nav-logo.png" alt="Bedo Fish" width={120} height={40} className="object-contain" priority />

        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold" style={{ color: '#014aad' }}>Admin Login</h1>
          <p className="text-xs text-gray-400">Bedo Fish Product Management</p>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="admin-email" className="text-xs font-medium text-gray-500">Email Address</label>
            <input
              id="admin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="you@bedofish.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="admin-password" className="text-xs font-medium text-gray-500">Password</label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputClass} pr-11`}
                placeholder="••••••••"
              />
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-full font-bold text-sm text-white transition-opacity disabled:opacity-60"
            style={{ background: '#014aad' }}
          >
            {submitting ? 'Logging in...' : 'Login'}
          </button>

          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}
