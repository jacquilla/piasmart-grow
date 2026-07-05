import { Camera, CalendarHeart, BookOpen, Star } from "lucide-react"
import Link from "next/link"

const actions = [
  { icon: Camera, label: "Galeri", color: "bg-[#FFF0F5] text-[#E39FB0]", href: "#" },
  { icon: CalendarHeart, label: "Jadwal", color: "bg-[#F0FAF5] text-[#77E7B4]", href: "#" },
  { icon: BookOpen, label: "Laporan", color: "bg-[#F4F5F9] text-[#343869]", href: "#" },
  { icon: Star, label: "Nilai", color: "bg-[#F3E8FF] text-[#A1A6D3]", href: "#" },
]

export function QuickActions() {
  return (
    <div className="px-6 py-2">
      <div className="grid grid-cols-4 gap-4">
        {actions.map((action, idx) => (
          <Link key={idx} href={action.href} className="flex flex-col items-center gap-2 group animate-in slide-in-from-bottom-8 fade-in fill-mode-both" style={{ animationDelay: `${idx * 100}ms` }}>
            <div className={`w-16 h-16 rounded-[1.25rem] ${action.color} flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-active:scale-95 transition-all duration-300`}>
              <action.icon className="w-7 h-7" />
            </div>
            <span className="text-xs font-bold text-foreground/80 transition-colors group-hover:text-primary">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
