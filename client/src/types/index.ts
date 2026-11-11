export type RiskCategory = 'Low' | 'Medium' | 'High' | 'Critical';

export type ScanType = 'upi' | 'qr' | 'message' | 'url';

export interface RiskIndicator {
  id: string;
  label: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  scoreImpact: number;
}

export interface AnalysisResult {
  id?: string;
  type: ScanType;
  score: number; // 0 - 100
  category: RiskCategory;
  indicators: RiskIndicator[];
  explanation: string;
  suggestedAction: string;
  parsedData?: {
    upiId?: string;
    payeeName?: string;
    amount?: number | null;
    note?: string;
    url?: string;
    scheme?: string;
    domain?: string;
    ipAddress?: string;
    detectedKeywords?: string[];
  };
  timestamp: string;
}

export interface DashboardMetrics {
  totalScans: number;
  criticalRiskScans: number;
  highRiskScans: number;
  mediumRiskScans: number;
  lowRiskScans: number;
  recentActivity: AnalysisResult[];
  categoryDistribution: {
    name: string;
    count: number;
    color: string;
  }[];
  riskTrend: {
    day: string;
    avgScore: number;
    scans: number;
  }[];
}

export interface FraudScamGuide {
  id: string;
  title: string;
  modality: string;
  redFlags: string[];
  howItWorks: string;
  preventionTips: string[];
}

