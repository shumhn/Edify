"use client";

import { z } from "zod";

export const conceptExplainerSchema = z.object({
  title: z.string(),
  summary: z.string(),
  bulletPoints: z.array(z.string()).optional(),
  keyFormula: z.string().optional(),
  example: z.string().optional(),
  examTip: z.string().optional(),
});

export type ConceptExplainerProps = z.infer<typeof conceptExplainerSchema>;

export function ConceptExplainer({
  title,
  summary,
  bulletPoints,
  keyFormula,
  example,
  examTip,
}: ConceptExplainerProps) {
  const safePoints = Array.isArray(bulletPoints) ? bulletPoints : [];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Concept Explainer
          </p>
          <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-600">{summary}</p>
        </div>
      </div>

      {safePoints.length > 0 && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3">
          <p className="text-xs uppercase text-slate-500">Key reasons</p>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {safePoints.map((point, index) => (
              <li key={`${point}-${index}`}>• {point}</li>
            ))}
          </ul>
        </div>
      )}

      {keyFormula && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-white px-4 py-3">
          <p className="text-xs uppercase text-slate-500">Key formula</p>
          <p className="mt-2 text-sm font-semibold text-slate-900">
            {keyFormula}
          </p>
        </div>
      )}

      {(example || examTip) && (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {example && (
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
              <p className="text-xs uppercase text-slate-500">Example</p>
              <p className="mt-2 text-sm text-slate-700">{example}</p>
            </div>
          )}
          {examTip && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-xs uppercase text-slate-500">Exam tip</p>
              <p className="mt-2 text-sm text-slate-700">{examTip}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
