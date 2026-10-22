"use client";

import React, { useState } from "react";
import { Sliders, BarChart2, Info } from "lucide-react";

interface AssetData {
  name: string;
  category: string;
  candles: {
    x: number;
    open: number;
    high: number;
    low: number;
    close: number;
    isGreen: boolean;
    buySignal?: boolean;
    sellSignal?: boolean;
  }[];
}

const SAMPLE_MARKETS: Record<string, AssetData> = {
  nifty: {
    name: "NIFTY 50 (Index Futures)",
    category: "Indian Equities",
    candles: [
      { x: 50, open: 180, high: 165, low: 195, close: 175, isGreen: true },
      { x: 90, open: 175, high: 160, low: 185, close: 168, isGreen: true },
      { x: 130, open: 168, high: 155, low: 190, close: 185, isGreen: false },
      { x: 170, open: 185, high: 175, low: 220, close: 215, isGreen: false },
      { x: 210, open: 215, high: 200, low: 235, close: 225, isGreen: false },
      { x: 250, open: 225, high: 210, low: 240, close: 215, isGreen: true, buySignal: true },
      { x: 290, open: 215, high: 180, low: 220, close: 185, isGreen: true },
      { x: 330, open: 185, high: 160, low: 190, close: 165, isGreen: true },
      { x: 370, open: 165, high: 140, low: 170, close: 145, isGreen: true },
      { x: 410, open: 145, high: 125, low: 150, close: 130, isGreen: true },
      { x: 450, open: 130, high: 110, low: 135, close: 115, isGreen: true },
      { x: 490, open: 115, high: 105, low: 130, close: 125, isGreen: false, sellSignal: true },
      { x: 530, open: 125, high: 115, low: 145, close: 140, isGreen: false },
      { x: 570, open: 140, high: 130, low: 165, close: 160, isGreen: false },
    ],
  },
  crypto: {
    name: "BTC / USDT (1H Perpetual)",
    category: "Crypto",
    candles: [
      { x: 50, open: 200, high: 185, low: 215, close: 210, isGreen: false },
      { x: 90, open: 210, high: 195, low: 230, close: 225, isGreen: false },
      { x: 130, open: 225, high: 215, low: 250, close: 245, isGreen: false },
      { x: 170, open: 245, high: 230, low: 260, close: 235, isGreen: true, buySignal: true },
      { x: 210, open: 235, high: 205, low: 240, close: 210, isGreen: true },
      { x: 250, open: 210, high: 185, low: 215, close: 190, isGreen: true },
      { x: 290, open: 190, high: 165, low: 195, close: 170, isGreen: true },
      { x: 330, open: 170, high: 155, low: 180, close: 160, isGreen: true },
      { x: 370, open: 160, high: 145, low: 175, close: 168, isGreen: false, sellSignal: true },
      { x: 410, open: 168, high: 160, low: 195, close: 190, isGreen: false },
      { x: 450, open: 190, high: 180, low: 210, close: 205, isGreen: false },
      { x: 490, open: 205, high: 195, low: 225, close: 200, isGreen: true, buySignal: true },
      { x: 530, open: 200, high: 175, low: 205, close: 180, isGreen: true },
      { x: 570, open: 180, high: 160, low: 185, close: 165, isGreen: true },
    ],
  },
  forex: {
    name: "EUR / USD (15m Spot)",
    category: "Forex",
    candles: [
      { x: 50, open: 140, high: 125, low: 150, close: 130, isGreen: true },
      { x: 90, open: 130, high: 120, low: 145, close: 142, isGreen: false, sellSignal: true },
      { x: 130, open: 142, high: 135, low: 170, close: 165, isGreen: false },
      { x: 170, open: 165, high: 155, low: 190, close: 185, isGreen: false },
      { x: 210, open: 185, high: 175, low: 215, close: 210, isGreen: false },
      { x: 250, open: 210, high: 195, low: 225, close: 200, isGreen: true, buySignal: true },
      { x: 290, open: 200, high: 175, low: 205, close: 180, isGreen: true },
      { x: 330, open: 180, high: 160, low: 185, close: 165, isGreen: true },
      { x: 370, open: 165, high: 145, low: 170, close: 150, isGreen: true },
      { x: 410, open: 150, high: 135, low: 155, close: 140, isGreen: true },
      { x: 450, open: 140, high: 130, low: 160, close: 155, isGreen: false, sellSignal: true },
      { x: 490, open: 155, high: 145, low: 175, close: 170, isGreen: false },
      { x: 530, open: 170, high: 160, low: 190, close: 185, isGreen: false },
      { x: 570, open: 185, high: 175, low: 205, close: 200, isGreen: false },
    ],
  },
};

