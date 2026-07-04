"use client";

import Image from "next/image";
import Link from "next/link";
import { Allura } from "next/font/google";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

import { SectionShell } from "./shared";

const allura = Allura({ subsets: ["latin"], weight: "400" });

const gradientStyle = {
  background: "linear-gradient(to right, #0284c7, #7c3aed, #059669)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
} as const;

const features = [
  {
    label: "Purpose\nDriven",
    color: "#0284c7",
    bg: "bg-cyan-50",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8.5" stroke="#0284c7" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4.5" stroke="#0284c7" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="1.4" fill="#0284c7" />
      </svg>
    ),
  },
  {
    label: "Human\nCentered",
    color: "#7c3aed",
    bg: "bg-violet-50",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="8.5" r="3" stroke="#7c3aed" strokeWidth="1.6" />
        <path d="M3.5 19c0-3 2.5-5.2 5.5-5.2s5.5 2.2 5.5 5.2" stroke="#7c3aed" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="17" cy="9.5" r="2.3" stroke="#7c3aed" strokeWidth="1.6" />
        <path d="M14.8 19c.3-2.4 2-4.1 4.2-4.1 1.6 0 2.9.8 3.6 2" stroke="#7c3aed" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Sustainable\nImpact",
    color: "#059669",
    bg: "bg-emerald-50",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 19c-2-4.5.5-11 10.5-13 1.4 6.6-1.5 11-6.5 12.5"
          stroke="#059669"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M6.5 18.5c2-3 4-4.7 8-7" stroke="#059669" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Future\nReady",
    color: "#d97706",
    bg: "bg-amber-50",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2.5c2.6 2 4 5.4 4 8.8 0 2-1 4.2-2.4 5.7l-1.6 1.7-1.6-1.7C9 15.5 8 13.3 8 11.3c0-3.4 1.4-6.8 4-8.8Z"
          stroke="#d97706"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="10.5" r="1.6" stroke="#d97706" strokeWidth="1.4" />
        <path d="M8.5 16.5 6 21l3.2-1.4M15.5 16.5 18 21l-3.2-1.4" stroke="#d97706" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function WhyHackathonSection() {
  return (
    <SectionShell id="why" className="flex min-h-screen items-center overflow-hidden bg-[#fbfbfa] py-10 lg:py-12">
      <div className="grid w-full gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="inline-flex w-fit items-center rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700">
            Why This Hackathon
          </div>

          <h2 className="mt-3 text-4xl font-black leading-[1.05] tracking-tighter text-neutral-950 sm:text-5xl">
            AI Beyond the Buzz.
            <br />
            <span className={allura.className} style={{ ...gradientStyle, fontSize: "1.35em", lineHeight: 1.05 }}>
              Building Solutions That Matter.
            </span>
          </h2>

          <div className="mt-3 h-1.5 w-20 rounded-full" style={gradientStyle} />

          <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-neutral-600 sm:text-lg">
            Artificial intelligence is transforming every sector, but real impact begins
            with purpose. This hackathon empowers you to move beyond demos and build
            AI-driven solutions that solve meaningful problems aligned with the United
            Nations Sustainable Development Goals.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-2.5">
            {features.map((feature) => (
              <div key={feature.label} className="flex flex-col items-start gap-1.5">
                <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feature.bg}`}>
                  {feature.icon}
                </span>
                <p className="whitespace-pre-line text-sm font-semibold leading-tight text-neutral-800">
                  {feature.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-6">
            <Button asChild size="lg" className="rounded-full bg-neutral-950 px-6 text-white hover:bg-neutral-800">
              <Link href="#tracks">
                Learn More <span aria-hidden>→</span>
              </Link>
            </Button>
            <Link
              href="#tracks"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700 transition-colors hover:text-cyan-800"
            >
              Explore Tracks <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div className="relative">
          <motion.div
            aria-hidden
            className="absolute -left-10 top-6 h-40 w-40 rounded-full bg-cyan-100/60 blur-3xl"
            animate={{ x: [0, 18, 0], y: [0, -8, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-6 -right-6 h-52 w-52 rounded-full bg-emerald-100/60 blur-3xl"
            animate={{ x: [0, -20, 0], y: [0, 10, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative overflow-hidden rounded-4xl border border-neutral-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <Image
              src="/why.png"
              alt="AI Beyond the Buzz — building solutions that matter"
              width={900}
              height={1000}
              className="h-full w-full object-cover"
              priority={false}
            />
          </div>
        </div>
      </div>
    </SectionShell>
  );
}