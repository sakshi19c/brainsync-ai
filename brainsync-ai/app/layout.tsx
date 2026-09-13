import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BrainSync AI — Your Personal AI Second Brain",
  description:
    "Store, connect, and recall everything. Never lose your knowledge again.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-ink antialiased">{children}</body>
    </html>
  );
}
