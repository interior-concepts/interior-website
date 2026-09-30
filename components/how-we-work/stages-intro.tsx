"use client"

import { useEffect, useRef, useState } from "react"

const stageLabels = [
  "Initial Connection",
  "Design Creation",
  "Execution Begins",
  "Installation Phase",
  "Project Handover",
]

const stageDescriptions = [
  "Share your vision with us",
  "We craft your 3D concept",
  "Production kicks off",
  "On-site excellence",
  "Welcome to your new home",
]

export function StagesIntro() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredStage, setHoveredStage] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const scrollToStage = (stageNum: number) => {
    const el = document.getElementById(`stage-${String(stageNum).padStart(2, "0")}`)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="stages-intro" ref={sectionRef} className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-20 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block text-xs font-sans tracking-[0.35em] uppercase font-semibold text-[#a57c00] mb-5">
            How It Works
          </span>
          {/* Accent line */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#a57c00]/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#a57c00]" />
            <div className="h-px w-12 bg-[#a57c00]/40" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-[#0d3d3d] mb-6 text-balance">
            Your Dream Interior
          </h2>
          <p className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-[#a57c00] mb-8 text-balance italic">
            in 5 Simple Stages
          </p>
          <p className="text-[#4a4a4a] font-sans text-lg max-w-xl mx-auto leading-relaxed">
            From the first conversation to the final handover — every step is thoughtfully crafted around you.
          </p>
        </div>

        {/* Stage Navigator */}
        <div
          className={`transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Desktop: horizontal timeline */}
          <div className="hidden md:block relative">
            {/* Connecting track */}
            <div className="absolute top-10 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#0d3d3d]/15 to-transparent" />

            <div className="flex justify-between items-start max-w-3xl mx-auto">
              {[1, 2, 3, 4, 5].map((num, index) => (
                <button
                  key={num}
                  className="group flex flex-col items-center gap-4 cursor-pointer relative"
                  onMouseEnter={() => setHoveredStage(num)}
                  onMouseLeave={() => setHoveredStage(null)}
                  onClick={() => scrollToStage(num)}
                >
                  {/* Pulse ring */}
                  <div
                    className={`absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-[#a57c00]/10 transition-all duration-500 ${
                      hoveredStage === num ? "scale-150 opacity-100" : "scale-100 opacity-0"
                    }`}
                  />
                  {/* Circle */}
                  <div
                    className={`relative w-20 h-20 rounded-full flex flex-col items-center justify-center border-2 transition-all duration-400 font-sans font-medium ${
                      hoveredStage === num
                        ? "bg-[#a57c00] border-[#a57c00] text-white scale-110 shadow-xl shadow-[#a57c00]/30"
                        : "bg-white border-[#0d3d3d]/20 text-[#0d3d3d] hover:border-[#a57c00]/60"
                    }`}
                    style={{ transitionDelay: `${index * 40}ms` }}
                  >
                    <span className="text-xs uppercase tracking-widest opacity-60">Stage</span>
                    <span className="text-lg font-semibold leading-none">{String(num).padStart(2, "0")}</span>
                  </div>
                  {/* Label */}
                  <div className="text-center">
                    <p
                      className={`text-sm font-sans font-semibold transition-colors duration-300 ${
                        hoveredStage === num ? "text-[#a57c00]" : "text-[#0d3d3d]"
                      }`}
                    >
                      {stageLabels[index]}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 max-w-[100px] leading-snug">
                      {stageDescriptions[index]}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile: vertical list */}
          <div className="md:hidden space-y-4 max-w-xs mx-auto">
            {[1, 2, 3, 4, 5].map((num, index) => (
              <button
                key={num}
                onClick={() => scrollToStage(num)}
                className="w-full flex items-center gap-4 p-4 rounded-xl border border-[#0d3d3d]/10 hover:border-[#a57c00]/40 hover:bg-[#a57c00]/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#0d3d3d] text-white flex items-center justify-center font-sans font-semibold text-sm flex-shrink-0">
                  {String(num).padStart(2, "0")}
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-[#0d3d3d]">{stageLabels[index]}</p>
                  <p className="text-xs text-gray-400">{stageDescriptions[index]}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
