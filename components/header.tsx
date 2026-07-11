'use client'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { doc, getDoc } from '@/lib/firebase/firestore'
import { db } from '@/lib/firebase/firestore'
import type { User, Team } from '@/types'

const navLinks = [
    { label: 'Home', href: '/#home' },
    { label: 'About', href: '/#about' },
    { label: 'Tracks', href: '/#tracks' },
    { label: 'Timeline', href: '/#timeline' },
    { label: 'Prizes', href: '/#prizes' },
    { label: 'FAQs', href: '/#faqs' },
]

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeHref, setActiveHref] = useState('#home')
    const { user, loading } = useAuth()
    const router = useRouter()

    // Past this scroll offset the header leaves the hero and becomes the
    // floating, centered tubelight pill. Below it, it sits flush and
    // full-width like a normal in-page header.
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 80)
        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleRegisterClick = async () => {
        if (!user) {
            router.push('/auth/signup')
            return
        }
        router.push('/dashboard/team?action=register')
    }

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className={`fixed z-20 transition-all duration-500 ease-in-out ${
                    isScrolled
                        ? 'inset-x-0 top-4 mx-auto w-fit max-w-[calc(100%-2rem)] rounded-full border border-white/25 bg-white/10 shadow-lg shadow-black/10 backdrop-blur-xl backdrop-saturate-150 ring-1 ring-inset ring-white/10 dark:border-white/10 dark:bg-black/10'
                        : 'inset-x-0 top-0 w-full rounded-none border-b border-neutral-200/80 bg-[#FCFCFC] shadow-none backdrop-blur-none dark:border-white/10 dark:bg-neutral-950'
                }`}>
                <div
                    className={`mx-auto flex items-center transition-all duration-500 ease-in-out ${
                        isScrolled ? 'gap-6 px-4 py-2 lg:gap-8 lg:px-6 lg:py-2.5' : 'max-w-6xl justify-between gap-6 px-6 py-3 lg:gap-0 lg:py-4'
                    }`}>
                    <Link
                        href="/"
                        aria-label="home"
                        className="flex shrink-0 items-center gap-2">
                        <span
                            className={`inline-flex items-center justify-center rounded-full bg-neutral-950 text-white shadow-sm shadow-black/15 transition-all duration-500 dark:bg-white dark:text-neutral-950 ${
                                isScrolled ? 'size-7 text-xs' : 'size-8 text-sm'
                            }`}>
                            G
                        </span>
                        <span className="hidden font-semibold tracking-tight text-neutral-950 sm:inline dark:text-neutral-50">
                            Global SDG-AI Hackathon
                        </span>
                    </Link>

                    {/* Desktop nav — plain links at rest, tubelight pill once scrolled */}
                    <ul
                        className={`relative hidden items-center lg:flex ${
                            isScrolled ? 'gap-1' : 'gap-8'
                        }`}>
                        {navLinks.map((link) => (
                            <li key={link.href} className="relative">
                                <Link
                                    href={link.href}
                                    onClick={() => setActiveHref(link.href)}
                                    className={`relative z-10 block text-sm font-medium transition-all duration-300 ${
                                        isScrolled
                                            ? `rounded-full px-4 py-1.5 ${
                                                  activeHref === link.href
                                                      ? 'text-neutral-950 dark:text-white'
                                                      : 'text-neutral-700 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white'
                                              }`
                                            : 'text-neutral-700 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white'
                                    }`}>
                                    {link.label}
                                </Link>
                                {isScrolled && activeHref === link.href && (
                                    <span className="absolute inset-0 rounded-full border border-white/30 bg-white/25 backdrop-blur-sm dark:border-white/10 dark:bg-white/10">
                                        {/* the "tube" glow riding above the pill */}
                                        <span className="absolute -top-2 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-neutral-950 blur-[2px] dark:bg-white">
                                            <span className="absolute -top-1 left-1/2 h-4 w-8 -translate-x-1/2 rounded-full bg-neutral-950/20 blur-md dark:bg-white/30" />
                                        </span>
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>

                    <div className="hidden shrink-0 lg:block">
                        <Button
                            onClick={handleRegisterClick}
                            size="sm"
                            className={`transition-all duration-500 ${isScrolled ? 'rounded-full' : 'rounded-md'}`}
                            disabled={loading}>
                            <span>Register Now</span>
                        </Button>
                    </div>

                    <button
                        onClick={() => setMenuState(!menuState)}
                        aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                        className="relative -mr-1 block shrink-0 cursor-pointer rounded-full p-2 text-neutral-950 lg:hidden dark:text-neutral-50">
                        <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-5 duration-200" />
                        <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-5 -rotate-180 scale-0 opacity-0 duration-200" />
                    </button>
                </div>

                {/* Mobile dropdown menu */}
                {menuState && (
                    <div
                        className={`mx-3 mb-3 p-4 shadow-lg shadow-black/10 backdrop-blur-xl backdrop-saturate-150 lg:hidden ${
                            isScrolled
                                ? 'rounded-3xl border border-white/25 bg-white/10 ring-1 ring-inset ring-white/10 dark:border-white/10 dark:bg-black/20'
                                : 'rounded-3xl border border-neutral-200/80 bg-white/95 dark:border-white/10 dark:bg-neutral-900/95'
                        }`}>
                        <ul className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        onClick={() => {
                                            setActiveHref(link.href)
                                            setMenuState(false)
                                        }}
                                        className={`block rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                                            activeHref === link.href
                                                ? 'bg-white/25 text-neutral-950 dark:bg-white/10 dark:text-white'
                                                : 'text-neutral-800 hover:bg-white/15 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-white/5 dark:hover:text-white'
                                        }`}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-3 border-t border-white/20 pt-3 dark:border-white/10">
                            <Button
                                onClick={handleRegisterClick}
                                size="sm"
                                className="w-full rounded-full"
                                disabled={loading}>
                                <span>Register Now</span>
                            </Button>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    )
}