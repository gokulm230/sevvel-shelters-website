import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Simplified middleware for development
export async function middleware(request: NextRequest) {
  // During development, we'll just allow all requests without authentication checks
  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
}
