"use client";

import { z } from "zod";

export const formulaCardSchema = z.object({
  title: z.string(),
  formula: z.string(),
  description: z.string().optional(),
  variables: z
    .array(
      z.object({
        symbol: z.string(),
        meaning: z.string(),
        unit: z.string().optional(),
      }),
    )
    .optional(),
  example: z
    .object({
      prompt: z.string(),
      solution: z.string(),
    })
    .optional(),
});

export type FormulaCardProps = z.infer<typeof formulaCardSchema>;

export function FormulaCard({
  title,
  formula,
  description,
  variables,
  example,
}: FormulaCardProps) {
  const safeVariables = Array.isArray(variables) ? variables : [];
  return (
    <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-sky-600">
            Formula Lab
          </p>
          <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="rounded-full bg-sky-50 px-4 py-2 text-xs font-semibold text-sky-700">
          STEM Ready
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-sky-100 bg-sky-50 px-4 py-3 font-mono text-lg text-sky-900">
        {formula}
      </div>

      {description && (
        <p className="mt-4 text-sm text-gray-600">{description}</p>
      )}

      {safeVariables.length > 0 && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {safeVariables.map((item) => (
            <div
              key={`${item.symbol}-${item.meaning}`}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm"
            >
              <p className="text-base font-semibold text-gray-900">
                {item.symbol}
              </p>
              <p className="text-gray-600">{item.meaning}</p>
              {item.unit && (
                <p className="text-xs text-gray-500">Unit: {item.unit}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {example && (
        <div className="mt-4 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm">
          <p className="font-semibold text-gray-900">Example</p>
          <p className="text-gray-600">{example.prompt}</p>
          <p className="mt-2 text-sky-700">{example.solution}</p>
        </div>
      )}
    </div>
  );
}
