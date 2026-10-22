"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight } from "lucide-react";
import InstagramIcon from "@/components/InstagramIcon";
import { BRAND } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-subtle"
          : "bg-white border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative w-12 h-12 shrink-0 rounded-xl overflow-hidden border border-slate-200/90 bg-white p-1 shadow-xs group-hover:border-brand-green/50 transition-colors">
              <Image
                src="/images/1person-trader-logo.png"
                alt="1PERSON TRADER Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-brand-navy group-hover:text-black transition-colors">
                <span className="text-brand-green">1PERSON</span> TRADER
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                Discipline Today • Freedom Tomorrow
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <Link
              href="/"
              className="hover:text-brand-green transition-colors py-1"
            >
              Home
            </Link>
            <Link
              href="/#chart-story"
              className="hover:text-brand-green transition-colors py-1 flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              Scroll Chart Demo
            </Link>
            <Link
              href="/indicators"
              className="hover:text-brand-green transition-colors py-1"
            >
              Indicators
            </Link>
            <Link
              href="/pricing"
              className="hover:text-brand-green transition-colors py-1"
            >
              Pricing
            </Link>
            <Link
              href="/#how-it-works"
              className="hover:text-brand-green transition-colors py-1"
            >
              How It Works
            </Link>
            <Link
              href="/faq"
              className="hover:text-brand-green transition-colors py-1"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="hover:text-brand-green transition-colors py-1"
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-black bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
              title="Official Instagram Account"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-brand-green" />
              <span>{BRAND.instagramHandle}</span>
            </a>

            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navyDark text-white text-xs font-bold transition-all shadow-subtle hover:shadow-card group"
            >
              <span>Get Access</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-brand-green group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-green"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-1.5 text-sm font-semibold text-slate-700">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-slate-50 hover:text-brand-green"
            >
              Home
            </Link>
            <Link
              href="/#chart-story"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-slate-50 flex items-center gap-2 text-brand-green"
            >
              <span className="w-2 h-2 rounded-full bg-brand-green" />
              Scroll Chart Demo
            </Link>
            <Link
              href="/indicators"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-slate-50 hover:text-brand-green"
            >
              Indicators
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-slate-50 text-brand-green font-bold"
            >
              Pricing (from ₹4,000)
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-slate-50 hover:text-brand-green"
            >
              How It Works
            </Link>
            <Link
              href="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-slate-50 hover:text-brand-green"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-slate-50 hover:text-brand-green"
            >
              Contact
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-xl hover:bg-slate-50 text-xs text-slate-500"
            >
              Admin Portal
            </Link>
          </nav>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-xl"
            >
              <InstagramIcon className="w-4 h-4 text-brand-green" />
              Follow {BRAND.instagramHandle}
            </a>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-3 bg-brand-navy text-white text-xs font-bold rounded-xl shadow-sm"
            >
              <span>View Approved Plans</span>
              <ArrowUpRight className="w-4 h-4 text-brand-green" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
