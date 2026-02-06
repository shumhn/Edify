"use client";

import { useTamboComponentState, withInteractable } from "@tambo-ai/react";
import { useMemo } from "react";
import { z } from "zod";

export const studyPlanSchema = z.object({
  goal: z.string(),
  dailyMinutes: z.number().min(10),
  days: z.number().min(1),
  plan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      tasks: z.array(z.string()).min(1),
    }),
  ),
});

export type StudyPlanProps = z.infer<typeof studyPlanSchema>;

interface StudyPlanBaseProps extends StudyPlanProps {
  onPropsUpdate?: (newProps: StudyPlanProps) => void;
}

function StudyPlanBase({
  goal,
  dailyMinutes,
  days,
  plan = [],
}: StudyPlanBaseProps) {
  const [completedDays, setCompletedDays] = useTamboComponentState<number[]>(
    "completedDays",
    [],
  );
  const safeCompletedDays = Array.isArray(completedDays) ? completedDays : [];

  const completion = useMemo(() => {
    if (days === 0) return 0;
    return Math.round((safeCompletedDays.length / days) * 100);
  }, [safeCompletedDays.length, days]);

  return (
    <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-purple-600">
            Adaptive Plan
          </p>
          <h3 className="text-2xl font-semibold text-gray-900">{goal}</h3>
          <p className="text-sm text-gray-500">
            {days}-day plan · {dailyMinutes} minutes/day
          </p>
        </div>
        <div className="rounded-full bg-purple-50 px-4 py-2 text-xs font-semibold text-purple-700">
          {completion}% completed
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {plan.length === 0 ? (
          <div className="rounded-xl border border-dashed border-purple-200 bg-purple-50/40 px-4 py-6 text-sm text-purple-700">
            Plan details are loading. Ask for a study plan to generate day-by-day
            tasks.
          </div>
        ) : (
          plan.map((dayPlan, index) => {
            const isDone = safeCompletedDays.includes(dayPlan.day);
            return (
              <div
                key={`${dayPlan.day ?? "day"}-${index}`}
                className={`rounded-xl border px-4 py-3 transition ${
                  isDone
                    ? "border-purple-300 bg-purple-50"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Day {dayPlan.day}: {dayPlan.focus}
                    </p>
                    <ul className="mt-2 text-sm text-gray-600">
                      {(Array.isArray(dayPlan.tasks) ? dayPlan.tasks : []).map(
                        (task, taskIndex) => (
                        <li key={`${dayPlan.day ?? "day"}-${index}-${taskIndex}`}>
                          • {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const next = safeCompletedDays.includes(dayPlan.day)
                        ? safeCompletedDays.filter((day) => day !== dayPlan.day)
                        : [...safeCompletedDays, dayPlan.day];
                      setCompletedDays(next);
                    }}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                      isDone
                        ? "bg-purple-600 text-white"
                        : "border border-purple-200 text-purple-700 hover:bg-purple-50"
                    }`}
                  >
                    {isDone ? "Completed" : "Mark done"}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export const StudyPlan = withInteractable(StudyPlanBase, {
  componentName: "StudyPlan",
  description:
    "Adaptive study plan with daily focus areas, tasks, and completion tracking.",
  propsSchema: studyPlanSchema,
});
