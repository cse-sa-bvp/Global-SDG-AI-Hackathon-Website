"use client";

import { useState } from "react";
import Image from "next/image";
// Add at the top with other imports
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});
import {
  Activity,
  Image as ImageIcon,
  Video,
  Building2,
  Brain,
  Users,
  Sparkles,
  ClipboardCheck,
  FileText,
  Accessibility,
  Presentation,
  TrendingUp,
  CloudRain,
  TreePine,
  Gauge,
  Map,
  BarChart3,
  Cloud,
  Sprout,
  Bug,
  Tractor,
  Layers,
  Truck,
  Car,
  Shield,
  Trash2,
  Zap,
  LineChart,
  Sun,
  Wind,
  Battery,
  Languages,
  GraduationCap,
  Wifi,
  Wallet,
  MousePointer,
  Scale,
  Eye,
  Lock,
  ShieldCheck,
  FileCheck,
  Heart,
  BookOpen,
  Leaf,
  Wheat,
  Cpu,
  Info,
  ArrowUpRight,
  CalendarClock,
  type LucideIcon,
} from "lucide-react";

/* =========================================================================
   DATA — all track content lives here. Add a track by appending to `tracks`;
   the tab bar and detail panel both render from this array automatically.
   ========================================================================= */

interface InnovationArea {
  label: string;
  icon: LucideIcon;
}

interface Track {
  slug: string;
  navLabel: string;
  navIcon: LucideIcon;
  trackNumber: string;
  title: string;
  titleAccent: string;
  description: string;
  innovationAreas: InnovationArea[];
  accent: {
    gradientFrom: string;
    gradientTo: string;
  };
  /**
   * Path to a real photo in /public. Drop a matching image at this path
   * to replace the generated placeholder illustration — no code changes
   * needed, TrackVisual below detects it automatically.
   *
   * IMPORTANT: all image paths must live flat under /public (e.g.
   * "/health.png"), matching how the files are actually placed. A
   * mismatched path (e.g. "/images/tracks/foo.png" when the file is
   * really at "/foo.png") will silently 404 and trigger the fallback
   * placeholder — which is what was happening to the Responsible AI
   * card before this fix.
   */
  imageSrc: string;
}

const greenAccent = { gradientFrom: "#0f766e", gradientTo: "#10b981" };

