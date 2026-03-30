"use client";

// ─── Our Impact section ───────────────────────────────────────────────────────
// Centered heading + paragraph above a two-column layout.
// Left:  blue stat card ($4B market opportunity)
// Right: three concentric circles (300+, 40%, 3+) with dashed-line labels

const CIRCLES = [
  {
    size: 260,
    bg: '#014aad',
    stat: '300+',
    label: 'WOMEN EMPOWERED WITH JOBS AND TRAINING',
  },
  {
    size: 180,
    bg: '#e8e4dc',
    stat: '40%',
    label: 'EMISSION REDUCTION VIA MODERN ENERGY-EFFICIENT OVENS',
  },
  {
    size: 100,
    bg: '#014aad',
    stat: '3+',
    label: 'EXPORT MARKETS TARGETED',
  },
];

export default function ImpactSection() {
  return (
    <section
      id="impact"
      className="relative z-[2] bg-white w-full pt-4 pb-16 md:pb-24"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        {/* ── Centered heading ──────────────────────────────────────────── */}
        <div className="text-center">
          <h2
            className="text-4xl md:text-5xl font-extrabold leading-tight"
            style={{ whiteSpace: 'nowrap' }}
          >
            <span className="text-[#0e0e0e]">Our </span>
            <span className="text-[#014aad]">Impact</span>
          </h2>
        </div>

        {/* ── Impact paragraph ──────────────────────────────────────────── */}
        <p className="text-base text-[#0e0e0e] text-center max-w-3xl mx-auto mt-3 mb-12 md:mb-16 leading-relaxed">
          We are not just roasting fish. We are rewriting what African food
          enterprise looks like. With a 40% reduction in emissions, 300+ women
          trained and employed, and our sights set on a $4 billion export
          opportunity across three markets, Bedo Fish is proving that
          sustainable, community-powered food production is not just possible.
          It is scalable.
        </p>

        {/* ── Two-column content ────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">

          {/* Left column: blue stat card */}
          <div className="w-full md:w-[45%] shrink-0">
            <div
              className="rounded-2xl bg-[#014aad] p-6 md:p-8 flex flex-col gap-4"
              style={{ boxShadow: '0 8px 32px rgba(1,74,173,0.18)' }}
            >
              {/* Stat row */}
              <div className="flex items-center gap-3">
                <span className="text-5xl md:text-6xl font-extrabold text-white leading-none">
                  $4B
                </span>
                {/* Globe icon */}
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>

              {/* Label chip */}
              <div className="inline-block">
                <span
                  className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.85)' }}
                >
                  African Tilapia Market Opportunity
                </span>
              </div>

              {/* Description */}
              <p className="text-sm md:text-base text-white/90 leading-relaxed">
                Bedo Fish sits at the intersection of a rapidly growing global
                protein market and Africa&apos;s untapped capacity to supply premium,
                sustainable fish.
              </p>
            </div>
          </div>

          {/* Right column: concentric circles */}
          <div className="w-full md:flex-1 flex items-center justify-center md:justify-start">
            <div
              className="relative flex items-center justify-center"
              style={{ width: CIRCLES[0].size, height: CIRCLES[0].size }}
            >
              {CIRCLES.map(({ size, bg, stat, label: _label }, i) => (
                <div
                  key={i}
                  className="absolute rounded-full flex items-center justify-center"
                  style={{ width: size, height: size, background: bg, zIndex: i + 1 }}
                >
                  <span
                    className="font-extrabold text-white leading-none select-none"
                    style={{ fontSize: size * 0.22 }}
                  >
                    {stat}
                  </span>
                </div>
              ))}

              {/* Dashed-line labels positioned right of each circle */}
              {CIRCLES.map(({ size, label }, i) => {
                const topOffset = (CIRCLES[0].size - size) / 2;
                return (
                  <div
                    key={i}
                    className="absolute flex items-center"
                    style={{
                      top: topOffset + size / 2 - 10,
                      left: CIRCLES[0].size / 2 + size / 2,
                      zIndex: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 24,
                        borderTop: '1.5px dashed #014aad',
                        marginRight: 8,
                        flexShrink: 0,
                      }}
                    />
                    <p
                      className="text-[10px] font-semibold tracking-widest uppercase text-[#0e0e0e] leading-snug"
                      style={{ maxWidth: 140 }}
                    >
                      {label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
