"use client";

const STAT_CARDS = [
  {
    stat: '300+',
    description: 'Women empowered with dignified jobs and training across fishing communities in Kenya',
    src: '/images/impact-images/1.jpg',
  },
  {
    stat: '40%',
    description: 'Reduction in emissions through modern energy-efficient roasting ovens',
    src: '/images/impact-images/2.jpg',
  },
  {
    stat: '3+',
    description: 'Export markets targeted to bring premium African tilapia to the world',
    src: '/images/impact-images/3.jpg',
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
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8 md:gap-10">
          {STAT_CARDS.map(({ stat, description, src }, i) => (
            <div key={i} className="flex flex-col gap-3">

              {/*
                Blue fills the full container behind the image.
                Image is inset 14px on top, right, and bottom — flush to left.
                Blue peeks as a thin ~14px strip on top, right, and bottom only.
                No blue visible on the left (image covers it from x=0).
              */}
              <div className="relative w-full" style={{ paddingBottom: '70%' }}>

                {/* Blue offset frame — right 33% of container, peeks on right/top/bottom */}
                <div
                  className="absolute bg-[#014aad]"
                  style={{
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: '33%',
                    borderRadius: '16px',
                    zIndex: 1,
                  }}
                />

                {/* Image — flush left, inset 14px on top / right / bottom */}
                <img
                  src={src}
                  alt=""
                  className="absolute object-cover"
                  style={{
                    top: '14px',
                    left: 0,
                    right: '14px',
                    bottom: '14px',
                    width: 'calc(100% - 14px)',
                    height: 'calc(100% - 28px)',
                    borderRadius: '12px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
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
