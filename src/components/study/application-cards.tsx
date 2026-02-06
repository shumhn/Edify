"use client";

import { z } from "zod";

export const applicationCardsSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  items: z.array(
    z.object({
      heading: z.string(),
      description: z.string(),
    }),
  ),
});

export type ApplicationCardsProps = z.infer<typeof applicationCardsSchema>;

export function ApplicationCards({ title, subtitle, items }: ApplicationCardsProps) {
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          Real-world applications
        </p>
        <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
        {subtitle && (
          <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
        )}
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {safeItems.map((item, index) => (
          <div
            key={`${item.heading}-${index}`}
            className="rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3"
          >
            <p className="text-base font-semibold text-gray-900">
              {item.heading}
            </p>
            <p className="mt-1 text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
