"use client";

import { z } from "zod";

export const coachInsightSchema = z.object({
  masteryLevel: z.enum(["starter", "steady", "accelerating", "exam-ready"]),
  nextTarget: z.string(),
  coachingTip: z.string(),
  focusTopic: z.string().optional(),
});

export type CoachInsightProps = z.infer<typeof coachInsightSchema>;

const masteryCopy: Record<CoachInsightProps["masteryLevel"], string> = {
  starter: "Foundation mode",
  steady: "Building momentum",
  accelerating: "Acceleration zone",
  "exam-ready": "Exam ready",
};

const masteryColor: Record<CoachInsightProps["masteryLevel"], string> = {
  starter: "bg-rose-100 text-rose-700",
  steady: "bg-amber-100 text-amber-700",
  accelerating: "bg-emerald-100 text-emerald-700",
  "exam-ready": "bg-sky-100 text-sky-700",
};

export function CoachInsight({
  masteryLevel,
  nextTarget,
  coachingTip,
  focusTopic,
}: CoachInsightProps) {
  return (
    <div className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-600">
            Coach Insight
          </p>
          <h3 className="text-2xl font-semibold text-gray-900">
            {focusTopic ? `Physics · ${focusTopic}` : "Physics momentum"}
          </h3>
          <p className="text-sm text-gray-500">
            Personalized checkpoint based on your latest quiz.
          </p>
        </div>
        <span
          className={`rounded-full px-4 py-2 text-xs font-semibold ${
            masteryColor[masteryLevel]
          }`}
        >
          {masteryCopy[masteryLevel]}
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs uppercase text-gray-500">Next target</p>
          <p className="mt-2 text-sm font-semibold text-gray-900">
            {nextTarget}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-xs uppercase text-gray-500">Coach tip</p>
          <p className="mt-2 text-sm text-gray-700">{coachingTip}</p>
        </div>
      </div>
    </div>
  );
}
