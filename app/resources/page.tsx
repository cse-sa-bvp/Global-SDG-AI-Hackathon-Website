import type { Metadata } from "next";
import { Poppins, Allura, Inter } from "next/font/google";
import {
  FileText,
  ScrollText,
  ClipboardList,
  Presentation,
  Download,
  Clock,
  Mail,
  ArrowRight,
} from "lucide-react";

/**
 * DROP-IN NOTES
 * -------------
 * 1. Save this file as: app/resources/page.tsx
 * 2. Put the brochure PDF at: public/resources/brochure.pdf
 *    (update BROCHURE_HREF below if you name/path it differently)
 * 3. When the Rulebook / Guidelines / PPT template files are ready,
 *    add them to /public/resources/ and flip `available: true` +
 *    set `href` in the RESOURCES array below. That's the only edit needed.
 * 4. Requires `lucide-react` (npm i lucide-react) — you likely already
 *    have it if other sections of the site use icons.
 * 5. Fonts are loaded locally via next/font so this page matches your
 *    theme with zero config changes. If Poppins / Allura / Inter are
 *    already defined globally in layout.tsx, delete the font setup
 *    below and swap in your existing classNames instead.
 */

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

// Allura is reserved for single emphasis words only (e.g. "Resources",
// "Downloads", "Ready") — never for document titles or body copy.
const allura = Allura({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "Resources | Global SDG-AI Hackathon 2026",
  description:
    "Download the official brochure, rulebook, participation guidelines and pitch deck template for the Global SDG-AI Hackathon 2026.",
};

const BROCHURE_HREF = "/resources/brochure.pdf";

// Shared gradient treatment for section titles — same green → blue used
// across the rest of the site. Light variant for dark hero, dark variant
// for white sections.
const GRADIENT_ON_DARK =
  "bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-transparent";
const GRADIENT_ON_LIGHT =
  "bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent";

type Resource = {
  id: string;
  title: string;
  description: string;
  meta: string;
  icon: React.ElementType;
  accent: "teal" | "blue" | "violet" | "amber";
  available: boolean;
  href?: string;
};

const RESOURCES: Resource[] = [
  {
    id: "brochure",
    title: "Official Brochure",
    description:
      "The complete event overview — tracks, timeline, prize pool, mentors and partner institutions, in one document.",
    meta: "PDF",
    icon: FileText,
    accent: "teal",
    available: true,
    href: BROCHURE_HREF,
  },
  {
    id: "rulebook",
    title: "Rulebook",
    description:
      "Team composition, eligibility, code-of-conduct, judging criteria and disqualification rules for the 48-hour build.",
    meta: "PDF",
    icon: ScrollText,
    accent: "blue",
    available: false,
  },
  {
    id: "guidelines",
    title: "Participation Guidelines",
    description:
      "Step-by-step guidance on registering, forming a team, submitting your idea, and what to bring on hackathon day.",
    meta: "PDF",
    icon: ClipboardList,
    accent: "violet",
    available: false,
  },
  {
    id: "ppt-template",
    title: "Pitch Deck Template",
    description:
      "The official slide template for your Grand Finale pitch — use it to stay within the judging format and time limit.",
    meta: "PPTX",
    icon: Presentation,
    accent: "amber",
    available: false,
  },
];

const ACCENTS: Record<
  Resource["accent"],
  { iconBg: string; iconText: string; badge: string }
> = {
  teal: {
    iconBg: "bg-emerald-50",
    iconText: "text-emerald-600",
    badge: "bg-emerald-50 text-emerald-700",
  },
  blue: {
    iconBg: "bg-sky-50",
    iconText: "text-sky-600",
    badge: "bg-sky-50 text-sky-700",
  },
  violet: {
    iconBg: "bg-violet-50",
    iconText: "text-violet-600",
    badge: "bg-violet-50 text-violet-700",
  },
  amber: {
    iconBg: "bg-amber-50",
    iconText: "text-amber-600",
    badge: "bg-amber-50 text-amber-700",
  },
};

// Subtle two-tone glow on hover — green + blue, matching the About page.
const CARD_GLOW =
  "hover:shadow-[0_18px_40px_-18px_rgba(16,185,129,0.28),0_14px_34px_-16px_rgba(56,189,248,0.22)]";

export default function ResourcesPage() {
  return (
    <main
      className={`${poppins.variable} ${inter.variable} ${allura.variable} font-[var(--font-body)] bg-[#f6f7f5]`}
    >
      {/* ---------- HERO ---------- */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0a2e26] via-[#0c3a30] to-[#0f4a3c] px-6 py-28 text-center sm:py-32">
        <div className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-sky-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          <span className="inline-block rounded-full border border-emerald-300/30 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-emerald-200">
            RESOURCE HUB
          </span>

          <h1 className="mt-7 font-[var(--font-heading)] text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Your hackathon{" "}
            <span
              className={`font-[var(--font-script)] text-6xl font-normal sm:text-7xl ${GRADIENT_ON_DARK}`}
            >
              Resources
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-emerald-50/70 sm:text-lg">
            Official documents for the Global SDG-AI Hackathon 2026 — read
            them before you register, and keep them handy through submission
            day.
          </p>
        </div>
      </section>

      {/* ---------- RESOURCE GRID ---------- */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-14 text-center">
          <h2 className="font-[var(--font-heading)] text-3xl font-bold text-neutral-900 sm:text-4xl">
            Available{" "}
            <span
              className={`font-[var(--font-script)] text-5xl font-normal sm:text-6xl ${GRADIENT_ON_LIGHT}`}
            >
              Downloads
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {RESOURCES.map((resource) => {
            const accent = ACCENTS[resource.accent];
            const Icon = resource.icon;

            return (
              <div
                key={resource.id}
                className={`group flex flex-col rounded-[28px] border border-black/5 bg-white p-8 shadow-[0_1px_2px_rgba(16,24,21,0.05)] transition-all duration-300 hover:-translate-y-1 ${CARD_GLOW}`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accent.iconBg}`}
                  >
                    <Icon
                      className={`h-5 w-5 ${accent.iconText}`}
                      strokeWidth={1.75}
                    />
                  </div>

                  {!resource.available && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/[0.04] px-3 py-1 text-xs font-medium text-neutral-500">
                      <Clock className="h-3 w-3" strokeWidth={1.75} />
                      Coming soon
                    </span>
                  )}
                </div>

                <h3 className="mt-6 font-[var(--font-heading)] text-lg font-semibold text-neutral-900">
                  {resource.title}
                </h3>

                <p className="mt-2.5 text-sm leading-relaxed text-neutral-500">
                  {resource.description}
                </p>

                <div className="mt-7 flex items-center justify-between">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${accent.badge}`}
                  >
                    {resource.meta}
                  </span>

                  {resource.available && resource.href ? (
                    <a
                      href={resource.href}
                      download
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#0f4a3c] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0c3a30]"
                    >
                      Download
                      <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
                    </a>
                  ) : (
                    <span
                      aria-disabled="true"
                      className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-400"
                    >
                      Download
                      <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------- BEFORE YOU DOWNLOAD ---------- */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div
          className={`rounded-[28px] border border-black/5 bg-white p-9 transition-all duration-300 sm:p-11 ${CARD_GLOW}`}
        >
          <h2 className="font-[var(--font-heading)] text-xl font-semibold text-neutral-900 sm:text-2xl">
            Before you download
          </h2>

          <ul className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {[
              "Always refer to the brochure version linked here — it supersedes any earlier copies shared elsewhere.",
              "The rulebook is binding for all registered teams; disputes are resolved as per its judging and conduct sections.",
              "Follow the pitch deck template's slide count and time limit exactly for the Grand Finale round.",
              "Resources are updated as the event approaches — check back before the hackathon for the latest versions.",
            ].map((line, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm leading-relaxed text-neutral-600"
              >
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500" />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- HELP CTA ---------- */}
      <section className="px-6 pb-28">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-7 rounded-[28px] bg-gradient-to-r from-[#0a2e26] to-[#124f3f] px-9 py-11 text-center sm:flex-row sm:text-left sm:px-11">
          <div>
            <h3 className="font-[var(--font-heading)] text-xl font-semibold text-white sm:text-2xl">
              We're{" "}
              <span
                className={`font-[var(--font-script)] text-4xl font-normal sm:text-5xl ${GRADIENT_ON_DARK}`}
              >
                Ready
              </span>{" "}
              to help
            </h3>
            <p className="mt-2.5 text-sm text-emerald-50/70">
              Can't find what you're looking for? Reach out to the organizing
              team and we'll point you the right way.
            </p>
          </div>

          <a
            href="mailto:sdgaihackathon@bvucoep.edu.in"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0f4a3c] transition-colors hover:bg-emerald-50"
          >
            <Mail className="h-4 w-4" strokeWidth={1.75} />
            Contact us
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </a>
        </div>
      </section>
    </main>
  );
}