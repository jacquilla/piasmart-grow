import { Heart, MessageCircle } from "lucide-react"

interface FeedCardProps {
  title: string
  time: string
  description: string
  image?: string
}

export function FeedCard({ title, time, description, image }: FeedCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-[2rem] p-5 shadow-xl shadow-primary/5 border border-white/60 mb-6 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group hover:-translate-y-1">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-secondary/20 text-secondary-foreground flex items-center justify-center font-bold">
            TK
          </div>
          <div>
            <h3 className="font-bold text-foreground leading-none">{title}</h3>
            <p className="text-xs font-medium text-muted-foreground mt-1.5">{time}</p>
          </div>
        </div>
        <button className="text-muted-foreground hover:text-primary transition-colors">
          <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center font-bold">•••</div>
        </button>
      </div>

      <p className="text-sm text-foreground/80 leading-relaxed mb-4 font-medium">
        {description}
      </p>

      {image && (
        <div className="w-full h-48 bg-muted rounded-[1.5rem] mb-4 overflow-hidden relative group-hover:shadow-inner transition-shadow">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 flex items-center justify-center">
            <span className="text-5xl animate-pulse">🎨</span>
          </div>
        </div>
      )}

      <div className="flex items-center gap-6 pt-4 border-t border-muted/50">
        <button className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group/btn">
          <Heart className="w-5 h-5 group-hover/btn:fill-primary group-active/btn:scale-75 transition-all" />
          <span>Suka</span>
        </button>
        <button className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors group/btn">
          <MessageCircle className="w-5 h-5 group-active/btn:scale-75 transition-all" />
          <span>Komentar</span>
        </button>
      </div>
    </div>
  )
}
