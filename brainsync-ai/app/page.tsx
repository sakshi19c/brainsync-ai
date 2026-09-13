"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  UploadCloud,
  Sparkles,
  Share2,
  Lightbulb,
  ArrowRight,
  PlayCircle,
  Menu,
} from "lucide-react";
import { useState } from "react";
import BrainIllustration from "@/components/BrainIllustration";

const features = [
  {
    icon: UploadCloud,
    title: "Upload Anything",
    desc: "PDFs, Notes, Images, Links & More",
  },
  {
    icon: Sparkles,
    title: "AI Summaries",
    desc: "Instant summaries and insights",
  },
  {
    icon: Share2,
    title: "Knowledge Graph",
    desc: "Visualize connections between ideas",
  },
  {
    icon: Lightbulb,
    title: "Smart Recommendations",
    desc: "AI suggests what to learn next",
  },
];

const steps = [
  { title: "Upload", desc: "Drop in your notes, PDFs, links — anything you've learned." },
  { title: "Organize", desc: "BrainSync AI summarizes and connects ideas automatically." },
  { title: "Recall", desc: "Chat, explore your graph, and follow roadmaps to grow." },
];

const plans = [
  {
    name: "Starter",
    price: "Free",
    desc: "For casual learners getting started",
    features: ["50 documents", "Basic AI summaries", "Knowledge graph (limited)", "Community support"],
  },
  {
    name: "Pro",
    price: "$12/mo",
    desc: "For lifelong learners & professionals",
    features: ["Unlimited documents", "Advanced AI chat", "Full knowledge graph", "Learning roadmaps", "Priority support"],
    highlighted: true,
  },
  {
    name: "Team",
    price: "$29/mo",
    desc: "For teams building shared knowledge",
    features: ["Everything in Pro", "Shared workspaces", "Team analytics", "Admin controls"],
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-semibold text-lg">BrainSync AI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#about" className="hover:text-primary transition-colors">About</a>
          </nav>

          <div className="hidden md:block">
            <Link
              href="/dashboard"
              className="gradient-bg text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-soft hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen((o) => !o)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-border px-4 sm:px-8 py-4 flex flex-col gap-4 text-sm font-medium text-gray-600 bg-white">
            <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How It Works</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <Link
              href="/dashboard"
              className="gradient-bg text-white text-sm font-semibold px-5 py-2.5 rounded-xl text-center"
            >
              Get Started
            </Link>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-16 sm:pt-24 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            AI-Powered Knowledge Management
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Your Personal <span className="gradient-text">AI Second Brain</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-lg mb-8">
            Store, connect, and recall everything. Never lose your knowledge again.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/dashboard"
              className="gradient-bg text-white font-semibold px-6 py-3.5 rounded-xl shadow-soft hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
            <button className="flex items-center gap-2 border border-border font-semibold px-6 py-3.5 rounded-xl hover:bg-gray-50 transition-colors">
              <PlayCircle className="w-4 h-4 text-primary" /> See Demo
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <BrainIllustration />
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Everything your brain needs, in one place
          </h2>
          <p className="text-gray-500">
            BrainSync AI brings your scattered knowledge together and helps you actually use it.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-border rounded-2xl p-6 shadow-card hover:shadow-soft hover:-translate-y-1 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-gray-50/60 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-500">Three simple steps to building your second brain.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-border rounded-2xl p-6 shadow-card"
              >
                <div className="w-10 h-10 rounded-full gradient-bg text-white font-display font-semibold flex items-center justify-center mb-4">
                  {i + 1}
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-gray-500">Choose the plan that fits how you learn.</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 border shadow-card flex flex-col ${
                plan.highlighted
                  ? "border-primary bg-primary/5 shadow-soft scale-[1.02]"
                  : "border-border bg-white"
              }`}
            >
              <h3 className="font-display font-semibold text-xl mb-1">{plan.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{plan.desc}</p>
              <div className="font-display text-3xl font-bold mb-6">{plan.price}</div>
              <ul className="flex-1 flex flex-col gap-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="text-sm text-gray-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                className={`text-center font-semibold px-5 py-3 rounded-xl transition-opacity ${
                  plan.highlighted
                    ? "gradient-bg text-white shadow-soft hover:opacity-90"
                    : "border border-border hover:bg-gray-50"
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-gray-50/60 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">About BrainSync AI</h2>
          <p className="text-gray-500">
            BrainSync AI was built for curious minds who learn from everywhere — articles, courses,
            books, and conversations — but struggle to keep it all connected. We combine AI
            summarization, semantic search, and visual knowledge graphs to turn scattered notes
            into a living, searchable second brain.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-semibold text-ink">BrainSync AI</span>
          </div>
          <p>© 2026 BrainSync AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
