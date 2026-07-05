"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Lock, Sparkles, Heart } from "lucide-react"

export default function WelcomePage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    // Hardcoded logic untuk Admin Login
    if (username === "admin" && password === "123456") {
      router.push("/dashboard")
    } else {
      setError("Username atau password salah! (Hint: admin / 123456)")
    }
  }

  return (
    <main className="min-h-screen bg-sky-100 flex flex-col relative overflow-hidden font-sans">
      {/* Playful Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full animate-float opacity-80" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-green-400 rounded-full animate-float opacity-80" style={{ animationDelay: '1s' }} />
      <div className="absolute top-40 right-20 w-16 h-16 bg-pink-400 rounded-full animate-float opacity-80" style={{ animationDelay: '2s' }} />

      <div className="flex-1 flex flex-col justify-center px-6 py-12 max-w-md mx-auto w-full z-10">
        
        {/* Logo Area */}
        <div className="flex flex-col items-center mb-8 animate-pop">
          <div className="w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center mb-6 relative border-[6px] border-sky-300 shadow-[0_8px_0_0_rgba(125,211,252,1)] rotate-3 hover:rotate-0 transition-transform">
            <Heart className="w-16 h-16 text-pink-500 animate-wiggle" fill="currentColor" />
            <Sparkles className="absolute -top-4 -right-4 w-10 h-10 text-yellow-400 fill-current animate-pulse" />
          </div>
          <h1 className="text-5xl font-black text-sky-900 tracking-tight drop-shadow-sm">PiaSmart</h1>
          <p className="text-sky-700/80 mt-2 text-center text-xl font-bold bg-white/50 px-4 py-1 rounded-full border-2 border-sky-200">Tumbuh cerdas & bahagia 🎈</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-[2.5rem] p-8 border-[4px] border-sky-100 shadow-[0_12px_0_0_rgba(224,242,254,1)] animate-pop" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
          <h2 className="text-2xl font-black text-sky-900 mb-6 flex items-center gap-2">
            Selamat Datang! 👋
          </h2>
          
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-100 border-2 border-red-300 text-red-700 px-4 py-3 rounded-2xl text-sm font-bold text-center animate-wiggle">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-black text-sky-800 ml-2">Email / No. HP</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <User className="h-6 w-6 text-sky-400 group-focus-within:text-sky-600 transition-colors" />
                </div>
                <Input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Ketik 'admin'" 
                  className="pl-14 h-16 rounded-2xl bg-sky-50 border-[3px] border-sky-200 focus-visible:ring-0 focus-visible:border-sky-400 text-lg font-bold text-sky-900 placeholder:text-sky-300 transition-all hover:bg-sky-100/50" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-2">
                <label className="text-sm font-black text-sky-800">Kata Sandi</label>
                <Link href="#" className="text-sm font-bold text-pink-500 hover:text-pink-600 transition-colors">
                  Lupa?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Lock className="h-6 w-6 text-sky-400 group-focus-within:text-sky-600 transition-colors" />
                </div>
                <Input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ketik '123456'" 
                  className="pl-14 h-16 rounded-2xl bg-sky-50 border-[3px] border-sky-200 focus-visible:ring-0 focus-visible:border-sky-400 text-lg font-bold text-sky-900 placeholder:text-sky-300 transition-all hover:bg-sky-100/50" 
                />
              </div>
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full h-16 bg-green-500 hover:bg-green-400 text-white text-xl font-black rounded-2xl border-b-[6px] border-green-700 active:border-b-0 active:translate-y-[6px] transition-all flex items-center justify-center gap-2 group cursor-pointer">
                Masuk Sekarang
                <Sparkles className="w-6 h-6 group-hover:animate-wiggle" />
              </button>
            </div>
          </form>

          <div className="mt-8 text-center bg-sky-50 py-3 rounded-2xl border-2 border-dashed border-sky-200">
            <p className="text-sm font-bold text-sky-700">
              Belum punya akun? <Link href="#" className="text-sky-900 hover:underline">Tanya Sekolah</Link>
            </p>
          </div>
        </div>

      </div>
    </main>
  )
}
