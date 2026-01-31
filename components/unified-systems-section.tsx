"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ScrollReveal } from "@/components/scroll-reveal"
import { TextReveal } from "@/components/text-reveal"
import {
    Cpu,
    Code2,
    TrendingUp,
    ArrowRight,
    Layers,
    Database,
    ShieldCheck,
    Zap,
    Activity,
    Share2,
    Workflow
} from "lucide-react"

// --- Domain 01: AI Systems ---
function AISystemCard() {
    return (
        <div className="relative group">
            <div className="absolute inset-0 bg-white/5 blur-xl md:blur-2xl group-hover:bg-white/10 transition-colors duration-500 rounded-3xl" />
            <div className="relative bg-zinc-950 border border-white/10 rounded-3xl p-8 h-full transition-all duration-500 group-hover:border-white/20">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                        <Cpu className="size-5 text-white" />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">Domain 01</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-light text-white mb-4 font-headings uppercase tracking-tight">AI Systems & Automation</h3>
                <p className="text-zinc-400 leading-relaxed mb-8 font-light">
                    We design and deploy AI systems that reduce manual work and bring structure to operations. Our focus is not experimentation, but reliable performance.
                </p>

                <div className="space-y-4 mb-12">
                    {[
                        { label: "AI Agents & Internal Ops", icon: Zap },
                        { label: "Workflow Automation", icon: Workflow },
                        { label: "Intelligent Processing", icon: Activity },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                        >
                            <item.icon className="size-4 text-zinc-400" />
                            <span className="text-sm font-light text-zinc-300">{item.label}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Visual Mockup - AI Nodes */}
                <div className="relative h-48 overflow-hidden rounded-2xl bg-black/50 border border-white/5 flex items-center justify-center">
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                    <div className="flex gap-4">
                        {[0, 1, 2].map(i => (
                            <motion.div
                                key={i}
                                animate={{
                                    height: [20, 60, 40, 80, 20],
                                    opacity: [0.3, 1, 0.5, 1, 0.3]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: i * 0.5,
                                    ease: "easeInOut"
                                }}
                                viewport={{ once: false }}
                                className="w-1 bg-white rounded-full will-change-[height,opacity]"
                            />
                        ))}
                    </div>
                    <div className="absolute bottom-4 right-4">
                        <div className="flex gap-1">
                            <div className="size-1 rounded-full bg-white animate-pulse" />
                            <div className="size-1 rounded-full bg-white animate-pulse delay-75" />
                            <div className="size-1 rounded-full bg-white animate-pulse delay-150" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// --- Domain 02: Software & Mobile ---
function SoftwareSystemCard() {
    return (
        <div className="relative group">
            <div className="absolute inset-0 bg-white/5 blur-2xl group-hover:bg-white/10 transition-colors duration-500 rounded-3xl" />
            <div className="relative bg-zinc-950 border border-white/10 rounded-3xl p-8 h-full transition-all duration-500 group-hover:border-white/20">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                        <Code2 className="size-5 text-white" />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">Domain 02</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-light text-white mb-4 font-headings uppercase tracking-tight">Software & Mobile Apps</h3>
                <p className="text-zinc-400 leading-relaxed mb-8 font-light">
                    Software that holds up as teams grow. We design and build software systems that are clean, scalable, and easy to operate long-term.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
                    {[
                        { label: "Custom SaaS", icon: Layers },
                        { label: "Web Apps", icon: Code2 },
                        { label: "Mobile Apps", icon: Activity },
                        { label: "Backend/APIs", icon: Database },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="flex flex-col gap-2 p-3 rounded-xl bg-white/5 border border-white/5 text-left"
                        >
                            <item.icon className="size-4 text-zinc-500" />
                            <span className="text-xs font-light text-zinc-300">{item.label}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Visual Mockup - Modular Blueprint */}
                <div className="relative h-48 overflow-hidden rounded-2xl bg-black/50 border border-white/5">
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" />
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                        <div className="w-full h-full relative border border-white/10 rounded-lg">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "60%" }}
                                transition={{ duration: 1.5, ease: "circOut" }}
                                className="absolute top-4 left-4 h-2 bg-white/20 rounded-full"
                            />
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "40%" }}
                                transition={{ duration: 1.5, delay: 0.2, ease: "circOut" }}
                                className="absolute top-10 left-4 h-2 bg-white/10 rounded-full"
                            />
                            <div className="absolute bottom-4 right-4 flex gap-2">
                                <motion.div
                                    animate={{ opacity: [0.2, 1, 0.2] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="size-12 border border-white/20 rounded-md"
                                />
                                <motion.div
                                    animate={{ opacity: [0.2, 1, 0.2] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                    viewport={{ once: false }}
                                    className="size-12 border border-white/20 rounded-md bg-white/5 will-change-opacity"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// --- Domain 03: Growth Systems ---
function GrowthSystemCard() {
    return (
        <div className="relative group">
            <div className="absolute inset-0 bg-white/5 blur-2xl group-hover:bg-white/10 transition-colors duration-500 rounded-3xl" />
            <div className="relative bg-zinc-950 border border-white/10 rounded-3xl p-8 h-full transition-all duration-500 group-hover:border-white/20">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                        <TrendingUp className="size-5 text-white" />
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">Domain 03</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-light text-white mb-4 font-headings uppercase tracking-tight">Growth & Marketing Systems</h3>
                <p className="text-zinc-400 leading-relaxed mb-8 font-light">
                    Growth systems, not campaigns. Infrastructure that supports consistent acquisition and conversion without manual effort.
                </p>

                <div className="space-y-3 mb-12">
                    {[
                        "Automated Lead Gen",
                        "CRM & Infrastructure",
                        "Performance Engines"
                    ].map((label, i) => (
                        <div key={i} className="flex items-center gap-4 group/item">
                            <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: (0.7 + i * 0.1) }}
                                    transition={{ duration: 1.5, delay: i * 0.2, ease: "circOut" }}
                                    className="h-full bg-zinc-600 origin-left group-hover/item:bg-white transition-colors"
                                />
                            </div>
                            <span className="text-[10px] font-mono text-zinc-500 whitespace-nowrap uppercase">{label}</span>
                        </div>
                    ))}
                </div>

                {/* Visual Mockup - Flow Diagram */}
                <div className="relative h-48 overflow-hidden rounded-2xl bg-black/50 border border-white/5 p-6 border-zinc-900">
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" />
                    <div className="h-full flex flex-col justify-between relative">
                        <div className="flex justify-between items-center px-4">
                            <Activity className="size-4 text-zinc-600" />
                            <div className="h-[1px] flex-1 mx-4 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            <Share2 className="size-4 text-zinc-600" />
                        </div>
                        <div className="flex justify-center">
                            <motion.div
                                animate={{
                                    boxShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 20px rgba(255,255,255,0.1)", "0 0 0px rgba(255,255,255,0)"]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="px-4 py-1 rounded border border-white/10 text-[10px] font-mono whitespace-nowrap text-zinc-400"
                            >
                                CONVERSION_OPTIMIZED
                            </motion.div>
                        </div>
                        <div className="flex justify-between items-center px-4">
                            <ShieldCheck className="size-4 text-zinc-600" />
                            <div className="h-[1px] flex-1 mx-4 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                            <Database className="size-4 text-zinc-600" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



// ... (imports remain the same, removing unused framer-motion imports if possible, but keeping them if used inside cards)

export function UnifiedSystemsSection() {
    const containerRef = useRef(null)

    return (
        <section id="capabilities" className="bg-black py-24 lg:py-32 relative">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:64px_64px]" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-3xl mb-24">
                    <ScrollReveal>
                        <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-zinc-500 mb-6">Expertise Domains</h2>
                        <div className="text-4xl md:text-5xl font-light text-white font-headings tracking-tight leading-[1.1] mb-8">
                            <TextReveal>We design infrastructure</TextReveal><br />
                            <span className="text-zinc-600 italic">not features</span>
                        </div>
                        <p className="text-lg text-zinc-400 font-light leading-relaxed">
                            Our work spans AI, software, and growth infrastructure, always focused on long-term reliability rather than short-term wins.
                        </p>
                    </ScrollReveal>
                </div>

                <ScrollReveal staggerChildren={0.15} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AISystemCard />
                    <SoftwareSystemCard />
                    <GrowthSystemCard />
                </ScrollReveal>


                <ScrollReveal delay={0.5} className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <p className="text-zinc-500 text-sm font-light max-w-lg italic">
                        "Airya is built on the belief that good systems compound quietly over time."
                    </p>
                    <motion.a
                        href="/services"
                        whileHover={{ x: 10 }}
                        className="group flex items-center gap-3 text-white text-sm font-mono tracking-widest uppercase"
                    >
                        View Full Services
                        <ArrowRight className="size-4 group-hover:translate-x-2 transition-transform" />
                    </motion.a>
                </ScrollReveal>
            </div>
        </section>
    )
}
