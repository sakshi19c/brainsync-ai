"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import {
  generateGraph,
  getFiles,
} from "@/lib/api";

import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

export default function GraphPage() {
  const [files, setFiles] =
    useState<any[]>([]);

  const [selectedFile, setSelectedFile] =
    useState("");

  const [graphData, setGraphData] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const data =
        await getFiles();

      setFiles(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGenerateGraph =
    async () => {
      if (!selectedFile) {
        alert(
          "Please select a PDF"
        );
        return;
      }

      try {
        setLoading(true);

        const data =
          await generateGraph(
            selectedFile
          );

        console.log(data);

        if (data.error) {
          alert(data.error);
          return;
        }

        setGraphData(data);
      } catch (error) {
        console.error(error);

        alert(
          "Failed to generate graph"
        );
      } finally {
        setLoading(false);
      }
    };

  const flowNodes =
    graphData?.nodes
      ?.slice(0, 30)
      .map(
        (
          node: any,
          index: number
        ) => ({
          id: node.id,

          data: {
            label: node.id,
          },

          position: {
            x:
              (index % 5) *
              250,

            y:
              Math.floor(
                index / 5
              ) * 150,
          },

          style: {
            background:
              index === 0
                ? "#8B5CF6"
                : index < 10
                ? "#3B82F6"
                : "#10B981",

            color: "#fff",
            border: "none",
            borderRadius: "12px",
            padding: "10px",
            fontWeight: "600",
            minWidth: "140px",
            textAlign:
              "center",
          },
        })
      ) || [];

  const flowEdges =
    graphData?.edges
      ?.slice(0, 50)
      .map(
        (
          edge: any,
          index: number
        ) => ({
          id: `e-${index}`,

          source:
            edge.source,

          target:
            edge.target,

          animated: true,
        })
      ) || [];

  return (
    <DashboardShell title="Knowledge Graph">
      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-6">
        Knowledge Graph
      </h1>

      {/* Generate Graph */}
      <div className="bg-white border border-border rounded-2xl p-6 shadow-card mb-6">
        <h2 className="font-semibold text-lg mb-4">
          Generate Graph From PDF
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={
              selectedFile
            }
            onChange={(e) =>
              setSelectedFile(
                e.target.value
              )
            }
            className="border border-border rounded-xl px-4 py-3 flex-1"
          >
            <option value="">
              Select PDF
            </option>

            {files.map(
              (
                file: any,
                index: number
              ) => (
                <option
                  key={index}
                  value={
                    file.name
                  }
                >
                  {file.name}
                </option>
              )
            )}
          </select>

          <button
            onClick={
              handleGenerateGraph
            }
            disabled={
              loading
            }
            className="gradient-bg text-white px-6 py-3 rounded-xl"
          >
            {loading
              ? "Generating..."
              : "Generate Graph"}
          </button>
        </div>
      </div>

      {/* Graph Area */}
      <div className="bg-white border border-border rounded-2xl shadow-card p-4">
        {!graphData ? (
          <div className="h-[700px] flex items-center justify-center text-gray-500">
            Generate a graph from a PDF
          </div>
        ) : (
          <div className="h-[700px]">
            <ReactFlow
              nodes={
                flowNodes
              }
              edges={
                flowEdges
              }
              fitView
            >
              <MiniMap />

              <Controls />

              <Background
                variant={
                  BackgroundVariant.Dots
                }
                gap={20}
                size={1}
              />
            </ReactFlow>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}