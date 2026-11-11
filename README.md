# 🛡️ UPI Fraud Guard

> **A Real-Time Cybersecurity & Heuristic Fraud Detection Platform for Indian Digital Payments.**

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Helpline](https://img.shields.io/badge/Cybercrime%20Helpline-1930-red?logo=phone&logoColor=white)](tel:1930)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📌 Overview

**UPI Fraud Guard** is a lightweight, privacy-focused cybersecurity web application built to protect everyday Indian internet users from payment fraud, malicious QR codes, phishing URLs, and social-engineering scams across SMS and WhatsApp.

With over 14 billion monthly UPI transactions in India, fraud modalities like **fake collect requests**, **tampered merchant QR codes**, **electricity shutoff panic threats**, and **spoofed banking domains** have surged. 

**UPI Fraud Guard solves this without expensive external APIs or opaque black-box AI.** It operates a modular, deterministic, explainable heuristic scoring engine running entirely locally and in client/server code.

---

## ✨ Key Capabilities

### 1. 💳 UPI Payment & VPA Analyzer
* **NPCI Protocol Inspection:** Deep-parses `upi://pay` URI schemes extracting Payee Virtual Address (`pa`), Payee Name (`pn`), Amount (`am`), Transaction Note (`tn`), and Merchant Code (`mc`).
* **Collect Request Trap Detection:** Flags deceptive refund/cashback keywords (`claim-reward`, `sbi-refund`, `lottery-gpay`).
* **PIN Manipulation Alerts:** Detects social engineering phrasing directing users to enter a PIN to "receive" funds.
* **Explainable Penalties:** Returns exact itemized risk penalties rather than opaque ratings.

### 2. 🏁 Air-Gapped QR Code Scanner
* **Offline Image Decoding:** Upload any screenshot or photograph of a QR code to extract its underlying intent payload.
* **Zero-Auto-Redirect Guarantee:** Never initiates payments or triggers device URI handlers (`upi://`) without user consent.
* **Payee Matrix Audit:** Displays the embedded destination VPA, pre-filled amounts, and merchant tags before you ever scan in a banking app.

### 3. 💬 Scam Message & SMS Phishing Detector
* **Linguistic Threat Heuristics:** Identifies urgent psychological manipulation tricks in SMS, WhatsApp, and Telegram messages.
* **Targeted Threat Classes:**
  * ⚠️ **Fake KYC & SIM Deactivation:** Phony 24-hour bank account suspension threats.
  * ⚡ **Electricity Bill Cutoff:** "Power will be disconnected tonight at 9:30 PM" scam patterns.
  * 🎁 **Lottery & Cashback Rewards:** Fake Google Pay / PhonePe lucky draw winnings.
  * 💼 **Part-Time Task Extortion:** Telegram like-and-earn schemes.
  * 📲 **Malicious APK Links:** Urges to download remote access or RAT applications.

### 4. 🌐 Phishing URL & Lookalike Domain Analyzer
* **Static Lexical Analysis:** Analyzes URLs without fetching or executing malicious remote content.
* **Detection Vectors:**
  * Raw IP-based hostnames (e.g., `http://185.220.101.5/pay`).
  * Punycode homograph attacks (`xn--...`).
  * URL shorteners hiding the true destination (`bit.ly`, `tinyurl`).
  * High-abuse disposable TLDs (`.xyz`, `.top`, `.click`, `.buzz`).
  * Spoofed Indian banking keywords masquerading as official domains.

### 5. 📊 Security Intelligence Dashboard
* **Dynamic Risk Meter:** Calibrated 0–100 risk score breakdown:
  * `0–30`: **Low Risk** (Compliant NPCI format, benign)
  * `31–60`: **Medium Risk** (Anomalous parameters, exercise caution)
  * `61–80`: **High Risk** (Strong deceptive indicators, do not proceed)
  * `81–100`: **Critical Risk** (High-probability fraud, PIN extraction, or phishing)
* **Real-Time Telemetry:** Total scans, severity breakdown, and threat distribution.

### 6. 🕒 Privacy-First Scan History
* Retains threat telemetry and indicator audit logs.
* **Zero Sensitive Data Storage:** Never stores account balances, private phone contacts, or sensitive chat content.

### 7. 🛡️ Indian Fraud Awareness Hub & 1930 Integration
* Detailed breakdown of the top 4 Indian UPI scams.
* Official **NPCI & RBI Safety Guidelines (Do's and Don'ts)**.
* **The Golden Hour Protocol:** Step-by-step instructions on dialing **1930** and filing emergency disputes on [cybercrime.gov.in](https://cybercrime.gov.in) to freeze destination mule accounts within the first 2–3 hours.

---

## 🎨 Design System

UPI Fraud Guard features a **cybersecurity SaaS dark theme**:
* **Background:** Deep obsidian navy (`#070a12`, `#0b0f19`, `#0f172a`).
* **Accents:** Electric cyan (`#06b6d4`, `#00f2fe`) and cobalt blue (`#3b82f6`).
* **Highlights:** Neon purple (`#8b5cf6`) and status-coded indicator badges.
* **Typography:** `Plus Jakarta Sans` for UI, `JetBrains Mono` for cryptographic and URI payloads.
* **Interface Polish:** Subtle backdrop glassmorphism, responsive drawer navigation, and glowing borders.

---

## 🏗️ Repository Architecture

This repository uses an **npm workspaces monorepo** layout for zero-dependency overhead and unified builds:

```text
UPI FRAUD GUARD/
├── package.json              # Root workspace coordinator
├── package-lock.json
├── netlify.toml              # Netlify build & SPA redirection configuration
├── README.md
│
├── client/                   # Frontend SPA
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts        # Vite build toolchain
│   ├── tsconfig.json         # Strict TypeScript configuration
│   ├── tailwind.config.js    # Cybersecurity color palette & glow utilities
│   ├── public/
│   │   └── _redirects        # Netlify SPA fallback routing rule
│   └── src/
│       ├── main.tsx
│       ├── App.tsx           # Page router and layout shell
│       ├── index.css         # Custom scrollbars, cyber-cards, glow animations
│       ├── types/            # TypeScript interfaces (AnalysisResult, Indicators, etc.)
│       ├── components/
│       │   ├── Navbar.tsx    # Brand logo, engine status, 1930 Helpline CTA
│       │   ├── Sidebar.tsx   # Navigation for all 8 views + UPI Golden Rule
│       │   ├── RiskMeter.tsx # 0–100 Score gauge with severity badges
│       │   ├── StatCard.tsx  # Telemetry stat cards
│       │   └── IndicatorsList.tsx # Itemized red flags & score penalty cards
│       └── pages/
│           ├── LandingPage.tsx        # Hero banner & module overview
│           ├── DashboardPage.tsx      # Real-time scan telemetry & distribution
│           ├── UPIAnalyzerPage.tsx    # VPA & payment URI inspection
│           ├── QRScannerPage.tsx      # Local image decode & parameter audit
│           ├── MessageDetectorPage.tsx# SMS/WhatsApp scam detector
│           ├── URLAnalyzerPage.tsx    # Lookalike bank domain analyzer
│           ├── ScanHistoryPage.tsx    # Local privacy-safe audit logs
│           └── FraudAwarenessPage.tsx # NPCI guidelines & 1930 reporting steps
│
└── server/                   # Backend API & Detection Engine
    ├── package.json
    ├── tsconfig.json
    └── src/                  # Express endpoints, Prisma schema & rule engine
```

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended, tested on v22.x)
* `npm` (v9.x or higher)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/<your-username>/upi-fraud-guard.git
   cd "upi-fraud-guard"
   ```

2. **Install all dependencies across workspaces:**
   ```bash
   npm install
   ```

### Running Locally

To launch the frontend Vite development server:
```bash
npm --workspace=client run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### Building for Production

Compile and verify the frontend application:
```bash
npm --workspace=client run build
```
The optimized production bundle will be generated in `client/dist/`.

---

## 🌐 Deployment to Netlify

The project includes built-in Netlify support via [**`netlify.toml`**](netlify.toml) and [**`client/public/_redirects`**](client/public/_redirects).

### Option A: Git Push (Continuous Deployment)
1. Push this repository to GitHub or GitLab.
2. Link the repository in [app.netlify.com](https://app.netlify.com).
3. Netlify will auto-detect:
   * **Base directory:** `client`
   * **Build command:** `npm run build`
   * **Publish directory:** `dist`
4. Click **Deploy**.

### Option B: Netlify CLI
```bash
npm install -g netlify-cli
netlify login
npm --workspace=client run build
netlify deploy --dir=client/dist --prod
```

### Option C: Drag & Drop
1. Run `npm --workspace=client run build`.
2. Drag the generated `client/dist` folder into [app.netlify.com/drop](https://app.netlify.com/drop).

---

## 🔒 Security & Privacy Guarantees

* **Zero Credential Requests:** UPI Fraud Guard **never** prompts for, reads, or stores UPI PINs, netbanking passwords, debit card CVVs, or OTPs.
* **Air-Gapped QR Processing:** QR codes are parsed statically using canvas decoding without executing background HTTP redirects or payment triggers.
* **Non-Executing URL Scanner:** Submitted URLs are evaluated via lexical parsing of hostnames and TLDs without loading target DOMs or scripts.
* **Local Heuristic Engine:** Operates without leaking user data to third-party AI APIs or external data brokers.

---

## 🚨 Emergency Cybercrime Assistance (India)

If you or someone you know has been a victim of unauthorized UPI debit or financial fraud:

1. **Call 1930 Immediately:** The National Cybercrime Helpline operates 24/7. Filing a complaint during the **"Golden Hour"** (first 2–3 hours) allows authorities to freeze recipient mule accounts.
2. **File an Official Report:** Visit the Ministry of Home Affairs portal at **[cybercrime.gov.in](https://cybercrime.gov.in)**.
3. **Notify Your Bank:** Contact your bank's 24x7 emergency helpline to freeze UPI facilities and request an urgent chargeback/dispute form.

---

## ⚖️ Disclaimer

UPI Fraud Guard is an educational and heuristic threat-detection tool. The risk scores generated reflect static rule-based pattern matching and lexical analysis; they **do not claim to verify live bank account balances or official NPCI account registration**. Users must always verify transaction details directly through their official banking applications before approving payments.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
