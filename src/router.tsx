import { lazy } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router';

// Public routes — this is a marketing site with no auth.
const publicRoutes: RouteObject[] = [
  {
    path: '/',
    Component: lazy(() => import('./pages/HomePage'))
  },
  {
    path: '/services/:slug',
    Component: lazy(() => import('./pages/ServicePage'))
  },
  {
    path: '/terms',
    Component: lazy(() => import('./pages/TermsPage'))
  },
  {
    path: '*',
    Component: lazy(() => import('./pages/NotFoundPage'))
  }
];

export const router = createBrowserRouter(publicRoutes);
