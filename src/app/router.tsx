import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppShell } from '@/shared/layout/AppShell';
import { ROUTES } from '@/shared/lib/routes';

const HomePage = lazy(() => import('@/pages/HomePage'));
const SumToNPage = lazy(() => import('@/pages/SumToNPage'));
const FancyFormPage = lazy(() => import('@/pages/FancyFormPage'));
const MessyReactPage = lazy(() => import('@/pages/MessyReactPage'));

function RouteFallback() {
  return (
    <main aria-busy="true" aria-live="polite" className="grid min-h-dvh place-items-center">
      <p className="lux-caption m-0">Loading solution</p>
    </main>
  );
}

function withSuspense(Page: LazyExoticComponent<ComponentType>) {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Page />
    </Suspense>
  );
}

const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: ROUTES.home, element: withSuspense(HomePage) },
      { path: ROUTES.sumToN, element: withSuspense(SumToNPage) },
      { path: ROUTES.fancyForm, element: withSuspense(FancyFormPage) },
      { path: ROUTES.messyReact, element: withSuspense(MessyReactPage) },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
