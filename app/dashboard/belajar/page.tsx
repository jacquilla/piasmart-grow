import { PlayCircle, Gamepad2, Medal, Sparkles } from "lucide-react"

export default function BelajarPage() {
  return (
    <main className="p-6 space-y-8 animate-pop">
      
      <div className="flex flex-col items-center mb-4 mt-2">
        <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center border-[4px] border-orange-200 shadow-[0_6px_0_0_rgba(254,215,170,1)] rotate-3 mb-3">
          <Gamepad2 className="w-8 h-8 text-orange-500 animate-wiggle" />
        </div>
        <h1 className="text-3xl font-black text-sky-900 drop-shadow-sm text-center">Misi Belajar 🚀</h1>
        <p className="text-sky-700/80 font-bold mt-1 text-center bg-white/50 px-4 py-1 rounded-full border-2 border-sky-100">Pilih map petualangan serumu!</p>
      </div>

      <div className="space-y-6 relative z-10">
        
        {/* Featured Video / Main Level */}
        <div className="bg-blue-500 rounded-[2rem] p-6 text-white border-b-[8px] border-blue-700 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl -mr-10 -mt-10" />
          <div className="relative z-10">
            <span className="bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1 rounded-full mb-4 inline-block shadow-sm">Misi Utama</span>
            <h2 className="text-2xl font-black mb-2 drop-shadow-sm">Mengenal Warna Dasar</h2>
            <p className="text-blue-100 text-base mb-6 font-bold leading-tight">Bantu maskot kita menemukan warna kesukaannya!</p>
            
            <button className="flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-600 border-b-[5px] border-blue-200 active:border-b-0 active:translate-y-[5px] transition-all px-5 py-4 rounded-2xl text-lg font-black w-full justify-center">
              <PlayCircle className="w-6 h-6 group-hover:animate-wiggle" strokeWidth={3} /> Mulai Main!
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-4 mt-8">
            <Medal className="w-6 h-6 text-orange-500" />
            <h3 className="text-xl font-black text-sky-900">Pilih Map Lainnya</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <CategoryCard title="Bentuk & Pola" color="bg-orange-400 border-orange-600" textColor="text-white" icon="🔺" />
            <CategoryCard title="Suara Hewan" color="bg-green-400 border-green-600" textColor="text-white" icon="🐶" />
            <CategoryCard title="Angka 1-10" color="bg-purple-400 border-purple-600" textColor="text-white" icon="🔢" />
            <CategoryCard title="Seni Kriya" color="bg-pink-400 border-pink-600" textColor="text-white" icon="🎨" />
          </div>
        </div>

        {/* Spacer for bottom nav */}
        <div className="h-20" />
      </div>
    </main>
  )
}

function CategoryCard({ title, color, textColor, icon }: { title: string, color: string, textColor: string, icon: string }) {
  return (
    <div className={`p-5 rounded-3xl ${color} border-b-[6px] active:border-b-0 active:translate-y-[6px] transition-all cursor-pointer shadow-md flex flex-col items-center justify-center text-center h-40 group hover:-translate-y-1`}>
      <div className="text-4xl mb-3 group-hover:animate-wiggle group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h4 className={`font-black text-lg ${textColor} leading-tight drop-shadow-sm`}>{title}</h4>
    </div>
  )
}
