"use client"

import { usePathname } from "next/navigation"
import { WhatsAppButton } from "./whatsapp-button"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  
  // Hide WhatsApp button on login and signup pages
  const hideWhatsApp = pathname === '/login' || pathname === '/signup' || pathname === '/setup-admin'
  
  return (
    <>
      {children}
      {!hideWhatsApp && <WhatsAppButton />}
    </>
  )
}