import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isMaintenanceMode = true;

export function middleware(request: NextRequest) {
  if (
    isMaintenanceMode &&
    !request.nextUrl.pathname.startsWith("/maintenance")
  ) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  return NextResponse.next();
}
