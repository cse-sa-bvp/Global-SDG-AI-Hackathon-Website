"use client";

import Image from "next/image";

const trustedLogos = [
    { src: "/bvdu.png", alt: "Bharati Vidyapeeth (Deemed to be University)", width: 320, height: 110 },
    { src: "/bvducoep.jpeg", alt: "Bharati Vidyapeeth University College of Engineering, Pune", width: 220, height: 80 },
    { src: "/IEEE-Logo.jpg", alt: "IEEE - Advancing Technology for Humanity", width: 190, height: 100 },
    { src: "/Association_for_Computing_Machinery_(ACM)_logo.svg.webp", alt: "ACM - Association for Computing Machinery", width: 160, height: 100 },
    { src: "/CSI.jpeg", alt: "Computer Society of India", width: 120, height: 100 },
];

export default function TrustedBySection() {
    return (
        <section className="relative overflow-hidden bg-neutral-50 py-14 sm:py-16">
            <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
                {/* Eyebrow / Headline */}
                <div className="flex flex-col items-center text-center">
                    <div className="flex items-center gap-4">
                        <span className="h-px w-12 bg-gradient-to-r from-transparent to-violet-500" />
                        <span className="text-xs font-semibold uppercase tracking-[0.35em] bg-gradient-to-r from-emerald-600 via-teal-500 to-violet-500 bg-clip-text text-transparent">
                            Trusted By
                        </span>
                        <span className="h-px w-12 bg-gradient-to-l from-transparent to-teal-400" />
                    </div>
                    <h2 className="mt-3 text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                        Backed by leading institutions &amp; tech communities
                    </h2>
                </div>

                {/* Static logo row — one line, no scrollbar, shrinks to fit */}
                <div className="mt-10 flex flex-nowrap items-center justify-between gap-2 sm:gap-4 lg:gap-5">
                    {trustedLogos.map((logo) => (
                        <div
                            key={logo.alt}
                            className="flex min-w-0 flex-1 items-center justify-center"
                        >
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={logo.width}
                                height={logo.height}
                                className={`w-auto max-w-full object-contain opacity-90 transition-all duration-300 hover:opacity-100 ${
                                    logo.alt.includes("College of Engineering")
                                        ? "h-10 sm:h-16 lg:h-20"
                                        : "h-12 sm:h-20 lg:h-24"
                                }`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}