import Link from 'next/link'
import { Home, LineChart, BookOpen, User } from 'lucide-react'
import { BottomNav } from '@/components/navigation/bottom-nav'
import { MascotBackground } from '@/components/ui/MascotBackground'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-sky-50 relative overflow-hidden flex flex-col md:flex-row font-sans">
      <MascotBackground />

      {/* Main Content Area */}
      <main className="flex-1 w-full pb-32 overflow-y-auto h-screen relative z-10">
        <div className="max-w-md mx-auto w-full">
          {children}
        </div>
      </main>

      {/* Floating Bottom Nav */}
      <BottomNav />
    </div>
  )
}
