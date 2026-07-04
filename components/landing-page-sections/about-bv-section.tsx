"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionIntro, SectionShell, highlights } from "./shared";
import { motion } from "framer-motion";

export default function AboutBvSection() {
  return (
    <SectionShell id="about" className="bg-white">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <SectionIntro eyebrow="About Bharati Vidyapeeth" title="Hosted by Bharati Vidyapeeth" subtitle="A compact institutional snapshot for the event page." centered={false} alignLeft />

          <div className="mt-8">
            <Button asChild size="lg" variant="outline" className="rounded-full px-6">
              <Link href="https://www.bharatividyapeeth.edu/" target="_blank" rel="noreferrer">Learn More</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {highlights.map((highlight) => (
            <motion.article key={highlight.title} className="rounded-3xl border border-neutral-200 bg-[#fbfbfa] p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_14px_35px_rgba(15,23,42,0.06)]" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }}>
              <div className="inline-flex size-11 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-900">
                <highlight.icon className="size-5" />
              </div>
              <h3 className="mt-6 text-base font-semibold tracking-tight text-neutral-950">{highlight.title}</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">{highlight.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}