"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

function HeroBidCard({ nft, index }: { nft: any; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            className="nft-card flex flex-col"
        >
            <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-[#1a0035]">
                <Image
                    src={nft.image}
                    alt={nft.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, 33vw"
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

export default function LiveBids({ listings, liveBidRef }: any) {
    return (
        <section ref={liveBidRef} className="relative py-16 z-10">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(60,0,100,0.4), transparent)" }}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    style={{
                        background: "rgba(10,0,25,0.7)",
                        borderColor: "rgba(100,40,180,0.3)"
                    }}
                    className="glass-card p-6 md:p-8"
                >
                    <div className="flex items-center justify-between mb-7">
                        <h2 className="font-remap text-2xl md:text-3xl text-white tracking-wide uppercase">
                            Highest Live Bid
                        </h2>
                        <Link href="/explore" className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors">
                            See All <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                        {listings.length > 0 ? (
                            listings.slice(0, 3).map((nft: any, i: number) => (
                                <HeroBidCard key={nft.id} nft={nft} index={i} />
                            ))
                        ) : (
                            [1, 2, 3].map((_, i) => (
                                <HeroBidCard
                                    key={i}
                                    nft={{
                                        id: `mock-bid-${i}`,
                                        name: `Limited Genesis #${i + 1}`,
                                        price: (0.2 + i * 0.05).toFixed(2),
                                        image: "https://mobilecoderz.com/blog/wp-content/uploads/2022/02/nft.jpg"
                                    }}
                                    index={i}
                                />
                            ))
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
