import { NextResponse } from "next/server";

const ZL_GOOGLE_REVIEW_URL = "https://g.page/r/CYP0sOt7Hr89EBM/review";

export function GET() {
  return NextResponse.redirect(ZL_GOOGLE_REVIEW_URL, 302);
}
