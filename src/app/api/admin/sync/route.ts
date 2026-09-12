import { NextResponse } from "next/server";
import { SyncService } from "@/lib/services/sync";

export async function POST(request: Request) {
  const syncSecret = process.env.SYNC_SECRET || "portfolio_sync_secret_key_2026";
  const cronSecret = process.env.CRON_SECRET || "portfolio_cron_secret_key_2026";
  
  const { searchParams } = new URL(request.url);
  const secretParam = searchParams.get("secret");
  const authHeader = request.headers.get("authorization");

  const isValidAuth =
    secretParam === syncSecret ||
    secretParam === cronSecret ||
    authHeader === `Bearer ${syncSecret}` ||
    authHeader === `Bearer ${cronSecret}`;

  if (!isValidAuth) {
    return NextResponse.json({ error: "Unauthorized admin request" }, { status: 401 });
  }

  try {
    const freshData = await SyncService.syncAll();
    return NextResponse.json({
      success: true,
      message: "Admin sync completed successfully",
      data: freshData,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Admin sync failed", details: err?.message || String(err) },
      { status: 500 }
    );
  }
}
