"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { getSupabaseBrowser } from "@/lib/supabase-browser"
import type { User } from '@supabase/supabase-js'
import { Button } from "@/components/ui/button"
import { LogOut, Home } from "lucide-react"
import Link from "next/link"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Get the current session
    const getSession = async () => {
      try {
        // Use the browser client
        const supabaseBrowser = getSupabaseBrowser()
        const { data: { session } } = await supabaseBrowser.auth.getSession()
        
        if (session?.user) {
          setUser(session.user)
        } else {
          // No session found, user is not authenticated
          setUser(null)
          // The middleware will handle redirecting to login page
        }
      } catch (error) {
        console.error("Error getting session:", error)
        setUser(null)
      }
      setLoading(false)
    }
    
    getSession()

    // Set up auth state change listener
    const supabaseBrowser = getSupabaseBrowser()
    const { data: { subscription } } = supabaseBrowser.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user)
        }
      }
    )
    
    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  const handleLogout = async () => {
    try {
      const supabaseBrowser = getSupabaseBrowser()
      await supabaseBrowser.auth.signOut()
      router.push("/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <img src="/Sevvel_logo.jpg" alt="Sevvel Shelters Logo" />
                </div>
                <span className="font-bold text-xl text-foreground">Admin Panel</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                <Home className="h-5 w-5" />
              </Link>
              <span className="text-sm text-muted-foreground">Welcome, {user.email}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-destructive bg-transparent"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  )
}
