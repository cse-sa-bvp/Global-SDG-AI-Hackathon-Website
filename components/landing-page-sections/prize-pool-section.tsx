"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Allura } from "next/font/google";
import {
  Trophy,
  Rocket,
  Star,
  Wallet,
  Users,
  FileText,
  Globe,
  BadgeCheck,
} from "lucide-react";

import { SectionShell } from "./shared";

const allura = Allura({ subsets: ["latin"], weight: "400" });

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const mainAwards = [
  {
    title: "Best Overall Innovation",
    description: "Most impactful end-to-end solution.",
    image: "/prize1.png",
    top: true,
    ring: "border-amber-200",
    underline: "bg-amber-400",
  },
  {
    title: "Best SDG Impact Solution",
    description: "Strongest measurable SDG contribution.",
    image: "/prize2.png",
    ring: "border-neutral-100",
    underline: "bg-emerald-500",
  },
  {
    title: "Best AI Application",
    description: "Best practical use of AI.",
    image: "/prize3.png",
    ring: "border-neutral-100",
    underline: "bg-blue-500",
  },
  {
    title: "Best Startup Potential",
    description: "Highest potential for commercialization.",
    image: "/prize4.png",
    ring: "border-neutral-100",
    underline: "bg-violet-500",
  },
];

const specialAwards = [
  {
    title: "Women in AI Award",
    description: "Outstanding women-led innovation.",
    image: "/prize5.png",
    underline: "bg-rose-400",
  },
  {
    title: "Social Innovation",
    description: "Technology creating meaningful community impact.",
    image: "/prize6.png",
    underline: "bg-cyan-500",
  },
  {
    title: "Jury Excellence",
    description: "Jury's standout selection.",
    image: "/prize7.png",
    underline: "bg-violet-500",
  },
];

