import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

/**
 * Domain configuration constants
 */
export const MAIN_DOMAIN = import.meta.env.VITE_MAIN_DOMAIN || 'https://techdefends.com';
export const ACADEMY_DOMAIN = import.meta.env.VITE_ACADEMY_DOMAIN || 'https://academy.techdefends.com';

/**
 * Determines if the current environment is local development or an AI Studio preview sandbox.
 * In these environments, we use relative SPA navigation so links don't break or jump outside the preview iframe.
 */
export function isDevEnvironment(): boolean {
  if (typeof window === 'undefined') return true;
  const hostname = window.location.hostname;
  return (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.endsWith('.run.app') ||
    hostname.includes('ais-dev-') ||
    hostname.includes('ais-pre-')
  );
}

/**
 * Checks if the user is currently browsing the Academy subdomain.
 * Supports URL parameter `?subdomain=academy` for dev/preview simulation.
 */
export function isAcademyDomain(): boolean {
  if (typeof window === 'undefined') return false;
  const hostname = window.location.hostname.toLowerCase();
  
  // Real Academy hostname
  if (hostname === 'academy.techdefends.com' || hostname.startsWith('academy.')) {
    return true;
  }
  
  // Simulation parameter for testing in local/preview environments
  const params = new URLSearchParams(window.location.search);
  if (params.get('subdomain') === 'academy') {
    return true;
  }

  return false;
}

/**
 * Resolves a URL for the Academy section (Courses, Career Programs, Internship).
 * In development/preview: returns relative path.
 * In production: returns absolute URL to https://academy.techdefends.com.
 */
export function getAcademyUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (isDevEnvironment()) {
    return normalizedPath;
  }

  // If already on the Academy domain in production, use relative path for client-side routing
  if (isAcademyDomain()) {
    return normalizedPath;
  }

  return `${ACADEMY_DOMAIN.replace(/\/+$/, '')}${normalizedPath}`;
}

/**
 * Resolves a URL for the Main Corporate Site (Home, Services, Industries, About, Contact, Careers).
 * In development/preview: returns relative path.
 * In production: returns absolute URL to https://techdefends.com.
 */
export function getMainSiteUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (isDevEnvironment()) {
    return normalizedPath;
  }

  // If already on the Main domain in production, use relative path for client-side routing
  if (!isAcademyDomain()) {
    return normalizedPath;
  }

  return `${MAIN_DOMAIN.replace(/\/+$/, '')}${normalizedPath}`;
}

/**
 * CrossDomainLink component:
 * Transparently renders a React Router <Link> when navigating within the current domain,
 * and a standard <a> tag when jumping across domains in production.
 */
interface CrossDomainLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  targetDomain?: 'main' | 'academy';
  children: React.ReactNode;
}

export const CrossDomainLink: React.FC<CrossDomainLinkProps> = ({
  to,
  targetDomain,
  children,
  onClick,
  ...rest
}) => {
  const isAcademy = isAcademyDomain();
  const isDev = isDevEnvironment();

  // If targetDomain is explicitly specified, determine if cross-domain transition
  let isCrossDomain = false;
  let resolvedHref = to;

  if (targetDomain === 'academy') {
    isCrossDomain = !isDev && !isAcademy;
    resolvedHref = getAcademyUrl(to);
  } else if (targetDomain === 'main') {
    isCrossDomain = !isDev && isAcademy;
    resolvedHref = getMainSiteUrl(to);
  } else {
    // If not specified, deduce from path
    const isTrainingPath = to.startsWith('/courses') || to.startsWith('/trainings') || to.startsWith('/internship');
    if (isTrainingPath) {
      isCrossDomain = !isDev && !isAcademy;
      resolvedHref = getAcademyUrl(to);
    } else {
      isCrossDomain = !isDev && isAcademy;
      resolvedHref = getMainSiteUrl(to);
    }
  }

  if (isCrossDomain) {
    return (
      <a href={resolvedHref} onClick={onClick} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  // Same domain navigation -> use React Router Link
  const internalPath = to.startsWith('http') ? new URL(to).pathname : to;
  return (
    <Link to={internalPath} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
};
