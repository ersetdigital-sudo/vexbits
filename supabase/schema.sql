-- VEXBITS Admin Dashboard Schema
-- Run this in Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)

-- 1. PRODUCTS (games available for top-up)
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  publisher TEXT NOT NULL,
  img TEXT NOT NULL,
  img_bg TEXT DEFAULT '#EEF3FF',
  account_mode TEXT NOT NULL DEFAULT 'single' CHECK (account_mode IN ('userzone', 'single', 'select')),
  account_label TEXT NOT NULL DEFAULT 'Player ID',
  account_placeholder TEXT DEFAULT 'Contoh: 123456789',
  zone_label TEXT,
  zone_placeholder TEXT,
  zone_options TEXT[], -- array for select mode
  account_hint TEXT,
  nominal_title TEXT NOT NULL DEFAULT 'Pilih Nominal',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. PRODUCT NOMINALS (price options per game)
CREATE TABLE IF NOT EXISTS product_nominals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  value TEXT NOT NULL,
  price TEXT NOT NULL,
  strike TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. ORDERS
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice TEXT UNIQUE NOT NULL,
  game_title TEXT NOT NULL,
  product_slug TEXT,
  account_id TEXT NOT NULL,
  zone_id TEXT,
  item TEXT NOT NULL,
  price TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  wa_number TEXT NOT NULL,
  promo_code TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. SETTINGS (key-value store for WhatsApp number, payment config, etc.)
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Insert default settings
INSERT INTO settings (key, value) VALUES
  ('whatsapp_number', '"081234567890"'),
  ('whatsapp_message', '"Halo VEXBITS, saya butuh bantuan terkait pesanan."'),
  ('payment_methods', '["QRIS","GoPay","OVO","DANA","ShopeePay","BCA Virtual Account","BRI Virtual Account","Mandiri VA","Alfamart","Indomaret"]'),
  ('store_name', '"VEXBITS"'),
  ('store_tagline', '"Top Up Game Cepat, Murah & Aman"')
ON CONFLICT (key) DO NOTHING;

-- 5. INDEXES
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_invoice ON orders(invoice);
CREATE INDEX IF NOT EXISTS idx_product_nominals_product ON product_nominals(product_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);

-- 6. UPDATED_AT TRIGGER
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 7. SEED DATA (copy current games.ts data into DB)
INSERT INTO products (slug, title, publisher, img, img_bg, account_mode, account_label, account_placeholder, zone_label, zone_placeholder, zone_options, account_hint, nominal_title, sort_order) VALUES
  ('mobile-legends', 'Mobile Legends: Bang Bang', 'Moonton', '/images/mobile-legend.png', '#EEF3FF', 'userzone', 'User ID', 'Contoh: 123456789', 'Zone ID', 'Contoh: 2143', NULL, 'Buka game > tap avatar di kiri atas. User ID dan Zone ID tertera di bawah nama, contoh: 12345678 (1234).', 'Pilih Nominal Diamond', 1),
  ('free-fire', 'Free Fire', 'Garena', '/images/free-fire.png', '#FFF3E9', 'single', 'Player ID', 'Contoh: 123456789', NULL, NULL, NULL, 'Buka Free Fire > tap foto profil. Player ID berupa 9-11 digit angka di bawah nickname.', 'Pilih Nominal Diamond', 2),
  ('pubg-mobile', 'PUBG Mobile', 'Level Infinite', '/images/pubg-mobile.png', '#EDF1F6', 'single', 'Character ID', 'Contoh: 123456789', NULL, NULL, NULL, 'Buka PUBG Mobile > menu Profil. Character ID adalah deretan angka panjang di bawah nickname.', 'Pilih Nominal UC', 3),
  ('genshin-impact', 'Genshin Impact', 'HoYoverse', '/images/genshin.png', '#EAF4FF', 'select', 'UID', 'Contoh: 123456789', 'Server', NULL, ARRAY['Asia', 'America', 'Europe', 'TW/HK/MO'], 'UID ada di pojok kanan bawah layar dalam game (9 digit). Pastikan server sesuai akunmu.', 'Pilih Nominal Genesis Crystal', 4),
  ('magic-chess', 'Magic Chess: Go Go', 'Moonton', '/images/magic-chess.jpg', '#E9FAF7', 'userzone', 'User ID', 'Contoh: 123456789', 'Zone ID', 'Contoh: 2143', NULL, 'Buka Magic Chess: Go Go > tap profil. Format User ID dan Zone ID sama seperti Mobile Legends.', 'Pilih Nominal Chess Coin', 5),
  ('call-of-duty-mobile', 'Call of Duty Mobile', 'Activision', '/images/call-of-duty.png', '#ECEFF5', 'single', 'Open ID', 'Contoh: 123456789', NULL, NULL, NULL, 'Buka CODM > Profil > Setelan > Akun. Salin Open ID (deretan angka panjang) lalu tempel di sini.', 'Pilih Nominal CP', 6)
ON CONFLICT (slug) DO NOTHING;

