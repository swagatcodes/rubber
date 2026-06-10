"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ArrowRight, CheckCircle, Zap, Shield, Users, BarChart3 } from "lucide-react";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Navigation */}
        <nav className="border-b border-foreground/10 bg-background/95 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Premium
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
            >
              Go to Dashboard
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="text-center max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome back, {session.user?.name}! 👋
            </h1>
            <p className="text-xl text-foreground/60 mb-8">
              You're all set. Head to your dashboard to get started.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium rounded-lg hover:shadow-lg transition"
            >
              Go to Dashboard <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-foreground/10 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Premium
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-sm font-medium hover:text-primary-600 transition"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-full text-sm font-medium mb-6">
            🚀 Production-Ready Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Build Your Digital Future
          </h1>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto mb-8">
            A complete, production-ready platform with authentication, user management, products, orders, and admin analytics. Everything you need to scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium rounded-lg hover:shadow-lg transition inline-flex items-center justify-center gap-2"
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#features"
              className="px-8 py-3 border border-foreground/20 font-medium rounded-lg hover:bg-foreground/5 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 px-4 bg-foreground/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Powerful Features</h2>
          <p className="text-center text-foreground/60 mb-16 max-w-2xl mx-auto">
            Everything you need to build, manage, and scale your application
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Authentication */}
            <div className="bg-white dark:bg-slate-900 rounded-lg p-8 shadow hover:shadow-lg transition">
              <Shield className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Secure Auth</h3>
              <p className="text-foreground/60">
                Complete authentication with email verification, password reset, and secure session management.
              </p>
            </div>

            {/* User Management */}
            <div className="bg-white dark:bg-slate-900 rounded-lg p-8 shadow hover:shadow-lg transition">
              <Users className="w-12 h-12 text-secondary-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">User Management</h3>
              <p className="text-foreground/60">
                Role-based access control with admin, moderator, and user roles.
              </p>
            </div>

            {/* Analytics */}
            <div className="bg-white dark:bg-slate-900 rounded-lg p-8 shadow hover:shadow-lg transition">
              <BarChart3 className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Analytics</h3>
              <p className="text-foreground/60">
                Comprehensive dashboards with real-time metrics and insights.
              </p>
            </div>

            {/* Products */}
            <div className="bg-white dark:bg-slate-900 rounded-lg p-8 shadow hover:shadow-lg transition">
              <Zap className="w-12 h-12 text-amber-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Product Management</h3>
              <p className="text-foreground/60">
                Full product lifecycle management with categories, inventory, and reviews.
              </p>
            </div>

            {/* Orders */}
            <div className="bg-white dark:bg-slate-900 rounded-lg p-8 shadow hover:shadow-lg transition">
              <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Order System</h3>
              <p className="text-foreground/60">
                Complete order management with status tracking and history.
              </p>
            </div>

            {/* Dark Mode */}
            <div className="bg-white dark:bg-slate-900 rounded-lg p-8 shadow hover:shadow-lg transition">
              <div className="w-12 h-12 text-blue-600 mb-4 text-2xl">🌙</div>
              <h3 className="text-xl font-bold mb-2">Dark Mode</h3>
              <p className="text-foreground/60">
                Beautiful, responsive design with full dark mode support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Modern Tech Stack</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-bold mb-2">Next.js 14</h3>
              <p className="text-foreground/60">Latest app router & server components</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="font-bold mb-2">NextAuth.js</h3>
              <p className="text-foreground/60">Secure authentication & authorization</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="font-bold mb-2">Tailwind CSS</h3>
              <p className="text-foreground/60">Utility-first CSS framework</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🗄️</div>
              <h3 className="font-bold mb-2">PostgreSQL</h3>
              <p className="text-foreground/60">Robust relational database</p>
            </div>
            <div>
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-bold mb-2">Prisma ORM</h3>
              <p className="text-foreground/60">Type-safe database client</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🎭</div>
              <h3 className="font-bold mb-2">Framer Motion</h3>
              <p className="text-foreground/60">Smooth animations & transitions</p>
            </div>
            <div>
              <div className="text-4xl mb-4">💾</div>
              <h3 className="font-bold mb-2">Zustand</h3>
              <p className="text-foreground/60">Lightweight state management</p>
            </div>
            <div>
              <div className="text-4xl mb-4">✅</div>
              <h3 className="font-bold mb-2">Zod</h3>
              <p className="text-foreground/60">TypeScript-first validation</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-lg mb-8 opacity-90">
            Create your account today and start building your dream application.
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary-600 font-medium rounded-lg hover:bg-foreground/90 transition"
          >
            Sign Up Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-foreground/10 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-foreground/60 text-sm">
          <p>&copy; 2024 Premium App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
