import { NextResponse } from "next/server";
import { validatePlanAccessKeyAsync } from "@/lib/keys";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { planId, accessKey } = body;

    if (!planId || !accessKey) {
      return NextResponse.json(
        { valid: false, message: "Plan ID and Access Key are required." },
        { status: 400 }
      );
    }

    const result = await validatePlanAccessKeyAsync(planId, accessKey);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { valid: false, message: "Validation error occurred." },
      { status: 500 }
    );
  }
}
