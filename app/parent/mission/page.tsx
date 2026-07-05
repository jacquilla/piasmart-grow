'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Brain, CheckCircle2, ChevronRight, Activity, Send, BookOpen } from 'lucide-react';
import { AiMission } from '@/types/piasmart';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import Confetti from 'react-confetti';

export default function ParentMissionPage() {
  const [jawabanOrtu, setJawabanOrtu] = useState('');
  const [catatanGuru, setCatatanGuru] = useState('Pia hari ini sangat suka bermain dengan balok susun, namun sedikit kurang fokus saat sesi mewarnai bersama teman-temannya.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [mission, setMission] = useState<AiMission | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Dummy data untuk dev
  const DUMMY_MURID_ID = '00000000-0000-0000-0000-000000000000';
  const NAMA_ANAK = 'Pia';

  useEffect(() => {
    // Di produksi, kita akan fetch data jurnal_harian hari ini dari Supabase
    // const fetchJurnal = async () => { ... }
    // fetchJurnal();
  }, []);

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
          catatan_guru: catatanGuru,
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

      if (updateError) {
        console.warn('Gagal update database:', updateError.message);
      }
      
      setSuccess(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat menyelesaikan misi.');
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1F1F1F] font-sans selection:bg-indigo-100">
      {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}
      <div className="max-w-xl mx-auto min-h-screen relative bg-[#F8F9FA] pb-32 shadow-2xl">
        
        {/* Premium Header */}
        <header className="px-6 py-8 border-b border-gray-200 sticky top-0 bg-[#F8F9FA]/90 backdrop-blur-md z-10 flex items-center justify-between shadow-sm">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-sky-900">Halo, Bunda!</h1>
            <p className="text-sm font-medium text-slate-500 mt-1">Pantau perkembangan <span className="font-bold text-sky-700">{NAMA_ANAK}</span> hari ini.</p>
          </div>
          <div className="w-12 h-12 border-2 border-sky-200 rounded-full flex items-center justify-center bg-white shadow-md overflow-hidden hover:scale-105 transition-transform cursor-pointer">
            <span className="text-2xl">👩‍👧</span>
          </div>
        </header>

        <div className="p-6 space-y-8">
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm border border-red-100 flex items-start shadow-sm">
              <Activity className="w-5 h-5 mr-3 shrink-0" />
              <p className="font-medium">{error}</p>
            </div>
          )}

          {/* Catatan Guru Card */}
          <div className="bg-white border-l-4 border-yellow-400 rounded-2xl rounded-l-none shadow-sm p-5 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <BookOpen className="w-16 h-16 text-yellow-500" />
            </div>
            <div className="flex items-center gap-2 mb-3 relative z-10">
              <div className="bg-yellow-100 p-1.5 rounded-lg">
                <BookOpen className="w-4 h-4 text-yellow-600" />
              </div>
              <h3 className="font-bold text-sm text-slate-700 uppercase tracking-wide">Catatan Guru Hari Ini</h3>
            </div>
            <p className="text-slate-600 leading-relaxed text-[15px] relative z-10 italic">
              "{catatanGuru}"
            </p>
          </div>

          {!mission ? (
            <div className="animate-in fade-in duration-500 space-y-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky-50 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <h2 className="text-xl font-black tracking-tight text-sky-900 mb-2">Bagaimana keadaan si Kecil di rumah?</h2>
                  <p className="text-slate-500 text-[14px] leading-relaxed mb-5">Ceritakan sedikit observasi Bunda untuk membantu Psikolog AI kami menyusun misi bermain yang tepat.</p>
                  
                  <form onSubmit={handleGenerateMission} className="space-y-5">
                    <textarea
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-[15px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-300 transition-all resize-none placeholder:text-slate-400 shadow-inner"
                      rows={4}
                      placeholder="Contoh: Pulang sekolah dia terlihat lelah dan menolak makan siang, tapi masih semangat main boneka..."
                      value={jawabanOrtu}
                      onChange={(e) => setJawabanOrtu(e.target.value)}
                      disabled={isGenerating}
                    />
                    
                    <button
                      type="submit"
                      disabled={isGenerating || !jawabanOrtu.trim()}
                      className="w-full bg-sky-500 text-white rounded-2xl py-4 px-6 text-sm font-bold tracking-wide flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sky-600 transition-all shadow-[0_8px_20px_rgba(14,165,233,0.25)] active:scale-95"
                    >
                      {isGenerating ? (
                        <span className="flex items-center">
                          <Sparkles className="w-5 h-5 mr-2 animate-spin text-yellow-300" />
                          Memproses AI...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Dapatkan Misi & Analisis
                          <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </span>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
              
              {/* Insight Card - AI Psikolog */}
              <div className="bg-sky-50 border-2 border-sky-100 rounded-3xl p-6 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-200/50 rounded-full blur-2xl group-hover:bg-sky-300/50 transition-colors" />
                <div className="relative z-10">
                  <h2 className="flex items-center text-sky-700 mb-3">
                    <div className="bg-white p-2 rounded-full shadow-sm mr-2 border border-sky-100">
                      <Brain className="w-5 h-5 text-sky-500" />
                    </div>
                    <span className="font-black tracking-wide uppercase text-sm">Analisis Pakar AI</span>
                  </h2>
                  <p className="text-[15px] leading-relaxed text-slate-700 font-medium">
                    {mission.insight_psikologi}
                  </p>
                </div>
              </div>

              {/* Mission Card */}
              <div className="card rounded-[2rem] shadow-xl relative overflow-hidden group border-b-[6px] border-indigo-800 bg-gradient-to-br from-indigo-500 to-purple-600">
                {/* Background Image Setup */}
                <div className="absolute inset-0 bg-white/10 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                
                <div className="card-body relative z-10 p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl text-[11px] font-black uppercase tracking-wider text-white shadow-sm py-2 px-3 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-300" /> Misi Bermain Malam Ini
                    </div>
                    <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl text-[11px] font-bold tracking-wider text-white shadow-sm py-2 px-3">
                      ⏱️ {mission.durasi_menit} Menit
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-3xl font-black tracking-tight leading-tight mb-4 text-white drop-shadow-md">
                      {mission.judul_misi}
                    </h2>
                    <div className="h-1.5 w-16 bg-yellow-400 rounded-full mb-6 shadow-sm" />
                    <p className="text-[16px] text-indigo-50 leading-relaxed font-medium">
                      {mission.detail_misi}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Sticky Action Area */}
              <div className="fixed bottom-0 left-0 right-0 max-w-xl mx-auto p-6 bg-gradient-to-t from-[#F8F9FA] via-[#F8F9FA] to-transparent pt-12 pb-8 z-20">
                {!success ? (
                  <button
                    onClick={handleCompleteMission}
                    disabled={isCompleting}
                    className="w-full bg-green-500 text-white py-5 px-6 rounded-2xl font-black text-lg tracking-wide transition-all flex items-center justify-center group shadow-[0_10px_40px_rgba(34,197,94,0.3)] hover:bg-green-600 hover:scale-[1.02] active:scale-95 border-b-[5px] border-green-700 active:border-b-0 active:translate-y-[5px]"
                  >
                    {isCompleting ? (
                      <span className="flex items-center">
                        <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Menyelesaikan...
                      </span>
                    ) : (
                      <span className="flex items-center drop-shadow-sm">
                        Selesaikan Misi!
                        <ChevronRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </button>
                ) : (
                  <div className="bg-green-50 border-2 border-green-200 p-6 rounded-[2rem] text-center animate-in zoom-in duration-500 shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-green-100">
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                      </div>
                      <h3 className="font-black text-2xl tracking-tight mb-2 text-green-700">Hebat Sekali, Bunda!</h3>
                      <p className="text-sm text-green-600 font-medium px-4">
                        Misi selesai. Pertumbuhan si Kecil terbentuk dari momen-momen bermain sederhana yang konsisten bersama Bunda.
                      </p>
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
