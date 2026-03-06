"use client";

import { useWriteContract, useAccount, usePublicClient } from "wagmi";
import { parseEther } from "viem";
import { NEXA_NFT_ABI, NEXA_NFT_ADDRESS, NEXA_MARKETPLACE_ABI, NEXA_MARKETPLACE_ADDRESS } from "@/lib/contracts";

export function useMarketplace() {
    const { address } = useAccount();
    const { writeContractAsync } = useWriteContract();
    const publicClient = usePublicClient();

    /**
     * Mint a new NFT and wait for receipt.
     */
    const mintNFT = async (uri: string, royaltyReceiver: string, royaltyPercentage: number) => {
        const royaltyBasisPoints = Math.floor(royaltyPercentage * 100);

        const hash = await writeContractAsync({
            abi: NEXA_NFT_ABI as any,
            address: NEXA_NFT_ADDRESS as `0x${string}`,
            functionName: "mint",
            args: [address, uri, royaltyReceiver, BigInt(royaltyBasisPoints)],
        });

        if (publicClient) {
            await publicClient.waitForTransactionReceipt({ hash });
        }

        return { hash };
    };

    /**
     * Approve the marketplace to spend an NFT.
     */
    const approveNFT = async (nftContract: string, tokenId: bigint) => {
        const hash = await writeContractAsync({
            abi: NEXA_NFT_ABI as any,
            address: nftContract as `0x${string}`,
            functionName: "approve",
            args: [NEXA_MARKETPLACE_ADDRESS as `0x${string}`, tokenId],
        });

        if (publicClient) {
            await publicClient.waitForTransactionReceipt({ hash });
        }

        return hash;
    };

    /**
     * List an NFT on the marketplace.
     */
    const listNFT = async (tokenId: bigint, priceEth: string, nftContract: string = NEXA_NFT_ADDRESS) => {
        const hash = await writeContractAsync({
            abi: NEXA_MARKETPLACE_ABI as any,
            address: NEXA_MARKETPLACE_ADDRESS as `0x${string}`,
            functionName: "listNFT",
            args: [nftContract as `0x${string}`, tokenId, parseEther(priceEth)],
        });

        if (publicClient) {
            await publicClient.waitForTransactionReceipt({ hash });
        }

        return hash;
    };

    /**
     * Buy an NFT.
     */
    const buyNFT = async (listingId: bigint, priceEth: string) => {
        const hash = await writeContractAsync({
            abi: NEXA_MARKETPLACE_ABI as any,
            address: NEXA_MARKETPLACE_ADDRESS as `0x${string}`,
            functionName: "buyNFT",
            args: [listingId],
            value: parseEther(priceEth),
            gas: BigInt(300000), // Explicit gas to bypass Sepolia estimation cap
        });

        if (publicClient) {
            await publicClient.waitForTransactionReceipt({ hash });
        }

        return hash;
    };

    /**
     * Get the approved address for an NFT.
     */
    const getApproved = async (nftContract: string, tokenId: bigint) => {
        if (!publicClient) return null;
        return await publicClient.readContract({
            abi: NEXA_NFT_ABI as any,
            address: nftContract as `0x${string}`,
            functionName: "getApproved",
            args: [tokenId],
        });
    };

    return {
        mintNFT,
        approveNFT,
        listNFT,
        buyNFT,
        getApproved,
        address,
    };
}