const tracks: Track[] = [
  {
    slug: "healthcare",
    navLabel: "Healthcare",
    navIcon: Heart,
    trackNumber: "TRACK 01",
    title: "Healthcare",
    titleAccent: "AI",
    description:
      "Leverage AI to improve healthcare accessibility, enhance diagnosis, predict diseases, and personalize patient care for healthier communities.",
    innovationAreas: [
      { label: "Disease Prediction", icon: Activity },
      { label: "Medical Imaging", icon: ImageIcon },
      { label: "Remote Healthcare", icon: Video },
      { label: "Hospital Automation", icon: Building2 },
      { label: "Mental Health", icon: Brain },
      { label: "Public Health", icon: Users },
    ],
    accent: greenAccent,
    imageSrc: "/health.png",
  },
  {
    slug: "education",
    navLabel: "Education",
    navIcon: BookOpen,
    trackNumber: "TRACK 02",
    title: "Education",
    titleAccent: "AI",
    description:
      "Harness AI to personalize learning journeys, expand access to quality education, and empower students and educators everywhere.",
    innovationAreas: [
      { label: "Personalized Learning", icon: Sparkles },
      { label: "Adaptive Assessment", icon: ClipboardCheck },
      { label: "Content Generation", icon: FileText },
      { label: "Accessibility Tools", icon: Accessibility },
      { label: "Teacher Support", icon: Presentation },
      { label: "Skill Tracking", icon: TrendingUp },
    ],
    accent: greenAccent,
    imageSrc: "/edu.png",
  },
  {
    slug: "climate-action",
    navLabel: "Climate Action",
    navIcon: Leaf,
    trackNumber: "TRACK 03",
    title: "Climate Action",
    titleAccent: "AI",
    description:
      "Apply AI to monitor environmental change, forecast climate risks, and drive data-informed action for a more sustainable planet.",
    innovationAreas: [
      { label: "Emissions Tracking", icon: Cloud },
      { label: "Disaster Prediction", icon: CloudRain },
      { label: "Deforestation Monitoring", icon: TreePine },
      { label: "Carbon Modeling", icon: Gauge },
      { label: "Biodiversity Mapping", icon: Map },
      { label: "Climate Analytics", icon: BarChart3 },
    ],
    accent: greenAccent,
    imageSrc: "/climate.png",
  },
  {
    slug: "agriculture",
    navLabel: "Agriculture",
    navIcon: Wheat,
    trackNumber: "TRACK 04",
    title: "Agriculture",
    titleAccent: "AI",
    description:
      "Use AI to boost crop yields, optimize resource use, and strengthen food security for farming communities worldwide.",
    innovationAreas: [
      { label: "Crop Monitoring", icon: Sprout },
      { label: "Yield Prediction", icon: TrendingUp },
      { label: "Pest Detection", icon: Bug },
      { label: "Precision Farming", icon: Tractor },
      { label: "Soil Analysis", icon: Layers },
      { label: "Supply Chain", icon: Truck },
    ],
    accent: greenAccent,
    imageSrc: "/agriculture.png",
  },
  {
    slug: "smart-cities",
    navLabel: "Smart Cities",
    navIcon: Building2,
    trackNumber: "TRACK 05",
    title: "Smart Cities",
    titleAccent: "AI",
    description:
      "Build AI-powered systems that improve urban planning, traffic flow, public safety, and everyday city services.",
    innovationAreas: [
      { label: "Traffic Optimization", icon: Car },
      { label: "Public Safety", icon: Shield },
      { label: "Waste Management", icon: Trash2 },
      { label: "Urban Planning", icon: Building2 },
      { label: "Utility Monitoring", icon: Gauge },
      { label: "Citizen Services", icon: Users },
    ],
    accent: greenAccent,
    imageSrc: "/smartcities.png",
  },
  {
    slug: "clean-energy",
    navLabel: "Clean Energy",
    navIcon: Sun,
    trackNumber: "TRACK 06",
    title: "Clean Energy",
    titleAccent: "AI",
    description:
      "Deploy AI to optimize renewable energy production, forecast demand, and accelerate the transition to clean power.",
    innovationAreas: [
      { label: "Grid Optimization", icon: Zap },
      { label: "Demand Forecasting", icon: LineChart },
      { label: "Solar Analytics", icon: Sun },
      { label: "Wind Forecasting", icon: Wind },
      { label: "Storage Management", icon: Battery },
      { label: "Energy Efficiency", icon: Gauge },
    ],
    accent: greenAccent,
    imageSrc: "/clean.png",
  },
  {
    slug: "digital-inclusion",
    navLabel: "Digital Inclusion",
    navIcon: Users,
    trackNumber: "TRACK 07",
    title: "Digital Inclusion",
    titleAccent: "AI",
    description:
      "Design AI solutions that bridge the digital divide and expand access to technology for underserved communities.",
    innovationAreas: [
      { label: "Language Translation", icon: Languages },
      { label: "Assistive Technology", icon: Accessibility },
      { label: "Digital Literacy", icon: GraduationCap },
      { label: "Connectivity Solutions", icon: Wifi },
      { label: "Financial Inclusion", icon: Wallet },
      { label: "Accessible Interfaces", icon: MousePointer },
    ],
    accent: greenAccent,
    imageSrc: "/digital.png",
  },
  {
    slug: "responsible-ai",
    navLabel: "Responsible AI",
    navIcon: Cpu,
    trackNumber: "TRACK 08",
    title: "Responsible",
    titleAccent: "AI",
    description:
      "Develop frameworks and tools that ensure AI systems are fair, transparent, safe, and accountable at every scale.",
    innovationAreas: [
      { label: "Bias Detection", icon: Scale },
      { label: "Explainability", icon: Eye },
      { label: "Privacy Preservation", icon: Lock },
      { label: "Model Auditing", icon: ClipboardCheck },
      { label: "Safety Testing", icon: ShieldCheck },
      { label: "Governance Tools", icon: FileCheck },
    ],
    accent: greenAccent,
    // FIX: was "/images/tracks/responsible.png" — inconsistent with every
    // other track's flat "/public" path, so it 404'd and always showed
    // the fallback placeholder. Now matches the same pattern as the rest.
    imageSrc: "/responsible.png",
  },
];

