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

// Offset amount: how far the blue decoration peeks out from behind the image
const OFFSET = 20; // px

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
            <div key={i} className="flex flex-col gap-4">

              {/* Image stack — wrapper reserves space for the offset */}
              <div
                className="relative w-full"
                style={{ paddingRight: OFFSET, paddingBottom: OFFSET }}
              >
                {/* Layer 1 (back): blue decorative rounded rectangle, offset bottom-right */}
                <div
                  className="absolute rounded-2xl bg-[#014aad]"
                  style={{
                    top: OFFSET,
                    left: OFFSET,
                    right: 0,
                    bottom: 0,
                    zIndex: 1,
                  }}
                />

                {/* Layer 2 (front): image placeholder, upper-left, above decoration */}
                <div
                  className="relative w-full rounded-2xl bg-gray-200 overflow-hidden"
                  style={{
                    aspectRatio: '4/3',
                    zIndex: 2,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                  }}
                />
              </div>

              {/* Stat */}
              <p className="text-2xl md:text-3xl font-extrabold text-[#0e0e0e] leading-tight">
                {stat}
              </p>

              {/* Description */}
              <p className="text-sm text-[#555555] leading-relaxed -mt-2">
                {description}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
