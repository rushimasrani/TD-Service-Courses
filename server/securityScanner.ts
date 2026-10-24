/**
 * TechDefends Security Check — Passive Website Inspection Engine
 *
 * Performs bounded, non-destructive, passive inspection of public websites:
 * - HTTP status and redirect behavior
 * - TLS certificate validity, issuer, and days until expiration
 * - Security response headers (HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
 * - Information disclosure (Server banner, X-Powered-By, technology cookies)
 * - PHP & PHP2Shell advisory heuristic analysis against official CVE-2026-109618 / CVE-2026-109619 records
 *
 * Strict bounds:
 * - Max response size: 512 KB
 * - Max request timeout: 8 seconds
 * - Max redirects: 3 (each hop re-validated for SSRF)
 * - No exploits, no payloads, no form submissions, no directory fuzzing
 */

import http from 'http';
import https from 'https';
import { TLSSocket } from 'tls';
import { validateTargetUrl, createPinnedAgent } from '../utils/ssrfValidator';
import { evaluatePhpExposure, PhpAssessmentResult, PHP_ADVISORY_DATASET_TIMESTAMP } from '../data/phpAdvisories';

export interface SecurityFinding {
  id: string;
  category: 'TLS & Encryption' | 'Security Headers' | 'Technology Disclosure' | 'PHP & Advisory Heuristics' | 'HTTP Configuration';
  name: string;
  status: 'Pass' | 'Attention' | 'Advisory' | 'Informational';
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Informational';
  evidence: string;
  explanation: string;
  confidence: 'Deterministic' | 'Heuristic Signal' | 'Inconclusive';
  remediation: string;
  limitations: string;
}

export interface SecurityCheckReport {
  targetUrl: string;
  finalUrl: string;
  resolvedIp: string;
  scanTimestamp: string;
  responseTimeMs: number;
  httpStatus: number;
  tlsInfo?: {
    valid: boolean;
    authorized: boolean;
    issuer: string;
    subject: string;
    validTo: string;
    daysUntilExpiry: number;
    protocol?: string;
  };
  phpAssessment: PhpAssessmentResult;
  findings: SecurityFinding[];
  summary: {
    totalChecks: number;
    passes: number;
    attentions: number;
    advisories: number;
    informational: number;
  };
  disclaimer: string;
  advisoryDatasetTimestamp: string;
}

interface BoundedHttpResponse {
  statusCode: number;
  headers: http.IncomingHttpHeaders;
  bodySnippet: string;
  tlsCert?: any;
  tlsProtocol?: string;
  redirectUrl?: string;
  responseTimeMs: number;
  pinnedIp: string;
}

/**
 * Executes a single bounded HTTP or HTTPS request using a pinned agent to prevent DNS rebinding.
 */
