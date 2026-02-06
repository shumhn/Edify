"use client";

import { z } from "zod";
import { useStudyStats } from "@/hooks/use-study-stats";
import { withInteractable } from "@tambo-ai/react";

export const readinessScoreSchema = z.object({
  score: z.number().min(0).max(100).optional(),
  status: z.string().optional(),
  summary: z.string().optional(),
  focusAreas: z.array(z.string()).optional(),
  nextSteps: z.array(z.string()).optional(),
  useLiveStats: z.boolean().optional(),
});

export type ReadinessScoreProps = z.infer<typeof readinessScoreSchema>;

const computeReadiness = (scores: number[], streakDays: number) => {
  if (scores.length === 0) {
    return {
      score: 0,
      status: "Need data",
      summary: "Complete a quick quiz to personalize your readiness score.",
      nextSteps: [
        "Take a 5-question quiz",
        "Review your weakest topic",
        "Log a 25-minute study session",
      ],
    };
  }

  const average = Math.round(
    scores.reduce((acc, value) => acc + value, 0) / scores.length,
  );
  const score = Math.max(
    0,
    Math.min(100, Math.round(average * 0.85 + Math.min(streakDays * 2, 12))),
  );

  let status = "Needs focus";
  if (score >= 80) status = "Exam ready";
  else if (score >= 65) status = "On track";
  else if (score >= 50) status = "Building";

  return {
    score,
    status,
    summary: `Based on your recent quiz average (${average}%) and a ${streakDays}-day streak.`,
    nextSteps:
      score >= 80
        ? ["Keep the streak", "Do a timed mixed-topic set", "Light review"]
        : score >= 65
          ? ["Do a mixed-topic quiz", "Review mistakes", "Add one study block"]
          : ["Target weakest topic", "Do a short quiz", "Review formulas"],
  };
};

function ReadinessScoreBase({
  score,
  status,
  summary,
  focusAreas,
  nextSteps,
  useLiveStats,
}: ReadinessScoreProps) {
  const { stats } = useStudyStats();
  const derived = computeReadiness(stats.quizScores ?? [], stats.streakDays);
  const shouldUseLive = useLiveStats ?? typeof score !== "number";

  const finalScore = shouldUseLive ? derived.score : score ?? derived.score;
  const finalStatus = shouldUseLive ? derived.status : status ?? derived.status;
  const finalSummary = shouldUseLive
    ? derived.summary
    : summary ?? derived.summary;
  const finalSteps = shouldUseLive
    ? derived.nextSteps
    : nextSteps ?? derived.nextSteps;

  const safeFocus = Array.isArray(focusAreas) ? focusAreas : [];
  const safeSteps = Array.isArray(finalSteps) ? finalSteps : [];
  const clampedScore = Math.max(0, Math.min(100, Math.round(finalScore)));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Exam readiness
          </p>
          <h3 className="text-2xl font-semibold text-gray-900">
            Readiness score
          </h3>
          {finalSummary && (
            <p className="mt-1 text-sm text-gray-500">{finalSummary}</p>
          )}
        </div>
        <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700">
          {finalStatus}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="text-xs uppercase text-slate-500">Score</p>
          <p className="mt-2 text-4xl font-semibold text-slate-900">
            {clampedScore}%
          </p>
          <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
            <div
              className="h-2 rounded-full bg-emerald-500"
              style={{ width: `${clampedScore}%` }}
            />
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="text-xs uppercase text-slate-500">Next steps</p>
          {safeSteps.length > 0 ? (
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              {safeSteps.map((step, index) => (
                <li key={`${step}-${index}`}>• {step}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-slate-500">
              Keep the streak and review weak topics.
            </p>
          )}
        </div>
      </div>

      {safeFocus.length > 0 && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-xs uppercase text-slate-500">Focus areas</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {safeFocus.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export const ReadinessScore = withInteractable(ReadinessScoreBase, {
  componentName: "ReadinessScore",
  description:
    "Exam readiness score card with status, next steps, and focus areas.",
  propsSchema: readinessScoreSchema,
});
