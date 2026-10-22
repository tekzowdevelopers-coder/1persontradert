import React from "react";
import Link from "next/link";
import { Cpu, ArrowRight, ShieldCheck, Check, Layers, ArrowUpRight, BarChart3 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { INDICATORS } from "@/lib/data";

export const metadata = {
  title: "TradingView Indicators | 1PERSON TRADER",
  description: "Browse proprietary Pine Script v5 invite-only indicators for TradingView. Zero repainting, market structure shifts, and liquidity sweep confirmation.",
};

export default function IndicatorsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-navy">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/20 text-xs font-semibold text-brand-green uppercase tracking-wider mb-3">
              <Cpu className="w-3.5 h-3.5 text-brand-green" />
              Indicator Catalogue
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-navy tracking-tight">
              Institutional TradingView Suites
            </h1>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Every indicator in our catalogue is engineered with zero-repainting logic, calculating signals strictly upon bar close. Compatible with both free and paid TradingView accounts.
            </p>
          </div>

          {/* Indicator Grid / List */}
          <div className="space-y-8">
            {INDICATORS.map((indicator) => (
              <div
                key={indicator.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-subtle hover:shadow-card transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-brand-green/10 text-brand-green text-xs font-bold">
                        {indicator.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                        {indicator.version}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                        Invite-Only Script
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy mb-3">
                      {indicator.name}
                    </h2>

                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {indicator.tagline}
                    </p>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5 font-medium">
                        <ShieldCheck className="w-4 h-4 text-brand-green" />
                        <span>Zero Repainting Logic</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <BarChart3 className="w-4 h-4 text-brand-green" />
                        <span>All Liquid Markets Supported</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <Layers className="w-4 h-4 text-slate-500" />
                        <span>Multi-Timeframe Analysis</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                    <Link
                      href={`/indicators/${indicator.slug}`}
                      className="px-5 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-2"
                    >
                      <span>Explore Indicator Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brand-green" />
                    </Link>
                    <Link
                      href="/pricing"
                      className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all text-center flex items-center justify-center gap-2 border border-slate-200"
                    >
                      <span>View Pricing (from ₹4,000)</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                    </Link>
                  </div>
                </div>

                {/* Feature Columns */}
                <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Key Highlights
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {indicator.features.slice(0, 3).map((f, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{f.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Supported Markets
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {indicator.supportedMarkets.slice(0, 4).map((m, mIdx) => (
                        <li key={mIdx}>• {m}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Timeframe Applications
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {indicator.supportedTimeframes.map((tf, tfIdx) => (
                        <li key={tfIdx}>• {tf}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Note */}
          <div className="mt-14 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-center max-w-2xl mx-auto">
            <h3 className="text-sm font-bold text-brand-navy mb-1">
              Need A Custom Pine Script Strategy or Consultation?
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Have specific market questions or want to verify compatibility with your trading setup?
            </p>
            <Link
              href="/contact"
              className="text-xs font-bold text-brand-green hover:underline inline-flex items-center gap-1"
            >
              Contact our technical team <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
