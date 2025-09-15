import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Create a response object
  const res = NextResponse.next()
  
  try {
    // Create the Supabase middleware client
    const supabase = createMiddlewareClient({ req: request, res })
    
    // Refresh the session if needed
    await supabase.auth.getSession()
    
    // Check auth status
    const { data } = await supabase.auth.getSession()
    
    // Protect admin routes
    if (!data.session && request.nextUrl.pathname.startsWith('/admin')) {
      // Redirect directly to login page without adding return path parameter
      const redirectUrl = new URL('/login', request.url)
      
      return NextResponse.redirect(redirectUrl)
    }
    
    // Redirect logged-in users away from login page
    if (data.session && request.nextUrl.pathname === '/login') {
      const redirectUrl = new URL('/admin', request.url)
      return NextResponse.redirect(redirectUrl)
    }
    
    // Allow access with the session cookie set
    return res
  } catch (error) {
    console.error("Middleware error:", error)
    return res
  }
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
}
