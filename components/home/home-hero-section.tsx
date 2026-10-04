"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Noto_Serif_Bengali } from "next/font/google"

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
})

const heroSlides = [
  {
    label: "Homes",
    title: "Rooms That\nShare Your Story",
    subtitle:
      "We design homes that show who you are, with comfort, ease of use, and a style that never fades.",
    images: [
      "/bannerinterior/Banner1.jpeg",
      "/bannerinterior/Banner2.jpeg",
      "/bannerinterior/Banner4.jpeg",
      "/bannerinterior/Banner5.jpeg",
    ],
    accent: "Home Interiors",
  },
  {
    label: "Business",
    title: "Turning Your Ideas\nInto Real Places",
    subtitle:
      "From big offices to small hotels and cafés, we create spaces that help people work well and make a strong first impression.",
    images: [
      "/bannerinterior/Banner7.jpeg",
      "/bannerinterior/Banner10.jpeg",
      "/bannerinterior/Banner12.jpeg",
      "/bannerinterior/Banner14.jpeg",
    ],
    accent: "Workplaces",
  },
  {
    label: "Building Design",
    title: "Made With\nCare & Skill",
    subtitle:
      "Small details count. Our design work gives every part of your building a clear plan, a good look, and a reason to be there.",
    images: [
      "/bannerinterior/Banner15.jpeg",
      "/bannerinterior/Banner18.jpeg",
      "/bannerinterior/Banner3.jpeg",
      "/bannerinterior/Banner6.jpeg",
    ],
    accent: "Architecture",
  },
]

export function HomeHeroSection() {
  const [current, setCurrent] = useState(0)
  const slide = heroSlides[current]

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % heroSlides.length), 6000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-white pt-20">

      {/* ── LEFT + RIGHT split layout ── */}
      <div className="relative z-10 flex min-h-[calc(100vh-5rem)] flex-col lg:flex-row">

        {/* ── LEFT PANEL ── */}
        <div className="flex flex-1 flex-col justify-between px-6 pb-10 pt-12 sm:px-10 lg:max-w-[52%] lg:px-14 lg:pb-16 lg:pt-20 xl:px-20">

          {/* Main content */}
          <div className="mt-4 lg:mt-6">

            {/* Category label */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`label-${current}`}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.4 }}
                className="mb-4 inline-block"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c89f2f] sm:text-sm">
                  {slide.label}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Heading */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${current}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="whitespace-pre-line font-serif text-[2.8rem] font-light leading-[1.1] tracking-[-0.01em] text-neutral-900 sm:text-6xl lg:text-[4.8rem] xl:text-[5.8rem]"
              >
                {slide.title}
              </motion.h1>
            </AnimatePresence>

            {/* Bengali tag */}
            <div className="my-5">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`accent-${current}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`${notoSerifBengali.className} text-lg font-medium text-[#c89f2f] sm:text-xl`}
                >
                  আপনার গল্প আমাদের নকশায়, আপনার ঘরে বাংলার স্পর্শ
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Subtitle */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${current}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="max-w-lg text-base leading-relaxed text-neutral-600 sm:text-lg"
              >
                {slide.subtitle}
              </motion.p>
            </AnimatePresence>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap gap-4 sm:mt-10">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2.5 rounded-full border border-neutral-900 bg-neutral-900 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:border-[#c89f2f] hover:bg-[#c89f2f] hover:text-black sm:text-sm"
              >
                Start Your Project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#services"
                className="group inline-flex items-center gap-2.5 rounded-full border border-neutral-300 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-neutral-800 transition-all duration-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white sm:text-sm"
              >
                Explore Work
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Bottom — slide dots */}
          <div className="mt-10 lg:mt-0">
            <div className="flex items-center gap-4">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="group flex items-center gap-2"
                >
                  <span
                    className={`block h-1 rounded-full transition-all duration-500 ${
                      i === current ? "w-8 bg-[#c89f2f]" : "w-3 bg-neutral-200 group-hover:bg-neutral-400"
                    }`}
                  />
                  <span
                    className={`text-xs font-medium transition-colors sm:text-sm ${
                      i === current ? "text-[#c89f2f]" : "text-neutral-400"
                    }`}
                  >
                    0{i + 1}
                  </span>
                </button>
              ))}
              <span className="ml-2 text-xs text-neutral-400 sm:text-sm">/ 0{heroSlides.length}</span>
            </div>
          </div>
        </div>

        {/* ── DIAGONAL DIVIDER (desktop only) ── */}
        <div className="pointer-events-none absolute bottom-0 left-[48%] top-0 z-20 hidden w-16 lg:block">
          <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 64 100">
            <polygon points="40,0 64,0 24,100 0,100" fill="#ffffff" />
            <line x1="40" y1="0" x2="0" y2="100" stroke="#c89f2f" strokeWidth="0.5" strokeOpacity="0.4" />
          </svg>
        </div>

        {/* ── RIGHT PANEL: Image Mosaic ── */}
        <div className="relative h-[55vw] w-full lg:h-auto lg:flex-1">

          {/* Vertical rotated label */}
          <div className="absolute right-4 top-1/2 z-30 hidden -translate-y-1/2 rotate-90 lg:block">
            <AnimatePresence mode="wait">
              <motion.span
                key={`vert-${current}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-xs font-semibold uppercase tracking-[0.4em] text-neutral-400"
              >
                {slide.accent}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* 2x2 image mosaic */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`grid-${current}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="grid h-full grid-cols-2 grid-rows-2 gap-1.5 p-1.5 pl-8 lg:pl-10"
            >
              {slide.images.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: i * 0.08, ease: "easeOut" }}
                  className={`relative overflow-hidden ${i === 0 ? "row-span-2" : ""}`}
                >
                  <Image
                    src={src}
                    alt={`${slide.label} interior design ${i + 1}`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    priority={i === 0}
                    className="object-cover transition-transform duration-[8000ms] hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Gold corner accents */}
          <div className="pointer-events-none absolute bottom-6 left-14 z-20 hidden lg:block">
            <div className="h-12 w-12 border-b border-l border-[#c89f2f]/40" />
          </div>
          <div className="pointer-events-none absolute right-10 top-10 z-20 hidden lg:block">
            <div className="h-12 w-12 border-r border-t border-[#c89f2f]/40" />
          </div>
        </div>

      </div>
    </section>
  )
}
