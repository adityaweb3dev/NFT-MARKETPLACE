"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, Zap } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Explore", href: "/explore" },
    { label: "Create", href: "/create" },
    { label: "List NFTs", href: "/list" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-[#080012]/90 backdrop-blur-xl border-b border-purple-900/30"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                                <Zap className="w-4 h-4 text-white" />
                            </div>
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 opacity-0 group-hover:opacity-40 blur-md transition-opacity" />
                        </div>
                        <span className="font-remap text-lg text-white tracking-widest uppercase">
                            NexaMarket
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-semibold text-slate-300 hover:text-white transition-colors relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300" />
                            </Link>
                        ))}
                    </div>

                    {/* Search + Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Search */}
                        <div
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 ${searchFocused
                                ? "bg-white/10 border border-purple-500/50 w-56"
                                : "bg-white/5 border border-white/[0.06] w-40"
                                }`}
                        >
                            <Search className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-transparent text-sm text-white placeholder:text-slate-600 outline-none w-full"
                                onFocus={() => setSearchFocused(true)}
                                onBlur={() => setSearchFocused(false)}
                            />
                        </div>

                        {/* RainbowKit Connect Button */}
                        <div className="scale-90 origin-right">
                            <ConnectButton
                                accountStatus="address"
                                chainStatus="icon"
                                showBalance={false}
                            />
                        </div>
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="flex items-center gap-4 md:hidden">
                        <ConnectButton
                            accountStatus="avatar"
                            chainStatus="none"
                            showBalance={false}
                        />
                        <button
                            className="p-2 rounded-lg text-slate-400 hover:text-white"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="md:hidden bg-[#0B0F19]/95 backdrop-blur-xl border-b border-white/[0.06]"
                    >
                        <div className="px-4 py-4 space-y-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="block py-2 text-slate-300 hover:text-white font-medium transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
