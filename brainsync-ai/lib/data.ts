export const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { name: "My Knowledge", href: "/upload", icon: "Database" },
  { name: "Chat with AI", href: "/chat", icon: "MessageSquare" },
  { name: "Knowledge Graph", href: "/graph", icon: "Share2" },
  { name: "Roadmap", href: "/roadmap", icon: "Map" },
  { name: "Tasks", href: "/tasks", icon: "CheckSquare" },
  { name: "Recommendations", href: "/recommendations", icon: "Sparkles" },
  { name: "Settings", href: "/settings", icon: "Settings" },
] as const;

export const statCards = [
  { label: "Documents", value: "12", delta: "+2 this week" },
  { label: "Tasks", value: "8", delta: "3 pending" },
  { label: "Knowledge Nodes", value: "45", delta: "+6 this week" },
  { label: "Connections", value: "128", delta: "+12 this week" },
];

export const recentUploads = [
  { name: "Python.pdf", size: "2.4 MB", date: "Today" },
  { name: "SQL_Notes.pdf", size: "1.1 MB", date: "Yesterday" },
  { name: "MachineLearning.pdf", size: "3.7 MB", date: "2 days ago" },
];

export const insights = [
  "You've made strong progress on Python this week — consider revisiting OOP concepts.",
  "SQL_Notes.pdf connects well with your Data Analysis goals.",
  "3 tasks are pending — tackle 'Practice SQL Queries' next for quick momentum.",
];

export const uploadedFiles = [
  { name: "Python.pdf", size: "2.4 MB", date: "12 Jun 2026" },
  { name: "SQL_Notes.pdf", size: "1.1 MB", date: "11 Jun 2026" },
  { name: "MachineLearning.pdf", size: "3.7 MB", date: "10 Jun 2026" },
  { name: "DataScience.pdf", size: "4.2 MB", date: "08 Jun 2026" },
];

export const keyTopics = [
  "Variables",
  "Loops",
  "Functions",
  "OOP",
  "Modules",
  "File Handling",
];

export const learningOrder = [
  "Variables & Data Types",
  "Control Flow",
  "Functions",
  "Object Oriented Programming",
];

export const graphNodes = [
  { id: "ml", label: "Machine Learning", x: 50, y: 50, central: true },
  { id: "python", label: "Python", x: 22, y: 22 },
  { id: "ds", label: "Data Science", x: 78, y: 22 },
  { id: "stats", label: "Statistics", x: 82, y: 70 },
  { id: "sql", label: "SQL", x: 50, y: 88 },
  { id: "da", label: "Data Analysis", x: 18, y: 70 },
];

export const graphEdges = [
  ["ml", "python"],
  ["ml", "ds"],
  ["ml", "stats"],
  ["ml", "sql"],
  ["ml", "da"],
  ["python", "ds"],
  ["sql", "da"],
];

export const roadmapSteps = [
  { title: "Learn Excel", duration: "2–3 Weeks", color: "#6C63FF" },
  { title: "Learn SQL", duration: "3–4 Weeks", color: "#8B5CF6" },
  { title: "Learn Python", duration: "4–6 Weeks", color: "#22C55E" },
  { title: "Learn Pandas", duration: "3–4 Weeks", color: "#F59E0B" },
  { title: "Build Dashboard Projects", duration: "4–5 Weeks", color: "#EC4899" },
  { title: "Apply for Internship / Jobs", duration: "Ongoing", color: "#06B6D4" },
];

export const tasks = [
  { title: "Learn React Hooks", priority: "High", status: "In Progress" },
  { title: "Build Portfolio Website", priority: "High", status: "Pending" },
  { title: "Practice SQL Queries", priority: "Medium", status: "Pending" },
  { title: "Complete Data Analysis Project", priority: "High", status: "Not Started" },
  { title: "Revise Machine Learning Basics", priority: "Low", status: "Completed" },
];

export const recommendations = [
  {
    tag: "Related Insight",
    text: "SQL and Python are often used together in Data Analysis projects.",
    cta: "Explore Notes",
  },
  {
    tag: "Suggested Project",
    text: "Build a Student Performance Analysis project.",
    cta: "View Ideas",
  },
  {
    tag: "Suggested Skill",
    text: "Learn Pandas to level up your Data Analysis skills.",
    cta: "Start Learning",
  },
  {
    tag: "Revision Reminder",
    text: "You haven't reviewed Machine Learning Basics in 2 weeks.",
    cta: "Review Now",
  },
];
