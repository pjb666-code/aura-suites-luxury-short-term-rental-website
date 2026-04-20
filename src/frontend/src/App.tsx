import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { ThemeProvider } from "next-themes";
import { Suspense, lazy } from "react";
import { Toaster } from "./components/ui/sonner";

import AdminPage from "./pages/AdminPage";
// Eager-loaded (critical path)
import HomePage from "./pages/HomePage";

// Lazy-loaded (non-critical)
const ApartmentsPage = lazy(() => import("./pages/ApartmentsPage"));
const ApartmentDetailPage = lazy(() => import("./pages/ApartmentDetailPage"));
const AuraCollectionPage = lazy(() => import("./pages/AuraCollectionPage"));
const ArtistDetailPage = lazy(() => import("./pages/ArtistDetailPage"));
const ArtworkDetailPage = lazy(() => import("./pages/ArtworkDetailPage"));
const ExperiencePage = lazy(() => import("./pages/ExperiencePage"));
const ImprintPage = lazy(() => import("./pages/ImprintPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Loader2 className="h-8 w-8 animate-spin text-luxury-gold" />
    </div>
  );
}

function withSuspense(Component: React.ComponentType) {
  return function SuspenseWrapped() {
    return (
      <Suspense fallback={<PageLoader />}>
        <Component />
      </Suspense>
    );
  };
}

// Root route component
function RootComponent() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-background">
        <Toaster />
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

// Root route
const rootRoute = createRootRoute({
  component: RootComponent,
});

// Home route (eager)
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

// Admin route (eager)
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

// Apartments listing route (lazy)
const apartmentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/apartments",
  component: withSuspense(ApartmentsPage),
});

// Apartment detail route (lazy)
const apartmentDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/apartments/$apartmentId",
  component: withSuspense(ApartmentDetailPage),
});

// Aura Collection listing route (lazy)
const auraCollectionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/aura-collection",
  component: withSuspense(AuraCollectionPage),
});

// Artist detail route (lazy)
const artistDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/artists/$artistId",
  component: withSuspense(ArtistDetailPage),
});

// Artwork detail route (lazy)
const artworkDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/artworks/$artworkId",
  component: withSuspense(ArtworkDetailPage),
});

// Experience route (lazy)
const experienceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/experience",
  component: withSuspense(ExperiencePage),
});

// Legal routes (lazy)
const imprintRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/imprint",
  component: withSuspense(ImprintPage),
});

const privacyPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy-policy",
  component: withSuspense(PrivacyPolicyPage),
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms",
  component: withSuspense(TermsPage),
});

// Create router with scroll-to-top on every navigation
const routeTree = rootRoute.addChildren([
  indexRoute,
  adminRoute,
  apartmentsRoute,
  apartmentDetailRoute,
  auraCollectionRoute,
  artistDetailRoute,
  artworkDetailRoute,
  experienceRoute,
  imprintRoute,
  privacyPolicyRoute,
  termsRoute,
]);
const router = createRouter({
  routeTree,
  scrollRestoration: false,
});

// Subscribe to all navigations and scroll to top
router.subscribe("onLoad", () => {
  window.scrollTo({ top: 0, behavior: "instant" });
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