export default function InteractiveIndicatorSimulator() {
  const [selectedMarketKey, setSelectedMarketKey] = useState("nifty");
  const [sensitivity, setSensitivity] = useState<"conservative" | "balanced" | "aggressive">("balanced");
  const [showVolumeFilter, setShowVolumeFilter] = useState(true);

  const market = SAMPLE_MARKETS[selectedMarketKey];

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-3">
            <Sliders className="w-3.5 h-3.5 text-brand-green" />
            Interactive Testing Sandbox
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">
            Test Indicator Sensitivity & Asset Behavior
          </h2>
          <p className="mt-3 text-base text-brand-subtle">
            Experiment with different asset structures and filter modes. See how signals filter noise to prioritize institutional setups.
          </p>
        </div>

        {/* Simulator Container */}
        <div className="bg-slate-50 border border-slate-300 rounded-3xl p-4 sm:p-6 shadow-subtle">
          {/* Top Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Asset Selector */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200">
              <label className="text-xs font-bold text-slate-700 block mb-2">
                Select Market Asset:
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs font-semibold">
                {Object.entries(SAMPLE_MARKETS).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedMarketKey(key)}
                    className={`py-2 px-2 rounded-xl text-center transition-all ${
                      selectedMarketKey === key
                        ? "bg-brand-navy text-white shadow-xs font-bold"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {item.category}
                  </button>
                ))}
              </div>
            </div>

            {/* Sensitivity Setting */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200">
              <label className="text-xs font-bold text-slate-700 block mb-2">
                Noise Sensitivity Mode:
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs font-semibold">
                {(["conservative", "balanced", "aggressive"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setSensitivity(mode)}
                    className={`py-2 px-2 rounded-xl text-center capitalize transition-all ${
                      sensitivity === mode
                        ? "bg-brand-green text-white shadow-xs font-bold"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Confirmation Filters */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col justify-between">
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Volume & Order Flow Filter:
              </label>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-slate-600 font-medium">
                  {showVolumeFilter ? "High Volume (Enabled)" : "Raw Structure Only"}
                </span>
                <button
                  onClick={() => setShowVolumeFilter(!showVolumeFilter)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    showVolumeFilter ? "bg-brand-green" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      showVolumeFilter ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Chart Visualizer */}
          <div className="relative bg-white border border-slate-200 rounded-2xl overflow-hidden p-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3 text-xs">
              <span className="font-bold text-brand-dark flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-brand-green" />
                {market.name}
              </span>
              <span className="text-slate-500 font-mono text-[11px]">
                Mode: <span className="text-brand-dark font-bold capitalize">{sensitivity}</span> • Volume Weight:{" "}
                <span className="text-emerald-700 font-bold">{showVolumeFilter ? "Active" : "Bypassed"}</span>
              </span>
            </div>

            <div className="w-full aspect-[21/9] max-h-[340px]">
              <svg viewBox="0 0 620 280" className="w-full h-full select-none">
                {[60, 110, 160, 210, 260].map((y) => (
                  <line
                    key={y}
                    x1="30"
                    y1={y}
                    x2="590"
                    y2={y}
                    stroke="#F1F5F9"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                ))}

                {market.candles.map((candle, idx) => {
                  const candleWidth = 14;
                  const candleColor = candle.isGreen ? "#00A651" : "#E53935";
                  const bodyY = Math.min(candle.open, candle.close);
                  const bodyHeight = Math.max(5, Math.abs(candle.open - candle.close));

                  const allowBuy = candle.buySignal;
                  const allowSell =
                    candle.sellSignal &&
                    (sensitivity !== "conservative" || showVolumeFilter);

                  return (
                    <g key={idx}>
                      <line
                        x1={candle.x}
                        y1={candle.high}
                        x2={candle.x}
                        y2={candle.low}
                        stroke={candleColor}
                        strokeWidth="1.5"
                      />
                      <rect
                        x={candle.x - candleWidth / 2}
                        y={bodyY}
                        width={candleWidth}
                        height={bodyHeight}
                        fill={candleColor}
                        rx="1.5"
                      />

                      {allowBuy && (
                        <g transform={`translate(${candle.x - 22}, ${candle.low + 12})`}>
                          <rect
                            x="0"
                            y="0"
                            width="44"
                            height="18"
                            rx="3"
                            fill="#00A651"
                          />
                          <text
                            x="22"
                            y="12"
                            fill="#FFFFFF"
                            fontSize="9"
                            fontWeight="bold"
                            textAnchor="middle"
                          >
                            BUY
                          </text>
                        </g>
                      )}

                      {allowSell && (
                        <g transform={`translate(${candle.x - 22}, ${candle.high - 26})`}>
                          <rect
                            x="0"
                            y="0"
                            width="44"
                            height="18"
                            rx="3"
                            fill="#E53935"
                          />
                          <text
                            x="22"
                            y="12"
                            fill="#FFFFFF"
                            fontSize="9"
                            fontWeight="bold"
                            textAnchor="middle"
                          >
                            SELL
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-brand-green" />
                Demonstration simulator using stylized bar series. Live indicator runs natively inside TradingView Pine Script v5.
              </span>
              <span className="font-semibold text-emerald-700 hidden sm:inline-block">
                All signals strictly confirmed on bar close
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
