import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { Poppins, Allura } from "next/font/google";
import {
  Globe,
  Shield,
  Leaf,
  Users,
  GraduationCap,
  Check,
  Lightbulb,
  Target,
  Clock,
  Rocket,
  FileText,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import AboutBvSection from "@/components/landing-page-sections/about-bv-section";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-allura",
});

export const metadata: Metadata = {
  title: "About the Event | Global SDG-AI Hackathon 2026",
  description:
    "Global SDG-AI Hackathon 2026 — an international hackathon uniting students, researchers, startups, and innovators to build AI solutions aligned with the UN Sustainable Development Goals.",
};

/* ------------------------------------------------------------------ */
/*  Design tokens (mirrors the landing page)                          */
/*  Background  #FCFCFA                                                */
/*  Cards       #FFFFFF                                                */
/*  Accents     emerald / teal / blue / purple / orange / pink          */
/*  Images live in /public: about.png, about3.png, focus1.png … focus8.png, */
/*  mission.png, vision.png                                             */
/* ------------------------------------------------------------------ */

const colors: Record<
  "emerald" | "teal" | "blue" | "purple" | "orange" | "pink",
  { bg: string; text: string; ring: string; dot: string; stroke: string }
> = {
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    ring: "ring-emerald-100",
    dot: "bg-emerald-500",
    stroke: "#10B981",
  },
  teal: {
    bg: "bg-teal-50",
    text: "text-teal-700",
    ring: "ring-teal-100",
    dot: "bg-teal-500",
    stroke: "#14B8A6",
  },
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    ring: "ring-blue-100",
    dot: "bg-blue-500",
    stroke: "#3B82F6",
  },
  purple: {
    bg: "bg-purple-50",
    text: "text-purple-700",
    ring: "ring-purple-100",
    dot: "bg-purple-500",
    stroke: "#8B5CF6",
  },
  orange: {
    bg: "bg-orange-50",
    text: "text-orange-700",
    ring: "ring-orange-100",
    dot: "bg-orange-500",
    stroke: "#F97316",
  },
  pink: {
    bg: "bg-pink-50",
    text: "text-pink-700",
    ring: "ring-pink-100",
    dot: "bg-pink-500",
    stroke: "#EC4899",
  },
};

