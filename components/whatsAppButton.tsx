'use client'

import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppButton() {
  const phoneNumber = '8801334935532'
  const message = 'Hello, I saw your interior design work and I’m interested. I would like to discuss a project with you. Please let me know how we can proceed.'


  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <div>
      

      {/* Button */}
     <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-xl transition-all duration-200 hover:scale-105"
  >
    <FaWhatsapp size={30} />
    <span className="hidden sm:inline text-sm font-medium">
        Chat with us
    </span>
  </a>
    </div>
  )
}
