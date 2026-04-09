import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages (will be created)
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const HomePage = React.lazy(() => import('./pages/HomePage'));
const BrowsePage = React.lazy(() => import('./pages/BrowsePage'));
const VideoDetailPage = React.lazy(() => import('./pages/VideoDetailPage'));
const UploadPage = React.lazy(() => import('./pages/UploadPage'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage'));
const SearchPage = React.lazy(() => import('./pages/SearchPage'));

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/login" element={<React.Suspense fallback={<div>Loading...</div>}><LoginPage /></React.Suspense>} />
            <Route path="/register" element={<React.Suspense fallback={<div>Loading...</div>}><RegisterPage /></React.Suspense>} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <div className="flex">
                    <Sidebar />
                    <main className="flex-1">
                      <React.Suspense fallback={<div>Loading...</div>}>
                        <HomePage />
                      </React.Suspense>
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/browse"
              element={
                <ProtectedRoute>
                  <div className="flex">
                    <Sidebar />
                    <main className="flex-1">
                      <React.Suspense fallback={<div>Loading...</div>}>
                        <BrowsePage />
                      </React.Suspense>
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <div className="flex">
                    <Sidebar />
                    <main className="flex-1">
                      <React.Suspense fallback={<div>Loading...</div>}>
                        <SearchPage />
                      </React.Suspense>
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/video/:id"
              element={
                <ProtectedRoute>
                  <div className="flex">
                    <Sidebar />
                    <main className="flex-1">
                      <React.Suspense fallback={<div>Loading...</div>}>
                        <VideoDetailPage />
                      </React.Suspense>
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <div className="flex">
                    <Sidebar />
                    <main className="flex-1">
                      <React.Suspense fallback={<div>Loading...</div>}>
                        <ProfilePage />
                      </React.Suspense>
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <div className="flex">
                    <Sidebar />
                    <main className="flex-1">
                      <React.Suspense fallback={<div>Loading...</div>}>
                        <UploadPage />
                      </React.Suspense>
                    </main>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
