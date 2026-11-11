import React, { useState } from 'react';
import { History, Trash2, Filter, ShieldCheck } from 'lucide-react';
import { RiskMeter } from '../components/RiskMeter';

export const ScanHistoryPage: React.FC = () => {
  // Initial local storage / seed state for Phase 1 (will bind to Prisma backend in Phase 8)
  const [historyItems, setHistoryItems] = useState([
    {
      id: 'h-1',
      type: 'upi',
      title: 'VPA: reward-cashback-gpay@okaxis',
      score: 85,
      category: 'High' as const,
      indicatorsCount: 2,
      timestamp: 'Today, 11:42 PM',
      action: 'Collect request with cashback lure',
    },
    {
      id: 'h-2',
      type: 'url',
      title: 'Domain: sbi-kyc-update-portal.xyz',
      score: 92,
      category: 'Critical' as const,
      indicatorsCount: 3,
      timestamp: 'Today, 10:15 PM',
      action: 'Lookalike bank domain & untrusted TLD',
    },
    {
      id: 'h-3',
      type: 'message',
      title: 'SMS: Electricity power disconnect warning',
      score: 88,
      category: 'Critical' as const,
      indicatorsCount: 2,
      timestamp: 'Yesterday, 04:30 PM',
      action: 'Urgent utility shutoff extortion',
    },
    {
      id: 'h-4',
      type: 'qr',
      title: 'BharatQR: Store Checkout (Reliance Smart)',
      score: 10,
      category: 'Low' as const,
      indicatorsCount: 0,
      timestamp: 'Yesterday, 01:10 PM',
      action: 'Verified NPCI Merchant VPA',
    },
    {
      id: 'h-5',
      type: 'upi',
      title: 'VPA: friend.rahul@okhdfcbank',
      score: 15,
      category: 'Low' as const,
      indicatorsCount: 0,
      timestamp: 'Oct 30, 08:20 PM',
      action: 'Standard personal P2P handle',
    },
  ]);

  const [filterType, setFilterType] = useState<string>('all');

  const filteredItems = historyItems.filter((item) => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  const handleClearHistory = () => {
    if (window.confirm('Clear all local scan history?')) {
      setHistoryItems([]);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-cyber-cyan" />
            <h1 className="text-2xl font-bold text-white">Scan History & Audit Logs</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Privacy-safe records of your recent UPI, QR code, SMS, and phishing website analyses.
          </p>
        </div>

        {historyItems.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/40 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <div className="flex items-center gap-1.5 text-slate-400 mr-2 font-mono">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter:</span>
        </div>
        {['all', 'upi', 'qr', 'message', 'url'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3 py-1.5 rounded-lg uppercase font-mono font-medium transition-colors ${
              filterType === type
                ? 'bg-cyber-cyan/20 text-cyber-cyan border border-cyber-cyan/40'
                : 'bg-navy-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* History List */}
      <div className="cyber-card border-slate-800 overflow-hidden">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-sm text-slate-400 font-mono">No scans found in this category.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-800/80">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-navy-950/40 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-semibold">
                      {item.type}
                    </span>
                    <h3 className="text-sm font-semibold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400">
                    {item.action} • <span className="font-mono text-slate-500">{item.indicatorsCount} red flags flagged</span>
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 flex-shrink-0">
                  <span className="text-xs font-mono text-slate-400">
                    {item.timestamp}
                  </span>
                  <RiskMeter score={item.score} category={item.category} size="sm" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Privacy Guarantee */}
      <div className="p-4 rounded-xl bg-navy-900/60 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
        <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
        <p>
          <strong className="text-slate-200">Zero Sensitive Data Retention:</strong> Scan records store only threat telemetry scores and anonymized indicators. We do not store phone contacts, financial credentials, or private message transcripts.
        </p>
      </div>
    </div>
  );
};
