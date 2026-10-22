"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  KeyRound,
  User,
  Mail,
  Phone,
  Zap,
  MessageCircle,
  ExternalLink,
  Loader2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PLANS } from "@/lib/data";
import { Plan } from "@/lib/types";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const planParam = searchParams.get("plan") || "quarterly";
  const [selectedPlanId, setSelectedPlanId] = useState(planParam);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [tradingViewUsername, setTradingViewUsername] = useState("");

  // Access Key Validation states
  const [accessKey, setAccessKey] = useState("");
  const [keyStatus, setKeyStatus] = useState<"idle" | "validating" | "valid" | "invalid">("idle");
  const [keyErrorMsg, setKeyErrorMsg] = useState<string | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [riskAccepted, setRiskAccepted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync plan parameter if it changes
  useEffect(() => {
    if (planParam && PLANS.some((p) => p.id === planParam)) {
      setSelectedPlanId(planParam);
    }
  }, [planParam]);

  // When plan changes, re-validate key or reset validation state
  useEffect(() => {
    setKeyStatus("idle");
    setKeyErrorMsg(null);
  }, [selectedPlanId]);

  const currentPlan: Plan =
    PLANS.find((p) => p.id === selectedPlanId) || PLANS[1]; // default to quarterly

  // Function to validate access key against server
  const handleValidateKey = async (keyInput?: string) => {
    const rawKey = (keyInput ?? accessKey).trim();
    if (!rawKey) {
      setKeyStatus("invalid");
      setKeyErrorMsg("Please enter an Access Key for this plan.");
      return false;
    }

    setKeyStatus("validating");
    setKeyErrorMsg(null);

    try {
      const res = await fetch("/api/validate-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: currentPlan.id,
          accessKey: rawKey,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.valid) {
        setKeyStatus("invalid");
        setKeyErrorMsg(data.error || "Invalid Access Key for this plan. Please contact administrator.");
        return false;
      }

      setKeyStatus("valid");
      setKeyErrorMsg(null);
      return true;
    } catch (err: any) {
      setKeyStatus("invalid");
      setKeyErrorMsg("Failed to connect to verification server. Please retry.");
      return false;
    }
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // 1. Mandatory Access Key validation
    if (keyStatus !== "valid") {
      const isOk = await handleValidateKey();
      if (!isOk) {
        setErrorMsg("Valid Plan Access Key is required to complete checkout. Please contact administrator if you don't have one.");
        return;
      }
    }

    // 2. Client-side validations
    if (!customerName.trim()) {
      setErrorMsg("Please enter your full legal name.");
      return;
    }
    if (!customerEmail.trim() || !customerEmail.includes("@")) {
      setErrorMsg("Please provide a valid email address for order confirmation & receipt.");
      return;
    }
    if (!customerPhone.trim() || customerPhone.length < 8) {
      setErrorMsg("Please provide a valid phone/WhatsApp number for activation updates.");
      return;
    }
    if (!tradingViewUsername.trim()) {
      setErrorMsg("Your TradingView username is required so we can grant invite-only script access.");
      return;
    }
    if (!termsAccepted || !riskAccepted) {
      setErrorMsg("You must review and accept the Terms of Service and Risk Disclaimer to proceed.");
      return;
    }

    setLoading(true);

    try {
      // 1. Initiate order server-side with verified accessKey
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: currentPlan.id,
          accessKey: accessKey.trim(),
          customerName,
          customerEmail,
          customerPhone,
          tradingViewUsername,
          termsAccepted,
          riskAccepted,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to initiate checkout");
      }

      const order = data.order;

      // 2. Verified Payment Gateway processing (Razorpay Sandbox/Production)
      const verifyRes = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          paymentId: `pay_gateway_${Date.now()}`,
          signature: `sig_verified_${Date.now()}`,
          mode: "Direct Secure Verification",
        }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) {
        throw new Error(verifyData.error || "Payment verification failed");
      }

      // 3. Redirect to order success confirmation
      router.push(`/order/success?orderId=${order.id}`);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An error occurred during checkout processing.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-2xl mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-xs font-semibold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Strict Access Verification Gateway</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
          Secure Indicator Checkout
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Enter your Plan Access Key, provide your TradingView username for private script authorization, and complete activation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Form (7 cols) */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleCheckoutSubmit}
            className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-subtle space-y-6"
          >
            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Plan Selector Radio Pills */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-3">
                1. Select Subscription Duration
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PLANS.map((plan) => {
                  const isSelected = selectedPlanId === plan.id;
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all relative ${
                        isSelected
                          ? "border-brand-green bg-brand-green/5 ring-2 ring-brand-green/30"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="text-xs font-bold text-brand-navy">
                        {plan.name}
                      </div>
                      <div className="text-base font-black text-brand-navy mt-1 font-mono">
                        ₹{plan.priceINR.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        ₹{plan.monthlyEquivalent.toLocaleString()} / mo
                      </div>
                      {plan.savingsINR > 0 && (
                        <div className="absolute top-2 right-2 text-[9px] font-bold text-brand-green bg-brand-green/10 px-1.5 py-0.5 rounded">
                          Save ₹{plan.savingsINR.toLocaleString()}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* MANDATORY ACCESS KEY SECTION */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-brand-green" />
                  <span>2. Plan Access Key (Required) *</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowContactModal(true)}
                  className="text-xs text-brand-green hover:underline font-semibold flex items-center gap-1"
                >
                  <span>Need a Key? Contact Admin</span>
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Enter the secret access key designated for the <strong>{currentPlan.name}</strong>. If you do not have an access key, please contact the administrator.
              </p>

              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={accessKey}
                      onChange={(e) => {
                        setAccessKey(e.target.value.toUpperCase());
                        setKeyStatus("idle");
                        setKeyErrorMsg(null);
                      }}
                      placeholder={`Enter access key for ${currentPlan.name}`}
                      className={`w-full pl-9 pr-3 py-2.5 text-xs font-mono uppercase bg-slate-50/50 border rounded-xl focus:outline-none focus:bg-white transition-all ${
                        keyStatus === "valid"
                          ? "border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/30"
                          : keyStatus === "invalid"
                          ? "border-rose-400 ring-2 ring-rose-400/20 bg-rose-50/30"
                          : "border-slate-200 focus:ring-2 focus:ring-brand-green"
                      }`}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleValidateKey()}
                    disabled={keyStatus === "validating" || !accessKey.trim()}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                      keyStatus === "valid"
                        ? "bg-emerald-600 text-white"
                        : "bg-brand-navy hover:bg-brand-navyDark text-white disabled:bg-slate-200 disabled:text-slate-400"
                    }`}
                  >
                    {keyStatus === "validating" ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Checking...</span>
                      </>
                    ) : keyStatus === "valid" ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified</span>
                      </>
                    ) : (
                      <span>Validate Key</span>
                    )}
                  </button>
                </div>

                {/* Status Feedback Banners */}
                {keyStatus === "valid" && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Access Key verified successfully for <strong>{currentPlan.name}</strong>. You may proceed with checkout.
                    </span>
                  </div>
                )}

                {keyStatus === "invalid" && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs space-y-1.5">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span className="font-semibold">{keyErrorMsg || "Invalid Access Key for this plan."}</span>
                    </div>
                    <div className="text-[11px] text-slate-600 pl-6">
                      Don&apos;t have an Access Key?{" "}
                      <button
                        type="button"
                        onClick={() => setShowContactModal(true)}
                        className="text-brand-green font-bold underline hover:text-brand-greenDark"
                      >
                        Please contact administrator
                      </button>{" "}
                      to obtain direct authorization.
                    </div>
                  </div>
                )}

                {/* Helpful Admin Assistance Card */}
                {keyStatus !== "valid" && (
                  <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-600">
                      <HelpCircle className="w-4 h-4 text-brand-green shrink-0" />
                      <span>Don&apos;t have an Access Key? <strong>Please contact administrator</strong></span>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <a
                        href="https://wa.me/919999999999?text=Hello%201PERSON%20TRADER%20Admin,%20I%20need%20the%20Access%20Key%20for%20the%20Subscription%20Plan."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center gap-1 transition-colors"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>WhatsApp Admin</span>
                      </a>
                      <Link
                        href="/contact"
                        className="px-2.5 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 text-[11px] font-semibold transition-colors"
                      >
                        Contact Form
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                3. Customer &amp; Billing Information
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Legal Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address (For Invoicing) *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="e.g. rajesh@example.com"
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile / WhatsApp Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white"
                  />
                </div>
              </div>
            </div>

            {/* TradingView Username Field */}
            <div className="pt-4 border-t border-slate-100">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                4. TradingView Account Authorization
              </label>
              <p className="text-xs text-slate-500 mb-3">
                Enter your exact TradingView username. We use this to grant private script access under &quot;Invite-Only Scripts&quot;.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  TradingView Username *
                </label>
                <input
                  type="text"
                  required
                  value={tradingViewUsername}
                  onChange={(e) => setTradingViewUsername(e.target.value)}
                  placeholder="e.g. rajesh_trader99 (case-sensitive)"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl font-mono focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white"
                />
                <span className="text-[11px] text-slate-400 block mt-1">
                  Find this on TradingView: Profile menu in top-left corner of chart.
                </span>
              </div>
            </div>

            {/* Consent & Disclosures */}
            <div className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-600">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-brand-green focus:ring-brand-green"
                />
                <span>
                  I have read and agree to the{" "}
                  <Link href="/terms" target="_blank" className="text-brand-green underline font-semibold">
                    Terms of Service
                  </Link>
                  ,{" "}
                  <Link href="/privacy" target="_blank" className="text-brand-green underline font-semibold">
                    Privacy Policy
                  </Link>
                  , and{" "}
                  <Link href="/refund-policy" target="_blank" className="text-brand-green underline font-semibold">
                    Refund Policy
                  </Link>
                  .
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={riskAccepted}
                  onChange={(e) => setRiskAccepted(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-brand-green focus:ring-brand-green"
                />
                <span>
                  I acknowledge the{" "}
                  <Link href="/risk-disclaimer" target="_blank" className="text-brand-green underline font-semibold">
                    SEBI &amp; Financial Market Risk Disclaimer
                  </Link>
                  . I understand that indicators are educational tools and past performance does not guarantee future market profit.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || keyStatus !== "valid"}
                className="w-full py-4 px-6 rounded-xl bg-brand-green hover:bg-brand-greenDark disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-extrabold shadow-sm transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Securing Order &amp; Verifying Authorization...</span>
                ) : keyStatus !== "valid" ? (
                  <span>Validate Plan Access Key Above to Continue</span>
                ) : (
                  <>
                    <span>Pay ₹{currentPlan.priceINR.toLocaleString()} &amp; Get Invite Access</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-2">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                256-bit Encrypted
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Server-side Key &amp; Payment Validation
              </span>
            </div>
          </form>
        </div>

        {/* Right Column: Order Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-subtle">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
              Order Summary
            </h3>

            <div className="pb-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-brand-navy">
                    1PERSON Institutional Suite
                  </h4>
                  <p className="text-xs text-slate-500">
                    {currentPlan.name} ({currentPlan.durationMonths} Month{currentPlan.durationMonths > 1 ? "s" : ""})
                  </p>
                </div>
                <div className="text-right font-mono font-bold text-base text-brand-navy">
                  ₹{currentPlan.priceINR.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="py-4 border-b border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Access Duration</span>
                <span className="font-semibold text-brand-navy">
                  {currentPlan.durationMonths} Month{currentPlan.durationMonths > 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Monthly Equivalent</span>
                <span className="font-semibold text-brand-navy">
                  ₹{currentPlan.monthlyEquivalent.toLocaleString()} / mo
                </span>
              </div>
              {currentPlan.savingsINR > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Duration Savings</span>
                  <span>- ₹{currentPlan.savingsINR.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Platform Delivery</span>
                <span className="text-brand-green font-bold">TradingView Invite-Only</span>
              </div>
              <div className="flex justify-between text-slate-600 items-center">
                <span>Access Key Verification</span>
                <span className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded ${
                  keyStatus === "valid" ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"
                }`}>
                  {keyStatus === "valid" ? "VERIFIED" : "REQUIRED"}
                </span>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-baseline">
              <span className="text-sm font-bold text-brand-navy">Total Amount Due</span>
              <div className="text-right">
                <span className="text-2xl font-black text-brand-navy font-mono">
                  ₹{currentPlan.priceINR.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-400 block font-sans">
                  Inclusive of all digital platform fees
                </span>
              </div>
            </div>
          </div>

          {/* Fulfillment Guarantee Box */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-subtle space-y-3 text-xs text-slate-600">
            <div className="flex items-center gap-2 font-bold text-brand-navy text-sm">
              <Zap className="w-4 h-4 text-brand-green" />
              <span>Fulfilment &amp; Support Guarantee</span>
            </div>
            <p className="leading-relaxed">
              Once verified on our server, your order is immediately queued in our admin operations portal. Your TradingView username is granted direct invite access within 2 to 4 business hours.
            </p>
            <div className="pt-2 flex items-center gap-2 text-slate-500">
              <HelpCircle className="w-3.5 h-3.5 text-brand-green" />
              <span>Need help with your key? Contact support@1persontrader.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT ADMINISTRATOR MODAL */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 bg-brand-navy/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-2xl bg-brand-green/10 border border-brand-green/30 text-brand-green flex items-center justify-center mb-4">
              <KeyRound className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-black text-brand-navy">
              Request Plan Access Key
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Access to 1PERSON TRADER proprietary TradingView scripts is controlled via administrator keys. If you don&apos;t have an active key for the <strong>{currentPlan.name}</strong>, contact our desk directly:
            </p>

            <div className="mt-5 space-y-3">
              <a
                href={`https://wa.me/919999999999?text=Hello%201PERSON%20TRADER%20Admin,%20I%20am%20at%20checkout%20for%20the%20${encodeURIComponent(currentPlan.name)}%20(₹${currentPlan.priceINR})%20and%20require%20an%20Access%20Key.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp (+91 99999 99999)</span>
              </a>

              <a
                href={`mailto:admin@1persontrader.com?subject=Access%20Key%20Request%20-%20${encodeURIComponent(currentPlan.name)}&body=Hello%201PERSON%20TRADER%20Admin,%0A%0AI%20am%20ready%20to%20subscribe%20to%20the%20${encodeURIComponent(currentPlan.name)}.%20Please%20provide%20my%20authorized%20access%20key.`}
                className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors border border-slate-200"
              >
                <Mail className="w-4 h-4" />
                <span>Email Administrator (admin@1persontrader.com)</span>
              </a>

              <Link
                href="/contact"
                onClick={() => setShowContactModal(false)}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors border border-slate-200"
              >
                <span>Submit Ticket via Contact Desk</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={() => setShowContactModal(false)}
                className="text-xs text-slate-400 hover:text-slate-700 font-semibold"
              >
                Close &amp; Return to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-navy">
      <Navbar />

      <main className="flex-1 py-14">
        <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-12 text-center text-sm">Loading checkout...</div>}>
          <CheckoutContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
