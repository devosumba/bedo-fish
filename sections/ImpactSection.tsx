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
                Near-square container: paddingBottom 88% → height = 88% of width.
                Image:  top-left,     76% × 76%  → right/bottom peek = 24%
                Block:  bottom-right, 67% × 67%  → ~36% of block visible each edge
              */}
              <div className="relative w-full" style={{ paddingBottom: '88%' }}>

                {/* Element 1 — blue block, bottom-right, behind image */}
                <div
                  className="absolute bg-[#014aad]"
                  style={{
                    bottom: 0,
                    right: 0,
                    width: '67%',
                    height: '67%',
                    borderRadius: '20px',
                    zIndex: 1,
                  }}
                />

                {/* Element 2 — image extends almost to block's far corner */}
                <div
                  className="absolute bg-gray-200 overflow-hidden"
                  style={{
                    top: 0,
                    left: 0,
                    width: '76%',
                    height: '76%',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.14)',
                    zIndex: 2,
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
