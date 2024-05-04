import React from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Home from './templates/home';
import SignUp from './templates/sign_up';
import Login from './templates/login';
import ErrorPage from './templates/error_page';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <Routes>
            <Route path="*" element={<ErrorPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/sign_up" element={<SignUpOrRedirect />} />
            <Route path="/login" element={<LoginOrRedirect />} />
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter >
  );
}

function SignUpOrRedirect() {
  const { user } = useAuth();
  return user ? <Navigate to="/" /> : <SignUp />;
}

function LoginOrRedirect() {
  const { user } = useAuth();
  return user ? <Navigate to="/" /> : <Login />;
}

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
