"use client";

import Link from "next/link";
import { Allura } from "next/font/google";
import { ArrowRight, ExternalLink, HelpCircle, Mail, MapPin, Phone, Send, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

import { SectionShell } from "./shared";

const allura = Allura({ subsets: ["latin"], weight: "400" });

const VENUE_LAT = 18.45835470907182;
const VENUE_LNG = 73.85547360920289;

const coordinators = [
  {
    name: "Dr. Manisha Kasar",
    role: "Coordinator",
    dept: "Associate Professor, Dept of CSE",
    phone: "75883 14185",
    gradient: "from-blue-500 to-teal-400",
  },
  {
    name: "Prof. Trupti Suryawanshi",
    role: "Co-Coordinator",
    dept: "Assistant Professor, Dept of CSE",
    phone: "98903 95400",
    gradient: "from-violet-500 to-blue-500",
  },
];

const contactItems = [
  {
    icon: Mail,
    label: "EMAIL",
    gradient: "from-blue-500 to-teal-400",
    value: "hello@globalsdgaihackathon.com",
    sub: "We respond within 24-48 hours.",
  },
  {
    icon: Phone,
    label: "PHONE",
    gradient: "from-teal-500 to-emerald-400",
    value: "+91 90000 00000",
    sub: "Mon - Fri, 10:00 AM - 5:00 PM",
  },
  {
    icon: HelpCircle,
    label: "GENERAL QUERIES",
    gradient: "from-violet-500 to-fuchsia-400",
    value: null,
    sub: "For registration, teams, partnerships or any query.",
    link: true,
  },
];

export default function ContactSection() {
  return (
    <SectionShell id="contact" className="relative overflow-hidden bg-[#FAFAF7]">
      {/* ambient gradient glows, matching hero/CTA treatment */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-gradient-to-br from-blue-200/40 to-teal-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-gradient-to-tr from-violet-200/40 to-blue-200/30 blur-3xl" />

      <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-10">
        {/* Left column */}
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-50 to-teal-50 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-blue-700 ring-1 ring-inset ring-blue-100">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-500 to-teal-400" />
            CONTACT &amp; VENUE
          </span>

          <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-neutral-950 sm:text-4xl">
            We&apos;re here to{" "}
            <span
              className={`${allura.className} bg-gradient-to-r from-blue-600 via-teal-500 to-violet-600 bg-clip-text text-4xl text-transparent sm:text-5xl`}
            >
              help
            </span>{" "}
            you.
          </h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-neutral-500">
            Have a question or need assistance? Reach out to our team or find us at the venue.
          </p>

          {/* Faculty coordinators */}
          <div className="mt-7 flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 shadow-sm shadow-blue-200">
              <Users className="h-4 w-4 text-white" />
            </span>
            <span className="text-xs font-semibold tracking-[0.2em] text-neutral-700">FACULTY COORDINATORS</span>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {coordinators.map((c) => (
              <div
                key={c.name}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-[#FCFCFA] p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-xl hover:shadow-blue-100"
              >
                <div
                  className={`absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br ${c.gradient} opacity-[0.07] transition-opacity duration-300 group-hover:opacity-[0.14]`}
                />
                <span className={`relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${c.gradient} shadow-sm`}>
                  <Users className="h-4.5 w-4.5 text-white" />
                </span>
                <p className="relative mt-3 text-[15px] font-semibold leading-tight text-neutral-950">{c.name}</p>
                <p
                  className={`relative bg-gradient-to-r ${c.gradient} bg-clip-text text-sm font-semibold text-transparent`}
                >
                  {c.role}
                </p>
                <p className="relative mt-1.5 text-xs leading-5 text-neutral-500">{c.dept}</p>
                <div className="relative mt-2.5 flex items-center gap-1.5 text-sm font-medium text-neutral-700">
                  <Phone className="h-3.5 w-3.5 text-neutral-400" />
                  {c.phone}
                </div>
              </div>
            ))}
          </div>

          <div className="my-6 h-px w-full bg-gradient-to-r from-blue-200 via-neutral-200 to-transparent" />

          {/* Email / Phone / General queries */}
          {/* <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {contactItems.map((item) => (
              <div key={item.label}>
                <div className="flex items-center gap-2">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} shadow-sm`}>
                    <item.icon className="h-4 w-4 text-white" />
                  </span>
                  <span className="text-[10.5px] font-semibold tracking-[0.15em] text-neutral-600">{item.label}</span>
                </div>
                {item.value && <p className="mt-2 text-sm font-medium text-neutral-950">{item.value}</p>}
                <p className={item.value ? "mt-0.5 text-xs text-neutral-500" : "mt-2 text-xs leading-5 text-neutral-500"}>
                  {item.sub}
                </p>
                {item.link && (
                  <Link
                    href="#support"
                    className="mt-0.5 inline-flex items-center gap-1 bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-sm font-semibold text-transparent"
                  >
                    Contact Support <ArrowRight className="h-3.5 w-3.5 text-violet-600" />
                  </Link>
                )}
              </div>
            ))}
          </div> */}
        </div>

        {/* Right column: map + venue */}
        <div className="relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-[#FCFCFA]] p-[2px] shadow-sm">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-200 via-teal-100 to-violet-200 opacity-60" />

          <div className="relative flex flex-1 flex-col overflow-hidden rounded-[22px] bg-[#FCFCFA]">
            <div className="relative h-56 w-full shrink-0 bg-neutral-100 sm:h-64 lg:h-[calc(100%-108px)]">
              <iframe
                title="Bharati Vidyapeeth College of Engineering, Pune - map location"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${VENUE_LAT},${VENUE_LNG}&z=16&output=embed`}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/80 to-transparent" />
            </div>

            <div className="border-t border-neutral-100 p-5">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 shadow-sm">
                  <MapPin className="h-3.5 w-3.5 text-white" />
                </span>
                <span className="text-[10.5px] font-semibold tracking-[0.2em] text-neutral-600">VENUE</span>
              </div>

              <p className="mt-2 text-base font-semibold leading-tight text-neutral-950">
                Bharati Vidyapeeth College of Engineering (BVCOEP)
              </p>
              <p className="mt-1 text-xs text-neutral-500">Pune - Satara Road, Dhankawadi, Pune, Maharashtra 411043</p>

              <Button
                asChild
                size="sm"
                className="mt-3 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 px-4 text-white shadow-sm shadow-blue-200 transition-transform hover:-translate-y-0.5 hover:from-blue-700 hover:to-teal-600"
              >
                <Link
                  href={`https://www.google.com/maps/search/?api=1&query=${VENUE_LAT},${VENUE_LNG}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in Google Maps <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA banner */}
      <div className="relative mt-6 flex flex-col items-start justify-between gap-4 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-50 via-teal-50 to-violet-50 p-5 sm:flex-row sm:items-center">
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-teal-200/50 to-blue-200/40 blur-2xl" />

        <div className="relative flex items-center gap-3.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-teal-400 shadow-sm shadow-blue-200">
            <Send className="h-4 w-4 text-white" />
          </span>
          <div>
            <p className="text-sm font-semibold text-neutral-950">Still have a question?</p>
            <p className="text-xs text-neutral-500">We&apos;re just an email away. Drop us a message and we&apos;ll get back to you!</p>
          </div>
        </div>

        <Button
          asChild
          size="default"
          className="relative rounded-full bg-neutral-950 px-5 text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-neutral-800"
        >
          <Link href="mailto:hello@globalsdgaihackathon.com">
            Send us an Email <ArrowRight className="ml-1.5 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </SectionShell>
  );
}