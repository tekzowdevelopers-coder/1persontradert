import { Indicator, Plan } from "./types";

export const BRAND = {
  name: "1PERSON TRADER",
  workingName: "11% TRADER",
  tagline: "DISCIPLINE TODAY . FREEDOM TOMORROW",
  instagramHandle: "@1PERSON_TRADER",
  instagramUrl: "https://instagram.com/1PERSON_TRADER",
  supportEmail: "support@1persontrader.com",
};

export const PLANS: Plan[] = [
  {
    id: "monthly",
    name: "1 Month Access",
    tagline: "Ideal for testing indicator dynamics and order flow setups",
    durationMonths: 1,
    priceINR: 4000,
    monthlyEquivalent: 4000,
    savingsINR: 0,
    features: [
      "Full access to 1PERSON Institutional Suite",
      "TradingView invite-only script access",
      "Real-time non-repainting signal execution",
      "Standard multi-timeframe alerts (Webhook / SMS / Push)",
      "Setup guide & configuration video documentation",
      "Direct priority email support",
    ],
    popular: false,
  },
  {
    id: "quarterly",
    name: "3 Months Access",
    tagline: "Most popular for developing disciplined execution routines",
    durationMonths: 3,
    priceINR: 10500,
    monthlyEquivalent: 3500,
    savingsINR: 1500,
    features: [
      "Full access to 1PERSON Institutional Suite",
      "TradingView invite-only script access",
      "Real-time non-repainting signal execution",
      "Multi-timeframe liquidity sweep triggers",
      "Advanced risk-to-reward projection overlays",
      "Quarterly strategy updates & optimizations",
      "Priority WhatsApp & email activation support",
    ],
    popular: true,
  },
  {
    id: "half-yearly",
    name: "6 Months Access",
    tagline: "Maximum value for committed rule-based market participants",
    durationMonths: 6,
    priceINR: 18000,
    monthlyEquivalent: 3000,
    savingsINR: 6000,
    features: [
      "Full access to 1PERSON Institutional Suite",
      "TradingView invite-only script access",
      "Real-time non-repainting signal execution",
      "Full liquidity sweep + institutional momentum engine",
      "Custom alert templates for automated trade alerts",
      "Direct VIP onboarding & TradingView verification",
      "All minor and major Pine Script upgrades included",
    ],
    popular: false,
  },
];

