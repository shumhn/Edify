"use client";

import { z } from "zod";
import { useStudyStats } from "@/hooks/use-study-stats";
import { useTamboThread } from "@tambo-ai/react";

export const mistakeBankSchema = z.object({
  title: z.string().optional(),
  items: z
    .array(
      z.object({
        id: z.string(),
        topic: z.string(),
        question: z.string(),
        correctAnswer: z.string(),
        selectedAnswer: z.string(),
        timestamp: z.string(),
      }),
    )
    .optional(),
});

export type MistakeBankProps = z.infer<typeof mistakeBankSchema>;

export function MistakeBank({ title, items }: MistakeBankProps) {
  const { stats } = useStudyStats();
  const { sendThreadMessage, isIdle } = useTamboThread();
  const mistakes = Array.isArray(items) && items.length > 0 ? items : stats.mistakes;

  return (
    <div className="rounded-2xl border border-rose-100 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-rose-600">
            Mistake bank
          </p>
          <h3 className="text-2xl font-semibold text-gray-900">
            {title ?? "Review your mistakes"}
          </h3>
          <p className="text-sm text-gray-500">
            Focus on weak spots and retry with explanations.
          </p>
        </div>
        <div className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700">
          {mistakes.length} items
        </div>
      </div>

      {mistakes.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-rose-200 bg-rose-50/40 px-4 py-6 text-sm text-rose-700">
          No mistakes logged yet. Take a quiz to build your mistake bank.
        </div>
      ) : (
        <div className="mt-4 grid gap-3">
          {mistakes.slice(0, 6).map((item) => (
            <div
              key={`${item.id}-${item.timestamp}`}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
            >
              <p className="font-semibold text-slate-900">{item.question}</p>
              <p className="mt-1 text-xs text-slate-500">Topic: {item.topic}</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2 text-xs">
                <span className="rounded-lg bg-rose-50 px-3 py-2 text-rose-700">
                  Your answer: {item.selectedAnswer}
                </span>
                <span className="rounded-lg bg-emerald-50 px-3 py-2 text-emerald-700">
                  Correct: {item.correctAnswer}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={!isIdle}
          onClick={() =>
            sendThreadMessage(
              "Review my mistake bank and explain the correct answers with tips.",
            )
          }
          className="rounded-full border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-700 transition hover:border-rose-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Explain mistakes
        </button>
        <button
          type="button"
          disabled={!isIdle}
          onClick={() =>
            sendThreadMessage(
              "Create a short quiz that focuses on my recent mistakes.",
            )
          }
          className="rounded-full border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-700 transition hover:border-rose-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Retry weak topics
        </button>
      </div>
    </div>
  );
}
