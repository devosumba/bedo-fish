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
            <div key={i} className="flex flex-col gap-4">

              {/*
                Image stack — creates the layered offset effect.
                The wrapper's padding-right + padding-bottom reserve the space
                where the blue decoration peeks out. Both layers are the same
                size; the decoration sits 18% right and down from the image.

                Container:  100% wide, height = image height + padding-bottom
                Image:      fills content box (82% of container width), z=2
                Decoration: same size as image, offset 18% right+down, z=1
              */}
              <div className="relative w-full" style={{ paddingRight: '18%', paddingBottom: '18%' }}>

                {/* Layer 1 — blue decoration, behind image */}
                <div
                  className="absolute rounded-[28px] bg-[#014aad]"
                  style={{
                    top:    '18%',
                    left:   '18%',
                    right:  0,
                    bottom: 0,
                    zIndex: 1,
                  }}
                />

                {/* Layer 2 — image placeholder, upper-left, on top */}
                <div
                  className="relative w-full rounded-2xl bg-gray-200 overflow-hidden"
                  style={{
                    aspectRatio: '4/3',
                    zIndex: 2,
                    boxShadow: '0 6px 24px rgba(0,0,0,0.13)',
                  }}
                />

              </div>

              {/* Stat */}
              <p className="text-2xl md:text-3xl font-extrabold text-[#0e0e0e] leading-tight">
                {stat}
              </p>

              {/* Description */}
              <p className="text-sm text-[#555555] leading-relaxed -mt-1">
                {description}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
