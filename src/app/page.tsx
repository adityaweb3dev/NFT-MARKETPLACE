"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useInView, useScroll, useTransform } from "framer-motion";
import { useListings } from "@/hooks/useListings";
import { useScrollDirection } from "@/hooks/useScrollDirection";

// --- Critical Components (Direct Import) ---
import HeroSection from "@/components/home/HeroSection";

// --- Non-Critical Components (Dynamic Import) ---
const LiveBids = dynamic(() => import("@/components/home/LiveBids"), { ssr: false });
const ExploreGrid = dynamic(() => import("@/components/home/ExploreGrid"), { ssr: false });
const Storytelling = dynamic(() => import("@/components/home/Storytelling"), { ssr: false });
const TrendingCollections = dynamic(() => import("@/components/home/TrendingCollections"), { ssr: false });
const ActivityList = dynamic(() => import("@/components/home/ActivityList"), { ssr: false });
const CtaSection = dynamic(() => import("@/components/home/CtaSection"), { ssr: false });
const HowItWorks = dynamic(() => import("@/components/HowItWorks"), { ssr: false });
const TechStack = dynamic(() => import("@/components/TechStack"), { ssr: false });

export default function HomePage() {
  const { listings, loading } = useListings();
  const direction = useScrollDirection();
  const auctionEnd = Date.now() + 1000 * 60 * 60 * 12 + 1000 * 60 * 3 + 1000 * 43;

  // Refs for scroll sections
  const liveBidRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const collectionsRef = useRef<HTMLDivElement>(null);
  const collectionsInView = useInView(collectionsRef);
  const activityRef = useRef<HTMLDivElement>(null);
  const activityInView = useInView(activityRef);
  const ctaRef = useRef<HTMLDivElement>(null);

  // --- Parallax & Scroll Transformations ---
  const { scrollYProgress } = useScroll();
  const yText = useTransform(scrollYProgress, [0, 1], ["0px", "-250px"]);
  const xText = useTransform(scrollYProgress, [0, 0.5], ["0px", "50px"]);
  const rotateText = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const yHeroImage = useTransform(scrollYProgress, [0, 1], ["0px", "150px"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const badgeRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const badgeX = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <>
      {/* Universal Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute top-[60%] right-[-10%] w-[600px] h-[600px] rounded-full bg-pink-600/5 blur-[150px]" />
        <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[100px]" />
      </div>

      <HeroSection
        listings={listings}
        yText={yText}
        xText={xText}
        rotateText={rotateText}
        opacityHero={opacityHero}
        yHeroImage={yHeroImage}
        badgeRotate={badgeRotate}
        badgeX={badgeX}
        auctionEnd={auctionEnd}
      />

      <LiveBids listings={listings} liveBidRef={liveBidRef} />

      <ExploreGrid listings={listings} exploreRef={exploreRef} direction={direction} />

      <Storytelling whyRef={whyRef} direction={direction} />

      <HowItWorks />

      <TrendingCollections
        collectionsRef={collectionsRef}
        collectionsInView={collectionsInView}
        direction={direction}
      />

      <TechStack />

      <ActivityList
        activityRef={activityRef}
        activityInView={activityInView}
        direction={direction}
      />

      <CtaSection ctaRef={ctaRef} direction={direction} />
    </>
  );
}
