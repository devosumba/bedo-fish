"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  variant?: 'primary' | 'outline';
  href?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', href = '#', children }) => {
  const base = 'inline-flex items-center justify-center px-8 py-3 rounded-button font-semibold text-lg transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-primary';
  const styles =
    variant === 'primary'
      ? 'bg-primary text-white shadow-button hover:brightness-110 active:scale-95'
      : 'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white active:scale-95';
  return (
    <motion.a
      whileHover={{ y: -2, boxShadow: '0 4px 16px 0 rgba(255,138,0,0.10)' }}
      whileTap={{ scale: 0.97 }}
      href={href}
      className={`${base} ${styles} mx-1`}
    >
      {children}
    </motion.a>
  );
};


