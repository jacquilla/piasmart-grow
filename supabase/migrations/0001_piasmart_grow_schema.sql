-- Migration: 0001_piasmart_grow_schema.sql

-- 1. Table: jurnal_harian
CREATE TABLE IF NOT EXISTS public.jurnal_harian (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    murid_id UUID NOT NULL,
    tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
    catatan_observasi TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT jurnal_harian_pkey PRIMARY KEY (id),
    CONSTRAINT jurnal_harian_murid_id_fkey FOREIGN KEY (murid_id) REFERENCES public.murid(id) ON DELETE CASCADE
);

-- 2. Table: parent_interactions
CREATE TABLE IF NOT EXISTS public.parent_interactions (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    murid_id UUID NOT NULL,
    tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
    pertanyaan_ai TEXT NOT NULL,
    jawaban_ortu TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT parent_interactions_pkey PRIMARY KEY (id),
    CONSTRAINT parent_interactions_murid_id_fkey FOREIGN KEY (murid_id) REFERENCES public.murid(id) ON DELETE CASCADE
);

-- 3. Table: ai_missions
CREATE TABLE IF NOT EXISTS public.ai_missions (
    id UUID NOT NULL DEFAULT gen_random_uuid(),
    murid_id UUID NOT NULL,
    tanggal DATE NOT NULL DEFAULT CURRENT_DATE,
    insight_psikologi TEXT,
    judul_misi TEXT NOT NULL,
    detail_misi TEXT NOT NULL,
    durasi_menit INTEGER NOT NULL DEFAULT 10,
    is_completed BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT ai_missions_pkey PRIMARY KEY (id),
    CONSTRAINT ai_missions_murid_id_fkey FOREIGN KEY (murid_id) REFERENCES public.murid(id) ON DELETE CASCADE
);

-- ENABLE RLS
ALTER TABLE public.jurnal_harian ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parent_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_missions ENABLE ROW LEVEL SECURITY;

-- CREATE POLICIES
-- Kebijakan dasar: Izinkan akses (SELECT/INSERT/UPDATE) jika murid_id di tabel sama dengan klaim 'murid_id' di token JWT.

-- Policy for jurnal_harian
CREATE POLICY "jurnal_harian_select_policy" ON public.jurnal_harian
    FOR SELECT USING ( murid_id = (auth.jwt() ->> 'murid_id')::uuid );

CREATE POLICY "jurnal_harian_insert_policy" ON public.jurnal_harian
    FOR INSERT WITH CHECK ( murid_id = (auth.jwt() ->> 'murid_id')::uuid );

CREATE POLICY "jurnal_harian_update_policy" ON public.jurnal_harian
    FOR UPDATE USING ( murid_id = (auth.jwt() ->> 'murid_id')::uuid );

-- Policy for parent_interactions
CREATE POLICY "parent_interactions_select_policy" ON public.parent_interactions
    FOR SELECT USING ( murid_id = (auth.jwt() ->> 'murid_id')::uuid );

CREATE POLICY "parent_interactions_insert_policy" ON public.parent_interactions
    FOR INSERT WITH CHECK ( murid_id = (auth.jwt() ->> 'murid_id')::uuid );

CREATE POLICY "parent_interactions_update_policy" ON public.parent_interactions
    FOR UPDATE USING ( murid_id = (auth.jwt() ->> 'murid_id')::uuid );

-- Policy for ai_missions
CREATE POLICY "ai_missions_select_policy" ON public.ai_missions
    FOR SELECT USING ( murid_id = (auth.jwt() ->> 'murid_id')::uuid );

CREATE POLICY "ai_missions_insert_policy" ON public.ai_missions
    FOR INSERT WITH CHECK ( murid_id = (auth.jwt() ->> 'murid_id')::uuid );

CREATE POLICY "ai_missions_update_policy" ON public.ai_missions
    FOR UPDATE USING ( murid_id = (auth.jwt() ->> 'murid_id')::uuid );
