import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Refund & Cancellation Policy | 1PERSON TRADER",
  description: "Official refund and cancellation policy for 1PERSON TRADER digital Pine Script indicator access.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-dark">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-slate-200 pb-8 mb-10">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">
              Purchase Policy
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
              Refund & Cancellation Policy
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              Last updated: October 19, 2026 • 1PERSON TRADER (11% TRADER)
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 leading-relaxed space-y-8">
            <section>
              <h2 className="text-lg font-bold text-brand-dark mb-3">1. Nature of Digital Software</h2>
              <p>
                1PERSON TRADER delivers proprietary, intangible digital software access directly through TradingView&apos;s &quot;Invite-Only Scripts&quot; architecture. Due to the irreversible nature of digital intellectual property once authorized to a TradingView username, all sales are considered final once invite access has been granted.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-dark mb-3">2. Pre-Fulfillment Cancellation Window</h2>
              <p>
                If an order has been placed but the TradingView invite has <strong>not yet been granted</strong> to your account, you may request an immediate cancellation and 100% refund by contacting support@1persontrader.com within 2 hours of payment, citing your order reference number.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-dark mb-3">3. Technical Onboarding Support</h2>
              <p>
                If you encounter any difficulty locating or attaching the script on TradingView, our dedicated support team will provide step-by-step guidance until the indicator is rendering properly on your charts. Technical confusion or unfamiliarity with TradingView&apos;s UI does not qualify for a post-provisioning refund.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-dark mb-3">4. No Performance-Based Refunds</h2>
              <p>
                Financial markets fluctuate based on macroeconomic and liquidity factors beyond algorithmic control. We do not offer refunds based on individual trading results, drawdowns, market losses, or user trade decisions.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