const winnerBenefits = [
  {
    title: "Cash Prizes",
    icon: Wallet,
    iconBg: "bg-emerald-50 text-emerald-600",
    underline: "bg-emerald-500",
  },
  {
    title: "Industry Mentorship",
    icon: Users,
    iconBg: "bg-blue-50 text-blue-600",
    underline: "bg-blue-500",
  },
  {
    title: "Startup Incubation Support",
    icon: Rocket,
    iconBg: "bg-violet-50 text-violet-600",
    underline: "bg-violet-500",
  },
  {
    title: "Publication Opportunities",
    icon: FileText,
    iconBg: "bg-teal-50 text-teal-600",
    underline: "bg-teal-500",
  },
  {
    title: "International Recognition",
    icon: Globe,
    iconBg: "bg-amber-50 text-amber-600",
    underline: "bg-amber-400",
  },
  {
    title: "Certificates of Excellence",
    icon: BadgeCheck,
    iconBg: "bg-sky-50 text-sky-600",
    underline: "bg-sky-500",
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PrizePoolSection() {
  return (
    <SectionShell id="prizes" className="bg-[#FAFAF7]">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.4fr] lg:items-start">
        {/* Left: heading + total prize pool card */}
        <div>
          <span className="inline-flex w-fit items-center rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">
            Prize Pool
          </span>

          <h2 className="mt-4 max-w-md text-balance text-3xl font-bold leading-[1.1] tracking-tight text-neutral-950 sm:text-4xl">
            Recognition{" "}
            <span
              className={allura.className}
              style={{
                background: "linear-gradient(to right, #059669, #0d9488, #0284c7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                WebkitTextStroke: "0.9px #0d9488",
                backgroundClip: "text",
                fontSize: "1.5em",
                display: "inline-block",
              }}
            >
              Beyond
            </span>{" "}
            <span className="bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent">
              Prize Money.
            </span>
          </h2>

          <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-500" />

          <motion.div
            className="mt-6 overflow-hidden rounded-3xl border border-neutral-100 shadow-[0_8px_30px_rgba(15,23,42,0.06)]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
          >
            <Image
              src="/prize.png"
              alt="Total prize pool: ₹10 Lakhs+ (tentative) across 7 award categories"
              width={640}
              height={640}
              className="h-auto w-full object-cover"
            />
          </motion.div>
        </div>

        {/* Right: award category grids */}
        <div>
          {/* Main award categories */}
          <div className="flex items-center justify-center mt-7 gap-3">
            <span className="hidden h-px flex-1 bg-neutral-200 sm:block" />
            <span className="hidden h-1 w-1 rounded-full bg-emerald-400 sm:block" />
            <div className="flex items-center gap-1.5 text-emerald-700">
              <Trophy className="h-3.5 w-3.5" />
              <span className="text-[11px] font-bold uppercase tracking-[0.28em]">
                Main Award Categories
              </span>
            </div>
            <span className="hidden h-1 w-1 rounded-full bg-emerald-400 sm:block" />
            <span className="hidden h-px flex-1 bg-neutral-200 sm:block" />
          </div>

          <div className="mt-5 grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
            {mainAwards.map((award, index) => (
              <motion.article
                key={award.title}
                className={`relative flex flex-col rounded-2xl border bg-white px-4 pb-5 pt-6 text-center shadow-[0_2px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)] ${award.ring}`}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.05 }}
              >
                {award.top && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-amber-400 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
                    Flagship Award
                  </span>
                )}

                <div className="mx-auto h-20 w-20 overflow-hidden rounded-full">
                  <Image
                    src={award.image}
                    alt={award.title}
                    width={160}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                </div>

                <h3 className="mt-3 text-sm font-bold leading-snug tracking-tight text-neutral-950">
                  {award.title}
                </h3>

                <div className={`mx-auto mt-2 h-0.5 w-7 rounded-full ${award.underline}`} />

                <p className="mt-3 text-xs leading-5 text-neutral-600">
                  {award.description}
                </p>
              </motion.article>
            ))}
          </div>

          {/* Special awards */}
          <div className="mt-7 flex items-center justify-center gap-3">
            <span className="hidden h-px flex-1 bg-neutral-200 sm:block" />
            <span className="hidden h-1 w-1 rounded-full bg-violet-400 sm:block" />
            <div className="flex items-center gap-1.5 text-violet-700">
              <Star className="h-3.5 w-3.5 fill-violet-600" />
              <span className="text-[11px] font-bold uppercase tracking-[0.28em]">
                Special Awards
              </span>
            </div>
            <span className="hidden h-1 w-1 rounded-full bg-violet-400 sm:block" />
            <span className="hidden h-px flex-1 bg-neutral-200 sm:block" />
          </div>

          <div className="mt-5 grid gap-3.5 sm:grid-cols-3">
            {specialAwards.map((award, index) => (
              <motion.article
                key={award.title}
                className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-[0_2px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,0.08)]"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-start gap-4">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={award.image}
                      alt={award.title}
                      width={160}
                      height={160}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="mt-4 text-base font-bold leading-snug tracking-tight text-neutral-950">
                      {award.title}
                    </h3>
                    <div className={`mt-1.5 h-0.5 w-7 rounded-full ${award.underline}`} />
                  </div>
                </div>
                <p className="mt-4 text-xs leading-5 text-neutral-600">
                  {award.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom banner: benefits beyond prize money */}
      <motion.div
        className="mt-9 rounded-3xl border border-neutral-100 bg-white px-6 py-6 shadow-[0_2px_24px_rgba(15,23,42,0.05)] sm:px-8 sm:py-7"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex items-center justify-center gap-2.5 text-emerald-700">
          <span className="text-base">🌿</span>
          <span className="text-center text-[18px] font-bold uppercase tracking-[0.28em] sm:text-xs text-xl">
            Every Winning Team Receives More Than Prize Money
          </span>
          <span className="text-base">🌿</span>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:flex lg:grid-cols-none lg:items-start lg:justify-between lg:gap-0">
          {winnerBenefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`text-center lg:flex-1 lg:px-4 lg:text-center ${
                index > 0 ? "lg:border-l lg:border-neutral-200" : ""
              }`}
            >
              <div
                className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${benefit.iconBg}`}
              >
                <benefit.icon className="h-7 w-7" strokeWidth={1.75} />
              </div>
              <h4 className="mt-3 text-sm font-bold leading-snug tracking-tight text-neutral-950">
                {benefit.title}
              </h4>
              <div className={`mx-auto mt-2 h-0.5 w-8 rounded-full ${benefit.underline}`} />
            </div>
          ))}
        </div>
      </motion.div>
    </SectionShell>
  );
}