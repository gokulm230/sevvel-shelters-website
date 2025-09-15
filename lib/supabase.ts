import { createClient } from '@supabase/supabase-js'
import { type User } from '@supabase/supabase-js'

// Supabase configuration with environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if environment variables are properly set
export const isSupabaseConfigured = 
  typeof supabaseUrl === 'string' && 
  typeof supabaseAnonKey === 'string' &&
  supabaseUrl.includes('supabase.co') && 
  supabaseAnonKey.startsWith('eyJ')

// Create Supabase client only if properly configured
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl!, supabaseAnonKey!) 
  : null

// Helper function to check if Supabase is available
export function requireSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Supabase not configured. Check your environment variables.")
  }
  return { supabase }
}

// Current user helper
export async function getCurrentUser(): Promise<User | null> {
  if (!supabase) return null
  
  try {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}