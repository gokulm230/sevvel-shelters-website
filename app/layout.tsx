import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import "./globals.css"

// Add SMTP.js for email functionality
import Script from 'next/script'

export const metadata: Metadata = {
  title: "Sevvel Shelters - Premium Real Estate in Coimbatore",
  description:
    "Discover premium real estate projects and services in Coimbatore with Sevvel Shelters. Your trusted partner for quality homes and commercial spaces.",
  icons: {
    icon: "/Sevvel_logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://smtpjs.com/v3/smtp.js" strategy="beforeInteractive" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <LayoutWrapper>
          <Suspense fallback={null}>{children}</Suspense>
        </LayoutWrapper>
        <Analytics />
      </body>
    </html>
  )
}
