"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { ArrowRight, ArrowUpRight } from "lucide-react"

export function AboutCTA() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-60px" })

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      {/* Top golden gradient divider */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#c89f2f]/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 xl:px-16">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl bg-[#0a0a0a] px-8 py-16 text-center text-white sm:px-12 lg:px-20 lg:py-20 shadow-2xl"
        >
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[#c89f2f]/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[#c89f2f]/10 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-2xl">
            {/* Tag */}
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.3em] text-[#c89f2f] sm:text-sm">
              Start Your Journey
            </span>

            {/* Heading */}
            <h2 className="font-serif text-3xl font-light leading-tight text-white sm:text-4xl lg:text-5xl">
              Ready to Transform Your{" "}
              <span className="italic text-[#c89f2f]">Living Experience?</span>
            </h2>

            {/* Subtitle */}
            <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
              Whether you are designing a luxury residence, duplex apartment, or commercial office, we bring your vision to life with architectural precision.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 sm:mt-10">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-full border border-white bg-white px-8 py-4 text-xs font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:border-[#c89f2f] hover:bg-[#c89f2f] hover:text-black sm:text-sm"
              >
                Book a Consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/30 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:border-white hover:bg-white/10 sm:text-sm"
              >
                Explore Portfolio
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
