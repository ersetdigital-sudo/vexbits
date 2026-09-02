"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type Order = {
  id: string;
  invoice: string;
  game_title: string;
  product_slug: string | null;
  account_id: string;
  zone_id: string | null;
  item: string;
  price: string;
  payment_method: string;
  wa_number: string;
  promo_code: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

const STATUS_OPTIONS = [
  { value: "all", label: "Semua" },
  { value: "pending", label: "Menunggu" },
  { value: "processing", label: "Diproses" },
  { value: "completed", label: "Selesai" },
  { value: "failed", label: "Gagal" },
  { value: "cancelled", label: "Dibatalkan" },
  { value: "refunded", label: "Refund" },
];

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  processing: "bg-blue-50 text-blue-700 border-blue-200",
  completed: "bg-green-50 text-green-700 border-green-200",
  failed: "bg-red-50 text-red-700 border-red-200",
  cancelled: "bg-gray-50 text-gray-500 border-gray-200",
  refunded: "bg-purple-50 text-purple-700 border-purple-200",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Menunggu",
  processing: "Diproses",
  completed: "Selesai",
  failed: "Gagal",
  cancelled: "Dibatalkan",
  refunded: "Refund",
};

export default function OrdersClient({ orders, currentStatus, error: initialError }: { orders: Order[]; currentStatus: string; error?: string | null }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selected, setSelected] = useState<Order | null>(null);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(initialError);
  const [search, setSearch] = useState("");

  const filtered = orders.filter((o) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      o.invoice.toLowerCase().includes(q) ||
      o.game_title.toLowerCase().includes(q) ||
      o.account_id.toLowerCase().includes(q) ||
      o.wa_number.includes(q)
    );
  });

  async function updateStatus(orderId: string, newStatus: string) {
    setUpdating(true);
    await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setUpdating(false);
    setSelected(null);
    startTransition(() => router.refresh());
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold font-display text-[var(--ink)]">Pesanan</h1>
          <p className="text-sm text-[var(--ink-soft)] mt-0.5">{orders.length} total pesanan.</p>
        </div>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Status Tabs */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {STATUS_OPTIONS.map((s) => (
            <a
              key={s.value}
              href={s.value === "all" ? "/admin/orders" : `/admin/orders?status=${s.value}`}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border ${
                currentStatus === s.value
                  ? "bg-[var(--blue)] text-white border-[var(--blue)]"
                  : "bg-white text-[var(--ink-soft)] border-[var(--line)] hover:border-[var(--blue)] hover:text-[var(--blue)]"
              }`}
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* Search */}
        <div className="relative sm:ml-auto">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ink-soft)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            type="text"
            placeholder="Cari invoice, game, ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64 h-10 pl-9 pr-4 rounded-xl border border-[var(--line)] bg-white text-sm outline-none focus:border-[var(--blue)] focus:ring-2 focus:ring-[var(--blue)]/10 transition-all"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-[var(--line)] overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-[var(--ink-soft)]">
            <div className="text-4xl mb-3">📭</div>
            Tidak ada pesanan ditemukan.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--bg)]">
                  <th className="text-left px-4 py-3 font-semibold text-[var(--ink-soft)]">Invoice</th>
                  <th className="text-left px-4 py-3 font-semibold text-[var(--ink-soft)]">Game</th>
                  <th className="text-left px-4 py-3 font-semibold text-[var(--ink-soft)] hidden md:table-cell">Akun</th>
                  <th className="text-left px-4 py-3 font-semibold text-[var(--ink-soft)]">Item</th>
                  <th className="text-left px-4 py-3 font-semibold text-[var(--ink-soft)]">Harga</th>
                  <th className="text-left px-4 py-3 font-semibold text-[var(--ink-soft)] hidden sm:table-cell">Bayar</th>
                  <th className="text-left px-4 py-3 font-semibold text-[var(--ink-soft)]">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-[var(--ink-soft)] hidden lg:table-cell">Waktu</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((order) => (
                  <tr key={order.id} className="border-t border-[var(--line)] hover:bg-[var(--bg)] transition-colors">
                    <td className="px-4 py-3 font-mono font-semibold text-[var(--ink)] text-xs">{order.invoice}</td>
                    <td className="px-4 py-3 text-[var(--ink)]">{order.game_title}</td>
                    <td className="px-4 py-3 text-[var(--ink-soft)] hidden md:table-cell font-mono text-xs">{order.account_id}</td>
                    <td className="px-4 py-3 text-[var(--ink)]">{order.item}</td>
                    <td className="px-4 py-3 font-semibold text-[var(--blue)]">Rp{order.price}</td>
                    <td className="px-4 py-3 text-[var(--ink-soft)] text-xs hidden sm:table-cell">{order.payment_method}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${STATUS_COLORS[order.status] ?? STATUS_COLORS.pending}`}>
                        {STATUS_LABELS[order.status] ?? order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[var(--ink-soft)] text-xs hidden lg:table-cell">
                      {new Date(order.created_at).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelected(order)}
                        className="text-xs font-semibold text-[var(--blue)] hover:underline"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-[var(--line)] flex items-center justify-between">
              <div>
                <p className="font-mono font-bold text-sm text-[var(--ink)]">{selected.invoice}</p>
                <p className="text-xs text-[var(--ink-soft)] mt-0.5">
                  {new Date(selected.created_at).toLocaleString("id-ID")}
                </p>
              </div>
              <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-lg hover:bg-[var(--bg)] grid place-items-center text-[var(--ink-soft)]">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              {/* Status + Update */}
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${STATUS_COLORS[selected.status] ?? STATUS_COLORS.pending}`}>
                  {STATUS_LABELS[selected.status] ?? selected.status}
                </span>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Game", value: selected.game_title },
                  { label: "Item", value: selected.item, bold: true },
                  { label: "Akun", value: selected.account_id + (selected.zone_id ? ` (${selected.zone_id})` : ""), mono: true },
                  { label: "Harga", value: `Rp${selected.price}`, color: true },
                  { label: "Pembayaran", value: selected.payment_method },
                  { label: "WhatsApp", value: selected.wa_number, mono: true },
                  ...(selected.promo_code ? [{ label: "Promo", value: selected.promo_code }] : []),
                ].map((row) => (
                  <div key={row.label} className="bg-[var(--bg)] rounded-xl px-3 py-2.5">
                    <p className="text-[11px] text-[var(--ink-soft)] font-medium uppercase tracking-wider">{row.label}</p>
                    <p className={`text-sm mt-0.5 ${row.bold ? "font-extrabold text-[var(--blue)]" : row.color ? "font-bold text-[var(--blue)]" : row.mono ? "font-mono" : "font-semibold"} text-[var(--ink)]`}>
                      {row.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Notes */}
              {selected.notes && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3">
                  <p className="text-xs font-semibold text-yellow-700 mb-1">Catatan</p>
                  <p className="text-sm text-yellow-800">{selected.notes}</p>
                </div>
              )}

              {/* Status Update Buttons */}
              <div className="pt-2 border-t border-[var(--line)]">
                <p className="text-xs font-semibold text-[var(--ink-soft)] mb-2">Ubah Status</p>
                <div className="flex flex-wrap gap-2">
                  {["pending", "processing", "completed", "failed", "cancelled", "refunded"].map((s) => (
                    <button
                      key={s}
                      disabled={selected.status === s || updating}
                      onClick={() => updateStatus(selected.id, s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        selected.status === s
                          ? "bg-[var(--ink)] text-white border-[var(--ink)] cursor-default"
                          : "bg-white text-[var(--ink-soft)] border-[var(--line)] hover:border-[var(--blue)] hover:text-[var(--blue)] disabled:opacity-40"
                      }`}
                    >
                      {STATUS_LABELS[s]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
