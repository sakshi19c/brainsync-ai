"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Database,
  MessageSquare,
  Share2,
  CheckSquare,
} from "lucide-react";

const items = [
  { name: "Home", href: "/dashboard", icon: LayoutDashboard },
  { name: "Knowledge", href: "/upload", icon: Database },
  { name: "Chat", href: "/chat", icon: MessageSquare },
  { name: "Graph", href: "/graph", icon: Share2 },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
];

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border flex justify-between px-2 py-2 z-20">
      {items.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl text-[11px] font-medium ${
              active ? "text-primary" : "text-gray-400"
            }`}
          >
            <Icon className="w-5 h-5" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
