"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import {
    Heart,
    Share2,
    ExternalLink,
    Zap,
    ChevronRight,
    ArrowLeft,
    Shield,
    BarChart2,
    Loader2,
} from "lucide-react";
import NFTCard from "@/components/NFTCard";
import { ACTIVITY } from "@/lib/mock-data";
import { useMarketplace } from "@/hooks/useMarketplace";
import { useListings } from "@/hooks/useListings";
import { toast } from "react-hot-toast";
import { parseBlockchainError } from "@/lib/utils";

// Simple price chart using SVG
function MiniPriceChart({ price }: { price: number }) {
    const data = [
        price * 0.6,
        price * 0.8,
        price * 0.7,
        price * 0.9,
        price * 1.1,
        price * 0.95,
        price,
    ];
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const W = 300;
    const H = 80;
    const points = data
        .map(
            (v, i) =>
                `${(i / (data.length - 1)) * W},${H - ((v - min) / range) * H}`
        )
        .join(" ");

    return (
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="opacity-80">
            <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                </linearGradient>
            </defs>
            <polyline
                points={points}
                fill="none"
                stroke="#A855F7"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
            />
            <polygon
                points={`0,${H} ${points} ${W},${H}`}
                fill="url(#chartGrad)"
            />
        </svg>
    );
}

export default function NFTDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const { listings, loading: listingsLoading } = useListings();
    const { buyNFT, address } = useMarketplace();

    const [processing, setProcessing] = useState(false);
    const [done, setDone] = useState(false);
    const [liked, setLiked] = useState(false);

    const nft = listings.find((n) => n.id === id);

    const relatedNFTs = listings.filter(
        (n) => n.category === nft?.category && n.id !== id
    ).slice(0, 4);

    if (listingsLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-purple-500" />
            </div>
        );
    }

    if (!nft) {
        return notFound();
    }

    const handleAction = async () => {
        if (!address) {
            toast.error("Please connect your wallet first");
            return;
        }

        setProcessing(true);
        const toastId = toast.loading("Processing purchase...");

        try {
            await buyNFT(BigInt(nft.id), nft.price);
            toast.success("Purchase successful!", { id: toastId });
            setDone(true);
        } catch (err: any) {
            const friendlyMsg = parseBlockchainError(err);
            toast.error(friendlyMsg, { id: toastId });
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-slate-500 mb-8"
                >
                    <Link href="/explore" className="flex items-center gap-1 hover:text-white transition-colors">
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Explore
                    </Link>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span className="text-slate-400">{nft.category}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span className="text-white">{nft.name}</span>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    {/* Left: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="relative aspect-square rounded-2xl overflow-hidden group">
                            <Image
                                src={nft.image}
                                alt={nft.name}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                priority
                            />
                            <div className="absolute top-4 right-4 flex gap-2">
                                <button
                                    onClick={() => setLiked(!liked)}
                                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl backdrop-blur-sm border text-sm font-medium transition-all ${liked
                                        ? "bg-rose-500/20 border-rose-500/50 text-rose-300"
                                        : "bg-black/40 border-white/10 text-slate-300 hover:bg-black/60"
                                        }`}
                                >
                                    <Heart className={`w-4 h-4 ${liked ? "fill-rose-400 text-rose-400" : ""}`} />
                                    {liked ? 1 : 0}
                                </button>
                                <button className="p-2.5 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 text-slate-300 hover:text-white transition-colors">
                                    <Share2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Traits */}
                        {nft.attributes && nft.attributes.length > 0 && (
                            <div className="mt-6">
                                <h3 className="font-display font-bold text-white text-sm mb-3 flex items-center gap-2">
                                    <BarChart2 className="w-4 h-4 text-purple-400" />
                                    Properties
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {nft.attributes.map((trait: any, i: number) => (
                                        <div
                                            key={i}
                                            className="glass-card p-3 text-center border border-purple-500/20 bg-purple-500/5"
                                        >
                                            <p className="text-[10px] font-semibold uppercase tracking-wider text-purple-400 mb-0.5">
                                                {trait.trait_type}
                                            </p>
                                            <p className="text-sm font-bold text-white">{trait.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Right: Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Collection */}
                        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 mb-3">
                            Nexa Digital Collective
                            <ExternalLink className="w-3 h-3" />
                        </div>

                        {/* Title */}
                        <h1 className="font-display text-4xl font-bold text-white mb-3 leading-tight">
                            {nft.name}
                        </h1>

                        {/* Description */}
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            {nft.description}
                        </p>

                        {/* Creator */}
                        <div className="flex items-center gap-4 mb-7 p-4 glass-card border border-white/[0.06]">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-purple-500/40 bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                                <div className="text-lg font-bold text-purple-500">
                                    {nft.seller?.slice(2, 4).toUpperCase()}
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-0.5">Seller</p>
                                <p className="font-display font-bold text-white text-sm">{nft.seller}</p>
                            </div>
                            <div className="ml-auto text-right">
                                <p className="text-xs text-slate-500 mb-0.5">Rarity</p>
                                <p className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                                    <Shield className="w-3.5 h-3.5" />
                                    Exclusive
                                </p>
                            </div>
                        </div>

                        {/* Price panel */}
                        <div className="glass-card p-6 mb-4 border border-purple-500/20 bg-purple-500/5">
                            <div className="mb-4">
                                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                                    Fixed Price
                                </p>
                                <p className="font-display text-4xl font-bold text-white">
                                    {nft.price}{" "}
                                    <span className="text-purple-400 text-2xl font-semibold">ETH</span>
                                </p>
                                <p className="text-xs text-slate-500 mt-1">
                                    ≈ ${(parseFloat(nft.price) * 3200).toLocaleString()} USD
                                </p>
                            </div>

                            <button
                                onClick={handleAction}
                                disabled={processing || done}
                                className={`btn-primary w-full justify-center py-4 text-base transition-all ${done ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300" : ""}`}
                            >
                                {processing ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : done ? (
                                    "✓ Item Purchased"
                                ) : (
                                    <>
                                        <Zap className="w-5 h-5" />
                                        Buy Now
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Price History */}
                        <div className="glass-card p-5 border border-white/[0.06]">
                            <h3 className="font-display font-semibold text-white text-sm mb-4">
                                Market Insights
                            </h3>
                            <MiniPriceChart price={parseFloat(nft.price)} />
                            <div className="flex justify-between mt-2">
                                <span className="text-xs text-slate-600">Listing Price High</span>
                                <span className="text-xs text-slate-600">Stable</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Activity */}
                <div className="mb-16">
                    <h2 className="font-display text-xl font-bold text-white mb-5">
                        Recent Activity
                    </h2>
                    <div className="space-y-2">
                        {ACTIVITY.slice(0, 3).map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.06 }}
                                className="glass-card p-4 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${item.type === "sale"
                                            ? "bg-emerald-500/15 text-emerald-400"
                                            : item.type === "bid"
                                                ? "bg-blue-500/15 text-blue-400"
                                                : "bg-purple-500/15 text-purple-400"
                                            }`}
                                    >
                                        {item.type[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white capitalize">
                                            {item.type}
                                        </p>
                                        <p className="text-xs text-slate-500">by {item.user}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-white font-display">
                                        {item.price} <span className="text-purple-400 text-xs font-normal">ETH</span>
                                    </p>
                                    <p className="text-xs text-slate-600">{item.time}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Related NFTs */}
                {relatedNFTs.length > 0 && (
                    <div>
                        <h2 className="font-display text-xl font-bold text-white mb-6">
                            You Might Also Like
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {relatedNFTs.map((n, i) => (
                                <NFTCard key={n.id} nft={n} index={i} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
