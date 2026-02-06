"use client";

import { useTamboThread } from "@tambo-ai/react";
import { useUserProfile } from "@/hooks/use-user-profile";

const quickPrompts = [
  {
    title: "Build a 10-day plan",
    prompt:
      "I have 10 days before my engineering entrance exam. Build a daily STEM plan with quizzes.",
  },
  {
    title: "Quiz me: projectile motion",
    prompt: "Quiz me on projectile motion and explain wrong answers.",
  },
  {
    title: "Show Newton's laws formulas",
    prompt: "Show formulas for Newton's laws with examples.",
  },
  {
    title: "CS quick quiz",
    prompt: "Quiz me on stacks and queues with explanations.",
  },
  {
    title: "Chemistry formula help",
    prompt: "Explain equilibrium constant (Kc) with formulas and an example.",
  },
  {
    title: "Math calculus drill",
    prompt: "Quiz me on differentiation and integration basics.",
  },
  {
    title: "CS algorithm quiz",
    prompt: "Quiz me on sorting algorithms and Big-O with explanations.",
  },
  {
    title: "30-day completion chart",
    prompt: "Show me a 30-day completion chart.",
  },
];

export function QuickStartPanel() {
  const { sendThreadMessage, isIdle } = useTamboThread();
  const { profile } = useUserProfile();
  const learningMode = profile.learningMode ?? "exam";

  const examPrompts = quickPrompts;
  const learnPrompts = [
    {
      title: "Learning roadmap",
      prompt: "Help me learn Data Structures from scratch with quizzes.",
    },
    {
      title: "Quick quiz",
      prompt: "Quiz me on stacks and queues with explanations.",
    },
    {
      title: "Show calculus formulas",
      prompt: "Show differentiation formulas with examples.",
    },
    {
      title: "30-day practice chart",
      prompt: "Show me a 30-day completion chart.",
    },
  ];
  const promptsToUse = learningMode === "learn" ? learnPrompts : examPrompts;

  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-600">
            Quick start
          </p>
          <h3 className="text-2xl font-semibold text-gray-900">
            Choose a fast path
          </h3>
          <p className="text-sm text-gray-500">
            Tap a prompt to generate the UI instantly.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {promptsToUse.map((item) => (
          <button
            key={item.title}
            type="button"
            onClick={() => sendThreadMessage(item.prompt)}
            disabled={!isIdle}
            className="rounded-xl border border-emerald-200 bg-emerald-50/60 px-4 py-3 text-left text-sm font-semibold text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
}
