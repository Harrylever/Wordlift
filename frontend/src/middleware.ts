import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const protectedRoutes = ['/board']

export function middleware(request: NextRequest) {
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )
  const isLoggedIn = request.cookies.get("access_token")?.value
  const isLoginPage = request.nextUrl.pathname.startsWith("/login")
  const isRegisterPage = request.nextUrl.pathname.startsWith("/signup")

  // If the user is not logged in and trying to access a protected route, redirect to login
  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("from", request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }
  // If the user is logged in and trying to access the login or register page, redirect to home
  if (isLoggedIn && (isLoginPage || isRegisterPage)) {
    const boardUrl = new URL("/board", request.url)
    return NextResponse.redirect(boardUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
