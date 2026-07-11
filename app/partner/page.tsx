import { Allura } from "next/font/google";
import {
  Globe,
  Users,
  Rocket,
  Trophy,
  Handshake,
  Crown,
  Gem,
  Award,
  Shield,
  UserCheck,
  Building2,
  FlaskConical,
  Landmark,
  Sprout,
  Gauge,
  HeartHandshake,
  CheckCircle2,
  Mail,
  Phone,
  ArrowRight,
  Download,
} from "lucide-react";

/* -------------------------------------------------------------------------
 * Fonts — Allura is the same script family used for "Partner" in the hero;
 * reuse it anywhere else a handwritten accent word appears.
 * ---------------------------------------------------------------------- */

const allura = Allura({ subsets: ["latin"], weight: "400" });

/* -------------------------------------------------------------------------
 * Data
 * ---------------------------------------------------------------------- */

const whyPartner = [
  {
    icon: Globe,
    title: "Global\nVisibility",
    desc: "Showcase your brand to a diverse global audience passionate about AI and sustainable impact.",
    accent: "text-emerald-500",
    bg: "bg-emerald-50",
    line: "bg-emerald-500",
  },
  {
    icon: Users,
    title: "Access to\nTop Talent",
    desc: "Connect with exceptional innovators, researchers and future-ready AI talent.",
    accent: "text-violet-500",
    bg: "bg-violet-50",
    line: "bg-violet-500",
  },
  {
    icon: Rocket,
    title: "Innovation\nEcosystem",
    desc: "Collaborate with academia, industry and startups to co-create breakthrough AI solutions.",
    accent: "text-blue-500",
    bg: "bg-blue-50",
    line: "bg-blue-500",
  },
  {
    icon: Trophy,
    title: "Meaningful\nImpact",
    desc: "Drive real-world change by supporting AI innovations that align with the UN Sustainable Development Goals.",
    accent: "text-teal-500",
    bg: "bg-teal-50",
    line: "bg-teal-500",
  },
];

// Reordered to follow a natural sales flow: visibility → talent →
// recruitment → collaboration → recognition → CSR.
const sponsorshipBenefits = [
  "Brand Visibility",
  "Global Audience",
  "Access to Top Talent",
  "Recruitment Opportunities",
  "Research Collaboration",
  "Startup Ecosystem",
  "Industry Recognition",
  "CSR & SDG Impact",
];

const tiers = [
  {
    icon: Crown,
    name: "Title Sponsor",
    price: "₹10 Lakhs+",
    desc: "Maximum visibility and exclusive partnership benefits across the event.",
    accent: "text-emerald-600",
    bg: "bg-emerald-50",
    line: "bg-emerald-500",
    ring: "ring-emerald-200",
  },
  {
    icon: Gem,
    name: "Platinum",
    price: "₹5 Lakhs+",
    desc: "Premium branding and engagement with exclusive opportunities.",
    accent: "text-violet-600",
    bg: "bg-violet-50",
    line: "bg-violet-500",
    ring: "ring-transparent",
  },
  {
    icon: Award,
    name: "Gold",
    price: "₹2.5 Lakhs+",
    desc: "Strong visibility with key benefits and networking opportunities.",
    accent: "text-amber-500",
    bg: "bg-amber-50",
    line: "bg-amber-400",
    ring: "ring-transparent",
  },
  {
    icon: Shield,
    name: "Silver",
    price: "₹1 Lakh+",
    desc: "Enhanced brand presence and participation benefits.",
    accent: "text-blue-500",
    bg: "bg-blue-50",
    line: "bg-blue-500",
    ring: "ring-transparent",
  },
  {
    icon: Users,
    name: "Associate",
    price: "₹50,000+",
    desc: "Great visibility and association with a global initiative.",
    accent: "text-teal-500",
    bg: "bg-teal-50",
    line: "bg-teal-500",
    ring: "ring-transparent",
  },
];

