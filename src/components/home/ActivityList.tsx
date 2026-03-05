"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { ACTIVITY } from "@/lib/mock-data";

export default function ActivityList({ activityRef, activityInView, direction }: any) {
    return (
        <section id="activity" ref={activityRef} className="py-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: direction === "down" ? 20 : -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    animate={activityInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                >
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-400 mb-2">Activity</p>
                    <h2 className="font-remap text-3xl text-white uppercase tracking-wide flex items-center gap-3">
                        Live Activity
                        <span className="flex items-center gap-1.5 text-sm font-normal text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full font-sans normal-case tracking-normal">
                            <Activity className="w-3.5 h-3.5" />Live
                        </span>
                    </h2>
                </motion.div>
                <div className="space-y-2">
                    {ACTIVITY.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={activityInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.4, delay: i * 0.07 }}
                            className="glass-card p-4 flex items-center justify-between glass-card-hover"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${item.type === "sale" ? "bg-emerald-500/15 text-emerald-400" : item.type === "bid" ? "bg-blue-500/15 text-blue-400" : "bg-purple-500/15 text-purple-400"}`}>
                                    {item.type[0].toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">{item.nft}</p>
                                    <p className="text-xs text-slate-500">
                                        {item.type === "sale" ? "Sold by" : item.type === "bid" ? "Bid by" : "Listed by"}{" "}
                                        <span className="text-slate-400">{item.user}</span>
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-display font-bold text-sm text-white">{item.price} <span className="text-purple-400 text-xs font-sans font-normal">ETH</span></p>
                                <p className="text-xs text-slate-600">{item.time}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
