"use client";

import { SectionIntro, SectionShell, TrackCard, tracks } from "./shared";

export default function TracksSection() {
  return (
    <SectionShell id="tracks" className="bg-[#FAFAF7]">
      <SectionIntro eyebrow="SDG Tracks" title="Choose Your Challenge" subtitle="Explore challenge tracks inspired by real-world problems and the UN Sustainable Development Goals." centered />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tracks.map((track) => <TrackCard key={track.title} {...track} />)}
      </div>
    </SectionShell>
  );
}