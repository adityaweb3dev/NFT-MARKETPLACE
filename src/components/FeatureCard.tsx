"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useScrollDirection } from "@/hooks/useScrollDirection";

interface Props {
    icon: LucideIcon;
    title: string;
    description: string;
    gradient: string;
    delay?: number;
}

export default function FeatureCard({ icon: Icon, title, description, gradient, delay = 0 }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { margin: "-100px" });
    const direction = useScrollDirection();

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: direction === "down" ? 40 : -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card glass-card-hover p-7 group relative overflow-hidden"
        >
            {/* Subtle gradient background glow */}
            <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-3xl"
                style={{ background: gradient }}
            />

            {/* Icon */}
            <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 relative"
                style={{ background: `${gradient}22`, border: `1px solid ${gradient}44` }}
            >
                <Icon className="w-5 h-5" style={{ color: gradient.replace("linear-gradient(135deg, ", "").split(",")[0] }} />
            </div>

            {/* Content */}
            <h3 className="font-display font-bold text-white text-lg mb-2 group-hover:text-white transition-colors">
                {title}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">{description}</p>

            {/* Bottom accent line */}
            <div
                className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ background: gradient }}
            />
        </motion.div>
    );
}