function fetchBounded(targetUrl: URL, pinnedIp: string, timeoutMs = 8000): Promise<BoundedHttpResponse> {
  return new Promise((resolve, reject) => {
    const isHttps = targetUrl.protocol === 'https:';
    const client = isHttps ? https : http;
    const { agent } = createPinnedAgent(targetUrl, pinnedIp);
    const startTime = Date.now();

    const req = client.request(
      targetUrl,
      {
        method: 'GET',
        agent,
        headers: {
          'User-Agent': 'TechDefends-SecurityCheck/1.0 (+https://techdefends.com/security-check; Passive Security Posture Inspection)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Connection': 'close'
        },
        timeout: timeoutMs
      },
      (res) => {
        const responseTimeMs = Date.now() - startTime;
        let tlsCert: any = undefined;
        let tlsProtocol: string | undefined = undefined;

        if (isHttps && res.socket instanceof TLSSocket) {
          try {
            tlsCert = res.socket.getPeerCertificate();
            tlsProtocol = res.socket.getProtocol() || undefined;
          } catch {
            // Socket or cert error
          }
        }

        // Check for redirects (301, 302, 303, 307, 308)
        const isRedirect = [301, 302, 303, 307, 308].includes(res.statusCode || 0);
        const redirectUrl = isRedirect && res.headers.location ? res.headers.location : undefined;

        let bodyBuffer = '';
        let totalBytes = 0;
        const MAX_BYTES = 512 * 1024; // 512 KB limit

        res.setEncoding('utf8');

        res.on('data', (chunk) => {
          totalBytes += Buffer.byteLength(chunk, 'utf8');
          if (bodyBuffer.length < 32768) {
            bodyBuffer += chunk; // Retain snippet for HTML generator tag analysis
          }
          if (totalBytes > MAX_BYTES) {
            req.destroy(); // Abort reading oversized response
            resolve({
              statusCode: res.statusCode || 200,
              headers: res.headers,
              bodySnippet: bodyBuffer,
              tlsCert,
              tlsProtocol,
              redirectUrl,
              responseTimeMs,
              pinnedIp
            });
          }
        });

        res.on('end', () => {
          resolve({
            statusCode: res.statusCode || 200,
            headers: res.headers,
            bodySnippet: bodyBuffer,
            tlsCert,
            tlsProtocol,
            redirectUrl,
            responseTimeMs,
            pinnedIp
          });
        });
      }
    );

    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Connection timed out after ${timeoutMs}ms while contacting ${targetUrl.hostname}`));
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.end();
  });
}

/**
 * Runs the full passive website posture scan with SSRF protections and redirect bounds.
 */
export async function runSecurityCheck(rawUrl: string): Promise<SecurityCheckReport> {
  // 1. Initial SSRF validation and DNS resolution
  const ssrfValidation = await validateTargetUrl(rawUrl);
  if (!ssrfValidation.valid || !ssrfValidation.parsedUrl || !ssrfValidation.pinnedIp) {
    throw new Error(ssrfValidation.error || 'Invalid or forbidden target URL.');
  }

  let currentUrl = ssrfValidation.parsedUrl;
  let currentPinnedIp = ssrfValidation.pinnedIp;
  let redirectCount = 0;
  const maxRedirects = 3;

  let finalResponse: BoundedHttpResponse | null = null;
  let initialHttpResponse: BoundedHttpResponse | null = null;

  // 2. Perform bounded HTTP request with redirect hops (each hop re-validated)
  while (redirectCount <= maxRedirects) {
    const response = await fetchBounded(currentUrl, currentPinnedIp);
    if (!initialHttpResponse) {
      initialHttpResponse = response;
    }
    finalResponse = response;

    if (response.redirectUrl && redirectCount < maxRedirects) {
      // Resolve relative redirect against current URL
      let nextUrl: URL;
      try {
        nextUrl = new URL(response.redirectUrl, currentUrl.href);
      } catch {
        break; // Malformed redirect header -> stop redirecting
      }

      // Re-validate the redirect destination against SSRF!
      const redirectValidation = await validateTargetUrl(nextUrl.href);
      if (!redirectValidation.valid || !redirectValidation.parsedUrl || !redirectValidation.pinnedIp) {
        throw new Error(`Redirect target forbidden: ${redirectValidation.error}`);
      }

      currentUrl = redirectValidation.parsedUrl;
      currentPinnedIp = redirectValidation.pinnedIp;
      redirectCount++;
    } else {
      break;
    }
  }

  if (!finalResponse) {
    throw new Error('Unable to complete request to target website.');
  }

  const findings: SecurityFinding[] = [];
  const headers = finalResponse.headers;
  const body = finalResponse.bodySnippet;

  // -------------------------------------------------------------
  // Check 1: HTTPS & TLS Security
  // -------------------------------------------------------------
  let tlsInfo: SecurityCheckReport['tlsInfo'] = undefined;

  if (currentUrl.protocol === 'https:' && finalResponse.tlsCert) {
    const cert = finalResponse.tlsCert;
    const validToDate = new Date(cert.valid_to || cert.validTo);
    const now = new Date();
    const daysUntilExpiry = Math.floor((validToDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const isExpired = daysUntilExpiry <= 0;

    tlsInfo = {
      valid: !isExpired,
      authorized: true,
      issuer: (cert.issuer && (cert.issuer.O || cert.issuer.CN)) ? `${cert.issuer.O || ''} ${cert.issuer.CN || ''}`.trim() : 'Verified Certificate Authority',
      subject: (cert.subject && (cert.subject.CN || cert.subject.O)) ? `${cert.subject.CN || ''} ${cert.subject.O || ''}`.trim() : currentUrl.hostname,
      validTo: validToDate.toISOString().split('T')[0],
      daysUntilExpiry,
      protocol: finalResponse.tlsProtocol
    };

    if (isExpired) {
      findings.push({
        id: 'tls-cert-expired',
        category: 'TLS & Encryption',
        name: 'TLS/SSL Certificate Expiration',
        status: 'Attention',
        severity: 'Critical',
        evidence: `Certificate expired on ${tlsInfo.validTo} (${Math.abs(daysUntilExpiry)} days ago).`,
        explanation: 'The SSL/TLS certificate has expired. Browsers will display full-page security warnings, preventing user traffic and breaking data transit encryption.',
        confidence: 'Deterministic',
        remediation: 'Renew and deploy a fresh TLS certificate immediately via Let’s Encrypt, Certbot, or your Certificate Authority.',
        limitations: 'Passive observation of the presented public leaf certificate.'
      });
    } else if (daysUntilExpiry <= 15) {
      findings.push({
        id: 'tls-cert-expiring-soon',
        category: 'TLS & Encryption',
        name: 'TLS/SSL Certificate Expiring Soon',
        status: 'Attention',
        severity: 'Medium',
        evidence: `Certificate expires on ${tlsInfo.validTo} (${daysUntilExpiry} days remaining).`,
        explanation: 'The certificate is within its renewal window. If auto-renewal is not configured, it will expire and trigger security warnings.',
        confidence: 'Deterministic',
        remediation: 'Verify automated renewal (e.g. `certbot renew`) or manually issue a renewed certificate.',
        limitations: 'Calculated from public validTo timestamp.'
      });
    } else {
      findings.push({
        id: 'tls-cert-valid',
        category: 'TLS & Encryption',
        name: 'TLS/SSL Certificate Status',
        status: 'Pass',
        severity: 'Informational',
        evidence: `Valid certificate issued by "${tlsInfo.issuer}", expires in ${daysUntilExpiry} days (${tlsInfo.validTo}). Protocol: ${tlsInfo.protocol || 'TLS 1.2/1.3'}.`,
        explanation: 'The site presents a valid SSL/TLS certificate with adequate remaining validity.',
        confidence: 'Deterministic',
        remediation: 'Ensure automated certificate renewal remains scheduled.',
        limitations: 'Evaluates public leaf certificate; does not test for revoked intermediates or OCSP stapling.'
      });
    }
  } else if (currentUrl.protocol === 'http:') {
    findings.push({
      id: 'tls-unencrypted-http',
      category: 'TLS & Encryption',
      name: 'Unencrypted HTTP Protocol',
      status: 'Attention',
      severity: 'High',
      evidence: `The final loaded endpoint uses unencrypted ${currentUrl.href}.`,
      explanation: 'Traffic sent over plain HTTP is unencrypted and subject to eavesdropping, credential interception, and adversary-in-the-middle tampering.',
      confidence: 'Deterministic',
      remediation: 'Install an SSL/TLS certificate and configure an automatic 301 HTTP-to-HTTPS redirect on your web server.',
      limitations: 'Observed from public endpoint URL protocol.'
    });
  }

  // -------------------------------------------------------------
  // Check 2: HTTP Strict Transport Security (HSTS)
  // -------------------------------------------------------------
  const hsts = headers['strict-transport-security'] as string | undefined;
  if (hsts) {
    const maxAgeMatch = hsts.match(/max-age=(\d+)/i);
    const maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1], 10) : 0;
    const includesSubDomains = /includesubdomains/i.test(hsts);
    const preload = /preload/i.test(hsts);

    if (maxAge >= 15552000) { // >= 180 days
      findings.push({
        id: 'header-hsts-strong',
        category: 'Security Headers',
        name: 'HTTP Strict Transport Security (HSTS)',
        status: 'Pass',
        severity: 'Informational',
        evidence: `Strict-Transport-Security: ${hsts}`,
        explanation: `HSTS is configured with a robust max-age (${Math.round(maxAge / 86400)} days)${includesSubDomains ? ' and includes subdomains' : ''}${preload ? ' (preload ready)' : ''}.`,
        confidence: 'Deterministic',
        remediation: 'Maintain existing HSTS configuration.',
        limitations: 'Only applies when served over HTTPS.'
      });
    } else {
      findings.push({
        id: 'header-hsts-weak',
        category: 'Security Headers',
        name: 'HSTS Short Duration',
        status: 'Attention',
        severity: 'Low',
        evidence: `Strict-Transport-Security: ${hsts} (max-age is only ${Math.round(maxAge / 86400)} days).`,
        explanation: 'HSTS is present, but max-age is lower than the industry recommended minimum (180 days / 15552000 seconds).',
        confidence: 'Deterministic',
        remediation: 'Increase HSTS max-age to 31536000 (1 year) and consider includeSubDomains.',
        limitations: 'Header evaluation only.'
      });
    }
  } else {
    findings.push({
      id: 'header-hsts-missing',
      category: 'Security Headers',
      name: 'HTTP Strict Transport Security (HSTS) Missing',
      status: 'Attention',
      severity: 'Medium',
      evidence: 'Header Strict-Transport-Security was not returned in the HTTP response.',
      explanation: 'Without HSTS, initial connections may start over plain HTTP and remain vulnerable to SSL stripping and man-in-the-middle downgrade attacks.',
      confidence: 'Deterministic',
      remediation: 'Add `Strict-Transport-Security "max-age=31536000; includeSubDomains"` in your web server (Nginx/Apache/Caddy).',
      limitations: 'Only applicable to HTTPS endpoints.'
    });
  }

  // -------------------------------------------------------------
  // Check 3: Content Security Policy (CSP)
  // -------------------------------------------------------------
  const csp = headers['content-security-policy'] as string | undefined;
  if (csp) {
    const hasUnsafeInline = csp.includes("'unsafe-inline'");
    findings.push({
      id: 'header-csp-present',
      category: 'Security Headers',
      name: 'Content Security Policy (CSP)',
      status: hasUnsafeInline ? 'Attention' : 'Pass',
      severity: hasUnsafeInline ? 'Low' : 'Informational',
      evidence: `Content-Security-Policy: ${csp.length > 120 ? csp.substring(0, 120) + '...' : csp}`,
      explanation: hasUnsafeInline
        ? "CSP header is active, but permits 'unsafe-inline' scripts, reducing resilience against Cross-Site Scripting (XSS)."
        : 'CSP header is active and enforces content restrictions across resource sources.',
      confidence: 'Deterministic',
      remediation: hasUnsafeInline
        ? 'Refactor inline scripts to external bundles or adopt cryptographic nonces/hashes.'
        : 'Continue auditing CSP policies as application dependencies evolve.',
      limitations: 'Passive observation of header text; cannot verify runtime CSP enforcement errors.'
    });
  } else {
    findings.push({
      id: 'header-csp-missing',
      category: 'Security Headers',
      name: 'Content Security Policy (CSP) Missing',
      status: 'Attention',
      severity: 'Medium',
      evidence: 'Header Content-Security-Policy was not returned.',
      explanation: 'CSP provides browser-side defense-in-depth against XSS, clickjacking, and unauthorized resource injection.',
      confidence: 'Deterministic',
      remediation: 'Define a Content-Security-Policy header specifying allowed sources for scripts, styles, fonts, and images.',
      limitations: 'Header observation only.'
    });
  }

  // -------------------------------------------------------------
  // Check 4: Clickjacking Protection (X-Frame-Options)
  // -------------------------------------------------------------
  const xfo = headers['x-frame-options'] as string | undefined;
  if (xfo && (xfo.toUpperCase() === 'DENY' || xfo.toUpperCase() === 'SAMEORIGIN')) {
    findings.push({
      id: 'header-xfo-pass',
      category: 'Security Headers',
      name: 'X-Frame-Options (Clickjacking Protection)',
      status: 'Pass',
      severity: 'Informational',
      evidence: `X-Frame-Options: ${xfo}`,
      explanation: `The site instructs browsers not to render pages inside unauthorized frames (${xfo}), preventing clickjacking attacks.`,
      confidence: 'Deterministic',
      remediation: 'Maintain current configuration.',
      limitations: 'Legacy browsers respect XFO; modern browsers prioritize CSP frame-ancestors when delivered via HTTP header.'
    });
  } else if (!xfo && (!csp || !csp.includes('frame-ancestors'))) {
    findings.push({
      id: 'header-xfo-missing',
      category: 'Security Headers',
      name: 'Clickjacking Protection Missing',
      status: 'Attention',
      severity: 'Medium',
      evidence: 'Neither X-Frame-Options nor CSP frame-ancestors header were detected.',
      explanation: 'The website may be embedded in an <iframe> on third-party sites, exposing users to clickjacking and UI redressing attacks.',
      confidence: 'Deterministic',
      remediation: 'Add `X-Frame-Options: SAMEORIGIN` or CSP `frame-ancestors \'self\';` in your web server headers.',
      limitations: 'Header observation only.'
    });
  }

  // -------------------------------------------------------------
  // Check 5: MIME-Sniffing Defense (X-Content-Type-Options)
  // -------------------------------------------------------------
  const xcto = headers['x-content-type-options'] as string | undefined;
  if (xcto && xcto.toLowerCase().includes('nosniff')) {
    findings.push({
      id: 'header-xcto-pass',
      category: 'Security Headers',
      name: 'X-Content-Type-Options',
      status: 'Pass',
      severity: 'Informational',
      evidence: `X-Content-Type-Options: ${xcto}`,
      explanation: 'Browsers are prevented from MIME-sniffing response bodies away from the declared content-type.',
      confidence: 'Deterministic',
      remediation: 'Maintain current configuration.',
      limitations: 'Header observation only.'
    });
  } else {
    findings.push({
      id: 'header-xcto-missing',
      category: 'Security Headers',
      name: 'X-Content-Type-Options Missing',
      status: 'Attention',
      severity: 'Low',
      evidence: 'Header X-Content-Type-Options: nosniff was not returned.',
      explanation: 'Missing nosniff header allows older or non-standard browsers to interpret uploaded non-executable files as HTML or JavaScript.',
      confidence: 'Deterministic',
      remediation: 'Configure `X-Content-Type-Options: nosniff` in your web server response headers.',
      limitations: 'Header observation only.'
    });
  }

  // -------------------------------------------------------------
  // Check 6: Referrer-Policy
  // -------------------------------------------------------------
  const refPolicy = headers['referrer-policy'] as string | undefined;
  if (refPolicy) {
    findings.push({
      id: 'header-referrer-policy',
      category: 'Security Headers',
      name: 'Referrer-Policy',
      status: 'Pass',
      severity: 'Informational',
      evidence: `Referrer-Policy: ${refPolicy}`,
      explanation: `Referrer information is controlled via ${refPolicy}.`,
      confidence: 'Deterministic',
      remediation: 'Ensure sensitive path parameters are not leaked in outbound navigation.',
      limitations: 'Header observation only.'
    });
  } else {
    findings.push({
      id: 'header-referrer-policy-missing',
      category: 'Security Headers',
      name: 'Referrer-Policy Header Missing',
      status: 'Attention',
      severity: 'Low',
      evidence: 'Referrer-Policy header was not returned.',
      explanation: 'Without an explicit Referrer-Policy, user navigation may expose full query URLs to external domains.',
      confidence: 'Deterministic',
      remediation: 'Add `Referrer-Policy: strict-origin-when-cross-origin` to server headers.',
      limitations: 'Modern browsers default to strict-origin-when-cross-origin, but explicit declaration ensures consistency.'
    });
  }

  // -------------------------------------------------------------
  // Check 7: Server & Technology Banners
  // -------------------------------------------------------------
  const serverHeader = headers['server'] as string | undefined;
  const poweredBy = headers['x-powered-by'] as string | undefined;

  if (serverHeader) {
    const hasDetailedVersion = /\d+\.\d+/.test(serverHeader);
    findings.push({
      id: 'tech-server-header',
      category: 'Technology Disclosure',
      name: 'Server Header Disclosure',
      status: hasDetailedVersion ? 'Attention' : 'Informational',
      severity: hasDetailedVersion ? 'Low' : 'Informational',
      evidence: `Server: ${serverHeader}`,
      explanation: hasDetailedVersion
        ? `The server banner discloses specific web server software and version (${serverHeader}), assisting attackers during automated vulnerability mapping.`
        : `The server header discloses web server software (${serverHeader}), though detailed version numbers appear suppressed.`,
      confidence: 'Deterministic',
      remediation: 'Configure `server_tokens off;` in Nginx or `ServerTokens Prod` in Apache to minimize version information.',
      limitations: 'Some reverse proxies or CDNs inject or overwrite the Server header.'
    });
  }

  if (poweredBy) {
    findings.push({
      id: 'tech-powered-by-header',
      category: 'Technology Disclosure',
      name: 'X-Powered-By Header Exposure',
      status: 'Attention',
      severity: 'Medium',
      evidence: `X-Powered-By: ${poweredBy}`,
      explanation: `The backend framework or language banner is publicly revealed (${poweredBy}). This enables adversaries to pinpoint relevant vulnerabilities without reconnaissance.`,
      confidence: 'Deterministic',
      remediation: 'Disable X-Powered-By header (e.g. `expose_php = Off` in php.ini, or `app.disable("x-powered-by")` in Express).',
      limitations: 'Header observation only.'
    });
  }

  // -------------------------------------------------------------
  // Check 8: PHP Presence & PHP2Shell Advisory Analysis
  // -------------------------------------------------------------
  let observedPhpVersion: string | null = null;
  const phpEvidenceList: string[] = [];

  // 1. Check X-Powered-By for PHP
  if (poweredBy && /php/i.test(poweredBy)) {
    phpEvidenceList.push(`X-Powered-By header: "${poweredBy}"`);
    const match = poweredBy.match(/php\/?\s*([\d\.]+(?:[a-z0-9\.\-\_]+)?)/i);
    if (match) {
      observedPhpVersion = match[1];
    }
  }

  // 2. Check Server header for PHP module
  if (serverHeader && /php/i.test(serverHeader)) {
    phpEvidenceList.push(`Server header contains PHP reference: "${serverHeader}"`);
    const match = serverHeader.match(/php\/?\s*([\d\.]+(?:[a-z0-9\.\-\_]+)?)/i);
    if (match && !observedPhpVersion) {
      observedPhpVersion = match[1];
    }
  }

  // 3. Check Set-Cookie headers for PHPSESSID
  const setCookie = headers['set-cookie'];
  if (setCookie) {
    const cookieStr = Array.isArray(setCookie) ? setCookie.join('; ') : setCookie;
    if (/phpsessid/i.test(cookieStr)) {
      phpEvidenceList.push('Set-Cookie returned standard PHP session identifier (PHPSESSID).');
    }
  }

  // 4. Check HTML generator tag in body snippet
  if (body) {
    const generatorMatch = body.match(/<meta[^>]*name=["']generator["'][^>]*content=["']([^"']*)["']/i);
    if (generatorMatch && /php|wordpress|joomla|drupal|laravel/i.test(generatorMatch[1])) {
      phpEvidenceList.push(`HTML meta generator tag: "${generatorMatch[1]}" (PHP-ecosystem CMS)`);
    }
  }

  // Evaluate against PHP2Shell advisory data
  const phpAssessment = evaluatePhpExposure(observedPhpVersion, phpEvidenceList);

  findings.push({
    id: 'php2shell-exposure-check',
    category: 'PHP & Advisory Heuristics',
    name: 'PHP2Shell (CVE-2026-109618 / CVE-2026-109619) & PHP Posture',
    status: phpAssessment.verdict === 'POTENTIALLY_AFFECTED' || phpAssessment.verdict === 'EOL_BRANCH'
      ? 'Advisory'
      : (phpAssessment.verdict === 'PHP_DETECTED_NO_VERSION' ? 'Informational' : 'Pass'),
    severity: phpAssessment.verdict === 'POTENTIALLY_AFFECTED' ? 'High' : (phpAssessment.verdict === 'EOL_BRANCH' ? 'Medium' : 'Informational'),
    evidence: phpAssessment.evidence.join(' | '),
    explanation: phpAssessment.explanation,
    confidence: phpAssessment.confidence,
    remediation: phpAssessment.remediationAdvice,
    limitations: phpAssessment.knownLimitations.join(' ')
  });

  // Calculate summary counts
  const summary = {
    totalChecks: findings.length,
    passes: findings.filter(f => f.status === 'Pass').length,
    attentions: findings.filter(f => f.status === 'Attention').length,
    advisories: findings.filter(f => f.status === 'Advisory').length,
    informational: findings.filter(f => f.status === 'Informational').length
  };

  return {
    targetUrl: currentUrl.href,
    finalUrl: currentUrl.href,
    resolvedIp: currentPinnedIp,
    scanTimestamp: new Date().toISOString(),
    responseTimeMs: finalResponse.responseTimeMs,
    httpStatus: finalResponse.statusCode,
    tlsInfo,
    phpAssessment,
    findings,
    summary,
    disclaimer: 'TechDefends Security Check conducts strictly passive, bounded external observation. It does not send exploit payloads, test RCE conditions, or inspect server-side package changelogs. An advisory finding indicates version signal exposure rather than confirmed server exploitability; conversely, absence of indicators does not guarantee absolute security.',
    advisoryDatasetTimestamp: PHP_ADVISORY_DATASET_TIMESTAMP
  };
}
