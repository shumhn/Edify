"use client";

import { z } from "zod";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

export const weakTopicRadarSchema = z.object({
  title: z.string().optional(),
  subject: z.string().optional(),
  topics: z
    .array(
      z.object({
        name: z.string(),
        score: z.number().min(0).max(100),
      }),
    )
    .optional(),
});

export type WeakTopicRadarProps = z.infer<typeof weakTopicRadarSchema>;

const defaultTopics = [
  { name: "Vectors", score: 62 },
  { name: "Newton's Laws", score: 55 },
  { name: "Work & Energy", score: 68 },
  { name: "Magnetism", score: 48 },
  { name: "Induction", score: 52 },
  { name: "Waves", score: 70 },
];

export function WeakTopicRadar({ title, subject, topics }: WeakTopicRadarProps) {
  const data = Array.isArray(topics) && topics.length > 0 ? topics : defaultTopics;
  const label = subject ? `${subject} weak-topic radar` : "Weak-topic radar";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Topic mastery
          </p>
          <h3 className="text-2xl font-semibold text-gray-900">
            {title ?? label}
          </h3>
          <p className="text-sm text-gray-500">
            Lower scores = higher priority for revision.
          </p>
        </div>
      </div>

      <div className="mt-4 h-72 w-full">
        <ResponsiveContainer>
          <RadarChart data={data}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#94a3b8" }} />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#10b981"
              fill="#34d399"
              fillOpacity={0.35}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
