"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Upload, Settings, Users, ScrollText, SearchCheck, Newspaper } from "lucide-react";
import { can, type Role } from "@/lib/auth/rbac";

const navGroups = [
  {
    label: "Menu Utama",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/lhu/new", label: "Buat Draft", icon: Upload },
      { href: "/lhu", label: "Data LHU", icon: FileText },
      { href: "/publish", label: "Dokumen Publish", icon: SearchCheck },
      { href: "/users", label: "Users", icon: Users, permission: "manageUsers" },
    ],
  },
  {
    label: "Manajemen Web",
    items: [
      { href: "/posts", label: "Post", icon: Newspaper, permission: "managePosts" },
      { href: "/settings", label: "Settings", icon: Settings, permission: "manageSettings" },
      { href: "/audit-logs", label: "Audit Logs", icon: ScrollText, permission: "viewAuditLogs" },
    ],
  },
];

function NavItem({
  item,
  isCollapsed,
  isActive,
}: {
  item: { href: string; label: string; icon: React.ElementType };
  isCollapsed: boolean;
  isActive: boolean;
}) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={`group relative flex items-center ${isCollapsed ? "justify-center" : "justify-between"} rounded-2xl py-3 text-sm font-bold transition-all duration-500 overflow-hidden ${
        isCollapsed ? "px-0" : "px-3 gap-3"
      } ${
        isActive
          ? "text-[#289db9] dark:text-[#5ac8e0] bg-white dark:bg-slate-800 shadow-[0_4px_20px_-4px_rgba(40,157,185,0.15)] dark:shadow-[0_4px_20px_-4px_rgba(40,157,185,0.1)] border border-[#289db9]/20 dark:border-[#289db9]/20"
          : "text-slate-500 dark:text-slate-400 hover:text-[#289db9] dark:hover:text-[#5ac8e0] hover:bg-white/80 dark:hover:bg-slate-800/80 border border-transparent shadow-none"
      }`}
      title={isCollapsed ? item.label : undefined}
    >
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#289db9] dark:bg-[#5ac8e0] rounded-r-lg shadow-[0_0_12px_rgba(40,157,185,0.6)] transition-all duration-500 animate-in fade-in slide-in-from-left-2" />
      )}
      <div className={`flex items-center relative z-10 w-full ${isCollapsed ? "justify-center pl-0" : "gap-3 pl-1"}`}>
        <div className={`p-1.5 rounded-xl transition-all duration-500 ${isActive ? "bg-[#289db9]/10 dark:bg-[#289db9]/20 shadow-sm" : "group-hover:bg-slate-100 dark:group-hover:bg-slate-700/50"}`}>
          <Icon className={`h-4 w-4 shrink-0 transition-all duration-300 ${isActive ? "scale-110 rotate-[-10deg]" : "group-hover:scale-110 group-hover:rotate-[10deg]"}`} />
        </div>
        <span className={`tracking-wide whitespace-nowrap transition-all duration-500 ${
          isCollapsed
            ? "max-w-0 opacity-0 -translate-x-2"
            : `max-w-[160px] opacity-100 ${isActive ? "translate-x-1.5" : "group-hover:translate-x-1"}`
        }`}>
          {item.label}
        </span>
      </div>
      {!isCollapsed && (
        <div className={`relative shrink-0 z-10 transition-all duration-500 ${isActive ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-4 scale-0 group-hover:opacity-100 group-hover:-translate-x-1 group-hover:scale-75"}`}>
          <div className="w-1.5 h-1.5 rounded-full bg-[#289db9]/80 dark:bg-[#5ac8e0]/80 shadow-[0_0_8px_rgba(40,157,185,0.4)]" />
        </div>
      )}
    </Link>
  );
}

export function SidebarNav({ isCollapsed = false, userRole }: { isCollapsed?: boolean; userRole: Role }) {
  const pathname = usePathname();

  const allItems = navGroups.flatMap((g) => g.items);

  function isItemActive(href: string) {
    const matchesCurrent =
      pathname === href ||
      (href !== "/dashboard" && pathname.startsWith(href + "/"));

    const isSuppressed = allItems.some(
      (other) =>
        other.href !== href &&
        other.href.length > href.length &&
        (pathname === other.href || pathname.startsWith(other.href + "/")),
    );

    return matchesCurrent && !isSuppressed;
  }

  return (
    <nav className="space-y-6 w-full mb-8">
      {navGroups.map((group) => {
        const visibleItems = group.items.filter((item) => {
          if (!item.permission) return true;
          return can(userRole, item.permission as any);
        });

        if (visibleItems.length === 0) return null;

        return (
          <div key={group.label} className="space-y-1.5">
            <div className={`text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 px-2 transition-all duration-500 whitespace-nowrap overflow-hidden ${isCollapsed ? "opacity-0 max-h-0 mb-0" : "opacity-100 max-h-10 mb-2"}`}>
              {group.label}
            </div>
            {visibleItems.map((item) => (
              <NavItem
                key={item.href}
                item={item}
                isCollapsed={isCollapsed}
                isActive={isItemActive(item.href)}
              />
            ))}
          </div>
        );
      })}
    </nav>
  );
}
