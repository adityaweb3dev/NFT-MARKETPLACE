"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    Search,
    LayoutGrid,
    Wallet,
    Loader2,
    AlertCircle,
    Tag,
    Hammer,
    ChevronRight,
    ExternalLink,
    CheckCircle2,
    Sparkles
} from "lucide-react";
import { useUserNFTs } from "@/hooks/useUserNFTs";
import { useMarketplace } from "@/hooks/useMarketplace";
import { toast } from "react-hot-toast";
import { parseBlockchainError } from "@/lib/utils";

export default function ListNFTPage() {
    const { address, approveNFT, listNFT, getApproved } = useMarketplace();
    const { ownedNFTs, loading } = useUserNFTs();
    const [selectedNFT, setSelectedNFT] = useState<any | null>(null);
    const [price, setPrice] = useState("");
    const [isListing, setIsListing] = useState(false);
    const [step, setStep] = useState<"select" | "details" | "success">("select");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredNFTs = ownedNFTs.filter(nft =>
        nft.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleList = async () => {
        const parsedPrice = parseFloat(price);
        if (!selectedNFT || !price || isNaN(parsedPrice) || parsedPrice <= 0) {
            toast.error("Please enter a price greater than 0");
            return;
        }

        console.log("Listing NFT:", {
            tokenId: selectedNFT.tokenId,
            price,
            nftContract: selectedNFT.nftContract,
            owner: address
        });

        setIsListing(true);
        try {
            // Step 1: Approve
            toast.loading("Step 1/2: Approving Marketplace...", { id: "list-flow" });
            await approveNFT(selectedNFT.nftContract, BigInt(selectedNFT.tokenId));

            // Verification: Check if approval actually worked
            const approvedAddr = await getApproved(selectedNFT.nftContract, BigInt(selectedNFT.tokenId));
            console.log("Approved address:", approvedAddr);

            // Step 2: List
            toast.loading("Step 2/2: Confirming Listing...", { id: "list-flow" });
            await listNFT(BigInt(selectedNFT.tokenId), price, selectedNFT.nftContract);

            toast.success("Successfully listed on NexaMarket!", { id: "list-flow" });
            setStep("success");
        } catch (error: any) {
            const friendlyMsg = parseBlockchainError(error);
            toast.error(friendlyMsg, { id: "list-flow" });
        } finally {
            setIsListing(false);
        }
    };

    if (!address) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center px-4">
                <div className="w-20 h-20 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6">
                    <Wallet className="w-10 h-10 text-purple-400" />
                </div>
                <h1 className="text-3xl font-display font-bold text-white mb-4">Connect Wallet</h1>
                <p className="text-slate-400 text-center max-w-sm mb-8 leading-relaxed">
                    Please connect your wallet to view your digital assets and list them on the marketplace.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            {/* Background decoration */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-400 mb-2">My Collective</p>
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">
                            List Your Assets
                        </h1>
                        <p className="text-slate-400 mt-2">Manage and list NFTs from your private wallet</p>
                    </motion.div>

                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search your collection..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-white/5 border border-white/[0.08] text-white pl-10 pr-4 py-2.5 rounded-xl outline-none focus:border-purple-500/50 w-full md:w-64 transition-all"
                            />
                        </div>
                        <div className="p-2.5 rounded-xl bg-white/5 border border-white/[0.08] text-slate-400">
                            <LayoutGrid className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Success State */}
                <AnimatePresence mode="wait">
                    {step === "success" ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-xl mx-auto text-center py-20 bg-white/[0.02] border border-white/[0.05] rounded-3xl backdrop-blur-sm"
                        >
                            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                            </div>
                            <h2 className="text-3xl font-display font-bold text-white mb-4 uppercase">Asset Listed!</h2>
                            <p className="text-slate-400 mb-10 px-8">
                                Your NFT "{selectedNFT?.name}" has been successfully put up for sale on the marketplace.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center px-8">
                                <Link href="/explore" className="btn-primary w-full">View Marketplace</Link>
                                <button
                                    onClick={() => { setStep("select"); setSelectedNFT(null); setPrice(""); }}
                                    className="btn-outline w-full"
                                >
                                    List Another NFT
                                </button>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="grid lg:grid-cols-12 gap-10">
                            {/* Left: NFT Grid (8 Cols) */}
                            <div className="lg:col-span-8 space-y-6">
                                {loading ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                                        {[1, 2, 3, 4, 5, 6].map((i) => (
                                            <div key={i} className="aspect-square rounded-2xl bg-white/5 animate-pulse" />
                                        ))}
                                    </div>
                                ) : filteredNFTs.length === 0 ? (
                                    <div className="text-center py-20 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl">
                                        <Sparkles className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-slate-300">No assets found</h3>
                                        <p className="text-sm text-slate-500 mt-1">Try minting your first NFT in the Studio</p>
                                        <Link href="/create" className="text-purple-400 mt-4 inline-flex items-center gap-1 hover:text-purple-300 transition-colors">
                                            Go to Studio <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                                        {filteredNFTs.map((nft, idx) => (
                                            <motion.div
                                                key={nft.tokenId}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                onClick={() => {
                                                    setSelectedNFT(nft);
                                                    setStep("details");
                                                }}
                                                className={`group relative aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${selectedNFT?.tokenId === nft.tokenId
                                                    ? "border-purple-500 ring-4 ring-purple-500/20"
                                                    : "border-transparent bg-white/5 hover:border-white/20"
                                                    }`}
                                            >
                                                <Image
                                                    src={nft.image}
                                                    alt={nft.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                                    <p className="text-xs font-bold text-white truncate">{nft.name}</p>
                                                    <p className="text-[10px] text-slate-400 mt-0.5">#{nft.tokenId}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Right: Action Panel (4 Cols) */}
                            <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
                                <AnimatePresence mode="wait">
                                    {selectedNFT ? (
                                        <motion.div
                                            key="selected"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="glass-card p-6 overflow-hidden"
                                        >
                                            <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
                                                <Image src={selectedNFT.image} alt={selectedNFT.name} fill className="object-cover" />
                                                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-purple-400 font-bold uppercase tracking-wider">
                                                    {selectedNFT.category}
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-display font-bold text-white mb-2">{selectedNFT.name}</h3>
                                            <p className="text-sm text-slate-500 mb-6 leading-relaxed line-clamp-3">
                                                {selectedNFT.description}
                                            </p>

                                            <div className="space-y-4 pt-6 border-t border-white/[0.08]">
                                                <div>
                                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Price (ETH)</label>
                                                    <div className="relative">
                                                        <input
                                                            type="number"
                                                            value={price}
                                                            onChange={(e) => setPrice(e.target.value)}
                                                            placeholder="0.00"
                                                            step="0.01"
                                                            min="0"
                                                            className="w-full bg-white/5 border border-white/[0.1] rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500/50 transition-colors"
                                                        />
                                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-purple-400">ETH</div>
                                                    </div>
                                                </div>

                                                <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 flex gap-3">
                                                    <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                                    <p className="text-xs text-blue-300 leading-relaxed">
                                                        Two transactions required: one to <strong>approve</strong> the marketplace and one to <strong>confirm</strong> the listing.
                                                    </p>
                                                </div>

                                                <button
                                                    onClick={handleList}
                                                    disabled={isListing || !price}
                                                    className="w-full btn-primary py-4 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    {isListing ? (
                                                        <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                                                    ) : (
                                                        <span className="flex items-center justify-center gap-2">
                                                            <Tag className="w-4 h-4" />
                                                            List For Sale
                                                        </span>
                                                    )}
                                                </button>

                                                <button
                                                    onClick={() => setSelectedNFT(null)}
                                                    className="w-full text-center text-xs text-slate-500 hover:text-slate-300 transition-colors"
                                                >
                                                    Cancel Selection
                                                </button>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="empty"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 text-center"
                                        >
                                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6 text-slate-600">
                                                <Hammer className="w-8 h-8" />
                                            </div>
                                            <h3 className="text-lg font-display font-medium text-slate-300">Listing Panel</h3>
                                            <p className="text-sm text-slate-500 mt-2 mb-8 leading-relaxed">
                                                Select an NFT from your wallet to configure its price and list it on the Nexa marketplace.
                                            </p>
                                            <div className="space-y-4">
                                                <div className="h-px bg-white/5" />
                                                <div className="flex items-center gap-3 text-left">
                                                    <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center text-[10px] font-bold text-emerald-400">01</div>
                                                    <span className="text-xs text-slate-400">Instant on-chain collection</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-left">
                                                    <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center text-[10px] font-bold text-blue-400">02</div>
                                                    <span className="text-xs text-slate-400">Automated secondary royalties</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Info Footer */}
                <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-white/5">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white">Nexa Marketplace Verified</p>
                            <p className="text-xs text-slate-500">Official collection assets supported</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            href="https://sepolia.etherscan.io"
                            target="_blank"
                            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                        >
                            Verify on Explorer <ExternalLink className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
