import React from "react";
import Link from "next/link";
import { Check, ShieldCheck, Zap, HelpCircle, ArrowRight, KeyRound } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata = {
  title: "Subscription Pricing | 1PERSON TRADER",
  description: "Official approved pricing plans for 1PERSON TRADER Pine Script indicator suite. 1 Month ₹4,000, 3 Months ₹10,500, 6 Months ₹18,000.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-navy">
      <Navbar />

      <main className="flex-1 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/20 text-xs font-semibold text-brand-green uppercase tracking-wider mb-3">
              Official Approved Pricing
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-brand-navy tracking-tight">
              Simple, Transparent Indicator Access
            </h1>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              No hidden contracts, no forced recurring subscriptions, and no upsells. Select your access duration and get verified TradingView invite delivery.
            </p>
          </div>

          {/* Pricing Cards */}
          <PricingSection showTitle={false} />

          {/* Access Key Notice Banner */}
          <div className="mt-8 bg-brand-navy text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 border border-brand-navyDark shadow-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-green/20 border border-brand-green/30 flex items-center justify-center text-brand-green shrink-0">
                <KeyRound className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Have a Plan Access Key?</h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Access keys are required during checkout. Don&apos;t have an Access Key? Please contact administrator via WhatsApp or our Contact Desk.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://wa.me/919999999999?text=Hello%201PERSON%20TRADER%20Admin,%20I%20need%20the%20Access%20Key%20to%20subscribe."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-brand-green hover:bg-brand-greenDark text-white text-xs font-bold transition-all"
              >
                Request Key on WhatsApp
              </a>
              <Link
                href="/contact"
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all border border-slate-700"
              >
                Contact Desk
              </Link>
            </div>
          </div>

          {/* Comparison Matrix Table */}
          <div className="mt-16 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-subtle">
            <div className="text-center max-w-xl mx-auto mb-8">
              <h3 className="text-xl font-bold text-brand-navy">Plan Feature Comparison</h3>
              <p className="text-xs text-slate-500 mt-1">
                All plans include the complete 1PERSON Institutional Pine Script v5 logic without repainting.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                    <th className="py-4 px-4">Feature / Entitlement</th>
                    <th className="py-4 px-4 text-center">1 Month (₹4,000)</th>
                    <th className="py-4 px-4 text-center bg-brand-green/5 rounded-t-xl text-brand-green font-extrabold">
                      3 Months (₹10,500)
                    </th>
                    <th className="py-4 px-4 text-center">6 Months (₹18,000)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-3.5 px-4 font-semibold">TradingView Invite-Only Access</td>
                    <td className="py-3.5 px-4 text-center text-brand-green font-bold">Included</td>
                    <td className="py-3.5 px-4 text-center bg-brand-green/5 text-brand-green font-bold">Included</td>
                    <td className="py-3.5 px-4 text-center text-brand-green font-bold">Included</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold">100% Zero-Repainting Execution</td>
                    <td className="py-3.5 px-4 text-center text-brand-green font-bold">Included</td>
                    <td className="py-3.5 px-4 text-center bg-brand-green/5 text-brand-green font-bold">Included</td>
                    <td className="py-3.5 px-4 text-center text-brand-green font-bold">Included</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold">All Liquid Asset Markets (Nifty, Crypto, FX)</td>
                    <td className="py-3.5 px-4 text-center text-brand-green font-bold">Included</td>
                    <td className="py-3.5 px-4 text-center bg-brand-green/5 text-brand-green font-bold">Included</td>
                    <td className="py-3.5 px-4 text-center text-brand-green font-bold">Included</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold">Dynamic ATR Risk-to-Reward Targets</td>
                    <td className="py-3.5 px-4 text-center text-brand-green font-bold">Included</td>
                    <td className="py-3.5 px-4 text-center bg-brand-green/5 text-brand-green font-bold">Included</td>
                    <td className="py-3.5 px-4 text-center text-brand-green font-bold">Included</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold">Monthly Effective Cost</td>
                    <td className="py-3.5 px-4 text-center font-mono">₹4,000 / mo</td>
                    <td className="py-3.5 px-4 text-center bg-brand-green/5 font-mono font-bold text-brand-navy">
                      ₹3,500 / mo
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-brand-green">
                      ₹3,000 / mo
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold">Total Savings</td>
                    <td className="py-3.5 px-4 text-center text-slate-400">—</td>
                    <td className="py-3.5 px-4 text-center bg-brand-green/5 text-brand-green font-bold">
                      Save ₹1,500
                    </td>
                    <td className="py-3.5 px-4 text-center text-brand-green font-bold">
                      Save ₹6,000
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold">Priority Activation Speed</td>
                    <td className="py-3.5 px-4 text-center text-slate-600">Standard (2-6 hrs)</td>
                    <td className="py-3.5 px-4 text-center bg-brand-green/5 text-brand-green font-bold">
                      Priority (1-3 hrs)
                    </td>
                    <td className="py-3.5 px-4 text-center text-brand-navy font-bold">
                      VIP Fast-Track (Immediate)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-semibold">Action</td>
                    <td className="py-4 px-4 text-center">
                      <Link
                        href="/checkout?plan=monthly"
                        className="px-3 py-1.5 rounded-lg bg-brand-navy text-white font-bold hover:bg-brand-navyDark transition-colors inline-block"
                      >
                        Select 1M
                      </Link>
                    </td>
                    <td className="py-4 px-4 text-center bg-brand-green/5">
                      <Link
                        href="/checkout?plan=quarterly"
                        className="px-3 py-1.5 rounded-lg bg-brand-green text-white font-bold hover:bg-brand-greenDark transition-colors inline-block shadow-sm"
                      >
                        Select 3M
                      </Link>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Link
                        href="/checkout?plan=half-yearly"
                        className="px-3 py-1.5 rounded-lg bg-brand-navy text-white font-bold hover:bg-brand-navyDark transition-colors inline-block"
                      >
                        Select 6M
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Pricing FAQ Section */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-center text-brand-navy mb-6">
              Frequently Asked Billing Questions
            </h3>
            <FAQAccordion limit={4} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
