/**
 * TechDefends Security Check — SSRF and Network Abuse Prevention Engine
 *
 * Implements strict multi-layer SSRF defenses:
 * 1. Protocol and scheme allowlisting (http/https only)
 * 2. Port allowlisting (80, 443 only)
 * 3. URL userinfo (credential) rejection
 * 4. Comprehensive IPv4 and IPv6 private, loopback, link-local, ULA, and metadata range blocking
 * 5. Full DNS resolution with validation across all returned A and AAAA records
 * 6. DNS rebinding prevention via IP-pinned HTTP/HTTPS agents
 */

import dns from 'dns';
import net from 'net';
import http from 'http';
import https from 'https';

/**
 * Checks if an IPv4 address falls within private, loopback, link-local, or cloud metadata ranges.
 */
export function isPrivateOrReservedIPv4(ip: string): boolean {
  const parts = ip.split('.').map(p => parseInt(p, 10));
  if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
    return true; // Malformed -> reject
  }

  const [a, b, c, d] = parts;

  // 0.0.0.0/8 (Current network)
  if (a === 0) return true;

  // 10.0.0.0/8 (Private-Use)
  if (a === 10) return true;

  // 100.64.0.0/10 (Shared Address Space / CGN)
  if (a === 100 && b >= 64 && b <= 127) return true;

  // 127.0.0.0/8 (Loopback)
  if (a === 127) return true;

  // 169.254.0.0/16 (Link-Local & Cloud Metadata 169.254.169.254)
  if (a === 169 && b === 254) return true;

  // 172.16.0.0/12 (Private-Use: 172.16.0.0 - 172.31.255.255)
  if (a === 172 && b >= 16 && b <= 31) return true;

  // 192.0.0.0/24 (IETF Protocol Assignments)
  if (a === 192 && b === 0 && c === 0) return true;

  // 192.0.2.0/24 (Documentation / TEST-NET-1)
  if (a === 192 && b === 0 && c === 2) return true;

  // 192.88.99.0/24 (6to4 Relay Anycast)
  if (a === 192 && b === 88 && c === 99) return true;

  // 192.168.0.0/16 (Private-Use)
  if (a === 192 && b === 168) return true;

  // 198.18.0.0/15 (Network Benchmark Tests)
  if (a === 198 && (b === 18 || b === 19)) return true;

  // 198.51.100.0/24 (Documentation / TEST-NET-2)
  if (a === 198 && b === 51 && c === 100) return true;

  // 203.0.113.0/24 (Documentation / TEST-NET-3)
  if (a === 203 && b === 0 && c === 113) return true;

  // 224.0.0.0/4 (Multicast: 224.0.0.0 - 239.255.255.255)
  if (a >= 224 && a <= 239) return true;

  // 240.0.0.0/4 (Reserved for Future Use)
  if (a >= 240) return true;

  // 255.255.255.255/32 (Broadcast)
  if (a === 255 && b === 255 && c === 255 && d === 255) return true;

  return false;
}

/**
 * Checks if an IPv6 address is loopback, unique-local (ULA), link-local, multicast, or IPv4-mapped.
 */
export function isPrivateOrReservedIPv6(ip: string): boolean {
  const normalized = ip.toLowerCase();

  // ::1/128 (Loopback)
  if (normalized === '::1' || normalized === '0:0:0:0:0:0:0:1') return true;

  // ::/128 (Unspecified)
  if (normalized === '::' || normalized === '0:0:0:0:0:0:0:0') return true;

  // IPv4-mapped IPv6 (::ffff:0:0/96 or ::ffff:127.0.0.1)
  if (normalized.includes('::ffff:') || normalized.startsWith('::ffff:')) {
    const v4Part = normalized.split(':').pop();
    if (v4Part && net.isIPv4(v4Part)) {
      return isPrivateOrReservedIPv4(v4Part);
    }
    return true;
  }

  // fe80::/10 (Link-Local Unicast)
  if (/^fe[89ab][0-9a-f]:/i.test(normalized)) return true;

  // fc00::/7 (Unique Local Address - fc00:: to fdff::)
  if (/^f[cd][0-9a-f]{2}:/i.test(normalized)) return true;

  // ff00::/8 (Multicast)
  if (/^ff[0-9a-f]{2}:/i.test(normalized)) return true;

  // 2001:db8::/32 (Documentation)
  if (normalized.startsWith('2001:db8:') || normalized.startsWith('2001:0db8:')) return true;

  // 64:ff9b::/96 (IPv4/IPv6 translation)
  if (normalized.startsWith('64:ff9b:')) return true;

  return false;
}

/**
 * Validates any IP address (v4 or v6) against private and reserved ranges.
 */
export function isPrivateOrReservedIp(ip: string): boolean {
  if (net.isIPv4(ip)) {
    return isPrivateOrReservedIPv4(ip);
  }
  if (net.isIPv6(ip)) {
    return isPrivateOrReservedIPv6(ip);
  }
  return true; // Not a valid IP -> reject
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
  parsedUrl?: URL;
  resolvedIps?: string[];
  pinnedIp?: string;
}