const matrixRows: {
  icon: React.ElementType;
  label: string;
  values: string[];
}[] = [
  {
    icon: UserCheck,
    label: "Naming Rights",
    values: ["Full Event Naming Rights", "Premium Co-Branding", "Event Co-Branding", "-", "-"],
  },
  {
    icon: Award,
    label: "Branding",
    values: [
      "Prime Branding (All Platforms)",
      "Premium Branding (Web, Stage, Venue)",
      "Event Branding (Digital & On-site)",
      "Website Branding",
      "Logo on Website",
    ],
  },
  {
    icon: Users,
    label: "Jury Representation",
    values: ["Jury + Advisory Panel Seat", "Jury Panel Seat", "Jury Panel Seat", "-", "-"],
  },
  {
    icon: Rocket,
    label: "Keynote",
    values: ["Keynote + Special Address", "Session Address", "-", "-", "-"],
  },
  {
    icon: Building2,
    label: "Exhibition Booth",
    values: ["Prime Booth (Preferred Location)", "Standard Booth", "Booth (Shared Area)", "-", "-"],
  },
  {
    icon: UserCheck,
    label: "Recruitment",
    values: ["Full Access + Priority", "Recruitment Access", "Talent Access", "-", "-"],
  },
  {
    icon: Award,
    label: "Certificate Branding",
    values: ["Logo on Certificates (Main)", "Logo on Certificates", "Logo on Certificates", "-", "-"],
  },
  {
    icon: Globe,
    label: "Website Promotion",
    values: ["Featured Placement", "Priority Placement", "Standard Placement", "Logo Listing", "Logo Listing"],
  },
  {
    icon: Rocket,
    label: "Social Media Recognition",
    values: [
      "Dedicated Posts + Campaigns",
      "Priority Recognition",
      "Standard Recognition",
      "Mention",
      "Mention",
    ],
  },
];

