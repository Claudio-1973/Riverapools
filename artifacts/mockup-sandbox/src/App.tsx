import { useEffect, useState, lazy, Suspense, type ComponentType } from "react";
import { CITIES } from "./components/mockups/rivera-pools/cities";
import seoPages from "./components/mockups/rivera-pools/seo-pages.json";
import serviceDetails from "./components/mockups/rivera-pools/service-details.json";
import type { SeoPage } from "./components/mockups/rivera-pools/SeoLanding";
import { DeferredInsights } from "./components/DeferredInsights";

// Lazy-load heavy page components — keeps initial bundle small
const Landing = lazy(() =>
  import("./components/mockups/rivera-pools/Landing").then((m) => ({ default: m.Landing }))
);
const CityLanding = lazy(() =>
  import("./components/mockups/rivera-pools/CityLanding").then((m) => ({ default: m.CityLanding }))
);
const SeoLanding = lazy(() =>
  import("./components/mockups/rivera-pools/SeoLanding").then((m) => ({ default: m.SeoLanding }))
);
const PoolCleaningCenter = lazy(() =>
  import("./components/mockups/rivera-pools/PoolCleaningCenter").then((m) => ({ default: m.PoolCleaningCenter }))
);
const PebbleVsQuartzPost = lazy(() =>
  import("./components/mockups/rivera-pools/PebbleVsQuartzPost").then((m) => ({ default: m.PebbleVsQuartzPost }))
);
const BlogHub = lazy(() =>
  import("./components/mockups/rivera-pools/BlogHub").then((m) => ({ default: m.BlogHub }))
);
const PoolRemodelingCenter = lazy(() =>
  import("./components/mockups/rivera-pools/PoolRemodelingCenter").then((m) => ({ default: m.PoolRemodelingCenter }))
);
const ChatWidget = lazy(() =>
  import("./components/mockups/rivera-pools/ChatWidget").then((m) => ({ default: m.ChatWidget }))
);
const ReviewPage = lazy(() =>
  import("./components/mockups/rivera-pools/ReviewPage").then((m) => ({ default: m.ReviewPage }))
);

const SEO_PAGES = seoPages.map((page) => ({
  ...page,
  ...serviceDetails[page.slug as keyof typeof serviceDetails],
})) as SeoPage[];
const SEO_PAGE_MAP = new Map(SEO_PAGES.map((page) => [page.slug, page]));

import { modules as discoveredModules } from "./.generated/mockup-components";

type ModuleMap = Record<string, () => Promise<Record<string, unknown>>>;

function _resolveComponent(
  mod: Record<string, unknown>,
  name: string,
): ComponentType | undefined {
  const fns = Object.values(mod).filter(
    (v) => typeof v === "function",
  ) as ComponentType[];
  return (
    (mod.default as ComponentType) ||
    (mod.Preview as ComponentType) ||
    (mod[name] as ComponentType) ||
    fns[fns.length - 1]
  );
}

function PreviewRenderer({
  componentPath,
  modules,
}: {
  componentPath: string;
  modules: ModuleMap;
}) {
  const [Component, setComponent] = useState<ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setComponent(null);
    setError(null);

    async function loadComponent(): Promise<void> {
      const key = `./components/mockups/${componentPath}.tsx`;
      const loader = modules[key];
      if (!loader) {
        setError(`No component found at ${componentPath}.tsx`);
        return;
      }

      try {
        const mod = await loader();
        if (cancelled) {
          return;
        }
        const name = componentPath.split("/").pop()!;
        const comp = _resolveComponent(mod, name);
        if (!comp) {
          setError(
            `No exported React component found in ${componentPath}.tsx\n\nMake sure the file has at least one exported function component.`,
          );
          return;
        }
        setComponent(() => comp);
      } catch (e) {
        if (cancelled) {
          return;
        }

        const message = e instanceof Error ? e.message : String(e);
        setError(`Failed to load preview.\n${message}`);
      }
    }

    void loadComponent();

    return () => {
      cancelled = true;
    };
  }, [componentPath, modules]);

  if (error) {
    return (
      <pre style={{ color: "red", padding: "2rem", fontFamily: "system-ui" }}>
        {error}
      </pre>
    );
  }

  if (!Component) return null;

  return <Component />;
}

