import React from "react";
import Link from "next/link";
import { CreditCard, UserCheck, KeyRound, MonitorPlay, ArrowRight } from "lucide-react";

const STEPS = [
  {
    step: "01",
    icon: CreditCard,
    title: "Choose Your Access Period",
    description:
      "Select from the 3 approved subscription plans: 1 Month (₹4,000), 3 Months (₹10,500), or 6 Months (₹18,000).",
  },
  {
    step: "02",
    icon: UserCheck,
    title: "Provide TradingView Username",
    description:
      "During checkout, enter your exact TradingView username and verified Access Key to link your license.",
  },
  {
    step: "03",
    icon: KeyRound,
    title: "Instant Verification & Provisioning",
    description:
      "Key and payment are verified on the server. Our admin team grants private authorization directly on TradingView's official invite system.",
  },
  {
    step: "04",
    icon: MonitorPlay,
    title: "Apply Script To Any Chart",
    description:
      "Open TradingView -> click 'Indicators' -> select 'Invite-Only Scripts' -> add '1PERSON Institutional Suite' to any asset chart.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
            Simple 4-Step Onboarding
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            How Invite-Only Access Works
          </h2>
          <p className="mt-3 text-base text-brand-subtle">
            No complex installations or API broker keys required. Runs natively inside TradingView on web, desktop, and mobile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle hover:border-brand-green/50 hover:shadow-card transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black text-slate-300 font-mono group-hover:text-brand-green transition-colors">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-brand-dark group-hover:bg-emerald-50 group-hover:text-brand-green transition-colors">
                      <Icon className="w-5 h-5 text-brand-green" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-brand-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-brand-subtle leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center text-[11px] font-semibold text-slate-400">
                  Step {idx + 1} of 4
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-sm font-bold shadow-subtle hover:shadow transition-all group"
          >
            <span>Get Started — View Available Plans</span>
            <ArrowRight className="w-4 h-4 text-brand-green group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
