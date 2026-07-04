"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { SectionIntro, SectionShell } from "./shared";

export default function FinalCtaSection() {
  return (
    <SectionShell id="cta" className="bg-neutral-50">
      <div className="rounded-4xl border border-neutral-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.94))] px-6 py-14 shadow-[0_18px_60px_rgba(15,23,42,0.05)] sm:px-10 sm:py-16 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <SectionIntro eyebrow="Final CTA" title="Ready to Build Something Meaningful?" subtitle="Register now and turn a good idea into a prototype with real momentum." centered />

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-6"><Link href="#organizers">Register Now</Link></Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-6"><Link href="/brochure">Download Brochure</Link></Button>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}