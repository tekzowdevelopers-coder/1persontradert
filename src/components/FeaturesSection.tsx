import React from "react";
import {
  ShieldCheck,
  TrendingUp,
  Sliders,
  Layers,
  BellRing,
  Compass,
  Cpu,
} from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "100% Zero-Repainting Logic",
    description:
      "Signals compute and anchor strictly at candlestick close. Never worry about historical signals moving, recalculating, or vanishing when re-opening charts.",
    highlight: "Deterministic Execution",
  },
  {
    icon: TrendingUp,
    title: "Market Structure Shifts (BOS / CHoCH)",
    description:
      "Automates institutional Break of Structure (BOS) and Change of Character (CHoCH) detection to keep you aligned with dominant market order flow.",
    highlight: "Order Flow Alignment",
  },
  {
    icon: Compass,
    title: "Liquidity Sweep Identification",
    description:
      "Spots smart money stop-runs and liquidity grabs above previous swing highs or below swing lows prior to high-probability reversal moves.",
    highlight: "Institutional Footprint",
  },
  {
    icon: Sliders,
    title: "Configurable Noise Thresholds",
    description:
      "Fine-tune sensitivity parameters directly from TradingView settings whether you scalp 1m/5m charts or swing trade 4H/Daily timeframes.",
    highlight: "Scalper to Swing Trader",
  },
  {
    icon: Layers,
    title: "Dynamic ATR Risk Projections",
    description:
      "Automatically projects volatility-adjusted stop-loss levels and multi-tiered take-profit targets right on your chart canvas.",
    highlight: "Objective Risk Management",
  },
  {
    icon: BellRing,
    title: "Instant Multi-Channel Alerts",
    description:
      "Configure TradingView webhooks, mobile push notifications, email, or Telegram alerts so you never miss a verified signal during your day.",
    highlight: "Real-Time Triggers",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5 text-brand-green" />
            Engineered For TradingView
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            Built On Mathematical Order Flow, Not Hope
          </h2>
          <p className="mt-3 text-base text-brand-subtle">
            Every feature in the 1PERSON Institutional Suite was designed to strip away visual noise and deliver high-probability, non-repainting clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white border border-slate-200 rounded-2xl p-7 hover:border-brand-green/60 hover:shadow-card transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-brand-navy group-hover:text-brand-green group-hover:border-brand-green/30 group-hover:bg-emerald-50/50 transition-colors mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-green block mb-1">
                    {feature.highlight}
                  </span>
                  <h3 className="text-lg font-bold text-brand-dark mb-2.5">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-brand-subtle leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>Pine Script v5</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                    Verified
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
