import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createClient } from '@/lib/supabase/server';
import { GenerateMissionRequest, GenerateMissionResponse } from '@/types/piasmart';

export async function POST(request: Request) {
  try {
    const body = await request.json() as Partial<GenerateMissionRequest>;
    const { murid_id, jawaban_ortu } = body;

    if (!murid_id || !jawaban_ortu) {
      return NextResponse.json(
        { error: 'murid_id dan jawaban_ortu wajib diisi' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not set');
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

    const supabase = await createClient();

    // Fetch catatan guru terbaru dari jurnal_harian
    const { data: jurnal } = await supabase
      .from('jurnal_harian')
      .select('catatan_observasi')
      .eq('murid_id', murid_id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    const catatanGuru = jurnal?.catatan_observasi || 'Tidak ada catatan khusus hari ini.';

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Anda adalah Psikolog Anak Montessori. Berdasarkan catatan guru dan jawaban orang tua, berikan 1 paragraf insight psikologi hangat, dan 1 misi main (max 10 menit) tanpa alat mahal. Return murni JSON: { "insight_psikologi": "", "judul_misi": "", "detail_misi": "", "durasi_menit": angka }.

Catatan Guru: ${catatanGuru}
Jawaban Orang Tua: ${jawaban_ortu}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Parse JSON safely (menghapus block code markdown jika AI mengembalikannya)
    let missionData: GenerateMissionResponse;
    try {
      const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      missionData = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', text, parseError);
      return NextResponse.json({ error: 'Format response AI tidak valid' }, { status: 500 });
    }

    // Save hasil ke database ai_missions
    const { data: savedMission, error: dbError } = await supabase
      .from('ai_missions')
      .insert({
        murid_id,
        insight_psikologi: missionData.insight_psikologi,
        judul_misi: missionData.judul_misi,
        detail_misi: missionData.detail_misi,
        durasi_menit: missionData.durasi_menit,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return NextResponse.json({ error: 'Gagal menyimpan misi ke database' }, { status: 500 });
    }

    return NextResponse.json(savedMission);

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
