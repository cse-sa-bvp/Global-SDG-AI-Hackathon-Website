"use client";

import { motion } from "framer-motion";

import { SectionIntro, SectionShell, sponsorPlaceholders } from "./shared";

export default function SponsorsSection() {
  return (
    <SectionShell id="sponsors" className="bg-[#fbfbfa]">
      <SectionIntro eyebrow="Sponsors" title="Our Partners" subtitle="Partner slots are rolling in, so the marquee stays elegant even before the lineup is final." centered />

      <div className="mt-10 overflow-hidden rounded-4xl border border-neutral-200 bg-white px-4 py-6">
        <motion.div className="flex w-max items-center gap-4" animate={{ x: [0, -50 * 16] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
          {[...sponsorPlaceholders, ...sponsorPlaceholders].map((item, index) => (
            <div key={`${item.id}-${index}`} className="flex h-24 w-52 items-center justify-center rounded-3xl border border-neutral-200 bg-neutral-50 px-6 text-sm font-semibold uppercase tracking-[0.28em] text-neutral-500 shadow-[0_8px_30px_rgba(15,23,42,0.04)]">Coming Soon</div>
          ))}
        </motion.div>
      </div>
    </SectionShell>
  );
}