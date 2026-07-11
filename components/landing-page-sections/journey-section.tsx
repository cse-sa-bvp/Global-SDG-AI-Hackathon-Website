import Image from "next/image";
import { Sparkles } from "lucide-react";
import { Allura } from "next/font/google";

// Allura is the cursive/script display font used for "Journey." and "Impact."
const allura = Allura({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-allura",
});

export default function TimelineSection() {
  return (
    <section id="timeline" className={`${allura.variable} relative overflow-hidden bg-[#FAFAF7] py-20 px-6`}>
      {/* subtle decorative dot grids in the corners, like the reference */}
      <div
        className="pointer-events-none absolute left-6 top-10 h-28 w-28 opacity-40"
        style={{
          backgroundImage: "radial-gradient(#c7cbe0 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px",
        }}
      />
      <div
        className="pointer-events-none absolute right-6 top-10 h-28 w-28 opacity-40"
        style={{
          backgroundImage: "radial-gradient(#c7cbe0 1.5px, transparent 1.5px)",
          backgroundSize: "14px 14px",
        }}
      />

      <div className="relative mx-auto max-w-6xl text-center">
        {/* Eyebrow badge */}
        <div className="mb-6 inline-flex items-center rounded-full bg-[#E8EAFB] px-5 py-2">
          <span className="text-xs font-bold tracking-[0.15em] text-[#4B4FE0]">
            EVENT TIMELINE
          </span>
        </div>

        {/* Heading */}
        <h2 className="flex flex-wrap items-baseline justify-center gap-x-4 text-4xl font-extrabold text-[#12142B] sm:text-5xl">
          <span>Every Innovation Has a </span>
          
          {/* <span
            className="bg-[#0c8f63]  bg-clip-text text-transparent pb-1"
            style={{ fontFamily: "var(--font-allura)", fontSize: "1.7em", fontWeight: 600 }}
          >
            
            
          </span> */}
          
          <span
            className="bg-gradient-to-r  from-[#3a81f3] to-[#11c88b] via-[#4ab4f5] bg-clip-text text-transparent pb-1.5"
            style={{ fontFamily: "var(--font-allura)", fontSize: "1.7em", fontWeight: 600 }}
          >
            Journey.
          </span>
        </h2>

        {/* Divider */}
        <div className="mt-4 mb-6 flex items-center justify-center gap-2">
          <span className="h-[3px] w-14 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#10B981]" />
          <span className="flex gap-1">
            <span className="h-1 w-1 rounded-full bg-[#9CA3AF]" />
            <span className="h-1 w-1 rounded-full bg-[#9CA3AF]" />
            <span className="h-1 w-1 rounded-full bg-[#9CA3AF]" />
          </span>
        </div>

        {/* Subtitle */}
        <p className="mx-auto max-w-xl text-base text-[#5B5F72] sm:text-lg">
          Every great solution begins with an idea. Here's how yours evolves into real-world impact.
        </p>

        {/* Roadmap graphic (pre-made image, used as-is) */}
        <div className="relative mx-auto mt-14 w-full max-w-6xl">
          <Image
            src="/roadmap.png"
            alt="Hackathon journey roadmap: Registration & Idea Submission, Shortlisting & Evaluation, 48-Hour Grand Hackathon, Awards & Recognition Ceremony, Innovation Expo & Startup Showcase, Final Pitch & Awards"
            width={1536}
            height={1024}
            className="h-auto w-full"
            priority
          />
        </div>

        {/* Bottom tag */}
        <div className="mt-12 inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-white px-6 py-3 shadow-[0_2px_10px_rgba(17,17,38,0.06)]">
          <Sparkles className="h-4 w-4 text-[#4B4FE0]" strokeWidth={2.5} />
          <span className="text-sm text-[#3A3D4D]">
            One idea. One team. One impact.
          </span>
          <span className="text-sm text-[#C7C9D6]">|</span>
          <span className="text-sm font-semibold text-[#3B5BFF]">
            Be a part of the change.
          </span>
        </div>
      </div>
    </section>
  );
}