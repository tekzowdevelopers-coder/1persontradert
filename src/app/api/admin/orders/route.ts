import { NextResponse } from "next/server";
import { getAllOrders, updateOrderStatus } from "@/lib/store";

const ADMIN_PIN = "admin1person2026";

function isAuthorized(req: Request): boolean {
  const authHeader = req.headers.get("x-admin-pin");
  return authHeader === ADMIN_PIN;
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const orders = getAllOrders();
  return NextResponse.json({ success: true, orders });
}

export async function PATCH(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { orderId, accessStatus, paymentStatus, fulfilmentNotes } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required." },
        { status: 400 }
      );
    }

    const updated = updateOrderStatus(orderId, {
      accessStatus,
      paymentStatus,
      fulfilmentNotes,
    });

    if (!updated) {
      return NextResponse.json(
        { error: "Order not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order: updated });
  } catch (err: any) {
    console.error("Admin order update error:", err);
    return NextResponse.json(
      { error: "Failed to update order status." },
      { status: 500 }
    );
  }
}
