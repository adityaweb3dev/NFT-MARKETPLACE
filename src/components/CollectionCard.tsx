"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Collection } from "@/lib/mock-data";
import { getChangeColor } from "@/lib/utils";
import { useScrollDirection } from "@/hooks/useScrollDirection";

interface Props {
    collection: Collection;
    index?: number;
}

export default function CollectionCard({ collection, index = 0 }: Props) {
    const isPositive = collection.change24h >= 0;
    const direction = useScrollDirection();

    return (
        <motion.div
            initial={{ opacity: 0, y: direction === "down" ? 20 : -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card overflow-hidden glass-card-hover cursor-pointer group"
        >
            {/* Banner */}
            <div className="relative h-28 overflow-hidden">
                <Image
                    src={collection.banner}
                    alt={collection.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
            </div>

            {/* Creator Avatar */}
            <div className="relative px-4 -mt-6 mb-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden ring-2 ring-purple-500/40 ring-offset-2 ring-offset-[#111827]">
                    <Image
                        src={collection.creatorAvatar}
                        alt={collection.creator}
                        fill
                        sizes="48px"
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Info */}
            <div className="px-4 pb-4">
                <h3 className="font-display font-bold text-white text-sm mb-0.5 truncate group-hover:text-purple-300 transition-colors">
                    {collection.name}
                </h3>
                <p className="text-xs text-slate-500 mb-3">by {collection.creator}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mt-auto">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Floor</p>
                        <p className="text-sm font-bold text-white font-display">{collection.floorPrice} ETH</p>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Volume</p>
                        <p className="text-sm font-bold text-white font-display">{collection.volume}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
