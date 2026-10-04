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
  Sparkles,
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
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [activeStage, setActiveStage] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (!scrollContainerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 20)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 20)

    // Calculate active stage based on scroll position
    const cardWidth = 380 // average card + gap
    const index = Math.min(
      stages.length - 1,
      Math.max(0, Math.round(scrollLeft / cardWidth))
    )
    setActiveStage(index)
  }

  useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return
    el.addEventListener("scroll", checkScroll, { passive: true })
    checkScroll()
    return () => el.removeEventListener("scroll", checkScroll)
  }, [stages.length])

  const scrollToStage = (index: number) => {
    if (!scrollContainerRef.current) return
    const container = scrollContainerRef.current
    const cards = container.querySelectorAll<HTMLElement>(".stage-card")
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      })
      setActiveStage(index)
    }
  }

  const scrollByAmount = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return
    const amount = direction === "left" ? -400 : 400
    scrollContainerRef.current.scrollBy({ left: amount, behavior: "smooth" })
  }

  return (
    <section className="py-20 md:py-28 bg-[#faf9f6] text-[#0d3d3d] relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#a57c00]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#0d3d3d]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a57c00]/10 border border-[#a57c00]/20 text-[#a57c00] text-xs font-semibold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step-by-Step Execution</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light text-[#0d3d3d] leading-tight">
              Our Design & Build <span className="italic text-[#a57c00]">Workflow</span>
            </h2>
          </div>

          {/* Nav Controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#0d3d3d]/60 mr-2">
              Stage <strong className="text-[#a57c00]">{String(activeStage + 1).padStart(2, "0")}</strong> / {String(stages.length).padStart(2, "0")}
            </span>
            <button
              onClick={() => scrollByAmount("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                canScrollLeft
                  ? "border-[#0d3d3d]/20 bg-white text-[#0d3d3d] hover:bg-[#a57c00] hover:border-[#a57c00] hover:text-white shadow-sm"
                  : "border-gray-200 bg-gray-100 text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollByAmount("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                canScrollRight
                  ? "border-[#0d3d3d]/20 bg-white text-[#0d3d3d] hover:bg-[#a57c00] hover:border-[#a57c00] hover:text-white shadow-sm"
                  : "border-gray-200 bg-gray-100 text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick-Jump Stage Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          {stages.map((stage, idx) => {
            const isActive = activeStage === idx
            return (
              <button
                key={stage.stageNumber}
                onClick={() => scrollToStage(idx)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-full text-xs font-medium transition-all flex items-center gap-2 border ${
                  isActive
                    ? "bg-[#0d3d3d] text-white border-[#0d3d3d] shadow-md"
                    : "bg-white text-[#0d3d3d]/70 border-gray-200 hover:border-[#a57c00]/50 hover:text-[#0d3d3d]"
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isActive ? "bg-[#a57c00] text-white" : "bg-gray-100 text-[#0d3d3d]"
                }`}>
                  {stage.stageNumber}
                </span>
                <span>{stage.subtitle}</span>
              </button>
            )
          })}
        </div>

        {/* Horizontal Stages Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth snap-x snap-mandatory no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {stages.map((stage, index) => (
            <div
              key={stage.stageNumber}
              className="stage-card min-w-[300px] sm:min-w-[380px] lg:min-w-[420px] max-w-[440px] flex-shrink-0 snap-center flex flex-col"
            >
              <div className="h-full bg-white border border-gray-200/80 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:border-[#a57c00]/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
                
                {/* Stage Header */}
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-[#a57c00]/10 text-[#a57c00] font-bold text-sm flex items-center justify-center font-serif">
                        {stage.stageNumber}
                      </span>
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#a57c00]">
                        {stage.subtitle}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-gray-400">Step {index + 1} of 5</span>
                  </div>

                  {/* Title & Concise Summary */}
                  <h3 className="text-xl md:text-2xl font-serif font-medium text-[#0d3d3d] mb-3 leading-snug">
                    {stage.title}
                  </h3>

                  {/* Steps Breakdown */}
                  <div className="space-y-3 mt-6">
                    {stage.steps.map((step, stepIdx) => {
                      const Icon = iconMap[step.icon as keyof typeof iconMap]
                      return (
                        <div
                          key={stepIdx}
                          className="p-3.5 rounded-xl bg-[#faf9f6] border border-gray-100 hover:border-[#a57c00]/30 transition-all group/step"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-[#a57c00] flex-shrink-0 mt-0.5 group-hover/step:bg-[#a57c00] group-hover/step:text-white transition-colors">
                              {Icon ? <Icon className="w-4 h-4" /> : <span className="text-xs font-bold">{stepIdx + 1}</span>}
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-[#0d3d3d] group-hover/step:text-[#a57c00] transition-colors">
                                {step.title}
                              </h4>
                              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Card Bottom Progress Bar */}
                <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-1.5 font-medium text-[#0d3d3d]">
                    <span>Stage {stage.stageNumber}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#a57c00]" />
                  </div>
                  <div className="w-16 bg-gray-100 h-1 rounded-full overflow-hidden">
                    <div
                      className="bg-[#a57c00] h-full"
                      style={{ width: `${((index + 1) / stages.length) * 100}%` }}
                    />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
