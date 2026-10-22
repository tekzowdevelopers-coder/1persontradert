import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldAlert, ArrowUpRight, Lock } from "lucide-react";
import InstagramIcon from "@/components/InstagramIcon";
import { BRAND } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Risk Notice Banner inside Footer */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-start sm:items-center gap-3 text-xs text-slate-400">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
          <p className="leading-relaxed">
            <strong className="text-slate-200">Mandatory Risk Disclosure:</strong> Trading in financial markets—including Equities, Futures, Options, Forex, and Cryptocurrencies—carries substantial risk of capital loss. The 1PERSON TRADER indicator suites are educational and analytical software tools for TradingView. They do not constitute financial advice, portfolio management, or trade recommendation services. Always practice strict capital risk management.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl bg-white p-1 overflow-hidden shrink-0 border border-slate-700">
                <Image
                  src="/images/1person-trader-logo.png"
                  alt="1PERSON TRADER Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight">
                  <span className="text-brand-green">1PERSON</span> TRADER
                </span>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                  Discipline Today • Freedom Tomorrow
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Proprietary Pine Script indicators designed for TradingView. Built for traders who value rule-based market structure, liquidity sweeps, and zero-repainting precision.
            </p>

            <div className="pt-2">
              <a
                href={BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-white transition-colors"
              >
                <InstagramIcon className="w-4 h-4 text-brand-green" />
                <span>Follow {BRAND.instagramHandle} on Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/" className="hover:text-brand-green transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/#chart-story" className="hover:text-brand-green transition-colors">
                  Scroll Chart Simulation
                </Link>
              </li>
              <li>
                <Link href="/indicators" className="hover:text-brand-green transition-colors">
                  Indicator Catalogue
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-brand-green transition-colors">
                  Approved Subscriptions
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-brand-green transition-colors">
                  TradingView Activation Flow
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-brand-green transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Pricing Quick Reference */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Subscriptions
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span>1 Month Access</span>
                <strong className="text-white">₹4,000</strong>
              </li>
              <li className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span className="flex items-center gap-1">
                  3 Months
                  <span className="text-[10px] text-brand-green bg-emerald-950 border border-emerald-800 px-1 rounded">POPULAR</span>
                </span>
                <strong className="text-white">₹10,500</strong>
              </li>
              <li className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                <span>6 Months Access</span>
                <strong className="text-white">₹18,000</strong>
              </li>
            </ul>
            <div className="mt-3">
              <Link
                href="/pricing"
                className="text-xs text-brand-green hover:underline inline-flex items-center gap-1"
              >
                Select a plan <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Governance &amp; Policies
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/terms" className="hover:text-brand-green transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-brand-green transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-brand-green transition-colors">
                  Refund &amp; Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/risk-disclaimer" className="hover:text-brand-green transition-colors">
                  Full Risk Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-green transition-colors">
                  Support &amp; Verification
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-300"
                >
                  <Lock className="w-3 h-3" /> Admin Operations Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} 1PERSON TRADER (11% TRADER). All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Invite-only TradingView scripts</span>
            <span>•</span>
            <span className="text-brand-green">Zero-repainting architecture</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
