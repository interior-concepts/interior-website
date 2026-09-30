"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "How We Work", href: "/how-we-work" },
  { name: "Contact", href: "/contact" },
]

function NavLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  const pathname = usePathname() || "/"
  const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href)
  return (
    <Link
      href={href}
      className={`${className} ${isActive ? "text-[#a57c00]" : "text-black/80"} transition-colors`}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  )
}

export function DesktopNavigation() {
  return (
    <div className="hidden lg:flex lg:items-center lg:gap-8">
      {navItems.map((item) => (
        <NavLink key={item.name} href={item.href} className="text-sm">
          {item.name}
        </NavLink>
      ))}
    </div>
  )
}

export function MobileNavigation({ onClose }: { onClose?: () => void }) {
  const router = useRouter()

  return (
    <div className="lg:hidden py-4 border-t border-black/20">
      <div className="flex flex-col gap-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-sm text-black/80 hover:text-[#a57c00] transition-colors"
            onClick={() => onClose?.()}
          >
            {item.name}
          </Link>
        ))}

        <Button
          className="bg-[#a57c00] text-white rounded-full w-full mt-2"
          onClick={() => {
            router.push("/contact")
            onClose?.()
          }}
        >
          Book Consultation
        </Button>
      </div>
    </div>
  )
}