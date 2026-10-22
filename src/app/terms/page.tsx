import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | 1PERSON TRADER",
  description: "Terms and conditions governing the subscription and usage of 1PERSON TRADER Pine Script indicator software for TradingView.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-dark">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-slate-200 pb-8 mb-10">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">
              Legal Agreement
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              Last updated: October 19, 2026 • 1PERSON TRADER (11% TRADER)
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 leading-relaxed space-y-8">
            <section>
              <h2 className="text-lg font-bold text-brand-dark mb-3">1. Scope of Service</h2>
              <p>
                1PERSON TRADER (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) provides proprietary analytical scripts written in Pine Script for use on the third-party platform TradingView (&quot;TradingView.com&quot;). Subscriptions grant private, non-exclusive, non-transferable, invite-only access to our indicators for the duration selected during checkout (1 Month, 3 Months, or 6 Months).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-dark mb-3">2. No Financial or Investment Advice</h2>
              <p>
                All content, indicators, scripts, documentation, and communications provided by 1PERSON TRADER are strictly for educational and informational purposes. We do not provide personalized financial, investment, legal, or tax advice. We are not registered investment advisers or research analysts. Any decision to enter, manage, or exit a financial transaction is made solely at your own discretion and risk.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-dark mb-3">3. TradingView Account Requirement</h2>
              <p>
                Access to the script requires a valid TradingView account. You must provide an accurate TradingView username at checkout. 1PERSON TRADER is not affiliated with, endorsed by, or sponsored by TradingView Inc. Any changes in TradingView&apos;s third-party platform policies are beyond our direct control.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-dark mb-3">4. Intellectual Property & Non-Circumvention</h2>
              <p>
                The underlying algorithms, Pine Script source code, mathematical formulas, and presentation logic remain the exclusive intellectual property of 1PERSON TRADER. You agree not to decompile, reverse-engineer, redistribute, resell, share screen feeds for commercial exploitation, or create derivative works based on our invite-only scripts. Any unauthorized redistribution will result in immediate permanent license revocation without refund.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-dark mb-3">5. Subscription Terms & Renewals</h2>
              <p>
                Subscriptions are sold as one-time fixed-duration terms: 1 Month (₹4,000), 3 Months (₹10,500), or 6 Months (₹18,000). There are no auto-debiting renewals without customer consent. Upon term expiration, access will naturally end unless you choose to renew manually.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-dark mb-3">6. Limitation of Liability</h2>
              <p>
                Under no circumstances shall 1PERSON TRADER, its founders, operators, or affiliates be liable for any direct, indirect, incidental, punitive, or consequential trading losses or damages resulting from your use of or inability to use our indicators or site.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
