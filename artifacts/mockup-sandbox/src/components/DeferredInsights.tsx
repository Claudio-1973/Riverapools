import { useEffect, useState, type ComponentType } from "react";

type InsightComponents = {
  Analytics: ComponentType;
  SpeedInsights: ComponentType;
};

export function DeferredInsights() {
  const [components, setComponents] = useState<InsightComponents | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void Promise.all([
        import("@vercel/analytics/react"),
        import("@vercel/speed-insights/react"),
      ]).then(([analytics, speed]) => {
        setComponents({
          Analytics: analytics.Analytics,
          SpeedInsights: speed.SpeedInsights,
        });
      });
    }, 2000);

    return () => window.clearTimeout(timer);
  }, []);

  if (!components) return null;

  const { Analytics, SpeedInsights } = components;
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}