"use client";

import { useEffect, useState } from 'react';

// Preload the GIF at module evaluation time so the browser starts fetching it
// before any component mounts — eliminates the blank-frame delay on first load.
if (typeof window !== 'undefined') {
  const _preload = new Image();
  _preload.src = '/images/bedo-loader.gif';
}

// GIF loop duration is 5 000 ms (150 frames). Minimum display time is set to
// one full loop so the animation never cuts off mid-cycle when fading out.
const MIN_DISPLAY_MS = 5000;

/*
 * PageLoader — full-viewport white overlay.
 * The component is NEVER unmounted — visibility is controlled via opacity so
 * the GIF keeps playing continuously in memory. This prevents the browser from
 * restarting the GIF from frame 0 when the loader becomes visible again or
 * during any re-render, which is the root cause of the restart glitch.
 */
export default function PageLoader() {
  const [showing, setShowing] = useState(true);

  useEffect(() => {
    const minDelay = new Promise<void>((resolve) => setTimeout(resolve, MIN_DISPLAY_MS));
    const contentReady = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', () => resolve(), { once: true });
      }
    });
    Promise.all([minDelay, contentReady]).then(() => setShowing(false));
  }, []);

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
        opacity: showing ? 1 : 0,
        pointerEvents: showing ? 'auto' : 'none',
        transition: 'opacity 200ms ease',
      }}
    >
      {/* Plain img — Next.js Image applies optimisation transforms that can
          interfere with GIF playback. fetchpriority=high tells the browser to
          fetch this before other resources. decoding=sync blocks first paint
          until the first GIF frame is decoded, preventing a blank flash.     */}
      <img
        src="/images/bedo-loader.gif"
        alt="Loading…"
        width={160}
        height={160}
        fetchPriority="high"
        decoding="sync"
        style={{ display: 'block' }}
      />
    </div>
  );
}
