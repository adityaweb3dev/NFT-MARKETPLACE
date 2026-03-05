"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    Upload,
    Image as ImageIcon,
    Sparkles,
    CheckCircle,
    Loader2,
    Info,
    AlertCircle,
    TrendingUp,
    ChevronRight,
} from "lucide-react";
import { useMarketplace } from "@/hooks/useMarketplace";
import { uploadFileAction, uploadMetadataAction } from "@/app/actions/ipfs";
import { toast } from "react-hot-toast";

const CATEGORIES = ["Art", "Music", "Gaming", "PFP", "Photography"];

export default function CreatePage() {
    const { mintNFT, listNFT, address } = useMarketplace();
    const [dragOver, setDragOver] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [royalty, setRoyalty] = useState("7.5");
    const [category, setCategory] = useState("Art");
    const [minting, setMinting] = useState(false);
    const [minted, setMinted] = useState(false);
    const [listing, setListing] = useState(false);
    const [listed, setListed] = useState(false);
    const [tokenId, setTokenId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFile = useCallback((file: File) => {
        if (!file.type.startsWith("image/")) {
            toast.error("Please upload an image file");
            return;
        }
        setFile(file);
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target?.result as string);
        reader.readAsDataURL(file);
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setDragOver(false);
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile) handleFile(droppedFile);
        },
        [handleFile]
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) handleFile(selectedFile);
    };

    const handleMint = async () => {
        if (!file || !name || !price || !address) {
            if (!address) toast.error("Please connect your wallet first");
            return;
        }

        setMinting(true);
        setError(null);

        try {
            // 1. Upload Image to IPFS (Server Action)
            toast.loading("Uploading image to IPFS...", { id: "mint-toast" });
            const formData = new FormData();
            formData.append("file", file);

            const imageResult = await uploadFileAction(formData);
            if (!imageResult.success || !imageResult.cid) {
                throw new Error(imageResult.error || "Image upload failed");
            }
            const imageURL = `ipfs://${imageResult.cid}`;

            // 2. Upload Metadata to IPFS (Server Action)
            toast.loading("Uploading metadata...", { id: "mint-toast" });
            const metadata = {
                name,
                description,
                image: imageURL,
                category,
                attributes: [{ trait_type: "Category", value: category }],
            };
            const metadataResult = await uploadMetadataAction(metadata);
            if (!metadataResult.success || !metadataResult.cid) {
                throw new Error(metadataResult.error || "Metadata upload failed");
            }
            const metadataURL = `ipfs://${metadataResult.cid}`;

            // 3. Mint NFT
            toast.loading("Confirming mint transaction...", { id: "mint-toast" });
            const { hash } = await mintNFT(metadataURL, address, parseFloat(royalty));

            toast.success("NFT Minted successfully!", { id: "mint-toast" });
            setMinted(true);
            setTokenId("1"); // In a real app, extract from receipt
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Something went wrong during minting");
            toast.error("Minting failed", { id: "mint-toast" });
        } finally {
            setMinting(false);
        }
    };

    const handleList = async () => {
        if (!tokenId || !price || !address) return;

        setListing(true);
        const toastId = toast.loading("Listing NFT on Marketplace...");

        try {
            await listNFT(BigInt(tokenId), price);
            toast.success("NFT Listed successfully!", { id: toastId });
            setListed(true);
        } catch (err: any) {
            console.error(err);
            toast.error("Listing failed", { id: toastId });
        } finally {
            setListing(false);
        }
    };

    const canMint = preview && name && price && !minting && !minted && address;
    const canList = minted && !listing && !listed;

    return (
        <div className="min-h-screen pt-24 pb-20">
            {/* Header */}
            <div className="relative py-10 overflow-hidden">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(124,58,237,0.15), transparent)",
                    }}
                />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-400 mb-2">
                            Studio
                        </p>
                        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-2">
                            Create NFT
                        </h1>
                        <p className="text-slate-400">
                            Mint your artwork on Ethereum Sepolia with automated royalties
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-10">
                    {/* Left: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="space-y-5"
                    >
                        {/* Wallet check */}
                        {!address && (
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                Please connect your wallet to start minting.
                            </div>
                        )}

                        {/* Error display */}
                        {error && (
                            <div className="flex items-center gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        {/* Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Artwork *
                            </label>
                            <label
                                className={`relative flex flex-col items-center justify-center w-full h-52 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 ${dragOver
                                    ? "border-purple-500 bg-purple-500/10"
                                    : "border-white/10 bg-white/[0.02] hover:border-purple-500/50 hover:bg-white/5"
                                    }`}
                                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    className="sr-only"
                                    accept="image/*"
                                    onChange={handleInputChange}
                                />
                                <Upload className="w-8 h-8 text-slate-600 mb-3" />
                                <p className="text-sm font-medium text-slate-400">
                                    Drop your file here, or{" "}
                                    <span className="text-purple-400">browse</span>
                                </p>
                                <p className="text-xs text-slate-600 mt-1">
                                    PNG, JPG, GIF, SVG (Max 10MB)
                                </p>
                            </label>
                        </div>

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Name *
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='e.g. "Neon Genesis #001"'
                                className="w-full px-4 py-3 text-sm bg-white/5 border border-white/[0.06] rounded-xl text-white placeholder:text-slate-600 outline-none focus:border-purple-500/60 transition-colors"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                placeholder="Describe your artwork and its story..."
                                className="w-full px-4 py-3 text-sm bg-white/5 border border-white/[0.06] rounded-xl text-white placeholder:text-slate-600 outline-none focus:border-purple-500/60 transition-colors resize-none"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-300 mb-2">
                                Category
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {CATEGORIES.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setCategory(cat)}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${category === cat
                                            ? "bg-purple-500/20 border border-purple-500/50 text-purple-300"
                                            : "bg-white/5 border border-white/[0.06] text-slate-400 hover:border-white/20"
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price & Royalty */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-300 mb-2">
                                    Price (ETH) *
                                </label>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                    className="w-full px-4 py-3 text-sm bg-white/5 border border-white/[0.06] rounded-xl text-white placeholder:text-slate-600 outline-none focus:border-purple-500/60 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-300 mb-2">
                                    Royalty (%)
                                    <Info className="w-3.5 h-3.5 text-slate-600" />
                                </label>
                                <input
                                    type="number"
                                    value={royalty}
                                    onChange={(e) => setRoyalty(e.target.value)}
                                    placeholder="7.5"
                                    min="0"
                                    max="30"
                                    step="0.5"
                                    className="w-full px-4 py-3 text-sm bg-white/5 border border-white/[0.06] rounded-xl text-white placeholder:text-slate-600 outline-none focus:border-purple-500/60 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Royalty slider */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <p className="text-xs text-slate-500">
                                    Royalty on secondary sales
                                </p>
                                <p className="text-xs font-bold text-emerald-400">{royalty}%</p>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="30"
                                step="0.5"
                                value={royalty}
                                onChange={(e) => setRoyalty(e.target.value)}
                                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                                style={{
                                    background: `linear-gradient(to right, #7C3AED ${(parseFloat(royalty) / 30) * 100}%, #1E2D4A ${(parseFloat(royalty) / 30) * 100}%)`,
                                }}
                            />
                            <div className="flex justify-between mt-1">
                                <span className="text-[10px] text-slate-700">0%</span>
                                <span className="text-[10px] text-slate-700">30%</span>
                            </div>
                        </div>

                        {/* Info notice */}
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                            <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-blue-300 leading-relaxed">
                                Royalties are enforced on-chain via <strong>EIP-2981</strong>.
                                You&apos;ll earn {royalty || "0"}% on every secondary sale,
                                automatically, forever — no platform dependency required.
                            </p>
                        </div>

                        {/* Action Button (Mint -> List -> Done) */}
                        <motion.button
                            onClick={minted ? handleList : handleMint}
                            disabled={minted ? !canList : !canMint}
                            whileHover={(minted ? canList : canMint) ? { scale: 1.01 } : {}}
                            whileTap={(minted ? canList : canMint) ? { scale: 0.99 } : {}}
                            className={`w-full py-4 rounded-xl font-display font-bold text-base flex items-center justify-center gap-2.5 transition-all duration-300 ${listed
                                ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300"
                                : (minted ? canList : canMint)
                                    ? "btn-primary shadow-glow-purple"
                                    : "!bg-white/5 border border-white/[0.06] text-slate-600 cursor-not-allowed"
                                }`}
                        >
                            {minting || listing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    {minting ? "Minting..." : "Listing..."}
                                </>
                            ) : listed ? (
                                <>
                                    <CheckCircle className="w-5 h-5" />
                                    Listed on Marketplace!
                                </>
                            ) : minted ? (
                                <>
                                    <TrendingUp className="w-5 h-5" />
                                    List for Sale ({price} ETH)
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Mint NFT
                                </>
                            )}
                        </motion.button>

                        {/* Success Link */}
                        {listed && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center"
                            >
                                <Link
                                    href="/explore"
                                    className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                                >
                                    View in Explore Page
                                    <ChevronRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Right: Preview Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:sticky lg:top-24 h-fit"
                    >
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-4">
                            Preview
                        </p>

                        <div className="glass-card overflow-hidden max-w-sm mx-auto">
                            {/* Image area */}
                            <div className="aspect-square relative">
                                {preview ? (
                                    <Image
                                        src={preview}
                                        alt="NFT preview"
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 384px"
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20">
                                        <ImageIcon className="w-12 h-12 text-slate-700 mb-3" />
                                        <p className="text-sm text-slate-600">
                                            Upload artwork to preview
                                        </p>
                                    </div>
                                )}

                                {/* Category badge */}
                                {category && (
                                    <div className="absolute top-3 left-3">
                                        <span className="tag bg-black/40 backdrop-blur-sm text-slate-300 border border-white/10 text-[10px]">
                                            {category}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Card info */}
                            <div className="p-5">
                                <p className="text-xs text-slate-500 mb-1">
                                    By You · NexaMarket
                                </p>
                                <h3 className="font-display font-bold text-white text-base mb-1 truncate">
                                    {name || "Your NFT Name"}
                                </h3>
                                {description && (
                                    <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">
                                        {description}
                                    </p>
                                )}

                                <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                                    <div>
                                        <p className="text-[10px] text-slate-600 uppercase mb-0.5">
                                            Price
                                        </p>
                                        <p className="font-display font-bold text-white">
                                            {price || "0.00"}{" "}
                                            <span className="text-purple-400 text-xs font-normal">
                                                ETH
                                            </span>
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-slate-600 uppercase mb-0.5">
                                            Royalty
                                        </p>
                                        <p className="text-sm font-bold text-emerald-400">
                                            {royalty}%
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Platform fee note */}
                        <div className="mt-4 max-w-sm mx-auto text-center">
                            <p className="text-xs text-slate-600">
                                Platform fee: <span className="text-slate-400">1.5%</span> ·
                                Gas fees paid in ETH · Ethereum Sepolia
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
