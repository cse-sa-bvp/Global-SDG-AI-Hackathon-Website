import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart, Instagram, Linkedin } from "lucide-react";

const navigation = [
    { title: "Organized By", href: "/organizing-committee" },
    { title: "Tracks", href: "/tracks" },
    { title: "FAQ", href: "#faq" },
    { title: "Contact", href: "#contact" },
];

const socialLinks = [
    { title: "LinkedIn", href: "https://www.linkedin.com", icon: Linkedin },
    { title: "Instagram", href: "https://www.instagram.com", icon: Instagram },
    { title: "X", href: "https://x.com", icon: XIcon },
];

const policyLinks = [
    { title: "Brochure", href: "/resources" },
    { title: "Privacy Policy", href: "/" },
    { title: "Terms", href: "/" },
];

const hostedByLogos = [
    { src: "/bvducoep.jpeg", alt: "BVDU College of Engineering, Pune" },
    { src: "/bvdu.png", alt: "Bharati Vidyapeeth (Deemed to be University)" },
];

export default function FooterSection() {
    return (
        <footer
            className="sticky bottom-0 z-0 overflow-hidden bg-neutral-950 pb-8 pt-16 sm:pt-20"
            style={{ top: "100vh" }}
        >
            <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-blue-600/20 to-teal-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-gradient-to-tr from-violet-600/20 to-blue-600/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
                    <div>
                        <Link
                            href="/"
                            aria-label="go home"
                            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold tracking-tight text-white backdrop-blur-sm"
                        >
                            <span className="inline-flex size-5 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-teal-400 text-[10px] font-bold text-white">
                                G
                            </span>
                            Global SDG-AI Hackathon
                        </Link>

                        <p className="mt-5 max-w-lg text-sm leading-6 text-neutral-400">
                            A premium hackathon experience for AI builders working on meaningful SDG-focused challenges.
                        </p>

                        <div className="mt-8 flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.title}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={social.title}
                                    className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 transition-all duration-200 hover:border-transparent hover:bg-gradient-to-br hover:from-blue-500 hover:to-teal-400 hover:text-white"
                                >
                                    <social.icon className="h-4 w-4" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <div className="grid grid-cols-2 gap-8">
                            <FooterColumn title="Quick Links" links={navigation} />
                            <FooterColumn title="Resources" links={policyLinks} />
                        </div>

                        <div className="mt-8">
                            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">Hosted By</div>
                            <div className="mt-4 flex items-center gap-5">
                                {hostedByLogos.map((logo) => (
                                    <Image
                                        key={logo.src}
                                        src={logo.src}
                                        alt={logo.alt}
                                        width={140}
                                        height={70}
                                        className="h-16 w-auto object-contain"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <p className="text-xs text-neutral-500">
                        © {new Date().getFullYear()} Global SDG-AI Hackathon. All rights reserved.
                    </p>
                    <p className="flex items-center gap-1.5 text-md text-neutral-300">
                        Crafted with <Heart className="h-6 w-6 fill-red-600 text-red-600" /> by Team GlobalSDG
                    </p>
                </div>
            </div>
        </footer>
    );
}

function FooterColumn({
    title,
    links,
}: {
    title: string;
    links: Array<{ title: string; href: string }>;
}) {
    return (
        <div>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">{title}</div>
            <div className="mt-4 space-y-3 text-sm">
                {links.map((link) => (
                    <Link
                        key={link.title}
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                        className="group flex items-center gap-1 text-neutral-400 transition-colors duration-200 hover:text-white"
                    >
                        {link.title}
                        {link.href.startsWith("http") && (
                            <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}