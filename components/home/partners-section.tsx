"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const partners = [
  {
    name: "Bosch",
    logo: "/bosch-brand-logo-simple.jpg",
    category: "Home Appliances",
  },
  {
    name: "Hettich",
    logo: "/hettich-logo-brand.png",
    category: "German Hardware",
  },
  {
    name: "Hafele",
    logo: "/hafele-logo-brand.png",
    category: "Architectural Fittings",
  },
  {
    name: "Blum",
    logo: "/Blum-logo-brand.webp",
    category: "Lift & Runner Systems",
  },
  {
    name: "Siemens",
    logo: "/siemens.png",
    category: "Smart Built-in Tech",
  },
  {
    name: "Greenlam",
    logo: "/Greenlam-Logo-brand.png",
    category: "Decorative Laminates",
  },
  {
    name: "Asian Paints",
    logo: "/asianpaints-logo-brand.webp",
    category: "Premium Finishes",
  },
]

export function PartnersSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let scrollPosition = 0
    const scrollSpeed = 0.5

    const animate = () => {
      scrollPosition += scrollSpeed
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0
      }
      scrollContainer.scrollLeft = scrollPosition
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    const handleMouseEnter = () => cancelAnimationFrame(animationId)
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate)
    }

    scrollContainer.addEventListener("mouseenter", handleMouseEnter)
    scrollContainer.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter)
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-24">
      {/* Top divider */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 xl:px-16">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.3em] text-[#c89f2f] sm:text-sm"
          >
            Brand Partnerships
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl font-light leading-tight text-neutral-900 sm:text-4xl lg:text-5xl"
          >
            Trusted By Leading <span className="italic text-[#c89f2f]">Global Brands</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-sm leading-relaxed text-neutral-600 sm:text-base"
          >
            We collaborate with world-class manufacturers for authentic hardware, laminates, appliances, and finishes.
          </motion.p>
        </div>
      </div>

      {/* Auto-scrolling logo slider with edge fade gradients */}
      <div className="relative w-full">
        {/* Left gradient overlay */}
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-28" />
        {/* Right gradient overlay */}
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-28" />

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-hidden whitespace-nowrap py-4"
          style={{ scrollBehavior: "auto" }}
        >
          {/* Duplicate logos for seamless infinite scroll */}
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="group flex h-28 w-52 shrink-0 flex-col items-center justify-center rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-5 transition-all duration-400 hover:-translate-y-1 hover:border-[#c89f2f] hover:bg-white hover:shadow-md sm:h-32 sm:w-60"
            >
              <div className="relative h-12 w-36 grayscale opacity-75 transition-all duration-400 group-hover:grayscale-0 group-hover:opacity-100">
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={`${partner.name} brand logo`}
                  fill
                  sizes="180px"
                  loading="lazy"
                  className="object-contain"
                />
              </div>
              <span className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-neutral-400 transition-colors duration-300 group-hover:text-[#c89f2f]">
                {partner.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
    </section>
  )
}
