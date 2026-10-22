# 1PERSON TRADER (11% TRADER)

> **"DISCIPLINE TODAY . FREEDOM TOMORROW"**  
> Official sales, indicator showcase, and invite-only TradingView fulfillment platform for **1PERSON TRADER**.

---

## 🚀 Overview

1PERSON TRADER is a high-performance web platform built in Next.js (App Router), TypeScript, and Tailwind CSS designed for selling proprietary Pine Script v5 indicators on TradingView.

The site is built with an editorial aesthetic: crisp white canvas (`#FFFFFF`), near-black typography (`#101828`), restrained electric cyan (`#1AC7FB`), and secondary green/navy accents strictly preserving the supplied **1PERSON TRADER** logo.

---

## 📈 Signature Interaction: Scroll-Driven Chart Story

The hallmark of the platform is a genuine scroll-driven narrative chart (not a static image or generic video loop):
- **Stage A (Structure)**: Grid, price coordinates, and market structure bounds emerge.
- **Stage B (Accumulation)**: Candlesticks and volume bars draw left-to-right toward a local low liquidity sweep.
- **Stage C (BUY Signal)**: A non-repainting **BUY SIGNAL** badge animates into position with vertical guides and structural stop-loss projections.
- **Stage D (Expansion)**: Candlesticks climb progressively with user scroll progress toward overhead resistance.
- **Stage E (SELL Signal / Rollover)**: Upper supply zone rejection triggers a **SELL SIGNAL** badge upon confirmed bar close.
- **Stage F (Natural Release)**: Natural scroll release into subsequent feature sections.
- **Reverse Scrubbing**: Scrolling upward reverses the animation deterministically without scroll-jacking or frame freezing.
- **Accessibility**: Includes interactive slider scrubber and full support for `prefers-reduced-motion`.

---

## 💳 Approved Subscriptions & Pricing

Per SRS v1.1, the website strictly adheres to three approved plans:

| Plan | Duration | Total Price | Effective Monthly Rate | Savings |
| :--- | :--- | :--- | :--- | :--- |
| **Monthly** | 1 Month | **₹4,000** | ₹4,000 / month | — |
| **Quarterly** | 3 Months | **₹10,500** | ₹3,500 / month | Save ₹1,500 |
| **Half-Yearly** | 6 Months | **₹18,000** | ₹3,000 / month | Save ₹6,000 |

*No 12-month plan or old placeholder prices are used anywhere across the catalogue, pricing page, checkout, or backend validation.*

---

## 📂 Site Architecture & Routes

| Route | Purpose |
| :--- | :--- |
| `/` | Editorial landing page with hero, scroll-driven chart story, features, interactive simulator, pricing, and FAQ. |
| `/indicators` | Catalogue of TradingView Pine Script indicator suites. |
| `/indicators/[slug]` | Deep-dive indicator documentation, timeframe matrices, installation steps, and limitations. |
| `/pricing` | Dedicated 3-tier subscription breakdown with feature comparison matrix and FAQs. |
| `/checkout` | Checkout collecting Name, Email, Phone, and TradingView Username with server-side plan recalculation. |
| `/order/success` | Order confirmation receipt and 4-step TradingView invite authorization roadmap. |
| `/order/cancelled` | Failure and cancellation handling with safe retry link. |
| `/faq` | Technical FAQ covering repainting, TradingView tiers, and activation timeframe. |
| `/contact` | Validated inquiry form with anti-spam honeypot protection and direct Instagram link. |
| `/terms` | Terms of Service for digital software subscriptions. |
| `/privacy` | Privacy Policy with strict data minimization. |
| `/refund-policy` | Transparent digital intellectual property refund rules. |
| `/risk-disclaimer` | SEBI and regulatory trading risk disclosure. |
| `/admin` | Protected operations portal for order tracking and TradingView license provisioning. |

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict typing)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React + custom SVG brand assets
- **Data Persistence**: File-backed JSON store in `data/orders.json` and `data/enquiries.json`
- **Verification**: Server-side payment validation (`/api/verify-payment`)

---

## ⚡ Quickstart & Local Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 3. Run Verification Tests
```bash
node scripts/test-suite.mjs
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm start
```

---

## 🔐 Admin Operations Portal

Access the operational portal at `/admin`.
- **Default Security PIN**: `admin1person2026`
- **Features**:
  - Live revenue metrics & active orders
  - Pending TradingView invites queue
  - 1-click status transitions (`Pending` → `Granted` → `Revoked`)
  - Customer contact inquiry management

---

## 📱 Official Social Account
- **Instagram**: [@1PERSON_TRADER](https://instagram.com/1PERSON_TRADER)
