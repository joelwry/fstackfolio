import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

export function adminAuthMiddleware(request: NextRequest) {
  // Exclude the login page from authentication checks
  if (request.nextUrl.pathname === "/admin-login") {
    return NextResponse.next()
  }

  const token = request.cookies.get("admin_token")?.value

  if (!token) {
    return NextResponse.redirect(new URL("/admin-login", request.url))
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string)
    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL("/admin-login", request.url))
  }
}


export function userAuthMiddleware(request: NextRequest) {
  // Exclude the login page from authentication checks
  if (request.nextUrl.pathname === "/login") {
    return NextResponse.next()
  }

  const token = request.cookies.get("user_token")?.value

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string)
    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

export const config = {
  matcher: ["/admin/:path*", "/admin-login","/user/:path*","/login"],
}