function getBasePath(): string {
  return import.meta.env.BASE_URL.replace(/\/$/, "");
}

function getPreviewExamplePath(): string {
  const basePath = getBasePath();
  return `${basePath}/preview/ComponentName`;
}

function Gallery() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-semibold text-gray-900 mb-3">
          Component Preview Server
        </h1>
        <p className="text-gray-500 mb-4">
          This server renders individual components for the workspace canvas.
        </p>
        <p className="text-sm text-gray-400">
          Access component previews at{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">
            {getPreviewExamplePath()}
          </code>
        </p>
      </div>
    </div>
  );
}

function DeferredChat() {
  return (
    <Suspense fallback={null}>
      <ChatWidget />
    </Suspense>
  );
}

function getPreviewPath(): string | null {
  const basePath = getBasePath();
  const { pathname } = window.location;
  const local =
    basePath && pathname.startsWith(basePath)
      ? pathname.slice(basePath.length) || "/"
      : pathname;
  const match = local.match(/^\/preview\/(.+)$/);
  return match ? match[1] : null;
}

function getRoutePath(): string {
  const basePath = getBasePath();
  const { pathname } = window.location;
  const local =
    basePath && pathname.startsWith(basePath)
      ? pathname.slice(basePath.length) || "/"
      : pathname;

  if (local === "/preview/" || local === "/preview") {
    const previewRoute = new URLSearchParams(window.location.search).get("route");
    if (previewRoute) return previewRoute.replace(/^\/|\/$/g, "");
  }

  // The Replit design preview adds this prefix locally; it is not part of
  // public Vercel routes such as /review.
  return local.replace(/^\/__mockup(?=\/|$)/, "").replace(/^\/|\/$/g, "");
}

function App() {
  const previewPath = getPreviewPath();

  if (previewPath) {
    return (
      <PreviewRenderer
        componentPath={previewPath}
        modules={discoveredModules}
      />
    );
  }

  const routePath = getRoutePath();

  if (routePath === "review") {
    return (
      <Suspense fallback={null}>
        <ReviewPage />
      </Suspense>
    );
  }

  if (routePath === "blog/pool-cleaning-maintenance-riverside-ca") {
    return (
      <Suspense fallback={null}>
        <PoolCleaningCenter />
        <DeferredInsights />
        <DeferredChat />
      </Suspense>
    );
  }

  if (routePath === "blog") {
    return (
      <Suspense fallback={null}>
        <BlogHub />
        <DeferredInsights />
        <DeferredChat />
      </Suspense>
    );
  }

  if (routePath === "blog/pebble-vs-quartz-pool-finishes") {
    return (
      <Suspense fallback={null}>
        <PebbleVsQuartzPost />
        <DeferredInsights />
        <DeferredChat />
      </Suspense>
    );
  }

  if (routePath === "blog/pool-remodeling") {
    return (
      <Suspense fallback={null}>
        <PoolRemodelingCenter />
        <DeferredInsights />
        <DeferredChat />
      </Suspense>
    );
  }

  const seoPage = SEO_PAGE_MAP.get(routePath);

  if (seoPage) {
    return (
      <Suspense fallback={null}>
        <SeoLanding page={seoPage} />
        <DeferredInsights />
        <DeferredChat />
      </Suspense>
    );
  }

  // City-specific pages
  const citySlug = routePath.split("/")[0];
  const city = CITIES[citySlug];

  if (city) {
    return (
      <Suspense fallback={null}>
        <CityLanding city={city} />
        <DeferredInsights />
        <DeferredChat />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={null}>
      <Landing />
      <DeferredInsights />
      <DeferredChat />
    </Suspense>
  );
}

export default App;
