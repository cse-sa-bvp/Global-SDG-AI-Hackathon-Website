"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sora } from "next/font/google";

import { getTimeLeft } from "./shared";

const sora = Sora({ subsets: ["latin"], weight: ["600", "700", "800"] });

// Palette mirrors the hero: forest green (SDG) flowing into teal/blue (AI)
const UNITS = [
  { label: "Days", key: "days" as const, gradient: "from-emerald-800 to-green-600" },
  { label: "Hours", key: "hours" as const, gradient: "from-green-600 to-teal-500" },
  { label: "Minutes", key: "minutes" as const, gradient: "from-teal-500 to-cyan-500" },
  { label: "Seconds", key: "seconds" as const, gradient: "from-cyan-500 to-blue-600" },
];

// ---- Phase boundaries (IST = +05:30) ----
const REGISTRATION_OPEN_DATE = new Date("2026-07-15T00:00:00+05:30").getTime();
const REGISTRATION_CLOSE_DATE = new Date("2026-08-25T23:59:59+05:30").getTime();

type Phase = "before-open" | "open" | "closed";

function getPhase(now: number): Phase {
  if (now < REGISTRATION_OPEN_DATE) return "before-open";
  if (now <= REGISTRATION_CLOSE_DATE) return "open";
  return "closed";
}

function FlipNumber({ value, gradient }: { value: string; gradient: string }) {
  return (
    <div className="relative h-[1em] overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={value}
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`bg-gradient-to-b ${gradient} bg-clip-text text-transparent`}
        >
          {value}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function AmbientGlow() {
  return (
    <>
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-emerald-200/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-cyan-200/20 blur-3xl" />
    </>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto flex max-w-7xl justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-white/60 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em]"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
        <span className="bg-gradient-to-r from-emerald-700 via-teal-500 to-blue-500 bg-clip-text text-transparent">
          {children}
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
      </motion.div>
    </div>
  );
}

function Heading({ line1, highlighted, line2 }: { line1: string; highlighted: string; line2?: string }) {
  return (
    <div className={`relative mx-auto mt-6 max-w-3xl px-4 sm:px-6 text-center lg:px-8 ${sora.className}`}>
      <h2 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl lg:text-4xl">
        {line1}{" "}
        <br />
        <span className="bg-gradient-to-r from-emerald-600 to-blue-500 bg-clip-text text-transparent">
          {highlighted}
        </span>
        {line2 ? <>. {line2}</> : null}
      </h2>
    </div>
  );
}

function CountdownRow({ timeLeft }: { timeLeft: ReturnType<typeof getTimeLeft> }) {
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="relative mx-auto mt-8 grid max-w-4xl grid-cols-4 gap-1.5 px-3 sm:mt-10 sm:flex sm:items-center sm:justify-center sm:gap-8 sm:px-6 lg:px-8">
      {UNITS.map((unit, i) => (
        <React.Fragment key={unit.key}>
          {i > 0 && (
            <span className="relative hidden h-14 w-px bg-emerald-100 sm:block">
              <span
                className={`absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r ${unit.gradient}`}
              />
            </span>
          )}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className={`min-w-0 rounded-xl border border-emerald-100/80 bg-white/70 px-1.5 py-3 text-center shadow-sm shadow-emerald-900/5 sm:rounded-2xl sm:px-6 sm:py-5 ${sora.className}`}
          >
            <div className="text-2xl font-extrabold leading-none tracking-tight tabular-nums sm:text-6xl lg:text-7xl">
              <FlipNumber value={pad(timeLeft[unit.key])} gradient={unit.gradient} />
            </div>
            <div className={`mx-auto mt-1.5 h-0.5 w-4 rounded-full bg-gradient-to-r ${unit.gradient} sm:mt-3 sm:h-1 sm:w-8`} />
            <div className="mt-1.5 truncate text-[8px] font-semibold uppercase tracking-[0.1em] text-neutral-400 sm:mt-3 sm:text-xs sm:tracking-[0.3em]">
              {unit.label}
            </div>
          </motion.div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default function CountdownSection() {
  // Re-evaluated every tick so the section auto-switches phases with no reload.
  const [now, setNow] = React.useState(() => Date.now());

  React.useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const phase = getPhase(now);

  const targetDate = phase === "before-open" ? REGISTRATION_OPEN_DATE : REGISTRATION_CLOSE_DATE;
  const timeLeft = React.useMemo(() => getTimeLeft(targetDate), [targetDate, now]);

  return (
    <section
      id="countdown"
      className="relative overflow-hidden border-y border-emerald-100 bg-[#F6FAF8] py-16 sm:py-20"
    >
      <AmbientGlow />

      {phase === "before-open" && (
        <>
          <Badge>REGISTRATIONS OPEN IN</Badge>
          <Heading line1="The wait is almost over" highlighted="Registrations open on 15 July 2026." />
          
          <p className="relative mx-auto mt-3 max-w-3xl px-4 sm:px-6 text-center text-sm text-neutral-500 sm:text-base lg:px-8">
            {" "}
            <span className="font-semibold text-gray-600 max-w-full">
              Bring your ideas, assemble your team, and prepare to solve real-world challenges through AI.
            </span>
          </p>
          <CountdownRow timeLeft={timeLeft} />
        </>
      )}

      {phase === "open" && (
        <>
          <Badge>REGISTRATIONS CLOSE IN</Badge>
          <Heading line1="The clock is ticking." highlighted="Build. Innovate. Make an Impact." />
          <p className="relative mx-auto mt-3 max-w-3xl px-4 sm:px-6 text-center text-sm text-gray-500 sm:text-base lg:px-8">
            Secure your spot before registrations close. Build.
            
          </p>
          <CountdownRow timeLeft={timeLeft} />
        </>
      )}

      {phase === "closed" && (
        <>
          <Badge>REGISTRATIONS CLOSED</Badge>
          <div className={`relative mx-auto mt-6 max-w-3xl px-4 sm:px-6 text-center lg:px-8 ${sora.className}`}>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl lg:text-4xl">
              Registrations Have Closed.
            </h2>
          </div>
          <p className="relative mx-auto mt-3 max-w-3xl px-4 sm:px-6 text-center text-sm text-neutral-500 sm:text-base lg:px-8">
            Thank you for the overwhelming response. Teams are now undergoing{" "}
            <span className="font-semibold text-teal-600">evaluation and shortlisting.</span>
          </p>

          <div className="relative mx-auto mt-8 flex max-w-3xl items-center justify-center gap-4 px-4 sm:px-6 lg:px-8">
            <a
              href="#timeline"
              className={`rounded-full bg-gradient-to-r from-emerald-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-emerald-900/10 transition hover:opacity-90 ${sora.className}`}
            >
              View Timeline
            </a>
            <a
              href="#about"
              className={`rounded-full border border-emerald-200 bg-white/70 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-white ${sora.className}`}
            >
              Learn More
            </a>
          </div>
        </>
      )}
    </section>
  );
}