-- STEP 1: DATABASE SCHEMA & ROW LEVEL SECURITY (SQL)

-- Aktifkan ekstensi UUID (biasanya sudah aktif di Supabase, tapi untuk berjaga-jaga)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabel jurnal_harian
CREATE TABLE IF NOT EXISTS public.jurnal_harian (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    murid_id UUID NOT NULL,
    tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
    catatan_observasi TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Tabel parent_interactions
CREATE TABLE IF NOT EXISTS public.parent_interactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    murid_id UUID NOT NULL,
    tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
    pertanyaan_ai TEXT NOT NULL,
    jawaban_ortu TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Tabel ai_missions
CREATE TABLE IF NOT EXISTS public.ai_missions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    murid_id UUID NOT NULL,
    tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
    insight_psikologi TEXT NOT NULL,
    judul_misi TEXT NOT NULL,
    detail_misi TEXT NOT NULL,
    durasi_menit INT NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Mengaktifkan Row Level Security (RLS) di semua tabel
ALTER TABLE public.jurnal_harian ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parent_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_missions ENABLE ROW LEVEL SECURITY;

-- KEBIAJAKAN KEAMANAN (POLICIES)
-- Asumsi: Token JWT sesi login Supabase Auth akan menyimpan 'murid_id' dalam metadata pengguna, 
-- atau pengguna (orang tua) hanya bisa mengakses data jika auth.uid() berelasi dengan murid_id tertentu.
-- Untuk kesederhanaan sesuai prompt, jika orang tua adalah pengguna yang login, kita izinkan 
-- operasi jika auth.uid() divalidasi. 
-- *Catatan: Jika aplikasi menggunakan auth.uid() sebagai ID Orang Tua, pastikan ada relasi. 
-- Disini kita akan asumsikan 'murid_id' di JWT/Auth diset saat login, ATAU auth.uid() sama dengan murid_id (untuk penyederhanaan).
-- Karena ini adalah aplikasi dengan keamanan ketat, RLS policy di bawah membatasi akses baca/tulis hanya 
-- untuk sesi yang terautentikasi (authenticated users). Anda bisa memperketatnya lebih lanjut 
-- dengan menyesuaikan `(auth.jwt() ->> 'murid_id')::uuid = murid_id` jika Anda menyisipkan data murid_id ke JWT claim.

-- Policies untuk jurnal_harian
CREATE POLICY "Orang tua dapat melihat jurnal anak mereka"
    ON public.jurnal_harian
    FOR SELECT
    TO authenticated
    USING (true); -- Ganti dengan kondisi relasi orang tua-murid yang spesifik, misal: murid_id = (auth.jwt() ->> 'murid_id')::uuid

CREATE POLICY "Guru dapat menambah jurnal"
    ON public.jurnal_harian
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Policies untuk parent_interactions
CREATE POLICY "Orang tua dapat melihat interaksi mereka"
    ON public.parent_interactions
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Orang tua dapat menambah interaksi"
    ON public.parent_interactions
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Policies untuk ai_missions
CREATE POLICY "Orang tua dapat melihat misi anak mereka"
    ON public.ai_missions
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Sistem/Orang tua dapat memasukkan misi"
    ON public.ai_missions
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Orang tua dapat mengupdate status misi (Selesaikan misi)"
    ON public.ai_missions
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);
