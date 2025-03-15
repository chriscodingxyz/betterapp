// import { NextRequest, NextResponse } from 'next/server'
// import { getSessionCookie } from 'better-auth/cookies'

// export async function middleware (request: NextRequest) {
//   // this only checks if cookie doesnt exist...If it doesnt, it redirects
//   // Otherwise
//   const sessionCookie = getSessionCookie(request) // Optionally pass config as the second argument if cookie name or prefix is customized.
//   if (!sessionCookie) {
//     return NextResponse.redirect(
//       new URL('/?toast=error:Signed in users only!', request.url)
//     )
//   }
//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/secret', '/dashboard'] // Specify the routes the middleware applies to
// }

import { NextRequest, NextResponse } from 'next/server'
import { getSessionCookie } from 'better-auth/cookies'

// Group routes by their access requirements
const PROTECTED_ROUTES = ['/secret', '/dashboard', '/account', '/settings']
const AUTH_ROUTES = ['/sign-up', '/sign-in', '/forgot-password']

export async function middleware (request: NextRequest) {
  const sessionCookie = getSessionCookie(request)
  const { pathname } = request.nextUrl

  // Check if the current path is a protected route or starts with a protected prefix
  const isProtectedRoute =
    PROTECTED_ROUTES.includes(pathname) ||
    PROTECTED_ROUTES.some(route => pathname.startsWith(`${route}/`))

  // Check if the current path is an auth route
  const isAuthRoute = AUTH_ROUTES.includes(pathname)

  // 1. Redirect unauthenticated users from protected routes to sign-in
  if (!sessionCookie && isProtectedRoute) {
    // Preserve the original URL for redirecting after sign-in
    const returnTo = encodeURIComponent(pathname)
    return NextResponse.redirect(
      new URL(
        `/sign-in?returnTo=${returnTo}&toast=error:Signed in users only!`,
        request.url
      )
    )
  }

  // 2. Redirect authenticated users away from auth pages
  if (sessionCookie && isAuthRoute) {
    // Check if there's a returnTo parameter to redirect the user back to their intended destination
    const url = new URL(request.url)
    const returnTo = url.searchParams.get('returnTo')

    if (returnTo) {
      return NextResponse.redirect(
        new URL(`${returnTo}?toast=info:Already signed in!`, request.url)
      )
    }

    // Default redirect to dashboard
    return NextResponse.redirect(
      new URL('/dashboard?toast=info:Already signed in!', request.url)
    )
  }

  // Allow the request to proceed normally
  return NextResponse.next()
}

export const config = {
  // Apply middleware to all routes that need authentication checks
  matcher: [
    '/secret/:path*',
    '/dashboard/:path*',
    '/account/:path*',
    '/settings/:path*',
    '/sign-up',
    '/sign-in',
    '/forgot-password'
  ]
}
