export const NFT_IMAGES = [
    "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1646753522408-077ef9839300?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1581089778245-3ce67677f718?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop",
];

export const AVATAR_IMAGES = [
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
];

export const COLLECTION_BANNERS = [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=200&fit=crop",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=200&fit=crop",
    "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&h=200&fit=crop",
    "https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?w=800&h=200&fit=crop",
];

export interface NFT {
    id: string;
    name: string;
    collection: string;
    creator: string;
    creatorAvatar: string;
    image: string;
    price: number;
    currency: string;
    likes: number;
    isAuction: boolean;
    auctionEnds?: number; // timestamp
    category: "Art" | "Music" | "Gaming" | "PFP" | "Photography";
    traits: { trait: string; value: string; rarity: number }[];
    description: string;
    royalty: number;
}

export interface Collection {
    id: string;
    name: string;
    creator: string;
    creatorAvatar: string;
    banner: string;
    floorPrice: number;
    volume: number;
    change24h: number;
    items: number;
    owners: number;
}

export const COLLECTIONS: Collection[] = [
    {
        id: "col-1",
        name: "Neon Genesis",
        creator: "0xArtist",
        creatorAvatar: AVATAR_IMAGES[0],
        banner: COLLECTION_BANNERS[0],
        floorPrice: 2.4,
        volume: 1248,
        change24h: 18.2,
        items: 10000,
        owners: 4321,
    },
    {
        id: "col-2",
        name: "Void Walkers",
        creator: "CryptoMuse",
        creatorAvatar: AVATAR_IMAGES[1],
        banner: COLLECTION_BANNERS[1],
        floorPrice: 1.1,
        volume: 830,
        change24h: -4.5,
        items: 5000,
        owners: 2108,
    },
    {
        id: "col-3",
        name: "Digital Dreams",
        creator: "PixelMaestro",
        creatorAvatar: AVATAR_IMAGES[2],
        banner: COLLECTION_BANNERS[2],
        floorPrice: 3.7,
        volume: 2100,
        change24h: 32.1,
        items: 8888,
        owners: 5211,
    },
    {
        id: "col-4",
        name: "Quantum Artifacts",
        creator: "ChainCraft",
        creatorAvatar: AVATAR_IMAGES[3],
        banner: COLLECTION_BANNERS[3],
        floorPrice: 0.8,
        volume: 420,
        change24h: 7.6,
        items: 3000,
        owners: 1122,
    },
];

const now = Date.now();
const ONE_HOUR = 3600000;
const ONE_DAY = 86400000;

