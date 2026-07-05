'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Phone, ArrowRight, KeyRound, CheckCircle2 } from 'lucide-react';
import { MascotBackground } from '@/components/ui/MascotBackground';

export default function ParentLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [waNumber, setWaNumber] = useState('');
  const [pin, setPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waNumber.trim()) return;

    setIsLoading(true);
    // Simulasi pengiriman PIN via API
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length !== 6) return;

    setIsLoading(true);
    // Simulasi verifikasi PIN
    setTimeout(() => {
      setIsLoading(false);
      // Set session/cookie yang aman di sini untuk produksi
      document.cookie = "parent_auth=true; path=/; max-age=86400";
      router.push('/parent/mission');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-sky-50 text-foreground flex flex-col items-center justify-center p-6 font-sans relative">
      
      {/* Decorative Background */}
      <MascotBackground />
      
      <div className="w-full max-w-sm flex flex-col items-center relative z-10">
        
        {/* Top Logo */}
        <div className="mb-8 w-24 h-24 bg-white/90 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-xl border-4 border-white/60 rotate-3 transition-transform hover:rotate-6 hover:scale-105 duration-300">
          {/* Placeholder for /piasmart.png (Using text/icon fallback just in case image is missing) */}
          <div className="text-3xl font-black text-sky-500">Pia</div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-xl w-full rounded-[2.5rem] shadow-[0_20px_60px_rgba(14,165,233,0.2)] border-2 border-white/50 p-8 overflow-hidden relative">
          
          <div className="text-center mb-6">
            <h1 className="text-2xl font-black text-sky-900 mb-2 font-serif tracking-tight">Selamat Datang!</h1>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              Portal Orang Tua PiaSmart Grow.<br/>Mari pantau tumbuh kembang si Kecil.
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleRequestPin} className="space-y-5 animate-in fade-in zoom-in-95 duration-300">
              <div className="space-y-2">
                <label className="text-sm font-bold text-sky-800 ml-1">Nomor WhatsApp Bunda/Ayah</label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-sky-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <input
                    type="tel"
                    className="w-full bg-white/60 backdrop-blur-sm border-2 border-white/50 rounded-2xl py-3.5 pl-12 pr-4 text-sky-900 font-bold focus:outline-none focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100/50 transition-all placeholder:text-sky-300 shadow-inner"
                    placeholder="Contoh: 08123456789"
                    value={waNumber}
                    onChange={(e) => setWaNumber(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={isLoading || waNumber.length < 9}
                className="w-full bg-sky-500 text-white rounded-2xl py-4 font-bold text-sm tracking-wide shadow-lg shadow-sky-200 hover:bg-sky-600 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Memproses...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Kirim PIN ke WA
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-5 animate-in slide-in-from-right-8 duration-300">
               <div className="flex justify-center mb-4 text-green-500">
                  <div className="bg-green-50 px-4 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold border border-green-200">
                    <CheckCircle2 className="w-4 h-4" /> PIN Terkirim ke WA
                  </div>
               </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-sky-800 ml-1">Masukkan 6-Digit PIN</label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-sky-400">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    className="w-full bg-white/60 backdrop-blur-sm border-2 border-white/50 rounded-2xl py-3.5 pl-12 pr-4 text-sky-900 font-bold text-center tracking-[0.5em] focus:outline-none focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100/50 transition-all placeholder:text-sky-300 placeholder:tracking-normal shadow-inner"
                    placeholder="••••••"
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={isLoading || pin.length !== 6}
                className="w-full bg-green-500 text-white rounded-2xl py-4 font-bold text-sm tracking-wide shadow-lg shadow-green-200 hover:bg-green-600 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Memverifikasi...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Masuk ke Portal
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </button>
              
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="w-full text-center text-xs font-bold text-slate-400 hover:text-sky-500 transition-colors py-2"
              >
                Ubah Nomor WhatsApp
              </button>
            </form>
          )}
        </div>

        {/* Footer / Powered By */}
        <div className="mt-12 flex flex-col items-center opacity-60">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Powered By</p>
          <div className="flex items-center gap-2">
            {/* Fallback for logo-digi.png */}
            <div className="w-8 h-8 bg-slate-300 rounded-lg flex items-center justify-center text-white font-black text-xs">DG</div>
            <span className="font-black text-slate-700 tracking-tight">Digi<span className="text-sky-500">Tech</span></span>
          </div>
        </div>

      </div>
    </div>
  );
}
