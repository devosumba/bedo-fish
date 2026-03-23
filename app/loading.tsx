import Image from 'next/image';

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
