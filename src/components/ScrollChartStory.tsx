"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ShieldCheck, Activity, Sliders, Info, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface Candle {
  x: number;
  open: number;
  high: number;
  low: number;
  close: number;
  vol: number;
  isGreen: boolean;
  stageProgress: number; // scroll progress threshold [0, 1] when this candle becomes visible
}

const CANDLES: Candle[] = [
  // Stage A & B: Market structure consolidation & accumulation
  { x: 60, open: 260, high: 245, low: 275, close: 250, vol: 35, isGreen: false, stageProgress: 0.05 },
  { x: 105, open: 250, high: 235, low: 265, close: 258, vol: 40, isGreen: true, stageProgress: 0.10 },
  { x: 150, open: 258, high: 240, low: 278, close: 272, vol: 50, isGreen: false, stageProgress: 0.16 },
  { x: 195, open: 272, high: 260, low: 295, close: 290, vol: 65, isGreen: false, stageProgress: 0.22 },
  { x: 240, open: 290, high: 280, low: 310, close: 305, vol: 80, isGreen: false, stageProgress: 0.28 },
  // Stage C: Liquidity sweep & BUY point transition
  { x: 285, open: 305, high: 290, low: 325, close: 295, vol: 110, isGreen: true, stageProgress: 0.35 },
  { x: 330, open: 295, high: 260, low: 300, close: 265, vol: 140, isGreen: true, stageProgress: 0.42 },
  // Stage D: Strong upward expansion leg
  { x: 375, open: 265, high: 235, low: 270, close: 240, vol: 125, isGreen: true, stageProgress: 0.48 },
  { x: 420, open: 240, high: 210, low: 245, close: 215, vol: 115, isGreen: true, stageProgress: 0.54 },
  { x: 465, open: 215, high: 190, low: 220, close: 195, vol: 95, isGreen: true, stageProgress: 0.60 },
  { x: 510, open: 195, high: 165, low: 200, close: 170, vol: 105, isGreen: true, stageProgress: 0.66 },
  // Stage E: Peak resistance & rollover into SELL point
  { x: 555, open: 170, high: 140, low: 175, close: 148, vol: 130, isGreen: true, stageProgress: 0.72 },
  { x: 600, open: 148, high: 135, low: 165, close: 160, vol: 115, isGreen: false, stageProgress: 0.78 },
  { x: 645, open: 160, high: 150, low: 195, close: 190, vol: 120, isGreen: false, stageProgress: 0.84 },
  // Stage F: Order flow descent / distribution confirmation
  { x: 690, open: 190, high: 180, low: 225, close: 220, vol: 95, isGreen: false, stageProgress: 0.90 },
  { x: 735, open: 220, high: 210, low: 250, close: 245, vol: 85, isGreen: false, stageProgress: 0.95 },
  { x: 780, open: 245, high: 235, low: 275, close: 270, vol: 70, isGreen: false, stageProgress: 1.00 },
];

