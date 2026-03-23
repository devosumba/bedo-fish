"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Step = 'email' | 'message' | 'sent';

const STATS = [
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#014aad" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    text: '4.9/5 Average Ratings',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#014aad" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
    text: '5 Years + Experience',
  },
  {
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#014aad" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    text: 'Certified Software Engineer',
  },
];

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
      ? 'Tell us about your project — what are you building?'
      : "Message sent! I'll be in touch soon 🚀";

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
          Have an Awesome Project Idea?{' '}
          <span style={{ color: '#014aad' }}>Let&apos;s Discuss</span>
        </motion.h2>

        {/* Let's Connect row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex items-center justify-center gap-4"
        >
          <span className="text-sm font-medium" style={{ color: '#6b7280' }}>Let&apos;s Connect</span>
          <div className="flex items-center gap-4">
            {/* Email */}
            <a
              href="mailto:johnaustineosumba@gmail.com"
              aria-label="Email"
              style={{ color: '#1a1a2e', background: 'transparent', border: '2px solid #1a1a2e', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = '#fff'; el.style.background = '#014aad'; el.style.borderColor = '#014aad'; el.style.transform = 'scale(1.1)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = '#1a1a2e'; el.style.background = 'transparent'; el.style.borderColor = '#1a1a2e'; el.style.transform = 'scale(1)'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/john-austine-osumba-689327207/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{ color: '#1a1a2e', background: 'transparent', border: '2px solid #1a1a2e', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = '#fff'; el.style.background = '#014aad'; el.style.borderColor = '#014aad'; el.style.transform = 'scale(1.1)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = '#1a1a2e'; el.style.background = 'transparent'; el.style.borderColor = '#1a1a2e'; el.style.transform = 'scale(1)'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            {/* GitHub */}
            <a
              href="https://github.com/devosumba"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={{ color: '#1a1a2e', background: 'transparent', border: '2px solid #1a1a2e', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = '#fff'; el.style.background = '#014aad'; el.style.borderColor = '#014aad'; el.style.transform = 'scale(1.1)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.color = '#1a1a2e'; el.style.background = 'transparent'; el.style.borderColor = '#1a1a2e'; el.style.transform = 'scale(1)'; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
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
                background: step === 'sent' ? '#4ade80' : '#014aad',
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

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 md:gap-10"
        >
          {STATS.map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm font-medium" style={{ color: '#1a1a2e' }}>
              {icon}
              <span>{text}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
