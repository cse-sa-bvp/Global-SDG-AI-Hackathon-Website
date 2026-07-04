'use client'
import Link from 'next/link'
import {Menu, X} from 'lucide-react'
import {Button} from '@/components/ui/button'
import React, { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { doc, getDoc } from '@/lib/firebase/firestore'
import { db } from '@/lib/firebase/firestore'
import type { User, Team } from '@/types'

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const { user, loading } = useAuth()
    const router = useRouter()

    const handleRegisterClick = async () => {
        if (!user) {
            router.push('/auth/signup')
            return
        }

        // Always redirect logged-in users to team page with action=register
        // The team page will handle the logic based on their status
        router.push('/dashboard/team?action=register')
    }

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="bg-background/50 fixed z-20 w-full border-b backdrop-blur-3xl">
                <div className="mx-auto max-w-6xl px-6 transition-all duration-300">
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center gap-3">
                                <span className="inline-flex size-8 items-center justify-center rounded-full bg-neutral-950 text-sm font-semibold text-white shadow-sm shadow-neutral-950/15">
                                    G
                                </span>
                                <span className='font-semibold tracking-tight text-neutral-950'>Global SDG-AI Hackathon</span>
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu
                                    className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200"/>
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200"/>
                            </button>
                        </div>

                        <div
                            className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                {!loading && !user && (
                                    <>
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="sm">
                                            <Link href="/auth/signin">
                                                <span>Sign In</span>
                                            </Link>
                                        </Button>
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="sm">
                                            <Link href="/auth/signup">
                                                <span>Sign Up</span>
                                            </Link>
                                        </Button>
                                    </>
                                )}
                                <Button
                                    onClick={handleRegisterClick}
                                    size="sm"
                                    disabled={loading}>
                                    <span>Register Now</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
