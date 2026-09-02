import SettingsClient from "./SettingsClient";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  let settings: Record<string, unknown> = {};
  let error = null;

  try {
    const res = await fetch(`${process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : "http://localhost:3000"}/api/settings`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Gagal memuat settings");
    settings = await res.json();
  } catch (e: unknown) {
    // Fallback: try direct Supabase call
    try {
      const { supabaseAdmin } = await import("@/lib/supabase-admin");
      const { data, error: dbErr } = await supabaseAdmin.from("settings").select("*");
      if (dbErr) throw dbErr;
      (data ?? []).forEach((row: { key: string; value: unknown }) => {
        settings[row.key] = row.value;
      });
    } catch (e2: unknown) {
      error = e2 instanceof Error ? e2.message : "Gagal memuat pengaturan.";
    }
  }

  return <SettingsClient settings={settings} error={error} />;
}
