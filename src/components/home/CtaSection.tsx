"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import StarField from "./StarField";

export default function CtaSection({ ctaRef, direction }: any) {
    return (
        <section ref={ctaRef} className="py-32 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(100,30,200,0.25), transparent)" }} />
            <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />
            <StarField />
            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: direction === "down" ? 30 : -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ margin: "-60px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-400 mb-5">Start Today</p>
                    <h2
                        className="font-remap uppercase mb-6 leading-tight"
                        style={{ fontSize: "clamp(3rem, 7vw, 6rem)", color: "#f1f5f9" }}
                    >
                        Start Creating.
                        <br />
                        <span style={{ background: "linear-gradient(135deg, #ff2d78, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                            Start Earning.
                        </span>
                    </h2>
                    <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
                        Join 150,000+ creators on the fastest-growing NFT marketplace. Zero platform lock-in. Your art, your royalties, forever.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link href="/create" className="btn-primary">
                            <Sparkles className="w-4 h-4" />
                            Create Your First NFT
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="/explore" className="btn-outline">Browse Marketplace</Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
