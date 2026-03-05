"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Wallet, Sparkles, Tag, DollarSign } from "lucide-react";
import { useScrollDirection } from "@/hooks/useScrollDirection";

const STEPS = [
    {
        icon: Wallet,
        title: "Connect Wallet",
        description: "Link your crypto wallet securely in seconds. MetaMask, WalletConnect, and Coinbase supported.",
        color: "#A855F7",
        step: "01",
    },
    {
        icon: Sparkles,
        title: "Mint Your NFT",
        description: "Upload artwork, add metadata, set on-chain royalties. Minted instantly on Sepolia.",
        color: "#3B82F6",
        step: "02",
    },
    {
        icon: Tag,
        title: "List for Sale",
        description: "Set a fixed price or start an auction. Your NFT is live on the marketplace in seconds.",
        color: "#22D3EE",
        step: "03",
    },
    {
        icon: DollarSign,
        title: "Earn Royalties",
        description: "Receive automated EIP-2981 royalties on every secondary sale. Forever. No middlemen.",
        color: "#10B981",
        step: "04",
    },
];

export default function HowItWorks() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { margin: "-100px" });
    const direction = useScrollDirection();

    return (
        <section className="py-24 relative overflow-hidden">
            {/* background glow */}
            <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />
            <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: direction === "down" ? 30 : -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16"
                >
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-400 mb-3">Process</p>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                        How It Works
                    </h2>
                    <p className="text-slate-400 mt-3 max-w-xl mx-auto text-sm">
                        Four simple steps from wallet connection to earning perpetual royalties.
                    </p>
                </motion.div>

                {/* Desktop: horizontal timeline */}
                <div className="hidden md:flex items-start gap-0 relative">
                    {/* Connecting line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={inView ? { scaleX: 1 } : {}}
                        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-[28px] left-[calc(12.5%+20px)] right-[calc(12.5%+20px)] h-px origin-left"
                        style={{
                            background: "linear-gradient(90deg, #A855F7, #3B82F6, #22D3EE, #10B981)",
                        }}
                    />

                    {STEPS.map((step, i) => (
                        <motion.div
                            key={step.step}
                            initial={{ opacity: 0, y: direction === "down" ? 30 : -30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="flex-1 flex flex-col items-center text-center px-4 group"
                        >
                            {/* Icon circle */}
                            <div
                                className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                                style={{
                                    background: `${step.color}15`,
                                    border: `2px solid ${step.color}60`,
                                    boxShadow: `0 0 0 6px ${step.color}10`,
                                }}
                            >
                                <step.icon className="w-5 h-5" style={{ color: step.color }} />
                            </div>

                            <span
                                className="text-xs font-bold tracking-widest mb-2"
                                style={{ color: step.color }}
                            >
                                {step.step}
                            </span>
                            <h3 className="font-display font-bold text-white text-base mb-2 group-hover:text-white transition-colors">
                                {step.title}
                            </h3>
                            <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile: vertical */}
                <div className="md:hidden space-y-6">
                    {STEPS.map((step, i) => (
                        <motion.div
                            key={step.step}
                            initial={{ opacity: 0, x: -20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.4, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="flex items-start gap-4 glass-card p-5"
                        >
                            <div
                                className="w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center"
                                style={{ background: `${step.color}15`, border: `1px solid ${step.color}40` }}
                            >
                                <step.icon className="w-5 h-5" style={{ color: step.color }} />
                            </div>
                            <div>
                                <span className="text-xs font-bold tracking-widest" style={{ color: step.color }}>
                                    {step.step}
                                </span>
                                <h3 className="font-display font-bold text-white text-sm mt-0.5 mb-1">{step.title}</h3>
                                <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
