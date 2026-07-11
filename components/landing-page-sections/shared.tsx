"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Allura } from "next/font/google";
import { ArrowRight, ExternalLink } from "lucide-react";
// Add Poppins to the existing Allura import line
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

import { cn } from "@/lib/utils";

// Script font used for the gradient "highlight" word in headlines
// (e.g. "Turn Ideas into Impact." — see SectionIntro's `highlight` prop).
const allura = Allura({ subsets: ["latin"], weight: "400" });

// Accent color system — one distinct hue per track so each icon
// stands out clearly against its card (matches the reference design).
type Accent = "sky" | "violet" | "emerald" | "lime" | "indigo" | "cyan" | "amber" | "fuchsia";

const ACCENT_STYLES: Record<Accent, { badge: string; icon: string; glow: string }> = {
  sky: { badge: "bg-sky-50 ring-sky-100", icon: "text-sky-600", glow: "rgba(14,165,233,0.18)" },
  violet: { badge: "bg-violet-50 ring-violet-100", icon: "text-violet-600", glow: "rgba(139,92,246,0.18)" },
  emerald: { badge: "bg-emerald-50 ring-emerald-100", icon: "text-emerald-600", glow: "rgba(16,185,129,0.18)" },
  lime: { badge: "bg-lime-50 ring-lime-100", icon: "text-lime-600", glow: "rgba(101,163,13,0.18)" },
  indigo: { badge: "bg-indigo-50 ring-indigo-100", icon: "text-indigo-600", glow: "rgba(99,102,241,0.18)" },
  cyan: { badge: "bg-cyan-50 ring-cyan-100", icon: "text-cyan-600", glow: "rgba(6,182,212,0.18)" },
  amber: { badge: "bg-amber-50 ring-amber-100", icon: "text-amber-600", glow: "rgba(245,158,11,0.18)" },
  fuchsia: { badge: "bg-fuchsia-50 ring-fuchsia-100", icon: "text-fuchsia-600", glow: "rgba(217,70,239,0.18)" },
};

export const tracks = [
  {
    title: "Healthcare",
    description: "Build AI that improves healthcare delivery and patient outcomes.",
    challenge: "Diagnosis • Accessibility • Clinical workflows",
    href: "/tracks",
    image: "/healthcare.jpg",
    icon: HeartPulseIcon,
    accent: "sky" as Accent,
  },
  {
    title: "Education",
    description: "Create inclusive learning experiences powered by intelligent technology.",
    challenge: "Personalized learning • Accessibility • Assessment",
    href: "/tracks",
    image: "/education.jpeg",
    icon: GraduationCapIcon,
    accent: "violet" as Accent,
  },
  {
    title: "Climate Action",
    description: "Develop solutions that help communities understand and reduce climate impact.",
    challenge: "Carbon tracking • Forecasting • Sustainability",
    href: "/tracks",
    image: "/climate.jpg",
    icon: LeafIcon,
    accent: "emerald" as Accent,
  },
  {
    title: "Agriculture",
    description: "Empower farmers through smarter, data-driven agricultural solutions.",
    challenge: "Precision farming • Crop health • Resource efficiency",
    href: "/tracks",
    image: "/agriculture.jpg",
    icon: FactoryIcon,
    accent: "lime" as Accent,
  },
  {
    title: "Smart Cities",
    description: "Design intelligent systems for safer and more connected cities.",
    challenge: "Mobility • Infrastructure • Public services",
    href: "/tracks",
    image: "/smartcity.png",
    icon: Building2Icon,
    accent: "indigo" as Accent,
  },
  {
    title: "Clean Energy",
    description: "Accelerate the transition toward cleaner and more efficient energy.",
    challenge: "Renewables • Smart grids • Energy optimization",
    href: "/tracks",
    image: "/energy.webp",
    icon: SunMediumIcon,
    accent: "amber" as Accent,
  },
  {
  title: "Digital Inclusion",
  description: "Empower communities through accessible, inclusive, and equitable AI-driven technology.",
  challenge: "Accessibility • Digital Literacy • Inclusive Technology",
  href: "/tracks",
  image: "/dig.jpg",
  icon: ShieldCheckIcon,
  accent: "cyan" as Accent,
},
{
  title: "Responsible AI",
  description: "Build ethical, transparent, and trustworthy AI systems for a better future.",
  challenge: "AI Ethics • Fairness • Transparency",
  href: "/tracks",
  image: "/res.jpeg",
  icon: ShieldCheckIcon,
  accent: "violet" as Accent,
},
] as const;

