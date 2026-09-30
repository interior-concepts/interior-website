'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowRight, Sparkles } from 'lucide-react'

export function ProjectsHero() {
  const router = useRouter()

  const scrollToGallery = () => {
    const galleryEl = document.getElementById('gallery') || document.getElementById('project-gallery')
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 600, behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-zinc-950 text-white">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/banner/Banner15.jpeg"
          alt="Architectural portfolio luxury interior design background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-100 transition-transform duration-1000"
        />
        {/* Softened transparent gradient overlays to make Banner15 fully visible and readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/35 to-black/40" />
        <div className="absolute inset-0 bg-[#0d3d3d]/15" />
      </div>

      {/* Decorative subtle ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#a57c00]/15 blur-[160px] rounded-full pointer-events-none z-0" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-8 py-28 md:py-36 flex flex-col items-center text-center">
        
        {/* Subtitle Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-white/20 text-[#e6b800] text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-md shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Architectural & Interior Showcase</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light leading-[1.15] text-balance tracking-tight text-white max-w-4xl drop-shadow-2xl"
        >
          Crafting Extraordinary Spaces <br />
          <span className="text-[#a57c00] font-normal italic drop-shadow-md">That Tell Your Story</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-base md:text-lg lg:text-xl text-white max-w-2xl leading-relaxed font-light text-balance drop-shadow-md bg-black/20 p-4 rounded-2xl backdrop-blur-xs border border-white/10"
        >
          Explore our curated portfolio of bespoke residential residences, corporate head offices, and luxury renovations designed with meticulous detail across Bangladesh.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={scrollToGallery}
            className="px-8 py-4 bg-[#a57c00] hover:bg-[#c99a00] text-white font-semibold text-sm uppercase tracking-wider rounded-full shadow-xl shadow-black/40 transition-all duration-300 flex items-center gap-2 group"
          >
            <span>Explore Portfolio</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={() => router.push('/contact')}
            className="px-8 py-4 bg-black/40 hover:bg-black/60 text-white border border-white/30 font-semibold text-sm uppercase tracking-wider rounded-full backdrop-blur-md transition-all duration-300 shadow-xl"
          >
            Book Consultation
          </button>
        </motion.div>

      </div>
    </section>
  )
}