'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Create the Supabase client for browser usage
export const createSupabaseBrowser = () => 
  createClientComponentClient()

// Singleton pattern for the browser client
let browserClient: ReturnType<typeof createSupabaseBrowser> | null = null

// Get or create the browser client
export const getSupabaseBrowser = () => {
  if (browserClient === null) {
    browserClient = createSupabaseBrowser()
  }
  return browserClient
}