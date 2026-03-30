"use client";

const STAT_CARDS = [
  {
    stat: '300+',
    description: 'Women empowered with dignified jobs and training across fishing communities in Kenya',
  },
  {
    stat: '40%',
    description: 'Reduction in emissions through modern energy-efficient roasting ovens',
  },
  {
    stat: '3+',
    description: 'Export markets targeted to bring premium African tilapia to the world',
  },
  {
    stat: '$4B',
    description: 'African tilapia market opportunity at the intersection of global protein demand and sustainable supply',
  },
];

export default function ImpactSection() {
  return (
    <section
      id="impact"
      className="relative z-[2] bg-white w-full pb-16 md:pb-24"
      style={{ marginTop: '-48px', paddingTop: 0 }}
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
        <p className="text-base text-[#0e0e0e] text-center max-w-3xl mx-auto mt-3 mb-10 md:mb-14 leading-relaxed">
          We are not just roasting fish. We are rewriting what African food
          enterprise looks like. Bedo Fish is proving that sustainable,
          community-powered food production is not just possible. It is scalable.
        </p>

        {/* ── Stat image cards ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {STAT_CARDS.map(({ stat, description }, i) => (
            <div key={i} className="flex flex-col gap-3">

              {/*
                Card image stack.
                paddingBottom: 70% creates container height = 70% of width.
                Both children are position:absolute, sized as % of that box.

                Image:      top:0  left:0  w:80%  h:86%  → 60%W tall → 4:3 aspect
                Decoration: bot:0  right:0 w:62%  h:58%  → 40.6%W tall
                Bottom peek: (70% - 60.2%) / 40.6% ≈ 24%  ✓
                Right peek:  (100% - 80%)  / 62%   ≈ 32%
              */}
              <div className="relative w-full" style={{ paddingBottom: '70%' }}>

                {/* Element 1 — blue decorative block, behind image */}
                <div
                  className="absolute rounded-[28px] bg-[#014aad]"
                  style={{
                    bottom: 0,
                    right: 0,
                    width: '62%',
                    height: '58%',
                    zIndex: 1,
                  }}
                />

                {/* Element 2 — image placeholder, top-left, on top */}
                <div
                  className="absolute rounded-[18px] bg-gray-200 overflow-hidden"
                  style={{
                    top: 0,
                    left: 0,
                    width: '80%',
                    height: '86%',
                    zIndex: 2,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                  }}
                />

              </div>

              {/* Stat */}
              <p className="text-2xl md:text-3xl font-extrabold text-[#0e0e0e] leading-tight mt-1">
                {stat}
              </p>

              {/* Description */}
              <p className="text-sm text-[#555555] leading-relaxed">
                {description}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
