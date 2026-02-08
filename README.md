# Edify — The UI that studies with you

Edify is a **premium generative UI EdTech platform** designed for the modern learner. Built on **Tambo’s React SDK**, Edify transforms static study materials into a dynamic, interactive experience. Instead of scrolling through walls of text, Edify renders custom plans, adaptive quizzes, topic maps, and real-time dashboards tailored to your specific needs.

**Primary Goal:** Make learning feel personalized in seconds, not sessions.

---

## Product Highlights
- **Generative UI First:** Responses are built from interactive components, not just text.
- **Dual Learning Paths:**
  - **Learn & Practice:** Focus on concept mastery and foundational knowledge.
  - **Exam Prep:** High-intensity pacing with countdowns and readiness tracking.
- **Subject-Specific Tracks:** Deep integration for Physics, Math, Chemistry, and Computer Science.
- **Visual Diagnostics:** Identify and attack weak topics using interactive maps and radar charts.
- **Real-time Feedback:** Your progress, streaks, and mastery update instantly as you interact.

---

## Demo Video
Experience Edify in action: [Watch on YouTube](https://www.youtube.com/watch?v=xtpF_Tu5I-w&t=3s)

---

## Core Features
- **Adaptive Study Plans:** Day-by-day schedules that adjust to your pace.
- **Interactive Quizzes:** Practice with instant feedback, explanations, and review modes.
- **Topic Diagnostics:** Smart selection of topics based on your level.
- **Formula & Lesson Cards:** Quick revision tools with worked examples.
- **Roadmaps & Mastery View:** Visualize your long-term learning journey.
- **Mistake Bank:** Track and retry questions you've missed to ensure mastery.
- **Voice Intelligence:** Hands-free prompts for a seamless study flow.
- **Data Visualization:** Rich charts (Bar, Line, Area, Pie, Radar, Heatmap) for progress tracking.

---

## Generative UI Components
Edify uses a library of custom Tambo components to render the perfect UI for every interaction:

- `StudyPlan` & `RoadmapTimeline`
- `QuizCard` & `QuizReview`
- `ConceptExplainer` & `LessonCard`
- `FormulaCard` & `MistakeBank`
- `ProgressDashboard` & `ReadinessScore`
- `WeakTopicRadar` & `MasteryMatrix`
- `CompletionChart` & `GaugeCard`
- `ApplicationCards` & `CoachInsight`
- `Graph` & `Form`

---

## How It Works
1. **Intent Capture:** Share your goal via chat, voice, or interactive CTA.
2. **AI Reasoning:** The Edify agent processes your intent and determines the best tools to use.
3. **Structured Data:** Tambo tools (e.g., `buildStudyPlan`, `scoreQuiz`) return precise data.
4. **Dynamic Rendering:** Edify automatically selects and renders the matching component.
5. **Stateful Interaction:** Components update in real-time based on your actions, saving progress to your profile.

---

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **UI Architecture:** React 19 + TypeScript
- **Generative UI:** [Tambo React SDK](https://tambo.co/docs)
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Charts:** Recharts

---

## Project Structure
```text
src/
  ├── app/          # Next.js routes and layouts
  ├── components/   # UI and Generative components
  ├── hooks/        # Custom hooks for state and profiles
  ├── lib/          # Tambo configuration and utilities
  ├── services/     # Tambo tool implementations
  └── types/        # TypeScript definitions
```

---

## Getting Started

### Prerequisites
- **Node.js 20.9+**
- **npm** or **pnpm**

### Quick Start
1. **Clone & Install:**
   ```bash
   npm install
   ```
2. **Configure:** Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_TAMBO_API_KEY=your_api_key_here
   ```
3. **Initialize:**
   ```bash
   npm run init
   ```
4. **Dev Mode:**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` to start studying.

---

## Demo Prompts
- *"Create a 10-day intensive exam prep for Calculus."*
- *"Quiz me on organic chemistry and explain where I go wrong."*
- *"Show me my mastery radar for Computer Science topics."*
- *"Explain the concept of quantum entanglement with a real-world example."*

---

## Security & Deployment
- **Deployment:** Optimized for **Vercel** with full support for Edge functions.
- **Privacy:** User profiles are stored locally; API keys should always be kept in `.env.local`.

---

## Credits
Designed for **The UI Strikes Back Hackathon** using the **Tambo SDK**.

**Edify** — *The UI that studies with you.*
