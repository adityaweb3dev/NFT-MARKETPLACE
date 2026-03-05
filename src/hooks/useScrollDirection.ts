"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export type ScrollDirection = "up" | "down";

export function useScrollDirection() {
    const { scrollY } = useScroll();
    const [direction, setDirection] = useState<ScrollDirection>("down");

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (previous !== undefined) {
            const diff = latest - previous;
            if (diff > 0) {
                setDirection("down");
            } else if (diff < 0) {
                setDirection("up");
            }
        }
    });

    return direction;
}
