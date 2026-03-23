"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

/*
 * PageLoader — full-viewport white overlay that holds for a minimum of 2 000 ms.
 * Dismissed only after BOTH conditions resolve (Promise.all):
 *   1. The 2-second minimum timer has elapsed.
 *   2. The browser window 'load' event has fired (all assets ready).
 */
export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const minDelay = new Promise<void>((resolve) => setTimeout(resolve, 2000));

    const contentReady = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', () => resolve(), { once: true });
      }
    });

    Promise.all([minDelay, contentReady]).then(() => setVisible(false));
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        zIndex: 9999,
      }}
    >
      <Image
        src="/images/bedo-loader.gif"
        alt="Loading…"
        width={160}
        height={160}
        priority
        unoptimized
      />
    </div>
  );
}
