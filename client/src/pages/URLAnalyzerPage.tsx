import React, { useState } from 'react';
import { Globe, ShieldAlert, Sparkles, Send, EyeOff } from 'lucide-react';
import { RiskMeter } from '../components/RiskMeter';
import { IndicatorsList } from '../components/IndicatorsList';
import { AnalysisResult } from '../types';

export const URLAnalyzerPage: React.FC = () => {
  const [urlInput, setUrlInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const sampleUrls = [
    {
      label: 'Lookalike Bank Domain',
      url: 'https://sbi-card-reward-points-claim.top/login',
    },
    {
      label: 'IP-Hosted Phishing URL',
      url: 'http://185.220.101.5/hdfc/netbanking/secure.php',
    },
    {
      label: 'URL Shortener Redirection Trap',
      url: 'https://tinyurl.com/update-pan-aadhaar-kyc',
    },
    {
      label: 'Legitimate Official Domain',
      url: 'https://retail.onlinesbi.sbi/retail/login.htm',
    },
  ];

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    setIsScanning(true);

    setTimeout(() => {
      let raw = urlInput.trim();
      if (!raw.startsWith('http://') && !raw.startsWith('https://')) {
        raw = 'https://' + raw;
      }

      const indicators = [];
      let score = 5;

      try {
        const parsed = new URL(raw);
        const host = parsed.hostname.toLowerCase();

        // 1. IP address check
        const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
        if (ipRegex.test(host)) {
          indicators.push({
            id: 'url-ip',
            label: 'Raw IP Address Hostname',
            severity: 'critical' as const,
            description: 'Legitimate financial services and UPI portals never use bare IP addresses instead of registered domain names.',
            scoreImpact: 45,
          });
          score += 45;
        }

        // 2. Punycode check
        if (host.includes('xn--')) {
          indicators.push({
            id: 'url-punycode',
            label: 'Punycode Homograph Indicator (xn--)',
            severity: 'critical' as const,
            description: 'Punycode is frequently weaponized to spoof letters (e.g. Cyrillic letters looking identical to Latin letters).',
            scoreImpact: 40,
          });
          score += 40;
        }

        // 3. Shortener check
        const shorteners = ['bit.ly', 'tinyurl.com', 'is.gd', 'cutt.ly', 't.co', 'rb.gy'];
        if (shorteners.some((s) => host.includes(s))) {
          indicators.push({
            id: 'url-shortener',
            label: 'Obfuscated URL Shortener Service',
            severity: 'high' as const,
            description: 'URL shorteners hide the real destination, preventing visual verification of the destination server.',
            scoreImpact: 35,
          });
          score += 35;
        }

        // 4. Suspicious TLDs
        const suspiciousTlds = ['.top', '.xyz', '.work', '.club', '.online', '.site', '.click', '.buzz', '.info'];
        if (suspiciousTlds.some((tld) => host.endsWith(tld))) {
          indicators.push({
            id: 'url-tld',
            label: 'Disposable / High-Abuse Top-Level Domain (TLD)',
            severity: 'high' as const,
            description: 'Cheap or free TLDs are predominantly chosen by phishing operators to spin up transient websites.',
            scoreImpact: 30,
          });
          score += 30;
        }

        // 5. Lookalike keywords for Indian Banks
        const bankKeywords = ['sbi', 'hdfc', 'icici', 'axis', 'paytm', 'phonepe', 'gpay', 'kyc', 'reward', 'points', 'gift'];
        const matched = bankKeywords.filter((kw) => host.includes(kw));
        const legitDomains = ['onlinesbi.sbi', 'sbi.co.in', 'hdfcbank.com', 'icicibank.com', 'axisbank.com', 'paytm.com', 'phonepe.com'];

        if (matched.length > 0 && !legitDomains.some((d) => host.endsWith(d))) {
          indicators.push({
            id: 'url-lookalike',
            label: `Brand Spoofing / Lookalike Pattern (${matched.join(', ')})`,
            severity: 'critical' as const,
            description: 'Domain mimics Indian banking or payment providers but does not resolve to an official registered parent domain.',
            scoreImpact: 45,
          });
          score += 45;
        }

        // 6. HTTP unencrypted
        if (parsed.protocol === 'http:') {
          indicators.push({
            id: 'url-http',
            label: 'Unencrypted HTTP Connection',
            severity: 'medium' as const,
            description: 'No TLS encryption. Authentic payment systems mandate secure HTTPS connections.',
            scoreImpact: 20,
          });
          score += 20;
        }

        score = Math.min(score, 100);
        const category = score > 80 ? 'Critical' : score > 60 ? 'High' : score > 30 ? 'Medium' : 'Low';

        setResult({
          type: 'url',
          score,
          category,
          explanation: score > 60
            ? 'Structural analysis indicates a malicious spoofed domain or phishing destination.'
            : 'Standard domain syntax. Check domain authenticity carefully before providing personal details.',
          suggestedAction: score > 60
            ? 'DO NOT OPEN THIS LINK. Do not submit passwords, card numbers, or UPI details on this site.'
            : 'Always confirm the exact domain name matches your official bank records.',
          indicators,
          parsedData: {
            url: raw,
            domain: host,
            scheme: parsed.protocol.replace(':', ''),
          },
          timestamp: new Date().toLocaleTimeString(),
        });
      } catch (err) {
        setResult({
          type: 'url',
          score: 85,
          category: 'High',
          explanation: 'Malformed or structurally invalid URL string.',
          suggestedAction: 'Do not click or paste strange URI parameters into your browser.',
          indicators: [
            {
              id: 'url-invalid',
              label: 'Malformed Uniform Resource Identifier',
              severity: 'high',
              description: 'URL cannot be parsed under standard RFC URI specifications.',
              scoreImpact: 40,
            },
          ],
          timestamp: new Date().toLocaleTimeString(),
        });
      }

      setIsScanning(false);
    }, 600);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-cyber-cyan" />
          <h1 className="text-2xl font-bold text-white">Phishing URL & Lookalike Domain Analyzer</h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Detect spoofed banking portals, Punycode tricks, URL shorteners, and IP-hosted traps <strong className="text-slate-200">without loading the malicious webpage</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input URL Box */}
        <div className="lg:col-span-7 cyber-card p-6 border-slate-800">
          <form onSubmit={handleScan} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5 font-semibold">
                Suspicious Link or Domain <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="e.g. https://sbi-verification-secure.xyz or bit.ly/3xyz..."
                className="w-full bg-navy-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan font-mono"
                required
              />
            </div>

            {/* Quick Samples */}
            <div>
              <span className="text-[11px] font-mono text-slate-400 block mb-2">
                Quick Test Samples:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {sampleUrls.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setUrlInput(s.url)}
                    className="p-2.5 text-left rounded-xl bg-navy-950/70 border border-slate-800 hover:border-cyber-cyan/40 text-xs text-slate-300 hover:text-white transition-colors"
                  >
                    <span className="font-semibold text-cyber-cyan block mb-0.5">{s.label}</span>
                    <span className="text-slate-400 font-mono text-[11px] truncate block">{s.url}</span>
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
                    <span>Analyzing Domain Structure...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-navy-950" />
                    <span>Inspect Phishing Indicators</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Air-gap sandbox reassurance */}
          <div className="mt-5 p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/20 flex items-start gap-3">
            <EyeOff className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">Zero Browser Execution:</strong> We perform static lexical URL analysis locally. Your browser is never instructed to connect to or download payloads from the target host.
            </div>
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
                  <h4 className="text-xs font-mono uppercase text-slate-400">Lexical Analysis</h4>
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
              <h3 className="text-sm font-semibold text-slate-300">URL Inspector Ready</h3>
              <p className="text-xs text-slate-400 max-w-xs mt-1">
                Paste any link from an SMS, email, or chat message to check for spoofed bank domains or sneaky URL shorteners.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
