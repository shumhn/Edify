"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTambo, useTamboThread } from "@tambo-ai/react";
import { getStemTopicPack } from "@/services/study-tools";
import { cn } from "@/lib/utils";

type SuggestionItem = {
  id: string;
  title: string;
  prompt: string;
};

const subjectPalette: Record<
  string,
  {
    quiz: string;
    formula: string;
    examples: string;
    roadmap: string;
    weakTopics: string;
  }
> = {
  Physics: {
    quiz: "Quiz me on electromagnetism and explain wrong answers.",
    formula: "Explain Maxwell's equations with formulas, variables, and an example.",
    examples: "Show real-world applications of electromagnetic induction.",
    roadmap: "Create a 4-week roadmap for Physics covering Mechanics, Waves, E&M, and Optics.",
    weakTopics: "Vectors, Magnetism, Induction, Waves, and Energy.",
  },
  Math: {
    quiz: "Quiz me on differentiation and integration basics with explanations.",
    formula: "Explain integration rules with formulas, variables, and an example.",
    examples: "Show real-world applications of calculus in engineering.",
    roadmap: "Create a 4-week Math roadmap covering Calculus, Algebra, and Probability.",
    weakTopics: "Limits, Differentiation, Integration, Vectors, and Probability.",
  },
  Chemistry: {
    quiz: "Quiz me on chemical equilibrium and Le Chatelier's principle with explanations.",
    formula: "Explain the Arrhenius equation with variables and an example.",
    examples: "Show real-world applications of chemical equilibrium.",
    roadmap: "Create a 4-week Chemistry roadmap covering Equilibrium, Thermo, and Organic basics.",
    weakTopics: "Equilibrium, Thermodynamics, Kinetics, Redox, and Solutions.",
  },
  "Computer Science": {
    quiz: "Quiz me on data structures (arrays, stacks, queues) with explanations.",
    formula: "Explain Big-O time complexity with a worked example.",
    examples: "Show real-world applications of algorithms and data structures.",
    roadmap: "Create a 4-week CS roadmap covering DSA, OS, DBMS, and Networks.",
    weakTopics: "DSA, OOP, DBMS, OS, and Networks.",
  },
};