export default function ScrollChartStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [manualScrub, setManualScrub] = useState<number | null>(null);
  const [activeMarket, setActiveMarket] = useState("NIFTY 50 • 15m");

  const progress = manualScrub !== null ? manualScrub : scrollProgress;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;

      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, scrolled / totalScrollable));

      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setScrollProgress(rawProgress);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Narrative based on progress
  let currentStageTitle = "Stage A: Market Structure Analysis";
  let currentStageDesc = "The Pine Script algorithm scans institutional swing highs and lows, identifying structure shifts.";
  let stageBadge = "MONITORING";
  let badgeColor = "bg-slate-100 text-slate-800 border-slate-300";

  if (progress >= 0.35 && progress < 0.68) {
    currentStageTitle = "Stage B & C: Verified BUY Signal Triggered";
    currentStageDesc = "At confirmed candle close, liquidity sweep occurs. A non-repainting BUY badge prints with quantitative stop-loss guidance.";
    stageBadge = "BUY SIGNAL ACTIVE";
    badgeColor = "bg-emerald-50 text-emerald-800 border-emerald-300";
  } else if (progress >= 0.68 && progress < 0.85) {
    currentStageTitle = "Stage D & E: Upside Target Hit & SELL Signal Confirmation";
    currentStageDesc = "Price tests the upper resistance liquidity pool. Rejection is detected, generating an automated SELL signal upon bar close.";
    stageBadge = "SELL SIGNAL ACTIVE";
    badgeColor = "bg-rose-50 text-rose-800 border-rose-300";
  } else if (progress >= 0.85) {
    currentStageTitle = "Stage F: Complete Strategy Cycle Finished";
    currentStageDesc = "The full reversal cycle completes without repainting. Signals remain permanently plotted for objective review and execution.";
    stageBadge = "CYCLE COMPLETED";
    badgeColor = "bg-emerald-50 text-emerald-800 border-emerald-300";
  }

  const visibleCandles = CANDLES.filter((c) => c.stageProgress <= progress + 0.04);
  const lastVisible = visibleCandles[visibleCandles.length - 1];

  const showBuySignal = progress >= 0.35;
  const showSellSignal = progress >= 0.72;

  return (
    <section
      ref={containerRef}
      id="chart-story"
      className="relative w-full bg-white text-brand-dark"
      style={{ height: prefersReducedMotion ? "auto" : "260vh" }}
    >
      <div className={`${prefersReducedMotion ? "relative py-12" : "sticky top-16 md:top-20"} min-h-[85vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto`}>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-3">
            <Activity className="w-3.5 h-3.5 text-brand-green" />
            Signature Interaction • Scroll-Driven Signal Demonstration
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-brand-dark">
            See How The Indicator Plots In Real-Time
          </h2>
          <p className="mt-2 text-sm sm:text-base text-brand-subtle">
            Scroll down naturally to watch the chart structure form. Signals print strictly upon candle close with zero repainting.
          </p>
        </div>

        {/* Narrative Status Bar */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-4 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${badgeColor}`}>
              {stageBadge}
            </span>
            <div>
              <h3 className="text-sm font-bold text-brand-dark">{currentStageTitle}</h3>
              <p className="text-xs text-brand-subtle">{currentStageDesc}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto">
            <Info className="w-3.5 h-3.5 text-brand-green shrink-0" />
            <span>Illustrative example — not live market data</span>
          </div>
        </div>

        {/* Main Chart Graphic Panel */}
        <div className="relative bg-white border border-slate-300 rounded-2xl shadow-card overflow-hidden">
          {/* Top Chart Toolbar */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-200 px-4 py-2.5 bg-slate-50/80 text-xs text-slate-600 gap-2">
            <div className="flex items-center gap-3">
              <span className="font-bold text-brand-navy flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-pulse" />
                {activeMarket}
              </span>
              <span className="hidden sm:inline-block text-slate-300">|</span>
              <span className="text-slate-500 hidden sm:inline-block">1PERSON Institutional Suite v2.4</span>
            </div>

            {/* Quick timeframe / asset selector */}
            <div className="flex items-center gap-1">
              {["NIFTY 50", "BANK NIFTY", "BTC/USDT", "EUR/USD"].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveMarket(`${item} • 15m`)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                    activeMarket.includes(item)
                      ? "bg-brand-navy text-white shadow-xs"
                      : "text-slate-600 hover:bg-slate-200/70"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Price Chart */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[460px] bg-[#FCFDFD]">
            <svg
              viewBox="0 0 880 400"
              className="w-full h-full select-none"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="buyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00A651" />
                  <stop offset="100%" stopColor="#008440" />
                </linearGradient>
                <linearGradient id="sellGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E53935" />
                  <stop offset="100%" stopColor="#C62828" />
                </linearGradient>
              </defs>

              {/* Grid Lines (Horizontal) */}
              {[80, 140, 200, 260, 320].map((yVal) => (
                <g key={yVal}>
                  <line
                    x1="40"
                    y1={yVal}
                    x2="820"
                    y2={yVal}
                    stroke="#E2E8F0"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <text
                    x="830"
                    y={yVal + 4}
                    fontSize="10"
                    fill="#94A3B8"
                    fontFamily="monospace"
                  >
                    {(24800 - yVal * 12).toLocaleString()}
                  </text>
                </g>
              ))}

              {/* Vertical Time Grid lines */}
              {[150, 300, 450, 600, 750].map((xVal, idx) => (
                <g key={xVal}>
                  <line
                    x1={xVal}
                    y1="60"
                    x2={xVal}
                    y2="340"
                    stroke="#F1F5F9"
                    strokeWidth="1"
                  />
                  <text
                    x={xVal - 15}
                    y="360"
                    fontSize="10"
                    fill="#94A3B8"
                    fontFamily="monospace"
                  >
                    {`0${idx + 9}:30`}
                  </text>
                </g>
              ))}

              {/* Liquidity Accumulation Zone Box */}
              {progress > 0.15 && (
                <g opacity={Math.min(1, (progress - 0.15) * 4)}>
                  <rect
                    x="180"
                    y="275"
                    width="180"
                    height="50"
                    fill="#00A651"
                    fillOpacity="0.08"
                    stroke="#00A651"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    rx="4"
                  />
                  <text
                    x="190"
                    y="295"
                    fontSize="9"
                    fontWeight="bold"
                    fill="#008440"
                  >
                    INSTITUTIONAL LIQUIDITY POOL
                  </text>
                </g>
              )}

              {/* Resistance Distribution Zone Box */}
              {progress > 0.60 && (
                <g opacity={Math.min(1, (progress - 0.60) * 4)}>
                  <rect
                    x="520"
                    y="125"
                    width="150"
                    height="45"
                    fill="#E53935"
                    fillOpacity="0.08"
                    stroke="#E53935"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    rx="4"
                  />
                  <text
                    x="530"
                    y="145"
                    fontSize="9"
                    fontWeight="bold"
                    fill="#C62828"
                  >
                    DISTRIBUTION SUPPLY ZONE
                  </text>
                </g>
              )}

              {/* Candlesticks */}
              {visibleCandles.map((candle, idx) => {
                const candleWidth = 14;
                const candleColor = candle.isGreen ? "#00A651" : "#E53935";
                const bodyY = Math.min(candle.open, candle.close);
                const bodyHeight = Math.max(4, Math.abs(candle.open - candle.close));

                return (
                  <g key={idx} className="transition-opacity duration-300">
                    <line
                      x1={candle.x}
                      y1={candle.high}
                      x2={candle.x}
                      y2={candle.low}
                      stroke={candleColor}
                      strokeWidth="1.75"
                    />
                    <rect
                      x={candle.x - candleWidth / 2}
                      y={bodyY}
                      width={candleWidth}
                      height={bodyHeight}
                      fill={candleColor}
                      rx="2"
                    />
                    <rect
                      x={candle.x - candleWidth / 2}
                      y={340 - candle.vol * 0.45}
                      width={candleWidth}
                      height={candle.vol * 0.45}
                      fill={candleColor}
                      fillOpacity="0.25"
                      rx="1"
                    />
                  </g>
                );
              })}

              {/* BUY SIGNAL OVERLAY */}
              {showBuySignal && (
                <g
                  className="transition-all duration-300"
                  opacity={Math.min(1, (progress - 0.35) * 5)}
                >
                  <line
                    x1="330"
                    y1="100"
                    x2="330"
                    y2="330"
                    stroke="#00A651"
                    strokeWidth="1.25"
                    strokeDasharray="4 3"
                    opacity="0.7"
                  />
                  <circle cx="330" cy="300" r="7" fill="#00A651" fillOpacity="0.25" />
                  <circle cx="330" cy="300" r="3.5" fill="#00A651" />

                  <g transform="translate(305, 315)">
                    <rect
                      x="0"
                      y="0"
                      width="54"
                      height="22"
                      rx="4"
                      fill="url(#buyGrad)"
                      filter="drop-shadow(0 2px 5px rgba(0, 166, 81, 0.35))"
                    />
                    <path
                      d="M8 14 L12 8 L16 14 Z"
                      fill="#FFFFFF"
                    />
                    <text
                      x="20"
                      y="15"
                      fill="#FFFFFF"
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="sans-serif"
                    >
                      BUY
                    </text>
                  </g>

                  <g transform="translate(230, 220)">
                    <rect
                      x="0"
                      y="0"
                      width="125"
                      height="38"
                      rx="6"
                      fill="#FFFFFF"
                      stroke="#00A651"
                      strokeWidth="1"
                      filter="drop-shadow(0 2px 6px rgba(0, 0, 0, 0.08))"
                    />
                    <text x="8" y="16" fontSize="9" fontWeight="bold" fill="#182036">
                      BUY SIGNAL @ 24,580
                    </text>
                    <text x="8" y="29" fontSize="8" fill="#475569">
                      Structure Breakout Confirmed
                    </text>
                  </g>
                </g>
              )}

              {/* SELL SIGNAL OVERLAY */}
              {showSellSignal && (
                <g
                  className="transition-all duration-300"
                  opacity={Math.min(1, (progress - 0.72) * 5)}
                >
                  <line
                    x1="600"
                    y1="80"
                    x2="600"
                    y2="330"
                    stroke="#E53935"
                    strokeWidth="1.25"
                    strokeDasharray="4 3"
                    opacity="0.7"
                  />
                  <circle cx="600" cy="135" r="7" fill="#E53935" fillOpacity="0.25" />
                  <circle cx="600" cy="135" r="3.5" fill="#E53935" />

                  <g transform="translate(575, 95)">
                    <rect
                      x="0"
                      y="0"
                      width="54"
                      height="22"
                      rx="4"
                      fill="url(#sellGrad)"
                      filter="drop-shadow(0 2px 5px rgba(229, 57, 53, 0.35))"
                    />
                    <path
                      d="M8 8 L12 14 L16 8 Z"
                      fill="#FFFFFF"
                    />
                    <text
                      x="20"
                      y="15"
                      fill="#FFFFFF"
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="sans-serif"
                    >
                      SELL
                    </text>
                  </g>

                  <g transform="translate(590, 175)">
                    <rect
                      x="0"
                      y="0"
                      width="130"
                      height="38"
                      rx="6"
                      fill="#FFFFFF"
                      stroke="#E53935"
                      strokeWidth="1"
                      filter="drop-shadow(0 2px 6px rgba(0, 0, 0, 0.08))"
                    />
                    <text x="8" y="16" fontSize="9" fontWeight="bold" fill="#182036">
                      SELL SIGNAL @ 24,960
                    </text>
                    <text x="8" y="29" fontSize="8" fill="#475569">
                      Distribution & Rollover
                    </text>
                  </g>
                </g>
              )}

              {/* Current Price Dot & Crosshair */}
              {lastVisible && (
                <g>
                  <circle
                    cx={lastVisible.x}
                    cy={lastVisible.close}
                    r="4.5"
                    fill="#00A651"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    filter="drop-shadow(0 0 6px #00A651)"
                  />
                  <line
                    x1={lastVisible.x}
                    y1="60"
                    x2={lastVisible.x}
                    y2="340"
                    stroke="#00A651"
                    strokeWidth="0.8"
                    strokeDasharray="2 2"
                    opacity="0.5"
                  />
                </g>
              )}
            </svg>
          </div>

          {/* Interactive Scrubbing Controls */}
          <div className="border-t border-slate-200 px-4 py-3 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
              <span className="text-slate-500 font-medium mr-1 flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5 text-brand-green" /> Progress:
              </span>
              {[
                { label: "1. Structure", val: 0.15 },
                { label: "2. Accumulation", val: 0.32 },
                { label: "3. BUY Signal", val: 0.48 },
                { label: "4. Expansion", val: 0.65 },
                { label: "5. SELL Signal", val: 0.80 },
                { label: "6. Cycle End", val: 1.0 },
              ].map((step) => (
                <button
                  key={step.label}
                  onClick={() => setManualScrub(step.val)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    Math.abs(progress - step.val) < 0.1
                      ? "bg-brand-navy text-white shadow-xs"
                      : "bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200"
                  }`}
                >
                  {step.label}
                </button>
              ))}

              {manualScrub !== null && (
                <button
                  onClick={() => setManualScrub(null)}
                  className="px-2 py-1 text-[11px] text-brand-green hover:underline ml-1 font-semibold"
                >
                  Auto-Scroll
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 font-mono">
                {Math.round(progress * 100)}%
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={progress}
                onChange={(e) => setManualScrub(parseFloat(e.target.value))}
                aria-label="Interactive chart progression scrubber"
                className="w-32 sm:w-44 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-green"
              />
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-green hover:bg-brand-greenDark text-white text-xs font-bold transition-all shadow-xs"
              >
                <span>View Plans</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Checkpoints */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-brand-navy">Confirmed Candle Close</h4>
              <p className="text-xs text-brand-subtle mt-0.5">
                Signals evaluate strictly when the active candlestick finishes its duration. Eliminates intra-bar flicker.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-brand-navy">Zero Repainting Guarantee</h4>
              <p className="text-xs text-brand-subtle mt-0.5">
                Past signals do not shift, modify, or vanish in backtests or live forward-testing charts.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 flex items-start gap-3">
            <Activity className="w-5 h-5 text-brand-navy shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-brand-navy">Integrated Risk Framework</h4>
              <p className="text-xs text-brand-subtle mt-0.5">
                Every trade suggestion comes paired with logical structural stop-loss and multiple take-profit guides.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
