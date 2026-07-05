import { Star, CheckCircle, Clock } from 'lucide-react'

export default function LaporanPage() {
  return (
    <main className="p-6 space-y-6 animate-pop">
      
      <div className="flex flex-col items-center mb-4 mt-2">
        <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center border-[4px] border-green-200 shadow-[0_6px_0_0_rgba(187,247,208,1)] rotate-[-3deg] mb-3">
          <Star className="w-8 h-8 text-green-500 fill-current animate-wiggle" />
        </div>
        <h1 className="text-3xl font-black text-sky-900 drop-shadow-sm text-center">Jejak Pia 🌟</h1>
        <p className="text-sky-700/80 font-bold mt-1 text-center bg-white/50 px-4 py-1 rounded-full border-2 border-sky-100">Kumpulan petualangan seru hari ini!</p>
      </div>
      
      <div className="relative z-10 pl-4 border-l-4 border-dashed border-sky-300 space-y-8 mt-8">
        
        <ReportTimelineItem 
          title="Menyusun Balok"
          time="09:15 WIB"
          desc="Berhasil menyusun menara balok sangat tinggi! Motorik halusnya juara."
          icon={<Star className="w-6 h-6 text-yellow-500 fill-current" />}
          color="bg-yellow-100 border-yellow-300"
        />

        <ReportTimelineItem 
          title="Mengenal Hewan"
          time="10:30 WIB"
          desc="Bisa meniru suara sapi dan kucing dengan sangat menggemaskan."
          icon={<CheckCircle className="w-6 h-6 text-green-500 fill-current" />}
          color="bg-green-100 border-green-300"
        />
        
        <ReportTimelineItem 
          title="Makan Siang"
          time="12:00 WIB"
          desc="Makan Nasi, Telur Dadar & Sayur Bayam. Habis tanpa sisa! Nyam nyam."
          icon={<Clock className="w-6 h-6 text-orange-500" strokeWidth={3} />}
          color="bg-orange-100 border-orange-300"
        />
        
        <div className="h-6" />
      </div>
    </main>
  )
}

function ReportTimelineItem({ title, time, desc, icon, color }: { title: string, time: string, desc: string, icon: React.ReactNode, color: string }) {
  return (
    <div className="relative group">
      <div className={`absolute -left-[30px] top-4 w-12 h-12 rounded-full bg-white border-[4px] border-sky-300 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div className={`ml-8 p-5 rounded-[2rem] bg-white border-[4px] ${color} shadow-[0_6px_0_0_rgba(224,242,254,0.5)] transition-transform hover:-translate-y-1`}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-black text-xl text-sky-900">{title}</h3>
          <span className="text-xs font-bold text-sky-600 bg-sky-100 px-2 py-1 rounded-full">{time}</span>
        </div>
        <p className="text-sky-800 font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}
