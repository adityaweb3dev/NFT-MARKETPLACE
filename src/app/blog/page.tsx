"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Tag, ArrowRight, Search, TrendingUp, BookOpen, Zap } from "lucide-react";

interface Post {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    authorAvatar: string;
    date: string;
    readTime: string;
    cover: string;
    featured?: boolean;
    tags: string[];
}

const POSTS: Post[] = [
    {
        id: "what-are-nfts",
        title: "What Are NFTs? The Complete 2025 Creator's Guide",
        excerpt: "From digital art to tokenized real-world assets — understand how NFTs work, why ownership matters, and how to mint your first one on Sepolia with standard Ethereum security.",
        category: "Education",
        author: "Maya Chen",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop",
        date: "Feb 25, 2026",
        readTime: "8 min read",
        cover: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&h=450&fit=crop",
        featured: true,
        tags: ["NFT Basics", "Sepolia", "Beginners"],
    },
    {
        id: "royalties-eip-2981",
        title: "EIP-2981 Explained: How On-Chain Royalties Actually Work",
        excerpt: "Creators deserve to earn every time their art resells. We break down the EIP-2981 standard, why marketplaces honor it, and how NexaMarket enforces it automatically.",
        category: "Technical",
        author: "Aditya Verma",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
        date: "Feb 20, 2026",
        readTime: "6 min read",
        cover: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=450&fit=crop",
        tags: ["Royalties", "EIP-2981", "Smart Contracts"],
    },
    {
        id: "polygon-vs-ethereum",
        title: "Sepolia vs Ethereum Mainnet: Which Network Is Right for Your NFTs?",
        excerpt: "Cost, speed, security, and liquidity — a no-BS comparison for creators deciding where to launch their collection in 2026.",
        category: "Strategy",
        author: "Sara Kim",
        authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
        date: "Feb 15, 2026",
        readTime: "7 min read",
        cover: "https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=800&h=450&fit=crop",
        tags: ["Sepolia", "Ethereum", "Testnet"],
    },
    {
        id: "ipfs-decentralized-storage",
        title: "IPFS & Decentralized Storage: Why Your NFT Metadata Matters",
        excerpt: "If your NFT art is stored on a centralized server, it can disappear. Learn why IPFS + Filecoin is the gold standard for permanent NFT storage.",
        category: "Technical",
        author: "Marcus Obi",
        authorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop",
        date: "Feb 10, 2026",
        readTime: "5 min read",
        cover: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop",
        tags: ["IPFS", "Storage", "Metadata"],
    },
    {
        id: "nft-launch-checklist",
        title: "The NFT Launch Checklist: 15 Things Every Creator Must Do",
        excerpt: "Before you mint, make sure you've got your art optimized, smart contract audited, community ready, and launch sequence planned. We cover it all.",
        category: "Strategy",
        author: "Maya Chen",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop",
        date: "Feb 5, 2026",
        readTime: "10 min read",
        cover: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=450&fit=crop",
        tags: ["Launch", "Tips", "Marketing"],
    },
    {
        id: "wagmi-next-tutorial",
        title: "Building an NFT Marketplace with Next.js, Wagmi & RainbowKit",
        excerpt: "A step-by-step technical walkthrough: connect wallets, read on-chain data, trigger transactions, and handle loading/error states like a pro.",
        category: "Tutorial",
        author: "Aditya Verma",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
        date: "Jan 28, 2026",
        readTime: "12 min read",
        cover: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop",
        tags: ["Next.js", "Wagmi", "Tutorial"],
    },
];

const CATEGORIES = ["All", "Education", "Technical", "Strategy", "Tutorial"];

const CATEGORY_COLORS: Record<string, string> = {
    Education: "text-purple-300 bg-purple-500/15 border-purple-500/30",
    Technical: "text-blue-300 bg-blue-500/15 border-blue-500/30",
    Strategy: "text-emerald-300 bg-emerald-500/15 border-emerald-500/30",
    Tutorial: "text-amber-300 bg-amber-500/15 border-amber-500/30",
};

