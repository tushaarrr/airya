"use client"

import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { useForm, ValidationError } from "@formspree/react"

function ContactForm() {
    const searchParams = useSearchParams()
    const [message, setMessage] = useState("")
    const [state, handleSubmit] = useForm("mkozdkqq")

    useEffect(() => {
        const plan = searchParams.get("plan")
        const price = searchParams.get("price")

        if (plan) {
            // Pre-fill logic based on URL params
            let initialMessage = `Hi, I'm interested in the ${plan}`
            if (price) initialMessage += ` (${price})`
            initialMessage += ".\n\nI'd like to discuss how we can implement this for my business."

            setMessage(initialMessage)
        }
    }, [searchParams])

    if (state.succeeded) {
        return (
            <div className="text-center py-20 space-y-6">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                    <ArrowRight className="w-10 h-10 text-green-500 rotate-[-45deg]" />
                </div>
                <h3 className="text-3xl font-bold text-white">Message received.</h3>
                <p className="text-gray-400 max-w-sm mx-auto">
                    Thanks for reaching out. We'll get back to you within 24 hours.
                </p>
                <div className="pt-8">
                    <p className="text-xs text-gray-500">Redirecting to home in 30s...</p>
                </div>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {state.errors && state.errors.length > 0 && (
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400 text-sm">
                    Unable to send message. Please double check your details.
                </div>
            )}

            <div className="space-y-6">
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all font-light"
                        placeholder="name@company.com"
                    />
                    <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors}
                        className="text-red-400 text-xs ml-1"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-400 ml-1">Name (Optional)</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all font-light"
                        placeholder="Your name"
                    />
                    <ValidationError
                        prefix="Name"
                        field="name"
                        errors={state.errors}
                        className="text-red-400 text-xs ml-1"
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-400 ml-1">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all font-light resize-none"
                        placeholder="Tell us about the system you want to build..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <ValidationError
                        prefix="Message"
                        field="message"
                        errors={state.errors}
                        className="text-red-400 text-xs ml-1"
                    />
                </div>
            </div>

            <Button
                type="submit"
                disabled={state.submitting}
                size="lg"
                className="w-full bg-white text-black hover:bg-gray-200 rounded-xl py-6 text-base font-medium transition-transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {state.submitting ? "Sending..." : "Start the conversation"}
                {!state.submitting && <ArrowRight className="ml-2 w-4 h-4" />}
            </Button>

            <p className="text-center text-xs text-gray-600">
                Typically responds within 24 hours.
            </p>
        </form>
    )
}

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-white/30">
            <GlassmorphismNav />
            {/* Spacer */}
            <div className="h-32"></div>

            <main className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* Left Column: Context */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-12 sticky top-32"
                    >
                        <div>
                            <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.1] mb-8">
                                Let’s design <br />
                                <span className="font-medium text-gray-400">your system.</span>
                            </h1>
                            <p className="text-xl text-gray-500 font-light leading-relaxed max-w-lg">
                                We work with teams who want scalable AI, software, and growth systems. No spam. No pushy sales. Just a serious conversation about architecture.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-mono text-gray-600 uppercase tracking-widest mb-4">WE SPECIALIZE IN</p>
                            {['AI Agents & Automation', 'Enterprise SaaS Platforms', 'Growth Infrastructure', 'Data Architecture'].map((item) => (
                                <div key={item} className="flex items-center gap-3 text-gray-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                                    {item}
                                </div>
                            ))}
                        </div>

                        <div className="pt-12 border-t border-white/10">
                            <p className="text-sm text-gray-600 mb-2">Prefer email?</p>
                            <a href="mailto:hello@agency.com" className="text-white hover:text-gray-300 transition-colors text-lg">hello@agency.com</a>
                        </div>
                    </motion.div>

                    {/* Right Column: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-zinc-900/30 rounded-3xl p-8 md:p-12 border border-white/5 backdrop-blur-sm"
                    >
                        <Suspense fallback={<div className="text-white/50">Loading form...</div>}>
                            <ContactForm />
                        </Suspense>
                    </motion.div>

                </div>
            </main>
            <Footer />
        </div>
    )
}
