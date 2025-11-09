import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { RoleProtectedRoute } from './RoleProtectedRoute';
import { Login, Register, Dashboard, NotFound, Unauthorized } from '../pages';
import { UsersPage } from '../pages/UsersPage';
import { useAuthStore } from '../store';

/**
 * Componente que define todas las rutas de la aplicación
 * Maneja autenticación, roles y rutas privadas/públicas
 */
export const AppRoutes: React.FC = () => {
  const { isAuthenticated, isLoading, userRole } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route
          path="/login"
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <Register />
            </PublicRoute>
          }
        />

        {/* Rutas privadas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              isLoading={isLoading}
            >
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Rutas protegidas por rol - Admin o Editor */}
        <Route
          path="/users"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <RoleProtectedRoute
                userRole={userRole}
                requiredRoles={['admin', 'editor']}
              >
                <UsersPage />
              </RoleProtectedRoute>
            </PrivateRoute>
          }
        />

        {/* Rutas protegidas por rol - Solo Admin */}
        <Route
          path="/permissions"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <RoleProtectedRoute userRole={userRole} requiredRoles={['admin']}>
                <div>Página de Permisos - Próximamente</div>
              </RoleProtectedRoute>
            </PrivateRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <RoleProtectedRoute userRole={userRole} requiredRoles={['admin']}>
                <div>Página de Configuración - Próximamente</div>
              </RoleProtectedRoute>
            </PrivateRoute>
          }
        />

        {/* Rutas de error */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/404" element={<NotFound />} />

        {/* Ruta por defecto */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Ruta 404 para todas las demás */}
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
