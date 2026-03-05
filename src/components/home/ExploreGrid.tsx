"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

function ExploreNFTCard({ nft, index, direction }: { nft: any; index: number; direction: "up" | "down" }) {
    const [liked, setLiked] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: direction === "down" ? 20 : -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-40px" }}
            transition={{ duration: 0.4, delay: (index % 4) * 0.06 }}
            className="nft-card group cursor-pointer"
        >
            <Link href={`/nft/${nft.id}`} className="block">
                <div className="relative" style={{ aspectRatio: "1 / 1.1" }}>
                    {!imgLoaded && <div className="absolute inset-0 skeleton" />}
                    <Image
                        src={nft.image}
                        alt={nft.name}
                        fill
                        className={`object-cover rounded-t-2xl transition-all duration-500 group-hover:scale-105 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
                        onLoad={() => setImgLoaded(true)}
                        sizes="(max-width: 640px) 50vw, 25vw"
                    />
                    <button
                        onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
                        className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all hover:scale-110"
                    >
                        <span className={`text-[11px] ${liked ? "text-rose-400" : "text-slate-400"}`}>{liked ? "♥" : "♡"}</span>
                    </button>
                </div>
                <div className="p-4">
                    <p className="text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1 mb-2">
                        {nft.name}
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-purple-300 text-sm">
                            {nft.price} <span className="text-slate-500 font-sans font-normal text-[11px]">ETH</span>
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">1 in 1</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default function ExploreGrid({ listings, exploreRef, direction }: any) {
    return (
        <section ref={exploreRef} className="py-16 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: direction === "down" ? 30 : -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="font-remap text-2xl md:text-3xl text-white tracking-wide uppercase"
                    >
                        Explore Art Work
                    </motion.div>
                    <Link href="/explore" className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors">
                        See All <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                <motion.div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {listings.map((nft: any, i: number) => (
                        <ExploreNFTCard key={nft.id} nft={nft} index={i} direction={direction} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
