"use client";

import { z } from "zod";
import { Graph } from "@/components/tambo/graph";

export const masteryMatrixSchema = z.object({
  title: z.string().optional(),
  weeks: z.array(z.string()).optional(),
  topics: z.array(z.string()).optional(),
  values: z.array(z.array(z.number())).optional(),
});

export type MasteryMatrixProps = z.infer<typeof masteryMatrixSchema>;

const defaultWeeks = ["Week 1", "Week 2", "Week 3", "Week 4"];
const defaultTopics = ["Mechanics", "Calculus", "Thermo", "DSA"];
const defaultValues = [
  [42, 55, 62, 70],
  [35, 48, 58, 66],
  [50, 60, 63, 72],
  [30, 40, 52, 60],
];

export function MasteryMatrix({
  title,
  weeks,
  topics,
  values,
}: MasteryMatrixProps) {
  const labels = Array.isArray(weeks) && weeks.length > 0 ? weeks : defaultWeeks;
  const topicLabels =
    Array.isArray(topics) && topics.length > 0 ? topics : defaultTopics;
  const matrix =
    Array.isArray(values) && values.length > 0 ? values : defaultValues;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Mastery matrix
          </p>
          <h3 className="text-2xl font-semibold text-gray-900">
            {title ?? "Topic mastery heatmap"}
          </h3>
          <p className="text-sm text-gray-500">
            Darker cells indicate stronger mastery.
          </p>
        </div>
      </div>

      <div className="mt-4">
        <Graph
          title=""
          variant="bordered"
          size="sm"
          data={{
            type: "heatmap",
            labels,
            datasets: topicLabels.map((topic, index) => ({
              label: topic,
              data: matrix[index] ?? [],
            })),
          }}
        />
      </div>
    </div>
  );
}
