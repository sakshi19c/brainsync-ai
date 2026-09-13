"use client";

import { useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import { generateRoadmap } from "@/lib/api";
import { Sparkles } from "lucide-react";

export default function RoadmapPage() {

  const [goal, setGoal] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [roadmap, setRoadmap] =
    useState<any[]>([]);

  const handleGenerate =
    async () => {

      if (!goal.trim()) {
        alert(
          "Enter a goal"
        );
        return;
      }

      try {

        setLoading(true);

        const data =
          await generateRoadmap(
            goal
          );

        setRoadmap(
          data.roadmap || []
        );

      } catch (error) {

        console.error(
          error
        );

        alert(
          "Failed to generate roadmap"
        );

      } finally {

        setLoading(false);

      }

    };

  return (
    <DashboardShell title="Roadmap">

      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-6">
        Learning Roadmap
      </h1>

      <div className="bg-white border border-border rounded-2xl shadow-card p-6 mb-8">

        <label className="block text-sm font-semibold mb-2">
          What do you want to learn?
        </label>

        <div className="flex flex-col sm:flex-row gap-3">

          <input
            value={goal}
            onChange={(e) =>
              setGoal(
                e.target.value
              )
            }
            type="text"
            placeholder="e.g. Become Data Analyst"
            className="flex-1 bg-gray-50 border border-border rounded-xl px-4 py-3 text-sm"
          />

          <button
            onClick={
              handleGenerate
            }
            disabled={loading}
            className="gradient-bg text-white font-semibold px-6 py-3 rounded-xl shadow-soft flex items-center justify-center gap-2"
          >

            <Sparkles className="w-4 h-4" />

            {loading
              ? "Generating..."
              : "Generate Roadmap"}

          </button>

        </div>

      </div>

      {roadmap.length > 0 && (

        <div className="bg-white border border-border rounded-2xl shadow-card p-6 sm:p-8">

          <h2 className="font-display font-semibold text-xl mb-2">

            Roadmap:
            {" "}
            {goal}

          </h2>

          <p className="text-gray-400 text-sm mb-8">
            AI Generated Learning Path
          </p>

          <div className="relative flex flex-col gap-6">

            {roadmap.map(
              (
                step,
                index
              ) => (

                <div
                  key={index}
                  className="flex gap-4"
                >

                  <div className="w-12 h-12 rounded-full gradient-bg text-white flex items-center justify-center font-bold">

                    {index + 1}

                  </div>

                  <div className="flex-1 border rounded-xl p-4">

                    <h3 className="font-semibold">

                      {step.step}

                    </h3>

                    <p className="text-sm text-gray-500 mt-1">

                      {step.duration}

                    </p>

                    <p className="text-sm text-gray-700 mt-2">

                      {step.description}

                    </p>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      )}

    </DashboardShell>
  );
}