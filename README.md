# Edify — Generative UI Study Coach for All Subjects

Edify is a **generative UI** study coach for learners across all subjects. Built on **Tambo’s React SDK**, Edify turns user intent into rich, interactive components — plans, quizzes, topic maps, dashboards, and charts — instead of long, static text.

**Primary goal:** make learning feel tailored in seconds, not sessions.

---

## Product Highlights
- **Generative UI first:** the assistant answers by rendering components, not paragraphs.
- **Dual modes:** *Learn & Practice* and *Exam Prep* flows with different prompts and pacing.
- **Subject tracks:** Physics, Math, Chemistry, and Computer Science each follow tailored paths.
- **Diagnostics built‑in:** pick weak topics from a visual map and start immediately.
- **Realtime progress:** dashboards, readiness scores, and mastery visuals update from interactions.

---

## Core Features
- **Topic diagnostics** with interactive selection
- **Adaptive study plans** (day‑by‑day)
- **Interactive quizzes** with review and explanations
- **Formula + concept cards** for quick revision
- **Roadmaps and mastery views** for long‑term progress
- **Real‑world application cards** to ground learning
- **Charts** (bar/line/area/pie/donut/scatter/heatmap)
- **Context notes + intake forms** to steer the next response
- **Voice input** for hands‑free prompts

---

## Generative UI Components
- `StudyPlan`
- `QuizCard` and `QuizReview`
- `TopicListCard`
- `FormulaCard` and `LessonCard`
- `RoadmapTimeline`
- `ProgressDashboard`
- `CompletionChart`
- `ReadinessScore` and `GaugeCard`
- `WeakTopicRadar`
- `ApplicationCards`
- `MasteryMatrix`
- `Graph`
- `Form`

---

## How It Works
1. **Intent captured** via chat or CTA.
2. **Tambo tools** return structured data (plans, topics, scores, charts).
3. **Registered components** render the UI the user needs — automatically.
4. **Interactables** update state based on user actions (quizzes, plans, dashboards).

---

## Tech Stack
- **Next.js 16 + React 19 + TypeScript**
- **Tambo React SDK** for generative UI + tools
- **Tailwind CSS** for styling
- **Recharts** for data visualization

---

## Project Structure
```
src/
  app/          # Next.js routes (landing, chat)
  components/   # UI and generative components
  hooks/        # UI state and Tambo helpers
  lib/          # utilities and helpers
  services/     # Tambo tools and data adapters
```

---

## Getting Started

### Prerequisites
- **Node.js 20.9+** (Next.js 16 requirement)
- **npm**

### Install
```bash
npm install
```

### Configure
Create `.env.local`:
```
NEXT_PUBLIC_TAMBO_API_KEY=your_api_key_here
```

### Initialize Tambo
```bash
npm run init
```

### Run
```bash
npm run dev
```
Open `http://localhost:3000`.

---

## Scripts
- `npm run dev` — start local dev server
- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — lint checks
- `npm run lint:fix` — auto‑fix lint issues
- `npm run init` — Tambo init

---

## Demo Prompts (Fast Walkthrough)
- “Build a 14‑day exam prep plan for Physics and Math.”
- “Quiz me on electromagnetism and explain mistakes.”
- “Show a mastery radar for Mechanics, Waves, E&M.”
- “Create a progress dashboard: score 62%, streak 4, 210 minutes this week.”
- “Generate a pie chart of study time split: 40/30/20/10.”

---

## Deployment
Edify is a standard Next.js app and can be deployed on **Vercel**, **Netlify**, or any Node server.

```bash
npm run build
npm run start
```

---

## Security & Privacy
- Store API keys in `.env.local` and **never commit** them.
- Client‑side keys are acceptable for demos; for production, consider proxying requests through a secure backend.

---

## Troubleshooting
- **Node version errors:** upgrade to Node 20.9+.
- **No UI renders:** verify `NEXT_PUBLIC_TAMBO_API_KEY` is set.
- **Charts or components missing:** ensure tools return structured data and the component is registered.

---

## Roadmap
- Exam‑specific topic packs
- Personalized pacing profiles
- Exportable progress reports

---

## Credits
- **Tambo SDK** — generative UI framework
- **The UI Strikes Back Hackathon** — inspiration and demo target

---

**Edify** — The UI that studies with you.
