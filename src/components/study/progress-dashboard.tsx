"use client";

import { z } from "zod";
import { withInteractable } from "@tambo-ai/react";

export const progressDashboardSchema = z.object({
  studentName: z.string().optional(),
  subject: z.string(),
  currentScore: z.number().min(0).max(100),
  targetScore: z.number().min(0).max(100),
  streakDays: z.number().min(0),
  minutesStudiedThisWeek: z.number().min(0),
  topicsMastered: z.array(z.string()).optional(),
  nextFocus: z.string().optional(),
});

export type ProgressDashboardProps = z.infer<typeof progressDashboardSchema>;

export function ProgressDashboard({
  studentName,
  subject,
  currentScore,
  targetScore,
  streakDays,
  minutesStudiedThisWeek,
  topicsMastered,
  nextFocus,
}: ProgressDashboardProps) {
  const safeTopics = Array.isArray(topicsMastered) ? topicsMastered : [];
  const scoreProgress = Math.min(100, Math.round((currentScore / targetScore) * 100));

  return (
    <div className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-amber-600">
            Progress Signal
          </p>
          <h3 className="text-2xl font-semibold text-gray-900">
            {studentName ? `${studentName}'s` : "Your"} {subject} Tracker
          </h3>
        </div>
        <div className="rounded-full bg-amber-50 px-4 py-2 text-xs font-semibold text-amber-700">
          Target {targetScore}%
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 p-4">
          <p className="text-xs uppercase text-gray-500">Current Score</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {currentScore}%
          </p>
          <div className="mt-3 h-2 w-full rounded-full bg-gray-100">
            <div
              className="h-2 rounded-full bg-amber-500"
              style={{ width: `${scoreProgress}%` }}
            />
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 p-4">
          <p className="text-xs uppercase text-gray-500">Study Streak</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {streakDays} days
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Keep momentum with short daily reviews.
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 p-4">
          <p className="text-xs uppercase text-gray-500">This Week</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {minutesStudiedThisWeek} min
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Aim for 240–300 minutes to lock concepts.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 p-4">
          <p className="text-sm font-semibold text-gray-900">Topics Mastered</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {safeTopics.length > 0 ? (
              safeTopics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700"
                >
                  {topic}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                No topics mastered yet. Start with one short quiz.
              </p>
            )}
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 p-4">
          <p className="text-sm font-semibold text-gray-900">Next Focus</p>
          <p className="mt-2 text-sm text-gray-600">
            {nextFocus ??
              "Tell me what feels hardest and I will adjust the plan."}
          </p>
        </div>
      </div>
    </div>
  );
}

export const InteractableProgressDashboard = withInteractable(
  ProgressDashboard,
  {
    componentName: "ProgressDashboard",
    description:
      "Study progress dashboard with streaks, weekly minutes, and mastery targets.",
    propsSchema: progressDashboardSchema,
  },
);
