"use client"

import { useState, useEffect } from "react"
import { ScrollReveal } from "./scroll-reveal"
import { TextReveal } from "./text-reveal"
import { Plus, Minus, Check } from "lucide-react"

interface CardProps {
    tag?: string
    title: string
    description: string
    price?: string
    items?: string[]
    ctaText?: string
    isExpanded?: boolean
    onClick?: () => void
    type?: "pricing" | "faq" | "info"
}

export const RedesignedMetallicCard = ({ tag, title, description, price, items, ctaText, isExpanded, onClick, type = "info" }: CardProps) => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return (
        <div
            className="group relative h-full w-full cursor-pointer flex flex-col items-center justify-center p-4 min-h-[600px]"
            onClick={onClick}
        >
            {/* The Outer Glow Backdrop */}
            <div className={`absolute inset-4 bg-white/[0.03] ${isMobile ? 'blur-[40px]' : 'blur-[120px]'} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />

            {/* Electric Shredded Border SVG */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
                <svg
                    viewBox="0 0 100 150"
                    preserveAspectRatio="none"
                    className="w-full h-full overflow-visible"
                >
                    <defs>
                        <filter id={`shredded-${title.replace(/\s+/g, '-')}`} x="-15%" y="-15%" width="130%" height="130%">
                            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves={isMobile ? 2 : 6} seed="3" result="noise" />
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale={isMobile ? 1.5 : 2.5} xChannelSelector="R" yChannelSelector="G" />
                        </filter>
                        <filter id={`shreddedSecondary-${title.replace(/\s+/g, '-')}`} x="-15%" y="-15%" width="130%" height="130%">
                            <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves={isMobile ? 1 : 4} seed="5" result="noise" />
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale={isMobile ? 0.8 : 1.5} xChannelSelector="R" yChannelSelector="G" />
                        </filter>
                    </defs>

                    <path
                        d="M 10,10 L 90,10 L 90,140 L 10,140 Z"
                        className="stroke-white/10 opacity-0 group-hover:opacity-40 transition-opacity duration-700"
                        fill="none"
                        strokeWidth="4"
                        vectorEffect="non-scaling-stroke"
                        style={isMobile ? { display: 'none' } : { filter: "blur(12px)" }}
                    />

                    <path
                        d="M 10,10 L 90,10 L 90,140 L 10,140 Z"
                        className="stroke-white/40 group-hover:stroke-white/90 transition-colors duration-500"
                        fill="none"
                        strokeWidth="0.8"
                        vectorEffect="non-scaling-stroke"
                        filter={`url(#shredded-${title.replace(/\s+/g, '-')})`}
                    />
                    <path
                        d="M 10,10 L 90,10 L 90,140 L 10,140 Z"
                        className="stroke-white/20 group-hover:stroke-white/60 transition-colors duration-1000"
                        fill="none"
                        strokeWidth="0.4"
                        vectorEffect="non-scaling-stroke"
                        filter={`url(#shreddedSecondary-${title.replace(/\s+/g, '-')})`}
                        style={{ transform: 'translateX(0.5px) translateY(0.5px)' }}
                    />
                </svg>
            </div>

            {/* Main Card Surface */}
            <div className="relative z-10 w-full h-full bg-[#020202] border border-white/5 rounded-[2rem] p-6 md:p-8 flex flex-col justify-between transition-all duration-700 group-hover:-translate-y-2 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />

                <div className="relative z-20">
                    <div className="flex justify-between items-start mb-8">
                        {tag && (
                            <div className="inline-flex">
                                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl group-hover:border-white/30 transition-all">
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/90">
                                        {tag}
                                    </span>
                                </div>
                            </div>
                        )}
                        {price && (
                            <div className="text-right">
                                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1 font-bold">Starts with</p>
                                <p className="text-2xl font-bold text-white tracking-tighter">{price}</p>
                            </div>
                        )}
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight mb-6 leading-[1.2] transition-transform duration-500 group-hover:translate-x-1 break-words">
                        {title}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-[95%] mb-8 font-medium">
                        {description}
                    </p>

                    {items && items.length > 0 && (
                        <div className="space-y-3 mb-8">
                            {items.map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white transition-colors" />
                                    <span className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors leading-tight">{item}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="relative z-20">
                    {ctaText && (
                        <div className="mt-4 overflow-hidden">
                            <div className="h-px w-full bg-white/10 group-hover:bg-white/30 transition-colors duration-500 mb-6" />
                            <div className="flex items-center gap-3 text-white/50 group-hover:text-white transition-all font-bold uppercase tracking-[0.2em] text-[10px]">
                                <span>{ctaText}</span>
                                <div className="w-8 h-[1px] bg-white/50 group-hover:w-16 transition-all duration-500" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export function PricingSection() {
    const [activeCategory, setActiveCategory] = useState("Apps")

    const categories = [
        {
            name: "Apps",
            icon: "🚀",
            label: "App Development",
            description: "High-performance iOS, Android & Web applications",
            services: [
                {
                    tag: "FRONTEND",
                    title: "Frontend Development",
                    price: "$799 USD",
                    description: "Best for design-ready apps needing fast execution.",
                    items: ["iOS, Android & Web frontend", "Pixel-perfect UI from Figma", "API & third-party integrations", "Smooth animations & transitions"]
                },
                {
                    tag: "RECOMMENDED",
                    title: "MVP Development",
                    price: "$2,499 USD",
                    description: "Best for startups launching their first product.",
                    items: ["User app + admin dashboard", "Custom UX/UI branding", "Backend development & APIs", "App Store & Play Store support"]
                },
                {
                    tag: "ENTERPRISE",
                    title: "Full-Cycle App Dev",
                    price: "$4,499 USD",
                    description: "Best for production-grade platforms.",
                    items: ["Multi-app ecosystem + admin panel", "Scalable backend architecture", "Performance, security & load testing", "2–4 month expert delivery"]
                }
            ]
        },
        {
            name: "AI",
            icon: "🤖",
            label: "AI Solutions",
            description: "Custom AI Agents and LLM-powered systems",
            services: [
                {
                    tag: "WORKFLOW",
                    title: "AI Agents",
                    price: "$1,999 USD",
                    description: "Custom agents for lead research, competitor tracking, and internal ops.",
                    items: ["Web scraping & extraction", "Research & reporting agents", "Multi-tool API integrations", "Secure deployment with access control"]
                },
                {
                    tag: "PRODUCT",
                    title: "AI App Development",
                    price: "$1,499 USD",
                    description: "AI-powered web & mobile applications.",
                    items: ["LLM integration (chatbots, copilots)", "RAG pipelines with internal data", "Document Q&A & summarization", "API-based secure AI deployment"]
                },
                {
                    tag: "AUTOMATION",
                    title: "Custom AI Automation",
                    price: "$999 USD",
                    description: "Automate repetitive business tasks.",
                    items: ["AI-driven workflows & pipelines", "Internal dashboards & tools", "Reduce manual work & cost", "Seamless system integration"]
                }
            ]
        },
        {
            name: "Marketing",
            icon: "📈",
            label: "Growth Solutions",
            description: "AI-driven marketing and performance optimization",
            services: [
                {
                    tag: "GROWTH",
                    title: "AI Marketing",
                    price: "$999 USD",
                    description: "Content pipelines and competitor analysis using AI.",
                    items: ["AI blog & landing page content", "SEO content pipelines", "Keyword & competitor analysis", "Marketing automation"]
                },
                {
                    tag: "ANALYTICS",
                    title: "Performance Setup",
                    price: "$799 USD",
                    description: "Data-driven dashboards and funnel tracking.",
                    items: ["Marketing dashboards (Power BI)", "Funnel & conversion tracking", "Actionable growth insights", "Campaign performance analysis"]
                },
                {
                    tag: "ORGANIC",
                    title: "Web Optimization",
                    price: "$499 USD",
                    description: "High-converting, SEO-friendly web presence.",
                    items: ["High-converting landing pages", "SEO-friendly structure", "Speed & performance tuning", "Analytics & tracking setup"]
                }
            ]
        },
        {
            name: "Web",
            icon: "🌐",
            label: "Web Development",
            description: "Responsive modern websites and scalable web apps",
            services: [
                {
                    tag: "ESSENTIAL",
                    title: "Website Development",
                    price: "$499 USD",
                    description: "Modern, fast marketing and corporate websites.",
                    items: ["Responsive modern designs", "SEO-optimized structure", "CMS or custom backend", "Fast loading performance"]
                },
                {
                    tag: "DYNAMIC",
                    title: "Web App Development",
                    price: "$1,299 USD",
                    description: "Custom web applications for business logic.",
                    items: ["Authentication & role management", "Scalable backend architecture", "Complex API integrations", "Secure data handling"]
                }
            ]
        },
        {
            name: "Support",
            icon: "🔧",
            label: "Maintenance",
            description: "Ongoing support and performance monitoring",
            services: [
                {
                    tag: "BASIC",
                    title: "Basic Maintenance",
                    price: "$299/mo",
                    description: "Bug fixes and monthly health checks.",
                    items: ["Performance monitoring", "Minor updates & fixes", "Monthly health reporting", "Security patches"]
                },
                {
                    tag: "GROWTH",
                    title: "Growth Maintenance",
                    price: "$599/mo",
                    description: "Feature enhancements and priority support.",
                    items: ["Backend optimization", "Priority developer support", "Security updates", "Feature enhancements"]
                }
            ]
        }
    ]

    return (
        <section className="relative py-32 px-6 bg-black">
            <div className="max-w-7xl mx-auto relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-[0.3em] text-white/60 mb-8 font-sans">
                            <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
                            Premium Services
                        </div>
                        <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter">
                            <TextReveal>Our Pricing</TextReveal>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium">
                            iOS • Android • Web • AI • Automation • Marketing
                        </p>
                    </div>
                </ScrollReveal>

                {/* Category Navigation Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-20">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => setActiveCategory(cat.name)}
                            className={`px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-500 border ${activeCategory === cat.name
                                ? "bg-white text-black border-white scale-105"
                                : "bg-white/5 text-white/40 border-white/5 hover:border-white/20 hover:text-white"
                                }`}
                        >
                            <span className="mr-2">{cat.icon}</span>
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                    {categories.find(c => c.name === activeCategory)?.services.map((service, i) => (
                        <ScrollReveal key={`${activeCategory}-${i}`} delay={i * 0.1}>
                            <RedesignedMetallicCard
                                tag={service.tag}
                                title={service.title}
                                price={service.price}
                                description={service.description}
                                items={service.items}
                                ctaText="Choose Plan"
                                type="pricing"
                            />
                        </ScrollReveal>
                    ))}
                </div>

                {/* Consulting & Strategy */}
                <ScrollReveal>
                    <div className="mb-32">
                        <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-12 md:p-20 relative overflow-hidden group hover:border-white/10 transition-colors duration-700">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.02] rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none" />
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                                <div className="max-w-xl text-center md:text-left">
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-6 block">Expert Guidance</span>
                                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Product & AI Strategy</h2>
                                    <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed">
                                        Starting at <span className="text-white font-bold">$99/hour</span>. MVP planning, tech architecture guidance, and startup scaling consultations.
                                    </p>
                                </div>
                                <div className="flex flex-col items-center gap-6">
                                    <button className="px-12 py-5 rounded-2xl bg-white text-black font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform">
                                        Book Consultation
                                    </button>
                                    <div className="flex items-center gap-3 text-white/30 text-[10px] font-bold uppercase tracking-widest">
                                        <div className="w-8 h-px bg-white/10" />
                                        <span>Limited Slots Available</span>
                                        <div className="w-8 h-px bg-white/10" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Important Notes & Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/5 pt-20">
                    <ScrollReveal delay={0.1}>
                        <div className="space-y-8">
                            <h3 className="text-2xl font-bold text-white tracking-tight">Important Notes</h3>
                            <div className="space-y-4">
                                {[
                                    "All pricing starts with the listed amount",
                                    "Final pricing depends on scope, features & timelines",
                                    "iOS, Android & Web supported across all services",
                                    "Flexible engagement & custom packages available"
                                ].map((note, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-white/40 flex-shrink-0" />
                                        <p className="text-gray-400 font-medium">{note}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
                            <h3 className="text-xl font-bold text-white mb-6 tracking-tight">Summary for Clients</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2 font-black">Apps</p>
                                    <p className="text-white font-medium text-sm">iOS, Android & Web</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2 font-black">AI</p>
                                    <p className="text-white font-medium text-sm">Agents, LLM, Automation</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2 font-black">Growth</p>
                                    <p className="text-white font-medium text-sm">AI-powered Marketing</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-white/30 mb-2 font-black">Full-Cycle</p>
                                    <p className="text-white font-medium text-sm">Build → Launch → Scale</p>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    )
}

const AccordionItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => {
    return (
        <div className="group border-b border-white/5 last:border-0 md:border-0">
            <div
                className="flex items-center justify-between py-6 md:px-8 md:bg-white/[0.02] md:border md:border-white/5 md:rounded-2xl cursor-pointer transition-all duration-300 hover:bg-white/[0.05] hover:border-white/10"
                onClick={onClick}
            >
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition-colors">
                    {question}
                </span>
                <div className="flex-shrink-0 w-10 h-10 border border-white/10 rounded-xl flex items-center justify-center bg-white/[0.02] group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300">
                    {isOpen ? <Minus size={16} className="text-white" /> : <Plus size={16} className="text-white" />}
                </div>
            </div>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-60 opacity-100 py-6" : "max-h-0 opacity-0"}`}>
                <p className="text-gray-400 text-sm leading-relaxed md:px-8">
                    {answer}
                </p>
            </div>
        </div>
    )
}

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const faqs = [
        {
            question: "What services do you offer?",
            answer: "We provide AI agents and automation, workflow systems, competitive intelligence solutions, marketing automation, website development, SaaS product development, and iOS and Android app development. Our work focuses on building scalable, outcome-driven digital systems rather than one-off features."
        },
        {
            question: "How do I start a project?",
            answer: "You can start by booking a strategy call through our website. During the call, we understand your goals, scope, and requirements. After that, we share a clear proposal with timelines, deliverables, and pricing."
        },
        {
            question: "What industries do you specialize in?",
            answer: "We work across multiple industries including service businesses, real estate, healthcare, ecommerce, SaaS, startups, and local businesses. Our systems are designed to adapt to different business models and workflows."
        },
        {
            question: "How long does a typical project take?",
            answer: "Timelines depend on scope and complexity. Small automation or AI agent setups usually take 1 to 3 weeks. Larger automation systems, websites, or applications can take 4 to 12 weeks or more."
        },
        {
            question: "Can I see examples of your work?",
            answer: "Yes. You can explore selected projects on our Portfolio page. We also share relevant examples during strategy calls based on your industry and use case."
        },
        {
            question: "Do you work with international clients?",
            answer: "Yes. We work with clients across Canada, the United States, and other international markets. Our processes are built for remote collaboration with clear communication and structured delivery."
        },
        {
            question: "What is your pricing structure?",
            answer: "Our pricing starts with USD and is based on project scope, complexity, and integrations. We use a hybrid model with starting prices listed on our website and final pricing shared after a discovery call."
        },
        {
            question: "What is your design process?",
            answer: "We follow a structured process that includes discovery, strategy, design, development, testing, and launch. Every project starts with understanding business goals, followed by clean design and scalable implementation."
        },
        {
            question: "How do you ensure quality in your work?",
            answer: "We ensure quality through clear documentation, internal reviews, testing at every stage, and performance checks before delivery. Our focus is on building reliable systems that work long term, not quick fixes."
        },
        {
            question: "Do you offer consultations?",
            answer: "Yes. We offer strategy and discovery consultations to help you evaluate ideas, scope requirements, and technical feasibility before starting a project."
        },
        {
            question: "What are your working hours?",
            answer: "Our core working hours align with North American business hours. We also accommodate international clients through scheduled meetings and async communication."
        },
        {
            question: "Do you handle small projects?",
            answer: "Yes. We take on small projects if they have clear scope and goals. Smaller engagements often serve as pilot projects that can scale into long-term collaborations."
        }
    ]

    return (
        <section className="relative py-32 px-6 overflow-hidden bg-black">
            <div className="max-w-7xl mx-auto relative z-10">
                <ScrollReveal>
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]">
                            <span className="block mb-2">Find Your Answers!</span>
                            <span className="italic font-serif font-light text-white/80 opacity-90">
                                Explore Everything You Need to Know
                            </span>
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4 md:gap-y-6">
                    {faqs.map((faq, i) => (
                        <ScrollReveal key={i} delay={i * 0.05}>
                            <AccordionItem
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={openIndex === i}
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            />
                        </ScrollReveal>
                    ))}
                </div>
            </div>

            {/* Background Ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-white/[0.01] rounded-full blur-[150px] pointer-events-none" />
        </section>
    )
}
