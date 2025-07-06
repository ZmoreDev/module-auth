import React, { lazy } from 'react';
import type { ReactNode } from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import BlankLayout from '../layouts/BlankLayout';
import ProtectedRoute from '../components/ProtectedRoute';

// Lazy load pages
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Login = lazy(() => import('../pages/Login'));
const NotFound = lazy(() => import('../pages/NotFound'));

interface RouteType {
  path: string;
  element: ReactNode;
  protected?: boolean;
}

// helper ฟังก์ชัน wrap ด้วย layout
const withLayout = (layout: React.FC<{ children: ReactNode }>, element: ReactNode) => {
  return React.createElement(layout, null, element);
};

// สร้าง route list
export const routes: RouteType[] = [
  {
    path: '/',
    element: withLayout(DefaultLayout, <Home />),
  },
  {
    path: '/about',
    element: (
      <ProtectedRoute>
        {withLayout(DefaultLayout, <About />)}
      </ProtectedRoute>
    ),
    protected: true
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        {withLayout(DefaultLayout, <Dashboard />)}
      </ProtectedRoute>
    ),
    protected: true,
  },
  {
    path: '/login',
    element: withLayout(BlankLayout, <Login />),
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
