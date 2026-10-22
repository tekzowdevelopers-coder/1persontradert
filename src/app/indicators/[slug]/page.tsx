import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShieldCheck,
  Check,
  ArrowRight,
  ArrowUpRight,
  AlertTriangle,
  Layers,
  BarChart2,
  Cpu,
  MonitorPlay,
  KeyRound,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { INDICATORS } from "@/lib/data";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return INDICATORS.map((indicator) => ({
    slug: indicator.slug,
  }));
}

export default function IndicatorDetailPage({ params }: PageProps) {
  const indicator = INDICATORS.find((i) => i.slug === params.slug);

  if (!indicator) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-navy">
      <Navbar />

      <main className="flex-1 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-8">
            <Link href="/" className="hover:text-brand-navy">
              Home
            </Link>
            <span>/</span>
            <Link href="/indicators" className="hover:text-brand-navy">
              Indicators
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">{indicator.name}</span>
          </div>

          {/* Product Header */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 mb-12">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-bold">
                {indicator.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                {indicator.version}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-200/80 text-slate-700 text-xs font-medium">
                TradingView Invite-Only
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-navy tracking-tight mb-4">
              {indicator.name}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed mb-8">
              {indicator.tagline}
            </p>

            {/* Quick Action Strip */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-200/80">
              <Link
                href="/pricing"
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-brand-green hover:bg-brand-greenDark text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>Select Subscription Plan (from ₹4,000)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#chart-story"
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold transition-all border border-slate-300 flex items-center justify-center gap-2"
              >
                <span>Watch Scroll-Driven Signal Demo</span>
                <ArrowUpRight className="w-4 h-4 text-slate-500" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left 2 Columns: Description & Deep Technical Specs */}
            <div className="lg:col-span-2 space-y-12">
              {/* Detailed Overview */}
              <div>
                <h2 className="text-2xl font-bold text-brand-navy mb-4">
                  Overview &amp; Market Logic
                </h2>
                <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                  {indicator.fullDescription.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Core Features Detailed */}
              <div>
                <h2 className="text-2xl font-bold text-brand-navy mb-6">
                  Core Algorithm Capabilities
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {indicator.features.map((feature, fIdx) => (
                    <div
                      key={fIdx}
                      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-subtle"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Check className="w-4 h-4 text-brand-green" />
                        <h3 className="text-sm font-bold text-brand-navy">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Installation & Activation */}
              <div>
                <h2 className="text-2xl font-bold text-brand-navy mb-4 flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-brand-green" />
                  TradingView Activation Steps
                </h2>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                  <ol className="space-y-3.5">
                    {indicator.installationSteps.map((step, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-3 text-xs text-slate-700">
                        <span className="w-5 h-5 rounded-full bg-brand-navy text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {sIdx + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Limitations & Proper Use Guidelines */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 text-xs text-amber-900">
                <div className="flex items-center gap-2 font-bold mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Important Usage Limitations</span>
                </div>
                <ul className="space-y-1.5 list-disc list-inside text-amber-800">
                  {indicator.limitations.map((limitation, lIdx) => (
                    <li key={lIdx}>{limitation}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Sidebar Specs & CTA */}
            <div className="space-y-8">
              {/* Plan Pricing Box */}
              <div className="bg-brand-navy text-white rounded-3xl p-6 shadow-card border border-brand-navyDark">
                <h3 className="text-lg font-bold mb-2">Get Instant Access</h3>
                <p className="text-xs text-slate-300 mb-6">
                  Select an approved duration to obtain your invite-only TradingView license. Access Key required at checkout.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/90 border border-slate-700 text-xs">
                    <span>1 Month Subscription</span>
                    <strong className="text-white font-mono">₹4,000</strong>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-brand-green/20 border border-brand-green/50 text-xs">
                    <div>
                      <span className="font-bold text-white">3 Months Access</span>
                      <span className="block text-[10px] text-brand-green font-semibold">Save ₹1,500</span>
                    </div>
                    <strong className="text-white font-mono">₹10,500</strong>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/90 border border-slate-700 text-xs">
                    <div>
                      <span>6 Months Access</span>
                      <span className="block text-[10px] text-brand-green font-semibold">Save ₹6,000</span>
                    </div>
                    <strong className="text-white font-mono">₹18,000</strong>
                  </div>
                </div>

                <Link
                  href="/pricing"
                  className="w-full py-3 rounded-xl bg-brand-green hover:bg-brand-greenDark text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Go to Plan Selection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Supported Markets Box */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <BarChart2 className="w-4 h-4 text-brand-green" />
                  Supported Instruments
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {indicator.supportedMarkets.map((m, mIdx) => (
                    <li key={mIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Supported Timeframes Box */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-brand-green" />
                  Recommended Timeframes
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {indicator.supportedTimeframes.map((tf, tfIdx) => (
                    <li key={tfIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                      <span>{tf}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* TradingView Account Requirements */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <MonitorPlay className="w-4 h-4 text-brand-navy" />
                  TradingView Compatibility
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {indicator.tradingViewRequirements.map((req, rIdx) => (
                    <li key={rIdx}>• {req}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
