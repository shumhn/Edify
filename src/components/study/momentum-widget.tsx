"use client";

import { useStudyStats } from "@/hooks/use-study-stats";

export function MomentumWidget() {
  const { stats, recordStudySession } = useStudyStats();
  const scores = stats.quizScores ?? [];
  const averageScore =
    scores.length > 0
      ? Math.round(scores.reduce((acc, value) => acc + value, 0) / scores.length)
      : null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Momentum
          </p>
          <h3 className="text-2xl font-semibold text-gray-900">
            Streak and Confidence
          </h3>
        </div>
        <button
          type="button"
          onClick={recordStudySession}
          className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400"
        >
          Mark study complete
        </button>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="text-xs uppercase text-slate-500">Current streak</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">
            {stats.streakDays} days
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="text-xs uppercase text-slate-500">Recent quiz avg</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">
            {averageScore !== null ? `${averageScore}%` : "--"}
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Based on your last {scores.length || 0} quiz scores.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 p-4">
          <p className="text-xs uppercase text-slate-500">Sessions logged</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">
            {stats.totalSessions}
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Stored locally in this browser.
          </p>
        </div>
      </div>
    </div>
  );
}
