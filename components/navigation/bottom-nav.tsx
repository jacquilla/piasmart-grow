"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, LineChart, BookOpen, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: Home, label: "Beranda", href: "/dashboard", color: "bg-blue-500 border-blue-700" },
  { icon: LineChart, label: "Laporan", href: "/dashboard/laporan", color: "bg-green-500 border-green-700" },
  { icon: BookOpen, label: "Belajar", href: "/dashboard/belajar", color: "bg-orange-500 border-orange-700" },
  { icon: User, label: "Profil", href: "/dashboard/profile", color: "bg-purple-500 border-purple-700" },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 px-6 pointer-events-none">
      <nav className="mx-auto max-w-sm bg-white rounded-3xl border-[4px] border-sky-100 shadow-[0_12px_20px_-10px_rgba(125,211,252,0.5)] px-4 py-3 flex justify-between items-center pointer-events-auto">
        {navItems.map((item, idx) => {
          const isActive = pathname === item.href
          return (
            <Link 
              key={idx} 
              href={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all duration-300",
                isActive 
                  ? cn(item.color, "text-white scale-110 -translate-y-4 border-b-[4px] shadow-lg animate-bounce") 
                  : "text-sky-400 hover:bg-sky-50 hover:text-sky-600 hover:scale-105"
              )}
              style={isActive ? { animationDuration: '2s' } : {}}
            >
              <item.icon className={cn("w-7 h-7", isActive ? "animate-wiggle" : "")} strokeWidth={isActive ? 3 : 2} />
              {isActive && (
                <span className="text-[11px] font-black mt-1 absolute -bottom-6 text-sky-800 tracking-wide">
                  {item.label}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
