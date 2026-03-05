"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useScrollDirection } from "@/hooks/useScrollDirection";

interface TechBadgeItem {
    name: string;
    icon: string;
    color: string;
}

const TECH: TechBadgeItem[] = [
    { name: "Solidity", icon: "◆", color: "#A855F7" },
    { name: "Sepolia", icon: "Ξ", color: "#627EEA" },
    { name: "IPFS", icon: "⬡", color: "#22D3EE" },
    { name: "OpenZeppelin", icon: "🛡", color: "#60A5FA" },
    { name: "Next.js", icon: "▲", color: "#F1F5F9" },
    { name: "Ethers.js", icon: "⚡", color: "#F59E0B" },
];

interface Props {
    name: string;
    icon: string;
    color: string;
    delay?: number;
    inView: boolean;
    direction: "up" | "down";
}

function Badge({ name, icon, color, delay = 0, inView, direction }: Props) {
    const [hovered, setHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: direction === "down" ? 15 : -15, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all duration-300 cursor-default"
            style={{
                background: "rgba(255,255,255,0.05)",
                border: hovered ? `1px solid ${color}88` : "1px solid rgba(255,255,255,0.06)",
                boxShadow: hovered ? `0 0 20px ${color}33` : "none",
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <span className="text-lg" style={{ color }}>
                {icon}
            </span>
            <span
                className="font-semibold text-sm transition-colors"
                style={{
                    fontFamily: "'Space Grotesk', system-ui, sans-serif",
                    color: hovered ? "#f1f5f9" : "#94a3b8",
                }}
            >
                {name}
            </span>
        </motion.div>
    );
}

export default function TechStack() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { margin: "-80px" });
    const direction = useScrollDirection();

    return (
        <section className="py-24 section-gradient">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: direction === "down" ? 30 : -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-14"
                >
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-400 mb-3">
                        Powered By
                    </p>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
                        Battle-Tested Technology
                    </h2>
                    <p className="text-slate-400 mt-3 max-w-xl mx-auto text-sm">
                        Built with enterprise-grade protocols and frameworks trusted by
                        leading Web3 projects worldwide.
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-3">
                    {TECH.map((tech, i) => (
                        <Badge
                            key={tech.name}
                            {...tech}
                            delay={i * 0.07}
                            inView={inView}
                            direction={direction}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
