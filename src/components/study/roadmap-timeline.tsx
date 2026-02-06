"use client";

import { z } from "zod";

export const roadmapTimelineSchema = z.object({
  title: z.string(),
  timeframe: z.string().optional(),
  steps: z.array(
    z.object({
      label: z.string(),
      focus: z.string(),
      tasks: z.array(z.string()).optional(),
    }),
  ),
});

export type RoadmapTimelineProps = z.infer<typeof roadmapTimelineSchema>;

export function RoadmapTimeline({ title, timeframe, steps }: RoadmapTimelineProps) {
  const safeSteps = Array.isArray(steps) ? steps : [];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Learning roadmap
          </p>
          <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
          {timeframe && (
            <p className="text-sm text-gray-500">Timeframe: {timeframe}</p>
          )}
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {safeSteps.map((step, index) => (
          <div
            key={`${step.label}-${index}`}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                {index + 1}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {step.label}
                </p>
                <p className="text-xs text-slate-500">{step.focus}</p>
              </div>
            </div>
            <ul className="mt-3 space-y-1 text-sm text-slate-600">
              {(Array.isArray(step.tasks) ? step.tasks : []).map(
                (task, taskIndex) => (
                  <li key={`${step.label}-${taskIndex}`}>• {task}</li>
                ),
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
