import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingButtons } from "@/components/FloatingButtons";

function NotFoundComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 grid place-items-center px-4 pt-24">
        <div className="max-w-md text-center">
          <h1 className="font-display text-7xl text-primary">404</h1>
          <h2 className="mt-4 text-xl font-semibold text-ink">Page not found</h2>
          <p className="mt-2 text-sm text-ink-soft">
            The page you're looking for doesn't exist.
          </p>
          <Link to="/" className="btn-primary mt-6">Go home</Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="min-h-screen grid place-items-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl text-primary">This page didn't load</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Something went wrong. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-primary">Try again</button>
          <a href="/" className="btn-ghost">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Gangula Mahesh — Civil Site Engineer Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Gangula Mahesh, Civil Site Engineer specializing in construction, site execution, quantity surveying, ETABS, STAAD Pro, and AutoCAD.",
      },
      { name: "author", content: "Gangula Mahesh" },
      { name: "theme-color", content: "#1E3A5F" },
      { property: "og:title", content: "Gangula Mahesh — Civil Site Engineer" },
      {
        property: "og:description",
        content:
          "Civil Engineer passionate about construction, site execution and quality engineering.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <FloatingButtons />
      </div>
    </QueryClientProvider>
  );
}
