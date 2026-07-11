import Image from 'next/image'
import Link from 'next/link'
import { Montserrat } from 'next/font/google'
import { ArrowRight, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["700", "800"],
    display: "swap",
});

export default function HeroSection() {
    return (
        <main className="bg-white pt-16">
            <section className="relative">
                <Image
                    src="/Hero.png"
                    alt="Hackathon hero"
                    width={1920}
                    height={1080}
                    className="w-full h-auto"
                    priority
                />

                {/*
                 * ── Bharati Vidyapeeth header overlay ───────────────────────
                 * Logo + two stacked uppercase lines, Montserrat font, wide
                 * letter-spacing to match the reference creative.
                 */}
                {/* <div className="absolute inset-x-0 top-4 sm:top-14 md:top-14 flex items-center justify-center gap-1 sm:gap-4 px-4">
                    <Image
                        src="/bvdu.png"
                        alt="Bharati Vidyapeeth logo"
                        width={124}
                        height={124}
                        className="h-18 w-18 sm:h-20 sm:w-20 md:h-28 md:w-28 object-contain shrink-0"
                        priority
                    />
                    <div className={`${montserrat.className} flex flex-col leading-tight text-left`}>
                        <span className="text-[#000000] font-bold uppercase tracking-[0.12em] text-xl sm:text-xl md:text-2xl lg:text-3xl">
                            Bharati Vidyapeeth
                        </span>
                        <span className="text-[#000000] font-semibold uppercase tracking-[0.12em] text-[10px] sm:text-sm md:text-base lg:text-lg text-center">
                            College of Engineering, Pune
                        </span>
                    </div>
                </div> */}

                {/*
                 * ── Tagline + CTA buttons ────────────────────────────────────
                 * Tagline now has its own bottom margin (mb-6/8) instead of
                 * relying on the parent's gap, pushing it further above the
                 * button row. Buttons: rounded-full pill shape, soft shadow
                 * that deepens on hover, subtle lift + scale transition, and
                 * a thin border on the secondary button — reads as a
                 * polished, intentional CTA pair rather than default
                 * bootstrap-y buttons. gap-5/6 between the two buttons.
                 */}
                {/* <div className="absolute inset-x-0 bottom-6 sm:bottom-10 md:bottom-14 flex flex-col items-center justify-center px-4">
                    <p className={`${montserrat.className} mb-6 sm:mb-7 md:mb-8 text-center text-[#345027] font-semibold uppercase tracking-[0.2em] text-[14px] sm:text-md md:text-md`}>
                        Leveraging AI for a better, sustainable world.
                    </p>

                    <div className="flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-6">
                        <Button
                            asChild
                            size="lg"
                            className="h-12 md:h-14 w-full gap-2 rounded-full bg-neutral-950 px-9 text-base md:text-lg font-semibold text-white
                                       shadow-[0_8px_24px_-6px_rgba(0,0,0,0.45)] transition-all duration-300
                                       hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.55)]
                                       active:translate-y-0 sm:w-auto">
                            <Link href="#link">
                                <span className="text-nowrap">Register Now</span>
                                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="ghost"
                            className="h-12 md:h-14 w-full gap-2 rounded-full border border-neutral-300 bg-white/95 px-9 text-base md:text-lg font-semibold
                                       text-neutral-900 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-all duration-300
                                       hover:-translate-y-0.5 hover:border-neutral-400 hover:bg-white hover:shadow-[0_12px_28px_-8px_rgba(0,0,0,0.25)]
                                       active:translate-y-0 sm:w-auto">
                            <Link href="#link">
                                <Download className="h-5 w-5" />
                                <span className="text-nowrap">Download Brochure</span>
                            </Link>
                        </Button>
                    </div>
                </div> */}
            </section>
        </main>
    )
}