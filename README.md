# Adaptive Study Coach — Engineering Exam Co‑Pilot (STEM)

A **Generative UI** study assistant built for **The UI Strikes Back** hackathon. The app uses **Tambo’s React SDK** so the AI chooses the right UI components (plans, quizzes, formulas, charts, gauges, readiness cards) based on natural language.

> The UI that studies with you.  
> Make STEM feel easy — one smart session at a time.

---

## Why This Exists (Problem → Impact)
Engineering‑track (+2 MPC/CS) students often fall behind because study apps are static and slow to personalize. This project fixes that by:
- Generating **daily study plans** from a short chat
- Creating **interactive quizzes** with explanations
- Showing **progress + readiness** as real UI (not just text)
- Highlighting **weak topics** visually for faster revision

---

## What Makes It Different
- **Component-first responses**: every key request renders UI (not long text)
- **Interactive + live updates**: readiness score updates after quizzes
- **Demo-ready flow**: all major UI widgets are available from starter chips

---

## Core Features (Generative UI)
- **StudyPlan** — adaptive, day-by-day rescue plans
- **QuizCard** — interactive quizzes with explanations
- **QuizReview** — detailed answer explanations after a quiz
- **ConceptExplainer** — structured “why/how” explanations for concepts
- **FormulaCard** — formula breakdowns with variables + examples
- **LessonCard** — short lessons before practice with key points + formula
- **RoadmapTimeline** — structured learning roadmap visualization
- **MasteryMatrix** — heatmap of topic mastery across weeks
- **ProgressDashboard** — streaks, minutes studied, mastery targets
- **CompletionChart** — 30-day completion chart (auto demo data)
- **ReadinessScore** — exam readiness based on quiz performance
- **GaugeCard** — gauge chart for quick readiness or accuracy
- **WeakTopicRadar** — radar chart of topic mastery
- **TopicListCard** — clickable topic list to launch plans/quizzes
- **MistakeBank** — saved wrong answers with retry actions
- **ApplicationCards** — real-world examples shown as cards
- **Graph** — bar/line/area/pie/donut/scatter/histogram/heatmap charts for trends and splits
- **Identity Bar** — lightweight user identity stub for demos
- **Context Attachments** — one‑off notes sent with the next message
- **Voice Dictation** — mic input using Tambo Voice hook

---

## Tambo SDK Usage (Hackathon Focus)
✅ Multiple **registered generative components**
✅ **Tools** with Zod schemas (plan building, scoring, topic packs)
✅ **Interactables** (StudyPlan + ProgressDashboard + ReadinessScore)
✅ **Component-first policy** enforced in system prompt
✅ **Prebuilt Tambo UI** (Form component for intake)
✅ **Tambo State Management** (useTamboComponentState for interactables)
✅ **Context Helpers** (time/page + study profile additional context)
✅ **Lightweight identity stub** (local profile shown in UI for demos)

This directly aligns with “Best Use of Tambo” judging criteria.

---

## Tech Stack
- **Next.js + React + TypeScript**
- **Tambo React SDK**
- **Recharts** for charts
- **Tailwind CSS** for styling

---

## Setup

```bash
npm install
npx tambo init
npm run dev
```

Open: `http://localhost:3000`

---

## Demo Prompts (fast judge walkthrough)
1. **Plan**: “I have 14 days before my engineering entrance exam. Build a daily STEM study plan with quizzes.”
2. **Quiz**: “Quiz me on electromagnetism and explain wrong answers.”
3. **Formulas**: “Explain Maxwell’s equations with formulas, variables, and an example.”
4. **Progress**: “Create a progress dashboard for Physics: score 62%, target 75%, streak 4 days, 210 minutes this week, topics mastered: Vectors, Newton’s Laws.”
5. **Radar**: “Show a weak-topic radar chart for Physics with scores for Vectors, Magnetism, Induction, Waves, and Energy.”
6. **Readiness**: “Give me an exam readiness score based on my recent quiz results.”
7. **Gauge**: “Show a gauge chart for my readiness score at 72% with status ‘On track’.”
8. **Pie chart**: “Create a pie chart showing my weekly study time split: Physics 40%, Math 30%, Chemistry 20%, CS 10%.”
9. **Area chart**: “Show an area chart of my weekly accuracy trend for Physics, Math, and Chemistry over 6 weeks.”
10. **Applications**: “Show real-world applications of electromagnetic induction.”
11. **Intake**: “Create a quick intake form to capture subject, exam date, weakest topic, and daily study minutes.”
12. **Scatter**: “Show a scatter plot of my study hours vs quiz accuracy for the last 12 sessions.”
13. **Heatmap**: “Show a heatmap of topic mastery for Mechanics, Calculus, Thermodynamics, and DSA over Weeks 1-4.”
14. **Context attach**: Add “Exam in 14 days” from the Context Attachments bar, then ask for a plan.
15. **Voice**: Click the mic and speak: “Quiz me on magnetic induction.”

---

## 2-Minute Demo Script (Short)
1. Show landing → open chat
2. Click **Study Plan** chip → StudyPlan renders
3. Click **Quiz** chip → QuizCard renders
4. Ask for **Readiness Score** → ReadinessScore updates after quiz
5. Ask for **Weak Topic Radar** → Radar chart appears
6. Ask for **Real-world Applications** → ApplicationCards appear

---

## Learning & Growth
- Built custom **Generative UI components** using Tambo
- Designed **interactive study flows** with minimal prompts
- Learned to force **component-first responses** for clarity

---

## Future Enhancements
- MCP integration for real exam resources
- Topic-specific practice tracking
- Sharing progress reports for students

---

## Credits
- **Tambo SDK** for Generative UI
- **WeMakeDevs** for the hackathon opportunity

---

### Built for “The UI Strikes Back” Hackathon
May the components be with you.
