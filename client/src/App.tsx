import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { UPIAnalyzerPage } from './pages/UPIAnalyzerPage';
import { QRScannerPage } from './pages/QRScannerPage';
import { MessageDetectorPage } from './pages/MessageDetectorPage';
import { URLAnalyzerPage } from './pages/URLAnalyzerPage';
import { ScanHistoryPage } from './pages/ScanHistoryPage';
import { FraudAwarenessPage } from './pages/FraudAwarenessPage';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('landing');

  const renderActivePage = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage setActiveTab={setActiveTab} />;
      case 'dashboard':
        return <DashboardPage setActiveTab={setActiveTab} />;
      case 'upi':
        return <UPIAnalyzerPage />;
      case 'qr':
        return <QRScannerPage />;
      case 'message':
        return <MessageDetectorPage />;
      case 'url':
        return <URLAnalyzerPage />;
      case 'history':
        return <ScanHistoryPage />;
      case 'awareness':
        return <FraudAwarenessPage />;
      default:
        return <LandingPage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Cybersecurity Bar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Body with Sidebar + Active Page Container */}
      <div className="flex-1 flex flex-col lg:flex-row w-full max-w-[1600px] mx-auto">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderActivePage()}
        </main>
      </div>

      {/* Cyber Security Footer */}
      <footer className="border-t border-slate-900 bg-navy-950/80 py-4 px-6 text-center text-xs text-slate-400 font-mono flex flex-col sm:flex-row items-center justify-between gap-2 max-w-[1600px] mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>UPI FRAUD GUARD • Defense Prototype v1.0</span>
        </div>
        <div className="text-slate-400">
          Privacy-First Architecture • Indian Cybercrime Helpline: <a href="tel:1930" className="text-cyber-cyan hover:underline font-bold">1930</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
