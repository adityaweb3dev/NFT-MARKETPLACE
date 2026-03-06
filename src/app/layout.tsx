import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Web3Provider } from "@/providers/Web3Provider";

export const metadata: Metadata = {
  title: "NexaMarket — NFT Marketplace on Sepolia",
  description:
    "Discover, collect, and trade extraordinary NFTs. Automated royalties, low gas fees, and creator-first economics on Ethereum Sepolia.",
  keywords: "NFT, marketplace, Sepolia, digital art, blockchain, Web3",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "NexaMarket — NFT Marketplace",
    description: "Discover, collect, and trade extraordinary NFTs on Ethereum Sepolia.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0B0F19] text-slate-100 antialiased">
        <Web3Provider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Web3Provider>
      </body>
    </html>
  );
}
