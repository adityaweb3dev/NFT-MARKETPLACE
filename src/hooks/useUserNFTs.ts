"use client";

import { useReadContract, useReadContracts, useAccount } from "wagmi";
import { NEXA_NFT_ABI, NEXA_NFT_ADDRESS } from "@/lib/contracts";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { getIPFSGateway } from "@/lib/utils";

/**
 * Hook to fetch NFTs owned by the connected wallet from the NexaNFT contract.
 */
export function useUserNFTs() {
    const { address } = useAccount();
    const [ownedNFTs, setOwnedNFTs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // For this demo, we scan the first 50 token IDs since the contract isn't Enumerable
    const SCAN_RANGE = 50;
    const tokenIds = Array.from({ length: SCAN_RANGE }, (_, i) => BigInt(i));

    // 1. Check ownerOf for each token ID
    const { data: owners } = useReadContracts({
        contracts: tokenIds.map((id) => ({
            abi: NEXA_NFT_ABI as any,
            address: NEXA_NFT_ADDRESS as `0x${string}`,
            functionName: "ownerOf",
            args: [id],
        })),
    });

    // 2. Identify tokens owned by the user
    const userOwnedIds = useMemo(() => {
        if (!owners || !address) return [];
        return owners
            .map((res: any, i) => ({ owner: res.result, id: tokenIds[i] }))
            .filter((item) => item.owner && item.owner.toLowerCase() === address.toLowerCase())
            .map((item) => item.id);
    }, [owners, address]);

    // 3. Fetch Token URIs for owned tokens
    const { data: tokenURIs } = useReadContracts({
        contracts: userOwnedIds.map((id) => ({
            abi: NEXA_NFT_ABI as any,
            address: NEXA_NFT_ADDRESS as `0x${string}`,
            functionName: "tokenURI",
            args: [id],
        })),
    });

    useEffect(() => {
        async function fetchMetadata() {
            if (!tokenURIs || userOwnedIds.length === 0) {
                setOwnedNFTs([]);
                setLoading(false);
                return;
            }

            try {
                const items = await Promise.all(
                    userOwnedIds.map(async (id, i) => {
                        const uri = tokenURIs[i]?.result as string | undefined;
                        if (!uri) return null;

                        const gatewayURL = getIPFSGateway(uri);
                        const { data: metadata } = await axios.get(gatewayURL);

                        return {
                            tokenId: id.toString(),
                            name: metadata.name,
                            description: metadata.description,
                            image: getIPFSGateway(metadata.image),
                            category: metadata.category || "Art",
                            attributes: metadata.attributes || [],
                            nftContract: NEXA_NFT_ADDRESS
                        };
                    })
                );

                setOwnedNFTs(items.filter(Boolean));
            } catch (error) {
                console.error("Error fetching user NFT metadata:", error);
            } finally {
                setLoading(false);
            }
        }

        if (address) {
            fetchMetadata();
        } else {
            setOwnedNFTs([]);
            setLoading(false);
        }
    }, [tokenURIs, userOwnedIds, address]);

    return { ownedNFTs, loading };
}
