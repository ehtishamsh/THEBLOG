import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const protectedPaths = [
    "/create",
    "/admin",
    "/user/profile",
    "/user/blogs",
    // Add other user-specific paths here
  ];

  if (protectedPaths.some((pattern) => path.startsWith(pattern))) {
    // Check if user is signed in
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      // Redirect to sign-in if not signed in
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  // Allow access for public and other paths
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/sign-in",
    "/sign-up",
    "/home",
    "/",
    "/user/:path*",
  ],
};

export { default } from "next-auth/middleware";