function Eyebrow({
  number,
  children,
  color,
}: {
  number: string;
  children: ReactNode;
  color: keyof typeof colors;
}) {
  const c = colors[color];
  return (
    <div className="flex items-center gap-3">
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full ${c.bg} text-xs font-semibold ${c.text}`}
      >
        {number}
      </span>
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
        {children}
      </h2>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className={`${poppins.className} bg-[#FCFCFA] text-slate-900 antialiased`}>
      <AboutTheEvent />
      <WhyAiMeetsSDGs />
      <OurFocusAreas />
      <OurCommitment />
      <MissionVision />
      {/* <OrganizedAndHostedBy /> */}
      <AboutBvSection/>
      
      <CtaBanner />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* 1. About the Event — "What Makes This Event Different"              */
/* ------------------------------------------------------------------ */

const differentItems: {
  title: string;
  body: string;
  icon: LucideIcon;
  color: keyof typeof colors;
}[] = [
  {
    title: "International Participation",
    body: "Open to innovators from 15+ countries across the globe.",
    icon: Globe,
    color: "emerald",
  },
  {
    title: "48-Hour Grand Hackathon",
    body: "An immersive 48-hour build sprint to create meaningful solutions.",
    icon: Clock,
    color: "purple",
  },
  {
    title: "Industry Mentorship",
    body: "Learn from experts and get guidance from industry leaders.",
    icon: Users,
    color: "blue",
  },
  {
    title: "Startup Incubation",
    body: "Top teams get incubation support and startup ecosystem access.",
    icon: Rocket,
    color: "orange",
  },
  {
    title: "Publication Opportunities",
    body: "Selected solutions may be considered for research publications.",
    icon: FileText,
    color: "pink",
  },
  {
    title: "Global Recognition & Prizes",
    body: "Win exciting prizes and gain global visibility for your innovation.",
    icon: Trophy,
    color: "teal",
  },
];

function FeatureCard({
  title,
  body,
  icon: IconComp,
  color,
}: {
  title: string;
  body: string;
  icon: LucideIcon;
  color: keyof typeof colors;
}) {
  const c = colors[color];
  return (
    <div className="flex flex-col items-center rounded-[22px] bg-[#FAFAF7] p-6 text-center shadow-[0_8px_30px_rgba(15,23,42,0.05)] ring-1 ring-slate-100">
      <span
        className={`flex h-16 w-16 items-center justify-center rounded-full ${c.bg}`}
      >
        <IconComp size={42} strokeWidth={1.8} color={c.stroke} />
      </span>
      <h3 className="mt-4 text-[0.92rem] font-semibold leading-snug text-slate-900">
        {title}
      </h3>
      <p className="mt-2 text-[0.8rem] leading-relaxed text-slate-500">{body}</p>
      <span className={`mt-4 h-1 w-8 rounded-full ${c.dot}`} />
    </div>
  );
}

function AboutTheEvent() {
  return (
    <section className="px-6 pt-24 pb-6 sm:pt-28 sm:pb-10">
      <div className="mx-auto max-w-6xl">
        <span className=" inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-emerald-700">
          ABOUT THE HACKATHON
        </span>

        <div className="mt-4 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <h1 className="max-w-2xl whitespace-nowrap text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              More than a{" "}
              <span
                className={`${allura.className} bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-[1.8em] text-transparent`}
                style={{ WebkitTextStroke: "0.6px currentColor" }}
              >
                Hackathon
              </span>
            </h1>

            <p className="mt-2 text-4xl leading-tight font-semibold text-slate-800 sm:text-5xl">
              Where AI Meets{" "}
              <span
                className={`${allura.className} bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-[1.8em] text-transparent`}
                style={{ WebkitTextStroke: "0.6px currentColor" }}
              >
                Purpose.
              </span>
            </p>

            <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-slate-500">
              Global SDG-AI Hackathon 2026 brings together innovators,
              researchers, students and startups from around the world to
              build AI-powered solutions for a sustainable and equitable
              future.
            </p>
          </div>

          {/* Hero diagram supplied as an image asset — enlarged and nudged right */}
          <div className="mx-auto w-full max-w-3xl lg:ml-10 lg:-mt-12 lg:max-w-4xl xl:ml-16 xl:max-w-[42rem]">
            <Image
              src="/about.png"
              alt="AI at the center of the UN Sustainable Development Goals"
              width={640}
              height={640}
              className="h-auto w-full"
              priority
            />
          </div>
        </div>

        {/* 01 What Makes This Event Different card */}
        <div className="mt-10 rounded-[28px] border border-slate-100 bg-[#FAFAF7] p-8 sm:p-10 lg:-mx-8 xl:-mx-16">
          {/* <Eyebrow number="01" color="emerald">
            
          </Eyebrow> */}
          <span className="text-3xl font-semibold ">What Makes This Event </span>
            <span
              className={`${allura.className} bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-[3.8rem] text-transparent`}
              style={{ WebkitTextStroke: "0.8px currentColor" }}
            >
              Different{" "}
            </span>
          <p className="mt-4 max-w-3xl text-[1.02rem] leading-relaxed text-slate-600">
            Designed to ignite innovation, collaboration and real-world
            impact at a global scale.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {differentItems.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Why AI × SDGs?                                                    */
/* ------------------------------------------------------------------ */

const sdgStats: {
  value: string;
  label: string;
  icon: LucideIcon;
  bg: string;
  text: string;
}[] = [
  {
    value: "17",
    label: "UN Sustainable Development Goals",
    icon: Globe,
    bg: "bg-emerald-50",
    text: "text-emerald-600",
  },
  {
    value: "15+",
    label: "Countries Participating",
    icon: Users,
    bg: "bg-purple-50",
    text: "text-purple-600",
  },
  {
    value: "8",
    label: "High-Impact Themes",
    icon: Lightbulb,
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    value: "1",
    label: "Shared Mission: A Better World",
    icon: Target,
    bg: "bg-orange-50",
    text: "text-orange-600",
  },
];

function WhyAiMeetsSDGs() {
  return (
    <section className="px-6 py-4 sm:py-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[32px] border border-slate-100 bg-gradient-to-br from-[#FCFCFA] via-[#FAFBFD] to-blue-50/40 p-8 sm:p-14 lg:p-16">
          {/* decorative dot grid, top right */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-8 top-8 hidden h-24 w-24 sm:block"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(100,116,139,0.35) 1px, transparent 1px)",
              backgroundSize: "10px 10px",
            }}
          />

          <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            {/* Left: copy + stats */}
            <div>
              <Eyebrow number="02" color="emerald">
                Why <span className="text-emerald-600">AI × SDGs?</span>
              </Eyebrow>

              <p className="mt-6 text-[1.35rem] font-semibold leading-snug text-slate-900 sm:text-[1.6rem]">
                Big challenges. 
                <br />
                Intelligent solutions.
                <br />
                Sustainable tomorrow.
              </p>

              <p className="mt-6 text-[0.98rem] leading-relaxed text-slate-600">
                Today's global challenges demand more than technological advancement—they require collaboration, creativity, and responsible innovation. Global SDG-AI Hackathon brings together students, researchers, startups, and industry experts to transform promising ideas into practical solutions with measurable impact.
              </p>
              <p className="mt-4 text-[0.98rem] leading-relaxed text-slate-600">
                By combining Artificial Intelligence with the United Nations Sustainable Development Goals, participants learn to build technologies that are ethical, scalable, and designed to create meaningful change across communities and industries.
              </p>

              {/* <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {sdgStats.map((s) => (
                  <div
                    key={s.label}
                    className={`flex flex-col items-center gap-2 rounded-[20px] ${s.bg} p-5 text-center`}
                  >
                    <s.icon size={30} strokeWidth={1.8} className={s.text} />
                    <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                    <p className="text-[0.78rem] leading-snug text-slate-500">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div> */}
            </div>

            {/* Right: visualization image — enlarged */}
            <div className="mx-auto w-full max-w-3xl lg:max-w-none">
              <Image
                src="/why.png"
                alt="AI connecting the UN Sustainable Development Goals — healthcare, climate action, smart cities, digital inclusion, sustainable agriculture, clean energy and quality education"
                width={1100}
                height={1100}
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Our Focus Areas — image-backed cards                             */
/* ------------------------------------------------------------------ */

const focusAreas: { title: string; body: string; image: string; color: keyof typeof colors }[] = [
  {
    title: "Responsible AI Development",
    body: "Building ethical, fair and transparent AI systems that put people first.",
    image: "/focus1.png",
    color: "emerald",
  },
  {
    title: "Sustainable Innovation",
    body: "Encouraging breakthrough ideas that drive long-term environmental and social value.",
    image: "/focus2.png",
    color: "emerald",
  },
  {
    title: "Climate Resilience",
    body: "AI solutions for climate action, disaster response and environmental protection.",
    image: "/focus3.png",
    color: "blue",
  },
  {
    title: "Healthcare Accessibility",
    body: "Leveraging AI to improve healthcare delivery and make it accessible to all.",
    image: "/focus4.png",
    color: "purple",
  },
  {
    title: "Educational Transformation",
    body: "AI-powered tools for personalized learning, skill development and knowledge equity.",
    image: "/focus5.png",
    color: "purple",
  },
  {
    title: "Smart Infrastructure",
    body: "Building intelligent, safe and sustainable cities and infrastructure.",
    image: "/focus6.png",
    color: "blue",
  },
  {
    title: "Agricultural Sustainability",
    body: "AI for precision farming, food security and sustainable agriculture.",
    image: "/focus7.png",
    color: "teal",
  },
  {
    title: "Digital Inclusion & Ethical AI",
    body: "Promoting inclusivity in technology and responsible AI for all.",
    image: "/focus8.png",
    color: "teal",
  },
];

function OurFocusAreas() {
  return (
    <section className="bg-white px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-[84rem]">
        <Eyebrow number="03" color="purple">
          Our Focus Areas
        </Eyebrow>

        <div className="mt-10 grid gap-x-3 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {focusAreas.map((area) => {
            const c = colors[area.color];
            return (
              <div
                key={area.title}
                style={{
                  backgroundImage: `url(${area.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "right center",
                }}
                className={`relative flex min-h-[250px] w-full flex-col justify-center overflow-hidden rounded-[22px] ${c.bg} p-6`}
              >
                {/* Text sits in normal flow on top of the background image,
                    so the card always grows to fit it — nothing overflows. */}
                <div className="relative z-10 max-w-[48%]">
                  <h3 className={`text-[1.05rem] font-semibold leading-snug ${c.text}`}>
                    {area.title}
                  </h3>
                  <p className="mt-3 text-[0.88rem] leading-relaxed text-slate-700">
                    {area.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Our Commitment                                                    */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* 4. Our Commitment                                                    */
/* ------------------------------------------------------------------ */

const commitmentItems: {
  title: string;
  body: string;
  icon: LucideIcon;
  color: keyof typeof colors;
}[] = [
  {
    title: "Ethical AI Practices",
    body: "Building trustworthy, transparent and fair AI solutions.",
    icon: Shield,
    color: "emerald",
  },
  {
    title: "Sustainable Impact",
    body: "Creating solutions that protect the planet and uplift communities.",
    icon: Leaf,
    color: "blue",
  },
  {
    title: "Inclusive Participation",
    body: "Ensuring diversity, equity and equal opportunities for all.",
    icon: Users,
    color: "purple",
  },
  {
    title: "Global Responsibility",
    body: "Collaborating across borders to build a better, shared future.",
    icon: Globe,
    color: "orange",
  },
];

function OurCommitment() {
  return (
    <section className="px-6 pt-10 pb-6 sm:pt-12 sm:pb-8 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[32px] border border-slate-100 bg-[#FCFCFA] p-2 sm:p-14 lg:p-16">
          {/* decorative dot grid, top right */}
          
          <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            {/* Left: eyebrow + headline + copy */}
            <div>
              <span className="inline-flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-700">
                  04
                </span>
                <span className="text-[16px] font-semibold tracking-[0.18em] text-emerald-700">
                  OUR COMMITMENT
                </span>
              </span>

              <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                Innovation with Responsibility.
              </h2>
              <p
                className={`${allura.className} mt-1 bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-[2.6rem] leading-tight text-transparent sm:text-[3.2rem]`}
                style={{ WebkitTextStroke: "0.4px currentColor" }}
              >
                Impact for All.
              </p>

              <p className="mt-6 max-w-md text-[1.02rem] leading-relaxed text-slate-600">
                We are committed to advancing AI innovation that is ethical,
                inclusive and sustainable. Through this hackathon, we empower
                young minds to build solutions that create long-term impact
                for people, the planet and prosperity.
              </p>

              <span className="mt-6 block h-1 w-10 rounded-full bg-emerald-500" />
            </div>

            {/* Right: 4 cards — 2 rows of 2 */}
            <div className="grid grid-cols-2 gap-4">
              {commitmentItems.map((item) => {
                const c = colors[item.color];
                return (
                  <div
                    key={item.title}
                    className="flex flex-col items-center rounded-[22px] bg-[#FCFCFA] p-6 text-center ring-1 ring-slate-100"
                  >
                    <span
                      className={`flex h-14 w-14 items-center justify-center rounded-full ${c.bg}`}
                    >
                      <item.icon size={32} strokeWidth={1.8} color={c.stroke} />
                    </span>
                    <h3 className="mt-4 text-[0.95rem] font-semibold leading-snug text-slate-900">
                      {item.title}
                    </h3>
                    <span className={`mt-3 h-1 w-8 rounded-full ${c.dot}`} />
                    
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
/* ------------------------------------------------------------------ */
/* 5/6. Our Mission & Our Vision                                        */
/* ------------------------------------------------------------------ */

function MissionVision() {
  return (
    <section className="bg-white px-6 pt-8 pb-8 sm:pt-10 sm:pb-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[32px] bg-[#FCFCFA] p-10 ring-1 ring-slate-100">
            <Eyebrow number="05" color="emerald">
              Our Mission
            </Eyebrow>
            <div className="mt-6 flex items-center gap-8">
              <p className="flex-1 text-[1.02rem] leading-relaxed text-slate-600">
                To bring globally brilliant innovators, researchers, startups
                and institutions together to solve real-world problems using
                AI, creating a positive and measurable impact aligned with the
                United Nations Sustainable Development Goals.
              </p>
              <div className="relative h-40 w-40 flex-shrink-0 sm:h-48 sm:w-48">
                <Image
                  src="/mission.png"
                  alt="Our Mission"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="rounded-[32px] bg-[#FCFCFA] p-10 ring-1 ring-slate-100">
            <Eyebrow number="06" color="blue">
              Our Vision
            </Eyebrow>
            <div className="mt-6 flex items-center gap-8">
              <p className="flex-1 text-[1.02rem] leading-relaxed text-slate-600">
                To establish a global ecosystem where technology, academia,
                industry and policy — accelerated by responsible AI — work
                together for a sustainable, equitable and intelligent world.
              </p>
              <div className="relative h-40 w-40 flex-shrink-0 sm:h-48 sm:w-48">
                <Image
                  src="/vision.png"
                  alt="Our Vision"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Organized & Hosted By                                            */
/* ------------------------------------------------------------------ */

function OrganizedAndHostedBy() {
  return (
    <section className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Eyebrow number="07" color="teal">
          Organized &amp; Hosted By
        </Eyebrow>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* University */}
          <div className="rounded-[32px] bg-white p-10 shadow-[0_8px_40px_rgba(15,23,42,0.05)] ring-1 ring-slate-100">
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 flex-shrink-0">
                <Image src="/bvu-logo.png" alt="Bharati Vidyapeeth logo" fill className="object-contain" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Bharati Vidyapeeth (Deemed to be University)
                <br />
                College of Engineering
              </h3>
            </div>

            <ul className="mt-6 space-y-3">
              {[
                "NAAC A++ Accredited (2nd Cycle) by NAAC with CGPA 3.52/4.00",
                "Category-I Deemed University Status by UGC",
                "Ranked Among Top Private Universities in India",
                "A Multidisciplinary Academic Ecosystem",
                "Global Research & Innovation Leader",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <Check size={14} strokeWidth={2} />
                  </span>
                  <p className="text-[0.92rem] leading-relaxed text-slate-600">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Department */}
          <div className="rounded-[32px] bg-white p-10 shadow-[0_8px_40px_rgba(15,23,42,0.05)] ring-1 ring-slate-100">
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 flex-shrink-0">
                <Image src="/cse-logo.png" alt="Department of CSE logo" fill className="object-contain" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Department of
                <br />
                Computer Science &amp; Engineering
              </h3>
            </div>

            <ul className="mt-6 space-y-3">
              {[
                "Established in 1983 | Academic Excellence for Over 40+ Years",
                "NBA Accredited UG & PG Programs",
                "State-of-the-Art Research & Computing Facilities",
                "Strong Industry Collaborations",
                "Vibrant Startup & Innovation Ecosystem",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <Check size={14} strokeWidth={2} />
                  </span>
                  <p className="text-[0.92rem] leading-relaxed text-slate-600">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 8. A Global Ecosystem                                               */
/* ------------------------------------------------------------------ */

const stats: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "15+", label: "Countries", icon: Globe },
  { value: "500+", label: "Participants", icon: Users },
  { value: "100+", label: "Teams", icon: Users },
  { value: "50+", label: "Universities", icon: GraduationCap },
  {
    value: "30+ / 20+ / 15+",
    label: "Industry Mentors, International Experts, Jury Members",
    icon: Users,
  },
];



/* ------------------------------------------------------------------ */
/* CTA Banner                                                           */
/* ------------------------------------------------------------------ */

function CtaBanner() {
  return (
    <section className="px-6 pb-16">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[28px] bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 px-8 py-10 sm:px-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <p className="max-w-xl text-center text-lg font-medium leading-snug text-white sm:text-left sm:text-xl">
              Great events are built by great people.
            </p>
            <p className="mt-1 max-w-xl text-center text-sm leading-relaxed text-white/80 sm:text-left">
              Meet the minds and mentors who brought this vision to life — the organizers, faculty leads, and industry experts behind Global SDG-AI Hackathon 2026.
            </p>
          </div>
          <a
            href="/organizing-committee"
            className="flex-shrink-0 whitespace-nowrap rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Meet the team behind it →
          </a>
        </div>
      </div>
    </section>
  );
}