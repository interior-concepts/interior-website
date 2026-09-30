"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView, useScroll, useSpring } from "framer-motion"

const timelineSteps = [
  {
    year: "2022",
    title: "The Foundation",
    description: "Established in Dhaka with a vision to bring contemporary interior design and refined spatial experiences to modern living.",
    image: "/storytimeline/First Office.jpeg",
  },
  {
    year: "2023",
    title: "First Flagship Residence",
    description: "Completed our first signature luxury apartment project, setting a new benchmark for tailor-made residential interiors.",
    image: "/storytimeline/First Project.jpeg",
  },
  {
    year: "2024",
    title: "Commercial Vanguard",
    description: "Diversified into high-end retail boutiques, corporate offices, and lifestyle hospitality spaces across the city.",
    image: "/storytimeline/First Commercial Project.jpeg",
  },
  {
    year: "2025",
    title: "Design & Engineering Synergy",
    description: "Expanded into a full-service team of 15+ architects, interior specialists, and project managers delivering end-to-end execution.",
    image: "/storytimeline/Meeting Table.jpeg",
  },
  {
    year: "2026",
    title: "50+ Masterpieces Delivered",
    description: "Celebrated the successful completion of over 50 residential and commercial transformations across Bangladesh.",
    image: "/storytimeline/50 Project Done.jpeg",
  },
]

export function OurStory() {
  const containerRef = useRef<HTMLElement>(null)
  const isHeaderInView = useInView(containerRef, { once: true })

  // Scroll progress for vertical timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 60%"],
  })

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-white py-20 lg:py-28">
      {/* Top golden gradient accent */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#c89f2f]/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 xl:px-16">
        
        {/* ── Section Header ── */}
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.3em] text-[#c89f2f] sm:text-sm"
          >
            Our Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl font-light leading-tight text-neutral-900 sm:text-4xl lg:text-5xl"
          >
            Five Years of <span className="italic text-[#c89f2f]">Defining Spaces</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base"
          >
            From our humble beginnings in Dhaka to executing over 50+ bespoke transformations, our story is driven by innovation, precision, and timeless craftsmanship.
          </motion.p>
        </div>

        {/* ── Animated Vertical Timeline ── */}
        <div className="relative mx-auto max-w-5xl">
          
          {/* Timeline Center Line (Desktop) */}
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-neutral-200 lg:block">
            <motion.div
              style={{ scaleY }}
              className="h-full w-full origin-top bg-gradient-to-b from-[#c89f2f] via-[#c89f2f] to-[#0a0a0a]"
            />
          </div>

          {/* Timeline Left Line (Mobile/Tablet) */}
          <div className="absolute left-6 top-0 h-full w-0.5 bg-neutral-200 lg:hidden">
            <motion.div
              style={{ scaleY }}
              className="h-full w-full origin-top bg-gradient-to-b from-[#c89f2f] via-[#c89f2f] to-[#0a0a0a]"
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-16 lg:space-y-24">
            {timelineSteps.map((step, index) => {
              const isEven = index % 2 === 0
              return (
                <TimelineCard key={step.year} step={step} index={index} isEven={isEven} />
              )
            })}
          </div>

        </div>

        {/* Bottom divider line */}
        <div className="mt-20 h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
      </div>
    </section>
  )
}

function TimelineCard({
  step,
  index,
  isEven,
}: {
  step: { year: string; title: string; description: string; image: string }
  index: number
  isEven: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  return (
    <div
      ref={cardRef}
      className={`relative flex flex-col pl-14 lg:pl-0 lg:flex-row lg:items-center ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
    >
      {/* Content Side */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        className={`w-full lg:w-1/2 ${isEven ? "lg:pr-16 lg:text-right" : "lg:pl-16 lg:text-left"}`}
      >
        <div className="group rounded-2xl border border-neutral-200/80 bg-neutral-50/50 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#c89f2f] hover:bg-white hover:shadow-xl lg:p-8">
          {/* Year */}
          <span className="font-serif text-3xl font-light text-[#c89f2f] sm:text-4xl">
            {step.year}
          </span>

          {/* Title */}
          <h3 className="mt-2 font-serif text-xl font-medium text-neutral-900 lg:text-2xl">
            {step.title}
          </h3>

          {/* Description */}
          <p className="mt-3 text-sm leading-relaxed text-neutral-600 sm:text-base">
            {step.description}
          </p>
        </div>
      </motion.div>

      {/* Center Node / Bullet Point */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="absolute left-6 top-8 -translate-x-1/2 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 z-20"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-neutral-900 shadow-md transition-colors duration-300">
          <div className="h-3 w-3 rounded-full bg-[#c89f2f]" />
        </div>
      </motion.div>

      {/* Image Side */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 40 : -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className={`mt-6 w-full lg:mt-0 lg:w-1/2 ${isEven ? "lg:pl-16" : "lg:pr-16"}`}
      >
        <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-neutral-200/80 shadow-md">
          <Image
            src={step.image}
            alt={step.title}
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
      </motion.div>
    </div>
  )
}
