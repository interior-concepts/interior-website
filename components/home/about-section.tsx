import Image from "next/image"

export function AboutSection() {

  
  return (
    <section id="about" className="py-20 lg:py-32 bg-card">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <Image
              src="/interior-design-team-working-in-modern-studio-offi.jpg"
              alt="Interior design team working in a modern studio"
              width={1200}
              height={900}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="w-full h-[400px] lg:h-[500px] object-cover"
            />
          </div>
          <div>
            <span className="text-sm uppercase tracking-widest text-[#a57c00]">About Us</span>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-[#0d3d3d] text-balance">
              A design studio built around people, not just spaces.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              We are an interior design studio focused on creating thoughtful, elegant environments. Every project
              starts with understanding how you live or work — your routines, your habits, your vision — and translating
              that into a space that feels natural and inspiring.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We believe good design should feel effortless, timeless, and deeply personal.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
