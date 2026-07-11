"use client";

import { Allura, Poppins } from "next/font/google";
import { ArrowRight } from "lucide-react";

// If you already load these globally (e.g. in layout.tsx), remove these
// and reuse those fonts' classNames instead.
const allura = Allura({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function PartnerWithUs() {
  return (
    <section className={`${poppins.className} bg-[#FAFAF7] px-3 py-10 md:px-8`}>
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_24px_50px_-28px_rgba(20,30,50,0.18)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 200% at 0% 0%, #eaf9f2 0%, transparent 55%), radial-gradient(120% 200% at 100% 100%, #eef0ff 0%, transparent 55%)",
          }}
        />

        <div className="relative flex flex-col items-start justify-between gap-8 px-8 py-9 md:flex-row md:items-center md:gap-8 md:px-12">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-neutral-900 md:text-[26px]">
              <span
                className={`${allura.className} font-bold text-sky-600 text-[1.9em]`}
                style={{ WebkitTextStroke: "0.4px currentColor" }}
              >
                Partner{" "}
              </span>{" "}
              With Us
            </h3>
            <p className="mt-2 max-w-xl text-sm font-normal leading-relaxed text-neutral-500">
              Join the Global SDG-AI Hackathon as a sponsor or industry
              partner and support the next generation of AI innovators while
              gaining brand visibility, access to exceptional talent, and
              meaningful collaboration opportunities.
            </p>
          </div>

          <a
            href="/partner"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-neutral-950 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800"
          >
            Become a Sponsor
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}