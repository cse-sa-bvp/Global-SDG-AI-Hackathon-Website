"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Users,
  Landmark,
  Globe2,
  Sprout,
  CalendarDays,
  Award,
  Rocket,
  Handshake,
  FlaskConical,
  GraduationCap,
  Lightbulb,
} from "lucide-react";

import { SectionShell } from "./shared";

type Feature = {
  icon: React.ElementType;
  label: string;
};

const organizedByFeatures: Feature[] = [
  { icon: ShieldCheck, label: "NAAC A++ Accredited" },
  { icon: Users, label: "Multidisciplinary Ecosystem" },
  { icon: Landmark, label: "Category-I University Status" },
  { icon: Globe2, label: "International Collaborations" },
  { icon: Sprout, label: "Global Research & Innovation" },
];

const hostedByFeatures: Feature[] = [
  { icon: CalendarDays, label: "Established in 1983" },
  { icon: Rocket, label: "Startup & Innovation Ecosystem" },
  { icon: Award, label: "NBA Accredited Programs" },
  { icon: Handshake, label: "Strong Industry Collaborations" },
  { icon: FlaskConical, label: "State-of-the-Art Research Facilities" },
];

const stats: {
  icon: React.ElementType;
  value: string;
  label: string;
  tone: "emerald" | "blue";
}[] = [
  { icon: Globe2, value: "15+", label: "Countries Participating", tone: "emerald" },
  { icon: Users, value: "500+", label: "Participants Expected", tone: "blue" },
  { icon: Users, value: "100+", label: "Teams Competing", tone: "emerald" },
  { icon: GraduationCap, value: "50+", label: "Universities Involved", tone: "blue" },
  { icon: Lightbulb, value: "8", label: "High-Impact SDG Themes", tone: "emerald" },
];

function FeatureItem({ icon: Icon, label, tone }: Feature & { tone: "emerald" | "blue" }) {
  const boxClasses =
    tone === "emerald"
      ? "border-emerald-100 bg-emerald-50/40"
      : "border-blue-100 bg-blue-50/40";
  const iconClasses = tone === "emerald" ? "text-emerald-600" : "text-blue-600";

  return (
    <div className={`flex items-center gap-3 rounded-4xl border px-3 py-2.5 ${boxClasses}`}>
      <Icon className={`h-4 w-4 shrink-0 ${iconClasses}`} strokeWidth={1.8} />
      <span className="text-xs font-semibold leading-snug text-neutral-700">{label}</span>
    </div>
  );
}

export default function AboutBvSection() {
  return (
    <SectionShell id="about" className="bg-white">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto inline-flex w-fit items-center rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">
          The Institutions Behind
        </div>

        <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-neutral-950 sm:text-4xl">
          Backed by legacy of
          <br />
          {" "}
          <span
            style={{
              background: "linear-gradient(to right, #059669, #0d9488)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Excellence  
          </span>{" "}
          and  {" "}
          <span
            style={{
              background: "linear-gradient(to right, #0284c7, #2563eb)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Innovation
          </span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-neutral-500 sm:text-base">
          Built upon decades of academic excellence, research, innovation, and
          industry collaboration.
        </p>
      </div>

      {/* Organized By / Hosted By cards */}
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* Organized By */}
        <motion.div
          className="rounded-2xl border border-neutral-100 bg-[#FCFCFA] p-6 shadow-[0_2px_24px_rgba(15,23,42,0.05)]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <span className="inline-flex w-fit items-center rounded-full bg-emerald-50 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700">
            Organized By
          </span>

          <div className="mt-4 flex items-center gap-5">
            <Image
              src="/bvduu.png"
              alt="Bharati Vidyapeeth logo"
              width={320}
              height={320}
              className="h-38 w-38 shrink-0 object-contain sm:h-46 sm:w-46"
            />
            <div>
              <h3 className="text-base font-bold leading-snug tracking-tight text-neutral-950 sm:text-lg">
                Bharati Vidyapeeth
                <br />
                <span className="text-neutral-500 font-semibold">
                  (Deemed to be University)
                </span>
              </h3>

              <p className="mt-3 text-[13px] leading-relaxed text-neutral-500">
                A globally recognized multidisciplinary university committed
                to excellence in education, research, innovation, and
                societal development, fostering future-ready leaders through
                knowledge and global collaboration.
              </p>
            </div>
          </div>

          <div className="mt-5 h-px w-full bg-neutral-100" />

          <div className="mt-5 grid grid-cols-2 gap-2.5">
            {organizedByFeatures.map((feature) => (
              <FeatureItem key={feature.label} {...feature} tone="emerald" />
            ))}
          </div>

          <div className="mt-5 border-t border-neutral-100 pt-4">
            <Link
              href="https://www.bharatividyapeeth.edu/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Learn more about the University
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* Hosted By */}
        <motion.div
          className="rounded-2xl border border-neutral-100 bg-[#FCFCFA] p-6 shadow-[0_2px_24px_rgba(15,23,42,0.05)]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
        >
          <span className="inline-flex w-fit items-center rounded-full bg-blue-50 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-700">
            Hosted By
          </span>

          <div className="mt-4 flex items-center gap-8">
            <Image
              src="/bvducoep.jpeg"
              alt="BVCOEP logo"
              width={160}
              height={100}
              className="h-16 w-auto max-w-[140px] shrink-0 rounded-md object-contain sm:h-20 sm:max-w-[160px]"
            />
            <div>
              <h3 className="text-base font-bold leading-snug tracking-tight text-neutral-950 sm:text-lg">
                Department of
                <br />
                Computer Science &amp; Engineering
              </h3>

              <p className="mt-2 text-[13px] font-semibold text-neutral-700">
                Bharati Vidyapeeth College of Engineering, Pune
              </p>

              <p className="mt-3 text-[13px] leading-relaxed text-neutral-500">
                A research-driven department dedicated to advancing
                Artificial Intelligence through innovation, industry
                collaboration, entrepreneurship, and cutting-edge research.
              </p>
            </div>
          </div>

          <div className="mt-5 h-px w-full bg-neutral-100" />

          <div className="mt-5 grid grid-cols-2 gap-2.5">
            {hostedByFeatures.map((feature) => (
              <FeatureItem key={feature.label} {...feature} tone="blue" />
            ))}
          </div>

          <div className="mt-5 border-t border-neutral-100 pt-4">
            <Link
              href="#"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              Learn more about the Department
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        className="mt-6 rounded-2xl border border-neutral-100 bg-[#FCFCFA] px-6 py-6 shadow-[0_2px_24px_rgba(15,23,42,0.05)] sm:px-8"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
      >
        <div className="flex flex-wrap justify-between gap-y-6">
          {stats.map((stat) => {
            const iconBg =
              stat.tone === "emerald"
                ? "bg-emerald-50 text-emerald-600"
                : "bg-blue-50 text-blue-600";
            const valueColor =
              stat.tone === "emerald" ? "text-emerald-700" : "text-blue-700";

            return (
              <div key={stat.label} className="flex flex-1 basis-1/2 items-center gap-3 sm:basis-0">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${iconBg}`}>
                  <stat.icon className="h-[28px] w-[28px]" />
                </span>
                <div>
                  <p className={`text-2xl font-extrabold leading-none ${valueColor}`}>
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[11px] font-medium leading-snug text-neutral-500">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </SectionShell>
  );
}