"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { Noto_Serif_Bengali } from "next/font/google"
import { ArrowRight, MessageSquare, Paintbrush, FileText, Hammer, CheckCheck } from "lucide-react"

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
})

const processSteps = [
  {
    number: "01",
    title: "Consultation",
    tag: "Discovery",
    description: "Understanding your vision, lifestyle requirements, and project scope.",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "Concept & Design",
    tag: "Creativity",
    description: "Tailored 3D visualizations, spatial layouts, and curated material palettes.",
    icon: Paintbrush,
  },
  {
    number: "03",
    title: "Detailed Planning",
    tag: "Precision",
    description: "Complete technical blueprints, transparent budgets, and timelines.",
    icon: FileText,
  },
  {
    number: "04",
    title: "Execution",
    tag: "Craftsmanship",
    description: "Flawless site supervision, custom fabrication, and quality installation.",
    icon: Hammer,
  },
  {
    number: "05",
    title: "Handover",
    tag: "Completion",
    description: "Final walkthrough, warranty delivery, and ongoing aftercare support.",
    icon: CheckCheck,
  },
]

export function ProcessSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true })
  const stepsRef = useRef<HTMLDivElement>(null)
  const isStepsInView = useInView(stepsRef, { once: true, margin: "-60px" })

  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">

      {/* Top golden gradient accent */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#c89f2f]/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 xl:px-16">

        {/* ── Center-Aligned Header ── */}
        <div ref={headerRef} className="mx-auto mb-16 flex max-w-2xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c89f2f] sm:text-sm">
              How We Work
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl font-light leading-tight text-neutral-900 sm:text-5xl lg:text-6xl"
          >
            Our Design{" "}
            <span className="italic text-[#c89f2f]">Process</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className={`${notoSerifBengali.className} mt-3 text-base font-medium text-[#c89f2f] sm:text-lg`}
          >
            নকশা থেকে বাস্তবায়ন, প্রতিটি ধাপে যত্ন
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base"
          >
            A clear 5-step journey from initial concept to your dream space.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6"
          >
            <Link
              href="/how-we-work"
              className="group inline-flex items-center gap-2 rounded-full border border-neutral-900 bg-neutral-900 px-7 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-all duration-300 hover:border-[#c89f2f] hover:bg-[#c89f2f] hover:text-black sm:text-sm"
            >
              See Full Process
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* ── Sleek Process Cards Grid ── */}
        <div ref={stepsRef} className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
          {processSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                animate={isStepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
                className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-neutral-50/60 p-6 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#c89f2f] hover:bg-white hover:shadow-xl lg:p-7"
              >
                {/* Top Section: Icon & Step Number Watermark */}
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#c89f2f]/30 bg-white text-[#c89f2f] shadow-sm transition-colors duration-400 group-hover:border-[#c89f2f] group-hover:bg-[#c89f2f] group-hover:text-black">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <span className="font-serif text-3xl font-light text-neutral-300 transition-colors duration-400 group-hover:text-[#c89f2f]">
                      {step.number}
                    </span>
                  </div>

                  {/* Category Tag */}
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-[#c89f2f]">
                    {step.tag}
                  </span>

                  {/* Title */}
                  <h3 className="mb-3 font-serif text-xl font-medium text-neutral-900 lg:text-2xl">
                    {step.title}
                  </h3>

                  {/* Concise Description */}
                  <p className="text-sm leading-relaxed text-neutral-600">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Accent line indicator */}
                <div className="mt-6 h-0.5 w-8 bg-neutral-200 transition-all duration-500 group-hover:w-full group-hover:bg-[#c89f2f]" />
              </motion.div>
            )
          })}
        </div>

        {/* Bottom divider line */}
        <div className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
      </div>
    </section>
  )
}
