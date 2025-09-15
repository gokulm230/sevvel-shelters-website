import { createClient } from '@supabase/supabase-js'
import { type User } from '@supabase/supabase-js'

// Supabase configuration with hardcoded values for development
// These are already set directly here, so we don't need to check env variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kbnurwcwnxokpkeojpdu.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key-here'


// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Since we're using hardcoded values, Supabase is always configured
export const isSupabaseConfigured = true

// Helper function to check if Supabase is available
export function requireSupabase() {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase not configured")
  }
  return { supabase }
}

// Current user helper
export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}