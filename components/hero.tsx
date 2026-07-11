"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Allura } from 'next/font/google'
import { Button } from '@/components/ui/button'
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import DecryptedText from "@/components/DecryptedText";
import { transitionVariants } from "@/lib/utils";
import LanyardWithControls from "@/components/lanyard-with-controls";

// Allura only ships a single 400 weight, so it's applied on its own —
// don't combine it with font-black/tracking-tighter, those fight the script glyphs.
const allura = Allura({
    subsets: ["latin"],
    weight: "400",
    display: "swap",
});

// Mirrors Tailwind's `lg` breakpoint (1024px). Used to mount ONLY the mobile
// OR desktop LanyardWithControls, never both. Previously both were mounted
// at once and one was merely hidden with Tailwind's `hidden` class — but
// `display: none` does NOT stop a <canvas> from allocating a real WebGL
// context. Two simultaneous Three.js/WebGL contexts (each with its own
// physics world, GLTF, and textures) roughly doubles GPU memory pressure,
// which contributes to the browser force-killing a context
// ("THREE.WebGLRenderer: Context Lost").
function useIsDesktop() {
    const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

    useEffect(() => {
        const mql = window.matchMedia("(min-width: 1024px)");
        setIsDesktop(mql.matches);
        const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
        mql.addEventListener("change", handler);
        return () => mql.removeEventListener("change", handler);
    }, []);

    return isDesktop;
}

