// Google Analytics (GA4 / gtag.js) configuration and event helpers.
// The measurement ID is a public identifier (it ships in the page HTML), so it
// is safe to keep in source.
export const GA_MEASUREMENT_ID = 'G-ZH0WKQVD1N';

type GtagArgs =
  | ['js', Date]
  | ['config', string, Record<string, unknown>?]
  | ['event', string, Record<string, unknown>?];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
  }
}

/**
 * Send a custom GA4 event. No-op if gtag hasn't loaded (e.g. in development,
 * where analytics is not injected).
 */
export function trackEvent(
  name: string,
  params?: Record<string, unknown>,
): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function')
    return;
  window.gtag('event', name, params);
}
