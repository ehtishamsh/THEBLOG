import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "./lib/auth";
import { useSession } from "next-auth/react";
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path == "/sign-in" || path == "/sign-up";
  const tokken = request.cookies?.get("next-auth.session-token")?.value || "";
  if (isPublicPath && tokken) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (path === "/create/blog") {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }
  if (path === "/create") {
    return NextResponse.redirect(new URL("/create/blog", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/admin/:path*", "/sign-in", "/sign-up", "/home", "/"],
};

export { default } from "next-auth/middleware";