export default function HeroSection() {
    const isDesktop = useIsDesktop();

    return (
        <main className="bg-white text-neutral-900">
            <section className="relative">
                {/* Decorative radial-gradient background */}
                <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.14),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(16,185,129,0.16),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(234,179,8,0.08),transparent_26%)]" />

                <div className="relative mx-auto min-h-[calc(100svh-4rem)] max-w-7xl px-6 py-20 lg:px-8 lg:py-24">

                    {/* ── Left text column ──────────────────────────────────────── */}
                    <div className="mx-auto flex w-full max-w-3xl flex-col justify-center pt-4 text-center
                                    lg:mx-0 lg:max-w-[55%] lg:pt-10 lg:text-left">

                        <div className="inline-flex w-fit items-center rounded-full border border-cyan-200 bg-cyan-50
                                        px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700">
                            Global SDG-AI Hackathon
                        </div>

                        <div className="mt-8">
                            <DecryptedText
                                text="25–27 SEPTEMBER 2026 • PUNE, INDIA"
                                animateOn="view"
                                revealDirection="start"
                                sequential
                                useOriginalCharsOnly={false}
                                speed={70}
                                className="font-mono text-xs uppercase tracking-[0.34em] text-neutral-500 sm:text-sm"
                            />
                        </div>

                        <TextEffect
                            preset="fade-in-blur"
                            speedSegment={0.3}
                            as="h1"
                            className="mt-5 text-balance text-4xl font-black leading-[0.92] tracking-tighter
                                       text-neutral-950 sm:text-5xl lg:text-6xl xl:text-7xl">
                            Build AI Solutions.
                        </TextEffect>

                        <motion.h1
                            initial={{ opacity: 0, filter: "blur(12px)", y: 8 }}
                            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                            transition={{ duration: 0.55, delay: 0.3, ease: "easeOut" }}
                            className="mt-2 text-balance leading-[1.1]"
                        >
                            <span
                                className={`${allura.className} text-5xl sm:text-6xl lg:text-7xl xl:text-8xl`}
                                style={{
                                    background: "linear-gradient(to right, #0284c7, #7c3aed, #059669)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    // Allura only ships a 400 weight, so `font-weight` alone won't
                                    // thicken it. A thin stroke in a matching hue + a soft shadow
                                    // fakes extra boldness without breaking the gradient fill.
                                    WebkitTextStroke: "0.6px #7c3aed",
                                    textShadow: "0 0 1px rgba(124, 58, 237, 0.35)",
                                }}
                            >
                                Shape a Sustainable Future.
                            </span>
                        </motion.h1>

                        <TextEffect
                            per="line"
                            preset="fade-in-blur"
                            speedSegment={0.3}
                            delay={0.4}
                            as="p"
                            className="mt-8 max-w-2xl text-pretty text-base leading-7 text-neutral-600 sm:text-lg">
                            Join Bharati Vidyapeeth's flagship AI hackathon and collaborate with students,
                            developers, and innovators to build impactful solutions aligned with the United
                            Nations Sustainable Development Goals.
                        </TextEffect>

                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.65,
                                        },
                                    },
                                },
                                ...transitionVariants,
                            } as any}
                            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
                        >
                            <Button
                                asChild
                                size="lg"
                                className="w-full px-6 text-base sm:w-auto bg-neutral-950 text-white hover:bg-neutral-800">
                                <Link href="#link">
                                    <span className="text-nowrap">Register Now →</span>
                                </Link>
                            </Button>
                            <Button
                                key={2}
                                asChild
                                size="lg"
                                variant="ghost"
                                className="w-full border border-neutral-200 px-6 text-base hover:bg-neutral-100 sm:w-auto">
                                <Link href="#link">
                                    <span className="text-nowrap">Download Brochure</span>
                                </Link>
                            </Button>
                        </AnimatedGroup>
                    </div>

                    {/*
                     * ── Mobile lanyard (in-flow, below text) ───────────────────
                     * Bumped from h-[480/520px] → h-[560/600px] and widened the
                     * cap from 480px → 520px (bigger card on phones/tablets).
                     * mt-12 → mt-20 shifts the whole block further down, giving
                     * it more breathing room under the text column instead of
                     * crowding right up against the CTA buttons.
                     * Only mounted when isDesktop === false, so there's never
                     * more than one WebGL context alive at once. isDesktop
                     * starts as `null` on first client render (before the
                     * media query can be checked) so neither version renders
                     * until we actually know the viewport size — avoids a
                     * flash of both, or a hydration mismatch.
                     */}
                    {isDesktop === false && (
                        <div className="relative mt-20 flex w-full justify-center">
                            <LanyardWithControls
                                position={[0, 0, 13]}
                                containerClassName="relative h-[560px] w-full max-w-[520px] select-none sm:h-[600px]"
                                defaultName=""
                            />
                        </div>
                    )}
                </div>

                {/*
                 * ── Desktop lanyard (absolutely covers the right half of the section) ──
                 *
                 * Size bump: canvas height 560px → 680px, and camera moved
                 * closer (position z: 15 → 13) so the card itself renders
                 * noticeably larger relative to the section instead of just
                 * enlarging empty canvas space around it.
                 *
                 * Shift down: added pt-14 to the wrapping column. This column
                 * is absolutely positioned with `inset-y-0` (full section
                 * height) and its children stack from the top by default, so
                 * the padding is what actually pushes the card + "Personalize
                 * your card" controls down instead of sitting flush with the
                 * top of the section.
                 *
                 * If "Personalize your card" ends up clipped below the fold
                 * on shorter laptop screens, dial pt-14 back to pt-8/pt-10,
                 * or trim the canvas height slightly (e.g. 680px → 640px) —
                 * there's a direct tradeoff between card size/offset and how
                 * much of the control panel stays in view without scrolling.
                 *
                 * Only mounted when isDesktop === true — see note above.
                 */}
                {isDesktop === true && (
                    <div className="flex flex-col absolute inset-y-0 right-0 w-[50%] pt-14">
                        <LanyardWithControls
                            position={[0, 0, 13]}
                            containerClassName="h-[680px] w-full select-none"
                            defaultName=""
                            /*
                             * The 3D camera frames the card in roughly the top
                             * ~65-70% of the 680px canvas — the rest is empty,
                             * transparent space. A flat "mt-4" after the full
                             * canvas height left a big dead gap before the
                             * controls, which is what pushed "Personalize your
                             * card" past the section's bottom edge. Pulling the
                             * controls up with a negative margin closes that
                             * gap WITHOUT moving the canvas/card itself.
                             * If it looks too tight/loose against your actual
                             * card position, nudge this value up or down —
                             * nothing else needs to change.
                             */
                            controlsClassName="-mt-[168px] px-6 pb-8 relative z-10"
                        />
                    </div>
                )}
            </section>
        </main>
    )
}