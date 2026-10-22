import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck, MonitorPlay, Mail, KeyRound } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getOrderById } from "@/lib/store";

interface PageProps {
  searchParams: {
    orderId?: string;
  };
}

export const dynamic = "force-dynamic";

export default function OrderSuccessPage({ searchParams }: PageProps) {
  const orderId = searchParams.orderId;
  const order = orderId ? getOrderById(orderId) : null;

  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-navy">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-card text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Payment &amp; Access Key Verified
            </span>

            <h1 className="text-3xl font-black text-brand-navy tracking-tight mt-4 mb-2">
              Welcome to 1PERSON TRADER
            </h1>

            <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed mb-8">
              Your payment and plan access key have been successfully verified on our server. We are provisioning your invite-only license to your TradingView account.
            </p>

            {/* Order Details Receipt */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left mb-8 space-y-3 text-xs">
              <div className="flex justify-between border-b border-slate-200 pb-3">
                <span className="text-slate-500">Order Reference</span>
                <span className="font-mono font-bold text-brand-navy">
                  {order?.orderNumber || orderId || "1P-VERIFIED-7819"}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-3">
                <span className="text-slate-500">Selected Subscription</span>
                <span className="font-bold text-brand-navy">
                  {order?.planName || "3 Months Access (₹10,500)"}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-3">
                <span className="text-slate-500">Authorized TradingView User</span>
                <span className="font-mono font-bold text-brand-green">
                  {order?.tradingViewUsername || "Submitted at checkout"}
                </span>
              </div>
              {order?.accessKey && (
                <div className="flex justify-between border-b border-slate-200 pb-3">
                  <span className="text-slate-500">Access Key Verified</span>
                  <span className="font-mono font-bold text-slate-800 bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    {order.accessKey}
                  </span>
                </div>
              )}
              <div className="flex justify-between border-b border-slate-200 pb-3">
                <span className="text-slate-500">Payment Status</span>
                <span className="text-emerald-700 font-bold uppercase flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {order?.paymentStatus || "PAID (VERIFIED)"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Access Provisioning State</span>
                <span className="text-brand-navy font-bold uppercase">
                  {order?.accessStatus === "GRANTED" ? "ACCESS GRANTED" : "IN QUEUE (2-4 HRS)"}
                </span>
              </div>
            </div>

            {/* Next Steps: How to load on TradingView */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 text-left mb-8">
              <h3 className="text-sm font-bold text-brand-navy mb-4 flex items-center gap-2">
                <MonitorPlay className="w-4 h-4 text-brand-green" />
                How To Access Your Indicator On TradingView:
              </h3>
              <ol className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center shrink-0">
                    1
                  </span>
                  <span>
                    Our operations team attaches your TradingView username to the private Pine Script repository within 2-4 hours.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center shrink-0">
                    2
                  </span>
                  <span>
                    Open <a href="https://www.tradingview.com" target="_blank" rel="noopener noreferrer" className="text-brand-green underline font-semibold">TradingView.com</a> and launch any chart.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center shrink-0">
                    3
                  </span>
                  <span>
                    Click the <strong>&quot;Indicators&quot;</strong> icon on the top toolbar -&gt; open the <strong>&quot;Invite-Only Scripts&quot;</strong> section.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center shrink-0">
                    4
                  </span>
                  <span>
                    Click <strong>&quot;1PERSON Institutional Suite&quot;</strong> to add it to your favorite charts.
                  </span>
                </li>
              </ol>
            </div>

            {/* Support Action */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-xs font-bold transition-all"
              >
                Return to Home
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all border border-slate-200 flex items-center justify-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-brand-green" />
                <span>Contact Fulfillment Support</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
