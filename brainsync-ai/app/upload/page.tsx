"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import {
  uploadFile,
  getFiles,
  getSummary,
  deleteFile,
} from "@/lib/api";

import {
  UploadCloud,
  FileText,
  Trash2,
  Sparkles,
} from "lucide-react";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [files, setFiles] =
    useState<any[]>([]);

  const [summary, setSummary] =
    useState("");

  const loadFiles = async () => {
    try {
      const data = await getFiles();
      setFiles(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a PDF");
      return;
    }

    try {
      setLoading(true);

      await uploadFile(selectedFile);

      alert("File uploaded successfully");

      await loadFiles();

      setSelectedFile(null);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSummary = async (
    filename: string
  ) => {
    try {
      setLoading(true);

      const result =
        await getSummary(filename);

      setSummary(result.summary);
    } catch (error) {
      console.error(error);
      alert("Failed to generate summary");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (
    filename: string
  ) => {
    const confirmDelete =
      confirm(
        `Delete ${filename}?`
      );

    if (!confirmDelete) return;

    try {
      await deleteFile(filename);

      await loadFiles();

      alert("File deleted");
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <DashboardShell title="My Knowledge">
      <h1 className="font-display text-2xl sm:text-3xl font-bold mb-1">
        Upload Knowledge
      </h1>

      <p className="text-gray-500 mb-8">
        Add PDFs and build your
        AI Second Brain.
      </p>

      {/* Upload Box */}
      <div className="bg-white border-2 border-dashed border-border rounded-2xl p-10 text-center mb-8">

        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <UploadCloud className="w-8 h-8 text-primary" />
        </div>

        <h3 className="font-semibold text-lg mb-4">
          Upload PDF Notes
        </h3>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setSelectedFile(
              e.target.files?.[0] || null
            )
          }
          className="mb-4"
        />

        <br />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="gradient-bg text-white px-6 py-3 rounded-xl"
        >
          {loading
            ? "Processing..."
            : "Upload File"}
        </button>
      </div>

      {/* Files List */}
      <div className="bg-white border border-border rounded-2xl shadow-card p-6 mb-8">

        <h2 className="font-semibold text-lg mb-4">
          Uploaded Files
        </h2>

        {files.length === 0 ? (
          <p>No files uploaded.</p>
        ) : (
          <div className="space-y-3">

            {files.map(
              (
                file: any,
                index: number
              ) => (
                <div
                  key={index}
                  className="border rounded-xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />

                    <span>
                      {file.name}
                    </span>
                  </div>

                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        handleSummary(
                          file.name
                        )
                      }
                      className="px-4 py-2 rounded-lg bg-blue-500 text-white text-sm"
                    >
                      Summary
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          file.name
                        )
                      }
                      className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>

                  </div>
                </div>
              )
            )}

          </div>
        )}
      </div>

      {/* Summary */}
      {summary && (
        <div className="bg-white border border-border rounded-2xl shadow-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-lg">
              AI Summary
            </h2>
          </div>

          <div className="whitespace-pre-wrap text-gray-700">
            {summary}
          </div>
        </div>
      )}
    </DashboardShell>
  );
}