export const INDICATORS: Indicator[] = [
  {
    id: "institutional-order-flow",
    slug: "institutional-order-flow",
    name: "1PERSON Institutional Order Flow & Reversal Suite",
    tagline: "Precision Pine Script indicator engine engineered to identify market structure shifts, institutional accumulation, and high-probability reversal triggers.",
    category: "Market Structure / Trend Confirmation",
    version: "v2.4 (Pine Script v5)",
    description: "A comprehensive TradingView invite-only indicator designed to highlight valid market structure breaks, liquidity pool captures, and confirmed reversal zones without repainting.",
    fullDescription: [
      "The 1PERSON Institutional Order Flow & Reversal Suite is engineered for traders who demand objective, rule-based chart clarity rather than cluttered lagging indicators.",
      "By filtering false breakouts through dynamic volume-weighted price structures and multi-bar liquidity sweeps, the algorithm plots clear BUY and SELL transition flags only upon bar close.",
      "Designed specifically for TradingView, it functions seamlessly on any free or paid TradingView tier across international FX, Crypto, US Equities, and Indian Index derivatives (Nifty / BankNifty).",
    ],
    features: [
      {
        title: "Strict Zero-Repainting Logic",
        description: "Signals calculate on confirmed candlestick closes. What you see during backtesting and live execution remains permanently fixed on your chart.",
      },
      {
        title: "Market Structure Shift Detection",
        description: "Automatically tracks Higher Highs, Higher Lows, Lower Lows, and institutional Break of Structure (BOS) without visual clutter.",
      },
      {
        title: "Dual Signal Pipeline (Buy / Sell)",
        description: "Dynamic color-coded markers for accumulation entries (BUY) and distribution rollover exits (SELL) aligned with broader directional bias.",
      },
      {
        title: "Integrated Stop-Loss & Target Guides",
        description: "Provides quantitative volatility-based ATR stop levels and logical structural targets for controlled risk-to-reward trade management.",
      },
      {
        title: "Native TradingView Alerts",
        description: "Easily connect alerts to the TradingView mobile app, webhooks, Telegram, or email so you never miss a verified setup.",
      },
      {
        title: "Noise Filtering Controls",
        description: "Customizable sensitivity toggles allowing scalpers, day traders, and swing traders to tune signal frequency to their holding period.",
      },
    ],
    supportedMarkets: [
      "Indian Equities & Futures (Nifty 50, Bank Nifty, FinNifty)",
      "Foreign Exchange (EURUSD, GBPUSD, USDJPY, AUDUSD)",
      "Cryptocurrency (BTCUSDT, ETHUSDT, SOLUSDT)",
      "Global Commodities (Gold / XAUUSD, Silver, Crude Oil)",
      "US Indices & Tech Stocks (NASDAQ, S&P 500, AAPL, TSLA)",
    ],
    supportedTimeframes: [
      "Scalping: 1-minute, 3-minute, 5-minute",
      "Intraday: 15-minute, 30-minute, 1-Hour",
      "Swing Trading: 4-Hour, Daily (1D)",
    ],
    installationSteps: [
      "Complete your plan checkout and provide your exact TradingView username.",
      "Our team activates invite-only script access within 2 to 4 business hours.",
      "Open any chart on TradingView, click on 'Indicators' -> 'Invite-Only Scripts'.",
      "Click '1PERSON Institutional Suite' to add it to your favorite charts.",
      "Save your preferred chart template with your chosen asset and timeframe.",
    ],
    limitations: [
      "The indicator is an analytical tool and does not place automated trades with your broker directly.",
      "Signals require individual discipline and rigorous risk management; no indicator can guarantee profitable outcomes.",
      "Requires an active TradingView account (free tier is fully supported).",
    ],
    tradingViewRequirements: [
      "TradingView Free, Essential, Plus, or Premium account",
      "Desktop browser, desktop app, or official TradingView mobile app",
    ],
    published: true,
  },
];

export const FAQS = [
  {
    question: "How do I receive access to the indicator after purchase?",
    answer: "Access is granted via TradingView's official 'Invite-Only Scripts' mechanism. During checkout, you provide your TradingView username. Once payment is verified, our system grants private access to your TradingView account. You will find the indicator directly under 'Indicators' > 'Invite-Only Scripts' on TradingView.",
  },
  {
    question: "Does the indicator repaint its signals?",
    answer: "No. The indicator follows strict zero-repainting rules. Signals evaluate and confirm only upon candlestick close. Once the bar closes and a signal prints, it will never disappear, shift forward, or change position.",
  },
  {
    question: "Do I need a paid TradingView subscription to use this?",
    answer: "No. The indicator works 100% on free TradingView accounts as well as paid tiers (Essential, Plus, Premium). You do not need to upgrade your TradingView plan just to run this indicator.",
  },
  {
    question: "Which markets and assets does the indicator support?",
    answer: "It works across all liquid assets available on TradingView: Indian NSE/BSE stocks and indices (Nifty, BankNifty), Forex pairs (EUR/USD, GBP/USD, etc.), Cryptocurrencies (BTC, ETH, etc.), Commodities (Gold, Silver, Crude Oil), and US Equities.",
  },
  {
    question: "Is this financial advice or an automated trading bot?",
    answer: "No. 1PERSON TRADER provides analytical indicator software designed to aid your discretionary analysis. It does not execute trades automatically on your brokerage account and does not constitute financial advice. Trading carries substantial risk of loss.",
  },
  {
    question: "How fast is access granted after payment?",
    answer: "TradingView access is typically provisioned within 2 to 4 hours of payment verification during active market hours, and at most within 12 hours. You will receive an email confirmation as soon as your TradingView username is granted access.",
  },
  {
    question: "What is your refund policy?",
    answer: "Because our indicators are proprietary invite-only digital software that cannot be revoked once source logic is added, access sales are non-refundable once the TradingView invite has been provisioned. If you experience technical onboarding issues, our support team will guide you until your chart is running smoothly.",
  },
];
