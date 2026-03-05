"use client";

import { motion } from "framer-motion";
import CollectionCard from "@/components/CollectionCard";
import { COLLECTIONS } from "@/lib/mock-data";

export default function TrendingCollections({ collectionsRef, collectionsInView, direction }: any) {
    return (
        <section id="collections" ref={collectionsRef} className="py-24 section-gradient">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: direction === "down" ? 20 : -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    animate={collectionsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="flex items-end justify-between mb-12"
                >
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-400 mb-2">Collections</p>
                        <h2 className="font-remap text-3xl sm:text-4xl text-white uppercase tracking-wide">Trending Collections</h2>
                    </div>
                </motion.div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {COLLECTIONS.map((col, i) => <CollectionCard key={col.id} collection={col} index={i} />)}
                </div>
            </div>
        </section>
    );
}
