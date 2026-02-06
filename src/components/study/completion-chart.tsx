"use client";

import { Graph } from "@/components/tambo/graph";
import { z } from "zod";

export const completionChartSchema = z.object({
  title: z.string().optional(),
  totalDays: z.number().min(1).max(60).optional(),
  completedDays: z.array(z.number()).optional(),
  completedCount: z.number().min(0).optional(),
  demoAllowed: z.boolean().optional(),
});

export type CompletionChartProps = z.infer<typeof completionChartSchema>;

const buildDemoCompletion = (totalDays: number, completedCount: number) => {
  const completion = new Set<number>();
  for (let i = 1; i <= totalDays; i += 3) {
    completion.add(i);
  }
  while (completion.size < completedCount) {
    completion.add(((completion.size * 5) % totalDays) + 1);
  }
  return Array.from(completion).sort((a, b) => a - b);
};

export function CompletionChart({
  title,
  totalDays = 30,
  completedDays,
  completedCount,
  demoAllowed = true,
}: CompletionChartProps) {
  const normalizedDays = Array.isArray(completedDays)
    ? completedDays.filter((day) => day >= 1 && day <= totalDays)
    : [];

  const hasUserData = normalizedDays.length > 0;
  const count =
    typeof completedCount === "number"
      ? Math.min(completedCount, totalDays)
      : Math.min(12, totalDays);

  const daysToUse = hasUserData
    ? normalizedDays
    : demoAllowed
      ? buildDemoCompletion(totalDays, count)
      : [];

  const labels = Array.from({ length: totalDays }, (_, i) => `Day ${i + 1}`);
  const data = labels.map((_, index) =>
    daysToUse.includes(index + 1) ? 1 : 0,
  );

  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-600">
            Completion Tracker
          </p>
          <h3 className="text-2xl font-semibold text-gray-900">
            {title ?? `Daily completion (${totalDays} days)`}
          </h3>
          {!hasUserData && demoAllowed && (
            <p className="text-xs text-gray-500">Showing sample data</p>
          )}
        </div>
        <div className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-700">
          {daysToUse.length}/{totalDays} days completed
        </div>
      </div>

      <div className="mt-4">
        <Graph
          title=""
          showLegend={false}
          variant="bordered"
          size="sm"
          data={{
            type: "bar",
            labels,
            datasets: [
              {
                label: "Completed",
                data,
                color: "hsl(160, 82%, 47%)",
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
