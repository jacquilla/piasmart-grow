import { ArrowLeft, SendHorizontal, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Mascot } from '@/components/ui/Mascot'

export default function ChatPage() {
  return (
    <div className="flex flex-col h-screen max-h-screen bg-sky-50 pb-24 font-sans animate-pop relative">
      {/* Header */}
      <header className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-md sticky top-0 z-20 border-b border-sky-100 shadow-sm">
        <Link href="/dashboard" className="p-2 bg-white rounded-full text-sky-800 hover:bg-sky-100 transition-colors shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full border-2 border-yellow-300 flex items-center justify-center shadow-sm overflow-hidden relative">
            <Mascot emote="happy" size={48} className="absolute mt-1" />
          </div>
          <div>
            <h1 className="font-black text-sky-900 text-lg leading-tight">Halopia</h1>
            <p className="text-xs font-bold text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Online
            </p>
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* Intro */}
        <div className="flex justify-center my-4">
          <div className="bg-sky-200/50 text-sky-800 text-xs font-bold px-4 py-2 rounded-full shadow-inner">
            Hari ini
          </div>
        </div>

        {/* User Message */}
        <div className="flex gap-3 justify-end items-end">
          <div className="bg-gradient-to-r from-sky-400 to-sky-500 text-white px-5 py-3 rounded-3xl rounded-br-sm shadow-md max-w-[85%]">
            <p className="font-medium text-[15px] leading-snug">Halopia, kasih ide main tebak-tebakan huruf dong buat Pia!</p>
          </div>
        </div>

        {/* AI Message */}
        <div className="flex gap-3 items-end">
          <div className="w-10 h-10 rounded-full bg-white border-2 border-pink-200 overflow-hidden flex items-center justify-center shrink-0 shadow-sm relative mb-2">
            <Mascot emote="idea" size={48} className="absolute mt-2" />
          </div>
          <div className="bg-white border-2 border-pink-100 px-5 py-4 rounded-3xl rounded-bl-sm shadow-md max-w-[85%] relative">
            <div className="absolute -top-3 -right-2 bg-yellow-300 p-1.5 rounded-full animate-wiggle shadow-sm">
              <Sparkles className="w-4 h-4 text-orange-500 fill-current" />
            </div>
            <p className="text-slate-700 font-medium text-[15px] leading-snug mb-3">
              Ide bagus, Bunda! Coba main <strong>"Mancing Huruf"</strong> yuk! 🎣
            </p>
            <ul className="space-y-2 text-slate-600 text-[14px]">
              <li className="flex gap-2">
                <span className="text-pink-500 font-black">1.</span> Tulis huruf A-Z di kertas dan potong bentuk ikan.
              </li>
              <li className="flex gap-2">
                <span className="text-pink-500 font-black">2.</span> Taruh penjepit kertas di setiap ikan.
              </li>
              <li className="flex gap-2">
                <span className="text-pink-500 font-black">3.</span> Buat alat pancing dari sumpit & magnet.
              </li>
            </ul>
            <p className="text-slate-700 font-medium text-[15px] mt-3">Pasti Pia suka banget! Mau ide yang lain?</p>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/80 backdrop-blur-lg border-t border-sky-100 sticky bottom-0">
        <div className="relative flex items-center">
          <input 
            type="text" 
            placeholder="Tanya sesuatu ke Halopia..." 
            className="w-full bg-sky-50 border-2 border-sky-200 rounded-full py-4 pl-6 pr-14 text-sky-900 font-medium focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100 transition-all placeholder:text-sky-400"
          />
          <button className="absolute right-2 w-10 h-10 bg-sky-500 hover:bg-sky-600 active:scale-90 transition-all rounded-full flex items-center justify-center text-white shadow-md">
            <SendHorizontal className="w-5 h-5 -ml-1" />
          </button>
        </div>
      </div>
    </div>
  )
}
