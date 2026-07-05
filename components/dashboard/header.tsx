import { Bell } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="px-6 pt-12 pb-6 flex items-center justify-between animate-in slide-in-from-top-8 fade-in duration-700">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
            <div className="w-full h-full bg-white rounded-full border-2 border-white overflow-hidden">
              <div className="w-full h-full bg-muted flex items-center justify-center text-xl">👩</div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-secondary border-2 border-white rounded-full shadow-sm"></div>
        </div>
        <div>
          <p className="text-sm font-bold text-muted-foreground">Selamat Pagi,</p>
          <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Bunda Pia 👋</h1>
        </div>
      </div>
      <button className="w-12 h-12 rounded-2xl bg-white border border-white shadow-sm shadow-primary/5 flex items-center justify-center text-foreground hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5 transition-all relative">
        <Bell className="w-6 h-6 text-foreground/80" />
        <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white animate-pulse"></span>
      </button>
    </header>
  )
}
