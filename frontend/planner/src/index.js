import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './templates/home';
import SignUp from './templates/sign_up';
import Login from './templates/login';
import ErrorPage from './templates/error_page';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthProvider } from './context/AuthContext';

import PrivateRoute from './utils/PrivateRoute'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/sign_up",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);