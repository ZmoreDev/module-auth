// src/router/index.tsx
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import ProtectedRoute from '../components/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routes.map(({ path, element, protected: isProtected }) => (
          <Route
            key={path}
            path={path}
            element={
              isProtected
                ? <ProtectedRoute>{element}</ProtectedRoute>
                : element
            }
          />
        ))}
      </Routes>
    </Suspense>
  );
}
