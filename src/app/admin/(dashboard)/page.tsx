import Link from "next/link";

export const dynamic = "force-dynamic";

async function getData() {
  try {
    const { supabaseAdmin } = await import("@/lib/supabase-admin");
    const [ordersRes, productsRes] = await Promise.all([
      supabaseAdmin.from("orders").select("id, status, price", { count: "exact" }),
      supabaseAdmin.from("products").select("id", { count: "exact" }),
    ]);

    const orders = ordersRes.data ?? [];
    const totalOrders = ordersRes.count ?? 0;
    const totalProducts = productsRes.count ?? 0;
    const pending = orders.filter((o) => o.status === "pending").length;
    const completed = orders.filter((o) => o.status === "completed").length;
    const failed = orders.filter((o) => o.status === "failed").length;
    const revenue = orders
      .filter((o) => o.status === "completed")
      .reduce((sum, o) => {
        const num = parseInt((o.price ?? "0").replace(/\./g, ""));
        return sum + (isNaN(num) ? 0 : num);
      }, 0);

    const { data: recentOrders } = await supabaseAdmin
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    return { totalOrders, totalProducts, pending, completed, failed, revenue, recentOrders: recentOrders ?? [], error: null };
  } catch (e: unknown) {
    return { totalOrders: 0, totalProducts: 0, pending: 0, completed: 0, failed: 0, revenue: 0, recentOrders: [], error: e instanceof Error ? e.message : "Gagal memuat data." };
  }
}

function formatRp(num: number) {
  return "Rp" + num.toLocaleString("id-ID");
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    processing: "bg-blue-50 text-blue-700 border-blue-200",
    completed: "bg-green-50 text-green-700 border-green-200",
    failed: "bg-red-50 text-red-700 border-red-200",
    cancelled: "bg-gray-50 text-gray-500 border-gray-200",
    refunded: "bg-purple-50 text-purple-700 border-purple-200",
  };
  const labels: Record<string, string> = {
    pending: "Menunggu",
    processing: "Diproses",
    completed: "Selesai",
    failed: "Gagal",
    cancelled: "Dibatalkan",
    refunded: "Refund",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${styles[status] ?? styles.pending}`}>
      {labels[status] ?? status}
    </span>
  );
}

export default async function AdminDashboard() {
  const stats = await getData();

  if (stats.error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold font-display text-[var(--ink)]">Dashboard</h1>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-4 text-sm text-red-600">
          {stats.error}
        </div>
      </div>
    );
  }

  const statCards = [
    { label: "Total Pesanan", value: stats.totalOrders, icon: "📦" },
    { label: "Menunggu", value: stats.pending, icon: "⏳" },
    { label: "Selesai", value: stats.completed, icon: "✅" },
    { label: "Gagal", value: stats.failed, icon: "❌" },
    { label: "Total Produk", value: stats.totalProducts, icon: "🎮" },
    { label: "Pendapatan", value: formatRp(stats.revenue), icon: "💰" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold font-display text-[var(--ink)]">Dashboard</h1>
        <p className="text-sm text-[var(--ink-soft)] mt-1">Ringkasan data VEXBITS hari ini.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {statCards.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-[var(--line)] p-4 md:p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{s.icon}</span>
            </div>
            <p className="text-xs text-[var(--ink-soft)] font-medium">{s.label}</p>
            <p className="text-xl md:text-2xl font-extrabold font-display text-[var(--ink)] mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[var(--line)] overflow-hidden">
        <div className="px-5 py-4 border-b border-[var(--line)] flex items-center justify-between">
          <h2 className="font-bold text-[var(--ink)]">Pesanan Terbaru</h2>
          <Link href="/admin/orders" className="text-sm font-semibold text-[var(--blue)] hover:underline">Lihat Semua →</Link>
        </div>
        {stats.recentOrders.length === 0 ? (
          <div className="p-10 text-center text-sm text-[var(--ink-soft)]">
            <div className="text-4xl mb-3">📭</div>
            Belum ada pesanan.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--bg)]">
                  <th className="text-left px-4 py-3 font-semibold text-[var(--ink-soft)]">Invoice</th>
                  <th className="text-left px-4 py-3 font-semibold text-[var(--ink-soft)]">Game</th>
                  <th className="text-left px-4 py-3 font-semibold text-[var(--ink-soft)]">Item</th>
                  <th className="text-left px-4 py-3 font-semibold text-[var(--ink-soft)]">Harga</th>
                  <th className="text-left px-4 py-3 font-semibold text-[var(--ink-soft)]">Status</th>
                  <th className="text-left px-4 py-3 font-semibold text-[var(--ink-soft)]">Waktu</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order: { id: string; invoice: string; game_title: string; item: string; price: string; status: string; created_at: string }) => (
                  <tr key={order.id} className="border-t border-[var(--line)] hover:bg-[var(--bg)] transition-colors">
                    <td className="px-4 py-3 font-mono font-semibold text-[var(--ink)]">{order.invoice}</td>
                    <td className="px-4 py-3 text-[var(--ink)]">{order.game_title}</td>
                    <td className="px-4 py-3 text-[var(--ink)]">{order.item}</td>
                    <td className="px-4 py-3 font-semibold text-[var(--blue)]">Rp{order.price}</td>
                    <td className="px-4 py-3"><StatusBadge status={order.status} /></td>
                    <td className="px-4 py-3 text-[var(--ink-soft)] text-xs">
                      {new Date(order.created_at).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
