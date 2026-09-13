"use client";

import { useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import { generateTasks } from "@/lib/api";
import { Plus } from "lucide-react";

export default function TasksPage() {

  const [goal, setGoal] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [tasks, setTasks] =
    useState<any[]>([]);

  const generateTaskPlan =
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
          await generateTasks(
            goal
          );

        setTasks(
          data.tasks || []
        );

      } catch (error) {

        console.error(error);

        alert(
          "Failed to generate tasks"
        );

      } finally {

        setLoading(false);

      }

    };

  const priorityStyles: Record<
    string,
    string
  > = {
    High:
      "bg-red-50 text-red-500",
    Medium:
      "bg-amber-50 text-amber-500",
    Low:
      "bg-green-50 text-green-600",
  };

  return (
    <DashboardShell title="Tasks">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

        <h1 className="font-display text-2xl sm:text-3xl font-bold">
          Action Center
        </h1>

      </div>

      <div className="bg-white border border-border rounded-2xl shadow-card p-6 mb-8">

        <label className="block text-sm font-semibold mb-2">
          Career Goal
        </label>

        <div className="flex gap-3">

          <input
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
              generateTaskPlan
            }
            disabled={loading}
            className="gradient-bg text-white px-6 py-3 rounded-xl flex items-center gap-2"
          >

            <Plus className="w-4 h-4" />

            {loading
              ? "Generating..."
              : "Generate Tasks"}

          </button>

        </div>

      </div>

      <div className="flex flex-col gap-3">

        {tasks.map(
          (
            task,
            index
          ) => (

            <div
              key={index}
              className="bg-white border border-border rounded-2xl shadow-card p-5 flex flex-col gap-3"
            >

              <div className="flex items-center justify-between">

                <span className="font-medium">
                  {task.task}
                </span>

                <span
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                    priorityStyles[
                      task.priority
                    ]
                  }`}
                >
                  {task.priority}
                </span>

              </div>

              <div className="text-sm text-gray-500">

                Estimated Time:
                {" "}
                {task.estimated_time}

              </div>

            </div>

          )
        )}

      </div>

    </DashboardShell>
  );
}