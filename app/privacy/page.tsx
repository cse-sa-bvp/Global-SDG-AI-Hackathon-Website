import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPage() {
  return (
    <main className="bg-white text-neutral-900">
      <section className="mx-auto max-w-4xl px-6 py-20 sm:py-24 lg:px-8">
        <div className="text-xs font-semibold uppercase tracking-[0.32em] text-neutral-500">Privacy Policy</div>
        <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-base leading-7 text-neutral-600 sm:text-lg">
          This placeholder page can be replaced with the final policy text before launch.
        </p>
        <div className="mt-8">
          <Button asChild size="lg" className="rounded-full px-6">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}