"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const navigation = [
  { name: "About", href: "/about" },
  { name: "Capabilities", href: "/#capabilities" },
  { name: "Features", href: "/#features" },
  { name: "Services", href: "/services" },
  { name: "Insights", href: "/blog" },
]

export function GlassmorphismNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [hasLoaded, setHasLoaded] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoaded(true)
    }, 100)

    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY

        // Only hide/show after scrolling past 50px to avoid flickering at top
        if (currentScrollY > 50) {
          if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 5) {
            // Scrolling down - hide navbar
            setIsVisible(false)
          } else if (lastScrollY.current - currentScrollY > 5) {
            // Scrolling up - show navbar
            setIsVisible(true)
          }
        } else {
          // Always show navbar when near top
          setIsVisible(true)
        }

        lastScrollY.current = currentScrollY
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar, { passive: true })
      return () => {
        window.removeEventListener("scroll", controlNavbar)
        clearTimeout(timer)
      }
    }

    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (href: string) => {
    // If it's a full URL path like /services or /blog, let Link handle it naturally
    // If it's an anchor like /#features, we need to handle it 

    // Actually, for simplicity with Next.js App Router, using Link for everything is safer if we prefix /
    // For anchors on the same page, we might want manual scrolling, but mixing /contact and /#features is tricky.
    // The safest way is to use Link for everything.
    setIsOpen(false)
  }

  return (
    <>
      <nav
        className={`fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-20 md:-translate-y-24 opacity-0"
          } ${hasLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        style={{
          transition: hasLoaded ? "all 0.5s ease-out" : "opacity 0.8s ease-out, transform 0.8s ease-out",
        }}
      >
        {/* Main Navigation */}
        <div className="w-[95vw] md:w-[90vw] max-w-xs md:max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-2 md:px-6 md:py-2">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center hover:scale-105 transition-transform duration-200 cursor-pointer"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                  <Image
                    src="/images/logo.png"
                    alt="Airya"
                    width={88}
                    height={88}
                    className="w-full h-full object-contain"
                  />
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-white/80 hover:text-white hover:scale-105 transition-all duration-200 font-medium cursor-pointer"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Desktop CTA Button */}
              <div className="hidden md:block">
                <Link
                  href="/contact"
                  className="relative bg-white hover:bg-gray-50 text-black font-medium px-6 py-2 rounded-full flex items-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group"
                >
                  <span className="mr-2">Get Started</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-white hover:scale-110 transition-transform duration-200 cursor-pointer"
              >
                <div className="relative w-6 h-6">
                  <Menu
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${isOpen ? "opacity-0 rotate-180 scale-75" : "opacity-100 rotate-0 scale-100"
                      }`}
                  />
                  <X
                    size={24}
                    className={`absolute inset-0 transition-all duration-300 ${isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-75"
                      }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="md:hidden relative">
          {/* Backdrop overlay */}
          <div
            className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            onClick={() => setIsOpen(false)}
            style={{ top: "0", left: "0", right: "0", bottom: "0", zIndex: -1 }}
          />

          {/* Menu container */}
          <div
            className={`mt-2 w-[90vw] max-w-xs mx-auto transition-all duration-500 ease-out transform-gpu ${isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-8 scale-95 pointer-events-none"
              }`}
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl">
              <div className="flex flex-col space-y-1">
                {navigation.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-white/80 hover:text-white hover:bg-white/10 rounded-lg px-3 py-3 text-left transition-all duration-300 font-medium cursor-pointer transform hover:scale-[1.02] hover:translate-x-1 ${isOpen ? "animate-mobile-menu-item" : ""
                      }`}
                    style={{
                      animationDelay: isOpen ? `${index * 80 + 100}ms` : "0ms",
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="h-px bg-white/10 my-2" />
                <Link
                  href="/contact"
                  className={`relative bg-white hover:bg-gray-50 text-black font-medium px-6 py-3 rounded-full flex items-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group transform ${isOpen ? "animate-mobile-menu-item" : ""
                    }`}
                  style={{
                    animationDelay: isOpen ? `${navigation.length * 80 + 150}ms` : "0ms",
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="mr-2">Get Started</span>
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
