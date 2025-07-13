'use client';

import { useState, useEffect } from 'react';

interface AdminAuthProps {
  children: React.ReactNode;
}

export default function AdminAuth({ children }: AdminAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Simple authentication check
    if (username === 'Rage Diva' && password === 'Matcha123') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    setUsername('');
    setPassword('');
  };

  if (loading) {
    return (
      <div className="aa-bg aa-center">
        <div className="aa-loading-wrap">
          <div className="aa-loading-spinner"></div>
          <p className="aa-loading-text">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="aa-bg aa-center aa-auth-padding">
        <div className="aa-auth-container">
          <div className="aa-auth-card">
            <div className="aa-auth-header">
              <h2 className="aa-auth-title">
                🔐 Admin Access
              </h2>
              <p className="aa-auth-desc">
                Enter your credentials to access the admin panel
              </p>
            </div>

            <form onSubmit={handleLogin} className="aa-auth-form">
              <div>
                <label htmlFor="username" className="aa-label">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="aa-input"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label htmlFor="password" className="aa-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="aa-input"
                  placeholder="Enter your password"
                />
              </div>

              {error && (
                <div className="aa-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="aa-auth-btn"
              >
                Sign In ✨
              </button>
            </form>

            <div className="aa-auth-footer">
              <p className="aa-auth-footer-text">
                Secure admin access for survey management
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="aa-admin-bar">
        <div className="aa-admin-bar-inner">
          <div className="aa-admin-bar-content">
            <div className="aa-admin-bar-welcome">
              <span className="aa-admin-bar-welcome-text">👋 Welcome back!</span>
            </div>
            <button
              onClick={handleLogout}
              className="aa-admin-bar-logout"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
