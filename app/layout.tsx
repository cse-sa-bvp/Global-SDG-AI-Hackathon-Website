import React from "react"
import type {Metadata} from 'next'
import {Geist, Geist_Mono} from 'next/font/google'
import {Analytics} from '@vercel/analytics/next'
import './globals.css'
import {HeroHeader} from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

const _geist = Geist({subsets: ["latin"]});
const _geistMono = Geist_Mono({subsets: ["latin"]});

export const metadata: Metadata = {
    title: 'Global SDG-AI Hackathon | Pune 2026',
    description: 'Join the Global SDG-AI Hackathon in Pune to build impactful AI solutions aligned with the Sustainable Development Goals.',
    generator: 'Global SDG-AI Hackathon',
    icons: {
        icon: [
            {
                url: '/icon-light-32x32.png',
                media: '(prefers-color-scheme: light)',
            },
            {
                url: '/icon-dark-32x32.png',
                media: '(prefers-color-scheme: dark)',
            },
            {
                url: '/icon.svg',
                type: 'image/svg+xml',
            },
        ],
        apple: '/apple-icon.png',
    },
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
        <body className="font-sans antialiased bg-white text-neutral-900">
        <HeroHeader/>
        {children}
        <Analytics/>
        <Toaster />
        </body>
        </html>
    )
}