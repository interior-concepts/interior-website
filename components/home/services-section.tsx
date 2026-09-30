"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Home, Building2, Compass } from "lucide-react"
import { motion } from "framer-motion"

const servicesData = [
  {
    id: "01",
    title: "Residential Interior",
    description:
      "Crafting luxury home interiors, duplexes, and apartment spaces tailored to your personal style.",
    href: "/services/residential",
    icon: Home,
  },
  {
    id: "02",
    title: "Commercial & Workspace",
    description:
      "Designing corporate offices, retail boutiques, and hospitality venues engineered to elevate your brand.",
    href: "/services/commercial",
    icon: Building2,
  },
  {
    id: "03",
    title: "Architectural Planning",
    description:
      "End-to-end structural planning, 3D facade elevation, and comprehensive architectural blueprints.",
    href: "/services/architectural",
    icon: Compass,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

export function ServicesSection() {
  return (
    <section id="services" className="relative overflow-hidden bg-white py-24 lg:py-32">

      {/* ── Background CAD Blueprint Accent (35 degree rotate, 70% opacity) ── */}
      <div className="pointer-events-none absolute -right-24 -top-12 z-0 hidden w-[520px] select-none opacity-70 lg:block xl:w-[620px]">
        <div className="relative aspect-[4/3] w-full rotate-[35deg] overflow-hidden rounded-2xl border border-[#c89f2f]/30 shadow-2xl transition-all duration-700">
          <Image
            src="/cad drawing 1.jpeg"
            alt="Architectural CAD Blueprint"
            fill
            className="object-cover grayscale contrast-125 mix-blend-multiply"
          />
          {/* Subtle gold blueprint wash */}
          <div className="absolute inset-0 bg-[#c89f2f]/10 mix-blend-color" />
        </div>
      </div>

      {/* Mobile/Tablet subtle background CAD blueprint */}
      <div className="pointer-events-none absolute -right-32 bottom-0 z-0 w-80 select-none opacity-50 sm:w-96 lg:hidden">
        <div className="relative aspect-square w-full rotate-[35deg] overflow-hidden rounded-xl border border-[#c89f2f]/20">
          <Image
            src="/cad drawing 1.jpeg"
            alt="Architectural CAD Blueprint"
            fill
            className="object-cover opacity-70 grayscale contrast-125"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 xl:px-16">

        {/* ── Section Header ── */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="mb-3">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#c89f2f] sm:text-sm">
                What We Offer
              </span>
            </div>
            <h2 className="font-serif text-4xl font-light leading-tight text-neutral-900 sm:text-5xl lg:text-6xl">
              Interior & Architectural{" "}
              <span className="italic text-[#c89f2f]">Services</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="max-w-xs text-sm leading-relaxed text-neutral-600 sm:text-base md:text-right">
              Tailored design, engineering, and execution for residential and commercial environments.
            </p>
          </motion.div>
        </div>

        {/* ── Services Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {servicesData.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#c89f2f] hover:shadow-xl lg:p-10"
              >
                <div>
                  {/* Top Row: Icon + Number */}
                  <div className="mb-8 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#c89f2f]/30 bg-neutral-50 text-[#c89f2f] shadow-sm transition-colors duration-400 group-hover:border-[#c89f2f] group-hover:bg-[#c89f2f] group-hover:text-black">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <span className="font-serif text-3xl font-light text-neutral-300 transition-colors duration-300 group-hover:text-[#c89f2f]">
                      {service.id}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 font-serif text-2xl font-medium text-neutral-900 transition-colors duration-300 group-hover:text-neutral-900 lg:text-3xl">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-8 text-sm leading-relaxed text-neutral-600 sm:text-base">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Link */}
                <div className="pt-2">
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-neutral-900 transition-colors duration-300 group-hover:text-[#c89f2f]"
                  >
                    <span>Explore Service</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </Link>
                </div>

                {/* Gold bottom accent line */}
                <div className="absolute bottom-0 left-6 right-6 h-0.5 w-0 bg-[#c89f2f] transition-all duration-500 group-hover:w-[calc(100%-3rem)]" />
              </motion.div>
            )
          })}
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-neutral-200/80 pt-12 sm:flex-row lg:mt-20"
        >
          <p className="text-sm text-neutral-600 sm:text-base">
            Need a custom interior consultation or architectural estimate?
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 rounded-full border border-neutral-900 bg-neutral-900 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:border-[#c89f2f] hover:bg-[#c89f2f] hover:text-black sm:text-sm"
          >
            Start Your Project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
