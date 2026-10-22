import React from "react";
import Link from "next/link";
import { XCircle, ArrowRight, RefreshCw, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function OrderCancelledPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-navy">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mx-auto mb-6">
            <XCircle className="w-8 h-8" />
          </div>

          <h1 className="text-3xl font-black text-brand-navy tracking-tight mb-3">
            Payment Incomplete or Cancelled
          </h1>

          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-8">
            Your transaction was not completed or was cancelled. No charges were deducted. If you experienced a gateway timeout or banking issue, you can safely retry.
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-left mb-8 text-xs text-slate-600 space-y-2">
            <h3 className="font-bold text-brand-navy text-sm mb-2">Common reasons for payment issues:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>UPI app authorization timed out or declined</li>
              <li>Bank card international / e-mandate permissions disabled</li>
              <li>Browser window closed before 3D Secure OTP verification</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/checkout"
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-brand-green hover:bg-brand-greenDark text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry Plan Checkout</span>
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all border border-slate-200 flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-brand-green" />
              <span>Contact Support Desk</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
