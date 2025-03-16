import { NextRequest, NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'

// List of routes that require authentication
const PROTECTED_ROUTES = ['/secret', '/dashboard', '/account', '/settings']

// List of auth-related routes that authenticated users shouldn't access
const AUTH_ROUTES = ['/sign-in', '/sign-up', '/forgot-password']

export async function middleware (request: NextRequest) {
  const sessionCookie = getSessionCookie(request)
  const { pathname } = request.nextUrl

  // Check if the current path is a protected route or starts with a protected prefix
  const isProtectedRoute =
    PROTECTED_ROUTES.includes(pathname) ||
    PROTECTED_ROUTES.some(route => pathname.startsWith(`${route}/`))

  // Check if the current path is an auth-related route
  const isAuthRoute =
    AUTH_ROUTES.includes(pathname) ||
    AUTH_ROUTES.some(route => pathname.startsWith(`${route}/`))

  // Redirect unauthenticated users from protected routes
  if (!sessionCookie && isProtectedRoute) {
    return NextResponse.redirect(
      new URL(`/sign-in?toast=error:Signed in users only!`, request.url)
    )
  }

  // Redirect authenticated users from auth routes
  if (sessionCookie && isAuthRoute) {
    return NextResponse.redirect(
      new URL(`/dashboard?toast=info:You are already signed in!`, request.url)
    )
  }

  // Allow all other requests to proceed normally
  return NextResponse.next()
}

export const config = {
  // Update matcher to include all auth routes as well
  matcher: [
    // protected routes
    '/secret/:path*',
    '/dashboard/:path*',
    '/account/:path*',
    '/settings/:path*',

    // signed in users should not be accessing these paths
    '/forgot-password/:path*',
    '/sign-in/:path*',
    '/sign-up/:path*'
  ]
}
