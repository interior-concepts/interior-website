import type React from "react"
import type { Metadata } from "next"
import { Playfair, Roboto } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import WhatsAppButton from "@/components/whatsAppButton"
import { LocalBusinessJsonLd, ServiceJsonLd } from "@/components/seo/json-ld"
import { siteUrl } from "@/lib/site"

const playfair = Playfair({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
})

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
})

const siteName = "Interior Concepts Studio"
const defaultTitle = "Interior Concepts Studio | Home Interior Design in Bangladesh"
const defaultDescription =
  "Interior Concepts Studio provides home and office interior design in Bangladesh. Get transparent planning, design, and execution for apartments, houses, and commercial spaces."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  alternates: {
    canonical: "/",
  },
  description: defaultDescription,
  applicationName: siteName,
  keywords: [
    "Interior Concepts Studio",
    "Interior Concepts Studio",
    "home interior design in bangladesh",
    "interior design in bangladesh",
    "interior design bangladesh",
    "dhaka interior design",
    "house interior design",
    "apartment interior design",
    "office interior design bangladesh",
    "বাসা ইন্টেরিয়রের খরচ কত",
    "বাসা ইন্টেরিয়র করতে সর্বনিম্ন কত টাকা লাগবে",
    "বাসা ইন্টেরিয়র বা অন্দরসজ্জা",
    "অফিস ইন্টেরিয়র করতে কত টাকা লাগবে",
    "বাংলাদেশে ইন্টেরিয়র ডিজাইন",
    "ঢাকায় ইন্টেরিয়র ডিজাইন",
  ],
  category: "Interior Design",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_BD",
    alternateLocale: ["bn_BD"],
    siteName,
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/Logo/interior-concept-icon-dark.png", type: "image/png" },
    ],
    shortcut: "/Logo/interior-concept-icon-dark.png",
    apple: "/Logo/interior-concept-icon-dark.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${roboto.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning={true}>
        <Header />
        <LocalBusinessJsonLd />
        <ServiceJsonLd />
        {children}
        <WhatsAppButton />
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
