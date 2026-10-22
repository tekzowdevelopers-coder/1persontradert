"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle2, AlertCircle, MessageSquare } from "lucide-react";
import InstagramIcon from "@/components/InstagramIcon";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BRAND } from "@/lib/data";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          honeypot,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit message");
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-brand-navy">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/20 text-xs font-semibold text-brand-green uppercase tracking-wider mb-3">
              <Mail className="w-3.5 h-3.5 text-brand-green" />
              Direct Support &amp; Inquiry Desk
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-brand-navy tracking-tight">
              Get In Touch With 1PERSON TRADER
            </h1>
            <p className="mt-3 text-base text-slate-600">
              Have questions about our TradingView indicators, need an Access Key, or require activation assistance? Send us a message or reach out on Instagram.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Left Column: Direct Channels & Info (5 cols) */}
            <div className="md:col-span-5 space-y-6">
              <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="text-base font-bold text-brand-navy mb-1">
                    Direct Contact Channels
                  </h3>
                  <p className="text-xs text-slate-500">
                    We respond to inquiries within 2 to 4 business hours during market sessions.
                  </p>
                </div>

                {/* WhatsApp Channel */}
                <a
                  href="https://wa.me/919999999999?text=Hello%201PERSON%20TRADER%20Admin,%20I%20have%20an%20inquiry%20regarding%20indicators%20and%20access%20keys."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 transition-all shadow-subtle group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-navy group-hover:text-emerald-600 transition-colors">
                      Official WhatsApp Admin
                    </h4>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      +91 99999 99999
                    </p>
                    <span className="text-[11px] text-brand-green font-semibold mt-1 inline-block">
                      Instant Access Key Desk →
                    </span>
                  </div>
                </a>

                {/* Instagram Channel */}
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-pink-300 transition-all shadow-subtle group"
                >
                  <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-600 shrink-0 group-hover:scale-105 transition-transform">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-navy group-hover:text-pink-600 transition-colors">
                      Official Instagram
                    </h4>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      {BRAND.instagramHandle}
                    </p>
                    <span className="text-[11px] text-brand-green font-semibold mt-1 inline-block">
                      DM for direct updates →
                    </span>
                  </div>
                </a>

                {/* Email Channel */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-subtle">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-brand-green shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-navy">
                      Support Email
                    </h4>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      {BRAND.supportEmail}
                    </p>
                    <span className="text-[11px] text-slate-400 mt-1 inline-block">
                      Billing, activation &amp; technical help
                    </span>
                  </div>
                </div>

                <div className="pt-2 text-xs text-slate-500 border-t border-slate-200">
                  <strong className="text-brand-navy block mb-1">
                    Operating Hours:
                  </strong>
                  Monday – Friday: 09:00 to 20:00 IST<br />
                  Saturday: 10:00 to 16:00 IST
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form (7 cols) */}
            <div className="md:col-span-7">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-subtle">
                {submitted ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-navy">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                      Thank you for contacting 1PERSON TRADER. Our team will review your message and reply via email promptly.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setName("");
                        setEmail("");
                        setSubject("");
                        setMessage("");
                      }}
                      className="px-5 py-2.5 rounded-xl bg-brand-navy text-white text-xs font-bold hover:bg-brand-navyDark transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-lg font-bold text-brand-navy mb-2">
                      Send Us A Message
                    </h3>

                    {errorMsg && (
                      <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    {/* Anti-spam honeypot (hidden from human visitors) */}
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        name="honeypot"
                        tabIndex={-1}
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        autoComplete="off"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Full Name"
                          className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="email@example.com"
                          className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. TradingView Account Activation / Access Key Inquiry"
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Message *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us what you'd like to ask..."
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green focus:bg-white resize-y"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 px-6 rounded-xl bg-brand-green hover:bg-brand-greenDark disabled:bg-slate-300 text-white text-xs font-bold transition-all shadow-subtle flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{loading ? "Sending Message..." : "Submit Inquiry"}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
