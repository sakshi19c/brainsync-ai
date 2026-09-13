"use client";

import DashboardShell from "@/components/DashboardShell";
import { getFiles, getSummary } from "@/lib/api";
import { useEffect, useState } from "react";

import {
  FileText,
  RotateCcw,
  BookmarkCheck
} from "lucide-react";

export default function SummaryPage() {

  const [files, setFiles] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] =
    useState("");

  const [summary, setSummary] =
    useState("Loading...");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    async function loadFiles() {

      try {

        const data =
          await getFiles();

        setFiles(data);

        if (
          data.length > 0
        ) {

          setSelectedFile(
            data[0].name
          );

        }

      } catch (error) {

        console.error(error);

      }

    }

    loadFiles();

  }, []);

  useEffect(() => {

    if (!selectedFile)
      return;

    loadSummary();

  }, [selectedFile]);

  async function loadSummary() {

    try {

      setLoading(true);

      const data =
        await getSummary(
          selectedFile
        );

      setSummary(
        data.summary
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  return (
    <DashboardShell title="AI Summary">

      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-6">
        AI Generated Summary
      </h1>

      <div className="bg-white border border-border rounded-2xl p-5 shadow-card mb-6">

        <label className="block text-sm font-medium mb-2">
          Select PDF
        </label>

        <select
          value={selectedFile}
          onChange={(e) =>
            setSelectedFile(
              e.target.value
            )
          }
          className="w-full border rounded-xl p-3"
        >

          {files.map((file) => (

            <option
              key={file.name}
              value={file.name}
            >
              {file.name}
            </option>

          ))}

        </select>

      </div>

      <div className="bg-white border border-border rounded-2xl p-6 shadow-card">

        <div className="flex items-center gap-3 mb-4">

          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">

            <FileText className="w-6 h-6 text-primary" />

          </div>

          <div>

            <h3 className="font-display font-semibold text-lg">
              {selectedFile}
            </h3>

            <p className="text-sm text-gray-400">
              AI Summary
            </p>

          </div>

        </div>

        {loading ? (

          <p>
            Generating summary...
          </p>

        ) : (

          <div className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
            {summary}
          </div>

        )}

      </div>

      <div className="flex gap-4 mt-6">

        <button
          onClick={loadSummary}
          className="flex items-center gap-2 border border-border font-semibold px-6 py-3 rounded-xl hover:bg-gray-50"
        >

          <RotateCcw className="w-4 h-4" />

          Regenerate

        </button>

        <button
          className="flex items-center gap-2 gradient-bg text-white font-semibold px-6 py-3 rounded-xl"
        >

          <BookmarkCheck className="w-4 h-4" />

          Save Summary

        </button>

      </div>

    </DashboardShell>
  );
}