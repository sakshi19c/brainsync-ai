"use client";

import DashboardShell from "@/components/DashboardShell";
import { getDashboard } from "@/lib/api";

import {
  FileText,
  Sparkles,
  Files
} from "lucide-react";

import {
  useEffect,
  useState
} from "react";

export default function DashboardPage() {

  const [dashboard, setDashboard] =
    useState({
      documents: 0,
      status: "loading"
    });

  useEffect(() => {

    async function loadDashboard() {

      try {

        const data =
          await getDashboard();

        setDashboard(data);

      } catch (error) {

        console.error(
          error
        );

      }

    }

    loadDashboard();

  }, []);

  return (
    <DashboardShell title="Dashboard">

      <div className="mb-8">

        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-1">
          BrainSync AI Dashboard
        </h1>

        <p className="text-gray-500">
          Connected to your FastAPI backend.
        </p>

      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">

        <div className="bg-white border border-border rounded-2xl p-6 shadow-card">

          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Files className="w-5 h-5 text-primary" />
          </div>

          <p className="text-gray-500 text-sm mb-1">
            Documents
          </p>

          <p className="font-display text-3xl font-bold">
            {dashboard.documents}
          </p>

        </div>

        <div className="bg-white border border-border rounded-2xl p-6 shadow-card">

          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>

          <p className="text-gray-500 text-sm mb-1">
            Status
          </p>

          <p className="font-display text-3xl font-bold capitalize">
            {dashboard.status}
          </p>

        </div>

      </div>

      <div className="bg-white border border-border rounded-2xl p-6 shadow-card">

        <div className="flex items-center gap-3 mb-4">

          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">

            <FileText className="w-5 h-5 text-primary" />

          </div>

          <h2 className="font-display text-xl font-semibold">
            Backend Connection
          </h2>

        </div>

        <p className="text-gray-600">
          BrainSync AI backend is connected successfully.
        </p>

        <p className="text-gray-600 mt-2">
          Uploaded PDFs: {dashboard.documents}
        </p>

        <p className="text-gray-600 mt-2">
          Backend Status: {dashboard.status}
        </p>

      </div>

    </DashboardShell>
  );
}