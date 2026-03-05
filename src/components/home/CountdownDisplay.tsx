"use client";

import { useState, useEffect } from "react";

function useCountdown(target: number) {
    const calc = () => {
        const diff = target - Date.now();
        if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
        return {
            d: Math.floor(diff / 86400000),
            h: Math.floor((diff % 86400000) / 3600000),
            m: Math.floor((diff % 3600000) / 60000),
            s: Math.floor((diff % 60000) / 1000),
        };
    };
    const [time, setTime] = useState(calc());
    useEffect(() => {
        const id = setInterval(() => setTime(calc()), 1000);
        return () => clearInterval(id);
    }, []); // Added missing dependency array
    return time;
}

export default function CountdownDisplay({ target }: { target: number }) {
    const { d, h, m, s } = useCountdown(target);
    const parts = [
        { v: d, label: "Days" },
        { v: h, label: "Hours" },
        { v: m, label: "Mins" },
        { v: s, label: "Secs" },
    ];
    return (
        <div className="flex items-center gap-2">
            {parts.map(({ v, label }, i) => (
                <div key={i} className="countdown-box">
                    <span className="font-mono text-2xl font-bold text-white leading-none tracking-tighter">
                        {String(v).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] text-purple-400 mt-1 uppercase tracking-[0.2em] font-bold">
                        {label}
                    </span>
                </div>
            ))}
        </div>
    );
}
