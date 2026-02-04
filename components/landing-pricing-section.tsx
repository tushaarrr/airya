"use client"

import { useState } from "react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { RedesignedMetallicCard } from "@/components/premium-solutions-section"

export function LandingPricingSection() {
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
                    tag: "UI ONLY",
                    title: "Mobile App Frontend",
                    price: "$999 USD",
                    description: "High-quality, pixel-perfect mobile app UI implementation.",
                    items: ["React Native / Flutter UI", "Responsive layouts", "Smooth animations", "Component library setup"]
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
            name: "E-commerce",
            icon: "🛍️",
            label: "E-commerce & Shopify",
            description: "Custom Shopify and e-commerce solutions built for growing businesses that need reliability, performance, and flexibility.",
            services: [
                {
                    tag: "SETUP",
                    title: "Shopify Store Setup",
                    price: "$1,800 USD",
                    description: "For small businesses launching a clean and functional Shopify store.",
                    items: ["Shopify store setup", "Theme customization", "Product and collection setup", "Payment, shipping, and tax configuration", "Mobile-optimized layout"],
                    ctaText: "Discuss Scope"
                },
                {
                    tag: "CUSTOM",
                    title: "Custom Shopify Development",
                    price: "$3,500 USD",
                    description: "For brands that need customization, integrations, and better performance.",
                    items: ["Advanced theme customization", "Custom sections and templates", "App integrations", "Basic automation workflows", "Performance optimization"],
                    ctaText: "Discuss Scope"
                },
                {
                    tag: "SCALING",
                    title: "Advanced E-commerce Systems",
                    price: "$6,500 USD",
                    description: "For growing brands that need automation and scalable e-commerce workflows.",
                    items: ["Custom Shopify logic", "Order and inventory automation", "CRM or third-party integrations", "Conversion optimization"],
                    ctaText: "Request a Quote"
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
        <section className="relative py-24 px-6 bg-black">
            <div className="max-w-7xl mx-auto relative z-10">

                {/* Simplified Header */}
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Straightforward Pricing
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Choose the perfect plan for your project. No hidden fees.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Category Navigation Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

            </div>
        </section>
    )
}
