"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Step = 'email' | 'message' | 'sent';

const EnvelopeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#014aad" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PencilIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#014aad" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

export default function ContactSection() {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [pillHovered, setPillHovered] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSend = async () => {
    if (step === 'email') {
      if (!validateEmail(value.trim())) {
        setError('Please enter a valid email address');
        return;
      }
      setError('');
      setEmail(value.trim());
      setValue('');
      setStep('message');
      return;
    }

    if (step === 'message') {
      if (!value.trim()) {
        setError('Please describe your project');
        return;
      }
      setError('');
      setSending(true);

      const response = await fetch('https://formspree.io/f/mqeykpvy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message: value.trim() }),
      });

      if (response.ok) {
        setSending(false);
        setStep('sent');
        setValue('');
        setTimeout(() => {
          setStep('email');
          setEmail('');
        }, 3000);
      } else {
        setSending(false);
        setError('Failed to send — please try again.');
      }
    }
  };

  const placeholder =
    step === 'email'
      ? 'Enter Email Address'
      : step === 'message'
      ? 'Join the Bedo Community. Share Your Experience/Review'
      : "Message sent! We will be in touch soon.";

  return (
    <section id="contact" className="bg-white w-full py-20 md:py-28">
      <div className="max-w-2xl mx-auto px-4 md:px-8 flex flex-col items-center gap-10">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-extrabold text-center leading-tight tracking-tight"
          style={{ color: '#1a1a2e' }}
        >
          Stay in the Loop.{' '}
          <span style={{ color: '#014aad' }}>Share Your Bedo Experience</span>
        </motion.h2>

        {/* Let's Connect row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex items-center justify-center gap-4"
        >
          <span className="text-sm font-medium" style={{ color: '#6b7280' }}>Find Us Online</span>
          <div className="flex items-center gap-4">
            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@bedo_fish_ke"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              style={{ color: '#1a1a2e', background: 'transparent', border: '2px solid #1a1a2e', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = '#fff'; el.style.background = '#014aad'; el.style.borderColor = '#014aad'; el.style.transform = 'scale(1.1)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = '#1a1a2e'; el.style.background = 'transparent'; el.style.borderColor = '#1a1a2e'; el.style.transform = 'scale(1)'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/bedo_fish?igsh=cnlpeXhvZzA2Z2Yz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{ color: '#1a1a2e', background: 'transparent', border: '2px solid #1a1a2e', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = '#fff'; el.style.background = '#014aad'; el.style.borderColor = '#014aad'; el.style.transform = 'scale(1.1)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = '#1a1a2e'; el.style.background = 'transparent'; el.style.borderColor = '#1a1a2e'; el.style.transform = 'scale(1)'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="https://www.facebook.com/people/Bedo-Fish/61576884642289/#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              style={{ color: '#1a1a2e', background: 'transparent', border: '2px solid #1a1a2e', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = '#fff'; el.style.background = '#014aad'; el.style.borderColor = '#014aad'; el.style.transform = 'scale(1.1)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = '#1a1a2e'; el.style.background = 'transparent'; el.style.borderColor = '#1a1a2e'; el.style.transform = 'scale(1)'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            {/* WhatsApp */}
            <a
              href="https://wa.me/254722144319"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              style={{ color: '#1a1a2e', background: 'transparent', border: '2px solid #1a1a2e', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = '#fff'; el.style.background = '#014aad'; el.style.borderColor = '#014aad'; el.style.transform = 'scale(1.1)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = '#1a1a2e'; el.style.background = 'transparent'; el.style.borderColor = '#1a1a2e'; el.style.transform = 'scale(1)'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Input row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="w-full flex flex-col gap-2"
        >
          <div
            className="flex items-center gap-3 w-full rounded-full px-3 py-2"
            onMouseEnter={() => setPillHovered(true)}
            onMouseLeave={() => setPillHovered(false)}
            style={{
              background: '#fff',
              border: `1.5px solid ${pillHovered || inputFocused ? '#014aad' : '#e5e7eb'}`,
              boxShadow: inputFocused
                ? '0 0 0 3px rgba(1,74,173,0.3), 0 6px 25px rgba(1,74,173,0.25)'
                : pillHovered
                ? '0 0 0 2px rgba(1,74,173,0.2), 0 4px 20px rgba(1,74,173,0.15)'
                : '0 2px 12px rgba(0,0,0,0.06)',
              transform: pillHovered || inputFocused ? 'translateY(-2px)' : 'translateY(0)',
              transition: 'all 0.3s ease',
            }}
          >
            {/* Icon badge */}
            <div
              className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(1,74,173,0.10)' }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={step === 'message' ? 'pencil' : 'envelope'}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                >
                  {step === 'message' ? <PencilIcon /> : <EnvelopeIcon />}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Input */}
            <input
              type={step === 'email' ? 'email' : 'text'}
              value={step === 'sent' ? '' : value}
              onChange={(e) => { setValue(e.target.value); if (error) setError(''); }}
              onKeyDown={(e) => { if (e.key === 'Enter' && !sending) handleSend(); }}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              placeholder={placeholder}
              disabled={step === 'sent' || sending}
              className="flex-1 bg-transparent outline-none text-sm min-w-0"
              style={{ color: '#1a1a2e' }}
            />

            {/* Send button */}
            <button
              onClick={handleSend}
              disabled={step === 'sent' || sending}
              className="flex-shrink-0 font-semibold text-sm px-5 py-2 rounded-full transition-colors focus:outline-none"
              style={{
                background: '#014aad',
                color: '#fff',
                opacity: sending ? 0.7 : 1,
                cursor: step === 'sent' || sending ? 'default' : 'pointer',
              }}
            >
              {sending ? '...' : step === 'sent' ? '✓' : 'Send'}
            </button>
          </div>

          {/* Error message */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs pl-4"
            >
              {error}
            </motion.p>
          )}

          {/* Step hint */}
          {step === 'message' && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs pl-4"
              style={{ color: '#9ca3af' }}
            >
              Sending to johnaustineosumba@gmail.com from {email}
            </motion.p>
          )}
        </motion.div>

        {/* Copyright */}
        <p className="text-xs text-center" style={{ color: '#9ca3af' }}>
          &copy; {new Date().getFullYear()} Bedo Fish. All rights reserved | Developed by{' '}
          <a
            href="https://www.linkedin.com/in/john-austine-osumba-689327207/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#014aad', fontWeight: 700, fontSize: '0.8rem', textDecoration: 'none' }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'underline'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.textDecoration = 'none'; }}
          >
            Osumba
          </a>
        </p>

      </div>
    </section>
  );
}
