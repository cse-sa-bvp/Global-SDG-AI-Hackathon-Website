"use client";

import Image from "next/image";
import { Allura } from "next/font/google";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { SectionShell, supportingLogos } from "./shared";

const allura = Allura({ subsets: ["latin"], weight: "400" });

const credentials = [
  { label: "NAAC A++ Accredited" },
  { label: "Category-I University Status" },
  { label: "NBA Accredited Programs" },
];

// "Acme Inc." is a shared placeholder logo — exclude it from this trail.
const collaborationLogos = supportingLogos.filter(
  (logo) => !logo.label?.toLowerCase().includes("acme")
);

function Check() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M2 6.2 4.8 9 10 3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function OrganizedBySection() {
  return (
    <SectionShell id="organizers" className="relative overflow-hidden border-t border-neutral-200/70 bg-white">
      {/* Decorative background wash, consistent with hero */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_10%,rgba(34,211,238,0.10),transparent_28%),radial-gradient(circle_at_85%_15%,rgba(124,58,237,0.08),transparent_26%),radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.08),transparent_28%)]" />

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex w-fit items-center rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700">
          The Institutions Behind It
        </div>
        <h2 className="mt-5 whitespace-normal text-3xl font-black tracking-tighter text-neutral-950 sm:whitespace-nowrap sm:text-4xl lg:text-[2.75rem]">
          Backed by a legacy of{" "}
          <span
            className={allura.className}
            style={{
              background: "linear-gradient(to right, #0284c7, #7c3aed, #059669)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontSize: "1.9em",
              lineHeight: 1,
            }}
          >
            excellence &amp; innovation.
          </span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-neutral-600">
          A NAAC A++ accredited university and its Department of Computer Science &amp;
          Engineering come together to run a hackathon built for real-world SDG impact.
        </p>
      </div>

      {/* ── Organized By / Hosted By ──────────────────────────────── */}
      <div className="relative mx-auto mt-16 grid max-w-6xl gap-16 sm:grid-cols-2 sm:gap-12">
        {/* Center divider, desktop only */}
        <div className="pointer-events-none absolute inset-y-4 left-1/2 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-neutral-200 to-transparent sm:block" />

        {/* Organized By */}
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.14),transparent_70%)]" />
            <Image
              src="/BVDUblack-logo.png"
              alt="Bharati Vidyapeeth logo"
              width={260}
              height={260}
              className="h-36 w-auto object-contain sm:h-40"
            />
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700">
            Organized By
          </p>
          <p className="mt-4 max-w-md text-sm leading-6 text-neutral-600">
            A multidisciplinary institution with a legacy spanning decades — nurturing
            talent across disciplines and fostering global research engagement.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
            {credentials.slice(0, 2).map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-700"
              >
                <Check />
                {c.label}
              </span>
            ))}
          </div>
        </div>

        {/* Hosted By */}
        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
          <div className="relative">
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.14),transparent_70%)]" />
            <Image
              src="/bvducoep.jpeg"
              alt="BVCOEP logo"
              width={260}
              height={260}
              className="h-36 w-auto rounded-2xl object-contain sm:h-40"
            />
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">
            Hosted By
          </p>
          <h3 className="mt-2 text-xl font-bold text-neutral-950">
            Dept. of Computer Science &amp; Engineering, BVCOE Pune
          </h3>
          <p className="mt-4 max-w-md text-sm leading-6 text-neutral-600">
            Established in 1983, BVCOE brings state-of-the-art research facilities and a
            vibrant startup ecosystem to the hackathon's technical backbone.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-700">
              <Check />
              {credentials[2].label}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-700">
              <Check />
              Est. 1983
            </span>
          </div>
        </div>
      </div>

      {/* ── Supported By ticker ─────────────────────────────────────── */}
      <div className="mt-20">
        <div className="mx-auto flex max-w-6xl items-center gap-4">
          <span className="h-px flex-1 bg-neutral-200" />
          <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">
            In Collaboration With
          </p>
          <span className="h-px flex-1 bg-neutral-200" />
        </div>

        <div className="relative mx-auto mt-8 w-full max-w-6xl">
          <InfiniteSlider speedOnHover={20} speed={40} gap={140}>
            {collaborationLogos.map((logo) => (
              <div key={logo.label} className="flex items-center">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={200}
                  height={80}
                  className="h-16 w-auto object-contain sm:h-20"
                />
              </div>
            ))}
          </InfiniteSlider>

          <div className="bg-gradient-to-r from-white absolute inset-y-0 left-0 w-24" />
          <div className="bg-gradient-to-l from-white absolute inset-y-0 right-0 w-24" />
          <ProgressiveBlur
            className="pointer-events-none absolute left-0 top-0 h-full w-24"
            direction="left"
            blurIntensity={1}
          />
          <ProgressiveBlur
            className="pointer-events-none absolute right-0 top-0 h-full w-24"
            direction="right"
            blurIntensity={1}
          />
        </div>
      </div>
    </SectionShell>
  );
}