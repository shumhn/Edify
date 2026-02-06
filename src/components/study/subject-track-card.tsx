"use client";

import { useTamboThread } from "@tambo-ai/react";
import { useUserProfile } from "@/hooks/use-user-profile";
import { useCallback, useEffect, useRef, useState } from "react";
import { getStemTopicPack } from "@/services/study-tools";
import { TopicListCard } from "@/components/study/topic-list-card";

const subjects = ["Physics", "Math", "Chemistry", "Computer Science"] as const;

const summaries: Record<(typeof subjects)[number], string> = {
  Physics: "Mechanics, waves, E&M, optics, and modern physics.",
  Math: "Algebra, calculus, probability, and statistics.",
  Chemistry: "Equilibrium, kinetics, organic reactions, thermodynamics.",
  "Computer Science": "DSA, algorithms, OS, networks, and databases.",
};

export function SubjectTrackCard({
  subjectOverride,
  autoStartOverride,
  modeOverride,
}: {
  subjectOverride?: string;
  autoStartOverride?: boolean;
  modeOverride?: "exam" | "learn";
}) {
  const { sendThreadMessage, isIdle } = useTamboThread();
  const { profile, updateProfile } = useUserProfile();
  const subject = subjectOverride ?? profile.focusSubject ?? "Physics";
  const summary =
    summaries[subject as keyof typeof summaries] ?? "Core STEM concepts.";
  const mode = modeOverride ?? profile.learningMode ?? "exam";
  const skillLevel = profile.skillLevel ?? "Intermediate";
  const [autoTopicPack, setAutoTopicPack] = useState<string[] | null>(null);
  const [isLoadingTopics, setIsLoadingTopics] = useState(false);

  const handleStart = useCallback(() => {
    const base =
      mode === "learn"
        ? `I'm learning ${subject} as a ${skillLevel} learner. Do not ask about exams or deadlines.`
        : `I'm preparing for a ${subject} exam. I'm ${skillLevel} level.`;

    sendThreadMessage(
      `${base} Show the topic list for ${subject} only and ask me to pick my weakest topic. Respond with TopicListCard.`,
    );
  }, [mode, subject, skillLevel, sendThreadMessage]);

  const autoStartRef = useRef(false);

  useEffect(() => {
    if (subjectOverride && profile.focusSubject !== subjectOverride) {
      updateProfile({ focusSubject: subjectOverride });
    }
  }, [subjectOverride, profile.focusSubject, updateProfile]);

  useEffect(() => {
    if (autoStartRef.current) return;

    if (autoStartOverride || profile.autoStartSubject) {
      autoStartRef.current = true;
      setAutoTopicPack(null);
      setIsLoadingTopics(true);
      void getStemTopicPack({
        subject: subject as "Physics" | "Math" | "Chemistry" | "Computer Science",
      })
        .then((pack) => {
          setAutoTopicPack(pack.topics ?? []);
        })
        .finally(() => {
          setIsLoadingTopics(false);
        });
      updateProfile({ autoStartSubject: false });
    }
  }, [profile.autoStartSubject, autoStartOverride, subject, updateProfile]);

  useEffect(() => {
    if (!autoStartRef.current) return;
    setAutoTopicPack(null);
    setIsLoadingTopics(true);
    void getStemTopicPack({
      subject: subject as "Physics" | "Math" | "Chemistry" | "Computer Science",
    })
      .then((pack) => {
        setAutoTopicPack(pack.topics ?? []);
      })
      .finally(() => {
        setIsLoadingTopics(false);
      });
  }, [subject]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {autoTopicPack && autoTopicPack.length > 0 ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Subject
              </p>
              <h3 className="text-2xl font-semibold text-slate-900">{subject}</h3>
              <p className="mt-1 text-sm text-slate-600">{summary}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {mode === "exam" ? "Exam prep" : "Learn & practice"}
              </div>
              <button
                type="button"
                onClick={() => updateProfile({ focusSubject: undefined })}
                className="rounded-full border border-slate-200 px-3 py-1 text-[11px] font-semibold text-slate-500 transition hover:border-slate-300"
              >
                Change
              </button>
            </div>
          </div>
          <TopicListCard
            subject={subject}
            level={skillLevel}
            title={`${subject} topic map`}
            prompt="Pick your weakest topic to start."
            topics={autoTopicPack}
          />
        </div>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Subject track
              </p>
              <h3 className="text-2xl font-semibold text-slate-900">{subject}</h3>
              <p className="mt-1 text-sm text-slate-600">{summary}</p>
            </div>
            <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {mode === "exam" ? "Exam prep" : "Learn & practice"}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleStart}
              disabled={!isIdle}
              className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Start {subject}
            </button>
            <span className="text-xs text-slate-500">
              We’ll generate a topic map and quiz flow.
            </span>
            <button
              type="button"
              onClick={() => updateProfile({ focusSubject: undefined })}
              className="rounded-full border border-slate-200 px-3 py-1 text-[11px] font-semibold text-slate-500 transition hover:border-slate-300"
            >
              Change subject
            </button>
          </div>

          {isLoadingTopics && (
            <p className="mt-4 text-xs text-slate-500">Loading topic map...</p>
          )}
        </>
      )}
    </div>
  );
}
