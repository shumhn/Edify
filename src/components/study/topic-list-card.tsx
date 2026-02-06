"use client";

import { useTamboThread } from "@tambo-ai/react";
import { z } from "zod";
import { useUserProfile } from "@/hooks/use-user-profile";

const topicListItemSchema = z.union([
  z.string(),
  z.object({
    id: z.string().optional(),
    title: z.string(),
    chips: z.array(z.string()).optional(),
  }),
]);

export const topicListCardSchema = z.object({
  subject: z.string(),
  topics: z.array(topicListItemSchema).min(1),
  title: z.string().optional(),
  prompt: z.string().optional(),
  level: z.string().optional(),
});

export type TopicListCardProps = z.infer<typeof topicListCardSchema>;

export function TopicListCard({
  subject,
  topics,
  title,
  prompt,
  level,
}: TopicListCardProps) {
  const { sendThreadMessage, isIdle } = useTamboThread();
  const { profile } = useUserProfile();
  const learningMode = profile.learningMode ?? "exam";
  const safeTopics = Array.isArray(topics) ? topics : [];
  const label = title ?? `${subject} topic map`;
  const normalizedTopics = safeTopics.map((item, index) => {
    if (typeof item === "string") {
      return {
        id: `topic-${index}`,
        title: item,
        chips: [],
      };
    }
    return {
      id: item.id ?? `topic-${index}`,
      title: item.title,
      chips: item.chips ?? [],
    };
  });

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
        <div className="flex flex-wrap items-center gap-2">
          {level && (
            <div className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
              {level}
            </div>
          )}
          <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {normalizedTopics.length} topics
          </div>
        </div>
      </div>

      {prompt && (
        <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          {prompt}
        </div>
      )}

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {normalizedTopics.map((topic) => (
          <div
            key={topic.id}
            className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 shadow-sm"
          >
            <button
              type="button"
              disabled={!isIdle}
              onClick={() =>
                sendThreadMessage(
                  learningMode === "learn"
                    ? `I want to learn ${topic.title} in ${subject}. Create a learning roadmap with practice and a short quiz.`
                    : `My weakest topic is ${topic.title} in ${subject}. Create a ${subject} study plan and include a short quiz.`,
                )
              }
              className="w-full text-left text-sm font-semibold text-slate-900 transition hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {topic.title}
            </button>
            {topic.chips.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {topic.chips.map((chip) => (
                  <button
                    key={`${topic.id}-${chip}`}
                    type="button"
                    disabled={!isIdle}
                    onClick={() =>
                      sendThreadMessage(
                        learningMode === "learn"
                          ? `I want to learn ${chip} under ${topic.title} in ${subject}. Create a learning roadmap with practice and a short quiz.`
                          : `My weakest topic is ${chip} under ${topic.title} in ${subject}. Create a ${subject} study plan and include a short quiz.`,
                      )
                    }
                    className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
