"use client";

import { z } from "zod";

export const gaugeCardSchema = z.object({
  title: z.string(),
  value: z.number().min(0).max(100).optional(),
  status: z.string().optional(),
  description: z.string().optional(),
});

export type GaugeCardProps = z.infer<typeof gaugeCardSchema>;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const getTone = (value: number) => {
  if (value >= 80) return "emerald";
  if (value >= 60) return "amber";
  return "rose";
};

export function GaugeCard({ title, value, status, description }: GaugeCardProps) {
  const safeValue = clamp(Math.round(value ?? 0), 0, 100);
  const tone = getTone(safeValue);
  const angle = Math.round((safeValue / 100) * 360);

  const ringColor =
    tone === "emerald"
      ? "hsl(152 60% 45%)"
      : tone === "amber"
        ? "hsl(38 92% 50%)"
        : "hsl(351 80% 60%)";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Gauge chart
          </p>
          <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
          {description && (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          )}
        </div>
        {status && (
          <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700">
            {status}
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center gap-6">
        <div className="relative h-32 w-32">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(${ringColor} 0deg ${angle}deg, #e5e7eb ${angle}deg 360deg)`,
            }}
          />
          <div className="absolute inset-3 rounded-full bg-white shadow-inner" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-semibold text-slate-900">
                {safeValue}%
              </p>
              <p className="text-xs text-slate-500">Score</p>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <p className="text-sm text-slate-600">
            Use this gauge to highlight quick readiness, accuracy, or topic
            mastery at a glance.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
              80–100: Ready
            </span>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">
              60–79: On track
            </span>
            <span className="rounded-full bg-rose-50 px-3 py-1 text-rose-700">
              &lt;60: Needs focus
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
