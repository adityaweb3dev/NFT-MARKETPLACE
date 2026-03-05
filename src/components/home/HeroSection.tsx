"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Shield } from "lucide-react";
import dynamic from "next/dynamic";
import StarField from "./StarField";
import CountdownDisplay from "./CountdownDisplay";

const HeroCanvas = dynamic(() => import("@/components/HeroCanvas"), {
    ssr: false,
    loading: () => <div className="w-64 h-80 rounded-2xl skeleton animate-pulse" />,
});

const ParticleBackground = dynamic(() => import("@/components/ParticleBackground"), { ssr: false });

function FloatBadge({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
            className={`stat-badge ${className}`}
        >
            {children}
        </motion.div>
    );
}

function HeroBidCard({ nft, index }: { nft: any; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            className="nft-card flex flex-col"
        >
            <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-[#1a0035]">
                <Image
                    src={nft.image}
                    alt={nft.name}
                    fill
                    className="object-cover"
                    sizes="180px"
                    priority={index === 0} // Priority for the first card
                />
            </div>
            <div className="p-4 flex flex-col gap-3">
                <p className="font-display font-bold text-white text-sm truncate uppercase tracking-wide">{nft.name}</p>
                <div className="flex items-center justify-between">
                    <span className="text-purple-300 text-sm font-bold font-display">{nft.price} ETH</span>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Live</span>
                </div>
                <button className="btn-purple-pill text-xs py-2 w-full font-bold">Place Bid</button>
            </div>
        </motion.div>
    );
}

function FloatingNFTCard({ nft, index, yParallax }: { nft: any; index: number; yParallax: any }) {
    return (
        <motion.div
            style={{
                y: yParallax,
                position: 'absolute',
                zIndex: 20 - index,
                top: index === 0 ? '10%' : index === 1 ? '45%' : '20%',
                left: index === 0 ? '5%' : index === 1 ? '-10%' : '48%',
                width: index === 0 ? '280px' : '240px'
            }}
            animate={{
                y: [0, -20, 0],
                rotate: [index % 2 === 0 ? -2 : 2, index % 2 === 0 ? 2 : -2, index % 2 === 0 ? -2 : 2]
            }}
            transition={{
                y: { duration: 4 + index, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 5 + index, repeat: Infinity, ease: "easeInOut" }
            }}
        >
            <HeroBidCard nft={nft} index={index} />
        </motion.div>
    );
}

export default function HeroSection({
    listings,
    yText,
    xText,
    rotateText,
    opacityHero,
    yHeroImage,
    badgeRotate,
    badgeX,
    auctionEnd
}: any) {
    const topBidNFT = listings.length > 0 ? listings[0] : null;

    return (
        <section className="relative min-h-[100svh] overflow-hidden pt-16">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(ellipse 100% 80% at 60% 20%, rgba(90,20,150,0.55) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 0% 80%, rgba(120,10,80,0.3) 0%, transparent 55%), #080012",
                }}
            />
            <StarField />
            <ParticleBackground />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-0 relative z-10">
                <div className="grid lg:grid-cols-[1fr_1fr] gap-0 min-h-[90vh] items-stretch">
                    <motion.div
                        style={{ y: yText, x: xText, rotate: rotateText, opacity: opacityHero }}
                        className="flex flex-col justify-center pr-0 lg:pr-8 py-10 relative z-10"
                    >
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-xs font-semibold uppercase tracking-[0.35em] text-purple-400 mb-4 ml-0.5"
                        >
                            Marketplace For
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.05 }}
                            className="mb-6"
                        >
                            <h1
                                className="font-remap uppercase leading-[0.95] tracking-[-0.01em]"
                                style={{ fontSize: "clamp(4rem, 9vw, 7.5rem)", color: "#f1f5f9" }}
                            >
                                <span style={{ background: "linear-gradient(135deg, #e0aaff 0%, #c77dff 30%, #9d4edd 60%, #7b2d8b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                                    CREATORS
                                </span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            className="text-slate-300 text-lg leading-relaxed mb-10 max-w-xl"
                        >
                            Assemble, curate, and explore the most exclusive digital assets. Driven by creators, powered by decentralization, and built for the next generation of the internet.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.22 }}
                            className="flex flex-wrap items-center gap-3 mb-10"
                        >
                            <Link href="/explore" className="btn-outline">Explore</Link>
                            <Link href="/create" className="flex items-center gap-1.5 text-sm font-semibold text-white hover:text-purple-300 transition-colors">
                                Create NFT <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>

                        {topBidNFT && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="inline-flex flex-col gap-1 mb-6"
                            >
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest ml-1">Today&apos;s Highest Bid</p>
                                <div className="stat-badge self-start gap-3">
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">Ξ</div>
                                    <div>
                                        <p className="font-display font-bold text-white text-sm">{topBidNFT.price} ETH</p>
                                        <p className="text-slate-500 text-[10px]">≈ ${(topBidNFT.price * 2532).toLocaleString()} USD</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
                            <CountdownDisplay target={auctionEnd} />
                        </motion.div>
                    </motion.div>

                    <div className="relative hidden lg:flex items-center justify-center min-h-[600px] w-full">
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
                            style={{ background: "radial-gradient(circle, rgba(140,40,200,0.2) 0%, rgba(80,0,120,0.05) 50%, transparent 70%)" }}
                        />

                        <div className="relative w-full h-full max-w-[500px]">
                            {listings.length > 0 ? (
                                listings.slice(0, 3).map((nft: any, i: number) => (
                                    <FloatingNFTCard key={nft.id} nft={nft} index={i} yParallax={yHeroImage} />
                                ))
                            ) : (
                                [1, 2, 3].map((_, i) => (
                                    <FloatingNFTCard
                                        key={i}
                                        nft={{
                                            id: `mock-${i}`,
                                            name: `Nexa Artifact #${100 + i}`,
                                            price: "0.15",
                                            image: "https://mobilecoderz.com/blog/wp-content/uploads/2022/02/nft.jpg"
                                        }}
                                        index={i}
                                        yParallax={yHeroImage}
                                    />
                                ))
                            )}
                        </div>

                        <motion.div
                            style={{ rotate: badgeRotate, x: badgeX }}
                            className="absolute -right-4 top-1/3 flex flex-col gap-3 z-30"
                        >
                            <FloatBadge delay={0.4}>
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider">Verified</p>
                                    <p className="text-sm font-bold text-white">100% Authenticity</p>
                                </div>
                            </FloatBadge>
                            <FloatBadge delay={0.5}>
                                <Sparkles className="w-5 h-5 text-purple-400" />
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider">Creators</p>
                                    <p className="text-sm font-bold text-white">50k+ Globally</p>
                                </div>
                            </FloatBadge>
                            <FloatBadge delay={0.6}>
                                <Shield className="w-5 h-5 text-blue-400" />
                                <div>
                                    <p className="text-xs text-slate-500 uppercase tracking-wider">Stored</p>
                                    <p className="text-sm font-bold text-white">8M+ NFTs</p>
                                </div>
                            </FloatBadge>
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: "linear-gradient(to top, #080012, transparent)" }} />
        </section>
    );
}
