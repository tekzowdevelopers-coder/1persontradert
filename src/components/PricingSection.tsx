import React from "react";
import Link from "next/link";
import { Check, ArrowRight, ShieldCheck, Zap, KeyRound } from "lucide-react";
import { PLANS } from "@/lib/data";

interface PricingSectionProps {
  showTitle?: boolean;
}

export default function PricingSection({ showTitle = true }: PricingSectionProps) {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-3">
              Official Approved Subscriptions
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
              Invest In Clear Market Structure
            </h2>
            <p className="mt-3 text-base text-brand-subtle">
              Three straightforward plans with no hidden charges. Choose the duration that matches your trading commitment.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan) => {
            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? "border-2 border-brand-green shadow-card ring-1 ring-brand-green/20"
                    : "border border-slate-200 hover:border-slate-300 shadow-subtle"
                }`}
              >
                {/* Popular Pill */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-green text-white text-[11px] font-extrabold tracking-wider uppercase shadow-xs">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-extrabold text-brand-dark">
                      {plan.name}
                    </h3>
                    {plan.savingsINR > 0 && (
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                        Save ₹{plan.savingsINR.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-brand-subtle mb-6 min-h-[32px]">
                    {plan.tagline}
                  </p>

                  {/* Pricing Display */}
                  <div className="mb-6 pb-6 border-b border-slate-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">
                        ₹{plan.priceINR.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold">
                        / {plan.durationMonths === 1 ? "month" : `${plan.durationMonths} months`}
                      </span>
                    </div>

                    <div className="mt-1.5 text-xs text-slate-500 font-medium">
                      Equivalent to{" "}
                      <strong className="text-brand-dark">
                        ₹{plan.monthlyEquivalent.toLocaleString()} / month
                      </strong>
                    </div>
                  </div>

                  {/* Access Key Notification */}
                  <div className="mb-6 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 flex items-start gap-2 text-[11px]">
                    <KeyRound className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                    <span>
                      Requires <strong>Access Key</strong> at checkout. Contact administrator to obtain your key.
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      What&apos;s Included:
                    </p>
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-brand-green shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Link
                    href={`/checkout?plan=${plan.id}`}
                    className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs ${
                      plan.popular
                        ? "bg-brand-green hover:bg-brand-greenDark text-white shadow-glowGreen"
                        : "bg-brand-navy hover:bg-brand-navyDark text-white"
                    }`}
                  >
                    <span>Choose {plan.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <p className="text-center text-[11px] text-slate-400 mt-2.5 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-green" />
                    <span>Invite-Only Script License</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security & Guarantee Box */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
              <Zap className="w-4 h-4 text-brand-green" />
            </div>
            <div>
              <strong className="text-brand-dark block text-sm">
                No Auto-Debiting &amp; No Hidden Renewals
              </strong>
              <span>
                Subscriptions do not automatically charge your card. You maintain full control over renewing when your period concludes.
              </span>
            </div>
          </div>

          <div className="text-slate-500 shrink-0 font-medium text-center sm:text-right">
            Supported Payments: UPI, Credit/Debit Cards, NetBanking
          </div>
        </div>
      </div>
    </section>
  );
}
