"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type Nominal = {
  id: string;
  value: string;
  price: string;
  strike: string | null;
  is_active: boolean;
  sort_order: number;
};

type Product = {
  id: string;
  slug: string;
  title: string;
  publisher: string;
  img: string;
  img_bg: string;
  account_mode: string;
  account_label: string;
  account_placeholder: string;
  zone_label: string | null;
  zone_placeholder: string | null;
  zone_options: string[] | null;
  account_hint: string | null;
  nominal_title: string;
  is_active: boolean;
  sort_order: number;
  product_nominals: Nominal[];
};

const EMPTY_PRODUCT = {
  slug: "",
  title: "",
  publisher: "",
  img: "/images/",
  img_bg: "#EEF3FF",
  account_mode: "single",
  account_label: "Player ID",
  account_placeholder: "Contoh: 123456789",
  zone_label: "",
  zone_placeholder: "",
  account_hint: "",
  nominal_title: "Pilih Nominal",
  is_active: true,
  sort_order: 0,
};

export default function ProductsClient({ products: initial, error: initialError }: { products: Product[]; error?: string | null }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [products, setProducts] = useState<Product[]>(initial);
  const [error, setError] = useState(initialError);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_PRODUCT);
  const [saving, setSaving] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [nominalForm, setNominalForm] = useState({ value: "", price: "", strike: "" });
  const [editingNominal, setEditingNominal] = useState<Nominal | null>(null);

  function refresh() {
    startTransition(() => router.refresh());
  }

  function openNew() {
    setEditing(null);
    setForm(EMPTY_PRODUCT);
    setShowForm(true);
  }

  function openEdit(p: Product) {
    setEditing(p);
    setForm({
      slug: p.slug,
      title: p.title,
      publisher: p.publisher,
      img: p.img,
      img_bg: p.img_bg,
      account_mode: p.account_mode,
      account_label: p.account_label,
      account_placeholder: p.account_placeholder,
      zone_label: p.zone_label ?? "",
      zone_placeholder: p.zone_placeholder ?? "",
      account_hint: p.account_hint ?? "",
      nominal_title: p.nominal_title,
      is_active: p.is_active,
      sort_order: p.sort_order,
    });
    setShowForm(true);
  }

  async function saveProduct() {
    setSaving(true);
    setError(null);
    const payload = {
      ...form,
      zone_label: form.zone_label || null,
      zone_placeholder: form.zone_placeholder || null,
      account_hint: form.account_hint || null,
    };

    try {
      if (editing) {
        const res = await fetch(`/api/products/${editing.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Gagal update produk");
      } else {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Gagal tambah produk");
      }
      setShowForm(false);
      refresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(id: string, current: boolean) {
    await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !current }),
    });
    refresh();
  }

  async function deleteProduct(id: string) {
    if (!confirm("Hapus produk ini beserta semua nominalnya?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    refresh();
  }

  // --- Nominal CRUD ---
  async function addNominal(productId: string) {
    if (!nominalForm.value || !nominalForm.price) return;
    setSaving(true);
    try {
      await fetch(`/api/products/${productId}/nominals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          value: nominalForm.value,
          price: nominalForm.price,
          strike: nominalForm.strike || null,
          sort_order: 99,
        }),
      });
      setNominalForm({ value: "", price: "", strike: "" });
      refresh();
    } finally {
      setSaving(false);
    }
  }

  async function saveNominal(nominalId: string, productId: string) {
    if (!editingNominal) return;
    setSaving(true);
    try {
      await fetch(`/api/products/${productId}/nominals/${nominalId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          value: editingNominal.value,
          price: editingNominal.price,
          strike: editingNominal.strike || null,
        }),
      });
      setEditingNominal(null);
      refresh();
    } finally {
      setSaving(false);
    }
  }

  async function deleteNominal(nominalId: string, productId: string) {
    if (!confirm("Hapus nominal ini?")) return;
    await fetch(`/api/products/${productId}/nominals/${nominalId}`, { method: "DELETE" });
    refresh();
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold font-display text-[var(--ink)]">Produk</h1>
          <p className="text-sm text-[var(--ink-soft)] mt-0.5">{products.length} game tersedia.</p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--blue)] text-white text-sm font-bold hover:bg-blue-700 transition-colors shadow-md"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
          Tambah Produk
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>
          {error}
          <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600">×</button>
        </div>
      )}

      {/* Product List */}
      <div className="space-y-3">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-2xl border border-[var(--line)] overflow-hidden">
            {/* Product Header */}
            <div className="px-5 py-4 flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt={p.title} className="w-14 h-14 rounded-xl object-cover bg-gray-100" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-[var(--ink)] truncate">{p.title}</h3>
                  {!p.is_active && (
                    <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">NONAKTIF</span>
                  )}
                </div>
                <p className="text-xs text-[var(--ink-soft)]">{p.publisher} · {p.product_nominals.length} nominal</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
                  className="p-2 rounded-lg hover:bg-[var(--bg)] text-[var(--ink-soft)] transition-colors"
                  title="Nominal"
                >
                  <svg className={`w-4 h-4 transition-transform ${expandedId === p.id ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                <button
                  onClick={() => toggleActive(p.id, p.is_active)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    p.is_active
                      ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                      : "bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {p.is_active ? "Aktif" : "Nonaktif"}
                </button>
                <button
                  onClick={() => openEdit(p)}
                  className="p-2 rounded-lg hover:bg-[var(--bg)] text-[var(--ink-soft)] transition-colors"
                  title="Edit"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="p-2 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
                  title="Hapus"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                </button>
              </div>
            </div>

            {/* Expanded Nominals */}
            {expandedId === p.id && (
              <div className="border-t border-[var(--line)] bg-[var(--bg)] px-5 py-4">
                <p className="text-xs font-semibold text-[var(--ink-soft)] mb-3">Nominal Tersedia</p>

                {/* Add Nominal Form */}
                <div className="flex flex-col sm:flex-row gap-2 mb-3">
                  <input
                    placeholder="Nama nominal"
                    value={nominalForm.value}
                    onChange={(e) => setNominalForm({ ...nominalForm, value: e.target.value })}
                    className="flex-1 h-9 px-3 rounded-lg border border-[var(--line)] bg-white text-sm outline-none focus:border-[var(--blue)]"
                  />
                  <input
                    placeholder="Harga (contoh: 15000)"
                    value={nominalForm.price}
                    onChange={(e) => setNominalForm({ ...nominalForm, price: e.target.value })}
                    className="w-full sm:w-32 h-9 px-3 rounded-lg border border-[var(--line)] bg-white text-sm outline-none focus:border-[var(--blue)]"
                  />
                  <input
                    placeholder="Coret (opsional)"
                    value={nominalForm.strike}
                    onChange={(e) => setNominalForm({ ...nominalForm, strike: e.target.value })}
                    className="w-full sm:w-32 h-9 px-3 rounded-lg border border-[var(--line)] bg-white text-sm outline-none focus:border-[var(--blue)]"
                  />
                  <button
                    onClick={() => addNominal(p.id)}
                    disabled={saving || !nominalForm.value || !nominalForm.price}
                    className="h-9 px-4 rounded-lg bg-[var(--blue)] text-white text-xs font-bold hover:bg-blue-700 disabled:opacity-40 transition-colors"
                  >
                    + Tambah
                  </button>
                </div>

                {/* Nominal List */}
                <div className="space-y-2">
                  {p.product_nominals.length === 0 ? (
                    <p className="text-xs text-[var(--ink-soft)] italic">Belum ada nominal.</p>
                  ) : (
                    p.product_nominals
                      .sort((a, b) => a.sort_order - b.sort_order)
                      .map((n) => (
                        <div key={n.id} className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-[var(--line)]">
                          {editingNominal?.id === n.id ? (
                            <>
                              <input
                                value={editingNominal.value}
                                onChange={(e) => setEditingNominal({ ...editingNominal, value: e.target.value })}
                                className="flex-1 h-8 px-2 rounded border border-[var(--line)] text-sm outline-none focus:border-[var(--blue)]"
                              />
                              <input
                                value={editingNominal.price}
                                onChange={(e) => setEditingNominal({ ...editingNominal, price: e.target.value })}
                                className="w-24 h-8 px-2 rounded border border-[var(--line)] text-sm outline-none focus:border-[var(--blue)]"
                              />
                              <button onClick={() => saveNominal(n.id, p.id)} className="text-xs font-bold text-green-600 hover:underline">Simpan</button>
                              <button onClick={() => setEditingNominal(null)} className="text-xs font-bold text-gray-500 hover:underline">Batal</button>
                            </>
                          ) : (
                            <>
                              <span className="flex-1 text-sm font-semibold text-[var(--ink)]">{n.value}</span>
                              <span className="text-sm font-bold text-[var(--blue)]">Rp{n.price}</span>
                              {n.strike && <span className="text-xs text-[var(--ink-soft)] line-through">{n.strike}</span>}
                              <button onClick={() => setEditingNominal(n)} className="text-xs text-[var(--blue)] hover:underline">Edit</button>
                              <button onClick={() => deleteNominal(n.id, p.id)} className="text-xs text-red-500 hover:underline">Hapus</button>
                            </>
                          )}
                        </div>
                      ))
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {products.length === 0 && !error && (
        <div className="bg-white rounded-2xl border border-[var(--line)] p-10 text-center">
          <div className="text-4xl mb-3">🎮</div>
          <p className="text-sm text-[var(--ink-soft)]">Belum ada produk. Klik &quot;Tambah Produk&quot; untuk mulai.</p>
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="px-5 py-4 border-b border-[var(--line)] flex items-center justify-between">
              <h2 className="font-bold text-[var(--ink)]">{editing ? "Edit Produk" : "Tambah Produk"}</h2>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-lg hover:bg-[var(--bg)] grid place-items-center text-[var(--ink-soft)]">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="p-5 space-y-3">
              {[
                { label: "Slug", key: "slug", placeholder: "mobile-legends" },
                { label: "Judul", key: "title", placeholder: "Mobile Legends: Bang Bang" },
                { label: "Publisher", key: "publisher", placeholder: "Moonton" },
                { label: "Gambar URL", key: "img", placeholder: "/images/mobile-legend.png" },
                { label: "Background", key: "img_bg", placeholder: "#EEF3FF" },
                { label: "Label Akun", key: "account_label", placeholder: "User ID" },
                { label: "Placeholder Akun", key: "account_placeholder", placeholder: "Contoh: 123456789" },
                { label: "Hint Akun", key: "account_hint", placeholder: "Buka game > tap avatar..." },
                { label: "Judul Nominal", key: "nominal_title", placeholder: "Pilih Nominal Diamond" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block text-xs font-semibold text-[var(--ink-soft)] mb-1">{f.label}</label>
                  <input
                    value={String((form as unknown as Record<string, string>)[f.key] ?? "")}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    placeholder={f.placeholder}
                    className="w-full h-10 px-3 rounded-xl border border-[var(--line)] bg-white text-sm outline-none focus:border-[var(--blue)]"
                  />
                </div>
              ))}

              {/* Account Mode */}
              <div>
                <label className="block text-xs font-semibold text-[var(--ink-soft)] mb-1">Mode Akun</label>
                <select
                  value={form.account_mode}
                  onChange={(e) => setForm({ ...form, account_mode: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-[var(--line)] bg-white text-sm outline-none focus:border-[var(--blue)]"
                >
                  <option value="single">Single (1 input)</option>
                  <option value="userzone">User + Zone (2 input)</option>
                  <option value="select">Select/Dropdown</option>
                </select>
              </div>

              {form.account_mode === "userzone" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--ink-soft)] mb-1">Label Zone</label>
                    <input value={form.zone_label} onChange={(e) => setForm({ ...form, zone_label: e.target.value })} placeholder="Zone ID" className="w-full h-10 px-3 rounded-xl border border-[var(--line)] bg-white text-sm outline-none focus:border-[var(--blue)]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[var(--ink-soft)] mb-1">Placeholder Zone</label>
                    <input value={form.zone_placeholder} onChange={(e) => setForm({ ...form, zone_placeholder: e.target.value })} placeholder="Contoh: 2143" className="w-full h-10 px-3 rounded-xl border border-[var(--line)] bg-white text-sm outline-none focus:border-[var(--blue)]" />
                  </div>
                </div>
              )}

              {/* Sort Order */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[var(--ink-soft)] mb-1">Urutan</label>
                  <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })} className="w-full h-10 px-3 rounded-xl border border-[var(--line)] bg-white text-sm outline-none focus:border-[var(--blue)]" />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 rounded border-gray-300" />
                    <span className="text-sm font-semibold text-[var(--ink)]">Aktif</span>
                  </label>
                </div>
              </div>

              {/* Save Button */}
              <button
                onClick={saveProduct}
                disabled={saving || !form.slug || !form.title}
                className="w-full h-11 rounded-xl bg-[var(--orange)] text-white font-bold text-sm hover:bg-[#F06C09] disabled:opacity-40 transition-colors shadow-md"
              >
                {saving ? "Menyimpan..." : editing ? "Simpan Perubahan" : "Tambah Produk"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