export const journeySteps = [
  { number: "01", title: "Register", description: "Secure your place and get ready for the challenge.", icon: BadgeCheckIcon },
  { number: "02", title: "Idea Submission", description: "Submit a concise concept grounded in impact.", icon: PanelTopIcon },
  { number: "03", title: "Shortlisting", description: "Strong ideas move ahead with clear potential.", icon: SparklesIcon },
  { number: "04", title: "Mentorship", description: "Refine your approach with expert guidance.", icon: HandshakeIcon },
  { number: "05", title: "48-Hour Hackathon", description: "Build, test, and shape a real prototype.", icon: RocketIcon },
  { number: "06", title: "Final Pitch", description: "Present your solution with clarity and conviction.", icon: PresentationIcon },
  { number: "07", title: "Awards", description: "Celebrate the teams that made the strongest impact.", icon: TrophyIcon },
] as const;

export const benefits = [
  { title: "Recognition That Matters", description: "Showcase your ideas on a global stage.", icon: AwardIcon, span: "md:col-span-2" },
  { title: "Learn from Experts", description: "Learn directly from industry and academic mentors.", icon: UsersIcon, span: "md:col-span-2" },
  { title: "Build Real AI Solutions", description: "Turn innovative ideas into working AI solutions.", icon: BrainIcon, span: "md:col-span-2" },
  { title: "Solve Challenges That Matter", description: "Work on problem statements inspired by the United Nations Sustainable Development Goals.", icon: Globe2Icon, span: "md:col-span-3" },
  { title: "Connect Beyond Your Campus", description: "Connect with innovators, founders, developers, researchers, and changemakers from diverse backgrounds.", icon: HandshakeIcon, span: "md:col-span-3" },
  { title: "A Portfolio That Opens Doors", description: "Leave with more than just memories—gain a verified certificate, a standout AI project, valuable teamwork experience, and practical skills you can confidently showcase in internships, placements, hackathons, and startup journeys.", icon: BadgeCheckIcon, span: "md:col-span-6" },
] as const;

export const prizeCards = [
  { title: "Winner", description: "Top team recognition and the strongest event prize package." },
  { title: "Runner-up", description: "A strong finish with awards for technical and product quality." },
  { title: "Best SDG Solution", description: "Celebrating the idea with the clearest social impact." },
  { title: "Best AI Innovation", description: "Honoring the most creative use of AI in the room." },
  { title: "Participation Certificates", description: "Every qualifying team leaves with recognition." },
] as const;

export const highlights = [
  { title: "40+ Years of Excellence", description: "A long-standing academic legacy with a modern builder mindset.", icon: CalendarDaysIcon },
  { title: "NBA Accredited Programs", description: "Strong academic structure backed by quality standards.", icon: ShieldCheckIcon },
  { title: "NAAC A++", description: "A high bar for learning, research, and institutional excellence.", icon: MedalIcon },
  { title: "Innovation Ecosystem", description: "A campus environment that supports ideas turning into outcomes.", icon: SparklesIcon },
] as const;