function PostCard({ post, index, featured = false }: { post: Post; index: number; featured?: boolean }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
            className={`nft-card group overflow-hidden flex flex-col ${featured ? "lg:col-span-2" : ""}`}
        >
            <Link href={`/blog/${post.id}`} className="flex flex-col h-full">
                {/* Cover image */}
                <div className={`relative overflow-hidden flex-shrink-0 ${featured ? "h-64" : "h-44"}`}>
                    <Image
                        src={post.cover}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0020]/80 to-transparent" />

                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                        <span className={`tag text-[10px] border ${CATEGORY_COLORS[post.category] || "text-slate-300 bg-white/10 border-white/20"}`}>
                            {post.category}
                        </span>
                    </div>
                    {featured && (
                        <div className="absolute top-3 right-3">
                            <span className="tag text-[10px] border text-amber-300 bg-amber-500/15 border-amber-500/30">
                                ⭐ Featured
                            </span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 gap-3">
                    <h3 className={`font-display font-bold text-white leading-tight group-hover:text-purple-200 transition-colors ${featured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"}`}>
                        {post.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 flex-1">{post.excerpt}</p>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-3 mt-auto border-t border-white/[0.06]">
                        <div className="flex items-center gap-2">
                            <div className="relative w-6 h-6 rounded-full overflow-hidden ring-1 ring-purple-500/30">
                                <Image src={post.authorAvatar} alt={post.author} fill sizes="24px" className="object-cover" />
                            </div>
                            <span className="text-sm text-slate-400">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-600 text-sm">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                            <span>{post.date}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [search, setSearch] = useState("");

    const filtered = POSTS.filter((p) => {
        const matchCat = activeCategory === "All" || p.category === activeCategory;
        const matchSearch =
            !search ||
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
        return matchCat && matchSearch;
    });

    const featured = filtered.find((p) => p.featured);
    const rest = filtered.filter((p) => !p.featured);

    return (
        <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 40% at 70% 20%, rgba(90,20,150,0.2), transparent), radial-gradient(ellipse 50% 30% at 10% 80%, rgba(50,20,100,0.15), transparent), #080012",
                }}
            />
            <div className="absolute top-32 right-0 w-80 h-80 bg-purple-700/8 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-12"
                >
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-400 mb-3">
                        Learn &amp; Grow
                    </p>
                    <h1 className="font-display uppercase text-4xl sm:text-6xl text-white mb-4 tracking-wide leading-tight">
                        The{" "}
                        <span
                            style={{
                                background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Blog
                        </span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-lg mx-auto">
                        Insights, tutorials, and strategy for NFT creators. Written by builders, for builders.
                    </p>
                </motion.div>

                {/* Stats banner */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-6 mb-12"
                >
                    {[
                        { icon: BookOpen, label: `${POSTS.length} Articles`, color: "text-purple-400" },
                        { icon: TrendingUp, label: "Updated Weekly", color: "text-emerald-400" },
                        { icon: Zap, label: "Free Forever", color: "text-amber-400" },
                    ].map(({ icon: Icon, label, color }) => (
                        <div key={label} className="flex items-center gap-2 text-base text-slate-400">
                            <Icon className={`w-4 h-4 ${color}`} />
                            {label}
                        </div>
                    ))}
                </motion.div>

                {/* Filter bar */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10">
                    {/* Search */}
                    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] focus-within:border-purple-500/40 transition-colors flex-1 max-w-xs">
                        <Search className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-transparent text-base text-white placeholder:text-slate-600 outline-none w-full"
                        />
                    </div>

                    {/* Category tabs */}
                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold uppercase tracking-wide transition-all duration-200 ${activeCategory === cat
                                    ? "bg-purple-500/20 border border-purple-500/50 text-purple-300"
                                    : "bg-white/[0.04] border border-white/[0.06] text-slate-500 hover:text-slate-300 hover:border-white/[0.12]"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Posts grid */}
                {filtered.length === 0 ? (
                    <div className="text-center py-24 text-slate-600">
                        <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">No articles match your search.</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* Featured post — full width top */}
                        {featured && (
                            <div className="grid lg:grid-cols-2 gap-6">
                                <PostCard post={featured} index={0} featured={true} />
                                {/* Side: first two of rest */}
                                <div className="flex flex-col gap-6">
                                    {rest.slice(0, 2).map((p, i) => (
                                        <PostCard key={p.id} post={p} index={i + 1} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Remaining grid */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {(featured ? rest.slice(2) : rest).map((p, i) => (
                                <PostCard key={p.id} post={p} index={i} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Newsletter CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6 }}
                    className="mt-20 glass-card p-10 text-center relative overflow-hidden"
                    style={{ background: "rgba(60,10,100,0.35)", border: "1px solid rgba(168,85,247,0.25)" }}
                >
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-32 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-400 mb-3">Newsletter</p>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase tracking-wide mb-3">
                        Stay Ahead of the Curve
                    </h3>
                    <p className="text-slate-400 text-sm mb-7 max-w-md mx-auto">
                        One email per week. NFT market insights, smart contract tips, and creator success stories.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="flex-1 px-4 py-3 text-sm rounded-xl text-white placeholder:text-slate-600 outline-none bg-white/[0.06] border border-white/[0.08] focus:border-purple-500/50 transition-colors"
                        />
                        <button className="btn-primary">
                            Subscribe
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                    <p className="text-slate-600 text-xs mt-3">No spam. Unsubscribe anytime.</p>
                </motion.div>
            </div>
        </div>
    );
}
