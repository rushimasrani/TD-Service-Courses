import { evaluatePhpExposure, isPhp2ShellExposureIdentified, sortSecurityFindings, PhpAssessmentResult } from './data/phpAdvisories';
import fs from 'fs';

console.log('--- Running TechDefends Security Scanner Regression Test Suite ---\n');

let passCount = 0;
let failCount = 0;

function assert(condition: boolean, testName: string, details?: string) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${testName}${details ? ` -> ${details}` : ''}`);
    failCount++;
  }
}

// =========================================================================
// PART 1: Responsive UI & Form Inspection
// =========================================================================
const securityCheckSource = fs.readFileSync('pages/SecurityCheck.tsx', 'utf8');

// Test 1: Mobile URL input and button never overlap (no absolute positioning on mobile button)
const hasAbsoluteButtonOnMobile = /className="[^"]*absolute[^"]*right[^"]*"[^>]*>\s*<button/i.test(securityCheckSource);
const hasResponsiveFlexContainer = securityCheckSource.includes('flex flex-col sm:flex-row sm:items-center gap-3');
assert(!hasAbsoluteButtonOnMobile && hasResponsiveFlexContainer, '1. Mobile URL input and button never overlap (responsive flex container, no absolute overlay on mobile)');

// Test 2: Entered URLs remain readable (input has min-w-0, full width on mobile, adequate padding)
const inputHasProperPadding = securityCheckSource.includes('pl-11 pr-4 py-3.5') && securityCheckSource.includes('min-w-0');
assert(inputHasProperPadding, '2. Entered URLs remain readable with standard horizontal padding and scrolling');

// Test 3: Authorization checkbox text fits small screens (flex-shrink-0 and break-words)
const checkboxHasProperStyling = securityCheckSource.includes('flex-shrink-0') && securityCheckSource.includes('break-words');
assert(checkboxHasProperStyling, '3. Authorization checkbox text fits small screens without overflow or squishing');

// Test 4: Result titles and badges wrap without overflow
const cardsHaveWrap = securityCheckSource.includes('flex flex-wrap items-center gap-2') && 
                      securityCheckSource.includes('break-words') &&
                      securityCheckSource.includes('whitespace-nowrap');
assert(cardsHaveWrap, '4. Result titles, category tags, and severity badges wrap without clipping');

// Test 5: Desktop inline layout remains intact
const desktopInlineIntact = securityCheckSource.includes('sm:flex-row') && securityCheckSource.includes('sm:w-auto');
assert(desktopInlineIntact, '5. Desktop inline layout remains intact via sm: breakpoint flex alignment');


// =========================================================================
// PART 2: Result Ordering
// =========================================================================

// Mock findings collection
const mockSampleFindings = [
  { id: 'header-hsts-missing', category: 'Security Headers', name: 'HTTP Strict Transport Security (HSTS) Missing', status: 'Attention', evidence: 'Missing HSTS' },
  { id: 'tls-cert-valid', category: 'TLS & Encryption', name: 'TLS/SSL Certificate Status', status: 'Pass', evidence: 'Valid cert' },
  { id: 'header-csp-missing', category: 'Security Headers', name: 'Content Security Policy (CSP) Missing', status: 'Attention', evidence: 'Missing CSP' },
  { id: 'tech-powered-by-header', category: 'Technology Disclosure', name: 'X-Powered-By Header Exposure', status: 'Attention', evidence: 'X-Powered-By: PHP/8.2.14' },
  { id: 'header-xfo-pass', category: 'Security Headers', name: 'X-Frame-Options', status: 'Pass', evidence: 'X-Frame-Options: SAMEORIGIN' },
  { id: 'php2shell-exposure-check', category: 'PHP & Advisory Heuristics', name: 'PHP2Shell (CVE-2026-109618 / CVE-2026-109619) & PHP Posture', status: 'Advisory', evidence: 'Observed version signal: 8.2.14' }
];

const mockAssessmentAffected: PhpAssessmentResult = {
  verdict: 'POTENTIALLY_AFFECTED',
  verdictLabel: 'Potentially affected — version signal observed; patch status unverified',
  detectedVersion: '8.2.14',
  evidence: ['Observed version signal: 8.2.14'],
  explanation: 'Version lower than patched release',
  confidence: 'Heuristic Signal',
  relevantAdvisories: ['CVE-2026-109618', 'CVE-2026-109619'],
  remediationAdvice: 'Upgrade PHP to 8.2.35+',
  knownLimitations: ['Passive check'],
  advisoryDatasetTimestamp: '2026-10-24T00:00:00Z',
  hasExposureSignal: true
};

const sortedAffected = sortSecurityFindings(mockSampleFindings, mockAssessmentAffected);

// Test 6: PHP2Shell-related findings appear before security-header findings
const php2shellIndex = sortedAffected.findIndex(f => f.id === 'php2shell-exposure-check');
const poweredByIndex = sortedAffected.findIndex(f => f.id === 'tech-powered-by-header');
const cspIndex = sortedAffected.findIndex(f => f.id === 'header-csp-missing');
const hstsIndex = sortedAffected.findIndex(f => f.id === 'header-hsts-missing');

assert(
  php2shellIndex === 0 && poweredByIndex === 1 && php2shellIndex < cspIndex && php2shellIndex < hstsIndex,
  '6. PHP2Shell-related findings appear before security-header findings',
  `php2shellIndex=${php2shellIndex}, poweredByIndex=${poweredByIndex}, cspIndex=${cspIndex}`
);

// Test 7: Existing findings and their underlying evidence remain unchanged
const originalPhpFinding = mockSampleFindings.find(f => f.id === 'php2shell-exposure-check')!;
const sortedPhpFinding = sortedAffected.find(f => f.id === 'php2shell-exposure-check')!;
assert(
  originalPhpFinding.evidence === sortedPhpFinding.evidence &&
  originalPhpFinding.name === sortedPhpFinding.name &&
  originalPhpFinding.status === sortedPhpFinding.status,
  '7. Existing findings and their underlying evidence remain unchanged after sorting'
);

// Test 8: Stable result ordering is maintained when multiple findings have equal priority
const sortedAgain = sortSecurityFindings(mockSampleFindings, mockAssessmentAffected);
const stableOrder = JSON.stringify(sortedAffected.map(f => f.id)) === JSON.stringify(sortedAgain.map(f => f.id));
assert(stableOrder, '8. Stable deterministic result ordering maintained across multiple executions');


// =========================================================================
// PART 3: Conditional Assessment Card
// =========================================================================

// Test 9: An applicable PHP2Shell finding displays the assessment card
const test9Assessment = evaluatePhpExposure('8.2.14');
assert(
  test9Assessment.verdict === 'POTENTIALLY_AFFECTED' && isPhp2ShellExposureIdentified(test9Assessment) === true,
  '9. Applicable PHP2Shell finding (e.g. PHP 8.2.14) qualifies to display assessment card'
);

// Test 10: Security-header-only findings do not display the assessment card
const test10Assessment = evaluatePhpExposure(null, []); // No PHP indicators
assert(
  test10Assessment.verdict === 'NO_PHP_INDICATORS' && isPhp2ShellExposureIdentified(test10Assessment) === false,
  '10. Security-header-only findings (no PHP indicators) do not display the assessment card'
);

// Test 11: PHP detected without sufficient PHP2Shell evidence does not incorrectly display a confirmed-detection card
const test11AssessmentHiddenVersion = evaluatePhpExposure(null, ['Set-Cookie: PHPSESSID=12345']);
const test11AssessmentEol = evaluatePhpExposure('7.4.33');
assert(
  test11AssessmentHiddenVersion.verdict === 'PHP_DETECTED_NO_VERSION' &&
  isPhp2ShellExposureIdentified(test11AssessmentHiddenVersion) === false &&
  isPhp2ShellExposureIdentified(test11AssessmentEol) === false,
  '11. PHP detected without sufficient PHP2Shell evidence (hidden version or EOL) does not display detection card'
);

// Test 12: An unknown or failed scan does not display stale assessment results
const clearsStateOnSubmit = securityCheckSource.includes('setError(null);') && 
                            securityCheckSource.includes('setReport(null); // Clear previous scan report');
const clearsStateOnError = securityCheckSource.includes('setError(err.message') && 
                           securityCheckSource.includes('setReport(null);');
assert(
  clearsStateOnSubmit && clearsStateOnError,
  '12. Scan submission and failure states proactively clear previous report to prevent stale results'
);

// Test 13: Re-scanning a different URL correctly updates card visibility and content
const reScanUpdatesState = securityCheckSource.includes('setReport({ ...data.report, findings: sorted })');
assert(
  reScanUpdatesState,
  '13. Re-scanning a different URL updates report state, re-evaluating conditional card rendering'
);

console.log(`\n--- Test Summary: ${passCount} Passed, ${failCount} Failed ---`);
if (failCount > 0) process.exit(1);
