import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for public routes and API
  const publicRoutes = [
    "/auth/login",
    "/auth/signup",
    "/auth/forgot-password",
    "/auth/reset-password",
    "/api/auth",
  ];

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Check protected routes
  const session = await getServerSession(authOptions);

  // Redirect to login if not authenticated
  if (!session?.user && !pathname.startsWith("/api")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Admin routes
  if (pathname.startsWith("/admin") && session?.user?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Set user info headers for API routes
  const requestHeaders = new Headers(request.headers);
  if (session?.user) {
    requestHeaders.set("x-user-id", session.user.id);
    requestHeaders.set("x-user-role", session.user.role as string);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
