"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trophy, Users, Code2, Globe, Share2, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { SectionIntro, SectionShell, benefits } from "./shared";

const cardVisuals = [
  { image: "/Card1.png", icon: Trophy, ring: "ring-sky-100", iconColor: "text-sky-600", underline: "bg-sky-500", textWidth: "max-w-[70%] sm:max-w-[66%]" },
  { image: "/Card2.png", icon: Users, ring: "ring-violet-100", iconColor: "text-violet-600", underline: "bg-violet-500", textWidth: "max-w-[70%] sm:max-w-[66%]" },
  { image: "/Card3.png", icon: Code2, ring: "ring-emerald-100", iconColor: "text-emerald-600", underline: "bg-emerald-500", textWidth: "max-w-[70%] sm:max-w-[66%]" },
  { image: "/Card4.png", icon: Globe, ring: "ring-emerald-100", iconColor: "text-emerald-600", underline: "bg-emerald-500", textWidth: "max-w-[48%] sm:max-w-[44%]" },
  { image: "/Card5.png", icon: Share2, ring: "ring-indigo-100", iconColor: "text-indigo-600", underline: "bg-indigo-500", textWidth: "max-w-[48%] sm:max-w-[44%]" },
  { image: "/Card6.png", icon: ShieldCheck, ring: "ring-violet-100", iconColor: "text-violet-600", underline: "bg-violet-500", textWidth: "" },
] as const;

const textShadow = { textShadow: "0 1px 3px rgba(255,255,255,0.9), 0 1px 12px rgba(255,255,255,0.6)" };

export default function WhyParticipateSection() {
  return (
    <SectionShell id="benefits" className="bg-[#FAFAF7]">
      <SectionIntro
        eyebrow="Why Participate"
        title="Built for"
        highlight="ambitious teams"
        subtitle="From global recognition to real AI solutions — here's what you'll walk away with."
        centered
      />

      <div className="mt-10 -mx-2 sm:-mx-4 lg:-mx-8 xl:-mx-10">
        <div className="grid gap-4 px-2 sm:px-4 md:grid-cols-6">
          {benefits.map((benefit, index) => {
            const visual = cardVisuals[index % cardVisuals.length];
            const isFullWidth = benefit.span.includes("col-span-6");
            const isTopRow = index < 3;
            const Icon = visual.icon;

            return (
              <motion.article
                key={benefit.title}
                className={cn(
                  "group relative overflow-hidden rounded-[1.75rem] border border-neutral-200 shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_20px_48px_rgba(15,23,42,0.1)]",
                  isFullWidth
                    ? "h-auto min-h-[220px] sm:h-[200px] sm:min-h-0"
                    : isTopRow
                    ? "h-auto min-h-[240px] sm:h-[230px] sm:min-h-0"
                    : "h-auto min-h-[280px] sm:h-[280px] sm:min-h-0",
                  isFullWidth ? "bg-[#fbfbfa]" : undefined,
                  benefit.span
                )}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
              >
                {isFullWidth ? (
                  <>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex h-full items-center overflow-hidden">
                      <Image
                        src={visual.image}
                        alt=""
                        width={800}
                        height={450}
                        className="h-full w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                        aria-hidden="true"
                      />
                    </div>

                    <div className="relative z-10 flex h-full max-w-[66%] flex-col justify-center p-6 sm:max-w-[60%] sm:p-8">
                      <div
                        className={cn(
                          "inline-flex size-14 items-center justify-center rounded-2xl bg-white shadow-[0_6px_16px_rgba(15,23,42,0.08)] ring-1",
                          visual.ring
                        )}
                      >
                        <Icon className={cn("size-7", visual.iconColor)} strokeWidth={2.25} />
                      </div>

                      <h3 className="mt-5 text-base font-semibold tracking-tight text-neutral-950 sm:text-lg">
                        {benefit.title}
                      </h3>
                      <span className={cn("mt-2 block h-[3px] w-8 rounded-full", visual.underline)} />

                      <p className="mt-2 text-sm leading-5 text-neutral-600">
                        {benefit.description}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <Image
                      src={visual.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      aria-hidden="true"
                    />

                    <div className={cn("relative z-10 flex h-full flex-col p-6 sm:p-7", visual.textWidth)}>
                      <div
                        className={cn(
                          "inline-flex size-14 items-center justify-center rounded-2xl bg-white shadow-[0_6px_16px_rgba(15,23,42,0.12)] ring-1 transition-transform duration-300 group-hover:scale-105",
                          visual.ring
                        )}
                      >
                        <Icon className={cn("size-7", visual.iconColor)} strokeWidth={2.25} />
                      </div>

                      <h3
                        className="mt-5 text-base font-semibold tracking-tight text-neutral-950 sm:text-lg"
                        style={textShadow}
                      >
                        {benefit.title}
                      </h3>
                      <span className={cn("mt-2 block h-[3px] w-8 rounded-full", visual.underline)} />

                      <p className="mt-2 text-sm leading-5 text-neutral-600" style={textShadow}>
                        {benefit.description}
                      </p>
                    </div>
                  </>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}