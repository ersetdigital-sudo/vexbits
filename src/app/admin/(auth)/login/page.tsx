"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Email atau password salah.");
      }
    } catch {
      setError("Gagal menghubungi server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[var(--ink)] grid place-items-center shadow-lg">
            <span className="text-2xl font-extrabold font-display text-[var(--orange)]">V</span>
          </div>
          <h1 className="mt-4 text-xl font-extrabold font-display text-[var(--ink)]">Admin Panel</h1>
          <p className="text-sm text-[var(--ink-soft)] mt-1">Masukkan email & password untuk masuk.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[var(--line)] p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[var(--ink)] mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@vexbits.net"
                autoFocus
                autoComplete="email"
                className="w-full h-12 px-4 rounded-xl border border-[var(--line)] bg-white text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--ink)] mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full h-12 px-4 rounded-xl border border-[var(--line)] bg-white text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/10 transition-all font-mono"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full h-12 rounded-xl bg-[var(--orange)] text-white font-bold text-sm hover:bg-[#F06C09] disabled:opacity-40 transition-all shadow-md"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>
          </div>
        </form>

        <p className="text-center text-xs text-[var(--ink-soft)] mt-4">
          <a href="/" className="hover:underline text-[var(--blue)]">← Kembali ke beranda</a>
        </p>
      </div>
    </div>
  );
}
