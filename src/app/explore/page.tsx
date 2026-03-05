"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import NFTCard, { NFTCardSkeleton } from "@/components/NFTCard";
import { useListings } from "@/hooks/useListings";

const CATEGORIES = ["All", "Art", "Music", "Gaming", "PFP", "Photography"];
const SORT_OPTIONS = [
    { label: "Recently Listed", value: "recent" },
    { label: "Price: Low → High", value: "price-asc" },
    { label: "Price: High → Low", value: "price-desc" },
];

export default function ExplorePage() {
    const { listings, loading } = useListings();
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("recent");
    const [search, setSearch] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);

    const filtered = useMemo(() => {
        let result = [...listings];

        // Category
        if (category !== "All") {
            result = result.filter((n) => n.category === category);
        }

        // Search
        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(
                (n) =>
                    n.name?.toLowerCase().includes(q) ||
                    n.description?.toLowerCase().includes(q)
            );
        }

        // Price range
        if (minPrice) result = result.filter((n) => parseFloat(n.price) >= parseFloat(minPrice));
        if (maxPrice) result = result.filter((n) => parseFloat(n.price) <= parseFloat(maxPrice));

        // Sort
        switch (sort) {
            case "price-asc":
                result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                break;
            case "price-desc":
                result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
                break;
        }

        return result;
    }, [listings, category, sort, search, minPrice, maxPrice]);

    const currentSortLabel = SORT_OPTIONS.find((s) => s.value === sort)?.label;

    return (
        <div className="min-h-screen pt-20 pb-20">
            {/* Page Header */}
            <div className="relative py-14 overflow-hidden">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.15), transparent)",
                    }}
                />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-400 mb-2">
                            Discover
                        </p>
                        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
                            Explore Marketplace
                        </h1>
                        <p className="text-slate-400">
                            {listings.length}+ unique digital assets across all categories
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Controls bar */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    {/* Search */}
                    <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/[0.06] focus-within:border-purple-500/50 transition-colors">
                        <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
                        <input
                            type="text"
                            placeholder="Search by name, collection, or creator..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-transparent text-sm text-white placeholder:text-slate-600 outline-none w-full"
                        />
                        {search && (
                            <button onClick={() => setSearch("")}>
                                <X className="w-3.5 h-3.5 text-slate-500 hover:text-white" />
                            </button>
                        )}
                    </div>

                    {/* Filters toggle */}
                    <button
                        onClick={() => setFiltersOpen(!filtersOpen)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all ${filtersOpen
                            ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
                            : "bg-white/5 border-white/[0.06] text-slate-400 hover:border-white/20"
                            }`}
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        Filters
                    </button>

                    {/* Sort dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setSortOpen(!sortOpen)}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/[0.06] text-sm text-slate-400 hover:border-white/20 transition-colors"
                        >
                            {currentSortLabel}
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
                        </button>

                        <AnimatePresence>
                            {sortOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 6 }}
                                    className="absolute right-0 top-full mt-1 z-20 glass-card w-52 py-1 border border-white/10"
                                >
                                    {SORT_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => { setSort(opt.value); setSortOpen(false); }}
                                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${sort === opt.value
                                                ? "text-purple-300 bg-purple-500/10"
                                                : "text-slate-400 hover:text-white hover:bg-white/5"
                                                }`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Expanded Filters */}
                <AnimatePresence>
                    {filtersOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden mb-6"
                        >
                            <div className="glass-card p-5 border border-white/[0.06]">
                                <div className="flex flex-wrap gap-6">
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">
                                            Price Range (ETH)
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="number"
                                                placeholder="Min"
                                                value={minPrice}
                                                onChange={(e) => setMinPrice(e.target.value)}
                                                className="w-24 px-3 py-2 text-sm bg-white/5 border border-white/[0.06] rounded-lg text-white outline-none focus:border-purple-500/50"
                                            />
                                            <span className="text-slate-600">—</span>
                                            <input
                                                type="number"
                                                placeholder="Max"
                                                value={maxPrice}
                                                onChange={(e) => setMaxPrice(e.target.value)}
                                                className="w-24 px-3 py-2 text-sm bg-white/5 border border-white/[0.06] rounded-lg text-white outline-none focus:border-purple-500/50"
                                            />
                                        </div>
                                    </div>
                                    {(minPrice || maxPrice) && (
                                        <button
                                            onClick={() => { setMinPrice(""); setMaxPrice(""); }}
                                            className="self-end text-xs text-rose-400 hover:text-rose-300 transition-colors"
                                        >
                                            Clear filters
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Category tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${category === cat
                                ? "bg-purple-500/20 border border-purple-500/50 text-purple-300"
                                : "bg-white/5 border border-white/[0.06] text-slate-400 hover:border-white/20 hover:text-slate-200"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Results count */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-sm text-slate-500">
                        <span className="text-white font-medium">{filtered.length}</span> results
                        {category !== "All" && (
                            <span> in <span className="text-purple-400">{category}</span></span>
                        )}
                    </p>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[...Array(8)].map((_, i) => (
                            <NFTCardSkeleton key={i} />
                        ))}
                    </div>
                ) : filtered.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filtered.map((nft, i) => (
                            <NFTCard key={nft.id} nft={nft} index={i} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-5xl mb-4">🔍</p>
                        <p className="font-display text-lg font-bold text-white mb-2">
                            No results found
                        </p>
                        <p className="text-slate-500 text-sm">
                            Try adjusting your search or filters
                        </p>
                        <button
                            onClick={() => { setCategory("All"); setSearch(""); setMinPrice(""); setMaxPrice(""); }}
                            className="mt-4 btn-secondary text-sm"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
