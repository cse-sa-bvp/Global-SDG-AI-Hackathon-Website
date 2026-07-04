import Link from "next/link";

const navigation = [
    { title: "Organized By", href: "#organizers" },
    { title: "Tracks", href: "#tracks" },
    { title: "FAQ", href: "#faq" },
    { title: "Contact", href: "#contact" },
];

const socialLinks = [
    { title: "LinkedIn", href: "https://www.linkedin.com" },
    { title: "Instagram", href: "https://www.instagram.com" },
    { title: "X", href: "https://x.com" },
];

const policyLinks = [
    { title: "Brochure", href: "/brochure" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms", href: "/terms" },
];

export default function FooterSection() {
    return (
        <footer className="border-t border-neutral-200 bg-white py-14 sm:py-16">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
                <div>
                    <Link href="/" aria-label="go home" className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-semibold tracking-tight text-neutral-950 shadow-sm">
                        <span className="inline-flex size-5 items-center justify-center rounded-full bg-neutral-950 text-[10px] font-bold text-white">G</span>
                        Global SDG-AI Hackathon
                    </Link>
                    <p className="mt-4 max-w-lg text-sm leading-6 text-neutral-600">
                        A premium hackathon experience for AI builders working on meaningful SDG-focused challenges.
                    </p>
                    <div className="mt-8 text-sm text-neutral-500">© {new Date().getFullYear()} Global SDG-AI Hackathon. All rights reserved.</div>
                </div>

                <div className="grid gap-8 sm:grid-cols-3">
                    <FooterColumn title="Navigation" links={navigation} />
                    <FooterColumn title="Social Links" links={socialLinks} />
                    <FooterColumn title="Resources" links={policyLinks} />
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
                        className="block text-neutral-600 transition-colors duration-200 hover:text-neutral-950"
                    >
                        {link.title}
                    </Link>
                ))}
            </div>
        </div>
    );
}
