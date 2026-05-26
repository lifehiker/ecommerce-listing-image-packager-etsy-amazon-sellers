type AnalyticsEvent =
  | "tool_used"
  | "signup_started"
  | "pack_created"
  | "images_uploaded"
  | "export_started"
  | "export_completed"
  | "checkout_started"
  | "subscription_created";

export function track(event: AnalyticsEvent, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") {
    console.log("[analytics]", event, properties ?? {});
    return;
  }

  window.dispatchEvent(new CustomEvent("listingpackr:analytics", { detail: { event, properties } }));
}
