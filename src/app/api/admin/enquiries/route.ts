import { NextResponse } from "next/server";
import { getAllEnquiriesAsync } from "@/lib/store";

const ADMIN_PIN = "admin1person2026";

function isAuthorized(req: Request): boolean {
  const authHeader = req.headers.get("x-admin-pin");
  return authHeader === ADMIN_PIN;
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const enquiries = await getAllEnquiriesAsync();
  return NextResponse.json({ success: true, enquiries });
}
