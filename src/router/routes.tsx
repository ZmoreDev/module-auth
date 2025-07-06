// src/router/routes.tsx
import React, { lazy } from 'react';
import type { ReactNode } from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import BlankLayout from '../layouts/BlankLayout';

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
const withLayout = (Layout: React.FC<{ children: ReactNode }>, el: ReactNode) =>
  React.createElement(Layout, null, el);

// สร้าง route list
export const routes: RouteType[] = [
  {
    path: '/',
    element: withLayout(DefaultLayout, <Home />),
  },
  {
    path: '/about',
    element: withLayout(DefaultLayout, <About />),
    protected: true,      // ต้องล็อกอิน
  },
  {
    path: '/dashboard',
    element: withLayout(DefaultLayout, <Dashboard />),
    protected: true,      // ต้องล็อกอิน
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
