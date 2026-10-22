import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Activity,
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
  Lock,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollChartStory from "@/components/ScrollChartStory";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";
import InteractiveIndicatorSimulator from "@/components/InteractiveIndicatorSimulator";
import FAQAccordion from "@/components/FAQAccordion";
import { BRAND } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-dark selection:bg-brand-green selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* Editorial Hero Section */}
        <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              {/* Top Tagline Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 tracking-wide mb-8 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-brand-green animate-ping" />
                <span>PINE SCRIPT v5 INVITE-ONLY INDICATOR</span>
                <span className="text-emerald-300">|</span>
                <span className="text-brand-green font-extrabold">ZERO REPAINTING</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-brand-dark tracking-tight leading-[1.1]">
                Institutional Order Flow Signals.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-navy via-brand-navyLight to-brand-green">
                  No Gimmicks. No Repainting.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-6 text-base sm:text-lg md:text-xl text-brand-subtle max-w-2xl mx-auto leading-relaxed">
                Objective market structure shifts and high-probability reversal confirmation delivered straight to your TradingView chart. Engineered for disciplined traders.
              </p>

              {/* Call to Actions */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#chart-story"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-sm font-bold shadow-subtle hover:shadow transition-all flex items-center justify-center gap-2.5 group"
                >
                  <Activity className="w-4 h-4 text-brand-green" />
                  <span>Experience The Scroll Story</span>
                </a>

                <Link
                  href="/pricing"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-sm font-bold border border-slate-300 shadow-subtle transition-all flex items-center justify-center gap-2"
                >
                  <span>View Approved Plans (from ₹4,000)</span>
                  <ArrowRight className="w-4 h-4 text-brand-green" />
                </Link>
              </div>

              {/* Micro Trust Indicators */}
              <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-green" />
                  <span>Zero-Repainting Logic</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-green" />
                  <span>TradingView Free &amp; Paid Tiers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-slate-600" />
                  <span>Official Invite-Only Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-brand-green" />
                  <span>Nifty, BankNifty, Crypto &amp; Forex</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: SIGNATURE SCROLL-DRIVEN CHART STORY */}
        <ScrollChartStory />

        {/* PINE SCRIPT FEATURES */}
        <FeaturesSection />

        {/* INTERACTIVE INDICATOR SIMULATOR */}
        <InteractiveIndicatorSimulator />

        {/* HOW INVITE ACCESS WORKS */}
        <HowItWorksSection />

        {/* PRICING PLANS */}
        <PricingSection />

        {/* FAQ SECTION */}
        <section className="py-20 bg-slate-50 border-t border-slate-200/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Got Questions?
              </div>
              <h2 className="text-3xl font-extrabold text-brand-dark tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="mt-2 text-sm text-brand-subtle">
                Clear answers regarding indicator installation, zero-repainting verification, and subscription terms.
              </p>
            </div>

            <FAQAccordion limit={5} />

            <div className="mt-8 text-center">
              <Link
                href="/faq"
                className="text-xs font-bold text-brand-green hover:underline inline-flex items-center gap-1.5"
              >
                <span>Read all technical FAQs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* FINAL CONVERSION BANNER */}
        <section className="py-20 bg-brand-navy text-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Stop Guessing Market Direction
            </h2>
            <p className="text-base text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Equip your TradingView workspace with institutional order flow, verified liquidity sweep confirmation, and objective risk targets today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/pricing"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-green hover:bg-brand-greenDark text-white text-sm font-extrabold shadow-glowGreen transition-all flex items-center justify-center gap-2"
              >
                <span>Select Your Plan — Instant Access Setup</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <span>Have Pre-Sales Inquiries? Contact Us</span>
              </Link>
            </div>

            <p className="mt-8 text-xs text-slate-400">
              {BRAND.tagline} • Official Instagram:{" "}
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-green underline"
              >
                {BRAND.instagramHandle}
              </a>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
