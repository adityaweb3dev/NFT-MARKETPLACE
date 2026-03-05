"use client";

import { useReadContract, useReadContracts } from "wagmi";
import { NEXA_MARKETPLACE_ABI, NEXA_MARKETPLACE_ADDRESS, NEXA_NFT_ABI } from "@/lib/contracts";
import { useState, useEffect } from "react";
import axios from "axios";
import { getIPFSGateway } from "@/lib/utils";
import { formatEther } from "viem";

export function useListings() {
    const [listings, setListings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // 1. Get the number of listings
    const { data: nextId } = useReadContract({
        abi: NEXA_MARKETPLACE_ABI,
        address: NEXA_MARKETPLACE_ADDRESS,
        functionName: "nextListingId",
    });

    const listingIds = nextId ? Array.from({ length: Number(nextId) }, (_, i) => BigInt(i)) : [];

    // 2. Fetch all listing structs
    const { data: rawListings } = useReadContracts({
        contracts: listingIds.map((id) => ({
            abi: NEXA_MARKETPLACE_ABI,
            address: NEXA_MARKETPLACE_ADDRESS as `0x${string}`,
            functionName: "listings",
            args: [id],
        })),
    });

    // 3. Extract active listings and fetch their Token URIs
    const activeRaw = rawListings
        ? rawListings
            .map((res: any, i) => ({ result: res.result, id: listingIds[i] }))
            .filter((l) => l.result && l.result[4]) // index 4 is 'active'
        : [];

    const { data: tokenURIs } = useReadContracts({
        contracts: activeRaw.map((l) => ({
            abi: NEXA_NFT_ABI,
            address: l.result[1] as `0x${string}`, // nftContract
            functionName: "tokenURI",
            args: [l.result[2]], // tokenId
        })),
    });

    useEffect(() => {
        async function fetchMetadata() {
            if (!tokenURIs || activeRaw.length === 0) {
                if (nextId === BigInt(0)) setLoading(false);
                return;
            }

            try {
                const items = await Promise.all(
                    activeRaw.map(async (l, i) => {
                        const tokenURIResult = tokenURIs ? tokenURIs[i] : null;
                        const uri = tokenURIResult?.result as string | undefined;
                        if (!uri) return null;

                        const gatewayURL = getIPFSGateway(uri);
                        const { data: metadata } = await axios.get(gatewayURL);

                        return {
                            id: l.id.toString(),
                            tokenId: l.result[2].toString(),
                            seller: l.result[0],
                            nftContract: l.result[1],
                            price: formatEther(l.result[3]),
                            active: l.result[4],
                            name: metadata.name,
                            description: metadata.description,
                            image: getIPFSGateway(metadata.image),
                            category: metadata.category || "Art",
                            attributes: metadata.attributes || [],
                        };
                    })
                );

                setListings(items.filter(Boolean));
            } catch (error) {
                console.error("Error fetching NFT metadata:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchMetadata();
    }, [tokenURIs, activeRaw, nextId]);

    return { listings, loading };
}