const deliverableItems = [
  { icon: Cpu, label: "Working AI Prototype" },
  { icon: FileText, label: "Technical Documentation" },
  { icon: ImageIcon, label: "Presentation Deck" },
  { icon: Video, label: "Demo Video (2-3 min)" },
  { icon: FileCheck, label: "Source Code Repository" },
];

const whyParticipateItems = [
  {
    icon: Users,
    title: "Industry Mentorship",
    description: "Guidance from experts and industry leaders.",
  },
  {
    icon: GraduationCap,
    title: "Technical Workshops",
    description: "Hands-on learning and skill-building sessions.",
  },
  {
    icon: Sparkles,
    title: "Startup Incubation",
    description: "Support to turn ideas into real impact.",
  },
  {
    icon: Presentation,
    title: "Innovation Expo",
    description: "Showcase your solutions to a global audience.",
  },
  {
    icon: Eye,
    title: "Jury Evaluation",
    description: "Expert evaluation and feedback.",
  },
  {
    icon: Scale,
    title: "Awards & Recognition",
    description: "Rewards, certificates, and global visibility.",
  },
];

/* =========================================================================
   TrackVisual — renders a real photo if present in /public, otherwise a
   themed gradient + icon placeholder so the layout still looks finished.

   CHANGES FROM BEFORE:
   - Uses `object-contain` instead of `object-cover`, so the full image is
     always visible and never cropped by the box's aspect ratio.
   - Dropped the radial edge-mask on the sharp foreground image (that mask
     was cutting into the image itself). The soft blurred backdrop stays,
     so there's still a nice ambient fill behind letterboxed images, but
     the real photo itself is shown uncropped and un-masked.
   - `key`-free internal state reset is handled by the parent giving this
     component a `key={imageSrc}` so a track switch always remounts it
     and clears any previous `failed` flag — this is what makes the
     placeholder correctly disappear once a valid image path loads.
   ========================================================================= */

