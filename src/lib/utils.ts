import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

export function formatPrice(price: number, currency = "MATIC"): string {
    return `${price.toFixed(2)} ${currency}`;
}

export function truncateAddress(address: string): string {
    if (address.length <= 10) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatNumber(n: number): string {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return n.toString();
}

export function formatCountdown(endTime: number): string {
    const diff = endTime - Date.now();
    if (diff <= 0) return "Ended";
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
}

export function getChangeColor(change: number): string {
    return change >= 0 ? "text-emerald-400" : "text-rose-400";
}

export function getChangePrefix(change: number): string {
    return change >= 0 ? "+" : "";
}
export function getIPFSGateway(uri: string): string {
    if (!uri) return "";
    if (uri.startsWith("ipfs://")) {
        return `https://gateway.pinata.cloud/ipfs/${uri.split("ipfs://")[1]}`;
    }
    return uri;
}

export function parseBlockchainError(error: any): string {
    console.error("Blockchain Error Raw:", error);

    const message = error.message || "";
    const name = error.name || "";
    const shortMessage = error.shortMessage || "";

    // 1. User Rejected
    if (
        message.includes("User rejected") ||
        message.includes("User denied") ||
        name === "UserRejectedRequestError" ||
        shortMessage.includes("User rejected")
    ) {
        return "Transaction was cancelled by user.";
    }

    // 2. Insufficient Funds
    if (message.includes("insufficient funds") || shortMessage.includes("insufficient funds")) {
        return "Insufficient ETH for this transaction + gas fees.";
    }

    // 3. Contract Revert with reason
    if (error.reason) {
        return `Contract Error: ${error.reason}`;
    }

    // 4. Gas Limit Issue (often means it would revert)
    if (message.includes("gas limit") || message.includes("gas required exceeds allowance")) {
        return "Transaction would fail. Check your balance or price.";
    }

    // Fallback to short message if available, otherwise generic
    return shortMessage || "An unexpected blockchain error occurred.";
}
