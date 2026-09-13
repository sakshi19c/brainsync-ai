"use client";

import { useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import { Moon, Sun, User, Bell, Shield } from "lucide-react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <DashboardShell title="Settings">
      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-6">Settings</h1>

      <div className="flex flex-col gap-6 max-w-2xl">
        {/* Profile */}
        <div className="bg-white border border-border rounded-2xl shadow-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-primary" />
            <h2 className="font-display font-semibold text-lg">Profile</h2>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-white text-xl font-semibold">
              A
            </div>
            <div>
              <p className="font-semibold">Aarav Sharma</p>
              <p className="text-sm text-gray-400">aarav.sharma@email.com</p>
            </div>
          </div>
          <button className="border border-border font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm">
            Edit Profile
          </button>
        </div>

        {/* Appearance */}
        <div className="bg-white border border-border rounded-2xl shadow-card p-6">
          <div className="flex items-center gap-2 mb-4">
            {darkMode ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-primary" />}
            <h2 className="font-display font-semibold text-lg">Appearance</h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-gray-400">Switch between light and dark themes</p>
            </div>
            <button
              onClick={() => setDarkMode((d) => !d)}
              className={`w-12 h-7 rounded-full transition-colors relative ${darkMode ? "bg-primary" : "bg-gray-200"}`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  darkMode ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white border border-border rounded-2xl shadow-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-primary" />
            <h2 className="font-display font-semibold text-lg">Notifications</h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-gray-400">Receive updates about your knowledge base</p>
            </div>
            <button
              onClick={() => setNotifications((n) => !n)}
              className={`w-12 h-7 rounded-full transition-colors relative ${notifications ? "bg-primary" : "bg-gray-200"}`}
            >
              <span
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  notifications ? "translate-x-5" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white border border-border rounded-2xl shadow-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="font-display font-semibold text-lg">Security</h2>
          </div>
          <button className="border border-border font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm">
            Change Password
          </button>
        </div>
      </div>
    </DashboardShell>
  );
}