export const faqs = [
  { question: "Who can participate?", answer: "The hackathon is open to students and builders interested in AI, design, and SDG-focused problem solving." },
  { question: "Can I join as an individual?", answer: "Solo participation may be possible, but team-based collaboration is encouraged for stronger solutions." },
  { question: "How many members are allowed in a team?", answer: "Teams should stay within the event guidelines shared during registration and shortlisting." },
  { question: "Do I need prior hackathon experience?", answer: "No. A strong idea, curiosity, and willingness to learn matter more than experience." },
  { question: "What kind of projects fit the tracks?", answer: "Projects should solve a real challenge in one of the SDG-aligned themes with clear user value." },
  { question: "Will mentors be available?", answer: "Yes. Mentorship is built into the journey to help teams refine and improve quickly." },
  { question: "How will projects be judged?", answer: "Judging will focus on impact, originality, execution quality, and presentation clarity." },
  { question: "Will participants receive certificates?", answer: "Yes. Participation certificates are included for qualifying teams." },
] as const;

export const sponsorPlaceholders = Array.from({ length: 8 }, (_, index) => ({ id: index, label: "Coming Soon" }));

export const supportingLogos = [
  { src: "/IEEE-Logo.jpg", alt: "IEEE Logo", label: "IEEE" },
  { src: "/Association_for_Computing_Machinery_(ACM)_logo.svg.webp", alt: "ACM Logo", label: "ACM" },
  { src: "/CSI.jpeg", alt: "CSI Logo", label: "CSI" },
  { src: "/placeholder-logo.svg", alt: "IET Placeholder", label: "IET" },
] as const;

