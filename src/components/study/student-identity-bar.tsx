"use client";

import { useUserProfile } from "@/hooks/use-user-profile";
import { cn } from "@/lib/utils";

export function StudentIdentityBar({
  className,
}: {
  className?: string;
}) {
  const { profile, updateProfile } = useUserProfile();
  const learningMode = profile.learningMode ?? "exam";
  const modeLabel =
    learningMode === "exam" ? "Exam prep" : "Learn & practice";
  const skillLevel = profile.skillLevel ?? "Intermediate";

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-600 shadow-sm",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Demo identity
        </span>
        <span>
          Signed in as{" "}
          <strong className="text-slate-900">{profile.name}</strong>
        </span>
        <span className="text-slate-400">•</span>
        <span>{profile.gradeLevel ?? "Engineering-track +2 (MPC/CS)"}</span>
        <span className="text-slate-400">•</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600">
          {modeLabel}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600">
          {skillLevel}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="rounded-full border border-slate-200 px-3 py-1 text-[11px] font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          onClick={() => {
            const name = window.prompt("Enter your name", profile.name);
            if (name && name.trim().length > 1) {
              updateProfile({ name: name.trim() });
            }
          }}
        >
          Edit
        </button>
        <button
          type="button"
          className="rounded-full border border-slate-200 px-3 py-1 text-[11px] font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          onClick={() =>
            updateProfile({
              learningMode: learningMode === "exam" ? "learn" : "exam",
            })
          }
        >
          Switch to {learningMode === "exam" ? "Learn" : "Exam"}
        </button>
      </div>
    </div>
  );
}
