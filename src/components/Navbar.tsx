"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { Menu, Sun, Moon, LogOut, Settings } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-foreground/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href={session ? "/dashboard" : "/"}
          className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
        >
          Premium
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium hover:text-primary-600 transition"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/profile"
                className="text-sm font-medium hover:text-primary-600 transition"
              >
                Profile
              </Link>
              {session.user?.role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="text-sm font-medium hover:text-primary-600 transition"
                >
                  Admin
                </Link>
              )}
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-sm font-medium hover:text-primary-600 transition"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Theme Toggle & Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg hover:bg-foreground/10 transition"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {session && (
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => signOut({ callbackUrl: "/auth/login" })}
                className="p-2 rounded-lg hover:bg-foreground/10 transition"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Mobile Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-foreground/10 transition"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-foreground/10 p-4">
          <div className="flex flex-col gap-4">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium hover:text-primary-600 transition block py-2"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="text-sm font-medium hover:text-primary-600 transition block py-2"
                >
                  Profile
                </Link>
                {session.user?.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className="text-sm font-medium hover:text-primary-600 transition block py-2"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    signOut({ callbackUrl: "/auth/login" });
                    setMobileMenuOpen(false);
                  }}
                  className="text-sm font-medium hover:text-primary-600 transition block py-2 text-left"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-sm font-medium hover:text-primary-600 transition block py-2"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition inline-block"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
