'use client';

import { useState } from 'react';
import { Sparkles, Brain, Clock, CheckCircle2, ChevronRight, Activity, Send } from 'lucide-react';
import { AiMission } from '@/types/piasmart';
import { createClient } from '@/lib/supabase/client';

export default function ParentMissionPage() {
  const [jawabanOrtu, setJawabanOrtu] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [mission, setMission] = useState<AiMission | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hardcoded untuk keperluan demo jika belum ada autentikasi
  const DUMMY_MURID_ID = '00000000-0000-0000-0000-000000000000';

  const handleGenerateMission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jawabanOrtu.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-mission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          murid_id: DUMMY_MURID_ID,
          jawaban_ortu: jawabanOrtu,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Terjadi kesalahan saat mendapatkan misi.');
      }

      setMission(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCompleteMission = async () => {
    if (!mission) return;
    setIsCompleting(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: updateError } = await supabase
        .from('ai_missions')
        .update({ is_completed: true })
        .eq('id', mission.id);

      // Jika gagal karena RLS (belum login), kita tetap simulasikan sukses untuk demo UI
      if (updateError) {
        console.warn('Gagal update database (mungkin karena RLS/belum login):', updateError.message);
      }
      
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat menyelesaikan misi.');
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-rose-100">
      {/* Mobile Container */}
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl overflow-hidden relative">
        
        {/* Header Background Gradient */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-br from-rose-100 via-purple-100 to-blue-50 rounded-b-[40px] opacity-80" />

        <div className="relative px-6 pt-12 pb-24 z-10 space-y-8">
          
          {/* Sapaan Header */}
          <header className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600 mb-1 tracking-wide uppercase">PiaSmart Grow 🌱</p>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Halo, Bunda!</h1>
            </div>
            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center border border-purple-50">
              <span className="text-xl">👩‍👧</span>
            </div>
          </header>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm border border-red-100 flex items-start">
              <Activity className="w-5 h-5 mr-3 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {!mission ? (
            /* Form Input State */
            <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/60 transform transition-all">
              <h2 className="text-lg font-semibold text-slate-800 mb-2">Bagaimana kabar si Kecil hari ini?</h2>
              <p className="text-sm text-slate-500 mb-5 leading-relaxed">Ceritakan sedikit aktivitas atau perasaannya hari ini agar AI dapat meracik misi yang tepat.</p>
              
              <form onSubmit={handleGenerateMission}>
                <textarea
                  className="w-full bg-slate-50 border-0 rounded-2xl p-4 text-sm text-slate-700 focus:ring-2 focus:ring-purple-400 focus:bg-white transition-colors resize-none placeholder:text-slate-400"
                  rows={4}
                  placeholder="Contoh: Hari ini dia sangat aktif bermain balok tapi sulit diajak makan..."
                  value={jawabanOrtu}
                  onChange={(e) => setJawabanOrtu(e.target.value)}
                  disabled={isGenerating}
                />
                
                <button
                  type="submit"
                  disabled={isGenerating || !jawabanOrtu.trim()}
                  className="mt-4 w-full bg-slate-900 hover:bg-slate-800 text-white rounded-2xl py-4 font-semibold text-sm transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg shadow-slate-900/20 active:scale-[0.98]"
                >
                  {isGenerating ? (
                    <span className="flex items-center">
                      <Sparkles className="w-4 h-4 mr-2 animate-spin text-purple-300" />
                      Menganalisis...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Dapatkan Misi Hari Ini
                      <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Mission Result State */
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Insight Card */}
              <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-3xl p-6 shadow-sm border border-rose-100/50">
                <div className="flex items-center mb-4">
                  <div className="bg-white p-2 rounded-xl shadow-sm mr-3">
                    <Brain className="w-5 h-5 text-rose-500" />
                  </div>
                  <h2 className="font-semibold text-rose-900">Insight Psikologi</h2>
                </div>
                <p className="text-rose-800/80 text-sm leading-relaxed">
                  {mission.insight_psikologi}
                </p>
              </div>

              {/* Mission Card */}
              <div className="bg-white rounded-3xl p-1 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100">
                <div className="p-5 border-b border-slate-50">
                  <div className="inline-flex items-center bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                    <Sparkles className="w-3 h-3 mr-1" /> Misi Baru
                  </div>
                  <h2 className="text-xl font-bold text-slate-800 mb-2 leading-tight">
                    {mission.judul_misi}
                  </h2>
                  <div className="flex items-center text-slate-500 text-sm">
                    <Clock className="w-4 h-4 mr-1.5 text-slate-400" />
                    <span>Hanya {mission.durasi_menit} menit</span>
                  </div>
                </div>
                <div className="p-5 bg-slate-50/50 rounded-b-3xl">
                  <h3 className="text-sm font-medium text-slate-700 mb-2">Instruksi:</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {mission.detail_misi}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              {!success ? (
                <button
                  onClick={handleCompleteMission}
                  disabled={isCompleting}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-2xl py-4 font-semibold text-sm transition-all flex items-center justify-center shadow-lg shadow-purple-500/30 active:scale-[0.98]"
                >
                  {isCompleting ? (
                    <span className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Menyelesaikan...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Selesaikan Misi!
                      <ChevronRight className="w-5 h-5 ml-1" />
                    </span>
                  )}
                </button>
              ) : (
                /* Success State */
                <div className="bg-green-50 rounded-2xl p-6 border border-green-100 text-center animate-in zoom-in duration-300">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-green-800 mb-1">Hebat Sekali!</h3>
                  <p className="text-xs text-green-700/80">
                    Bunda telah menyelesaikan misi hari ini. Perkembangan si Kecil pasti akan semakin baik!
                  </p>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