// SectionShell — add style prop to the motion.section
export function SectionShell({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      className={cn("scroll-mt-24 py-20 sm:py-24 lg:py-28", className)}
      style={{ fontFamily: poppins.style.fontFamily }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">{children}</div>
    </motion.section>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  subtitle,
  centered = false,
  compact = false,
  alignLeft = false,
  highlight,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  centered?: boolean;
  compact?: boolean;
  alignLeft?: boolean;
  /**
   * Optional trailing word/phrase rendered in a gradient Allura script,
   * e.g. <SectionIntro title="Turn Ideas into" highlight="Impact." />
   */
  highlight?: string;
}) {
  return (
    <div className={cn(centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl", alignLeft && "text-left")}>
      <div className="inline-block rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-sky-600 ring-1 ring-inset ring-sky-100">
        {eyebrow}
      </div>
      {title ? (
        <h2 className={cn("mt-4 text-balance text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl", compact && "sm:text-3xl lg:text-3xl")}>
          {title.split("\n").map((line, index) => (
            <React.Fragment key={line}>
              {index > 0 ? <br className="hidden sm:block" /> : null}
              {line}
            </React.Fragment>
          ))}
          {highlight ? (
            <>
              {" "}
              <span
                className={cn(
                  allura.className,
                  "bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-400 bg-clip-text text-transparent",
                  "text-[1.35em] sm:text-[1.4em]"
                )}
                style={{ fontWeight: 700 }}
              >
                {highlight}
              </span>
            </>
          ) : null}
        </h2>
      ) : null}
      {subtitle ? <p className={cn("mt-4 max-w-2xl text-pretty text-base leading-7 text-neutral-600 sm:text-lg", centered && "mx-auto")}>{subtitle}</p> : null}
    </div>
  );
}

export function LogoTile({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <div className="group rounded-[1.75rem] border border-neutral-200 bg-[#fbfbfa] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_14px_35px_rgba(15,23,42,0.06)]">
      <div className="flex h-24 items-center justify-center">
        <Image src={src} alt={alt} width={220} height={96} className="max-h-20 w-auto object-contain grayscale opacity-85 transition duration-300 group-hover:opacity-100" />
      </div>
      <div className="mt-5 text-sm font-medium text-neutral-700">{label}</div>
    </div>
  );
}

export function TrackCard({ title, description, challenge, href, image, icon: Icon, accent }: (typeof tracks)[number]) {
  const styles = ACCENT_STYLES[accent];

  return (
    <Link href={href} className="group block h-full">
      <motion.article
        className="relative flex h-[380px] flex-col overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_22px_50px_rgba(15,23,42,0.12)]"
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25 }}
      >
        {/* Full-bleed background photo — spans the ENTIRE card (not just a
           top slice). A soft alpha mask dissolves it gradually toward the
           bottom instead of hard-cropping it, so there's no visible seam. */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
          style={{
            backgroundImage: `url(${image})`,
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 38%, transparent 90%)",
            maskImage: "linear-gradient(to bottom, black 0%, black 38%, transparent 90%)",
          }}
          aria-hidden="true"
        />

        {/* Faint accent tint so each card reads as belonging to its track,
           even where the photo has faded away underneath. */}
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(180deg, ${styles.glow} 0%, transparent 60%)` }}
          aria-hidden="true"
        />

        {/* Gradual white wash: transparent near the top, fully opaque by
           the lower third, so the copy always sits on a clean, legible
           surface no matter what's underneath — no hard edges. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, transparent 32%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.92) 68%, #ffffff 82%)",
          }}
          aria-hidden="true"
        />

        {/* Content — icon badge pinned top-left, arrow top-right, copy
           anchored to the bottom where the wash is fully opaque. */}
        <div className="relative z-10 flex h-full flex-col p-5">
          <div className="flex items-start justify-between">
            <div
              className={cn(
                "inline-flex size-14 items-center justify-center rounded-2xl bg-white shadow-[0_6px_16px_rgba(15,23,42,0.14)] ring-1",
                styles.badge
              )}
            >
              <Icon className={cn("size-7", styles.icon)} />
            </div>
            <div className="inline-flex size-9 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-sm backdrop-blur-sm transition-transform duration-300 group-hover:translate-x-1 group-hover:text-neutral-900">
              <ArrowRight className="size-4" />
            </div>
          </div>

          <div className="mt-auto pt-3">
  <h3 className="text-lg font-semibold tracking-tight text-neutral-950">{title}</h3>
  <p className="mt-2 text-sm leading-6 text-neutral-600">{description}</p>

  <div className="pt-2">
    <p className="max-h-0 overflow-hidden text-sm leading-6 text-neutral-600 opacity-0 transition-all duration-300 group-hover:max-h-20 group-hover:opacity-100">
      {challenge}
    </p>
    <div className={cn("mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500 transition-all duration-300 group-hover:gap-3", styles.icon)}>
      Explore track <ArrowRight className="size-3.5" />
    </div>
  </div>
</div>
        </div>
      </motion.article>
    </Link>
  );
}

export function ContactCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="group rounded-3xl border border-neutral-200 bg-[#fbfbfa] p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_14px_35px_rgba(15,23,42,0.06)]"
    >
      <div className="inline-flex size-11 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-900">
        <Icon className="size-5" />
      </div>
      <div className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">{label}</div>
      <div className="mt-3 flex items-center gap-2 text-sm font-medium text-neutral-950">
        <span>{value}</span>
        <ExternalLink className="size-3.5 text-neutral-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}

export function getTimeLeft(target: number) {
  const difference = Math.max(target - Date.now(), 0);
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days: String(days).padStart(2, "0"), hours: String(hours).padStart(2, "0"), minutes: String(minutes).padStart(2, "0"), seconds: String(seconds).padStart(2, "0") };
}

function HeartPulseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 20s-7-4.35-9.5-8.59C.6 8.2 2.51 4.8 6 4.2c2-.35 3.88.44 5.1 1.92C12.32 4.64 14.2 3.85 16.2 4.2c3.49.6 5.4 4 3.5 7.21C19 15.65 12 20 12 20Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4.5 12h3l1.35-2.4 2.1 4.2 1.65-2.8h6.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PresentationIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 20l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 16v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function GraduationCapIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><path d="M12 4 2 9l10 5 10-5-10-5Z" stroke="currentColor" strokeWidth="1.5" /><path d="M6 11.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function LeafIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><path d="M20 4c-8 0-14 4.5-14 12 0 2.8 2.2 4 4.5 4 7.5 0 9.5-7.5 9.5-16Z" stroke="currentColor" strokeWidth="1.5" /><path d="M7 17c2.2-2.4 5.2-4.1 9-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}

function FactoryIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><path d="M4 20V9l6 3V9l6 3V8l4 2v10H4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M8 20v-4m4 4v-3m4 3v-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}

function Building2Icon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><path d="M4 20V5h9v15" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M13 20h7V9h-7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M8 8h2m-2 4h2m-2 4h2m7-4h2m-2 4h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}

function DropletsIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><path d="M12 3s5 5.2 5 9a5 5 0 1 1-10 0c0-3.8 5-9 5-9Z" stroke="currentColor" strokeWidth="1.5" /><path d="M8 14c.4 1.8 1.7 3 4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}

function SunMediumIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" /><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}

function CpuIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M9 1v4m6-4v4M9 19v4m6-4v4M1 9h4m-4 6h4m14-6h4m-4 6h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}

function BadgeCheckIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><path d="M12 2 4.8 5.5v6.1c0 4.5 2.8 8.5 7.2 10.4 4.4-1.9 7.2-5.9 7.2-10.4V5.5L12 2Z" stroke="currentColor" strokeWidth="1.5" /><path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function PanelTopIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M3 9h18" stroke="currentColor" strokeWidth="1.5" /><path d="M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}

function SparklesIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><path d="M12 2 13.7 8.3 20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M19 13l.8 2.9L22 17l-2.2.6L19 20l-.8-2.4L16 17l2.2-.6L19 13Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>;
}

function HandshakeIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><path d="M7 13.5 9.8 16l2.2-2.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M3 12 7.5 7.5l5 5 3-3 5.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M14 14.5 16 16l2.8-2.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function RocketIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><path d="M14 3c3.5.2 6.4 3.1 6.6 6.6-.8 4.4-4.2 7.8-8.6 8.6-3.5-.2-6.4-3.1-6.6-6.6.8-4.4 4.2-7.8 8.6-8.6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M9 15 4 20m5-5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="15.5" cy="8.5" r="1.25" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

function TrophyIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><path d="M8 4h8v3a4 4 0 0 1-8 0V4Z" stroke="currentColor" strokeWidth="1.5" /><path d="M8 7H5a2 2 0 0 0 2 2h1m8-2h3a2 2 0 0 1-2 2h-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M12 11v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M9 20h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}

function AwardIcon({ className }: { className?: string }) { return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><circle cx="12" cy="9" r="5" stroke="currentColor" strokeWidth="1.5" /><path d="m9 14-1 7 4-2 4 2-1-7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>; }
function UsersIcon({ className }: { className?: string }) { return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><path d="M16 20v-1a4 4 0 0 0-8 0v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" /><path d="M19 20v-1a3 3 0 0 0-2.5-2.95" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>; }
function BrainIcon({ className }: { className?: string }) { return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><path d="M9 4a3 3 0 0 0-3 3v1.1A3 3 0 0 0 5 13a3 3 0 0 0 1 2.3V16a3 3 0 0 0 3 3h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M15 4a3 3 0 0 1 3 3v1.1A3 3 0 0 1 19 13a3 3 0 0 1-1 2.3V16a3 3 0 0 1-3 3h-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M8 10a2 2 0 0 1 4 0v7a2 2 0 0 1-4 0v-7Zm4 0a2 2 0 0 1 4 0v7a2 2 0 0 1-4 0v-7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>; }
function Globe2Icon({ className }: { className?: string }) { return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M3 12h18M12 3c2.7 2.5 4.2 5.4 4.2 9S14.7 18.5 12 21c-2.7-2.5-4.2-5.4-4.2-9S9.3 5.5 12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function CalendarDaysIcon({ className }: { className?: string }) { return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M8 3v4m8-4v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>; }
function ShieldCheckIcon({ className }: { className?: string }) { return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><path d="M12 2 4.8 5.5v6.1c0 4.5 2.8 8.5 7.2 10.4 4.4-1.9 7.2-5.9 7.2-10.4V5.5L12 2Z" stroke="currentColor" strokeWidth="1.5" /><path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>; }
function MedalIcon({ className }: { className?: string }) { return <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true"><circle cx="12" cy="9" r="4.5" stroke="currentColor" strokeWidth="1.5" /><path d="m9.5 13.5-1.3 6L12 18l3.8 1.5-1.3-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>; }