export const NFTS: NFT[] = [
    {
        id: "nft-1",
        name: "Neon Genesis #001",
        collection: "Neon Genesis",
        creator: "0xArtist",
        creatorAvatar: AVATAR_IMAGES[0],
        image: NFT_IMAGES[0],
        price: 2.45,
        currency: "ETH",
        likes: 342,
        isAuction: true,
        auctionEnds: now + ONE_HOUR * 3,
        category: "Art",
        traits: [
            { trait: "Background", value: "Void Purple", rarity: 5 },
            { trait: "Eyes", value: "Neon White", rarity: 2 },
            { trait: "Outfit", value: "Chrome Suit", rarity: 8 },
        ],
        description:
            "A genesis piece from the Neon collection, representing the dawn of digital ownership.",
        royalty: 7.5,
    },
    {
        id: "nft-2",
        name: "Void Walker #888",
        collection: "Void Walkers",
        creator: "CryptoMuse",
        creatorAvatar: AVATAR_IMAGES[1],
        image: NFT_IMAGES[1],
        price: 1.2,
        currency: "ETH",
        likes: 219,
        isAuction: false,
        category: "PFP",
        traits: [
            { trait: "Type", value: "Ethereal", rarity: 3 },
            { trait: "Aura", value: "Crimson", rarity: 6 },
        ],
        description:
            "Walkers of the void dimension, existing between realms of digital reality.",
        royalty: 5,
    },
    {
        id: "nft-3",
        name: "Digital Dream Alpha",
        collection: "Digital Dreams",
        creator: "PixelMaestro",
        creatorAvatar: AVATAR_IMAGES[2],
        image: NFT_IMAGES[2],
        price: 3.8,
        currency: "ETH",
        likes: 507,
        isAuction: true,
        auctionEnds: now + ONE_DAY,
        category: "Art",
        traits: [
            { trait: "Rarity", value: "Legendary", rarity: 1 },
            { trait: "Element", value: "Digital Fire", rarity: 4 },
        ],
        description:
            "The alpha piece of the Dreams series — a vision of what digital art can become.",
        royalty: 10,
    },
    {
        id: "nft-4",
        name: "Quantum Artifact #42",
        collection: "Quantum Artifacts",
        creator: "ChainCraft",
        creatorAvatar: AVATAR_IMAGES[3],
        image: NFT_IMAGES[3],
        price: 0.9,
        currency: "ETH",
        likes: 122,
        isAuction: false,
        category: "Gaming",
        traits: [
            { trait: "Power", value: "Quantum Beam", rarity: 7 },
            { trait: "Era", value: "Post-Singularity", rarity: 9 },
        ],
        description:
            "A relic from the post-singularity timeline, imbued with quantum computational energy.",
        royalty: 6,
    },
    {
        id: "nft-5",
        name: "Echo Chamber #17",
        collection: "Neon Genesis",
        creator: "0xArtist",
        creatorAvatar: AVATAR_IMAGES[0],
        image: NFT_IMAGES[4],
        price: 1.75,
        currency: "ETH",
        likes: 284,
        isAuction: false,
        category: "Music",
        traits: [
            { trait: "Sound", value: "Resonant Bass", rarity: 4 },
            { trait: "Mood", value: "Ethereal", rarity: 5 },
        ],
        description:
            "Sound waves frozen in digital amber. An audio-visual experience encoded on-chain.",
        royalty: 8,
    },
    {
        id: "nft-6",
        name: "Prism Entity #3",
        collection: "Digital Dreams",
        creator: "PixelMaestro",
        creatorAvatar: AVATAR_IMAGES[2],
        image: NFT_IMAGES[5],
        price: 4.2,
        currency: "ETH",
        likes: 631,
        isAuction: true,
        auctionEnds: now + ONE_HOUR * 8,
        category: "Art",
        traits: [
            { trait: "Spectrum", value: "Full Prism", rarity: 1 },
            { trait: "Form", value: "Ethereal Entity", rarity: 2 },
        ],
        description:
            "An entity born from pure light, refracted through the prism of the blockchain.",
        royalty: 10,
    },
    {
        id: "nft-7",
        name: "Cyber Relic #91",
        collection: "Quantum Artifacts",
        creator: "ChainCraft",
        creatorAvatar: AVATAR_IMAGES[3],
        image: NFT_IMAGES[6],
        price: 0.65,
        currency: "ETH",
        likes: 88,
        isAuction: false,
        category: "Gaming",
        traits: [
            { trait: "Material", value: "Nano-Steel", rarity: 6 },
            { trait: "Age", value: "Year 2099", rarity: 11 },
        ],
        description:
            "A weapon from the Cyber Wars era, preserved perfectly through digital NFT technology.",
        royalty: 5,
    },
    {
        id: "nft-8",
        name: "Rave Portrait #02",
        collection: "Void Walkers",
        creator: "CryptoMuse",
        creatorAvatar: AVATAR_IMAGES[1],
        image: NFT_IMAGES[7],
        price: 1.05,
        currency: "ETH",
        likes: 196,
        isAuction: false,
        category: "Photography",
        traits: [
            { trait: "Filter", value: "Ultraviolet", rarity: 8 },
            { trait: "Expression", value: "Bliss", rarity: 5 },
        ],
        description:
            "A photographic NFT capturing the raw euphoria of the underground rave movement.",
        royalty: 7,
    },
    {
        id: "nft-9",
        name: "Nebula Core #5",
        collection: "Neon Genesis",
        creator: "0xArtist",
        creatorAvatar: AVATAR_IMAGES[0],
        image: NFT_IMAGES[8],
        price: 5.1,
        currency: "ETH",
        likes: 892,
        isAuction: true,
        auctionEnds: now + ONE_HOUR * 12,
        category: "Art",
        traits: [
            { trait: "Core", value: "Supernova", rarity: 1 },
            { trait: "Density", value: "Infinite", rarity: 1 },
        ],
        description:
            "The core of a dying nebula, captured at the moment of stellar rebirth.",
        royalty: 9,
    },
    {
        id: "nft-10",
        name: "Machina #404",
        collection: "Digital Dreams",
        creator: "PixelMaestro",
        creatorAvatar: AVATAR_IMAGES[2],
        image: NFT_IMAGES[9],
        price: 2.8,
        currency: "ETH",
        likes: 340,
        isAuction: false,
        category: "PFP",
        traits: [
            { trait: "Type", value: "Android", rarity: 4 },
            { trait: "CPU", value: "Quantum Neural", rarity: 3 },
        ],
        description:
            "Part-machine, part-consciousness — a PFP collection exploring the boundaries of identity.",
        royalty: 7.5,
    },
    {
        id: "nft-11",
        name: "Fractal Mind #11",
        collection: "Quantum Artifacts",
        creator: "ChainCraft",
        creatorAvatar: AVATAR_IMAGES[3],
        image: NFT_IMAGES[10],
        price: 1.4,
        currency: "ETH",
        likes: 211,
        isAuction: false,
        category: "Art",
        traits: [
            { trait: "Pattern", value: "Mandelbrot IV", rarity: 5 },
            { trait: "Depth", value: "Infinite", rarity: 2 },
        ],
        description:
            "A visual journey into infinite fractal recursion, encoded as a single immutable token.",
        royalty: 6,
    },
    {
        id: "nft-12",
        name: "Titan Sound #7",
        collection: "Neon Genesis",
        creator: "0xArtist",
        creatorAvatar: AVATAR_IMAGES[0],
        image: NFT_IMAGES[11],
        price: 2.0,
        currency: "ETH",
        likes: 267,
        isAuction: true,
        auctionEnds: now + ONE_HOUR * 6,
        category: "Music",
        traits: [
            { trait: "BPM", value: "128", rarity: 10 },
            { trait: "Genre", value: "Techno-Ethereal", rarity: 7 },
        ],
        description:
            "An orchestral piece composed entirely by AI, tokenized for the first time on Sepolia.",
        royalty: 8,
    },
];

export const STATS = {
    totalVolume: "2.1B",
    totalSales: "12M+",
    artists: "150K+",
    collections: "28K+",
};

export const ACTIVITY = [
    { type: "sale", nft: "Neon Genesis #001", price: 2.45, currency: "ETH", user: "0xArt...3f2a", time: "2m ago" },
    { type: "bid", nft: "Prism Entity #3", price: 3.9, currency: "ETH", user: "Whale...7b1c", time: "5m ago" },
    { type: "list", nft: "Void Walker #888", price: 1.2, currency: "ETH", user: "CryptoMuse", time: "12m ago" },
    { type: "sale", nft: "Quantum Artifact #42", price: 0.9, currency: "ETH", user: "ChainCraft", time: "23m ago" },
    { type: "bid", nft: "Nebula Core #5", price: 4.8, currency: "ETH", user: "0xVault...1a3d", time: "31m ago" },
    { type: "list", nft: "Titan Sound #7", price: 2.0, currency: "ETH", user: "0xArtist", time: "45m ago" },
];
