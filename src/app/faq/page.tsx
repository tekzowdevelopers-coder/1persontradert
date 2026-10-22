import React from "react";
import Link from "next/link";
import { HelpCircle, ArrowRight, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata = {
  title: "Frequently Asked Questions | 1PERSON TRADER",
  description: "Answers to common questions regarding 1PERSON TRADER TradingView invite-only indicators, zero repainting, activation time, access keys, and pricing.",
};

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-navy">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/20 text-xs font-semibold text-brand-green uppercase tracking-wider mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-brand-green" />
              Support &amp; Documentation
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="mt-3 text-base text-slate-600">
              Find transparent answers about our Pine Script indicator suite, TradingView compatibility, zero-repainting execution, Access Keys, and subscription terms.
            </p>
          </div>

          <FAQAccordion />

          {/* Need help box */}
          <div className="mt-14 p-8 rounded-3xl bg-slate-50 border border-slate-200 text-center">
            <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-brand-green mx-auto mb-4 shadow-subtle">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-brand-navy mb-1">
              Still have questions before getting started?
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto mb-6">
              Our team is available to assist with TradingView setup questions, timeframe suitability, Access Key distribution, or billing assistance.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-green hover:bg-brand-greenDark text-white text-xs font-bold transition-all shadow-sm"
            >
              <span>Contact Support Desk</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
