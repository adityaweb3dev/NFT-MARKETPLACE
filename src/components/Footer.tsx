"use client";

import Link from "next/link";
import { Zap, Twitter, Github, MessageSquare, Send } from "lucide-react";

const FOOTER_LINKS = {
    Explore: [
        { label: "Marketplace", href: "/explore" },
        { label: "Top Collections", href: "/#collections" },
        { label: "Trending NFTs", href: "/explore?sort=trending" },
        { label: "Activity", href: "/#activity" },
    ],
    Create: [
        { label: "Mint NFT", href: "/create" },
        { label: "Creator Studio", href: "/create" },
        { label: "Royalty Settings", href: "/create#royalties" },
        { label: "Help Center", href: "#" },
    ],
    Community: [
        { label: "Twitter", href: "#" },
        { label: "Discord", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Governance", href: "#" },
    ],
};

const SOCIALS = [
    { Icon: Twitter, href: "#", label: "Twitter" },
    { Icon: Github, href: "#", label: "GitHub" },
    { Icon: MessageSquare, href: "#", label: "Discord" },
    { Icon: Send, href: "#", label: "Telegram" },
];

export default function Footer() {
    return (
        <footer className="relative bg-[#0B0F19] border-t border-white/[0.04]">
            {/* Top gradient fade */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
                {/* Main grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4 w-fit">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                                <Zap className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-display font-bold text-lg text-white">NexaMarket</span>
                        </Link>
                        <p className="text-sm text-slate-500 leading-relaxed max-w-xs mb-5">
                            A decentralized NFT marketplace with automated royalties, low gas fees,
                            and creator-first economics — built on Sepolia.
                        </p>

                        {/* Newsletter */}
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Get updates"
                                className="flex-1 px-3 py-2 text-sm bg-white/5 border border-white/[0.06] rounded-lg text-slate-300 placeholder:text-slate-600 outline-none focus:border-purple-500/50 transition-colors"
                            />
                            <button className="btn-primary text-xs py-2 px-3">Subscribe</button>
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(FOOTER_LINKS).map(([category, links]) => (
                        <div key={category}>
                            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 mb-4">
                                {category}
                            </p>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-slate-400 hover:text-white transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/[0.04]">
                    <p className="text-xs text-slate-600">
                        © 2025 NexaMarket. Built on Sepolia. All rights reserved.
                    </p>

                    <div className="flex items-center gap-3">
                        {SOCIALS.map(({ Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                className="p-2 rounded-lg text-slate-600 hover:text-white hover:bg-white/10 transition-all"
                            >
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
