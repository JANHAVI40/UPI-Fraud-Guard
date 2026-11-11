import React from 'react';
import { 
  ShieldCheck, 
  PhoneCall, 
  AlertTriangle, 
  ExternalLink, 
  Clock, 
  HelpCircle, 
  FileCheck,
  CheckCircle2,
  XCircle
} from 'lucide-react';

export const FraudAwarenessPage: React.FC = () => {
  const commonScams = [
    {
      title: '1. The "Enter PIN to Receive Money" Scam',
      badge: 'Most Common',
      badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
      description: 'Fraudster sends a collect request or QR code pretending to transfer cashback, OLX payment, or lottery winnings.',
      trap: 'They say: "Please enter your UPI PIN to accept ₹25,000 into your bank account."',
      reality: 'UPI PIN is strictly an authentication factor for DEBITING your account. You NEVER enter a PIN to receive or accept funds.',
    },
    {
      title: '2. Fake Google SEO Customer Care Numbers',
      badge: 'High Loss',
      badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      description: 'Scammers create fake websites and Google Maps business entries with fake helpline numbers for Swiggy, Zomato, SBI, or Airlines.',
      trap: 'When you call them for a refund, they convince you to download a remote access app or share a screen share code.',
      reality: 'Always look up support numbers inside the official app or on the reverse side of your bank debit card.',
    },
    {
      title: '3. Electricity Bill Disconnection Threat',
      badge: 'Extortion',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      description: 'Victims receive an SMS claiming their electricity will be disconnected tonight at 9:30 PM due to unpaid dues.',
      trap: 'SMS lists a 10-digit mobile number for the "electricity officer" and asks to pay ₹10 via an APK link to avoid blackout.',
      reality: 'Power discoms never send disconnection threats from personal 10-digit phone numbers or demand APK installations.',
    },
    {
      title: '4. Screen Sharing App Exploits (AnyDesk / RustDesk)',
      badge: 'Account Takeover',
      badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      description: 'Pretending to assist with failed transactions or KYC verification, callers instruct users to install remote screen viewing tools.',
      trap: 'Once installed, they read your SMS OTPs and observe your UPI PIN while you type it.',
      reality: 'Never install remote screen-sharing tools upon instructions from unknown telephone callers.',
    },
  ];

  const safetyRules = [
    {
      do: 'Keep UPI PIN confidential from everyone, including bank managers and relatives.',
      dont: 'Never enter your UPI PIN to claim prizes, refunds, or lottery winnings.',
    },
    {
      do: 'Verify merchant name on the payment confirmation screen before entering PIN.',
      dont: 'Do not click on unverified short URLs received via SMS or WhatsApp forwards.',
    },
    {
      do: 'Set daily UPI transaction limits in your banking app for enhanced safety.',
      dont: 'Never install .APK files or remote apps sent over WhatsApp or Telegram.',
    },
    {
      do: 'Report any unauthorized debit immediately within 2 hours to helpline 1930.',
      dont: 'Never approve unexpected collect requests on PhonePe, Google Pay, or Paytm.',
    },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-cyber-cyan" />
          <h1 className="text-2xl font-bold text-white">Indian UPI Fraud Awareness & Defense Guide</h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Master the modus operandi of cyber fraudsters in India and learn how to react during the critical "Golden Hour".
        </p>
      </div>

      {/* Emergency 1930 Golden Hour Banner */}
      <div className="cyber-card p-6 sm:p-8 border-rose-500/40 bg-gradient-to-r from-rose-950/60 via-navy-900 to-navy-950 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-mono">
              <Clock className="w-3.5 h-3.5 animate-pulse text-rose-400" />
              <span>THE GOLDEN HOUR RULE (FIRST 2 TO 3 HOURS)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Immediate Response: National Cyber Helpline 1930
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              If money has been fraudulently debited from your account via UPI, dial <strong className="text-white font-mono">1930</strong> immediately or submit an incident report at <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="text-cyber-cyan underline">cybercrime.gov.in</a>. Indian law enforcement coordinates with partner banks to freeze recipient mule accounts before funds are withdrawn at ATMs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0 w-full md:w-auto">
            <a
              href="tel:1930"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold flex items-center justify-center gap-2 text-sm shadow-lg shadow-rose-900/30 transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call 1930 Now</span>
            </a>
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-navy-800 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold flex items-center justify-center gap-2 text-sm transition-all"
            >
              <span>Cybercrime Portal</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Common Indian UPI Scam Modus Operandi */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            Common Indian UPI Scams: Modus Operandi
          </h2>
          <p className="text-xs text-slate-400">
            Deconstruct how cybercriminals deceive unsuspecting users into transferring funds
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {commonScams.map((scam, idx) => (
            <div key={idx} className="cyber-card p-5 border-slate-800 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-sm font-bold text-white">{scam.title}</h3>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${scam.badgeColor}`}>
                    {scam.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {scam.description}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-500/20 text-rose-300">
                  <strong className="block text-[11px] text-rose-400 uppercase font-mono">The Trap:</strong>
                  {scam.trap}
                </div>
                <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-emerald-300">
                  <strong className="block text-[11px] text-emerald-400 uppercase font-mono">Security Reality:</strong>
                  {scam.reality}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Do's and Don'ts Checklist */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-cyber-cyan" />
            NPCI & RBI Safety Guidelines: Do's and Don'ts
          </h2>
        </div>

        <div className="cyber-card border-slate-800 divide-y divide-slate-800/80">
          {safetyRules.map((rule, idx) => (
            <div key={idx} className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono uppercase text-emerald-400 font-bold block">DO</span>
                  <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">{rule.do}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-mono uppercase text-rose-400 font-bold block">DON'T</span>
                  <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">{rule.dont}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Reporting Hierarchy */}
      <div className="cyber-card p-6 border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-cyber-cyan" />
          Steps to Take Immediately After an Unauthorized Debit
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300 leading-relaxed">
          <li><strong>Step 1:</strong> Call <strong>1930</strong> (National Cybercrime Reporting Helpline) within minutes with transaction UTR / Reference ID and sender/receiver bank names.</li>
          <li><strong>Step 2:</strong> Immediately call your issuing bank's official 24x7 emergency helpline to temporarily freeze your UPI services and block internet banking.</li>
          <li><strong>Step 3:</strong> File an official written cyber complaint on <strong>cybercrime.gov.in</strong> and retain the acknowledgment token number for bank claims.</li>
          <li><strong>Step 4:</strong> Submit the cyber acknowledgment slip to your bank branch within 3 days for zero-liability consideration under RBI Circular on Limited Liability in Unauthorized Electronic Transactions.</li>
        </ol>
      </div>
    </div>
  );
};
