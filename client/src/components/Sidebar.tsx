import React from 'react';
import { 
  Home, 
  LayoutDashboard, 
  CreditCard, 
  QrCode, 
  MessageSquareWarning, 
  Globe, 
  History, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems: NavItem[] = [
    {
      id: 'landing',
      label: 'Home & Overview',
      icon: Home,
      description: 'Introduction & quick scan'
    },
    {
      id: 'dashboard',
      label: 'Security Dashboard',
      badge: 'Live',
      icon: LayoutDashboard,
      description: 'Metrics & threat analytics'
    },
    {
      id: 'upi',
      label: 'UPI Analyzer',
      icon: CreditCard,
      description: 'VPA & payment URI inspection'
    },
    {
      id: 'qr',
      label: 'QR Code Scanner',
      icon: QrCode,
      description: 'Image decode & URI audit'
    },
    {
      id: 'message',
      label: 'Scam Message Detector',
      icon: MessageSquareWarning,
      description: 'SMS & WhatsApp phishing detection'
    },
    {
      id: 'url',
      label: 'Phishing URL Analyzer',
      icon: Globe,
      description: 'Lookalike domain & punycode check'
    },
    {
      id: 'history',
      label: 'Scan History',
      icon: History,
      description: 'Audit logs & past detections'
    },
    {
      id: 'awareness',
      label: 'Fraud Awareness',
      badge: '1930',
      icon: ShieldCheck,
      description: 'Modus operandi & defense guides'
    },
  ];

  return (
    <aside className="w-full lg:w-72 flex-shrink-0 border-r border-slate-800/80 bg-navy-900/40 p-4 backdrop-blur-sm">
      <div className="space-y-1">
        <p className="px-3 text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
          Security Suite
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full group flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-200 border ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-950/60 to-blue-950/40 text-cyber-cyan border-cyan-500/40 shadow-glow-cyan/50 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50 border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-cyber-cyan/20 text-cyber-cyan'
                      : 'bg-slate-800/80 text-slate-400 group-hover:text-slate-200 group-hover:bg-slate-700/80'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{item.label}</span>
                    {item.badge && (
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                        item.badge === 'Live' 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 hidden lg:block leading-tight mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>

              <ChevronRight
                className={`w-4 h-4 transition-transform ${
                  isActive ? 'text-cyber-cyan opacity-100 translate-x-0.5' : 'text-slate-600 opacity-0 group-hover:opacity-100'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Safety Reminder Card in Sidebar Footer */}
      <div className="mt-8 p-3.5 rounded-xl bg-navy-850/80 border border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-amber-400 font-semibold mb-1">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          Golden UPI Rule
        </div>
        <p className="text-slate-400 text-[11px] leading-relaxed">
          <strong className="text-slate-200">You NEVER enter your UPI PIN to receive money.</strong> Entering a PIN always debits your account.
        </p>
      </div>
    </aside>
  );
};

