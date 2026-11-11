import React from 'react';
import { ShieldCheck, AlertCircle, AlertTriangle, Flame } from 'lucide-react';
import { RiskCategory } from '../types';

interface RiskMeterProps {
  score: number;
  category: RiskCategory;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const RiskMeter: React.FC<RiskMeterProps> = ({ 
  score, 
  category, 
  size = 'md',
  showLabel = true 
}) => {
  const getCategoryTheme = (cat: RiskCategory) => {
    switch (cat) {
      case 'Low':
        return {
          color: 'text-emerald-400',
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/30',
          barColor: 'from-emerald-500 to-teal-400',
          icon: ShieldCheck,
          label: 'Low Risk',
          desc: 'No major scam patterns identified.'
        };
      case 'Medium':
        return {
          color: 'text-amber-400',
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/30',
          barColor: 'from-yellow-500 to-amber-500',
          icon: AlertCircle,
          label: 'Medium Risk',
          desc: 'Suspicious elements detected. Exercise caution.'
        };
      case 'High':
        return {
          color: 'text-orange-400',
          bg: 'bg-orange-500/10',
          border: 'border-orange-500/30',
          barColor: 'from-orange-500 to-amber-600',
          icon: AlertTriangle,
          label: 'High Risk',
          desc: 'Strong deceptive indicators identified. Do not proceed without verification.'
        };
      case 'Critical':
      default:
        return {
          color: 'text-rose-400',
          bg: 'bg-rose-500/10',
          border: 'border-rose-500/40',
          barColor: 'from-rose-500 via-red-600 to-orange-500',
          icon: Flame,
          label: 'Critical Risk',
          desc: 'High probability scam. PIN manipulation or predatory phishing detected!'
        };
    }
  };

  const theme = getCategoryTheme(category);
  const Icon = theme.icon;

  if (size === 'sm') {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${theme.bg} ${theme.border} ${theme.color}`}>
        <Icon className="w-3.5 h-3.5" />
        <span>{score}/100</span>
        <span className="text-[10px] opacity-80 uppercase">({category})</span>
      </div>
    );
  }

  return (
    <div className={`p-5 rounded-2xl border ${theme.bg} ${theme.border} backdrop-blur-md`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-xl bg-navy-950/80 border ${theme.border} ${theme.color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">
              Heuristic Risk Assessment
            </span>
            <h4 className={`text-base font-bold ${theme.color}`}>
              {theme.label} ({score}/100)
            </h4>
          </div>
        </div>

        {showLabel && (
          <span className={`text-xs px-2.5 py-1 rounded-lg font-mono font-bold uppercase tracking-wider ${theme.bg} ${theme.border} ${theme.color}`}>
            {category}
          </span>
        )}
      </div>

      {/* Progress Bar with neon gradient */}
      <div className="space-y-1.5">
        <div className="w-full h-3 rounded-full bg-navy-950 border border-slate-800 p-0.5 overflow-hidden">
          <div 
            className={`h-full rounded-full bg-gradient-to-r ${theme.barColor} transition-all duration-500`}
            style={{ width: `${Math.max(4, Math.min(score, 100))}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-slate-400">
          <span>0 (Safe)</span>
          <span>30</span>
          <span>60</span>
          <span>80</span>
          <span>100 (Dangerous)</span>
        </div>
      </div>

      <p className="mt-3 text-xs text-slate-300 leading-relaxed">
        {theme.desc}
      </p>
    </div>
  );
};