/**
 * Validates a user-supplied target URL against SSRF vulnerabilities:
 * - Scheme, credentials, port
 * - Hostname keywords (localhost, metadata, etc.)
 * - DNS lookup to verify that ALL resolved IP addresses are public
 */
export async function validateTargetUrl(rawUrl: string): Promise<ValidationResult> {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return { valid: false, error: 'A valid URL is required.' };
  }

  const trimmed = rawUrl.trim();
  let parsedUrl: URL;

  try {
    // Add protocol if user entered example.com
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    parsedUrl = new URL(withProtocol);
  } catch {
    return { valid: false, error: 'Malformed URL. Please enter a valid HTTP or HTTPS address.' };
  }

  // 1. Validate scheme
  if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    return { valid: false, error: 'Invalid URL scheme. Only HTTP and HTTPS protocols are permitted.' };
  }

  // 2. Reject credentials in URL (user:pass@host)
  if (parsedUrl.username || parsedUrl.password) {
    return { valid: false, error: 'URLs containing embedded credentials are not allowed.' };
  }

  // 3. Port restrictions (allow only standard web ports 80 and 443)
  if (parsedUrl.port) {
    const portNum = parseInt(parsedUrl.port, 10);
    if (portNum !== 80 && portNum !== 443) {
      return { valid: false, error: `Port ${portNum} is not permitted. Only standard web ports (80, 443) can be scanned.` };
    }
  }

  // 4. Hostname string checks
  const hostname = parsedUrl.hostname.toLowerCase();

  // Known metadata / loopback hostnames
  const blockedHostnames = [
    'localhost',
    'metadata.google.internal',
    'metadata.internal',
    'instance-data',
    '169.254.169.254'
  ];

  if (blockedHostnames.includes(hostname) || hostname.endsWith('.localhost') || hostname.endsWith('.local') || hostname.endsWith('.internal')) {
    return { valid: false, error: 'Access to localhost, link-local, or cloud metadata endpoints is strictly prohibited.' };
  }

  // If hostname is directly an IP address
  if (net.isIP(hostname)) {
    if (isPrivateOrReservedIp(hostname)) {
      return { valid: false, error: 'Target IP resolves to a private, loopback, or reserved network address.' };
    }
    return {
      valid: true,
      parsedUrl,
      resolvedIps: [hostname],
      pinnedIp: hostname
    };
  }

  // 5. DNS Resolution & Comprehensive IP Validation
  try {
    const records = await dns.promises.lookup(hostname, { all: true });

    if (!records || records.length === 0) {
      return { valid: false, error: `Could not resolve hostname "${hostname}". Please verify the domain name.` };
    }

    const resolvedIps = records.map(r => r.address);

    // Ensure every single returned IP address is public and non-reserved
    for (const record of records) {
      if (isPrivateOrReservedIp(record.address)) {
        return {
          valid: false,
          error: `Security violation: Domain "${hostname}" resolved to private or restricted IP address (${record.address}). Scan aborted.`
        };
      }
    }

    // Pin the validated IP address for DNS rebinding protection (prefer IPv4 if available for container network compatibility)
    const pinnedIp = resolvedIps.find(ip => net.isIPv4(ip)) || resolvedIps[0];

    return {
      valid: true,
      parsedUrl,
      resolvedIps,
      pinnedIp
    };
  } catch (dnsErr: any) {
    return {
      valid: false,
      error: `DNS resolution failed for "${hostname}": ${dnsErr.message || 'Domain not found'}`
    };
  }
}

/**
 * Creates a custom HTTP/HTTPS agent that pins the connection to the validated IP address,
 * completely neutralizing DNS rebinding attacks.
 */
export function createPinnedAgent(targetUrl: URL, pinnedIp: string): { agent: http.Agent | https.Agent } {
  const isHttps = targetUrl.protocol === 'https:';
  const ipFamily = net.isIPv6(pinnedIp) ? 6 : 4;

  const customLookup: any = (_hostname: string, options: any, callback: any) => {
    let cb = callback;
    let opts = options;
    if (typeof options === 'function') {
      cb = options;
      opts = {};
    }
    if (opts && opts.all) {
      cb(null, [{ address: pinnedIp, family: ipFamily }]);
    } else {
      cb(null, pinnedIp, ipFamily);
    }
  };

  if (isHttps) {
    const agent = new https.Agent({
      lookup: customLookup,
      keepAlive: false,
      timeout: 8000,
      // Pass servername for TLS SNI matching the target domain
      servername: targetUrl.hostname
    });
    return { agent };
  } else {
    const agent = new http.Agent({
      lookup: customLookup,
      keepAlive: false,
      timeout: 8000
    });
    return { agent };
  }
}
