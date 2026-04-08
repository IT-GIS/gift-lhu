import { NextResponse } from "next/server";
import { getSetting } from "@/lib/db/queries/settings";

/**
 * GET /api/public/favicon
 * Serves the `logo_web` setting as a favicon image.
 * If the setting is a base64 data-URI, it decodes and serves the binary.
 * Otherwise returns a 204 (no content).
 */
export async function GET() {
  try {
    const logoWeb = await getSetting("logo_web");

    if (!logoWeb) {
      return new NextResponse(null, { status: 204 });
    }

    // Expect a data URI like "data:image/png;base64,iVBOR..."
    const match = logoWeb.match(/^data:(image\/\w+);base64,(.+)$/);
    if (!match) {
      return new NextResponse(null, { status: 204 });
    }

    const contentType = match[1];
    const base64Data = match[2];
    const buffer = Buffer.from(base64Data, "base64");

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch {
    return new NextResponse(null, { status: 204 });
  }
}
