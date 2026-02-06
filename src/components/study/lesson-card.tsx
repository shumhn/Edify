"use client";

import { z } from "zod";

export const lessonCardSchema = z.object({
  title: z.string(),
  summary: z.string(),
  keyPoints: z.array(z.string()).min(1),
  formula: z.string().optional(),
  example: z
    .object({
      prompt: z.string(),
      solution: z.string(),
    })
    .optional(),
  nextSteps: z.array(z.string()).optional(),
});

export type LessonCardProps = z.infer<typeof lessonCardSchema>;

export function LessonCard({
  title,
  summary,
  keyPoints,
  formula,
  example,
  nextSteps,
}: LessonCardProps) {
  const safePoints = Array.isArray(keyPoints) ? keyPoints : [];
  const safeSteps = Array.isArray(nextSteps) ? nextSteps : [];

  return (
    <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-600">
            Lesson card
          </p>
          <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
          Quick concept
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-600">{summary}</p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {safePoints.map((point, index) => (
          <div
            key={`${point}-${index}`}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
          >
            {point}
          </div>
        ))}
      </div>

      {formula && (
        <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 font-mono text-base text-indigo-900">
          {formula}
        </div>
      )}

      {example && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm">
          <p className="font-semibold text-slate-900">Example</p>
          <p className="text-slate-600">{example.prompt}</p>
          <p className="mt-2 text-indigo-700">{example.solution}</p>
        </div>
      )}

      {safeSteps.length > 0 && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
          <p className="font-semibold text-slate-900">Next steps</p>
          <ul className="mt-2 space-y-1 text-slate-600">
            {safeSteps.map((step, index) => (
              <li key={`${step}-${index}`}>• {step}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
