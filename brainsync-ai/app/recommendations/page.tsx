"use client";

import { useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import { getRecommendations } from "@/lib/api";

import {
  Lightbulb,
  FolderKanban,
  GraduationCap,
  Clock,
} from "lucide-react";

const icons = [
  Lightbulb,
  FolderKanban,
  GraduationCap,
  Clock,
];

export default function RecommendationsPage() {

  const [goal, setGoal] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [data, setData] =
    useState<any>(null);

  const handleGenerate =
    async () => {

      if (!goal.trim()) {
        alert(
          "Enter a career goal"
        );
        return;
      }

      try {

        setLoading(true);

        const result =
          await getRecommendations(
            goal
          );

        setData(result);

      } catch (error) {

        console.error(error);

        alert(
          "Failed to generate recommendations"
        );

      } finally {

        setLoading(false);

      }

    };

  return (
    <DashboardShell title="Recommendations">

      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-6">
        Smart Recommendations
      </h1>

      <div className="bg-white border border-border rounded-2xl shadow-card p-6 mb-8">

        <label className="block text-sm font-semibold mb-2">
          Career Goal
        </label>

        <div className="flex gap-3">

          <input
            type="text"
            value={goal}
            onChange={(e) =>
              setGoal(
                e.target.value
              )
            }
            placeholder="Become Data Analyst"
            className="flex-1 border rounded-xl px-4 py-3"
          />

          <button
            onClick={
              handleGenerate
            }
            disabled={loading}
            className="gradient-bg text-white px-6 py-3 rounded-xl"
          >

            {loading
              ? "Generating..."
              : "Generate"}

          </button>

        </div>

      </div>

      {data && (

        <div className="grid sm:grid-cols-2 gap-6">

          <div className="bg-white border border-border rounded-2xl shadow-card p-6">

            <div className="flex items-center gap-3 mb-4">

              <Lightbulb className="w-6 h-6 text-primary" />

              <h2 className="font-semibold">
                Skills
              </h2>

            </div>

            <ul className="space-y-2">

              {data.skills?.map(
                (
                  item: string,
                  index: number
                ) => (
                  <li key={index}>
                    • {item}
                  </li>
                )
              )}

            </ul>

          </div>

          <div className="bg-white border border-border rounded-2xl shadow-card p-6">

            <div className="flex items-center gap-3 mb-4">

              <FolderKanban className="w-6 h-6 text-primary" />

              <h2 className="font-semibold">
                Projects
              </h2>

            </div>

            <ul className="space-y-2">

              {data.projects?.map(
                (
                  item: string,
                  index: number
                ) => (
                  <li key={index}>
                    • {item}
                  </li>
                )
              )}

            </ul>

          </div>

          <div className="bg-white border border-border rounded-2xl shadow-card p-6">

            <div className="flex items-center gap-3 mb-4">

              <GraduationCap className="w-6 h-6 text-primary" />

              <h2 className="font-semibold">
                Courses
              </h2>

            </div>

            <ul className="space-y-2">

              {data.courses?.map(
                (
                  item: string,
                  index: number
                ) => (
                  <li key={index}>
                    • {item}
                  </li>
                )
              )}

            </ul>

          </div>

          <div className="bg-white border border-border rounded-2xl shadow-card p-6">

            <div className="flex items-center gap-3 mb-4">

              <Clock className="w-6 h-6 text-primary" />

              <h2 className="font-semibold">
                Books
              </h2>

            </div>

            <ul className="space-y-2">

              {data.books?.map(
                (
                  item: string,
                  index: number
                ) => (
                  <li key={index}>
                    • {item}
                  </li>
                )
              )}

            </ul>

          </div>

        </div>

      )}

    </DashboardShell>
  );
}