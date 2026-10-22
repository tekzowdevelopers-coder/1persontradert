import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy | 1PERSON TRADER",
  description: "Privacy policy detailing data minimization, customer information security, and retention practices for 1PERSON TRADER.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-dark">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-slate-200 pb-8 mb-10">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">
              Data & Privacy
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-500 mt-2">
              Last updated: October 19, 2026 • 1PERSON TRADER (11% TRADER)
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-600 leading-relaxed space-y-8">
            <section>
              <h2 className="text-lg font-bold text-brand-dark mb-3">1. Information We Collect</h2>
              <p>
                We practice strict data minimization. We only collect the minimal information necessary to fulfill your indicator access:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Your name (for invoicing and customer record)</li>
                <li>Your email address (to deliver receipts and activation updates)</li>
                <li>Your phone/WhatsApp number (for critical account notifications)</li>
                <li>Your TradingView username (solely to provision invite-only script access)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-dark mb-3">2. Payment Security</h2>
              <p>
                We do not store, process, or retain credit/debit card numbers, CVVs, or UPI banking PINs on our servers. All financial transactions are securely handled by PCI-DSS compliant payment gateways.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-dark mb-3">3. How We Use Your Data</h2>
              <p>
                Your information is used solely to provision access to your indicator, verify transaction legitimacy, prevent fraud, and send relevant service updates. We do not sell, rent, or trade your personal data to any third-party advertisers or marketing data brokers.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-brand-dark mb-3">4. Data Retention & Removal</h2>
              <p>
                Order history is retained for statutory accounting and fulfillment tracking purposes. You may request data inspection or deletion of promotional contact records at any time by emailing support@1persontrader.com.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
