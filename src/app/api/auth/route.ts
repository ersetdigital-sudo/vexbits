import { NextRequest, NextResponse } from "next/server";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Admin credentials not configured" }, { status: 500 });
  }

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Email atau password salah." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("vxb_admin", "1", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("vxb_admin", "", { maxAge: 0, path: "/" });
  return res;
}
