import Image from 'next/image';

/*
 * Next.js App Router Suspense fallback — shown during route transitions and
 * Suspense boundaries. For initial page load the 2-second minimum is
 * enforced by PageLoader (components/PageLoader.tsx) in the root layout.
 */
export default function Loading() {
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
