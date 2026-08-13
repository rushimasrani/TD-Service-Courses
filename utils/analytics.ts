export const trackEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
  // Push to dataLayer for GTM
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: eventName,
      ...eventParams
    });
  }

  // Also push directly to gtag if available (for standard GA4 implementation)
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', eventName, eventParams);
  }
};
