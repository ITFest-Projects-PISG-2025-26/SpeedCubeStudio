// apps/frontend/components/Header.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { cn } from "../lib/utils";
import { logout, isAuthenticated, getCurrentUser } from "../utils/auth";

const navLinks = [
  { href: "/", label: "Timer" },
  { href: "/trainer", label: "Trainer" },
  { href: "/solver", label: "Solver" },
  { href: "/stats", label: "Stats" },
];

export const Header: React.FC = () => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check authentication status on mount and when localStorage changes
    const checkAuth = () => {
      const authStatus = isAuthenticated();
      const currentUser = getCurrentUser();
      setAuthenticated(authStatus);
      setUser(currentUser);
    };

    checkAuth();

    // Listen for storage changes (e.g., login/logout in another tab)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    setUser(null);
    router.push('/');
  };

  return (
    <header className="w-full border-b bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-600">
          SpeedCubeStudio
        </Link>
        <nav className="flex items-center space-x-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-sm font-medium",
                router.pathname === href
                  ? "text-blue-600 underline"
                  : "text-gray-600 hover:text-gray-800"
              )}
            >
              {label}
            </Link>
          ))}
          
          <div className="ml-4 flex items-center space-x-2 border-l pl-4">
            {authenticated ? (
              <>
                <span className="text-sm text-gray-600">
                  Hello, {user?.name || user?.username || 'User'}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-600 hover:text-red-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={cn(
                    "text-sm font-medium",
                    router.pathname === "/login"
                      ? "text-blue-600 underline"
                      : "text-gray-600 hover:text-gray-800"
                  )}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className={cn(
                    "text-sm font-medium px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                  )}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
