"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Database,
  MessageSquare,
  Share2,
  Map,
  CheckSquare,
  Sparkles,
  Settings,
  Brain,
} from "lucide-react";
import { navItems } from "@/lib/data";

const iconMap = {
  LayoutDashboard,
  Database,
  MessageSquare,
  Share2,
  Map,
  CheckSquare,
  Sparkles,
  Settings,
};

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 border-r border-border bg-white px-4 py-6">
      <Link href="/" className="flex items-center gap-2 px-2 mb-8">
        <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        <span className="font-display font-semibold text-lg">BrainSync AI</span>
      </Link>

      <nav className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-gray-500 hover:bg-gray-50 hover:text-ink"
              }`}
            >
              <Icon className="w-[18px] h-[18px]" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/settings"
        className="flex items-center gap-3 px-3 py-3 rounded-xl border border-border hover:bg-gray-50 transition-colors"
      >
        <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-semibold">
          A
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-ink">Aarav Sharma</span>
          <span className="text-xs text-gray-400">Pro Plan</span>
        </div>
      </Link>
    </aside>
  );
}
