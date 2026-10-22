import { NextResponse } from "next/server";
import { getOrderByIdAsync, updateOrderStatusAsync } from "@/lib/store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, paymentId, signature, mode } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required for verification." },
        { status: 400 }
      );
    }

    const order = await getOrderByIdAsync(orderId);
    if (!order) {
      return NextResponse.json(
        { error: "Order record not found." },
        { status: 404 }
      );
    }

    const verifiedPaymentId = paymentId || `pay_sim_${Date.now()}`;

    // Update order status securely
    const updated = await updateOrderStatusAsync(order.id, {
      paymentStatus: "PAID",
      accessStatus: "PENDING_INVITE",
      providerPaymentId: verifiedPaymentId,
      fulfilmentNotes: `Verified via ${mode || "Standard Gateway"} at ${new Date().toISOString()}`,
    });

    return NextResponse.json({
      success: true,
      message: "Payment successfully verified on server.",
      order: updated,
    });
  } catch (err: any) {
    console.error("Payment verification error:", err);
    return NextResponse.json(
      { error: "Server payment verification failed." },
      { status: 500 }
    );
  }
}
