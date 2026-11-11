import React from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  MessageSquareWarning, 
  Globe, 
  ArrowRight, 
  Lock, 
  Zap, 
  PhoneCall, 
  ChevronRight,
  Fingerprint,
  FileSearch
} from 'lucide-react';

interface LandingPageProps {
  setActiveTab: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setActiveTab }) => {
  const modules = [
    {
      id: 'upi',
      title: 'UPI Payment Analyzer',
      desc: 'Verify UPI IDs, validate NPCI payment URIs, detect collect request traps and PIN manipulation phrasing.',
      icon: CreditCard,
      color: 'from-cyan-500/20 to-blue-500/10',
      border: 'border-cyan-500/30 hover:border-cyan-400',
      iconColor: 'text-cyan-400',
      tag: 'VPA & URIs',
    },
    {
      id: 'qr',
      title: 'Static & Dynamic QR Scanner',
      desc: 'Decode payment QR codes offline, extract merchant VPAs, inspect hidden amount overrides and intent exploits.',
      icon: QrCode,
      color: 'from-blue-500/20 to-indigo-500/10',
      border: 'border-blue-500/30 hover:border-blue-400',
      iconColor: 'text-blue-400',
      tag: 'Zero-Redirect',
    },
    {
      id: 'message',
      title: 'Scam Message Detector',
      desc: 'Inspect SMS & WhatsApp messages for fake KYC expiry, lottery rewards, fake refunds, and urgent threat lures.',
      icon: MessageSquareWarning,
      color: 'from-purple-500/20 to-pink-500/10',
      border: 'border-purple-500/30 hover:border-purple-400',
      iconColor: 'text-purple-400',
      tag: 'Heuristic NLP',
    },
    {
      id: 'url',
      title: 'Phishing URL Analyzer',
      desc: 'Examine payment links for IP hosting, Punycode tricks, URL shorteners, and fake banking subdomains.',
      icon: Globe,
      color: 'from-emerald-500/20 to-teal-500/10',
      border: 'border-emerald-500/30 hover:border-emerald-400',
      iconColor: 'text-emerald-400',
      tag: 'Lookalike Defense',
    },
  ];

  const safetyRules = [
    {
      title: 'Golden Rule of UPI',
      text: 'You NEVER enter your UPI PIN to receive money or get a refund. Entering your PIN ALWAYS debits your account.',
      accent: 'border-amber-500/40 bg-amber-500/5 text-amber-300',
    },
    {
      title: 'Collect Request Scam',
      text: 'Fraudsters send a "Collect Request" disguised as a credit or cashback. Approving it transfers your money to them.',
      accent: 'border-rose-500/40 bg-rose-500/5 text-rose-300',
    },
    {
      title: 'QR Code Scam',
      text: 'Scanning a QR code is strictly for making payments, never for receiving money or winning lottery prizes.',
      accent: 'border-cyan-500/40 bg-cyan-500/5 text-cyan-300',
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-navy-900/90 via-navy-950 to-navy-950 p-6 sm:p-10 lg:p-14">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-1/4 -z-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 -z-0 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs font-mono text-cyan-400">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>CREDIT-FREE HEURISTIC CYBER DEFENSE</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">100% Free & Open Engine</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Real-Time Defense Against <br />
            <span className="cyber-gradient-text">UPI Fraud & Payment Traps</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
            Protect your hard-earned money. Scan suspicious UPI handles, inspect payment QR codes before scanning, detect phishing URLs, and analyze fraudulent SMS or WhatsApp messages using a privacy-first heuristic detection engine.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => setActiveTab('upi')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-navy-950 font-bold hover:shadow-glow-cyan transition-all transform hover:-translate-y-0.5"
            >
              <CreditCard className="w-5 h-5 text-navy-950" />
              <span>Start Quick Scan</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-800 hover:bg-slate-800 text-white font-semibold border border-slate-700 transition-all"
            >
              <FileSearch className="w-5 h-5 text-cyber-cyan" />
              <span>View Security Dashboard</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>Instant Heuristics</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Lock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Zero Credentials Stored</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Fingerprint className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span>Explainable Scores</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span>Indian NPCI Aligned</span>
            </div>
          </div>

        </div>
      </section>

      {/* 4 Core Inspection Modules Grid */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyber-cyan" />
            Detection & Analysis Modules
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Select a specialized security tool to analyze incoming payment requests or communication
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                onClick={() => setActiveTab(m.id)}
                className={`group cursor-pointer p-6 rounded-2xl bg-gradient-to-br ${m.color} border ${m.border} bg-navy-900/60 backdrop-blur-md transition-all duration-300 hover:shadow-glow-card relative overflow-hidden`}
              >
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl bg-navy-950/80 border border-slate-800 ${m.iconColor} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-navy-950/70 border border-slate-800 text-slate-300">
                    {m.tag}
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="text-base font-bold text-white group-hover:text-cyber-cyan transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
                    {m.desc}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-cyber-cyan group-hover:translate-x-1 transition-transform">
                  <span>Open Scanner</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Golden Rules & Awareness Alert */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Critical UPI Safety Knowledge
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Understanding the core mechanics of UPI scams prevents over 90% of financial losses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {safetyRules.map((rule, idx) => (
            <div key={idx} className={`p-5 rounded-2xl border ${rule.accent}`}>
              <h4 className="font-bold text-sm text-white mb-2">{rule.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{rule.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cybercrime Helpline 1930 Emergency Banner */}
      <section className="p-6 rounded-2xl border border-rose-500/30 bg-gradient-to-r from-rose-950/40 via-navy-900 to-navy-950 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex-shrink-0 animate-pulse">
            <PhoneCall className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-rose-400 font-bold tracking-wider">
                Financial Cybercrime Emergency
              </span>
              <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded border border-rose-500/30">
                Golden Hour
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
              Defrauded? Immediately Dial 1930
            </h3>
            <p className="text-xs text-slate-400 max-w-xl mt-1 leading-relaxed">
              Dialing 1930 within the first 2-3 hours enables law enforcement to freeze the fraudulent destination account before funds are siphoned away. You can also register a complaint at{' '}
              <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="text-cyan-400 underline hover:text-cyan-300">
                cybercrime.gov.in
              </a>.
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('awareness')}
          className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-colors flex items-center gap-2"
        >
          <span>Reporting Guide</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

    </div>
  );
};

