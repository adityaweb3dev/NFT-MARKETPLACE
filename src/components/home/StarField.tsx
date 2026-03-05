"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function StarField({ yProgress }: { yProgress?: any }) {
  const [stars, setStars] = useState<
    { id: number; x: number; y: number; size: number; dur: number; delay: number; opacity: number }[]
  >([]);

  useEffect(() => {
    // Reduced count from 80 to 50 for performance
    setStars(
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        dur: Math.random() * 4 + 2,
        delay: Math.random() * 3,
        opacity: Math.random() * 0.7 + 0.2,
      }))
    );
  }, []);

  return (
    <motion.div className="stars" style={yProgress ? { y: yProgress } : {}}>
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            ["--dur" as string]: `${s.dur}s`,
            ["--delay" as string]: `${s.delay}s`,
          }}
        />
      ))}
    </motion.div>
  );
}