function TrackVisual({
  src,
  alt,
  icon: Icon,
  gradientFrom,
  gradientTo,
}: {
  src: string;
  alt: string;
  icon: LucideIcon;
  gradientFrom: string;
  gradientTo: string;
}) {
  const [failed, setFailed] = useState(false);

  // Soft fade so the image's own edges dissolve into the page instead of
  // ending in a hard rectangle — no card, no border, no background box.
  const edgeFadeStyle = {
    WebkitMaskImage:
      "radial-gradient(ellipse 80% 80% at center, black 55%, transparent 100%)",
    maskImage:
      "radial-gradient(ellipse 80% 80% at center, black 55%, transparent 100%)",
  } as const;

  if (failed) {
    return (
      <div className="relative flex h-full w-full items-center justify-center">
        <div
          className="flex h-28 w-28 items-center justify-center rounded-3xl shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
          }}
        >
          <Icon className="h-14 w-14 text-white" strokeWidth={1.5} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full" style={edgeFadeStyle}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 640px, 100vw"
        className="object-contain"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

/* =========================================================================
   Page
   ========================================================================= */

export default function TracksPage() {
  const [activeSlug, setActiveSlug] = useState(tracks[0].slug);
  const activeTrack = tracks.find((t) => t.slug === activeSlug) ?? tracks[0];

  return (
    <div className={`${poppins.className} min-h-screen bg-[#F8F8F7] text-slate-900`}>
      {/* ---------------- Header ---------------- */}
      {/* <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <LogoMark />
            <div className="leading-tight">
              <p className="text-[15px] font-semibold text-slate-900">
                Global SDG-AI Hackathon
              </p>
              <p className="text-xs text-slate-500">2026</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#" className="hover:text-slate-900">
              Home
            </a>
            <a href="#" className="hover:text-slate-900">
              About
            </a>
            <a
              href="#"
              className="relative text-emerald-600 after:absolute after:-bottom-[21px] after:left-0 after:h-[2px] after:w-full after:bg-emerald-600"
            >
              Tracks
            </a>
            <a href="#" className="hover:text-slate-900">
              Timeline
            </a>
            <a href="#" className="hover:text-slate-900">
              Prizes
            </a>
            <a href="#" className="hover:text-slate-900">
              FAQs
            </a>
          </nav>

          <button className="flex items-center gap-1.5 rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800">
            Register Now
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </header> */}

      <main className="mx-auto max-w-7xl px-6 pb-24">
        {/* ---------------- Hero ---------------- */}
        <section className="grid grid-cols-1 items-center gap-10 py-6 lg:grid-cols-2">
  {/* Text side */}
  <div>
    <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-700">
      SDG TRACKS
    </span>
    <h1 className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl">
      Choose Your
      <br />
      <span className="text-emerald-600">Challenge.</span>
    </h1>
    <p className="mt-4 text-xl font-semibold text-blue-800 sm:text-2xl">
      One Mission. Eight Ways to Create Impact.
    </p>
    <p className="mt-4 max-w-md text-base leading-relaxed text-slate-500 sm:text-lg">
      Explore AI challenge tracks inspired by global sustainability
      goals. Each track addresses a unique real-world problem area
      where innovation can create measurable social and
      environmental impact.
    </p>
  </div>

  {/* Image side — bigger container, no aspect-square constraint */}
  <div className="relative mx-auto h-[520px] w-full max-w-2xl">
    <Image
      src="/track_hero.png"
      alt="SDG AI Tracks illustration"
      fill
      className="object-contain"
      priority
    />
  </div>
</section>

        {/* ---------------- Track tabs ---------------- */}
        <section className="rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_2px_20px_-8px_rgba(15,23,42,0.08)]">
          <div className="grid grid-cols-4 gap-1 sm:grid-cols-8">
            {tracks.map((track) => {
              const isActive = track.slug === activeSlug;
              const Icon = track.navIcon;
              return (
                <button
                  key={track.slug}
                  onClick={() => setActiveSlug(track.slug)}
                  className={`flex flex-col items-center gap-2 rounded-xl px-2 py-4 text-center transition ${
                    isActive ? "bg-slate-50" : "hover:bg-slate-50"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      isActive ? "text-emerald-600" : "text-slate-400"
                    }`}
                    strokeWidth={1.75}
                  />
                  <span
                    className={`text-[13px] font-medium leading-tight ${
                      isActive ? "text-slate-900" : "text-slate-500"
                    }`}
                  >
                    {track.navLabel}
                  </span>
                  <span
                    className={`mt-0.5 block h-[2px] w-6 rounded-full transition ${
                      isActive ? "bg-emerald-600" : "bg-transparent"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </section>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[13px] text-slate-400">
          <Info className="h-3.5 w-3.5" />
          Click on any track to explore details
        </p>

        {/* ---------------- Track detail ---------------- */}
        {/*
          Layout change: was a 1fr/1fr grid-cols-2 (equal 50/50 split).
          Now a 5-column grid where text takes 2/5 and the image takes
          3/5 — text column is narrower, image column is wider/freer.
        */}
        <section className="mt-8 overflow-hidden rounded-3xl border border-emerald-100/70 bg-gradient-to-br from-emerald-50/60 to-white">
          <div className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-5 lg:gap-8 lg:p-10">
            <div className="flex flex-col justify-center lg:col-span-2">
              <span className="inline-block w-fit rounded-full bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-slate-500 ring-1 ring-slate-200">
                {activeTrack.trackNumber}
              </span>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 lg:text-4xl">
                {activeTrack.title}{" "}
                <span className="text-emerald-600">
                  {activeTrack.titleAccent}
                </span>
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-500">
                {activeTrack.description}
              </p>

              <div className="mt-7 flex items-center gap-2">
                <h3 className="text-base font-semibold text-slate-900">
                  Innovation Areas
                </h3>
                <span className="h-px w-8 bg-emerald-300" />
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {activeTrack.innovationAreas.map((area) => {
                  const AreaIcon = area.icon;
                  return (
                    <div
                      key={area.label}
                      className="flex items-center gap-2.5 rounded-full border border-emerald-100 bg-emerald-50/60 px-4 py-2.5 text-sm font-medium text-emerald-700"
                    >
                      <AreaIcon className="h-5 w-5 shrink-0" strokeWidth={1.75} />
                      {area.label}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Image column — now 3/5 of the width (was 1/2), giving the
                photo more horizontal room. Height kept as it was originally. */}
            <div className="h-72 lg:col-span-3 lg:h-full lg:min-h-[420px]">
              <TrackVisual
                key={activeTrack.imageSrc}
                src={activeTrack.imageSrc}
                alt={`${activeTrack.title} ${activeTrack.titleAccent} illustration`}
                icon={activeTrack.navIcon}
                gradientFrom={activeTrack.accent.gradientFrom}
                gradientTo={activeTrack.accent.gradientTo}
              />
            </div>
          </div>
        </section>

        {/* ---------------- Official problem statements ---------------- */}
        <section
          key={activeTrack.slug}
          className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-slate-50/60 px-8 py-16 text-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
            <CalendarClock className="h-7 w-7" />
          </div>
          <p className="mt-6 max-w-lg text-lg font-semibold text-slate-900">
            The official problem statements for this track will be announced
            soon.
          </p>
          <p className="mt-2 text-base font-medium text-violet-600">
            Stay tuned!
          </p>
        </section>

        {/* ---------------- Expected deliverables ---------------- */}
        <section className="mt-8">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900">
              Expected Deliverables
            </h3>
            <span className="h-px w-6 bg-emerald-300" />
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {deliverableItems.map((item) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50/50 px-4 py-3 text-[13px] font-medium text-slate-700"
                >
                  <ItemIcon className="h-4 w-4 text-emerald-600" strokeWidth={1.75} />
                  {item.label}
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------------- Why participate ---------------- */}
        <section className="mt-12">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900">
              Why Participate?
            </h3>
            <span className="h-px w-6 bg-emerald-300" />
          </div>

          <div className="mt-7 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {whyParticipateItems.map((item, i) => {
              const ItemIcon = item.icon;
              const palettes = [
                "bg-emerald-50 text-emerald-600",
                "bg-indigo-50 text-indigo-600",
                "bg-teal-50 text-teal-600",
                "bg-sky-50 text-sky-600",
                "bg-blue-50 text-blue-600",
                "bg-amber-50 text-amber-600",
              ];
              return (
                <div key={item.title} className="text-center">
                  <div
                    className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${palettes[i % palettes.length]}`}
                  >
                    <ItemIcon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <p className="mt-3 text-[13px] font-semibold text-slate-900">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-slate-400">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------------- CTA banner ---------------- */}
        <section className="mt-14 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-blue-700 p-8 sm:p-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
                <Sprout className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white sm:text-2xl">
                  Ready to Build AI That Matters?
                </h3>
                <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-emerald-50/90">
                  Official challenge statements will be announced soon.
                  Register now and be among the first teams to participate
                  in the Global SDG-AI hackathon 2026.
                </p>
              </div>
            </div>
            <button className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50">
              Register Now
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ---------------- Small visual helpers ---------------- */

function LogoMark() {
  return (
    <svg viewBox="0 0 40 40" className="h-8 w-8" aria-hidden>
      <g>
        <path d="M20 20 C20 8 12 4 8 6 C8 14 12 20 20 20 Z" fill="#10b981" />
        <path d="M20 20 C32 20 36 12 34 8 C26 8 20 12 20 20 Z" fill="#3b82f6" />
        <path d="M20 20 C20 32 28 36 32 34 C32 26 28 20 20 20 Z" fill="#f59e0b" />
        <path d="M20 20 C8 20 4 28 6 32 C14 32 20 28 20 20 Z" fill="#8b5cf6" />
      </g>
    </svg>
  );
}

function GlobeIllustration() {
  const satellites = [
    { top: "0%", left: "48%" },
    { top: "18%", left: "82%" },
    { top: "58%", left: "88%" },
    { top: "88%", left: "68%" },
    { top: "88%", left: "26%" },
    { top: "58%", left: "6%" },
    { top: "18%", left: "10%" },
  ];

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-[12%] rounded-full border border-dashed border-slate-200" />
      <div className="absolute inset-[22%] overflow-hidden rounded-full bg-gradient-to-br from-emerald-100 via-emerald-200 to-emerald-300 shadow-inner">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.6),transparent_55%)]" />
      </div>
      <div className="absolute inset-x-[38%] bottom-[6%] top-[46%] flex items-end justify-center">
        <Sprout className="h-16 w-16 text-emerald-700" strokeWidth={1.25} />
      </div>
      {satellites.map((s, i) => (
        <div
          key={i}
          className="absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm"
          style={{ top: s.top, left: s.left }}
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
        </div>
      ))}
    </div>
  );
}