"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const stats = [
  { value: 5, label: "Years of Experience", suffix: "+" },
  { value: 100, label: "Client Reviews", suffix: "+" },
  { value: 250, label: "Projects Completed", suffix: "+" },
  { value: 97, label: "Client Satisfaction", suffix: "%" },
  { value: 10, label: "Commercial Spaces", suffix: "+" },
]

function AnimatedCounter({
  value,
  suffix,
  isInView,
}: {
  value: number
  suffix: string
  isInView: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const duration = 2000
    const steps = 60
    const increment = value / steps
    const stepDuration = duration / steps

    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

export function TrustFiguresSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0a0a0a] py-20 lg:py-24 text-white"
    >
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#c89f2f]/30 to-transparent" />
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#c89f2f]/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#c89f2f]/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 xl:px-16">
        
        {/* Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.3em] text-[#c89f2f] sm:text-sm"
          >
            Proven Track Record
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl font-light leading-tight sm:text-4xl lg:text-5xl"
          >
            Numbers That Define Our <span className="italic text-[#c89f2f]">Excellence</span>
          </motion.h2>
        </div>

        {/* 5 Stats Grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-sm transition-all duration-400 hover:border-[#c89f2f]/50 hover:bg-white/[0.06] lg:p-8"
            >
              <div>
                <span className="font-serif text-4xl font-light text-[#c89f2f] sm:text-5xl lg:text-6xl">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    isInView={isInView}
                  />
                </span>
                <p className="mt-3 text-xs uppercase tracking-wider text-white/60 sm:text-sm">
                  {stat.label}
                </p>
              </div>

              {/* Accent hover dot */}
              <div className="mt-4 h-1 w-6 rounded-full bg-white/10 transition-all duration-300 group-hover:w-12 group-hover:bg-[#c89f2f]" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 text-center"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white bg-white px-8 py-4 text-xs font-semibold uppercase tracking-wider text-black transition-all duration-300 hover:border-[#c89f2f] hover:bg-[#c89f2f] hover:text-black sm:text-sm"
          >
            Explore Featured Projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
