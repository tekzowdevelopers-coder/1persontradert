import { NextResponse } from "next/server";
import { PLANS } from "@/lib/data";
import { saveOrder } from "@/lib/store";
import { Order } from "@/lib/types";
import { validatePlanAccessKey } from "@/lib/keys";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      planId,
      customerName,
      customerEmail,
      customerPhone,
      tradingViewUsername,
      accessKey,
      termsAccepted,
      riskAccepted,
    } = body;

    // Validate required fields
    if (!planId || !customerName || !customerEmail || !customerPhone || !tradingViewUsername || !accessKey) {
      return NextResponse.json(
        { error: "All fields are required, including your TradingView username and Access Key." },
        { status: 400 }
      );
    }

    if (!termsAccepted || !riskAccepted) {
      return NextResponse.json(
        { error: "You must accept the Terms of Service and Risk Disclaimer to proceed." },
        { status: 400 }
      );
    }

    // Validate Access Key strictly
    const keyValidation = validatePlanAccessKey(planId, accessKey);
    if (!keyValidation.valid) {
      return NextResponse.json(
        { error: keyValidation.message || "Invalid Access Key. Please contact administrator." },
        { status: 400 }
      );
    }

    // Server-side plan lookup and price validation
    const plan = PLANS.find((p) => p.id === planId);
    if (!plan) {
      return NextResponse.json(
        { error: "Invalid plan selected. Only approved plans are supported." },
        { status: 400 }
      );
    }

    // Generate deterministic unique order reference
    const timestamp = Date.now();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `1P-${timestamp.toString().slice(-6)}-${randomSuffix}`;

    const newOrder: Order = {
      id: `ord_${timestamp}_${randomSuffix}`,
      orderNumber,
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim().toLowerCase(),
      customerPhone: customerPhone.trim(),
      tradingViewUsername: tradingViewUsername.trim(),
      planId: plan.id,
      planName: plan.name,
      amountINR: plan.priceINR,
      durationMonths: plan.durationMonths,
      accessKey: accessKey.trim(),
      paymentStatus: "PENDING",
      accessStatus: "PENDING_INVITE",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveOrder(newOrder);

    return NextResponse.json({
      success: true,
      order: newOrder,
      razorpayOrder: {
        id: `order_sim_${timestamp}`,
        amount: plan.priceINR * 100, // paise
        currency: "INR",
      },
    });
  } catch (err: any) {
    console.error("Checkout initiation error:", err);
    return NextResponse.json(
      { error: "Failed to initialize order checkout. Please try again." },
      { status: 500 }
    );
  }
}
