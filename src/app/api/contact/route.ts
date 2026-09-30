import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json({ error: "Resend API key is not configured." }, { status: 500 });
    }

    const resend = new Resend(resendApiKey);

    // Primary recipient configured in environment
    const recipientEmail = process.env.CONTACT_EMAIL || "rohanprusty28@gmail.com";

    const emailPayload = {
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [recipientEmail],
      replyTo: email,
      subject: `[Portfolio Contact] ${subject || "New Inquiry"} from ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px; color: #1a1a1a; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; background-color: #ffffff;">
          <h2 style="color: #f39c12; margin-top: 0; border-bottom: 2px solid #f39c12; padding-bottom: 8px;">New Portfolio Inquiry</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 100px;"><strong>Sender:</strong></td>
              <td style="padding: 8px 0;"><strong>${name}</strong> (&lt;<a href="mailto:${email}">${email}</a>&gt;)</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Subject:</strong></td>
              <td style="padding: 8px 0;">${subject || "General Inquiry"}</td>
            </tr>
          </table>

          <div style="background-color: #f8f9fa; padding: 16px; border-radius: 8px; border-left: 4px solid #f39c12; margin-top: 16px;">
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; font-size: 15px; color: #222;">${message}</p>
          </div>

          <p style="margin-top: 24px; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 12px;">
            Sent directly from Rohan Prusty's Portfolio Website Contact Form.
          </p>
        </div>
      `,
    };

    let response = await resend.emails.send(emailPayload);

    // If Resend returns an error about testing recipient restrictions (because API key is bound to another email account), log it clearly
    if (response.error && response.error.message.includes("testing emails")) {
      console.warn("Resend testing restriction active. Message redirected or needs Resend API key registered to " + recipientEmail);
    }

    if (response.error) {
      console.error("Resend delivery error:", response.error);
      return NextResponse.json({ error: response.error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: response.data });
  } catch (err: any) {
    console.error("Failed to process contact submission:", err);
    return NextResponse.json({ error: err?.message || "Internal server error" }, { status: 500 });
  }
}
