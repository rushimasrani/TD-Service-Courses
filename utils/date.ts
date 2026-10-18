/**
 * Date utility functions for TechDefends Academy
 * Enforces calendar date calculations in Asia/Kolkata (IST, UTC+5:30) timezone.
 */

/**
 * Returns today's calendar date in YYYY-MM-DD format in the Asia/Kolkata timezone.
 */
export function getTodayKolkataDateString(referenceDate: Date = new Date()): string {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  return formatter.format(referenceDate);
}

/**
 * Returns tomorrow's calendar date in YYYY-MM-DD format in the Asia/Kolkata timezone.
 * Used for dynamic minimum selectable start date.
 */
export function getTomorrowKolkataDateString(referenceDate: Date = new Date()): string {
  const todayKolkataStr = getTodayKolkataDateString(referenceDate);
  const [year, month, day] = todayKolkataStr.split('-').map(Number);
  // Add 1 calendar day safely in UTC
  const tomorrow = new Date(Date.UTC(year, month - 1, day + 1));
  return tomorrow.toISOString().split('T')[0];
}

/**
 * Returns a default suggested start date (e.g. 7 days from tomorrow) in YYYY-MM-DD format.
 */
export function getDefaultStartDateKolkata(referenceDate: Date = new Date()): string {
  const todayKolkataStr = getTodayKolkataDateString(referenceDate);
  const [year, month, day] = todayKolkataStr.split('-').map(Number);
  const defaultDate = new Date(Date.UTC(year, month - 1, day + 7));
  return defaultDate.toISOString().split('T')[0];
}

/**
 * Validates whether a provided date string (YYYY-MM-DD) is starting from tomorrow onwards
 * relative to the current date in Asia/Kolkata timezone.
 */
export function isValidStartDateKolkata(dateStr: string, referenceDate: Date = new Date()): boolean {
  if (!dateStr || typeof dateStr !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr.trim())) {
    return false;
  }
  const trimmed = dateStr.trim();
  const minAllowedDate = getTomorrowKolkataDateString(referenceDate);
  // Standard ISO 8601 YYYY-MM-DD lexicographical comparison
  return trimmed >= minAllowedDate;
}
