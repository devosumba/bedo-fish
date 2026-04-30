"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const TEAM_MEMBERS = [
  { name: 'Sue Lazaro',    title: 'Chief Executive Officer', image: '/images/team/sue-lazaro.jpeg',  objectPosition: 'center top'  },
  { name: 'Richard Osaga', title: 'Director',                image: '/images/team/osaga.jpeg',        objectPosition: 'center top'  },
  { name: 'Allan Oluoch',  title: 'Director',                image: '/images/team/allan.jpeg',        objectPosition: 'center top'  },
  { name: 'Emily Mugure',  title: 'Social Media Manager',    image: '/images/team/emily-mugure.jpeg', objectPosition: 'center top'  },
  { name: 'Jim Kiche',     title: 'Head of Operations',      image: '/images/team/jim-kiche.jpeg',    objectPosition: 'center 20%'  },
  { name: 'Violet',        title: 'Production Manager',      image: '/images/team/violet.jpeg',       objectPosition: 'center 20%'  },
];

const PortfolioSection = () => {
  return (
    <section id="team" className="relative z-[3] bg-[#0e0e0e] w-full py-16 md:py-24 overflow-hidden rounded-[32px] -mt-8" style={{ borderTopLeftRadius: '32px', borderTopRightRadius: '32px', borderBottomLeftRadius: '32px', borderBottomRightRadius: '32px' }}>

      {/* Decorative blobs */}
      <div className="absolute -top-24 right-[20%] w-96 h-96 bg-[#014aad] opacity-[0.07] rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-[15%] w-[500px] h-[400px] bg-[#014aad] opacity-[0.05] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-[5%] w-48 h-48 bg-[#2a6fd4] opacity-[0.04] rounded-full blur-[60px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">

        {/* ── Header row ────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12 md:mb-16 gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight text-center md:text-left"
          >
            Our <span className="text-[#014aad]">Team</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:flex-1 md:max-w-[60%] text-white text-[15px] leading-relaxed text-center md:text-left mx-auto md:mx-0"
          >
            The team that knows the fish, knows the communities, and exactly what it takes to turn a local resource into a global product.
          </motion.p>
        </div>

        {/* ── Team cards — 3 columns desktop, 1 column mobile ───────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TEAM_MEMBERS.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 + i * 0.08 }}
              className="relative aspect-square bg-[#2d2d2d] rounded-3xl overflow-hidden"
            >
              {/* Team photo */}
              <Image
                src={member.image}
                alt={member.name}
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                style={{ objectPosition: member.objectPosition }}
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-x-0 bottom-0 z-10"
                style={{
                  height: '50%',
                  background: 'linear-gradient(to top, rgba(1, 74, 173, 0.85) 0%, transparent 100%)',
                }}
              />

              {/* Name and title over gradient */}
              <div className="absolute bottom-0 left-0 z-20 p-4 pb-5">
                <p className="text-white font-bold text-base leading-tight">{member.name}</p>
                <p className="text-[#a8c8f8] text-sm mt-0.5">{member.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PortfolioSection;
