import { NextResponse } from "next/server";
import { getAccessKeysAsync, saveAccessKeysAsync } from "@/lib/keys";

const ADMIN_PIN = "admin1person2026";

function isAuthorized(req: Request): boolean {
  const authHeader = req.headers.get("x-admin-pin");
  return authHeader === ADMIN_PIN;
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const keys = await getAccessKeysAsync();
  return NextResponse.json({ success: true, keys });
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { monthly, quarterly, "half-yearly": halfYearly } = body;

    const updated = await saveAccessKeysAsync({
      monthly,
      quarterly,
      "half-yearly": halfYearly,
    });

    return NextResponse.json({ success: true, keys: updated });
  } catch (err: any) {
    console.error("Error saving keys:", err);
    return NextResponse.json(
      { error: "Failed to update access keys." },
      { status: 500 }
    );
  }
}
