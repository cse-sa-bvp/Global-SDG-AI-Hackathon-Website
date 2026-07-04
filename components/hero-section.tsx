"use client";

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import DecryptedText from "@/components/DecryptedText";
import { transitionVariants } from "@/lib/utils";
import LanyardWithControls from "@/components/lanyard-with-controls";

export default function HeroSection() {
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
                            className="mt-2 text-balance text-4xl font-black leading-[0.92] tracking-tighter
                                       sm:text-5xl lg:text-6xl xl:text-7xl"
                        >
                            <span
                                style={{
                                    background: "linear-gradient(to right, #0284c7, #7c3aed, #059669)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
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

                    {/* ── Mobile lanyard (in-flow, below text) ─────────────────── */}
                    <div className="relative mt-12 flex w-full justify-center lg:hidden">
                        <LanyardWithControls
                            position={[0, 0, 15]}
                            containerClassName="relative h-[480px] w-full max-w-[480px] select-none sm:h-[520px]"
                            defaultName=""
                        />
                    </div>
                </div>

                {/*
                 * ── Desktop lanyard (absolutely covers the right half of the section) ──
                 *
                 * Canvas height reduced 620px → 460px.
                 * The Three.js camera hangs the card in roughly the top 65–70 % of
                 * the canvas height. At 620px that left ~190px of blank canvas before
                 * the controls div — too much. At 460px the gap shrinks to ~60–70px,
                 * bringing "Personalize your card" + the input fully into the viewport
                 * without clipping the card's idle position or its swing arc.
                 */}
                <div className="hidden lg:flex lg:flex-col absolute inset-y-0 right-0 w-[50%]">
                    <LanyardWithControls
                        position={[0, 0, 15]}
                        containerClassName="h-[560px] w-full select-none"
                        defaultName=""
                    />
                </div>
            </section>
        </main>
    )
}