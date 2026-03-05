"use client";

import { motion } from "framer-motion";
import FeatureCard from "@/components/FeatureCard";
import { Shield, Coins, TrendingUp } from "lucide-react";

const FEATURES = [
    {
        icon: Shield,
        title: "True Ownership",
        description: "Smart contracts guarantee transparent and immutable ownership. Your assets live on-chain forever, completely decentralized.",
        gradient: "linear-gradient(135deg, #A855F7, #7C3AED)",
    },
    {
        icon: Coins,
        title: "Automated Royalties",
        description: "EIP-2981 enforced royalties on every secondary sale. Creators earn perpetually — no middlemen, no exceptions.",
        gradient: "linear-gradient(135deg, #3B82F6, #06B6D4)",
    },
    {
        icon: TrendingUp,
        title: "Built on Sepolia",
        description: "Deployed on Ethereum Sepolia Testnet for high-speed, secure, and low-cost development.",
        gradient: "linear-gradient(135deg, #10B981, #22D3EE)",
    },
];

export default function Storytelling({ whyRef, direction }: any) {
    return (
        <section ref={whyRef} className="py-24 section-gradient">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: direction === "down" ? 30 : -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-14"
                >
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-400 mb-3">Why NexaMarket</p>
                    <h2 className="font-remap text-3xl sm:text-5xl text-white mb-4 uppercase tracking-wide leading-tight">
                        Decentralized.{" "}<span className="gradient-text-purple">Transparent.</span>
                        <br />Creator First.
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto text-sm">We built NexaMarket to redistribute power back to creators.</p>
                </motion.div>
                <motion.div className="grid md:grid-cols-3 gap-5">
                    {FEATURES.map((f, i) => <FeatureCard key={f.title} {...f} delay={i * 0.1} />)}
                </motion.div>
            </div>
        </section>
    );
}
