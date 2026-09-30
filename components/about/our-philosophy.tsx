"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Compass, ShieldCheck, Leaf, HeartHandshake } from "lucide-react"

const philosophyCards = [
  {
    number: "01",
    icon: Compass,
    title: "Purposeful Elegance",
    description: "Harmonizing timeless aesthetic beauty with intuitive functionality.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Artisanal Quality",
    description: "Master craftsmanship and precision engineering in every detail.",
  },
  {
    number: "03",
    icon: Leaf,
    title: "Sustainable Living",
    description: "Eco-conscious, non-toxic materials for lasting wellness.",
  },
  {
    number: "04",
    icon: HeartHandshake,
    title: "Transparent Trust",
    description: "Open communication and complete budgetary clarity from day one.",
  },
]

export function OurPhilosophy() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isHeaderInView = useInView(headerRef, { once: true })
  const cardsRef = useRef<HTMLDivElement>(null)
  const isCardsInView = useInView(cardsRef, { once: true, margin: "-60px" })

  return (
    <section className="relative overflow-hidden bg-[#faf9f6] py-20 lg:py-28">
      {/* Subtle top gold divider */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#c89f2f]/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 xl:px-16">
        
        {/* Header */}
        <div ref={headerRef} className="mx-auto mb-16 max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.3em] text-[#c89f2f] sm:text-sm"
          >
            Our Philosophy
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl font-light leading-tight text-neutral-900 sm:text-4xl lg:text-5xl"
          >
            Principles That Shape <span className="italic text-[#c89f2f]">Every Space</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base"
          >
            Curating environments that reflect identity, purpose, and enduring quality.
          </motion.p>
        </div>

        {/* 4 Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {philosophyCards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.number}
                initial={{ opacity: 0, y: 24 }}
                animate={isCardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#c89f2f] hover:shadow-xl lg:p-8"
              >
                <div>
                  {/* Top Row: Icon + Number */}
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#c89f2f]/30 bg-neutral-50 text-[#c89f2f] shadow-sm transition-colors duration-400 group-hover:border-[#c89f2f] group-hover:bg-[#c89f2f] group-hover:text-black">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <span className="font-serif text-3xl font-light text-neutral-300 transition-colors duration-300 group-hover:text-[#c89f2f]">
                      {card.number}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 font-serif text-xl font-medium text-neutral-900 lg:text-2xl">
                    {card.title}
                  </h3>

                  {/* Concise Description */}
                  <p className="text-sm leading-relaxed text-neutral-600 sm:text-base">
                    {card.description}
                  </p>
                </div>

                {/* Bottom hover accent line */}
                <div className="mt-8 h-0.5 w-8 bg-neutral-200 transition-all duration-500 group-hover:w-full group-hover:bg-[#c89f2f]" />
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
