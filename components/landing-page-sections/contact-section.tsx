"use client";

import Link from "next/link";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";

import { ContactCard, SectionIntro, SectionShell } from "./shared";

export default function ContactSection() {
  return (
    <SectionShell id="contact" className="bg-white">
      <SectionIntro eyebrow="Contact" title="" subtitle="" centered={false} compact />

      <h2 className="mt-3 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">Simple contact details, laid out cleanly.</h2>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <div className="rounded-4xl border border-neutral-200 bg-[#fbfbfa] p-6">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">Faculty Coordinators</div>
          <p className="mt-4 text-sm leading-6 text-neutral-600">To be announced.</p>

          <div className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">Student Coordinators</div>
          <p className="mt-4 text-sm leading-6 text-neutral-600">To be announced.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <ContactCard icon={Mail} label="Email" value="hello@globalsdgaihackathon.com" href="mailto:hello@globalsdgaihackathon.com" />
          <ContactCard icon={Phone} label="Phone" value="+91 90000 00000" href="tel:+919000000000" />
          <ContactCard icon={MapPin} label="Location" value="BVCOEP, Pune, Maharashtra" href="https://www.google.com/maps/search/?api=1&query=BVCOEP+Pune" />
          <div className="rounded-3xl border border-neutral-200 bg-[#fbfbfa] p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">Google Maps</div>
            <p className="mt-4 text-sm leading-6 text-neutral-600">Open the venue location directly in Maps.</p>
            <Button asChild size="sm" variant="outline" className="mt-5 rounded-full px-4">
              <Link href="https://www.google.com/maps/search/?api=1&query=BVCOEP+Pune" target="_blank" rel="noreferrer">Open Maps</Link>
            </Button>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}