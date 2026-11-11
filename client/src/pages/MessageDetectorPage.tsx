import React, { useState } from 'react';
import { MessageSquareWarning, Sparkles, Send, ShieldAlert, AlertTriangle } from 'lucide-react';
import { RiskMeter } from '../components/RiskMeter';
import { IndicatorsList } from '../components/IndicatorsList';
import { AnalysisResult } from '../types';

export const MessageDetectorPage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const sampleMessages = [
    {
      label: 'Fake KYC / SIM Block',
      text: 'Dear Customer, Your SBI account KYC has expired. Your account & ATM will be blocked within 24 hrs. Please update KYC now by downloading APK: http://bit.ly/sbi-kyc-fix',
    },
    {
      label: 'Electricity Cut-off Scam',
      text: 'Dear Consumer, Your electricity power will be disconnected tonight at 9:30 PM from the electricity office because your previous month bill was not updated. Please immediately contact our electricity officer Mr. Sharma on 9876543210.',
    },
    {
      label: 'Lottery / Cashback Winner',
      text: 'Congratulations! You have won Rs 4,999 cashback in GPay Diwali Lucky Draw. Click here to claim your reward instantly to your bank account: upi://pay?pa=claimreward@okaxis&pn=GPayOffer&am=1',
    },
    {
      label: 'Part-Time Job / Telegram Scam',
      text: 'Earn Rs 3000 to 8000 daily by simply liking YouTube videos! No investment required. Contact our HR manager on Telegram @EarnFastIndia for instant payout.',
    },
  ];

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsScanning(true);

    setTimeout(() => {
      const lower = message.toLowerCase();
      const indicators = [];
      let score = 10;

      // Rule 1: KYC / Account Block threats
      if (lower.includes('kyc') && (lower.includes('block') || lower.includes('suspend') || lower.includes('expire'))) {
        indicators.push({
          id: 'msg-kyc',
          label: 'Fake KYC / Account Suspension Threat',
          severity: 'critical' as const,
          description: 'Banks never threaten immediate 24-hr account closure via SMS or ask to update KYC via third-party links/APKs.',
          scoreImpact: 40,
        });
        score += 40;
      }

      // Rule 2: Electricity / Utility disconnection
      if (lower.includes('electricity') || lower.includes('power') || lower.includes('disconnected tonight')) {
        indicators.push({
          id: 'msg-utility',
          label: 'Impersonation of State Electricity Department',
          severity: 'critical' as const,
          description: 'High-frequency scam pattern urging victims to call a personal mobile number to avert immediate blackout.',
          scoreImpact: 35,
        });
        score += 35;
      }

      // Rule 3: Cashback / Lottery claims
      if (lower.includes('cashback') || lower.includes('congratulations') || lower.includes('won') || lower.includes('lucky draw')) {
        indicators.push({
          id: 'msg-reward',
          label: 'Deceptive Lottery / Reward Baits',
          severity: 'high' as const,
          description: 'Fake reward links are used to deceive users into initiating UPI debits or sharing OTPs.',
          scoreImpact: 30,
        });
        score += 30;
      }

      // Rule 4: Suspicious Links / Shorteners
      if (lower.includes('bit.ly') || lower.includes('tinyurl') || lower.includes('.apk') || lower.includes('http://') || lower.includes('.xyz')) {
        indicators.push({
          id: 'msg-url',
          label: 'Unverified URL / Malicious APK Link',
          severity: 'high' as const,
          description: 'Links in unprompted SMS commonly lead to screen-sharing app downloads or phishing portals.',
          scoreImpact: 30,
        });
        score += 30;
      }

      // Rule 5: PIN / OTP manipulation
      if (lower.includes('otp') || lower.includes('upi pin') || lower.includes('pin to receive')) {
        indicators.push({
          id: 'msg-pin',
          label: 'Credential Solicit / PIN Manipulation',
          severity: 'critical' as const,
          description: 'Attempting to extract confidential OTPs or convincing the recipient that entering a PIN credits funds.',
          scoreImpact: 45,
        });
        score += 45;
      }

      score = Math.min(score, 100);
      const category = score > 80 ? 'Critical' : score > 60 ? 'High' : score > 30 ? 'Medium' : 'Low';

      setResult({
        type: 'message',
        score,
        category,
        explanation: score > 60
          ? 'Clear social engineering and phishing tactics detected in this message. Do NOT call the sender or tap any links.'
          : 'Low threat profile. However, always exercise skepticism with unexpected transactional SMS messages.',
        suggestedAction: score > 60
          ? 'DELETE this message immediately. Do not dial the number, do not download any files or APKs, and report sender to 1930.'
          : 'Verify any unexpected claims directly through your official banking app.',
        indicators,
        timestamp: new Date().toLocaleTimeString(),
      });

      setIsScanning(false);
    }, 600);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <MessageSquareWarning className="w-5 h-5 text-cyber-cyan" />
          <h1 className="text-2xl font-bold text-white">Scam Message & SMS Phishing Detector</h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Paste suspicious SMS, WhatsApp, or Telegram messages to uncover fake KYC, electricity shutoff threats, or fraudulent cashback lures.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Text Form */}
        <div className="lg:col-span-7 cyber-card p-6 border-slate-800">
          <form onSubmit={handleScan} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-semibold">
                Message Content <span className="text-rose-400">*</span>
              </label>
              <textarea
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Paste the suspicious SMS, WhatsApp message, or email body here..."
                className="w-full bg-navy-950 border border-slate-700 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan font-sans resize-none"
                required
              />
            </div>

            {/* Quick Test Samples */}
            <div>
              <span className="text-[11px] font-mono text-slate-400 block mb-2">
                Or Test With Common Indian Scam Templates:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {sampleMessages.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setMessage(s.text)}
                    className="p-2.5 text-left rounded-xl bg-navy-950/70 border border-slate-800 hover:border-cyber-cyan/40 text-xs text-slate-300 hover:text-white transition-colors"
                  >
                    <span className="font-semibold text-cyber-cyan block mb-0.5">{s.label}</span>
                    <span className="text-slate-400 line-clamp-1 text-[11px]">{s.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isScanning}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-navy-950 font-bold transition-all shadow-glow-cyan flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isScanning ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-navy-950" />
                    <span>Analyzing Social Engineering Patterns...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-navy-950" />
                    <span>Inspect Message Threat Level</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Golden Awareness reminder */}
          <div className="mt-5 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Rule of Thumb:</strong> Official bank notifications will always use registered sender IDs (like <code className="bg-navy-950 px-1 py-0.5 rounded text-white">VM-HDFCBK</code> or <code className="bg-navy-950 px-1 py-0.5 rounded text-white">AD-SBIINB</code>), never a regular 10-digit private mobile phone number.
            </span>
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-5 space-y-4">
          {result ? (
            <>
              <RiskMeter score={result.score} category={result.category} />

              <div className="cyber-card p-5 border-slate-800 space-y-4">
                <div>
                  <h4 className="text-xs font-mono uppercase text-slate-400">Recommended Next Steps</h4>
                  <p className="text-sm font-semibold text-white mt-1">
                    {result.suggestedAction}
                  </p>
                </div>

                <div className="border-t border-slate-800 pt-3">
                  <h4 className="text-xs font-mono uppercase text-slate-400">Linguistic Threat Analysis</h4>
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
              <h3 className="text-sm font-semibold text-slate-300">Awaiting Message Input</h3>
              <p className="text-xs text-slate-400 max-w-xs mt-1">
                Paste any suspicious SMS, WhatsApp forward, or email notification to parse urgency lures and impersonation patterns.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

