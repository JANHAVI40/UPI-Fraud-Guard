import React from 'react';
import { ShieldAlert, PhoneCall, Activity, AlertTriangle } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ setActiveTab }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-navy-950/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setActiveTab('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 shadow-glow-cyan transition-transform group-hover:scale-105">
            <ShieldAlert className="w-5 h-5 text-cyber-cyan transition-transform group-hover:rotate-6" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse border-2 border-navy-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-white text-lg">UPI</span>
              <span className="font-extrabold tracking-tight text-cyber-cyan text-lg">FRAUD</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono font-semibold border border-blue-500/30">
                GUARD
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wider uppercase font-mono">
              Digital Payment Threat Defense
            </p>
          </div>
        </div>

        {/* Center / Right Quick Stats & Helpline */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Engine Status */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-navy-900 border border-slate-800 text-xs text-slate-300">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Local Engine:</span>
            <span className="font-mono text-emerald-400 font-semibold">ACTIVE</span>
          </div>

          {/* National Cybercrime Helpline 1930 Notice */}
          <a
            href="tel:1930"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900/60 border border-rose-500/40 text-rose-300 transition-all text-xs font-semibold shadow-sm group"
            title="Immediate Reporting: Dial 1930 for financial cyber fraud"
          >
            <div className="p-1 rounded bg-rose-500/20 text-rose-400 group-hover:animate-bounce">
              <PhoneCall className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[10px] text-rose-400 font-mono">INDIAN CYBER HELPLINE</span>
              <span className="font-mono font-bold text-white text-xs">DIAL 1930</span>
            </div>
          </a>

          {/* Safety Disclaimer Warning Tag */}
          <div 
            onClick={() => setActiveTab('awareness')}
            className="cursor-pointer hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs hover:bg-amber-500/20 transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span className="font-medium">Safety Rules</span>
          </div>
        </div>

      </div>
    </header>
  );
};

