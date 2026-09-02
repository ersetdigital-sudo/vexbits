"use client";

import { useState } from "react";

export default function SettingsClient({ settings, error: initialError }: { settings: Record<string, unknown>; error?: string | null }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(initialError);
  const [success, setSuccess] = useState(false);

  const [waNumber, setWaNumber] = useState(String(settings.whatsapp_number ?? "081234567890"));
  const [waMessage, setWaMessage] = useState(String(settings.whatsapp_message ?? ""));
  const [storeName, setStoreName] = useState(String(settings.store_name ?? "VEXBITS"));
  const [storeTagline, setStoreTagline] = useState(String(settings.store_tagline ?? ""));
  const [paymentMethods, setPaymentMethods] = useState<string[]>(
    Array.isArray(settings.payment_methods) ? settings.payment_methods : ["QRIS", "GoPay", "OVO", "DANA", "ShopeePay"]
  );
  const [newPayment, setNewPayment] = useState("");
  const [qrisUrl, setQrisUrl] = useState(String(settings.qris_url ?? ""));
  const [uploading, setUploading] = useState(false);

  async function saveSettings() {
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          whatsapp_number: waNumber,
          whatsapp_message: waMessage,
          store_name: storeName,
          store_tagline: storeTagline,
          payment_methods: paymentMethods,
          qris_url: qrisUrl,
        }),
      });
      if (!res.ok) throw new Error("Gagal menyimpan");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  }

  function addPayment() {
    if (!newPayment.trim()) return;
    if (paymentMethods.includes(newPayment.trim())) return;
    setPaymentMethods([...paymentMethods, newPayment.trim()]);
    setNewPayment("");
  }

  function removePayment(method: string) {
    setPaymentMethods(paymentMethods.filter((m) => m !== method));
  }

  async function handleQrisUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload gagal");
      setQrisUrl(data.url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upload gagal");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold font-display text-[var(--ink)]">Pengaturan</h1>
        <p className="text-sm text-[var(--ink-soft)] mt-0.5">Kelola informasi toko dan metode pembayaran.</p>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>
          {error}
          <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600">×</button>
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7"/></svg>
          Pengaturan berhasil disimpan!
        </div>
      )}

      {/* Store Info */}
      <div className="bg-white rounded-2xl border border-[var(--line)] overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--line)]">
          <h2 className="font-bold text-[var(--ink)] flex items-center gap-2">
            <svg className="w-5 h-5 text-[var(--ink-soft)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
            Informasi Toko
          </h2>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--ink-soft)] mb-1">Nama Toko</label>
            <input value={storeName} onChange={(e) => setStoreName(e.target.value)} className="w-full h-10 px-3 rounded-xl border border-[var(--line)] bg-white text-sm outline-none focus:border-[var(--blue)]" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--ink-soft)] mb-1">Tagline</label>
            <input value={storeTagline} onChange={(e) => setStoreTagline(e.target.value)} className="w-full h-10 px-3 rounded-xl border border-[var(--line)] bg-white text-sm outline-none focus:border-[var(--blue)]" />
          </div>
        </div>
      </div>

      {/* WhatsApp */}
      <div className="bg-white rounded-2xl border border-[var(--line)] overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--line)]">
          <h2 className="font-bold text-[var(--ink)] flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </h2>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--ink-soft)] mb-1">Nomor WhatsApp CS</label>
            <input value={waNumber} onChange={(e) => setWaNumber(e.target.value)} placeholder="081234567890" className="w-full h-10 px-3 rounded-xl border border-[var(--line)] bg-white text-sm outline-none focus:border-[var(--blue)] font-mono" />
            <p className="text-[11px] text-[var(--ink-soft)] mt-1">Format: 08xxxxxxxxxx (tanpa spasi atau simbol)</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--ink-soft)] mb-1">Pesan Default (opsional)</label>
            <textarea value={waMessage} onChange={(e) => setWaMessage(e.target.value)} rows={3} className="w-full px-3 py-2.5 rounded-xl border border-[var(--line)] bg-white text-sm outline-none focus:border-[var(--blue)] resize-none" />
          </div>
          {waNumber && (
            <a href={`https://wa.me/${waNumber.replace(/^0/, "62")}?text=${encodeURIComponent(waMessage)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500 text-white text-sm font-bold hover:bg-green-600 transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Test Chat WhatsApp
            </a>
          )}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white rounded-2xl border border-[var(--line)] overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--line)]">
          <h2 className="font-bold text-[var(--ink)] flex items-center gap-2">
            <svg className="w-5 h-5 text-[var(--ink-soft)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><path d="M1 10h22"/></svg>
            Metode Pembayaran
          </h2>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex flex-wrap gap-2">
            {paymentMethods.map((m) => (
              <span key={m} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--blue-soft)] text-[var(--blue)] text-xs font-semibold border border-[#C7D6FF]">
                {m}
                <button onClick={() => removePayment(m)} className="w-4 h-4 rounded-full bg-[var(--blue)] text-white grid place-items-center text-[10px] hover:bg-blue-700 transition-colors">×</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newPayment} onChange={(e) => setNewPayment(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addPayment()} placeholder="Tambah metode baru..." className="flex-1 h-10 px-3 rounded-xl border border-[var(--line)] bg-white text-sm outline-none focus:border-[var(--blue)]" />
            <button onClick={addPayment} disabled={!newPayment.trim()} className="h-10 px-4 rounded-xl bg-[var(--blue)] text-white text-sm font-bold hover:bg-blue-700 disabled:opacity-40 transition-colors">+ Tambah</button>
          </div>
        </div>
      </div>

      {/* QRIS Photo */}
      <div className="bg-white rounded-2xl border border-[var(--line)] overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--line)]">
          <h2 className="font-bold text-[var(--ink)] flex items-center gap-2">
            <svg className="w-5 h-5 text-[var(--ink-soft)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
            Foto QRIS
          </h2>
        </div>
        <div className="p-5 space-y-4">
          <p className="text-xs text-[var(--ink-soft)]">Foto QRIS akan ditampilkan di halaman terima kasih saat user memilih metode QRIS.</p>
          {qrisUrl && (
            <div className="relative w-48 h-48 rounded-xl border border-[var(--line)] overflow-hidden bg-[var(--bg)]">
              <img src={qrisUrl} alt="QRIS" className="w-full h-full object-contain p-2" />
              <button onClick={() => setQrisUrl("")} className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs grid place-items-center hover:bg-red-600">×</button>
            </div>
          )}
          <label className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed ${qrisUrl ? "border-green-300 bg-green-50 text-green-700" : "border-[var(--line)] bg-[var(--bg)] text-[var(--ink-soft)]"} text-sm font-semibold cursor-pointer hover:border-[var(--blue)] hover:text-[var(--blue)] transition-colors`}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
            {uploading ? "Uploading..." : qrisUrl ? "Ganti Foto" : "Upload Foto QRIS"}
            <input type="file" accept="image/*" className="hidden" onChange={handleQrisUpload} disabled={uploading} />
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button onClick={saveSettings} disabled={saving} className="px-8 py-3 rounded-xl bg-[var(--orange)] text-white font-bold text-sm hover:bg-[#F06C09] disabled:opacity-40 transition-colors shadow-md">
          {saving ? "Menyimpan..." : "Simpan Pengaturan"}
        </button>
      </div>
    </div>
  );
}
