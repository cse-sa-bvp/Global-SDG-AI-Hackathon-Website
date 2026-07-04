import Link from "next/link";
import { ArrowRight, CalendarDays, Globe2, MapPin, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BrochurePage() {
  return (
    <main className="bg-white text-neutral-900">
      <section className="border-b border-neutral-200 bg-[#fbfbfa] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">Brochure</div>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">Global SDG-AI Hackathon 2026</h1>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-neutral-600 sm:text-lg">
              A concise preview page for the event brochure, with the same polished visual language as the homepage.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href="#highlights">View Highlights</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-6">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights" className="py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 lg:grid-cols-3 lg:px-8">
          {[
            { title: "Dates", description: "25-27 September 2026", icon: CalendarDays },
            { title: "Location", description: "Pune, Maharashtra", icon: MapPin },
            { title: "Theme", description: "AI for SDG impact", icon: Globe2 },
          ].map((item) => (
            <article key={item.title} className="rounded-3xl border border-neutral-200 bg-[#fbfbfa] p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
              <div className="inline-flex size-11 items-center justify-center rounded-2xl border border-neutral-200 bg-white text-neutral-900">
                <item.icon className="size-5" />
              </div>
              <h2 className="mt-6 text-lg font-semibold tracking-tight text-neutral-950">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-600">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-7xl px-6 lg:px-8">
          <div className="rounded-4xl border border-neutral-200 bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">Download</div>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">
                  The brochure page is ready to be linked to a final PDF asset whenever the design team exports it.
                </p>
              </div>
              <Button asChild size="lg" className="rounded-full px-6">
                <Link href="/contact">
                  Contact Team
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}