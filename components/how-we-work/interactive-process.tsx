"use client"

import { useEffect, useRef, useState } from "react"
import {
  MessageSquare,
  Users,
  PenTool,
  FileCheck,
  Receipt,
  Hammer,
  HardHat,
  Eye,
  CheckCircle,
  Camera,
  Home,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react"

const iconMap = {
  "message-square": MessageSquare,
  users: Users,
  "pen-tool": PenTool,
  "file-check": FileCheck,
  receipt: Receipt,
  hammer: Hammer,
  "hard-hat": HardHat,
  eye: Eye,
  "check-circle": CheckCircle,
  camera: Camera,
  home: Home,
}

interface Step {
  title: string
  description: string
  icon: string
}

interface Stage {
  stageNumber: string
  title: string
  subtitle: string
  description: string
  steps: Step[]
}

interface InteractiveProcessProps {
  stages: Stage[]
}

export function InteractiveProcess({ stages }: InteractiveProcessProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = () => {
    if (!trackRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current
    setCanScrollLeft(scrollLeft > 10)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10)

    const index = Math.round(scrollLeft / clientWidth)
    if (index >= 0 && index < stages.length) {
      setActiveIndex(index)
    }
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.addEventListener("scroll", updateScrollState, { passive: true })
    updateScrollState()
    return () => track.removeEventListener("scroll", updateScrollState)
  }, [stages.length])

  const scrollToSlide = (index: number) => {
    if (!trackRef.current) return
    const slideWidth = trackRef.current.clientWidth
    trackRef.current.scrollTo({
      left: index * slideWidth,
      behavior: "smooth",
    })
    setActiveIndex(index)
  }

  const handleNext = () => {
    if (activeIndex < stages.length - 1) {
      scrollToSlide(activeIndex + 1)
    }
  }

  const handlePrev = () => {
    if (activeIndex > 0) {
      scrollToSlide(activeIndex - 1)
    }
  }

  return (
    <section id="interactive-process" className="py-20 md:py-28 bg-[#0d3d3d] text-white relative overflow-hidden">
      {/* Background Subtle Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(#a57c00_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.07] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#a57c00]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#000]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header & Navigation Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="h-2 w-2 rounded-full bg-[#a57c00] animate-pulse" />
              <span className="text-xs font-sans tracking-[0.3em] uppercase font-semibold text-[#a57c00]">
                Process Walkthrough
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-white leading-tight">
              Explore Our <span className="italic text-[#a57c00]">5-Stage Journey</span>
            </h2>
          </div>

          {/* Slider Arrow Controls & Slide Counter */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-sans font-medium text-white/60 mr-2">
              Stage <span className="text-white font-bold">{String(activeIndex + 1).padStart(2, "0")}</span> / {String(stages.length).padStart(2, "0")}
            </span>

            <button
              onClick={handlePrev}
              disabled={!canScrollLeft}
              aria-label="Previous Stage"
              className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 ${
                canScrollLeft
                  ? "bg-white/10 text-white hover:bg-[#a57c00] hover:border-[#a57c00] hover:scale-105 active:scale-95"
                  : "bg-white/5 text-white/30 cursor-not-allowed border-white/10"
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              disabled={!canScrollRight}
              aria-label="Next Stage"
              className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 ${
                canScrollRight
                  ? "bg-white/10 text-white hover:bg-[#a57c00] hover:border-[#a57c00] hover:scale-105 active:scale-95"
                  : "bg-white/5 text-white/30 cursor-not-allowed border-white/10"
              }`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Stage Indicator Tabs Track */}
        <div className="flex gap-2 md:gap-4 overflow-x-auto no-scrollbar pb-6 mb-8 scroll-smooth">
          {stages.map((stage, idx) => {
            const isActive = activeIndex === idx
            return (
              <button
                key={stage.stageNumber}
                onClick={() => scrollToSlide(idx)}
                className={`flex-shrink-0 px-5 py-3 rounded-full text-xs md:text-sm font-sans font-medium transition-all duration-300 flex items-center gap-3 border ${
                  isActive
                    ? "bg-[#a57c00] text-white border-[#a57c00] shadow-lg shadow-[#a57c00]/25 scale-105"
                    : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isActive ? "bg-white text-[#a57c00]" : "bg-white/10 text-white"
                }`}>
                  {stage.stageNumber}
                </span>
                <span>{stage.subtitle}</span>
              </button>
            )
          })}
        </div>

        {/* Horizontal Progress Bar */}
        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mb-12">
          <div
            className="bg-[#a57c00] h-full transition-all duration-500 ease-out"
            style={{ width: `${((activeIndex + 1) / stages.length) * 100}%` }}
          />
        </div>

        {/* Horizontal Scrolling Track */}
        <div
          ref={trackRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-6 scroll-smooth pb-4 -mx-2 px-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {stages.map((stage, index) => (
            <div
              key={stage.stageNumber}
              id={`stage-${stage.stageNumber}`}
              className="min-w-full flex-shrink-0 snap-center"
            >
              <div className="relative bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-14 transition-all duration-500 hover:border-white/20 shadow-2xl overflow-hidden group">
                
                {/* Stage Watermark Number */}
                <span className="text-[120px] md:text-[200px] font-serif font-bold text-white/[0.03] absolute -top-8 right-6 select-none pointer-events-none group-hover:text-white/[0.05] transition-colors duration-500">
                  {stage.stageNumber}
                </span>

                {/* Card Top Info */}
                <div className="relative z-10 max-w-3xl mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-[#a57c00]/20 border border-[#a57c00]/40 text-[#a57c00] text-xs font-sans font-semibold tracking-widest uppercase rounded-md">
                      Stage {stage.stageNumber}
                    </span>
                    <span className="text-xs font-sans tracking-widest uppercase text-white/50">
                      {stage.subtitle}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-5xl font-serif font-light text-white mb-4 leading-tight">
                    {stage.title}
                  </h3>

                  <p className="text-white/80 font-sans text-base md:text-lg leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                {/* Sub-steps Grid */}
                <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t border-white/10">
                  {stage.steps.map((step, stepIdx) => (
                    <StepCard key={stepIdx} step={step} index={stepIdx} stageNumber={stage.stageNumber} />
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

/* ─────────────── StepCard Component ─────────────── */
function StepCard({ step, index, stageNumber }: { step: Step; index: number; stageNumber: string }) {
  const Icon = iconMap[step.icon as keyof typeof iconMap]

  return (
    <div className="group/step relative bg-white/[0.03] hover:bg-[#a57c00]/10 border border-white/10 hover:border-[#a57c00]/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#a57c00]/10 flex flex-col justify-between">
      <div>
        {/* Step Icon & Number */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-[#a57c00]/20 border border-[#a57c00]/40 flex items-center justify-center text-[#a57c00] group-hover/step:bg-[#a57c00] group-hover/step:text-white transition-all duration-300">
            {Icon ? (
              <Icon className="w-5 h-5" />
            ) : (
              <span className="font-sans font-bold text-xs">{stageNumber}.{index + 1}</span>
            )}
          </div>
          <span className="text-xs font-sans font-semibold text-white/30 group-hover/step:text-[#a57c00] transition-colors">
            Step 0{index + 1}
          </span>
        </div>

        {/* Step Title & Description */}
        <h4 className="font-sans font-semibold text-lg text-white mb-2 group-hover/step:text-[#a57c00] transition-colors">
          {step.title}
        </h4>
        <p className="font-sans text-sm text-white/70 leading-relaxed group-hover/step:text-white/90 transition-colors">
          {step.description}
        </p>
      </div>

      <div className="mt-4 pt-3 flex items-center text-xs font-sans font-medium text-[#a57c00] opacity-0 group-hover/step:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover/step:translate-x-0">
        <span>Detailed Overview</span>
        <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
      </div>
    </div>
  )
}
