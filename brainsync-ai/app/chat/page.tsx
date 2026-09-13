"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import {
  askQuestion,
  getFiles,
} from "@/lib/api";

import {
  Send,
  Brain,
} from "lucide-react";

export default function ChatPage() {
  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [files, setFiles] =
    useState<any[]>([]);

  const [
    selectedFile,
    setSelectedFile,
  ] = useState("");

  const [messages, setMessages] =
    useState<any[]>([]);

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

  const handleAsk = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!selectedFile) {
      alert(
        "Please select a PDF first"
      );
      return;
    }

    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        type: "user",
        text: userMessage,
      },
    ]);

    setInput("");

    try {
      setLoading(true);

      const result =
        await askQuestion(
          userMessage,
          selectedFile
        );

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: result.answer,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: "Failed to get response.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardShell title="Chat with AI">

      <div className="flex flex-col h-[calc(100vh-7.5rem)] lg:h-[calc(100vh-6.5rem)] bg-white border border-border rounded-2xl shadow-card overflow-hidden">

        <div className="border-b border-border px-6 py-4">
          <h1 className="font-display font-semibold text-lg">
            Chat with Your Notes
          </h1>

          <p className="text-sm text-gray-400">
            Ask questions from a selected PDF.
          </p>
        </div>

        <div className="p-4 border-b">
          <select
            value={selectedFile}
            onChange={(e) =>
              setSelectedFile(
                e.target.value
              )
            }
            className="w-full border rounded-xl p-3"
          >
            <option value="">
              Select a PDF
            </option>

            {files.map(
              (
                file: any,
                index: number
              ) => (
                <option
                  key={index}
                  value={file.name}
                >
                  {file.name}
                </option>
              )
            )}
          </select>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-4">

          {messages.map(
            (
              message,
              index
            ) =>

              message.type ===
              "user" ? (
                <div
                  key={index}
                  className="flex justify-end"
                >
                  <div className="max-w-[80%] sm:max-w-md bg-primary text-white rounded-2xl rounded-tr-sm px-5 py-3 text-sm">
                    {message.text}
                  </div>
                </div>
              ) : (
                <div
                  key={index}
                  className="flex gap-3"
                >
                  <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shrink-0">
                    <Brain className="w-4 h-4 text-white" />
                  </div>

                  <div className="max-w-[85%] sm:max-w-2xl bg-gray-50 border border-border rounded-2xl rounded-tl-sm px-5 py-4 text-sm text-gray-700 whitespace-pre-wrap">
                    {message.text}
                  </div>
                </div>
              )
          )}

          {loading && (
            <div className="text-gray-500 text-sm">
              Thinking...
            </div>
          )}

        </div>

        <form
          onSubmit={handleAsk}
          className="border-t border-border p-4 flex items-center gap-3"
        >

          <input
            value={input}
            onChange={(e) =>
              setInput(
                e.target.value
              )
            }
            type="text"
            placeholder="Ask anything from this PDF..."
            className="flex-1 bg-gray-50 border border-border rounded-xl px-4 py-3 text-sm outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="gradient-bg text-white w-12 h-12 rounded-xl flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>

        </form>

      </div>

    </DashboardShell>
  );
}