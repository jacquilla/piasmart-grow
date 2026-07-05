import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { createClient } from '@/lib/supabase/server';
import { GenerateMissionRequest, GenerateMissionResponse } from '@/types/piasmart';

// Simple Rate Limit memory store (in-memory, just for MVP protection)
const rateLimitStore = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const store = rateLimitStore.get(ip);

    if (store && now - store.timestamp < RATE_LIMIT_WINDOW_MS) {
      if (store.count >= MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json({ error: 'Terlalu banyak permintaan. Coba lagi sebentar lagi.' }, { status: 429 });
      }
      store.count++;
    } else {
      rateLimitStore.set(ip, { count: 1, timestamp: now });
    }

    const body = await request.json();
    const { murid_id, catatan_guru, jawaban_ortu } = body as Partial<GenerateMissionRequest> & { catatan_guru?: string };

    // Validasi ketat sesuai requirement
    if (!murid_id || !catatan_guru || !jawaban_ortu) {
      return NextResponse.json(
        { error: 'murid_id, catatan_guru, dan jawaban_ortu wajib diisi' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY is not set');
      return NextResponse.json({ error: 'Internal Server Error (API Key Missing)' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Gunakan Schema untuk memaksakan output
    const missionSchema = {
      type: SchemaType.OBJECT,
      properties: {
        insight_psikologi: {
          type: SchemaType.STRING,
          description: "1 paragraf insight psikologi yang hangat dan menyapa."
        },
        judul_misi: {
          type: SchemaType.STRING,
          description: "Judul misi bermain edukatif yang menarik."
        },
        detail_misi: {
          type: SchemaType.STRING,
          description: "Penjelasan detail mengenai cara bermain misi tersebut."
        },
        durasi_menit: {
          type: SchemaType.INTEGER,
          description: "Durasi waktu dalam hitungan menit."
        }
      },
      required: ["insight_psikologi", "judul_misi", "detail_misi", "durasi_menit"]
    };

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: missionSchema,
      }
    });

    const prompt = `Anda adalah Psikolog Anak Montessori. Berdasarkan catatan guru dan jawaban orang tua hari ini, berikan insight dan misi bermain di rumah tanpa alat mahal.\n\nCatatan Guru Hari Ini: ${catatan_guru}\nJawaban Orang Tua: ${jawaban_ortu}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    let missionData: GenerateMissionResponse;
    try {
      missionData = JSON.parse(text);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', text, parseError);
      return NextResponse.json({ error: 'Format response AI tidak valid' }, { status: 500 });
    }

    // Initialize Supabase Server Client
    const supabase = await createClient();

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
      console.warn('Supabase insert error (kemungkinan karena RLS/belum login), menggunakan fallback:', dbError.message);
      // Fallback response for dev without auth setup
      return NextResponse.json({
        id: crypto.randomUUID(),
        murid_id,
        insight_psikologi: missionData.insight_psikologi,
        judul_misi: missionData.judul_misi,
        detail_misi: missionData.detail_misi,
        durasi_menit: missionData.durasi_menit,
        is_completed: false,
        created_at: new Date().toISOString(),
        _fallback_mode: true // Penanda bahwa data ini tidak tersimpan permanen
      });
    }

    return NextResponse.json(savedMission);

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
