"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { TrendingUp, Users, Package, ShoppingCart } from "lucide-react";

interface StatsData {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  newUsers: number;
  newOrders: number;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.role === "ADMIN") {
      fetchAnalytics();
    } else {
      setLoading(false);
    }
  }, [session]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/admin/analytics");
      const data = await response.json();
      if (data.success) {
        setStats(data.data.summary);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Welcome back, {session?.user?.name}! 👋</h1>
        <p className="text-foreground/60 mt-2">
          {session?.user?.role === "ADMIN"
            ? "Here's what's happening with your business today"
            : "Manage your account and products"}
        </p>
      </div>

      {/* Stats Cards - Admin View */}
      {session?.user?.role === "ADMIN" && stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/60 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
                <p className="text-green-600 text-sm mt-1">+{stats.newUsers} new</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Total Products */}
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/60 text-sm font-medium">Products</p>
                <p className="text-3xl font-bold mt-2">{stats.totalProducts}</p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/60 text-sm font-medium">Orders</p>
                <p className="text-3xl font-bold mt-2">{stats.totalOrders}</p>
                <p className="text-green-600 text-sm mt-1">+{stats.newOrders} new</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/60 text-sm font-medium">Revenue</p>
                <p className="text-3xl font-bold mt-2">${stats.totalRevenue.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User View */}
      {session?.user?.role !== "ADMIN" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-slate-900 dark:to-slate-800 rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <a
                href="/dashboard/products"
                className="block p-3 bg-white dark:bg-slate-700 rounded-lg hover:shadow transition"
              >
                <p className="font-medium">📦 My Products</p>
                <p className="text-sm text-foreground/60">Manage your products</p>
              </a>
              <a
                href="/dashboard/orders"
                className="block p-3 bg-white dark:bg-slate-700 rounded-lg hover:shadow transition"
              >
                <p className="font-medium">🛒 Orders</p>
                <p className="text-sm text-foreground/60">View your orders</p>
              </a>
              <a
                href="/dashboard/profile"
                className="block p-3 bg-white dark:bg-slate-700 rounded-lg hover:shadow transition"
              >
                <p className="font-medium">👤 Profile</p>
                <p className="text-sm text-foreground/60">Update your profile</p>
              </a>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-8">
            <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
            <ol className="space-y-3 text-foreground/70">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm">
                  1
                </span>
                <span>Complete your profile</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm">
                  2
                </span>
                <span>Add your first product</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm">
                  3
                </span>
                <span>Start getting orders</span>
              </li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
