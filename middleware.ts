import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const EXACT_ALLOWED_PATHS = new Set([
  "/",
  "/api/wa",
  "/api/zl-events",
  "/unha-encravada-fortaleza",
  "/onicomicose-fortaleza",
  "/ortonixia-fortaleza",
  "/podoprofilaxia-fortaleza",
  "/pe-diabetico-fortaleza",
  "/podologia-aldeota",
  "/podologia-centro-fortaleza",
  "/podologia-cidade-dos-funcionarios",
  "/podologia-maraponga",
  "/podologia-messejana",
  "/politica-de-imagens",
  "/robots.txt",
  "/sitemap.xml",
  "/googleed77e9ab4edd9965.html",
  "/opengraph-image",
]);

const ALLOWED_PREFIXES = ["/_next/", "/zl-podologia/"];

const BLOCKED_PUBLIC_FILE_PATTERN =
  /^\/zl-podologia\/(?:.*\.md|.*\.html|social\/.*\.json)$/i;

const LEGACY_REDIRECTS = new Map<string, string>([
  ["/lab/zl-podologia", "/"],
  ["/lab/zl-podologia/", "/"],
  ["/lab/zl-podologia/politica-de-imagens", "/politica-de-imagens"],
  ["/lab/zl-podologia/politica-de-imagens/", "/politica-de-imagens"],
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const normalizedPathname =
    pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;

  const legacyRedirect = LEGACY_REDIRECTS.get(pathname);
  if (legacyRedirect) {
    return NextResponse.redirect(new URL(legacyRedirect, request.url), 308);
  }

  if (
    normalizedPathname !== pathname &&
    EXACT_ALLOWED_PATHS.has(normalizedPathname)
  ) {
    return NextResponse.redirect(new URL(normalizedPathname, request.url), 308);
  }

  if (EXACT_ALLOWED_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  if (BLOCKED_PUBLIC_FILE_PATTERN.test(pathname)) {
    return new NextResponse(null, { status: 404 });
  }

  if (ALLOWED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  if (pathname === "/favicon.ico") {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url), 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
