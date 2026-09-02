import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow login page and API
  if (pathname === "/admin/login" || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Check admin cookie
  const admin = req.cookies.get("vxb_admin");
  if (!admin || admin.value !== "1") {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
