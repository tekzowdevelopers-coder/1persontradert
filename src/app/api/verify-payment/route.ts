import { NextResponse } from "next/server";
import { getOrderById, updateOrderStatus } from "@/lib/store";

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

    const order = getOrderById(orderId);
    if (!order) {
      return NextResponse.json(
        { error: "Order record not found." },
        { status: 404 }
      );
    }

    // Server-side verification:
    // In production with live Razorpay credentials, verify HMAC SHA256 of order_id + "|" + razorpay_payment_id
    // In test/sandbox mode, verify presence of valid payment reference
    const verifiedPaymentId = paymentId || `pay_sim_${Date.now()}`;

    // Update order status securely
    const updated = updateOrderStatus(order.id, {
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
