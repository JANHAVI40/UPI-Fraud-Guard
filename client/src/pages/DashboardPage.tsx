import React from 'react';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Flame, 
  History, 
  TrendingUp, 
  BarChart3,
  ArrowRight
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { RiskMeter } from '../components/RiskMeter';

interface DashboardPageProps {
  setActiveTab: (tab: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ setActiveTab }) => {
  // Initial placeholder data for Phase 1 UI showcase (will be wired to Prisma SQLite in Phase 8)
  const initialMetrics = {
    totalScans: 28,
    criticalRiskScans: 6,
    highRiskScans: 8,
    mediumRiskScans: 5,
    lowRiskScans: 9,
  };

  const sampleRecentScans = [
    {
      id: 'scan-1',
      type: 'upi' as const,
      target: 'claim-cashback-googlepay@okaxis',
      score: 88,
      category: 'Critical' as const,
      timestamp: '10 mins ago',
      indicator: 'Deceptive cashback keyword + unverified handle',
    },
    {
      id: 'scan-2',
      type: 'message' as const,
      target: 'Dear user, your Electricity power will be disconnected at 9:30 PM...',
      score: 92,
      category: 'Critical' as const,
      timestamp: '25 mins ago',
      indicator: 'Urgent utility disconnection threat lure',
    },
    {
      id: 'scan-3',
      type: 'url' as const,
      target: 'https://sbi-kyc-verification-online.xyz/update',
      score: 85,
      category: 'High' as const,
      timestamp: '1 hour ago',
      indicator: 'Lookalike bank domain & suspicious TLD (.xyz)',
    },
    {
      id: 'scan-4',
      type: 'qr' as const,
      target: 'Merchant: Reliance Fresh Store (Verified NPCI Tier-1)',
      score: 12,
      category: 'Low' as const,
      timestamp: '2 hours ago',
      indicator: 'Standard NPCI compliant static merchant QR',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-cyber-cyan" />
            <h1 className="text-2xl font-bold text-white">Security Intelligence Dashboard</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time analytics across all UPI, QR code, SMS message, and phishing URL scans.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('upi')}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-cyber-cyan/10 hover:bg-cyber-cyan/20 border border-cyber-cyan/40 text-cyber-cyan text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <span>Run New Scan</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Top Telemetry Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Scans"
          value={initialMetrics.totalScans}
          subtitle="All security modules combined"
          icon={BarChart3}
          variant="cyan"
          trend="+12% today"
        />
        <StatCard
          title="Critical / High Risk"
          value={initialMetrics.criticalRiskScans + initialMetrics.highRiskScans}
          subtitle="Potentially active scam attempts"
          icon={Flame}
          variant="rose"
        />
        <StatCard
          title="Medium Risk"
          value={initialMetrics.mediumRiskScans}
          subtitle="Anomalous indicators detected"
          icon={AlertTriangle}
          variant="amber"
        />
        <StatCard
          title="Verified Safe"
          value={initialMetrics.lowRiskScans}
          subtitle="Compliant NPCI / benign entries"
          icon={ShieldCheck}
          variant="emerald"
        />
      </div>

      {/* Quick Visual Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Risk Distribution Breakdown */}
        <div className="cyber-card p-6 border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyber-cyan" />
              Risk Severity Distribution
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Total: 28</span>
          </div>

          <div className="space-y-3.5">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-rose-400 font-semibold">Critical Risk (81-100)</span>
                <span className="font-mono text-slate-300">6 (21%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-navy-950 overflow-hidden border border-slate-800">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: '21%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-orange-400 font-semibold">High Risk (61-80)</span>
                <span className="font-mono text-slate-300">8 (29%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-navy-950 overflow-hidden border border-slate-800">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: '29%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-amber-400 font-semibold">Medium Risk (31-60)</span>
                <span className="font-mono text-slate-300">5 (18%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-navy-950 overflow-hidden border border-slate-800">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '18%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-emerald-400 font-semibold">Low Risk (0-30)</span>
                <span className="font-mono text-slate-300">9 (32%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-navy-950 overflow-hidden border border-slate-800">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '32%' }} />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>Scores reflect heuristic risk rules, not official bank verdicts.</span>
          </div>
        </div>

        {/* Recent Threat Audits */}
        <div className="lg:col-span-2 cyber-card p-6 border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <History className="w-4 h-4 text-cyber-cyan" />
              Latest Security Activity
            </h3>
            <button
              onClick={() => setActiveTab('history')}
              className="text-xs text-cyber-cyan hover:underline font-mono"
            >
              View Full History →
            </button>
          </div>

          <div className="space-y-3">
            {sampleRecentScans.map((scan) => (
              <div
                key={scan.id}
                className="p-3.5 rounded-xl bg-navy-950/70 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-700 transition-colors"
              >
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      {scan.type}
                    </span>
                    <span className="text-xs font-semibold text-white truncate max-w-xs">
                      {scan.target}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {scan.indicator}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0">
                  <span className="text-[11px] font-mono text-slate-400">
                    {scan.timestamp}
                  </span>
                  <RiskMeter score={scan.score} category={scan.category} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