const invitees = [
  { icon: Users, label: "Industry\nLeaders", color: "text-emerald-500", bg: "bg-emerald-50" },
  { icon: Building2, label: "Technology\nCompanies", color: "text-violet-500", bg: "bg-violet-50" },
  { icon: Rocket, label: "Startups", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: FlaskConical, label: "Research\nOrganizations", color: "text-orange-500", bg: "bg-orange-50" },
  {
    icon: Landmark,
    label: "Professional\nSocieties",
    sublabel: "IEEE • ACM • CSI • IET",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  { icon: Sprout, label: "Incubators", color: "text-rose-500", bg: "bg-rose-50" },
  { icon: Gauge, label: "Accelerators", color: "text-emerald-500", bg: "bg-emerald-50" },
  { icon: HeartHandshake, label: "CSR\nInitiatives", color: "text-violet-500", bg: "bg-violet-50" },
];

const tableHeaders = [
  { label: "Title", accent: "text-emerald-700", bg: "bg-emerald-50" },
  { label: "Platinum", accent: "text-violet-700", bg: "bg-violet-50" },
  { label: "Gold", accent: "text-amber-700", bg: "bg-amber-50" },
  { label: "Silver", accent: "text-blue-700", bg: "bg-blue-50" },
  { label: "Associate", accent: "text-teal-700", bg: "bg-teal-50" },
];

/* -------------------------------------------------------------------------
 * Small building blocks
 * ---------------------------------------------------------------------- */

function SectionHeading({
  eyebrow,
  title,
  scriptWord,
  align = "center",
  accent = "bg-emerald-500",
}: {
  eyebrow: string;
  title: string;
  scriptWord?: string;
  align?: "center" | "left";
  accent?: string;
}) {
  const isCenter = align === "center";
  return (
    <div className={`mb-10 ${isCenter ? "text-center" : "text-left"}`}>
      <span
        className={`mb-3 inline-block text-xs font-bold tracking-[0.2em] text-violet-600 uppercase`}
      >
        {eyebrow}
      </span>
      <h2
        className={`text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900`}
      >
        {title}
        {scriptWord && (
          <>
            {" "}
            <span className={`${allura.className} text-4xl md:text-5xl font-normal text-emerald-500`}>
              {scriptWord}
            </span>
          </>
        )}
      </h2>
      <span
        className={`mt-4 block h-[3px] w-12 rounded-full ${accent} ${isCenter ? "mx-auto" : ""}`}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Page
 * ---------------------------------------------------------------------- */

export default function PartnerWithUsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50/40 via-white to-white text-slate-800">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* ---------------- Hero ---------------- */}
        <section className="text-center mb-16">
          <span className="inline-block rounded-full bg-emerald-50 px-4 py-1 text-[11px] font-semibold tracking-widest text-emerald-600 uppercase mb-6">
            ✦ Partnership ✦
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
            <span className={`${allura.className} text-6xl md:text-7xl font-normal text-emerald-500`}>
              Partner
            </span>{" "}
            With Us
          </h1>
          <p className="mx-auto max-w-xl text-slate-500 text-[15px] leading-relaxed">
            Become part of a global initiative empowering AI-driven
            innovation for the United Nations Sustainable Development Goals.
          </p>
        </section>

        {/* ---------------- Why Partner ---------------- */}
        <section className="mb-16">
          <SectionHeading eyebrow="Benefits" title="Why Partner?" accent="bg-violet-500" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyPartner.map(({ icon: Icon, title, desc, accent, bg, line }) => (
              <div
                key={title}
                className="group rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60"
              >
                <div
                  className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${bg} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className={`h-8 w-8 ${accent}`} />
                </div>
                <h3 className="mb-2 whitespace-pre-line text-[15px] font-bold text-slate-900">
                  {title}
                </h3>
                <p className="mb-4 text-[13px] leading-relaxed text-slate-500">
                  {desc}
                </p>
                <span
                  className={`mx-auto block h-[3px] w-8 rounded-full ${line} transition-all duration-300 group-hover:w-12`}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- Sponsorship Benefits ---------------- */}
        <section className="mb-16">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-emerald-50/40 p-10">
            {/* decorative dot grid, echoes the pattern used on the About page */}
            <div
              className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #10b98155 1.5px, transparent 1.5px)",
                backgroundSize: "14px 14px",
              }}
            />
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-md ring-4 ring-emerald-100">
                <Handshake className="h-10 w-10 text-emerald-500" />
              </div>
              <div>
                <span className="mb-3 inline-block text-xs font-bold tracking-[0.2em] text-violet-600 uppercase">
                  Sponsorship Benefits
                </span>
                <h2 className="mb-6 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                  Sponsorship{" "}
                  <span className={`${allura.className} text-4xl md:text-5xl font-normal text-emerald-500`}>
                    Benefits
                  </span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
                  {sponsorshipBenefits.map((b) => (
                    <div key={b} className="flex items-center gap-2 text-[14px] text-slate-700">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Sponsorship Tiers ---------------- */}
        <section className="mb-16">
          <SectionHeading eyebrow="Investment" title="Sponsorship Tiers" accent="bg-emerald-500" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {tiers.map(({ icon: Icon, name, price, desc, accent, bg, line, ring }) => (
              <div
                key={name}
                className={`group rounded-2xl border bg-white p-6 text-center shadow-sm ring-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60 ${ring} ${
                  name === "Title Sponsor" ? "border-emerald-200" : "border-slate-100"
                }`}
              >
                <div
                  className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${bg} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className={`h-5 w-5 ${accent}`} />
                </div>
                <h3 className="mb-2 text-[15px] font-bold text-slate-900">{name}</h3>
                <p className={`mb-2 text-xl font-extrabold ${accent}`}>{price}</p>
                <span className={`mx-auto mb-3 block h-[3px] w-8 rounded-full ${line}`} />
                <p className="text-[12.5px] leading-relaxed text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- Sponsorship Comparison ---------------- */}
        <section className="mb-16">
          <SectionHeading eyebrow="Compare" title="Sponsorship Comparison" accent="bg-blue-500" />
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full min-w-[900px] border-separate border-spacing-0 text-left text-[13px]">
              <thead>
                <tr>
                  <th className="sticky left-0 z-10 border-b-2 border-slate-200 bg-slate-50 px-4 py-4 font-bold text-slate-700">
                    Benefits
                  </th>
                  {tableHeaders.map((h) => (
                    <th
                      key={h.label}
                      className={`border-b-2 border-l border-slate-200 px-4 py-4 text-center font-bold ${h.bg} ${h.accent}`}
                    >
                      {h.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrixRows.map(({ icon: Icon, label, values }, i) => (
                  <tr key={label} className="group">
                    <td
                      className={`sticky left-0 z-10 flex items-center gap-2 border-b border-slate-200 px-4 py-3.5 font-medium text-slate-700 ${
                        i % 2 === 0 ? "bg-white" : "bg-slate-50/70"
                      } transition-colors group-hover:bg-emerald-50/60`}
                    >
                      <Icon className="h-4 w-4 shrink-0 text-slate-400" />
                      {label}
                    </td>
                    {values.map((v, idx) => (
                      <td
                        key={idx}
                        className={`border-b border-l border-slate-200 px-4 py-3.5 text-center ${
                          v === "-" ? "text-slate-300" : "text-slate-600"
                        } ${
                          i % 2 === 0 ? "bg-white" : "bg-slate-50/70"
                        } transition-colors group-hover:bg-emerald-50/60`}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ---------------- Who We Invite ---------------- */}
        <section className="mb-16">
          <SectionHeading eyebrow="Community" title="Who We Invite" accent="bg-teal-500" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {invitees.map(({ icon: Icon, label, sublabel, color, bg }) => (
              <div
                key={label}
                className="group rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60"
              >
                <div
                  className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full ${bg} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className={`h-10 w-10 ${color}`} />
                </div>
                <p className="whitespace-pre-line text-[13.5px] font-bold text-slate-900">
                  {label}
                </p>
                {sublabel && (
                  <p className="mt-1 text-[11px] font-medium tracking-wide text-slate-400">
                    {sublabel}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- CTA + Contact ---------------- */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CTA */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-400 to-blue-500 p-10 text-white shadow-lg shadow-emerald-200/50">
            <div
              className="pointer-events-none absolute -right-8 -bottom-8 h-44 w-44 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)",
                backgroundSize: "14px 14px",
              }}
            />
            <span className="mb-3 inline-block text-xs font-bold tracking-[0.2em] text-white/80 uppercase">
              Join Us
            </span>
            <h2 className="mb-3 text-3xl md:text-4xl font-extrabold tracking-tight">
              Ready to{" "}
              <span className={`${allura.className} text-4xl md:text-5xl font-normal`}>
                Partner?
              </span>
            </h2>
            <p className="mb-8 max-w-xs text-sm text-white/90">
              Join us in empowering the next generation of AI innovators
              solving global sustainability challenges.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-md">
                Become a Sponsor <ArrowRight className="h-4 w-4" />
              </button>
              <button className="flex items-center gap-2 rounded-full border border-white/60 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10">
                Download Sponsorship Brochure <Download className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Contact */}
          <div className="rounded-3xl border border-slate-100 bg-white p-10 shadow-sm transition-shadow duration-300 hover:shadow-md">
            <span className="mb-3 inline-block text-xs font-bold tracking-[0.2em] text-violet-600 uppercase">
              Contact
            </span>
            <h3 className="mb-1 text-lg font-bold text-slate-900">
              Department of Computer Science &amp; Engineering
            </h3>
            <p className="mb-5 text-sm text-slate-500">
              Bharati Vidyapeeth College of Engineering, Pune
            </p>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-600">
              <Mail className="h-4 w-4 text-emerald-500" />
              mmkasar@bharatividyapeeth.edu
            </div>
            <div className="mb-6 flex items-center gap-2 text-sm text-slate-600">
              <Phone className="h-4 w-4 text-emerald-500" />
              7588314185
            </div>
            <button className="flex items-center gap-2 rounded-full border border-emerald-500 px-5 py-2.5 text-sm font-semibold text-emerald-600 transition hover:-translate-y-0.5 hover:bg-emerald-50">
              <Users className="h-4 w-4" />
              Get in Touch <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}