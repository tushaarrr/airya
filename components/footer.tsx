"use client"
import type React from "react"
import type { ComponentProps, ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

interface FooterLink {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
}

interface FooterSection {
  label: string
  links: FooterLink[]
}

const footerLinks: FooterSection[] = [
  {
    label: "Product",
    links: [
      { title: "AI & Automation", href: "/services#ai-automation" },
      { title: "Software Systems", href: "/services#development" },
      { title: "Mobile Applications", href: "/services#development" },
      { title: "Growth Infrastructure", href: "/services#marketing" },
    ],
  },
  {
    label: "Company",
    links: [
      { title: "About", href: "/about" },
      { title: "Services", href: "/services" },
      { title: "Insights", href: "/blog" },
      { title: "Contact", href: "/contact" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="w-full bg-black text-white py-12 md:py-16 px-6 md:px-12 lg:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 md:gap-12">

        {/* Logo - Responsive size */}
        <Link href="/" className="group block">
          <Image
            src="/images/footerlogo.png"
            alt="Airya Logo"
            width={500}
            height={500}
            className="w-48 md:w-72 h-auto object-contain group-hover:opacity-80 transition-opacity"
          />
        </Link>

        {/* Links - Centered Layout */}
        <div className="w-full flex justify-center">
          <div className="flex flex-col sm:flex-row gap-12 md:gap-24 lg:gap-32 text-center sm:text-left">
            {footerLinks.map((section) => (
              <div key={section.label} className="flex flex-col items-center sm:items-start space-y-4">
                <h3 className="text-xs font-bold text-white tracking-[0.2em] uppercase mb-2">{section.label}</h3>
                <ul className="space-y-3 flex flex-col items-center sm:items-start">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Copyright - Bottom */}
        <div className="text-xs text-gray-500 font-mono pt-8 border-t border-white/5 w-full text-center space-y-2">
          <p className="tracking-widest uppercase text-[10px] text-white/20 mb-4">Thinking, Implemented.</p>
          <p>© {new Date().getFullYear()} Airya Inc. All rights reserved.</p>
          <p className="text-gray-600">
            Built within <a href="https://cerebramha.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline decoration-gray-800 underline-offset-4 hover:decoration-white">Cerebramha</a>
          </p>
        </div>

      </div>
    </footer>
  )
}
