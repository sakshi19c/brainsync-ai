"use client";

import { Search, Bell } from "lucide-react";

export default function TopNav({ title }: { title?: string }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-white/80 backdrop-blur-md border-b border-border px-4 sm:px-8 py-4">
      <div className="hidden sm:flex items-center gap-2 flex-1 max-w-md bg-gray-50 border border-border rounded-xl px-3 py-2.5">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search your knowledge..."
          className="bg-transparent outline-none text-sm w-full placeholder:text-gray-400"
        />
      </div>
      {title && (
        <h1 className="sm:hidden font-display font-semibold text-lg">{title}</h1>
      )}
      <div className="flex items-center gap-3 ml-auto">
        <button className="relative w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-gray-50 transition-colors">
          <Bell className="w-[18px] h-[18px] text-gray-500" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
        </button>
        <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-semibold">
          A
        </div>
      </div>
    </header>
  );
}
