# Edify — The UI that studies with you

[![Built with Tambo](https://img.shields.io/badge/Built%20with-Tambo%20SDK-orange?style=flat-square)](https://tambo.co)
[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?style=flat-square)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19-blue?style=flat-square)](https://react.dev)

Edify is a **premium generative UI EdTech platform** that transforms how students learn STEM subjects. Built on **Tambo's React SDK**, it replaces static study materials with dynamic, AI-generated interfaces — quizzes, roadmaps, dashboards, and coaching tips rendered in real-time based on your learning needs.

> **Primary Goal:** Make learning feel personalized in seconds, not sessions.

---

## Demo Video

Experience Edify in action:

**[Watch the Full Demo on YouTube](https://www.youtube.com/watch?v=xtpF_Tu5I-w&t=3s)**

---

## Table of Contents

1. [Why Edify?](#why-edify)
2. [What Makes Edify Unique?](#what-makes-edify-unique)
3. [Tambo Integration Deep Dive](#tambo-integration-deep-dive)
4. [Technical Implementation](#technical-implementation)
5. [Design and UX](#design-and-ux)
6. [Learning Journey](#learning-journey)
7. [Getting Started](#getting-started)
8. [Demo Prompts](#demo-prompts)
9. [Security and Deployment](#security-and-deployment)
10. [AI Tools Disclosure](#ai-tools-disclosure)
11. [Credits](#credits)

---

## Why Edify?

### The Problem

- Traditional study apps offer static content that does not adapt to individual learners
- Students waste valuable time reviewing topics they have already mastered
- Generic study plans ignore individual learning pace and style
- Progress tracking is often non-existent or too complex to be useful

### The Solution

Edify uses **Tambo's Generative UI** to create a truly adaptive learning experience where:

- Every response is a purpose-built UI component, not just text
- Study plans adjust to your pace in real-time
- Weak topics are identified and targeted automatically
- Progress is visualized through interactive dashboards

**Target Users:** High school and university students preparing for STEM exams in Physics, Mathematics, Chemistry, and Computer Science.

---

## What Makes Edify Unique?

| Innovation | Description |
|------------|-------------|
| **Component-First Responses** | AI always renders the most appropriate UI (quiz, chart, plan) rather than plain text |
| **Dual Learning Modes** | Toggle between "Learn and Practice" and "Exam Prep" with different AI behaviors |
| **25+ Custom Generative Components** | From QuizCard to MistakeBank to MasteryMatrix — a full EdTech component library |
| **Smart Topic Diagnostics** | Interactive topic maps let you pick weak areas and start focused practice |
| **Context Notes System** | Attach one-time notes (goals, weak topics, deadlines) to personalize AI responses |
| **Voice Intelligence** | Hands-free prompts for seamless study flow |

---

## Tambo Integration Deep Dive

This section demonstrates how Edify leverages Tambo's Generative UI capabilities to solve real-world education problems.

### Registered Components (18 Generative UI Components)

Edify registers **18 custom components** with Tambo that the AI dynamically selects and renders:

| Component | Purpose |
|-----------|---------|
| QuizCard | Adaptive practice quizzes with instant feedback |
| QuizReview | Detailed answer explanations after quiz completion |
| StudyPlan | Multi-day study schedules with interactive tasks |
| RoadmapTimeline | Visual learning roadmap with staged milestones |
| LessonCard | Short lessons with key points and examples |
| FormulaCard | Formula breakdowns with variables and worked examples |
| ConceptExplainer | Deep-dive explanations for complex topics |
| ProgressDashboard | Streaks, weekly minutes, mastery targets |
| CompletionChart | 30-day study completion visualization |
| ReadinessScore | Exam readiness gauge with next steps |
| GaugeCard | Quick score indicators (0-100) |
| MasteryMatrix | Heatmap of topic mastery over weeks |
| WeakTopicRadar | Radar chart highlighting weak areas |
| MistakeBank | Track and retry missed questions |
| CoachInsight | Personalized coaching tips |
| ApplicationCards | Real-world applications of concepts |
| TopicListCard | Subject topic selection with chip buttons |
| Graph | 8 chart types (bar, line, area, pie, donut, scatter, histogram, heatmap) |

### Registered Tools (4 Custom Functions)

| Tool | Description |
|------|-------------|
| scoreQuiz | Score answers and return accuracy with incorrect question IDs |
| buildStudyPlan | Generate multi-day study plans based on subject, topics, and time |
| buildProgressSignal | Create mastery signals and coaching tips from recent performance |
| getStemTopicPack | Fetch curated topic lists for Physics, Math, Chemistry, or CS |

### How It Works

```
1. USER INTENT    → "Create a 7-day physics exam prep"
       ↓
2. TAMBO AI       → Selects tools and components
       ↓
3. TOOL CALL      → buildStudyPlan({subject: "Physics", days: 7, dailyMinutes: 60})
       ↓
4. COMPONENT      → <StudyPlan goal="..." plan={[...]} />
       ↓
5. INTERACTION    → User checks off tasks, progress saved
```

---

## Technical Implementation

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI Library | React 19 + TypeScript |
| Generative UI | Tambo React SDK v0.75.0 |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion |
| Charts | Recharts |
| Rich Text | TipTap Editor |
| Deployment | Vercel (Edge Optimized) |

### Project Architecture

```
src/
├── app/                    # Next.js routes (chat, dashboard, formulas)
│   ├── chat/page.tsx       # Main AI chat interface
│   ├── page.tsx            # Premium landing page
│   └── layout.tsx          # Root layout
├── components/
│   ├── study/              # 25 EdTech-specific components
│   │   ├── quiz-card.tsx   # Interactive quizzes
│   │   ├── study-plan.tsx  # Day-by-day plans
│   │   ├── mastery-matrix.tsx
│   │   └── ...
│   └── tambo/              # 19 Tambo framework components
│       ├── message-thread-full.tsx
│       ├── graph.tsx       # Multi-chart component
│       └── ...
├── hooks/                  # Custom React hooks
├── lib/
│   └── tambo.ts            # Component and tool registration
└── services/
    └── study-tools.ts      # Tambo tool implementations
```

### Key Metrics

| Metric | Count |
|--------|-------|
| Custom Study Components | 25 |
| Tambo UI Components | 19 |
| Tambo Tools | 4 |
| Subject Tracks | 4 |
| Chart Types | 8 |
| Learning Modes | 2 |
| Total Topic Coverage | 74 topics across 4 subjects |

---

## Design and UX

### Design Philosophy

- **Glassmorphism UI:** Frosted glass effects with subtle transparency
- **Vibrant Gradients:** Subject-specific color themes (blue for Physics, orange for Math)
- **Micro-Animations:** Framer Motion for smooth transitions and hover effects
- **Dark Mode Ready:** Slate-based color palette with high contrast
- **Mobile Responsive:** Full functionality on all screen sizes

### Landing Page Highlights

- Animated blob backgrounds with blur effects
- Parallax scrolling with scroll-linked animations
- Interactive subject cards with gradient overlays
- Premium stat cards with animated progress bars
- Bento grid feature layout

---

## Learning Journey

This project represents a significant learning experience as a first-time Tambo builder:

- First time building with Tambo's Generative UI paradigm
- Learned component-first AI response patterns
- Explored tool registration and schema validation with Zod
- Mastered TipTap editor integration for rich chat inputs
- Implemented local storage for user profiles and progress persistence
- Built 25+ reusable components from scratch

---

## Getting Started

### Prerequisites

- Node.js 20.9+
- npm or pnpm

### Quick Start

```bash
# 1. Clone and Install
npm install

# 2. Configure API Key
echo "NEXT_PUBLIC_TAMBO_API_KEY=your_api_key_here" > .env.local

# 3. Initialize Tambo
npm run init

# 4. Run Dev Server
npm run dev
```

Visit `http://localhost:3000` to start learning.

---

## Demo Prompts

Try these prompts to explore Edify's capabilities:

| Prompt | Expected Component |
|--------|-------------------|
| "Create a 10-day calculus exam prep" | StudyPlan |
| "Quiz me on thermodynamics" | QuizCard |
| "Explain quantum entanglement" | ConceptExplainer |
| "Show my physics mastery radar" | WeakTopicRadar |
| "What is the formula for kinetic energy?" | FormulaCard |
| "Review my quiz mistakes" | QuizReview + MistakeBank |
| "Show my 30-day completion chart" | CompletionChart |

---

## Security and Deployment

- **Deployment:** Optimized for Vercel with Edge function support
- **Privacy:** User profiles stored locally (localStorage), no server-side data collection
- **API Keys:** Must be kept in `.env.local` and never committed to version control

---

## AI Tools Disclosure

This project was developed with assistance from **AI tools like ChatGPT** for debugging, code suggestions, and development support. The core architecture, design, and implementation were done by myself.

---

## Credits

Designed and built for **The UI Strikes Back Hackathon** using the **Tambo SDK**.

---

**Edify** — *The UI that studies with you.*
