"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Settings,
  Users,
  BarChart3,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [expanded, setExpanded] = useState(true);

  const menuItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Products", href: "/dashboard/products", icon: Package },
    { label: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
    { label: "Profile", href: "/dashboard/profile", icon: Settings },
  ];

  const adminItems = [
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div
      className={`${
        expanded ? "w-64" : "w-20"
      } bg-background border-r border-foreground/10 h-full flex flex-col transition-all duration-300 ease-in-out`}
    >
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        {expanded && (
          <h2 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Menu
          </h2>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1 hover:bg-foreground/10 rounded transition"
        >
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              expanded ? "rotate-90" : ""
            }`}
          />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-3 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
              isActive(item.href)
                ? "bg-primary-600 text-white"
                : "hover:bg-foreground/10"
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {expanded && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        ))}

        {/* Admin Section */}
        {session?.user?.role === "ADMIN" && (
          <div className="pt-4 border-t border-foreground/10">
            {expanded && (
              <p className="px-3 py-2 text-xs font-semibold text-foreground/50 uppercase">
                Admin
              </p>
            )}
            {adminItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  isActive(item.href)
                    ? "bg-primary-600 text-white"
                    : "hover:bg-foreground/10"
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {expanded && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-foreground/10">
        <button
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-foreground/10 transition text-red-600"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {expanded && <span className="text-sm font-medium">Sign Out</span>}
        </button>
      </div>
    </div>
  );
}
