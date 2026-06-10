"use client";

import React, { useEffect, useState } from "react";
import { BarChart3, Users, TrendingUp, DollarSign } from "lucide-react";
import toast from "react-hot-toast";

interface Analytics {
  summary: {
    totalUsers: number;
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    newUsers: number;
    newOrders: number;
  };
  recentOrders: any[];
  topProducts: any[];
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch("/api/admin/analytics");
      const data = await response.json();
      if (data.success) {
        setAnalytics(data.data);
      }
    } catch (error) {
      toast.error("Failed to load analytics");
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

  if (!analytics) {
    return <div>Failed to load analytics</div>;
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Analytics</h1>
        <p className="text-foreground/60 mt-2">Platform insights and metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground/60 text-sm">Total Users</p>
              <p className="text-3xl font-bold mt-2">{analytics.summary.totalUsers}</p>
              <p className="text-green-600 text-sm mt-1">+{analytics.summary.newUsers} new</p>
            </div>
            <Users className="w-10 h-10 text-blue-600 opacity-20" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground/60 text-sm">Total Orders</p>
              <p className="text-3xl font-bold mt-2">{analytics.summary.totalOrders}</p>
              <p className="text-green-600 text-sm mt-1">+{analytics.summary.newOrders} new</p>
            </div>
            <TrendingUp className="w-10 h-10 text-green-600 opacity-20" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground/60 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold mt-2">${analytics.summary.totalRevenue.toFixed(0)}</p>
            </div>
            <DollarSign className="w-10 h-10 text-amber-600 opacity-20" />
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground/60 text-sm">Total Products</p>
              <p className="text-3xl font-bold mt-2">{analytics.summary.totalProducts}</p>
            </div>
            <BarChart3 className="w-10 h-10 text-purple-600 opacity-20" />
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {analytics.recentOrders.slice(0, 5).map((order, idx) => (
              <div key={idx} className="flex items-center justify-between pb-4 border-b border-foreground/10 last:border-0">
                <div>
                  <p className="font-medium">{order.user?.name}</p>
                  <p className="text-sm text-foreground/60">{order.user?.email}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${order.total}</p>
                  <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded">
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Top Products</h2>
          <div className="space-y-4">
            {analytics.topProducts.slice(0, 5).map((product, idx) => (
              <div key={idx} className="flex items-center justify-between pb-4 border-b border-foreground/10 last:border-0">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-foreground/60">${product.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-foreground/60">{product.reviews} reviews</p>
                  <p className="font-bold text-amber-600">⭐ {product.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
