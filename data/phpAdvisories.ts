/**
 * TechDefends Security Check — PHP & PHP2Shell Advisory Reference Module
 *
 * Sources of truth:
 * - Upstream PHP Security Advisories (https://www.php.net/security/)
 * - CVE-2026-109618: PHP Multipart Boundary Memory Corruption / Buffer Handling
 * - CVE-2026-109619: PHP Stream Handling Filter Chain Buffer Flaw
 *
 * Dataset updated: 2026-10-24
 */

export interface PhpAdvisory {
  id: string;
  title: string;
  description: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  publishedDate: string;
  cve: string;
  upstreamFixedVersions: {
    '8.2': string;
    '8.3': string;
    '8.4': string;
    '8.5': string;
  };
  references: string[];
}

export const PHP_ADVISORY_DATASET_TIMESTAMP = '2026-10-24T00:00:00Z';

export const PHP2SHELL_ADVISORIES: PhpAdvisory[] = [
  {
    id: 'CVE-2026-109618',
    cve: 'CVE-2026-109618',
    title: 'PHP Multipart Boundary Memory Corruption (PHP2Shell Vector A)',
    description: 'Improper buffer boundary validation in PHP multipart/form-data parser leading to potential memory corruption or remote execution conditions under specific engine configurations.',
    severity: 'High',
    publishedDate: '2026-03-12',
    upstreamFixedVersions: {
      '8.2': '8.2.35',
      '8.3': '8.3.36',
      '8.4': '8.4.27',
      '8.5': '8.5.12'
    },
    references: [
      'https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w',
      'https://www.php.net/ChangeLog-8.php',
      'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2026-109618'
    ]
  },
  {
    id: 'CVE-2026-109619',
    cve: 'CVE-2026-109619',
    title: 'PHP Stream Handling Filter Chain Buffer Flaw (PHP2Shell Vector B)',
    description: 'Vulnerability in PHP stream wrapper filter chains allowing heap buffer over-read or unauthenticated state disruption when processing user-controlled stream resources.',
    severity: 'High',
    publishedDate: '2026-03-12',
    upstreamFixedVersions: {
      '8.2': '8.2.35',
      '8.3': '8.3.36',
      '8.4': '8.4.27',
      '8.5': '8.5.12'
    },
    references: [
      'https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp',
      'https://www.php.net/ChangeLog-8.php',
      'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2026-109619'
    ]
  }
];

export interface VersionParts {
  major: number;
  minor: number;
  patch: number;
  formatted: string;
  raw: string;
}

/**
 * Extracts semver version numbers from strings like "PHP/8.2.14", "8.3.0RC1", "PHP/8.1.2-1ubuntu2.14"
 */
export function extractPhpVersion(versionStr: string): VersionParts | null {
  if (!versionStr || typeof versionStr !== 'string') return null;
  // First attempt: match PHP explicitly prefixed (e.g. "PHP/8.2.14", "PHP 8.3.10", "php-8.1.0")
  let match = versionStr.match(/(?:PHP\/?|php-?)\s*(\d+)\.(\d+)(?:\.(\d+))?/i);
  // Second attempt: if string starts with standard semver digits (e.g. "8.2.14", "8.3.10")
  if (!match) {
    match = versionStr.match(/(?:^|[\s,;])(\d+)\.(\d+)(?:\.(\d+))?/);
  }
  if (!match) return null;

  const major = parseInt(match[1], 10);
  const minor = parseInt(match[2], 10);
  const patch = match[3] !== undefined ? parseInt(match[3], 10) : 0;

  return {
    major,
    minor,
    patch,
    formatted: `${major}.${minor}.${patch}`,
    raw: match[0].trim()
  };
}

/**
 * Compares two semantic versions.
 * Returns > 0 if v1 > v2, < 0 if v1 < v2, 0 if v1 == v2
 */
export function compareVersions(
  v1: { major: number; minor: number; patch: number } | string,
  v2: { major: number; minor: number; patch: number } | string
): number {
  const p1 = typeof v1 === 'string' ? extractPhpVersion(v1) : v1;
  const p2 = typeof v2 === 'string' ? extractPhpVersion(v2) : v2;
  if (!p1 || !p2) return 0;

  if (p1.major !== p2.major) return p1.major - p2.major;
  if (p1.minor !== p2.minor) return p1.minor - p2.minor;
  return p1.patch - p2.patch;
}

export type PhpAssessmentVerdict =
  | 'POTENTIALLY_AFFECTED'
  | 'UPSTREAM_PATCHED'
  | 'EOL_BRANCH'
  | 'PHP_DETECTED_NO_VERSION'
  | 'NO_PHP_INDICATORS'
  | 'UNABLE_TO_DETERMINE';