export function SmartSuggestions({
  subject,
  mode,
  className,
  maxVisible = 8,
}: {
  subject: string;
  mode: "exam" | "learn";
  className?: string;
  maxVisible?: number;
}) {
  const { sendThreadMessage, isIdle } = useTamboThread();
  const subjectSpec = subjectPalette[subject] ?? subjectPalette.Physics;
  const [topicPack, setTopicPack] = useState<string[]>([]);
  const { thread } = useTambo();
  const [view, setView] = useState<"ui" | "topics">("ui");
  const [pageIndex, setPageIndex] = useState(0);
  const [focusKey, setFocusKey] = useState<string | null>(null);
  const lastUserMessageRef = useRef<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    void getStemTopicPack({
      subject: subject as "Physics" | "Math" | "Chemistry" | "Computer Science",
    }).then((pack) => {
      if (isMounted) {
        setTopicPack(pack.topics ?? []);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [subject]);

  const planPrompt =
    mode === "exam"
      ? `I have 14 days before my ${subject} exam. Build a daily study plan with quizzes.`
      : `I want to learn ${subject} with 4 sessions per week. Build a learning plan and include a short quiz.`;

  const uiShowcase = useMemo<SuggestionItem[]>(
    () => [
      {
        id: "ui-plan",
        title: "Study plan",
        prompt: planPrompt,
      },
      {
        id: "ui-roadmap",
        title: "Learning roadmap",
        prompt: subjectSpec.roadmap,
      },
      {
        id: "ui-lesson",
        title: "Lesson card",
        prompt: `Teach me a short lesson on a ${subject} concept and include an example.`,
      },
      {
        id: "ui-quiz",
        title: "Quick quiz",
        prompt: subjectSpec.quiz,
      },
      {
        id: "ui-review",
        title: "Explain answers",
        prompt:
          "I got questions 1 and 3 wrong in my quiz. Explain the answers in detail.",
      },
      {
        id: "ui-formula",
        title: "Formula card",
        prompt: subjectSpec.formula,
      },
      {
        id: "ui-concept",
        title: "Concept explainer",
        prompt: `Explain a tricky ${subject} concept with a clear conceptual breakdown.`,
      },
      {
        id: "ui-progress",
        title: "Progress dashboard",
        prompt:
          "Create a progress dashboard: score 62%, target 75%, streak 4 days, 210 minutes this week.",
      },
      {
        id: "ui-completion",
        title: "Completion chart",
        prompt: "Show a 30-day completion chart for my practice sessions.",
      },
      {
        id: "ui-examples",
        title: "Real-world examples",
        prompt: subjectSpec.examples,
      },
      {
        id: "ui-insight",
        title: "Coach insight",
        prompt:
          "My recent accuracy is 72%, streak 4 days, 210 minutes this week. Give me a coaching insight.",
      },
      {
        id: "ui-readiness",
        title: "Readiness score",
        prompt: "Give me a readiness score based on my recent quiz results.",
      },
      {
        id: "ui-radar",
        title: "Weak-topic radar",
        prompt: `Show a weak-topic radar chart for ${subject} with scores for ${subjectSpec.weakTopics}`,
      },
      {
        id: "ui-mastery",
        title: "Mastery matrix",
        prompt: `Show a mastery heatmap for ${subject} topics across Weeks 1-4.`,
      },
      {
        id: "ui-mistakes",
        title: "Mistake bank",
        prompt: "Show my mistake bank and suggest a retry quiz.",
      },
      {
        id: "ui-intake",
        title: "Intake form",
        prompt:
          "Create a quick intake form to capture subject, goal, weakest topic, and weekly study time.",
      },
      {
        id: "ui-pie",
        title: "Pie chart",
        prompt:
          "Create a pie chart showing my weekly study time split: Physics 40%, Math 30%, Chemistry 20%, Computer Science 10%.",
      },
      {
        id: "ui-area",
        title: "Area chart",
        prompt:
          "Show an area chart of my weekly accuracy trend for Physics, Math, and Chemistry over 6 weeks.",
      },
      {
        id: "ui-line",
        title: "Line chart",
        prompt: "Show a line chart of my quiz accuracy over 10 sessions.",
      },
      {
        id: "ui-scatter",
        title: "Scatter plot",
        prompt:
          "Show a scatter plot of my study hours vs quiz accuracy for the last 12 sessions.",
      },
      {
        id: "ui-hist",
        title: "Histogram",
        prompt: "Show a histogram of my last 12 quiz scores (0-100).",
      },
      {
        id: "ui-donut",
        title: "Donut chart",
        prompt:
          "Create a donut chart of my revision focus split: Mechanics 35%, Calculus 25%, Thermodynamics 20%, DSA 20%.",
      },
      {
        id: "ui-heatmap",
        title: "Heatmap",
        prompt:
          "Show a heatmap of topic mastery across 4 weeks for Mechanics, Calculus, Thermodynamics, and DSA.",
      },
    ],
    [subject, subjectSpec, planPrompt],
  );

  const topicSuggestions = useMemo<SuggestionItem[]>(() => {
    if (!topicPack.length) return [];
    return topicPack.slice(0, 4).map((topic) => ({
      id: `topic-${topic}`,
      title: topic,
      prompt:
        mode === "exam"
          ? `My weakest topic is ${topic} in ${subject}. Create a ${subject} study plan and include a short quiz.`
          : `I want to learn ${topic} in ${subject}. Create a learning roadmap with practice and a short quiz.`,
    }));
  }, [topicPack, subject, mode]);

  const actionGroups: Record<string, string[]> = {
    quiz: ["ui-review", "ui-mistakes", "ui-radar", "ui-readiness", "ui-progress", "ui-roadmap"],
    formula: ["ui-lesson", "ui-concept", "ui-quiz", "ui-examples"],
    roadmap: ["ui-progress", "ui-completion", "ui-quiz", "ui-readiness"],
    progress: ["ui-insight", "ui-readiness", "ui-completion", "ui-radar"],
    chart: ["ui-pie", "ui-area", "ui-line", "ui-scatter", "ui-hist", "ui-donut", "ui-heatmap"],
    examples: ["ui-quiz", "ui-formula", "ui-concept"],
    lesson: ["ui-quiz", "ui-formula", "ui-examples"],
    review: ["ui-mistakes", "ui-radar", "ui-readiness"],
  };

  const focusSuggestions = useMemo(() => {
    if (!focusKey) return [];
    const ids = actionGroups[focusKey] ?? [];
    const lookup = new Map(uiShowcase.map((item) => [item.id, item]));
    return ids.map((id) => lookup.get(id)).filter(Boolean) as SuggestionItem[];
  }, [focusKey, uiShowcase]);

  const allSuggestions =
    view === "topics"
      ? topicSuggestions
      : focusSuggestions.length > 0
        ? focusSuggestions
        : uiShowcase;
  const maxPage = Math.max(1, Math.ceil(allSuggestions.length / maxVisible));
  const pageStart = (pageIndex % maxPage) * maxVisible;
  const visible = allSuggestions.slice(pageStart, pageStart + maxVisible);

  const handleClick = (item: SuggestionItem) => {
    if (!isIdle) return;
    sendThreadMessage(item.prompt);
    const key = detectFocusKey(item.prompt);
    if (key) {
      setFocusKey(key);
      setPageIndex(0);
    }
  };

  const subtitle =
    mode === "exam"
      ? `${subject} exam prep`
      : `${subject} learn & practice`;

  useEffect(() => {
    if (!thread?.messages?.length || view !== "ui") return;
    const lastUser = [...thread.messages].reverse().find((msg) => msg.role === "user");
    if (!lastUser || !lastUser.content) return;
    if (lastUser.id === lastUserMessageRef.current) return;
    lastUserMessageRef.current = lastUser.id;

    const contentText =
      typeof lastUser.content === "string"
        ? lastUser.content
        : Array.isArray(lastUser.content)
          ? lastUser.content
              .map((item: any) => (item?.type === "text" ? item.text : ""))
              .join(" ")
          : "";

    const key = detectFocusKey(contentText);
    if (key) {
      setFocusKey(key);
      setPageIndex(0);
    }
  }, [thread?.messages?.length, view]);

  return (
    <div className={cn("px-4 pb-2", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-400">
        <span>Suggested actions</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setView("ui");
              setPageIndex(0);
              setFocusKey(null);
            }}
            className={cn(
              "rounded-full border px-2 py-1 text-[10px] font-semibold tracking-widest",
              view === "ui"
                ? "border-slate-900 text-slate-900"
                : "border-slate-200 text-slate-400",
            )}
          >
            UI demos
          </button>
          <button
            type="button"
            onClick={() => {
              setView("topics");
              setPageIndex(0);
              setFocusKey(null);
            }}
            className={cn(
              "rounded-full border px-2 py-1 text-[10px] font-semibold tracking-widest",
              view === "topics"
                ? "border-slate-900 text-slate-900"
                : "border-slate-200 text-slate-400",
            )}
          >
            Topics
          </button>
          {focusKey && view === "ui" && (
            <button
              type="button"
              onClick={() => setFocusKey(null)}
              className="rounded-full border border-slate-200 px-2 py-1 text-[10px] font-semibold tracking-widest text-slate-400"
            >
              Reset
            </button>
          )}
          <span className="font-semibold">{subtitle}</span>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {visible.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleClick(item)}
            disabled={!isIdle}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm border border-slate-200 text-slate-700 hover:border-slate-300 hover:text-slate-900 disabled:opacity-60"
          >
            {item.title}
          </button>
        ))}
        {allSuggestions.length > maxVisible && (
          <button
            type="button"
            onClick={() => setPageIndex((prev) => prev + 1)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900"
          >
            More →
          </button>
        )}
      </div>
    </div>
  );
}

function detectFocusKey(text: string) {
  const lower = text.toLowerCase();
  if (lower.includes("quiz")) return "quiz";
  if (lower.includes("formula")) return "formula";
  if (lower.includes("roadmap") || lower.includes("plan")) return "roadmap";
  if (lower.includes("progress") || lower.includes("dashboard")) return "progress";
  if (lower.includes("chart") || lower.includes("graph") || lower.includes("histogram") || lower.includes("scatter") || lower.includes("pie") || lower.includes("donut")) return "chart";
  if (lower.includes("example") || lower.includes("application")) return "examples";
  if (lower.includes("lesson")) return "lesson";
  if (lower.includes("review") || lower.includes("explain answers") || lower.includes("mistake")) return "review";
  return null;
}
