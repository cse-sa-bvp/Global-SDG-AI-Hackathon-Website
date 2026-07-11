"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionShell } from "./shared";

export default function FinalCtaSection() {
  return (
    <SectionShell id="cta" className="bg-[#FAFAF7]">
      <div className="relative mx-auto max-w-4xl bg-[#FAFAF7]">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-6 -inset-y-8 -z-10 rounded-[3rem] bg-[radial-gradient(60%_60%_at_50%_30%,rgba(74,222,128,0.35),transparent_70%)] blur-2xl"
        />

        <div className="relative overflow-hidden rounded-4xl border border-emerald-100/70 shadow-[0_30px_80px_-20px_rgba(21,128,61,0.4),0_10px_30px_rgba(15,23,42,0.1),inset_0_1px_0_rgba(255,255,255,0.5)]">
          <Image
            src="/cta.png"
            alt=""
            fill
            aria-hidden
            className="object-cover brightness-125 contrast-105 saturate-110"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25"
          />

          <div className="relative px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
            <div className="relative mx-auto max-w-3xl text-center">
              
              <h2 className="mt-5 text-3xl font-bold leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] sm:text-4xl lg:text-5xl">
                Ready to Build Something Meaningful?
              </h2>

              <p className="mt-4 text-base text-white/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)] sm:text-lg">
                Register now and turn a good idea into a prototype with real momentum.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="group rounded-full bg-white px-6 text-neutral-900 shadow-[0_8px_20px_rgba(0,0,0,0.25)] hover:bg-neutral-100"
                >
                  <Link href="#organizers" className="flex items-center gap-2">
                    Register Now
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="group rounded-full border-white/60 bg-white/10 px-6 text-white backdrop-blur-sm hover:bg-white/20 hover:text-gray-200"
                >
                  <Link href="/brochure" className="flex items-center gap-2">
                    <Download className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
                    Download Brochure
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}