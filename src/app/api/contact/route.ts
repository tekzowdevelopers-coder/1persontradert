import { NextResponse } from "next/server";
import { saveEnquiry } from "@/lib/store";
import { ContactEnquiry } from "@/lib/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message, honeypot } = body;

    // Honeypot anti-spam check: bots fill hidden inputs
    if (honeypot) {
      return NextResponse.json({ success: true, message: "Message received." });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const newEnquiry: ContactEnquiry = {
      id: `enq_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: (subject || "General Inquiry").trim(),
      message: message.trim(),
      status: "NEW",
      createdAt: new Date().toISOString(),
    };

    saveEnquiry(newEnquiry);

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out. We will get back to you shortly.",
    });
  } catch (err: any) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to process inquiry. Please try again." },
      { status: 500 }
    );
  }
}
