import React, { useState } from 'react';
import { CreditCard, AlertCircle, ShieldAlert, Sparkles, Send } from 'lucide-react';
import { RiskMeter } from '../components/RiskMeter';
import { IndicatorsList } from '../components/IndicatorsList';
import { AnalysisResult } from '../types';

export const UPIAnalyzerPage: React.FC = () => {
  const [upiInput, setUpiInput] = useState('');
  const [amountInput, setAmountInput] = useState('');
  const [noteInput, setNoteInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleQuickFill = (example: string) => {
    setUpiInput(example);
  };

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!upiInput.trim()) return;

    setIsAnalyzing(true);

    // Initial client-side heuristic preview (will connect to backend modular detection engine in Phase 3/7)
    setTimeout(() => {
      const lower = upiInput.toLowerCase();
      const lowerNote = noteInput.toLowerCase();

      const indicators = [];
      let score = 5;

      if (lower.includes('cashback') || lower.includes('reward') || lower.includes('lottery') || lowerNote.includes('claim')) {
        indicators.push({
          id: 'ind-1',
          label: 'Deceptive Cashback / Reward Phrasing',
          severity: 'high' as const,
          description: 'UPI IDs or descriptions with "cashback", "prize", or "claim" are frequently used in collect request scams.',
          scoreImpact: 35,
        });
        score += 35;
      }

      if (lower.includes('support') || lower.includes('helpdesk') || lower.includes('care') || lower.includes('kyc')) {
        indicators.push({
          id: 'ind-2',
          label: 'Impersonation of Official Support / KYC',
          severity: 'critical' as const,
          description: 'Banks and UPI providers never use public VPAs like "support-sbi@okaxis" for customer service.',
          scoreImpact: 45,
        });
        score += 45;
      }

      if (lower.includes('pin') || lowerNote.includes('pin')) {
        indicators.push({
          id: 'ind-3',
          label: 'Suspicious PIN Mention in Transaction',
          severity: 'critical' as const,
          description: 'Legitimate payment requests never request you to enter or share a PIN in the remarks.',
          scoreImpact: 40,
        });
        score += 40;
      }

      if (lower.startsWith('upi://pay')) {
        indicators.push({
          id: 'ind-4',
          label: 'Direct Payment Intent URI Detected',
          severity: 'low' as const,
          description: 'Valid NPCI UPI Protocol schema identified for deep parameter extraction.',
          scoreImpact: 0,
        });
      }

      score = Math.min(score, 100);
      const category = score > 80 ? 'Critical' : score > 60 ? 'High' : score > 30 ? 'Medium' : 'Low';

      setResult({
        type: 'upi',
        score,
        category,
        explanation: score > 60 
          ? 'High likelihood of fraudulent collect request or impersonation scam. Never enter your UPI PIN.'
          : 'Standard UPI format analyzed. No overt scam indicators found in heuristic check.',
        suggestedAction: score > 60
          ? 'REJECT this request immediately. Do not enter your UPI PIN. Report to 1930 if unauthorized.'
          : 'Verify payee identity with the recipient before approving any payment.',
        indicators,
        timestamp: new Date().toLocaleTimeString(),
      });

      setIsAnalyzing(false);
    }, 600);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-cyber-cyan" />
          <h1 className="text-2xl font-bold text-white">UPI Payment & VPA Analyzer</h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Inspect UPI Virtual Payment Addresses (VPAs) and <code className="text-cyber-cyan">upi://pay</code> intents for fraudulent collect requests and impersonation traps.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-7 cyber-card p-6 border-slate-800">
          <form onSubmit={handleAnalyze} className="space-y-4">
            
            {/* Input UPI ID or URI */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-semibold">
                UPI ID or Payment URI <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. merchant@okhdfcbank or upi://pay?pa=...&pn=..."
                  value={upiInput}
                  onChange={(e) => setUpiInput(e.target.value)}
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan font-mono"
                  required
                />
              </div>
            </div>

            {/* Optional Amount & Note */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  Requested Amount (Optional ₹)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 5000"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                  Payment Note / Remarks (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Claim Lottery / KYC update"
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan font-mono"
                />
              </div>
            </div>

            {/* Quick Test Samples */}
            <div className="pt-2">
              <span className="text-[11px] font-mono text-slate-400 block mb-2">
                Quick Test Samples:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickFill('sbi-customercare-refund@oksbi')}
                  className="px-2.5 py-1 text-xs rounded-lg bg-navy-950 border border-rose-500/30 text-rose-300 hover:bg-rose-950/40 font-mono transition-colors"
                >
                  Fake Refund VPA
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFill('upi://pay?pa=cashback-reward99@paytm&pn=GPayReward&am=2500&cu=INR')}
                  className="px-2.5 py-1 text-xs rounded-lg bg-navy-950 border border-amber-500/30 text-amber-300 hover:bg-amber-950/40 font-mono transition-colors"
                >
                  Fake Reward URI
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickFill('support@airtel')}
                  className="px-2.5 py-1 text-xs rounded-lg bg-navy-950 border border-slate-700 text-slate-300 hover:bg-slate-800 font-mono transition-colors"
                >
                  Legit Format VPA
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-navy-950 font-bold transition-all shadow-glow-cyan flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-navy-950" />
                    <span>Analyzing Heuristic Rules...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-navy-950" />
                    <span>Scan UPI Request</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Educational Note */}
          <div className="mt-6 p-4 rounded-xl bg-navy-950/70 border border-slate-800 text-xs text-slate-400 leading-relaxed">
            <span className="text-amber-400 font-semibold flex items-center gap-1.5 mb-1">
              <AlertCircle className="w-3.5 h-3.5" /> Notice
            </span>
            This tool performs static heuristic format analysis and risk pattern matching. It does not verify bank account balances or claim official NPCI account registry ownership.
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-5 space-y-4">
          {result ? (
            <>
              <RiskMeter score={result.score} category={result.category} />

              <div className="cyber-card p-5 border-slate-800 space-y-4">
                <div>
                  <h4 className="text-xs font-mono uppercase text-slate-400">Security Recommendation</h4>
                  <p className="text-sm font-semibold text-white mt-1">
                    {result.suggestedAction}
                  </p>
                </div>

                <div className="border-t border-slate-800 pt-3">
                  <h4 className="text-xs font-mono uppercase text-slate-400">Heuristic Explanation</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {result.explanation}
                  </p>
                </div>

                <div className="border-t border-slate-800 pt-3">
                  <IndicatorsList indicators={result.indicators} />
                </div>
              </div>
            </>
          ) : (
            <div className="cyber-card p-8 border-dashed border-slate-800 text-center flex flex-col items-center justify-center min-h-[320px]">
              <div className="p-3 rounded-full bg-navy-950 border border-slate-800 text-slate-500 mb-3">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-semibold text-slate-300">Ready for UPI Inspection</h3>
              <p className="text-xs text-slate-400 max-w-xs mt-1">
                Enter any suspicious UPI ID, payment link, or collect request remarks to check for deception patterns.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

