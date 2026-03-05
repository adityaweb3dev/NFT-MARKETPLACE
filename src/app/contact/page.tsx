"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Mail,
    MessageSquare,
    Send,
    Twitter,
    Github,
    CheckCircle,
    Loader2,
    MapPin,
    Clock,
    ExternalLink,
} from "lucide-react";

import { submitContactAction } from "@/app/actions/contact";
import { toast } from "react-hot-toast";

const SOCIALS = [
    { name: "Twitter / X", handle: "@LUCKY1816989", icon: Twitter, url: "https://x.com/LUCKY1816989", color: "#1DA1F2" },
    { name: "GitHub", handle: "nexamarket-labs", icon: Github, url: "https://github.com", color: "#f1f5f9" },
    { name: "Discord", handle: "discord.gg/nexamarket", icon: MessageSquare, url: "https://discord.com", color: "#5865F2" },
];

const INFO = [
    { icon: Mail, label: "Email", value: "adityalucky330@gmail.com", color: "text-purple-400", href: "mailto:adityalucky330@gmail.com" },
    { icon: MapPin, label: "Headquarters", value: "Ethereum Ecosystem — Remote-first", color: "text-pink-400", href: null },
    { icon: Clock, label: "Response Time", value: "Within 24 hours on weekdays", color: "text-blue-400", href: null },
];

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [errors, setErrors] = useState<Partial<typeof form>>({});

    const validate = () => {
        const e: Partial<typeof form> = {};
        if (!form.name.trim()) e.name = "Name is required";
        if (!form.email.includes("@")) e.email = "Valid email required";
        if (!form.subject.trim()) e.subject = "Subject is required";
        if (form.message.length < 20) e.message = "Message must be at least 20 characters";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setSending(true);
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("subject", form.subject);
        formData.append("message", form.message);

        try {
            const result = await submitContactAction(null, formData);
            if (result.success) {
                setSent(true);
                toast.success(result.message || "Message sent!");
            } else {
                toast.error(result.error || "Failed to send message");
            }
        } catch (err) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setSending(false);
        }
    };

    const field = (key: keyof typeof form) => ({
        value: form[key],
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setForm((f) => ({ ...f, [key]: e.target.value }));
            if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }));
        },
    });

    return (
        <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 70% 50% at 20% 30%, rgba(90,20,150,0.25), transparent), radial-gradient(ellipse 50% 40% at 80% 70%, rgba(180,20,80,0.12), transparent), #080012",
                }}
            />
            {/* Floating orbs */}
            <div className="absolute top-40 left-10 w-72 h-72 bg-purple-700/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-700/8 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16"
                >
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-400 mb-3">Get In Touch</p>
                    <h1 className="font-remap uppercase text-4xl sm:text-6xl text-white mb-4 tracking-wide leading-tight">
                        Contact{" "}
                        <span
                            style={{
                                background: "linear-gradient(135deg, #ff2d78, #a855f7)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Us
                        </span>
                    </h1>
                    <p className="text-slate-400 text-base max-w-lg mx-auto leading-relaxed">
                        Have a question, partnership idea, or creator collab in mind? We read every message personally.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-[1fr_420px] gap-10 items-start">
                    {/* ── LEFT: Form ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="glass-card p-8 relative overflow-hidden"
                        style={{ border: "1px solid rgba(168,85,247,0.2)" }}
                    >
                        {/* Glow top-left */}
                        <div className="absolute -top-12 -left-12 w-40 h-40 bg-purple-600/15 rounded-full blur-2xl pointer-events-none" />

                        {sent ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center text-center py-16"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center mb-5">
                                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                                </div>
                                <h3 className="font-display font-bold text-2xl text-white uppercase mb-2">Message Sent!</h3>
                                <p className="text-slate-400 text-sm max-w-xs">
                                    Thanks for reaching out, {form.name.split(" ")[0]}. We&apos;ll get back to you within 24 hours.
                                </p>
                                <button
                                    onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                                    className="mt-6 btn-outline text-sm"
                                >
                                    Send Another Message
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5 relative">
                                <h2 className="font-display font-bold text-xl text-white uppercase tracking-wide mb-6">
                                    Send a Message
                                </h2>

                                {/* Name + Email row */}
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {(["name", "email"] as const).map((key) => (
                                        <div key={key}>
                                            <label className="block text-sm font-bold uppercase tracking-widest text-slate-400 mb-2.5 ml-1">
                                                {key === "name" ? "Your Name" : "Email Address"}
                                            </label>
                                            <input
                                                type={key === "email" ? "email" : "text"}
                                                placeholder={key === "email" ? "you@example.com" : "Satoshi Nakamoto"}
                                                {...field(key)}
                                                className={`w-full px-5 py-4 text-base rounded-xl text-white placeholder:text-slate-600 outline-none transition-all duration-200 ${errors[key]
                                                    ? "bg-rose-500/10 border border-rose-500/50 focus:border-rose-500"
                                                    : "bg-white/[0.04] border border-white/[0.08] focus:border-purple-500/60 focus:bg-white/[0.06]"
                                                    }`}
                                            />
                                            {errors[key] && <p className="text-rose-400 text-xs mt-1.5 ml-1 font-medium">{errors[key]}</p>}
                                        </div>
                                    ))}
                                </div>

                                {/* Subject */}
                                <div>
                                    <label className="block text-sm font-bold uppercase tracking-widest text-slate-400 mb-2.5 ml-1">Subject</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Creator Partnership, Technical Issue, Feedback..."
                                        {...field("subject")}
                                        className={`w-full px-5 py-4 text-base rounded-xl text-white placeholder:text-slate-600 outline-none transition-all duration-200 ${errors.subject
                                            ? "bg-rose-500/10 border border-rose-500/50"
                                            : "bg-white/[0.04] border border-white/[0.08] focus:border-purple-500/60 focus:bg-white/[0.06]"
                                            }`}
                                    />
                                    {errors.subject && <p className="text-rose-400 text-xs mt-1.5 ml-1 font-medium">{errors.subject}</p>}
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-sm font-bold uppercase tracking-widest text-slate-400 mb-2.5 ml-1">Message</label>
                                    <textarea
                                        rows={6}
                                        placeholder="Tell us what's on your mind..."
                                        {...field("message")}
                                        className={`w-full px-5 py-4 text-base rounded-xl text-white placeholder:text-slate-600 outline-none transition-all duration-200 resize-none ${errors.message
                                            ? "bg-rose-500/10 border border-rose-500/50"
                                            : "bg-white/[0.04] border border-white/[0.08] focus:border-purple-500/60 focus:bg-white/[0.06]"
                                            }`}
                                    />
                                    <div className="flex items-center justify-between mt-1.5 ml-1 font-medium">
                                        {errors.message ? (
                                            <p className="text-rose-400 text-xs">{errors.message}</p>
                                        ) : <span />}
                                        <span className={`text-xs ${form.message.length < 20 ? "text-slate-600" : "text-emerald-500"}`}>
                                            {form.message.length} / 20 min
                                        </span>
                                    </div>
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={sending}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="btn-primary w-full justify-center py-4 text-lg mt-4 font-bold"
                                >
                                    {sending ? (
                                        <><Loader2 className="w-5 h-5 animate-spin" /> Sending…</>
                                    ) : (
                                        <><Send className="w-5 h-5" /> Send Message</>
                                    )}
                                </motion.button>
                            </form>
                        )}
                    </motion.div>

                    {/* ── RIGHT: Info + Socials ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-5"
                    >
                        {/* Info cards */}
                        <div className="space-y-3">
                            {INFO.map(({ icon: Icon, label, value, color, href }) => {
                                const Card = (
                                    <div key={label} className="glass-card p-5 flex items-start gap-4 transition-colors hover:border-purple-500/30" style={{ border: "1px solid rgba(168,85,247,0.12)" }}>
                                        <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                                            <Icon className={`w-4 h-4 ${color}`} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">{label}</p>
                                            <p className="text-sm font-medium text-white">{value}</p>
                                        </div>
                                    </div>
                                );
                                return href ? (
                                    <a key={label} href={href} className="block">{Card}</a>
                                ) : Card;
                            })}
                        </div>

                        {/* Divider */}
                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-px bg-white/[0.06]" />
                            <span className="text-xs text-slate-600 uppercase tracking-widest">Socials</span>
                            <div className="flex-1 h-px bg-white/[0.06]" />
                        </div>

                        {/* Social links */}
                        <div className="space-y-3">
                            {SOCIALS.map(({ name, handle, icon: Icon, url, color }) => (
                                <a
                                    key={name}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass-card p-4 flex items-center justify-between group transition-all duration-300 hover:border-purple-500/40"
                                    style={{ border: "1px solid rgba(168,85,247,0.1)" }}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className="w-4 h-4" style={{ color }} />
                                        <div>
                                            <p className="text-xs text-slate-500">{name}</p>
                                            <p className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">{handle}</p>
                                        </div>
                                    </div>
                                    <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-purple-400 transition-colors" />
                                </a>
                            ))}
                        </div>

                        {/* FAQ hint */}
                        <div className="glass-card p-5" style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(168,85,247,0.2)" }}>
                            <p className="text-xs font-semibold text-purple-300 mb-1">🚀 For Creator Partnerships</p>
                            <p className="text-xs text-slate-400 leading-relaxed">
                                Include your portfolio link and follower count in your message — we prioritize creator collaborations!
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
