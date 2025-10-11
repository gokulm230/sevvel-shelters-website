import type React from "react"
import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { LayoutWrapper } from "@/components/layout-wrapper"
import "./globals.css"

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-nunito",
})

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
      <body className={`${nunito.variable} font-sans antialiased`}>
        <LayoutWrapper>
          <Suspense fallback={null}>{children}</Suspense>
        </LayoutWrapper>
        <Analytics />
      </body>
    </html>
  )
}
