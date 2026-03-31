"use client";

import { motion } from 'framer-motion';

const PortfolioSection = () => {
  return (
    <section id="team" className="relative z-[2] bg-[#0e0e0e] w-full py-16 md:py-24 overflow-hidden rounded-3xl">

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
            className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight"
          >
            Our <span className="text-[#014aad]">Team</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:flex-1 md:max-w-[60%] text-white text-[15px] leading-relaxed"
          >
            The team that knows the fish, knows the communities, and exactly what it takes to turn a local resource into a global product.
          </motion.p>
        </div>

        {/* ── Three square placeholder cards ────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 + i * 0.08 }}
              className="aspect-square bg-[#2d2d2d] rounded-3xl"
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default PortfolioSection;
