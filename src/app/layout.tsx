import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://1persontrader.com"),
  title: "1PERSON TRADER | Institutional Order Flow & Reversal Indicator Suite",
  description:
    "Official 1PERSON TRADER (11% TRADER) platform. Zero-repainting Pine Script indicators for TradingView. Clean market structure shifts, liquidity sweep confirmation, and objective risk management.",
  keywords: [
    "1PERSON TRADER",
    "11% TRADER",
    "TradingView Indicator",
    "Pine Script v5",
    "Zero Repainting Indicator",
    "Order Flow Analysis",
    "Liquidity Sweep",
    "Nifty Trading Indicator",
    "BankNifty Strategy",
    "Crypto TradingView Signals",
    "Discipline Today Freedom Tomorrow",
  ],
  authors: [{ name: "1PERSON TRADER" }],
  openGraph: {
    title: "1PERSON TRADER | Institutional Order Flow & Reversal Indicator Suite",
    description:
      "Discipline Today, Freedom Tomorrow. Proprietary TradingView Pine Script v5 indicators engineered with 100% zero-repainting execution.",
    url: "https://1persontrader.com",
    siteName: "1PERSON TRADER",
    images: [
      {
        url: "/images/1person-trader-logo.jpg",
        width: 800,
        height: 800,
        alt: "1PERSON TRADER Official Brand Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "1PERSON TRADER | Institutional Order Flow Indicator",
    description: "Zero repainting TradingView indicator suite. Discipline Today, Freedom Tomorrow.",
    images: ["/images/1person-trader-logo.jpg"],
  },
  icons: {
    icon: "/images/1person-trader-logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-white text-brand-dark min-h-screen">
        {children}
      </body>
    </html>
  );
}
