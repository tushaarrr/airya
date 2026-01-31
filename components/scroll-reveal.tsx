"use client"

import { motion } from "framer-motion"
import React, { ReactNode, useState, useEffect } from "react"

interface ScrollRevealProps {
    children: ReactNode
    className?: string
    delay?: number
    duration?: number
    staggerChildren?: number
}

const itemVariants = {
    hidden: (custom: { isMobile: boolean }) => ({
        opacity: 0,
        y: 20,
        scale: custom.isMobile ? 1 : 0.98,
        rotateX: custom.isMobile ? 0 : -5
    }),
    visible: (custom: { isMobile: boolean, delay: number, duration: number }) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        transition: {
            duration: custom.duration,
            delay: custom.delay,
            ease: [0.16, 1, 0.3, 1],
        }
    })
}

const containerVariants = {
    hidden: {},
    visible: (custom: { staggerChildren: number, delay: number }) => ({
        transition: {
            staggerChildren: custom.staggerChildren,
            delayChildren: custom.delay
        }
    })
}

export function ScrollReveal({
    children,
    className = "",
    delay = 0,
    duration = 0.8,
    staggerChildren = 0
}: ScrollRevealProps) {
    const isContainer = staggerChildren > 0
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
                once: true,
                margin: isMobile ? "0px" : "-10% 0px -10% 0px"
            }}
            variants={isContainer ? containerVariants : itemVariants}
            custom={isContainer ? { staggerChildren, delay } : { delay, duration, isMobile }}
            style={{
                transformStyle: isMobile ? "flat" : "preserve-3d",
                perspective: isMobile ? "none" : "1000px",
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden"
            }}
            className={className}
        >
            {isContainer ? (
                React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return (
                            <motion.div variants={itemVariants} custom={{ delay: 0, duration, isMobile }}>
                                {child}
                            </motion.div>
                        )
                    }
                    return child
                })
            ) : children}
        </motion.div>
    )
}

