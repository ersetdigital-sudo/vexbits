"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
    ),
  },
  {
    href: "/admin/orders",
    label: "Pesanan",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/><path d="M9 14l2 2 4-4"/></svg>
    ),
  },
  {
    href: "/admin/products",
    label: "Produk",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
    ),
  },
  {
    href: "/admin/settings",
    label: "Pengaturan",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
    ),
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[var(--ink)] text-white shrink-0 sticky top-0 h-screen">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--orange)] grid place-items-center font-extrabold text-lg font-display">V</div>
            <div>
              <p className="font-extrabold text-base tracking-tight">VEXBITS</p>
              <p className="text-[11px] text-white/50 font-medium">Admin Panel</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-white/10 space-y-2">
          <button
            onClick={logout}
            className="flex items-center gap-2 text-xs text-white/40 hover:text-red-400 transition-colors w-full"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Logout
          </button>
          <Link href="/" className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
            Kembali ke situs
          </Link>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[var(--ink)] text-white px-4 py-3 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--orange)] grid place-items-center font-extrabold text-sm font-display">V</div>
          <span className="font-extrabold text-sm">Admin</span>
        </Link>
        <div className="flex items-center gap-2">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`p-2 rounded-lg transition-colors ${
                pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white"
              }`}
              title={item.label}
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 min-w-0 lg:min-h-screen">
        <div className="p-4 md:p-6 lg:p-8 pt-16 lg:pt-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
