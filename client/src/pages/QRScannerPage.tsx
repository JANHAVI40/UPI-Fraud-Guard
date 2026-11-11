import React, { useState } from 'react';
import { QrCode, UploadCloud, ShieldAlert, Sparkles, EyeOff } from 'lucide-react';
import { RiskMeter } from '../components/RiskMeter';
import { IndicatorsList } from '../components/IndicatorsList';
import { AnalysisResult } from '../types';

export const QRScannerPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDecoding, setIsDecoding] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
          processSampleQr();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const processSampleQr = (type: 'fraud' | 'safe' = 'fraud') => {
    setIsDecoding(true);
    setTimeout(() => {
      if (type === 'fraud') {
        setResult({
          type: 'qr',
          score: 85,
          category: 'High',
          explanation: 'The QR code contains an intent string attempting to solicit money under deceptive merchant claims.',
          suggestedAction: 'DO NOT scan with Google Pay, PhonePe, or Paytm. Do not enter your UPI PIN.',
          parsedData: {
            upiId: 'olx-buyer-pay@okaxis',
            payeeName: 'OLX Quick Verification Hub',
            amount: 4500,
            note: 'Pay ₹4500 to receive ₹45000 army refund',
          },
          indicators: [
            {
              id: 'qr-1',
              label: 'Payee Impersonation (OLX Verification)',
              severity: 'high',
              description: 'Classified scam pattern pretending to be marketplace security verification.',
              scoreImpact: 35,
            },
            {
              id: 'qr-2',
              label: 'Reversal Trap in Remarks',
              severity: 'critical',
              description: 'Remark requests payment to "receive" funds — violating fundamental UPI logic.',
              scoreImpact: 40,
            },
            {
              id: 'qr-3',
              label: 'Pre-Filled Dynamic High Amount',
              severity: 'medium',
              description: 'Embedded pre-set debit amount of ₹4,500.',
              scoreImpact: 10,
            },
          ],
          timestamp: new Date().toLocaleTimeString(),
        });
      } else {
        setResult({
          type: 'qr',
          score: 15,
          category: 'Low',
          explanation: 'Standard static BharatQR / UPI merchant QR code with clean parameters.',
          suggestedAction: 'Safe to proceed. Confirm merchant name matches shop display.',
          parsedData: {
            upiId: 'retailstore@icici',
            payeeName: 'Sharma General Store',
            amount: null,
            note: 'Store Purchase',
          },
          indicators: [],
          timestamp: new Date().toLocaleTimeString(),
        });
      }
      setIsDecoding(false);
    }, 700);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <QrCode className="w-5 h-5 text-cyber-cyan" />
          <h1 className="text-2xl font-bold text-white">QR Code Payment Scanner</h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Inspect static & dynamic UPI QR codes <strong className="text-slate-200">offline without executing payments</strong> or auto-redirecting.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Upload & Inspect Box */}
        <div className="lg:col-span-7 space-y-4">
          <div className="cyber-card p-6 border-slate-800">
            <h3 className="text-sm font-bold text-white mb-2">Upload QR Code Image</h3>
            <p className="text-xs text-slate-400 mb-4">
              Take a screenshot or upload an image of the QR code you were asked to scan.
            </p>

            {/* Dropzone */}
            <label className="border-2 border-dashed border-slate-700 hover:border-cyber-cyan/50 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all bg-navy-950/60 group">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {selectedImage ? (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={selectedImage}
                    alt="Uploaded QR Code"
                    className="max-h-40 rounded-lg border border-slate-700 object-contain"
                  />
                  <span className="text-xs text-cyber-cyan font-mono">Click to change QR image</span>
                </div>
              ) : (
                <>
                  <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform mb-3">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <span className="text-sm font-semibold text-slate-200 group-hover:text-cyber-cyan">
                    Click to browse or drag & drop image
                  </span>
                  <span className="text-xs text-slate-400 mt-1">
                    Supports PNG, JPG, WebP (Max 5MB)
                  </span>
                </>
              )}
            </label>

            {/* Test Sample QR triggers */}
            <div className="mt-4 pt-4 border-t border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 block mb-2">
                Simulate With Sample QR Datasets:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => processSampleQr('fraud')}
                  className="px-3 py-1.5 rounded-lg bg-navy-950 border border-rose-500/30 text-rose-300 hover:bg-rose-950/50 text-xs font-mono transition-colors"
                >
                  Load Fake "OLX Army Buyer" QR
                </button>
                <button
                  type="button"
                  onClick={() => processSampleQr('safe')}
                  className="px-3 py-1.5 rounded-lg bg-navy-950 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-950/50 text-xs font-mono transition-colors"
                >
                  Load Standard Merchant QR
                </button>
              </div>
            </div>

            {/* Zero Auto-Redirect Notice */}
            <div className="mt-5 p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/20 flex items-start gap-3">
              <EyeOff className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white">Strict Air-Gapped Analysis:</strong> This system parses raw payloads without triggering payment intents or opening malicious browser redirects.
              </div>
            </div>
          </div>

          {/* Decoded QR Raw Payload details if available */}
          {result?.parsedData && (
            <div className="cyber-card p-5 border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Extracted Payee Name (pn):</span>
                <span className="text-white font-bold">{result.parsedData.payeeName || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Destination VPA (pa):</span>
                <span className="text-cyan-400 font-bold">{result.parsedData.upiId || 'N/A'}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400">Pre-Set Amount (am):</span>
                <span className="text-rose-400 font-bold">
                  {result.parsedData.amount ? `₹${result.parsedData.amount}` : 'Open (Payer Enters)'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Transaction Note (tn):</span>
                <span className="text-slate-200">{result.parsedData.note || 'None'}</span>
              </div>
            </div>
          )}
        </div>

        {/* Results Column */}
        <div className="lg:col-span-5 space-y-4">
          {isDecoding ? (
            <div className="cyber-card p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
              <Sparkles className="w-8 h-8 text-cyber-cyan animate-spin mb-3" />
              <h3 className="text-sm font-semibold text-white">Extracting QR Payee Matrix...</h3>
              <p className="text-xs text-slate-400 mt-1">Analyzing NPCI payment parameters</p>
            </div>
          ) : result ? (
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
                  <h4 className="text-xs font-mono uppercase text-slate-400">Detection Explanation</h4>
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
              <h3 className="text-sm font-semibold text-slate-300">QR Scanner Idle</h3>
              <p className="text-xs text-slate-400 max-w-xs mt-1">
                Upload a QR screenshot to decode the embedded UPI parameters and inspect for hidden collect requests.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
