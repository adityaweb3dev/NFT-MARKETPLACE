"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, Clock, Zap } from "lucide-react";
import { useState } from "react";
import { useScrollDirection } from "@/hooks/useScrollDirection";

interface NFTCardProps {
    nft: any;
    index: number;
}

export default function NFTCard({ nft, index }: NFTCardProps) {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 200) + 12);
    const direction = useScrollDirection();

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        setLiked(!liked);
        setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: direction === "down" ? 20 : -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{}}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group"
        >
            <Link href={`/nft/${nft.id}`} className="block nft-card">
                <div className="relative aspect-square overflow-hidden">
                    <Image
                        src={nft.image}
                        alt={nft.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Like button */}
                    <button
                        onClick={handleLike}
                        className={`absolute top-3 right-3 p-2.5 rounded-xl backdrop-blur-md border transition-all duration-300 z-10 ${liked
                            ? "bg-rose-500/20 border-rose-500/50 text-rose-400"
                            : "bg-black/40 border-white/10 text-white hover:bg-black/60"
                            }`}
                    >
                        <Heart className={`w-4 h-4 ${liked ? "fill-rose-400" : ""}`} />
                    </button>

                    {/* Auction timer */}
                    {nft.isAuction && (
                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-bold text-white">
                            <Clock className="w-3.5 h-3.5 text-purple-400" />
                            <span>2d 14h 5m</span>
                        </div>
                    )}
                </div>

                <div className="p-5">
                    {/* Creator & Collection */}
                    <div className="flex items-center justify-between mb-3 text-[11px] uppercase tracking-widest font-bold text-slate-500">
                        <span>{nft.collection || "Nexa Digital Collective"}</span>
                        <span className="text-purple-400">Fixed Price</span>
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-bold text-white mb-4 group-hover:text-purple-300 transition-colors line-clamp-1">
                        {nft.name}
                    </h3>

                    {/* Bottom Row */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                        <div>
                            <p className="text-[11px] text-slate-500 uppercase tracking-widest font-bold mb-1">Price</p>
                            <p className="text-lg font-bold text-white font-display">
                                {nft.price} <span className="text-purple-400 text-xs font-normal">ETH</span>
                            </p>
                        </div>
                        <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full border-2 border-[#080012] overflow-hidden relative bg-white/5 flex items-center justify-center">
                                {nft.creatorAvatar ? (
                                    <Image src={nft.creatorAvatar} alt={nft.seller || "Creator"} fill sizes="32px" className="object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
                                )}
                            </div>
                        </div>
                    </div>

                    <button className="w-full mt-4 btn-primary py-2.5 text-sm justify-center">
                        <Zap className="w-4 h-4" />
                        Buy Now
                    </button>
                </div>
            </Link>
        </motion.div>
    );
}

export function NFTCardSkeleton() {
    return (
        <div className="nft-card animate-pulse">
            <div className="aspect-square bg-white/5" />
            <div className="p-5 space-y-4">
                <div className="h-3 w-20 bg-white/5 rounded" />
                <div className="h-5 w-40 bg-white/5 rounded" />
                <div className="flex justify-between pt-4">
                    <div className="space-y-2">
                        <div className="h-2 w-10 bg-white/5 rounded" />
                        <div className="h-4 w-16 bg-white/5 rounded" />
                    </div>
                </div>
            </div>
        </div>
    );
}
