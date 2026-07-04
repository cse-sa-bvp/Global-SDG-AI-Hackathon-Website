import Link from "next/link";
import { ArrowRight, Brain, Building2, Droplets, Factory, GraduationCap, Leaf, Rocket, SunMedium, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";

const tracks = [
  {
    title: "Healthcare",
    description: "Build AI that improves access, triage, and care outcomes.",
    icon: Brain,
  },
  {
    title: "Education",
    description: "Create learning tools that adapt to every student.",
    icon: GraduationCap,
  },
  {
    title: "Climate Action",
    description: "Turn environmental data into decisions that reduce impact.",
    icon: Leaf,
  },
  {
    title: "Agriculture",
    description: "Support farmers with intelligent, practical field tools.",
    icon: Factory,
  },
  {
    title: "Smart Cities",
    description: "Design city experiences that feel simpler and more responsive.",
    icon: Building2,
  },
  {
    title: "Water",
    description: "Use AI to protect, monitor, and distribute water wisely.",
    icon: Droplets,
  },
  {
    title: "Clean Energy",
    description: "Make energy systems more efficient and more predictable.",
    icon: SunMedium,
  },
  {
    title: "Industry & Innovation",
    description: "Build products that help teams ship, learn, and scale faster.",
    icon: Cpu,
  },
];

export default function TracksPage() {
  return (
    <main className="bg-white text-neutral-900">
      <section className="border-b border-neutral-200 bg-[#fbfbfa] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">Tracks</div>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">Choose the SDG theme that best matches your idea.</h1>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-neutral-600 sm:text-lg">
              These tracks mirror the themes shown on the homepage and give teams a clearer direction for problem framing, mentorship,
              and pitching.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href="/">
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {tracks.map((track) => (
              <article key={track.title} className="rounded-3xl border border-neutral-200 bg-[#fbfbfa] p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex size-11 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-900">
                    <track.icon className="size-5" />
                  </div>
                  <ArrowRight className="size-5 text-neutral-400" />
                </div>
                <h2 className="mt-8 text-lg font-semibold tracking-tight text-neutral-950">{track.title}</h2>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{track.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}