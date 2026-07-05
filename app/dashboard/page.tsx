import { ArrowRight, Star, Heart, MessageCircleHeart, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Mascot } from '@/components/ui/Mascot'

export default function DashboardHome() {
  return (
    <div className="p-6 space-y-8 animate-pop font-sans pb-32">
      
      {/* Welcome Section with Halopia */}
      <header className="flex justify-between items-end mt-4">
        <div className="flex-1">
          <p className="text-sky-800 font-bold mb-1 flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-500 fill-current animate-wiggle" /> Hai, Bunda!
          </p>
          <h1 className="text-4xl font-black text-sky-900 drop-shadow-sm mb-2">Pia 👧</h1>
        </div>
        
        {/* Halopia Avatar */}
        <div className="relative group cursor-pointer z-20">
          <div className="absolute inset-0 bg-yellow-300 rounded-full blur-xl opacity-40 group-hover:opacity-80 transition-opacity animate-pulse" />
          <div className="relative group-hover:scale-110 transition-transform drop-shadow-xl">
             <Mascot emote="happy" size={72} />
          </div>
          {/* Tooltip Chat */}
          <div className="absolute -top-10 -left-6 bg-white px-3 py-1.5 rounded-2xl rounded-br-sm shadow-md border-2 border-sky-100 text-xs font-bold text-sky-700 w-[120px] text-center opacity-0 group-hover:opacity-100 transition-all group-hover:-translate-y-1 pointer-events-none">
            Tanya Halopia!
          </div>
        </div>
      </header>

      {/* AI Assistant Banner / Button */}
      <Link href="/dashboard/chat" className="block relative bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] p-6 text-white border-b-[8px] border-indigo-800 shadow-xl overflow-hidden group active:border-b-0 active:translate-y-[8px] transition-all">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-white/20 transition-colors" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="group-hover:scale-110 transition-transform">
            <Mascot emote="idea" size={72} className="drop-shadow-lg" />
          </div>
          <div>
            <h2 className="text-2xl font-black drop-shadow-sm leading-tight mb-1">Butuh Ide Belajar?</h2>
            <p className="text-indigo-100 font-medium text-sm">Ngobrol dengan Halopia sekarang!</p>
          </div>
        </div>
      </Link>

      {/* Quick Summary Card - Gamified Pop Style */}
      <section className="bg-green-500 rounded-[2rem] p-6 text-white border-b-[8px] border-green-700 shadow-xl relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="group-hover:animate-wiggle relative overflow-hidden" style={{ width: '42px', height: '56px' }}>
              <Mascot emote="proud" size={56} className="drop-shadow-md absolute left-0" />
            </div>
            <h2 className="text-2xl font-black drop-shadow-sm ml-1">Hebat!</h2>
          </div>
          <p className="text-green-50 text-lg mb-6 font-bold leading-tight">Pia belajar bentuk dan warna dengan sangat antusias hari ini.</p>
          
          <Link href="/dashboard/laporan" className="inline-flex items-center justify-center w-full gap-2 bg-white text-green-700 hover:bg-green-50 px-5 py-4 rounded-2xl text-lg font-black border-b-[5px] border-green-200 active:border-b-0 active:translate-y-[5px] transition-all">
            Lihat Laporan Lengkap
            <ArrowRight className="w-6 h-6" strokeWidth={3} />
          </Link>
        </div>
      </section>

      {/* Recommended E-Learning */}
      <section>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-black text-sky-900">Misi Belajar 🚀</h2>
          <Link href="/dashboard/belajar" className="text-orange-600 font-bold hover:bg-orange-200 transition-colors bg-orange-100 px-4 py-1.5 rounded-full border-2 border-orange-200">Lihat Semua</Link>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <LearningCard 
            title="Hewan Laut"
            type="Video Seru"
            color="bg-sky-400 border-sky-600"
            textColor="text-white"
            emote="starry"
          />
          <LearningCard 
            title="Mewarnai"
            type="Kreativitas"
            color="bg-pink-400 border-pink-600"
            textColor="text-white"
            emote="love"
          />
        </div>
      </section>
    </div>
  )
}

function LearningCard({ title, type, color, textColor, emote }: { title: string, type: string, color: string, textColor: string, emote?: "happy" | "starry" | "idea" | "love" | "wink" | "laugh" | "blush" | "proud" }) {
  return (
    <div className={`p-5 rounded-3xl ${color} border-b-[6px] active:border-b-0 active:translate-y-[6px] transition-all cursor-pointer shadow-md flex flex-col justify-between h-44 group hover:-translate-y-1`}>
      <div>
        <span className="text-xs font-black px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white inline-block mb-3">
          {type}
        </span>
        <h3 className={`font-black text-xl leading-tight ${textColor} drop-shadow-sm`}>{title}</h3>
      </div>
      <div className="flex justify-end relative h-12">
        {emote ? (
          <div className="absolute -bottom-4 -right-2 group-hover:scale-110 transition-transform group-hover:animate-wiggle">
             <Mascot emote={emote} size={72} className="drop-shadow-lg" />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-yellow-400 group-hover:scale-110 transition-transform group-hover:animate-wiggle">
            <Star className="w-7 h-7 fill-current" />
          </div>
        )}
      </div>
    </div>
  )
}
