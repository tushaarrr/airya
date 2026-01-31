"use client"

import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Bot, Activity, Smartphone, Layout, ArrowRight, TrendingUp, Users, Code2, Database } from "lucide-react"
import { useState, useEffect } from "react"

// --- Helper Components ---

const LetterStagger = ({ text, className = "", delay = 0 }: { text: string, className?: string, delay?: number }) => {
    const characters = Array.from(text)
    return (
        <span className={`inline-block ${className}`}>
            {characters.map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.05, delay: delay + i * 0.03, ease: "easeOut" }}
                    className="inline-block"
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </span>
    )
}

const FloatingContainer = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
    <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, delay, repeat: Infinity, ease: "easeInOut" }}
        className="h-full"
    >
        {children}
    </motion.div>
)

// --- Demo: AI Agent System (Monochromatic) ---
const AIDemo = () => {
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: 'Operational. Identifying customer needs...' },
        { id: 2, type: 'wait', text: '...' }
    ])

    useEffect(() => {
        const sequence = async () => {
            await new Promise(r => setTimeout(r, 2000))
            setMessages(prev => prev.map(m => m.type === 'wait' ? { id: 3, type: 'user', text: 'What is the current system load?' } : m))

            await new Promise(r => setTimeout(r, 1000))
            setMessages(prev => [...prev, { id: 4, type: 'wait', text: '...' }])

            await new Promise(r => setTimeout(r, 1500))
            setMessages(prev => prev.filter(m => m.type !== 'wait').concat({
                id: 5, type: 'bot', text: 'Load is optimal. Handling 45 active threads securely.'
            }))
        }
        sequence()
    }, [])

    return (
        <div className="relative w-full max-w-sm mx-auto h-[600px] bg-black rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden ring-1 ring-white/20">
            {/* Notch */}
            <div className="absolute top-0 w-full h-7 bg-black z-30 flex justify-center border-b border-white/5 rounded-b-xl">
                <div className="w-28 h-5 bg-black rounded-b-xl" />
            </div>

            {/* App Interface */}
            <div className="h-full w-full bg-black flex flex-col pt-10 relative">
                {/* Navbar */}
                <div className="px-6 pb-4 border-b border-white/10 flex justify-between items-center bg-black/80 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                            <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-white">AI Operations</h3>
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                <span className="text-[10px] text-gray-400 font-medium tracking-wide">ALWAYS ACTIVE</span>
                            </div>
                        </div>
                    </div>
                    <Activity className="w-4 h-4 text-gray-400" />
                </div>

                {/* System Overlay (Floating Control Panel) */}
                <div className="absolute top-24 left-4 right-4 z-20 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.5 }}
                        className="bg-zinc-900/90 backdrop-blur-md rounded-lg p-3 border border-white/10 font-mono text-[10px] text-gray-300 shadow-lg"
                    >
                        <div className="flex flex-col gap-1.5">
                            <span className="opacity-60 flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full" /> Initializing Agent...</span>
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 0.8 }} transition={{ delay: 0.5 }} className="flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full" /> Linking CRM...</motion.span>
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-white flex items-center gap-2"><div className="w-1 h-1 bg-white rounded-full" /> Voice module active. 45 conversations live.</motion.span>
                        </div>
                    </motion.div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 p-4 pt-28 space-y-6 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/80 z-10 pointer-events-none" />

                    {messages.map((msg: any) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {msg.type === 'wait' ? (
                                <div className="px-3 py-2 bg-white/5 rounded-full text-gray-500 text-xs flex gap-1">
                                    <span className="animate-bounce delay-0">.</span>
                                    <span className="animate-bounce delay-100">.</span>
                                    <span className="animate-bounce delay-200">.</span>
                                </div>
                            ) : (
                                <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed backdrop-blur-sm ${msg.type === 'user'
                                    ? 'bg-white text-black rounded-br-none shadow-lg shadow-white/5'
                                    : 'bg-zinc-900 text-gray-200 rounded-bl-none border border-white/10'
                                    }`}>
                                    {msg.text}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-black border-t border-white/10">
                    <div className="h-10 bg-zinc-900 rounded-full border border-white/10 flex items-center px-4 text-xs text-gray-500">
                        System command...
                    </div>
                </div>

                {/* Home Bar */}
                <div className="h-1 w-32 bg-white/20 rounded-full mx-auto my-3" />
            </div>

            {/* Edge Glow */}
            <div className="absolute inset-0 rounded-[3rem] shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] pointer-events-none" />
        </div>
    )
}

// --- Demo: Dark Product Build (Monochromatic) ---
const DevDemo = () => (
    <div className="relative w-full h-[500px] flex items-center justify-center">
        {/* Desktop Window */}
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="absolute left-0 top-10 w-[85%] h-[380px] bg-black rounded-xl border border-white/10 shadow-2xl overflow-hidden z-10"
        >
            {/* Window Header */}
            <div className="h-9 bg-zinc-950 flex items-center px-4 border-b border-white/10 gap-2">
                <div className="flex gap-1.5 opacity-20">
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                </div>
            </div>
            {/* SaaS Dashboard UI */}
            <div className="flex h-full">
                <div className="w-48 border-r border-white/10 bg-zinc-950/50 p-4 space-y-4">
                    <div className="w-full h-8 bg-white/5 rounded mb-6 border border-white/5" />
                    {[1, 2, 3, 4].map(i => <div key={i} className={`w-full h-7 rounded flex items-center px-2 text-xs ${i === 1 ? 'bg-white text-black font-medium' : 'text-gray-500'}`}>Menu Item</div>)}
                </div>
                <div className="flex-1 p-6 grid grid-cols-2 gap-4">
                    <motion.div whileHover={{ y: -2 }} className="bg-zinc-900 p-4 rounded-lg border border-white/5 h-32 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                    <motion.div whileHover={{ y: -2 }} className="bg-zinc-900 p-4 rounded-lg border border-white/5 h-32 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                    <motion.div whileHover={{ y: -2 }} className="col-span-2 bg-zinc-900 p-4 rounded-lg border border-white/5 h-40 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                </div>
            </div>
        </motion.div>

        {/* Mobile Mockup Overlay */}
        <motion.div
            initial={{ opacity: 0, y: 40, x: 20 }}
            whileInView={{ opacity: 1, y: 20, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="absolute right-4 bottom-0 w-[200px] h-[380px] bg-black rounded-[2rem] border-[4px] border-zinc-900 shadow-[0_20px_50px_rgba(255,255,255,0.05)] z-20 overflow-hidden"
        >
            {/* Mobile UI */}
            <div className="w-full h-full bg-black flex flex-col">
                <div className="h-14 border-b border-white/10 flex items-end pb-3 px-4 z-10 bg-black">
                    <div className="w-4 h-4 rounded-sm border border-white/20" />
                </div>
                <div className="flex-1 p-3 space-y-2 overflow-hidden">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <motion.div
                            key={i}
                            initial={{ x: 20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 + (i * 0.1) }}
                            className="h-14 bg-zinc-900 rounded-lg w-full border border-white/5 relative overflow-hidden"
                        >
                            <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/5" />
                            <div className="absolute top-4 left-14 w-16 h-1.5 bg-white/10 rounded" />
                            <div className="absolute top-7 left-14 w-10 h-1.5 bg-white/5 rounded" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    </div>
)

// --- Demo: Growth Engine (Monochromatic) ---
const GrowthDemo = () => (
    <div className="w-full bg-black rounded-xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="h-12 border-b border-white/10 flex items-center justify-between px-6 bg-zinc-950 text-[10px] text-gray-500 font-mono tracking-wider">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> LIVE_GROWTH_FEED</span>
            <span>REV_OS_04</span>
        </div>

        <div className="p-6 grid gap-8">
            {/* Funnel Visualization */}
            <div className="flex justify-between items-end h-40 gap-3">
                {[
                    { label: 'TRAFFIC', h: '100%', c: 'bg-white/5' },
                    { label: 'LEADS', h: '65%', c: 'bg-white/10' },
                    { label: 'QUALIFIED', h: '40%', c: 'bg-white/20' },
                    { label: 'CLOSED', h: '25%', c: 'bg-white shadow-[0_0_20px_rgba(255,255,255,0.1)]' },
                ].map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end group">
                        <div className="text-center text-[9px] text-gray-500 mb-2 opacity-0 group-hover:opacity-100 transition-opacity tracking-widest">{bar.label}</div>
                        <motion.div
                            initial={{ height: '5%' }}
                            whileInView={{ height: bar.h }}
                            transition={{ duration: 1, delay: i * 0.2 }}
                            className={`w-full rounded-sm ${bar.c} relative overflow-hidden`}
                        >
                            <motion.div
                                animate={{ top: ['100%', '-100%'] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', delay: i * 0.5 }}
                                className="absolute left-0 right-0 h-10 bg-white/5 skew-y-12"
                            />
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* Live Events List */}
            <div className="bg-zinc-950 rounded-lg p-4 border border-white/5 space-y-3 font-mono text-[10px] tracking-wide">
                {[
                    { action: "LEAD CAPTURED", source: "Direct", time: "2s", color: "text-gray-300" },
                    { action: "AUTOMATION TRIGGERED", source: "Nurture v2", time: "5s", color: "text-gray-400" },
                    { action: "DEAL CLOSED", source: "Enterprise", time: "12s", color: "text-white font-bold" }
                ].map((event, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + (i * 0.3) }}
                        className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0"
                    >
                        <span className="flex items-center gap-2">
                            <div className={`w-1 h-1 rounded-full ${event.color.includes('text-white') ? 'bg-white' : 'bg-gray-700'}`} />
                            <span className={event.color}>{event.action}</span>
                        </span>
                        <span className="text-gray-600">{event.time}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    </div>
)

// --- Main Page Component ---

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white/30">
            <GlassmorphismNav />
            {/* Spacer */}
            <div className="h-32"></div>

            <main className="max-w-6xl mx-auto px-6 py-12 lg:py-24 space-y-48">

                {/* Header */}
                <section className="text-left space-y-8 max-w-4xl relative z-10">
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[300px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

                    <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-tight text-white">
                        <LetterStagger text="Services" />
                    </h1>
                    <div className="space-y-6">
                        <h2 className="text-2xl md:text-3xl font-light text-gray-300">What we do</h2>
                        <div className="space-y-4 text-xl text-gray-500 leading-relaxed font-light">
                            <p>
                                We help businesses design, build, and scale the systems they rely on every day.
                            </p>
                            <p>
                                Our work spans AI, software, mobile applications, and growth infrastructure, always focused on long-term reliability rather than short-term wins.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 1. AI Systems & Automation */}
                <section id="ai-automation" className="grid lg:grid-cols-2 gap-20 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-12"
                    >
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-xs font-mono text-gray-500 uppercase tracking-widest">
                                <span>01</span>
                                <div className="h-px w-8 bg-white/20" />
                                <span>Systems</span>
                            </div>
                            <h2 className="text-4xl font-light text-white tracking-tight">AI Systems & Automation</h2>
                            <p className="text-lg text-gray-400 leading-relaxed font-light">
                                We design and deploy AI systems that reduce manual work and bring structure to operations. Our focus is not experimentation, but production-ready AI that integrates directly into how your business already works.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-sm font-mono text-white uppercase tracking-widest">What we build</h3>
                            <ul className="grid gap-4">
                                {[
                                    "AI agents for customer support, sales, and internal operations",
                                    "Workflow automation across tools, CRMs, and internal systems",
                                    "Intelligent document processing and data extraction",
                                    "Voice agents for inbound and outbound calls",
                                    "AI-powered scheduling, lead qualification, and routing",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 group text-gray-400 text-sm leading-relaxed">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white transition-colors flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="pt-8 border-t border-white/10">
                            <h3 className="text-sm font-mono text-white uppercase tracking-widest mb-4">How we approach it</h3>
                            <p className="text-gray-500 text-sm leading-relaxed font-light">
                                Every AI system is designed around real workflows. We focus on reliability, control, and clear handoffs between automation and human teams.
                            </p>
                        </div>
                    </motion.div>

                    <div className="flex justify-center lg:justify-end lg:pt-20">
                        <FloatingContainer delay={0}>
                            <AIDemo />
                        </FloatingContainer>
                    </div>
                </section>

                {/* 2. Software & Mobile Applications */}
                <section id="development" className="grid lg:grid-cols-2 gap-20 items-start">
                    <div className="order-2 lg:order-1 relative lg:pt-20">
                        <FloatingContainer delay={1}>
                            <DevDemo />
                        </FloatingContainer>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="order-1 lg:order-2 space-y-12"
                    >
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-xs font-mono text-gray-500 uppercase tracking-widest">
                                <span>02</span>
                                <div className="h-px w-8 bg-white/20" />
                                <span>Software</span>
                            </div>
                            <h2 className="text-4xl font-light text-white tracking-tight">Software & Mobile Applications</h2>
                            <p className="text-lg text-gray-400 leading-relaxed font-light">
                                We build software that is clean, scalable, and easy to operate as teams grow. From internal tools to customer-facing products, our focus is long-term maintainability.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-sm font-mono text-white uppercase tracking-widest">What we build</h3>
                            <ul className="grid gap-4">
                                {[
                                    "Custom SaaS platforms and internal dashboards",
                                    "Full-stack web applications",
                                    "Mobile applications for iOS and Android",
                                    "Backend systems, APIs, and integrations",
                                    "Admin panels and operational tooling",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 group text-gray-400 text-sm leading-relaxed">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white transition-colors flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="pt-8 border-t border-white/10">
                            <h3 className="text-sm font-mono text-white uppercase tracking-widest mb-4">How we approach it</h3>
                            <p className="text-gray-500 text-sm leading-relaxed font-light">
                                We prioritize clarity in architecture, clean codebases, and systems that teams can extend without rewriting everything later.
                            </p>
                        </div>
                    </motion.div>
                </section>

                {/* 3. Growth & Marketing Systems */}
                <section id="marketing" className="grid lg:grid-cols-2 gap-20 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-12"
                    >
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-xs font-mono text-gray-500 uppercase tracking-widest">
                                <span>03</span>
                                <div className="h-px w-8 bg-white/20" />
                                <span>Growth</span>
                            </div>
                            <h2 className="text-4xl font-light text-white tracking-tight">Growth & Marketing Systems</h2>
                            <p className="text-lg text-gray-400 leading-relaxed font-light">
                                Growth works best when systems exist behind it. We design marketing and growth infrastructure that supports consistent acquisition and conversion without constant manual effort.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-sm font-mono text-white uppercase tracking-widest">What we build</h3>
                            <ul className="grid gap-4">
                                {[
                                    "Automated lead generation and funnel systems",
                                    "Performance marketing setup and optimization",
                                    "SEO and content infrastructure",
                                    "CRM setup, tracking, and lifecycle automation",
                                    "Analytics dashboards for decision-making",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 group text-gray-400 text-sm leading-relaxed">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white transition-colors flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="pt-8 border-t border-white/10">
                            <h3 className="text-sm font-mono text-white uppercase tracking-widest mb-4">How we approach it</h3>
                            <p className="text-gray-500 text-sm leading-relaxed font-light">
                                Instead of chasing spikes, we focus on sustainable growth. Systems are designed to compound over time and adapt as the business evolves.
                            </p>
                        </div>
                    </motion.div>

                    <div className="relative lg:pt-20">
                        <FloatingContainer delay={2.5}>
                            <GrowthDemo />
                        </FloatingContainer>
                    </div>
                </section>

                {/* How We Work */}
                <section className="border-t border-white/10 pt-24">
                    <div className="grid lg:grid-cols-2 gap-20">
                        <div className="space-y-8">
                            <h2 className="text-4xl font-light text-white tracking-tight">How we work</h2>
                            <div className="space-y-4 text-lg text-gray-400 leading-relaxed font-light">
                                <p>
                                    We keep teams small, processes simple, and decisions grounded in reality.
                                </p>
                                <p>
                                    Every engagement starts with understanding how your business actually operates, not how it is supposed to operate on paper.
                                </p>
                                <p>
                                    Our goal is to leave you with systems that continue working long after launch.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <h2 className="text-2xl font-light text-white tracking-tight">Who this is for</h2>
                            <ul className="space-y-4">
                                {[
                                    "Businesses scaling beyond manual processes",
                                    "Teams building or refining digital products",
                                    "Companies looking to automate operations responsibly",
                                    "Founders who value structure over shortcuts",
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 text-gray-400 font-light">
                                        <div className="w-1 h-1 rounded-full bg-white/20" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Closing */}
                <section className="text-center py-24 border-t border-white/10">
                    <p className="text-2xl md:text-3xl font-light text-gray-300 italic">
                        Good software fades into the background. That is the goal.
                    </p>
                </section>

            </main>
            <Footer />
        </div>
    )
}
