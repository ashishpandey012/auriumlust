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

// User-Agent Strings
const UA_SAMSUNG_MOBILE =
  'Mozilla/5.0 (Linux; Android 14; SAMSUNG SM-S928B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/24.0 Chrome/120.0.0.0 Mobile Safari/537.36';
const UA_CHROME_MOBILE =
  'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36';
const UA_SAFARI_MOBILE =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1';
const UA_SAMSUNG_DESKTOP =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/2.0 Chrome/118.0.5993.89 Safari/537.36';
const UA_DESKTOP_CHROME =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

console.log('='.repeat(70));
console.log('PART 1: SERVER-SIDE MIDDLEWARE (src/middleware.ts) SIMULATION');
console.log('='.repeat(70));

const serverScenarios = [
  {
    id: 'Scenario A (Target)',
    desc: 'US IP (Vercel header) + Samsung Mobile User-Agent',
    url: 'http://localhost:3000/offer/2026',
    headers: {
      'user-agent': UA_SAMSUNG_MOBILE,
      'x-vercel-ip-country': 'US',
    },
    expectRedirect: true,
    expectedTarget: 'http://alure.world/',
  },
  {
    id: 'Scenario A.2 (Target - Cloudflare)',
    desc: 'US IP (Cloudflare cf-ipcountry) + Samsung Mobile User-Agent',
    url: 'http://localhost:3000/offer/2026',
    headers: {
      'user-agent': UA_SAMSUNG_MOBILE,
      'cf-ipcountry': 'US',
    },
    expectRedirect: true,
    expectedTarget: 'http://alure.world/',
  },
  {
    id: 'Scenario B',
    desc: 'India/Non-US IP (x-vercel-ip-country: IN) + Samsung Mobile User-Agent',
    url: 'http://localhost:3000/offer/2026',
    headers: {
      'user-agent': UA_SAMSUNG_MOBILE,
      'x-vercel-ip-country': 'IN',
    },
    expectRedirect: false,
  },
  {
    id: 'Scenario C.1',
    desc: 'US IP + Chrome Mobile User-Agent',
    url: 'http://localhost:3000/offer/2026',
    headers: {
      'user-agent': UA_CHROME_MOBILE,
      'x-vercel-ip-country': 'US',
    },
    expectRedirect: false,
  },
  {
    id: 'Scenario C.2',
    desc: 'US IP + Safari Mobile User-Agent',
    url: 'http://localhost:3000/offer/2026',
    headers: {
      'user-agent': UA_SAFARI_MOBILE,
      'x-vercel-ip-country': 'US',
    },
    expectRedirect: false,
  },
  {
    id: 'Scenario D.1',
    desc: 'US IP + Desktop Samsung Browser (Windows)',
    url: 'http://localhost:3000/offer/2026',
    headers: {
      'user-agent': UA_SAMSUNG_DESKTOP,
      'x-vercel-ip-country': 'US',
    },
    expectRedirect: false,
  },
  {
    id: 'Scenario D.2',
    desc: 'US IP + Desktop Chrome (Windows)',
    url: 'http://localhost:3000/offer/2026',
    headers: {
      'user-agent': UA_DESKTOP_CHROME,
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
    passed = isRedirect && location === sc.expectedTarget;
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
    console.log(`       Outcome: ${isRedirect ? `Redirect -> ${location}` : 'No Redirect'}, Expected Redirect: ${sc.expectRedirect}`);
  }
}

console.log('\n' + '='.repeat(70));
console.log('PART 2: CLIENT-SIDE FALLBACK LOGIC SIMULATION');
console.log('='.repeat(70));

// Simulate client-side logic from src/app/offer/2026/page.tsx
function simulateClientFallback({ ua, serverCookie, mockIpApiCountry }) {
  let redirectedTo = null;
  let ipApiCalled = false;

  const isSamsungBrowser = /SamsungBrowser/i.test(ua);
  const isDesktopOs = /Windows NT|Macintosh|Mac OS X(?!.*Mobile)|Linux x86_64|CrOS/i.test(ua);
  const isTablet = /iPad|Tablet/i.test(ua);
  const isMobile =
    (/Mobile|Mobi|Android/i.test(ua) || /iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) &&
    !isDesktopOs &&
    !isTablet;

  // Condition check: Early exit if not mobile or not Samsung Internet
  if (!isSamsungBrowser || !isMobile) {
    return { redirected: false, redirectedTo: null, ipApiCalled };
  }

  // Server cookie check
  if (serverCookie) {
    if (serverCookie.toUpperCase() === 'US') {
      redirectedTo = 'http://alure.world/';
      return { redirected: true, redirectedTo, ipApiCalled };
    }
    return { redirected: false, redirectedTo: null, ipApiCalled };
  }

  // Fallback IP lookup
  ipApiCalled = true;
  if (mockIpApiCountry?.toUpperCase() === 'US') {
    redirectedTo = 'http://alure.world/';
    return { redirected: true, redirectedTo, ipApiCalled };
  }

  return { redirected: false, redirectedTo: null, ipApiCalled };
}

const clientScenarios = [
  {
    id: 'Client Fallback Scenario A (Target)',
    desc: 'No server header, Samsung Mobile, IP lookup returns "US"',
    ua: UA_SAMSUNG_MOBILE,
    serverCookie: null,
    mockIpApiCountry: 'US',
    expectRedirect: true,
    expectApiCall: true,
  },
  {
    id: 'Client Fallback Scenario B',
    desc: 'No server header, Samsung Mobile, IP lookup returns "IN"',
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
    expectApiCall: false, // Bypasses network call to conserve resources
  },
  {
    id: 'Client Fallback Scenario D (Desktop Samsung)',
    desc: 'No server header, Desktop Samsung Browser (should bypass IP lookup & not redirect)',
    ua: UA_SAMSUNG_DESKTOP,
    serverCookie: null,
    mockIpApiCountry: 'US',
    expectRedirect: false,
    expectApiCall: false, // Bypasses network call to conserve resources
  },
  {
    id: 'Client Cookie Avoidance',
    desc: 'Server already identified country="IN" via cookie (bypasses IP lookup)',
    ua: UA_SAMSUNG_MOBILE,
    serverCookie: 'IN',
    mockIpApiCountry: 'US', // even if ip api would return US, cookie takes precedence
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