-- Mobile Legends nominals
INSERT INTO product_nominals (product_id, value, price, strike, sort_order)
SELECT p.id, n.value, n.price, n.strike, n.sort_order
FROM products p, (VALUES
  ('5 Diamond', '1.500', 'Rp1.700', 1),
  ('12 Diamond', '3.400', NULL, 2),
  ('19 Diamond', '5.300', NULL, 3),
  ('28 Diamond', '7.800', NULL, 4),
  ('44 Diamond', '12.100', NULL, 5),
  ('59 Diamond', '16.200', NULL, 6),
  ('85 Diamond', '23.000', NULL, 7),
  ('170 Diamond', '45.500', 'Rp48.000', 8),
  ('240 Diamond', '64.000', NULL, 9),
  ('296 Diamond', '78.500', NULL, 10),
  ('568 Diamond', '149.000', 'Rp155.000', 11),
  ('Twilight Pass', '149.000', NULL, 12)
) AS n(value, price, strike, sort_order)
WHERE p.slug = 'mobile-legends'
ON CONFLICT DO NOTHING;

-- Free Fire nominals
INSERT INTO product_nominals (product_id, value, price, strike, sort_order)
SELECT p.id, n.value, n.price, n.strike, n.sort_order
FROM products p, (VALUES
  ('5 Diamond', '2.000', NULL, 1),
  ('12 Diamond', '4.200', NULL, 2),
  ('50 Diamond', '7.500', 'Rp8.000', 3),
  ('70 Diamond', '10.000', NULL, 4),
  ('140 Diamond', '19.500', NULL, 5),
  ('355 Diamond', '48.000', NULL, 6),
  ('720 Diamond', '96.000', 'Rp99.000', 7),
  ('1.450 Diamond', '190.000', NULL, 8),
  ('Membership Mingguan', '28.000', NULL, 9),
  ('Membership Bulanan', '89.000', NULL, 10)
) AS n(value, price, strike, sort_order)
WHERE p.slug = 'free-fire'
ON CONFLICT DO NOTHING;

-- PUBG Mobile nominals
INSERT INTO product_nominals (product_id, value, price, strike, sort_order)
SELECT p.id, n.value, n.price, n.strike, n.sort_order
FROM products p, (VALUES
  ('60 UC', '13.000', 'Rp67.000', 1),
  ('120 UC', '26.000', NULL, 2),
  ('180 UC', '39.000', NULL, 3),
  ('325 UC', '64.000', NULL, 4),
  ('660 UC', '128.000', 'Rp335.000', 5),
  ('985 UC', '191.000', NULL, 6),
  ('1.800 UC', '320.000', NULL, 7),
  ('3.850 UC', '640.000', NULL, 8),
  ('Royale Pass', '149.000', NULL, 9),
  ('Royale Pass Elite', '379.000', NULL, 10)
) AS n(value, price, strike, sort_order)
WHERE p.slug = 'pubg-mobile'
ON CONFLICT DO NOTHING;

-- Genshin Impact nominals
INSERT INTO product_nominals (product_id, value, price, strike, sort_order)
SELECT p.id, n.value, n.price, n.strike, n.sort_order
FROM products p, (VALUES
  ('60 Genesis Crystal', '16.000', 'Rp259.000', 1),
  ('300 + 30 Crystal', '79.000', NULL, 2),
  ('980 + 110 Crystal', '249.000', NULL, 3),
  ('1.980 + 260 Crystal', '499.000', NULL, 4),
  ('3.280 + 600 Crystal', '799.000', NULL, 5),
  ('6.480 + 1.600 Crystal', '1.599.000', NULL, 6),
  ('Blessing of the Moon', '79.000', NULL, 7),
  ('Battle Pass Gnostic Hymn', '199.000', NULL, 8)
) AS n(value, price, strike, sort_order)
WHERE p.slug = 'genshin-impact'
ON CONFLICT DO NOTHING;

-- Magic Chess nominals
INSERT INTO product_nominals (product_id, value, price, strike, sort_order)
SELECT p.id, n.value, n.price, n.strike, n.sort_order
FROM products p, (VALUES
  ('10 Chess Coin', '3.000', 'Rp34.000', 1),
  ('30 Chess Coin', '8.500', NULL, 2),
  ('60 Chess Coin', '16.500', NULL, 3),
  ('120 Chess Coin', '32.000', NULL, 4),
  ('300 Chess Coin', '79.000', NULL, 5),
  ('600 Chess Coin', '155.000', NULL, 6),
  ('Season Pass', '89.000', NULL, 7),
  ('Bundle Starter', '49.000', NULL, 8)
) AS n(value, price, strike, sort_order)
WHERE p.slug = 'magic-chess'
ON CONFLICT DO NOTHING;

-- Call of Duty Mobile nominals
INSERT INTO product_nominals (product_id, value, price, strike, sort_order)
SELECT p.id, n.value, n.price, n.strike, n.sort_order
FROM products p, (VALUES
  ('80 CP', '12.000', 'Rp65.000', 1),
  ('160 CP', '24.000', NULL, 2),
  ('420 CP', '62.000', NULL, 3),
  ('880 CP', '125.000', NULL, 4),
  ('2.400 CP', '320.000', NULL, 5),
  ('5.000 CP', '640.000', NULL, 6),
  ('Battle Pass', '89.000', NULL, 7),
  ('BP Plus', '199.000', NULL, 8)
) AS n(value, price, strike, sort_order)
WHERE p.slug = 'call-of-duty-mobile'
ON CONFLICT DO NOTHING;

-- 8. ENABLE ROW LEVEL SECURITY (RLS) — admin uses service key, so policies are permissive
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_nominals ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Allow all operations with service key (admin dashboard uses SUPABASE_SECRET_KEY)
CREATE POLICY "Allow all for service role" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for service role" ON product_nominals FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for service role" ON orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for service role" ON settings FOR ALL USING (true) WITH CHECK (true);
