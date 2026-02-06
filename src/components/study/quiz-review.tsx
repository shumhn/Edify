"use client";

import { z } from "zod";

export const quizReviewSchema = z.object({
  topic: z.string(),
  summary: z.string().optional(),
  items: z.array(
    z.object({
      id: z.string().optional(),
      question: z.string(),
      correctAnswer: z.string(),
      explanation: z.string(),
      tip: z.string().optional(),
    }),
  ),
});

export type QuizReviewProps = z.infer<typeof quizReviewSchema>;

export function QuizReview({ topic, summary, items }: QuizReviewProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Answer Review
          </p>
          <h3 className="text-2xl font-semibold text-slate-900">{topic}</h3>
          {summary && <p className="mt-1 text-sm text-slate-500">{summary}</p>}
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {items.length} explanations
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {items.map((item, index) => (
          <details
            key={item.id ?? `${item.question.slice(0, 16)}-${index}`}
            className="group rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3"
            open={index === 0}
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-3 text-sm font-semibold text-slate-900">
              <span>
                Q{index + 1}. {item.question}
              </span>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                Correct
              </span>
            </summary>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <p>
                <span className="font-semibold text-slate-800">
                  Correct answer:
                </span>{" "}
                {item.correctAnswer}
              </p>
              <p>
                <span className="font-semibold text-slate-800">
                  Explanation:
                </span>{" "}
                {item.explanation}
              </p>
              {item.tip && (
                <p className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">
                    Quick tip:
                  </span>{" "}
                  {item.tip}
                </p>
              )}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
