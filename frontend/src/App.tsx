import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/sonner';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import ApartmentsPage from './pages/ApartmentsPage';
import ApartmentDetailPage from './pages/ApartmentDetailPage';
import AuraCollectionPage from './pages/AuraCollectionPage';
import ArtistDetailPage from './pages/ArtistDetailPage';
import ArtworkDetailPage from './pages/ArtworkDetailPage';
import ExperiencePage from './pages/ExperiencePage';
import ImprintPage from './pages/ImprintPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import { ThemeProvider } from 'next-themes';

const queryClient = new QueryClient();

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

// Home route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

// Admin route
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminPage,
});

// Apartments listing route
const apartmentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/apartments',
  component: ApartmentsPage,
});

// Apartment detail route
const apartmentDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/apartments/$apartmentId',
  component: ApartmentDetailPage,
});

// Aura Collection listing route
const auraCollectionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/aura-collection',
  component: AuraCollectionPage,
});

// Artist detail route
const artistDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/artists/$artistId',
  component: ArtistDetailPage,
});

// Artwork detail route
const artworkDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/artworks/$artworkId',
  component: ArtworkDetailPage,
});

// Experience route
const experienceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/experience',
  component: ExperiencePage,
});

// Legal routes
const imprintRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/imprint',
  component: ImprintPage,
});

const privacyPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy-policy',
  component: PrivacyPolicyPage,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/terms',
  component: TermsPage,
});

// Create router
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
const router = createRouter({ routeTree });

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
