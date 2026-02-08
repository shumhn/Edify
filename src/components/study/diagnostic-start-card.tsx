"use client";

import { useState } from "react";
import { useTamboThread } from "@tambo-ai/react";
import { useUserProfile } from "@/hooks/use-user-profile";

const subjects = ["Physics", "Math", "Chemistry", "Computer Science"];
const levels = ["Beginner", "Intermediate", "Advanced"] as const;

export function DiagnosticStartCard() {
  const { sendThreadMessage, isIdle } = useTamboThread();
  const { profile, updateProfile } = useUserProfile();
  const [mode, setMode] = useState<"exam" | "learn">(
    profile.learningMode ?? "learn",
  );
  const [subject, setSubject] = useState(profile.focusSubject ?? "Physics");
  const [skillLevel, setSkillLevel] = useState<
    "Beginner" | "Intermediate" | "Advanced"
  >(profile.skillLevel ?? "Intermediate");
  const [days, setDays] = useState(profile.examDaysLeft ?? 14);
  const [sessionsPerWeek, setSessionsPerWeek] = useState(
    profile.paceSessionsPerWeek ?? 4,
  );

  const handleStart = () => {
    updateProfile({
      learningMode: mode,
      focusSubject: subject,
      skillLevel,
      examDaysLeft: mode === "exam" ? days : undefined,
      paceSessionsPerWeek: mode === "learn" ? sessionsPerWeek : undefined,
    });

    const baseMessage =
      mode === "exam"
        ? `I'm preparing for an exam in ${days} days. My subject is ${subject}. I'm ${skillLevel} level.`
        : `I want to learn ${subject} as a ${skillLevel} learner. My pace is ${sessionsPerWeek} sessions per week. Do not ask about exams or deadlines.`;

    sendThreadMessage(
      `${baseMessage} Show the topic list for ${subject} only and ask me to pick my weakest topic. Respond with TopicListCard.`,
    );
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Diagnostic
          </p>
          <h3 className="text-2xl font-semibold text-slate-900">
            Start with your weakest topic
          </h3>
          <p className="text-sm text-slate-600">
            Pick a mode, subject, and level. We’ll generate an interactive
            topic map to diagnose weak areas.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
          Mode: {mode === "exam" ? "Exam prep" : "Learn & practice"}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setMode("exam")}
          className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
            mode === "exam"
              ? "bg-slate-900 text-white"
              : "border border-slate-200 text-slate-600 hover:border-slate-300"
          }`}
        >
          Exam prep
        </button>
        <button
          type="button"
          onClick={() => setMode("learn")}
          className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
            mode === "learn"
              ? "bg-slate-900 text-white"
              : "border border-slate-200 text-slate-600 hover:border-slate-300"
          }`}
        >
          Learn & practice
        </button>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <label className="text-sm text-slate-600">
          Subject
          <select
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
          >
            {subjects.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm text-slate-600">
          Skill level
          <select
            value={skillLevel}
            onChange={(event) =>
              setSkillLevel(event.target.value as typeof skillLevel)
            }
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900"
          >
            {levels.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        {mode === "exam" ? (
          <label className="text-sm text-slate-600">
            Days until exam
            <input
              type="number"
              min={3}
              max={90}
              value={days}
              onChange={(event) => setDays(Number(event.target.value))}
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900"
            />
          </label>
        ) : (
          <label className="text-sm text-slate-600">
            Sessions per week
            <input
              type="number"
              min={1}
              max={7}
              value={sessionsPerWeek}
              onChange={(event) =>
                setSessionsPerWeek(Number(event.target.value))
              }
              className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900"
            />
          </label>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleStart}
          disabled={!isIdle}
          className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Start diagnostic
        </button>
        <span className="text-xs text-slate-500">
          You can change this anytime from the identity bar.
        </span>
      </div>
    </div>
  );
}
