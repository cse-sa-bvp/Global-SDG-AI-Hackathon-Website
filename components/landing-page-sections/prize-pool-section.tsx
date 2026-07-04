"use client";

import { motion } from "framer-motion";
import { Medal } from "lucide-react";

import { SectionIntro, SectionShell, prizeCards } from "./shared";

export default function PrizePoolSection() {
  return (
    <SectionShell id="prizes" className="bg-[#fbfbfa]">
      <SectionIntro eyebrow="Prize Pool" title="" subtitle="" centered={false} compact />

      <h2 className="mt-3 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">Recognition that feels thoughtful, not flashy.</h2>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {prizeCards.map((prize, index) => (
          <motion.article key={prize.title} className={`rounded-[1.75rem] border border-neutral-200 bg-white p-5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)] ${index === 0 ? "xl:col-span-2" : ""}`} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }}>
            <Medal className="size-5 text-neutral-900" />
            <h3 className="mt-8 text-lg font-semibold tracking-tight text-neutral-950">{prize.title}</h3>
            <p className="mt-3 text-sm leading-6 text-neutral-600">{prize.description}</p>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}