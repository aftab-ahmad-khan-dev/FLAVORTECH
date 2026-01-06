import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "wouter";
import { ChefHat, ArrowRight, Star, Sparkles, Utensils, Zap, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import foodHero from '@assets/stock_images/gourmet_restaurant_f_a084f0e0.jpg';

export default function LandingWithLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 relative overflow-hidden flex flex-col font-sans">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] mask-image-linear-gradient" />

      {/* Navbar */}
      <nav className="relative z-50 px-6 py-8 flex items-center justify-between max-w-7xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="bg-gradient-to-br from-orange-500 to-red-600 p-2.5 rounded-2xl shadow-2xl shadow-orange-500/20">
            <ChefHat className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">FLAVOR<span className="text-orange-500">TECH</span></span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex items-center gap-10 text-sm font-bold uppercase tracking-widest text-slate-400"
        >
          <a href="#" className="hover:text-orange-500 transition-all duration-300">Platform</a>
          <a href="#" className="hover:text-orange-500 transition-all duration-300">Solutions</a>
          <a href="#" className="hover:text-orange-500 transition-all duration-300">Enterprise</a>
          <button className="px-6 py-2.5 rounded-full border border-slate-700 bg-slate-800/50 hover:bg-slate-700 transition-all text-white">
            Book Demo
          </button>
        </motion.div>
      </nav>

      {/* Hero Content */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-16 px-6 py-12 max-w-7xl mx-auto w-full relative z-10">
        
        {/* Left Column: Visionary Text */}
        <div className="flex-1 max-w-2xl text-center lg:text-left space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-orange-500/20 backdrop-blur-md">
              <Sparkles className="w-3 h-3" />
              Revolutionizing Culinary Operations
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mb-8 text-white">
              Elevate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-teal-400 animate-gradient-x">
                Kitchen DNA.
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-lg font-medium">
              The neural network for modern hospitality. Real-time orchestration of orders, menus, and staff performance in one high-fidelity dashboard.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-12 py-8 border-y border-slate-800/50">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-white tracking-tighter">99.9%</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Uptime</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-white tracking-tighter">15k+</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Venues</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-white tracking-tighter">24/7</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Support</div>
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center lg:justify-start">
              <div className="flex -space-x-3">
                {[1,2,3,4,5].map(i => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                    className="w-10 h-10 rounded-full border-2 border-[#0f172a] bg-slate-800 ring-2 ring-orange-500/20 cursor-pointer overflow-hidden shadow-2xl"
                  >
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
              <div className="text-xs font-bold text-slate-500 flex flex-col">
                <span className="text-slate-300">Join 50k+ professionals</span>
                <div className="flex gap-1 text-orange-500 mt-1">
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                  <Star className="w-3 h-3 fill-current" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: High-Tech Login Card */}
        <motion.div 
          initial={{ opacity: 0, x: 40, rotate: 2 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="flex-1 w-full max-w-md relative"
        >
          {/* Decorative Elements */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-teal-500/20 blur-3xl rounded-full" />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-orange-500/20 blur-3xl rounded-full" />

          <div className="relative group">
            {/* Glossy Card Container */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-teal-500 rounded-3xl opacity-20 group-hover:opacity-40 transition duration-1000 blur-sm"></div>
            
            <div className="relative bg-slate-900/80 backdrop-blur-2xl p-10 rounded-3xl border border-white/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]">
              <div className="mb-10 text-center lg:text-left">
                <h2 className="text-3xl font-black text-white tracking-tight mb-2">Control Tower</h2>
                <p className="text-slate-500 font-medium">Access your enterprise dashboard</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Identity</label>
                  <div className="relative group/input">
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-5 py-4 bg-slate-950/50 rounded-2xl border border-white/5 text-white outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 font-medium placeholder:text-slate-700"
                      placeholder="operator@flavortech.io"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Secret Key</label>
                    <a href="#" className="text-[10px] font-black text-orange-500/70 hover:text-orange-500 uppercase tracking-[0.1em] transition-colors">Forgot?</a>
                  </div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-4 bg-slate-950/50 rounded-2xl border border-white/5 text-white outline-none focus:border-teal-500/50 focus:ring-4 focus:ring-teal-500/10 transition-all duration-300 font-medium placeholder:text-slate-700"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-5 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-orange-500/20 transition-all duration-300 flex items-center justify-center gap-3 mt-4 overflow-hidden relative group/btn"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                  <span className="relative z-10">Initialize Session</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                </motion.button>
              </form>

              <div className="mt-10 pt-8 border-t border-white/5 flex flex-col gap-4">
                <div className="flex items-center justify-center gap-6">
                  <Utensils className="w-4 h-4 text-slate-600" />
                  <Clock className="w-4 h-4 text-slate-600" />
                  <Zap className="w-4 h-4 text-slate-600" />
                </div>
                <p className="text-[10px] font-black text-slate-600 text-center uppercase tracking-widest">
                  Secure Enterprise Authentication v4.2
                </p>
              </div>
            </div>
          </div>

          {/* Floating Food Card */}
          <motion.div 
            animate={{ 
              y: [0, -10, 0],
              rotate: [-2, -4, -2]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-12 -left-20 hidden 2xl:block"
          >
            <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 p-3 rounded-3xl shadow-2xl w-48">
              <img src={foodHero} alt="Premium Dish" className="w-full h-32 object-cover rounded-2xl mb-3" />
              <div className="px-1">
                <div className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1">Top Rated</div>
                <div className="text-xs font-bold text-white">Wild Salmon Tartare</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Floating Action Badge */}
      <div className="fixed bottom-10 right-10 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-2xl shadow-teal-500/40 relative group"
        >
          <div className="absolute -top-12 right-0 bg-slate-900 text-[10px] font-black text-white px-3 py-1.5 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Support Live
          </div>
          <Zap className="w-6 h-6 fill-current" />
        </motion.button>
      </div>

      {/* Bottom Visual Strip */}
      <div className="h-1 bg-gradient-to-r from-orange-500 via-red-500 to-teal-500 opacity-30" />
      <footer className="py-8 text-center bg-slate-950/50 backdrop-blur-md relative z-10">
        <p className="text-[10px] font-black tracking-[0.4em] text-slate-600 uppercase">
          © 2024 FlavorTech Global Systems — Built for the Bold
        </p>
      </footer>
    </div>
  );
}

