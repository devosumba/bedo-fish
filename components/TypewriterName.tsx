"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';

type Props = {
  names: string[];
  className?: string;
  typingSpeed?: number; // ms per char
  deletingSpeed?: number; // ms per char
  pause?: number; // ms pause at full word
};

export default function TypewriterName({
  names,
  className,
  typingSpeed = 120,
  deletingSpeed = 60,
  pause = 900,
}: Props) {
  const [display, setDisplay] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showComma, setShowComma] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef<HTMLSpanElement | null>(null);
  const sizerRef = useRef<HTMLSpanElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const longest = names.reduce((a, b) => (a.length >= b.length ? a : b), names[0] || '');

  const effectKey = useMemo(() => {
    return [display, isDeleting, index, names.join('|'), typingSpeed, deletingSpeed, pause, isVisible, showComma].join('||');
  }, [display, isDeleting, index, names, typingSpeed, deletingSpeed, pause, isVisible, showComma]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting);
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    // measure each name (with cursor) and pick the visually widest to set a locked width
    const measure = () => {
      const s = sizerRef.current;
      const w = node;
      if (!s || !w) return;

      let max = 0;
      // prepare a cursor element instance we can append for measuring
      const ensureCursor = () => {
        let c = s.querySelector('.typewriter-cursor') as HTMLElement | null;
        if (!c) {
          c = document.createElement('span');
          c.className = 'typewriter-cursor';
          c.setAttribute('aria-hidden', 'true');
          s.appendChild(c);
        }
        return c;
      };

      // measure every candidate name (including its trailing comma) to find largest rendered width
      names.forEach((name) => {
        // set text and ensure cursor present for measurement
        s.textContent = name + ',';
        ensureCursor();
        const rect = s.getBoundingClientRect();
        if (rect.width > max) max = rect.width;
      });

      // set explicit locked width (round up to avoid subpixel reflow)
      (w.style as any).width = `${Math.ceil(max)}px`;
    };
    measure();
    window.addEventListener('resize', measure);
    const fontObserver = document.fonts ? document.fonts : null;
    if (fontObserver && (fontObserver as any).ready) {
      (fontObserver as any).ready.then(measure).catch(() => {});
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [names]);

  useEffect(() => {
    if (!isVisible) {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      return;
    }

    const current = names[index % names.length];

    if (isDeleting) {
      // when deleting, remove visible comma first (if present), then delete letters
      if (showComma) {
        // remove comma and let the effect re-run to continue deleting
        timeoutRef.current = window.setTimeout(() => {
          setShowComma(false);
        }, deletingSpeed);
      } else if (display.length > 0) {
        timeoutRef.current = window.setTimeout(() => {
          setDisplay((prev) => prev.slice(0, prev.length - 1));
        }, deletingSpeed);
      } else {
        // finished deleting, move to next word
        setIsDeleting(false);
        setIndex((i) => (i + 1) % names.length);
        setShowComma(false);
      }
    } else {
      // typing: type letters; when complete, reveal comma, pause, then delete
      if (display.length < current.length) {
        timeoutRef.current = window.setTimeout(() => {
          setDisplay(current.slice(0, display.length + 1));
        }, typingSpeed);
      } else if (!showComma) {
        // word fully typed; reveal comma as part of the content
        setShowComma(true);
        // after pause, begin deleting (which will remove comma first)
        timeoutRef.current = window.setTimeout(() => {
          setIsDeleting(true);
        }, pause);
      } else {
        // already showing comma; wait then delete
        timeoutRef.current = window.setTimeout(() => {
          setIsDeleting(true);
        }, pause);
      }
    }

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [effectKey]);

  return (
    <span
      ref={ref}
      className={className}
      aria-live="polite"
      style={{ display: 'inline-block', verticalAlign: 'baseline', lineHeight: 'inherit', whiteSpace: 'nowrap', textAlign: 'left' }}
    >
      {/* sizer: hidden but measured. include cursor so measured width accounts for it */}
      <span
        ref={sizerRef}
        style={{
          visibility: 'hidden',
          whiteSpace: 'nowrap',
          position: 'absolute',
          left: 0,
          top: 0,
          pointerEvents: 'none',
        }}
      >
        {longest}
        <span className="typewriter-cursor" aria-hidden />
      </span>

      <span aria-hidden style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
        {display}
        {showComma ? <span aria-hidden className="text-gray-900">,</span> : null}
      </span>

      <span className="typewriter-cursor" aria-hidden />
    </span>
  );
}
