import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { HeroSection } from "@/components/hero-section"
import { WhatWeDoSection } from "@/components/what-we-do-section"
import { ProblemSolutionSection } from "@/components/problem-solution-section"
import Aurora from "@/components/Aurora"
import { FeaturesSection } from "@/components/features-section"
import { UnifiedSystemsSection } from "@/components/unified-systems-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ROICalculatorSection } from "@/components/roi-calculator-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { BlogPreviewSection } from "@/components/blog-preview-section"
import { FAQSection } from "@/components/premium-solutions-section"
import { getLatestBlogs } from "@/lib/blog"
import { LandingPricingSection } from "@/components/landing-pricing-section"

import { AiSystemsSection } from "@/components/ai-systems-section"

// Enable ISR for blog data
export const revalidate = 60

export default async function HomePage() {
  // Fetch latest blog posts server-side
  const latestPosts = await getLatestBlogs(3)

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <main className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 w-full h-full">
          <Aurora colorStops={["#475569", "#64748b", "#475569"]} amplitude={1.2} blend={0.6} speed={0.8} />
        </div>
        <div className="relative z-10">
          <GlassmorphismNav />
          <HeroSection />
          <WhatWeDoSection />
          <AiSystemsSection />

          <ProblemSolutionSection />
          <TestimonialsSection />
          <LandingPricingSection />
          <BlogPreviewSection posts={latestPosts} />
          <CTASection />
          <Footer />
        </div>
      </main>
    </div>
  )
}