export interface PhpAssessmentResult {
  verdict: PhpAssessmentVerdict;
  verdictLabel: string;
  detectedVersion: string | null;
  evidence: string[];
  explanation: string;
  confidence: 'Deterministic' | 'Heuristic Signal' | 'Inconclusive';
  relevantAdvisories: string[];
  remediationAdvice: string;
  knownLimitations: string[];
  advisoryDatasetTimestamp: string;
}

/**
 * Evaluates observed PHP evidence against upstream advisories.
 */
export function evaluatePhpExposure(
  versionString: string | null,
  otherPhpEvidence: string[] = []
): PhpAssessmentResult {
  const datasetTimestamp = PHP_ADVISORY_DATASET_TIMESTAMP;

  // Case 1: No version, no other PHP evidence
  if (!versionString && otherPhpEvidence.length === 0) {
    return {
      verdict: 'NO_PHP_INDICATORS',
      verdictLabel: 'No PHP indicators detected — this does not prove PHP is absent',
      detectedVersion: null,
      evidence: ['No public HTTP response headers, cookies, or HTML markers indicated PHP execution.'],
      explanation: 'Passive external scanning did not detect any public signals of PHP. However, modern web architectures frequently strip Server and X-Powered-By headers or reverse-proxy PHP requests behind Nginx, Cloudflare, or an API gateway.',
      confidence: 'Heuristic Signal',
      relevantAdvisories: [],
      remediationAdvice: 'Continue maintaining defense-in-depth: keep headers suppressed and ensure local package management and automated vulnerability patching remain active on application hosts.',
      knownLimitations: [
        'Passive scanning cannot confirm technology stacks when headers and default cookies are stripped.',
        'Absence of public evidence does not guarantee PHP is not running in backend microservices.'
      ],
      advisoryDatasetTimestamp: datasetTimestamp
    };
  }

  // Case 2: PHP signals observed (e.g., PHPSESSID cookie, X-Powered-By: PHP without version), but no version string
  if (!versionString && otherPhpEvidence.length > 0) {
    return {
      verdict: 'PHP_DETECTED_NO_VERSION',
      verdictLabel: 'PHP signals detected — version not exposed',
      detectedVersion: null,
      evidence: otherPhpEvidence,
      explanation: 'Public response artifacts (such as session cookies or generic headers) indicate the site is powered by PHP, but the exact version string is properly hidden. Because version information is suppressed, patch status cannot be determined externally.',
      confidence: 'Heuristic Signal',
      relevantAdvisories: ['CVE-2026-109618', 'CVE-2026-109619'],
      remediationAdvice: 'Verify your PHP runtime version directly on the hosting server (e.g., run `php -v`). Ensure your package manager receives security updates or upgrade to confirmed upstream patched releases.',
      knownLimitations: [
        'Cannot determine exact patch level without server-side terminal or package manager access.',
        'Suppressing version numbers is good security practice and prevents passive fingerprinting.'
      ],
      advisoryDatasetTimestamp: datasetTimestamp
    };
  }

  // Case 3: Version string is present
  const parsed = extractPhpVersion(versionString!);
  if (!parsed) {
    return {
      verdict: 'UNABLE_TO_DETERMINE',
      verdictLabel: 'Unable to determine — further server-side verification required',
      detectedVersion: versionString,
      evidence: [`Observed raw header: "${versionString}"`],
      explanation: 'A version-like string was observed, but it could not be reliably mapped to standard PHP semantic versioning.',
      confidence: 'Inconclusive',
      relevantAdvisories: [],
      remediationAdvice: 'Inspect the server configuration and verify the installed PHP package directly.',
      knownLimitations: ['Non-standard or custom vendor version formatting.'],
      advisoryDatasetTimestamp: datasetTimestamp
    };
  }

  const branch = `${parsed.major}.${parsed.minor}`;
  const evidenceList = [`Observed version signal: ${parsed.raw} (Branch: ${branch})`, ...otherPhpEvidence];

  // Check End of Life branches (e.g. PHP 5.x, 7.x, 8.0, 8.1)
  if (parsed.major < 8 || (parsed.major === 8 && parsed.minor < 2)) {
    return {
      verdict: 'EOL_BRANCH',
      verdictLabel: 'Legacy End-of-Life PHP branch detected — patch status unverified',
      detectedVersion: parsed.formatted,
      evidence: evidenceList,
      explanation: `PHP ${branch} has reached official End-of-Life (EOL) from the upstream PHP project and no longer receives upstream security patches. While enterprise distributions (e.g. Red Hat ELS, Ubuntu ESM) backport select fixes, running EOL branches carries elevated operational security risk.`,
      confidence: 'Heuristic Signal',
      relevantAdvisories: ['CVE-2026-109618', 'CVE-2026-109619'],
      remediationAdvice: `Plan a structured migration to an actively supported PHP branch (PHP 8.3 or 8.4). If operating under enterprise LTS extended security maintenance, verify package changelogs via your OS package manager.`,
      knownLimitations: [
        'Enterprise Linux distributions may backport critical fixes into legacy releases without altering the upstream version number.',
        'Header spoofing or reverse proxy header rewriting may display inaccurate version strings.'
      ],
      advisoryDatasetTimestamp: datasetTimestamp
    };
  }

  // Check supported branches (8.2, 8.3, 8.4, 8.5)
  const fixedReleases: Record<string, string> = {
    '8.2': '8.2.35',
    '8.3': '8.3.36',
    '8.4': '8.4.27',
    '8.5': '8.5.12'
  };

  const fixedVersionStr = fixedReleases[branch];
  if (fixedVersionStr) {
    const fixedParsed = extractPhpVersion(fixedVersionStr)!;
    const cmp = compareVersions(parsed, fixedParsed);

    if (cmp < 0) {
      return {
        verdict: 'POTENTIALLY_AFFECTED',
        verdictLabel: 'Potentially affected — version signal observed; patch status unverified',
        detectedVersion: parsed.formatted,
        evidence: [
          ...evidenceList,
          `Upstream security release for branch ${branch} requires version ${fixedVersionStr} or higher.`
        ],
        explanation: `The publicly exposed version signal (${parsed.raw}) is lower than the upstream patched release (${fixedVersionStr}) addressing CVE-2026-109618 and CVE-2026-109619. Note that vendor package managers (Debian, Ubuntu, Red Hat) frequently backport patches into package release builds (e.g. 8.3.6-0ubuntu0.24.04.1) without incrementing the upstream patch number.`,
        confidence: 'Heuristic Signal',
        relevantAdvisories: ['CVE-2026-109618', 'CVE-2026-109619'],
        remediationAdvice: `1. Check your OS package changelog (e.g. \`apt changelog php${branch}\` or \`rpm -q --changelog php\`) to confirm if CVE-2026-109618 / CVE-2026-109619 fixes are backported.\n2. Upgrade PHP to ${fixedVersionStr} or the latest distribution security build.\n3. Disable the X-Powered-By header by setting \`expose_php = Off\` in your php.ini.`,
        knownLimitations: [
          'Vendor-backported patches cannot be distinguished from unpatched packages using public HTTP headers alone.',
          'HTTP headers may be modified or cached by intermediaries (CDNs, load balancers, proxies).'
        ],
        advisoryDatasetTimestamp: datasetTimestamp
      };
    } else {
      return {
        verdict: 'UPSTREAM_PATCHED',
        verdictLabel: 'Upstream patched version signal observed',
        detectedVersion: parsed.formatted,
        evidence: [
          ...evidenceList,
          `Reported version (${parsed.raw}) meets or exceeds upstream fixed threshold (${fixedVersionStr}).`
        ],
        explanation: `The observed PHP version string matches or exceeds the upstream release containing patches for CVE-2026-109618 and CVE-2026-109619.`,
        confidence: 'Heuristic Signal',
        relevantAdvisories: ['CVE-2026-109618', 'CVE-2026-109619'],
        remediationAdvice: `Maintain regular patch cycles and disable public version disclosure (\`expose_php = Off\` in php.ini) to reduce attacker reconnaissance.`,
        knownLimitations: [
          'Header presence only confirms the banner string, not internal configuration or third-party extensions.',
          'Local exploitation or extension-specific vulnerabilities may still exist.'
        ],
        advisoryDatasetTimestamp: datasetTimestamp
      };
    }
  }

  // Branch not explicitly mapped (e.g. future branch >= 8.6)
  return {
    verdict: 'UPSTREAM_PATCHED',
    verdictLabel: 'Modern PHP release signal observed',
    detectedVersion: parsed.raw,
    evidence: evidenceList,
    explanation: `The observed version (${parsed.raw}) is newer than the advisory target branches.`,
    confidence: 'Heuristic Signal',
    relevantAdvisories: [],
    remediationAdvice: 'Ensure expose_php is disabled in php.ini to minimize technological footprint.',
    knownLimitations: ['Passive header evaluation only.'],
    advisoryDatasetTimestamp: datasetTimestamp
  };
}
