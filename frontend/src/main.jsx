// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from '@pages/Login';
import Home from '@pages/Home';
import Users from '@pages/Users';
import Register from '@pages/Register';
import Error404 from '@pages/Error404';
import EspaciosComunes from '@pages/EspaciosComunes';
import Root from '@pages/Root';
import ProtectedRoute from '@components/ProtectedRoute';
import '@styles/styles.css';
import Visits from '@pages/Visits';
import Visitas from '@pages/Visitas';
import Visitante from '@pages/Visitante';
import ReservasEspacios from '@pages/reservasEspaciosComunes';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error404 />,
    children: [
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'users',
        element: (
          <ProtectedRoute allowedRoles={['administrador']}>
            <Users />
          </ProtectedRoute>
        )
      },
      {
        path: 'visits',
        element: (
          <ProtectedRoute allowedRoles={['administrador', 'portero']}>
            <Visits />
          </ProtectedRoute>
        )
      },
      {
        path: 'visitas',
        element: (
          <ProtectedRoute allowedRoles={['administrador', 'portero']}>
            <Visitas />
          </ProtectedRoute>
        )
      },
      {
        path: 'visitante/new',
        element: (
          <ProtectedRoute allowedRoles={['administrador', 'portero']}>
            <Visitante />
          </ProtectedRoute>
        )
      },
      {
        path: '/espaciosComunes',
        element: (
          <ProtectedRoute allowedRoles={['administrador']}>
            <EspaciosComunes />
          </ProtectedRoute>
        )
      },
      {
        path: '/reservasEspaciosComunes',
        element: (
          <ProtectedRoute allowedRoles={['administrador', 'portero', 'residente']}>
            <ReservasEspacios />
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: 'auth',
    element: <Login />
  },
  {
    path: 'register',
    element: <Register />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);