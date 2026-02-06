"use client";

import { useTamboThread } from "@tambo-ai/react";
import { z } from "zod";
import { useUserProfile } from "@/hooks/use-user-profile";

export const topicListCardSchema = z.object({
  subject: z.string(),
  topics: z.array(z.string()).min(1),
  title: z.string().optional(),
  prompt: z.string().optional(),
});

export type TopicListCardProps = z.infer<typeof topicListCardSchema>;

export function TopicListCard({
  subject,
  topics,
  title,
  prompt,
}: TopicListCardProps) {
  const { sendThreadMessage, isIdle } = useTamboThread();
  const { profile } = useUserProfile();
  const learningMode = profile.learningMode ?? "exam";
  const safeTopics = Array.isArray(topics) ? topics : [];
  const label = title ?? `${subject} topic map`;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Topic map
          </p>
          <h3 className="text-2xl font-semibold text-gray-900">{label}</h3>
          <p className="text-sm text-gray-500">
            Pick your weakest topic and I’ll build a plan + quiz.
          </p>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {safeTopics.length} topics
        </div>
      </div>

      {prompt && (
        <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          {prompt}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {safeTopics.map((topic) => (
          <button
            key={topic}
            type="button"
            disabled={!isIdle}
            onClick={() =>
              sendThreadMessage(
                learningMode === "learn"
                  ? `I want to learn ${topic} in ${subject}. Create a learning roadmap with practice and a short quiz.`
                  : `My weakest topic is ${topic} in ${subject}. Create a ${subject} study plan and include a short quiz.`,
              )
            }
            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}
