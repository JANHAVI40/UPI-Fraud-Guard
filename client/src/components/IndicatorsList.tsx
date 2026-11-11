import React from 'react';
import { ShieldAlert, AlertTriangle, Info, Flame } from 'lucide-react';
import { RiskIndicator } from '../types';

interface IndicatorsListProps {
  indicators: RiskIndicator[];
}

export const IndicatorsList: React.FC<IndicatorsListProps> = ({ indicators }) => {
  if (!indicators || indicators.length === 0) {
    return (
      <div className="p-4 rounded-xl bg-navy-950/60 border border-slate-800 text-center">
        <p className="text-sm text-slate-400 font-mono">
          ✓ No suspicious fraud patterns detected.
        </p>
      </div>
    );
  }

  const getSeverityBadge = (severity: RiskIndicator['severity']) => {
    switch (severity) {
      case 'critical':
        return {
          icon: Flame,
          badgeClass: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
          cardClass: 'border-rose-500/30 bg-rose-950/20',
        };
      case 'high':
        return {
          icon: AlertTriangle,
          badgeClass: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
          cardClass: 'border-orange-500/30 bg-orange-950/20',
        };
      case 'medium':
        return {
          icon: ShieldAlert,
          badgeClass: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
          cardClass: 'border-amber-500/30 bg-amber-950/20',
        };
      case 'low':
      default:
        return {
          icon: Info,
          badgeClass: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
          cardClass: 'border-blue-500/30 bg-blue-950/20',
        };
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase tracking-wider">
        <span>Detected Threat Indicators ({indicators.length})</span>
        <span>Heuristic Penalty</span>
      </div>

      <div className="space-y-2">
        {indicators.map((ind) => {
          const style = getSeverityBadge(ind.severity);
          const Icon = style.icon;

          return (
            <div
              key={ind.id}
              className={`p-3.5 rounded-xl border ${style.cardClass} flex items-start justify-between gap-3 transition-colors`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-1.5 rounded-lg border mt-0.5 ${style.badgeClass}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">
                      {ind.label}
                    </span>
                    <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded border ${style.badgeClass}`}>
                      {ind.severity}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    {ind.description}
                  </p>
                </div>
              </div>

              <div className="flex-shrink-0 text-right">
                <span className="font-mono text-xs font-bold text-rose-400 px-2 py-1 rounded bg-rose-950/50 border border-rose-500/20">
                  +{ind.scoreImpact} pts
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

