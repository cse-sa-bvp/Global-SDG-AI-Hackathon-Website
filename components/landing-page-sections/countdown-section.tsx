"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { SectionIntro, getTimeLeft } from "./shared";

export default function CountdownSection() {
  const targetDate = React.useMemo(() => new Date("2026-08-31T23:59:59+05:30").getTime(), []);
  const [timeLeft, setTimeLeft] = React.useState(() => getTimeLeft(targetDate));

  React.useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => window.clearInterval(timer);
  }, [targetDate]);

  return (
    <section id="countdown" className="relative overflow-hidden border-y border-neutral-200 bg-white py-24 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.12),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.12),transparent_24%),radial-gradient(circle_at_50%_90%,rgba(15,23,42,0.04),transparent_32%)]" />
      <motion.div className="absolute left-10 top-8 h-40 w-40 rounded-full bg-sky-100/60 blur-3xl" animate={{ x: [0, 20, 0], y: [0, -10, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-emerald-100/60 blur-3xl" animate={{ x: [0, -18, 0], y: [0, 14, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionIntro eyebrow="Countdown" title="Until Registrations Close" subtitle="A clean timer, nothing more." centered />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[{ label: "Days", value: timeLeft.days }, { label: "Hours", value: timeLeft.hours }, { label: "Minutes", value: timeLeft.minutes }, { label: "Seconds", value: timeLeft.seconds }].map((item) => (
            <motion.div key={item.label} className="rounded-4xl border border-neutral-200 bg-white/90 p-6 text-center shadow-[0_12px_50px_rgba(15,23,42,0.05)] backdrop-blur-sm" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.45 }}>
              <div className="text-5xl font-semibold tracking-tight text-neutral-950 sm:text-6xl">{item.value}</div>
              <div className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}