'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;

    setIsLoading(true);
    setErrorMsg('');
    
    setTimeout(() => {
      setIsLoading(false);
      if (username === 'admin' && password === '123456') {
        // Set cookie manually for admin bypass
        document.cookie = "admin_auth=true; path=/; max-age=86400"; // 1 day
        router.push('/dashboard');
      } else {
        setErrorMsg('Username atau password salah.');
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-md relative flex flex-col">
        {/* Decorative background blurs */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary/20 blur-3xl rounded-full" />

        <div className="text-center mb-8 relative z-10">
          <div className="w-16 h-16 bg-white border border-primary/20 rounded-2xl shadow-xl flex items-center justify-center mx-auto mb-6 rotate-3 hover:rotate-0 transition-transform duration-300">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">PiaSmart Grow</h1>
          <p className="text-foreground/60 text-sm">Portal Manajemen dan Akses Cepat</p>
        </div>

        <div className="card bg-white border border-primary/20 shadow-2xl backdrop-blur-sm relative z-10">
          <form onSubmit={handleLogin} className="card-body">
            <h2 className="card-title text-xl font-bold">Login Admin</h2>
            <p className="text-sm text-foreground/60 mb-4">Masukkan kredensial untuk mengakses dashboard.</p>
            
            {errorMsg && (
              <div className="p-3 bg-red-100 text-red-600 rounded-lg text-sm mb-2 font-medium">
                {errorMsg}
              </div>
            )}

            <div className="form-control w-full space-y-2">
              <label className="label py-1" htmlFor="username">
                <span className="label-text font-medium text-foreground/80">Username</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-foreground/40" />
                </div>
                <input
                  type="text"
                  id="username"
                  className="input input-bordered w-full pl-10 focus:input-primary bg-background"
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-control w-full space-y-2 mt-2">
              <label className="label py-1" htmlFor="password">
                <span className="label-text font-medium text-foreground/80">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-foreground/40" />
                </div>
                <input
                  type="password"
                  id="password"
                  className="input input-bordered w-full pl-10 focus:input-primary bg-background"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="card-actions mt-6 flex-col">
              <button 
                type="submit" 
                className="btn bg-secondary text-secondary-foreground hover:bg-secondary/90 border-none w-full group" 
                disabled={isLoading || !username.trim() || !password.trim()}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <span className="loading loading-spinner loading-sm mr-2"></span>
                    Memverifikasi...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Masuk
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </button>
              <div className="flex items-center justify-center text-xs text-foreground/60 w-full mt-4">
                <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                <span>Akses aman khusus administrator.</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
