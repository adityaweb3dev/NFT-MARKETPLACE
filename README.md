<div align="center">

<img src="public/nexa-logo.png" alt="Nexa Logo" width="80" height="80" />

# Nexa — NFT Marketplace

**A full-stack Web3 NFT Marketplace built on Ethereum Sepolia Testnet**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.28-363636?style=flat-square&logo=solidity)](https://soliditylang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple?style=flat-square)](LICENSE)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)

[Live Demo](#) · [Smart Contracts](#smart-contracts) · [Getting Started](#getting-started)

</div>

---

## ✨ Features

- 🎨 **Mint NFTs** — Upload artwork to IPFS via Pinata and mint ERC-721 tokens with on-chain royalty support (ERC-2981)
- 🏪 **List & Sell** — List any owned NFT from your wallet directly to the marketplace
- 🛒 **Buy NFTs** — Purchase listed NFTs with ETH in a single transaction
- 👛 **Wallet Integration** — Connect with MetaMask, WalletConnect, Coinbase Wallet, and more via RainbowKit
- 📊 **Live Marketplace** — Real-time listings pulled directly from the blockchain
- 🔐 **Secure Contracts** — ReentrancyGuard, Ownable, and approval-based transfer flow
- ⚡ **Optimized Performance** — Dynamic imports, code splitting, and lazy loading for fast page loads

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, TypeScript, Tailwind CSS |
| **Animations** | Framer Motion, Three.js |
| **Blockchain** | Wagmi v2, Viem, RainbowKit |
| **Smart Contracts** | Solidity 0.8.28, OpenZeppelin, Hardhat |
| **Storage** | IPFS via Pinata |
| **Deployment** | Vercel (Frontend), Sepolia Testnet (Contracts) |

---

## 📁 Project Structure

```
nft-marketplace/
├── contracts/
│   ├── NexaNFT.sol              # ERC-721 + ERC-2981 royalty NFT contract
│   └── NexaMarketplace.sol      # Marketplace: list, buy, cancel
├── src/
│   ├── app/
│   │   ├── page.tsx             # Home page
│   │   ├── explore/             # Browse all listings
│   │   ├── create/              # Mint new NFTs
│   │   ├── list/                # List wallet NFTs for sale
│   │   └── nft/[id]/            # Individual NFT detail & purchase
│   ├── components/
│   │   └── home/                # Modular home page sections
│   ├── hooks/
│   │   ├── useListings.ts       # Fetch active marketplace listings
│   │   ├── useMarketplace.ts    # Mint, approve, list, buy
│   │   └── useUserNFTs.ts       # Fetch NFTs owned by connected wallet
│   ├── lib/
│   │   ├── contracts.ts         # ABIs + deployed addresses
│   │   └── utils.ts             # Helpers + blockchain error parser
│   └── providers/
│       └── Web3Provider.tsx     # Wagmi + RainbowKit setup
└── scripts/
    └── deploy.js                # Hardhat deployment script
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MetaMask browser extension
- Sepolia testnet ETH ([get free ETH here](https://cloud.google.com/application/hooks/sepolia-faucet))

### 1. Clone the Repository
```bash
git clone https://github.com/adityaweb3dev/NFT-MARKETPLACE.git
cd NFT-MARKETPLACE
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
```bash
cp .env.example .env.local
```

Fill in `.env.local`:
```env
PINATA_JWT=your_pinata_jwt_here
NEXT_PUBLIC_WALLETCONNECT_ID=your_walletconnect_project_id_here
```

| Variable | Where to Get |
|----------|-------------|
| `PINATA_JWT` | [app.pinata.cloud](https://app.pinata.cloud/developers/api-keys) |
| `NEXT_PUBLIC_WALLETCONNECT_ID` | [cloud.walletconnect.com](https://cloud.walletconnect.com) |

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Smart Contracts

Both contracts are deployed on the **Ethereum Sepolia Testnet**.

| Contract | Address |
|----------|---------|
| `NexaNFT` | [`0x26ce031808Fe3dB50476FC42bF78E99DDa4d2B30`](https://sepolia.etherscan.io/address/0x26ce031808Fe3dB50476FC42bF78E99DDa4d2B30) |
| `NexaMarketplace` | [`0x097C940d1E7Fe6E1D01817cfF581D8d4C82dc237`](https://sepolia.etherscan.io/address/0x097C940d1E7Fe6E1D01817cfF581D8d4C82dc237) |

### Contract Architecture

```
User
 │
 ├─► NexaNFT.mint()           → Mints ERC-721 token, sets royalty (ERC-2981)
 │
 ├─► NexaNFT.approve()        → Grants marketplace permission to transfer
 │
 ├─► NexaMarketplace.listNFT() → Transfers NFT to marketplace, creates listing
 │
 └─► NexaMarketplace.buyNFT()  → Buyer sends ETH → seller receives ETH → buyer receives NFT
```

### Deploy Contracts (Optional)
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

---

## 🔄 NFT Listing Flow

```
1. Connect Wallet
2. Go to "List NFTs"
3. Select an NFT from your wallet
4. Enter a price (must be > 0 ETH)
5. Sign "Approve" transaction   ← Grants marketplace access
6. Sign "List" transaction       ← Creates on-chain listing
7. NFT appears in Explore page for buyers
```

---

## 🧑‍💻 Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<div align="center">
Built with ❤️ by <a href="https://github.com/adityaweb3dev">adityaweb3dev</a>
</div>
