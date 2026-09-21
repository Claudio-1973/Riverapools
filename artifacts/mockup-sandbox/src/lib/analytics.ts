type AnalyticsParams = Record<string, string | number>;

declare global {
  interface Window {
    gtag?: (command: "event", eventName: string, params?: AnalyticsParams) => void;
  }
}

function track(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  window.gtag("event", eventName, {
    ...params,
    page_path: window.location.pathname,
  });
}

/**
 * Records intent to call without sending the phone number or any visitor data.
 */
export function trackPhoneClick(phoneLocation: string) {
  track("phone_click", { phone_location: phoneLocation });
}

/**
 * Records only a confirmed quote/lead submission. Keep this payload limited to
 * controlled business context; never add form names, contact details, or notes.
 */
export function trackQuoteSubmission({
  formLocation,
  city,
  service,
}: {
  formLocation: string;
  city?: string;
  service?: string;
}) {
  const params: AnalyticsParams = { form_location: formLocation };
  if (city) params.city = city;
  if (service) params.service = service;
  track("generate_lead", params);
}

/**
 * Records a click/attempt to open the public Google review form. The rating is
 * the selected star value only; review text never enters Analytics.
 */
export function trackGoogleReviewClick(reviewSource: string, rating: number) {
  track("google_review_click", {
    review_source: reviewSource,
    rating,
  });
}

/**
 * Records a successful private feedback submission without its private fields.
 */
export function trackPrivateFeedbackSubmission(rating: number) {
  track("private_feedback_submitted", { rating });
}
