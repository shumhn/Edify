"use client";

import { useUserProfile } from "@/hooks/use-user-profile";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-xs text-slate-600 shadow-sm",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Profile
        </span>
        <span>
          {profile.name}
        </span>
        <span className="text-slate-300">•</span>
        <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600">
          {modeLabel}
        </span>
        <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600">
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
          onClick={() => {
            const nextMode = learningMode === "exam" ? "learn" : "exam";
            updateProfile({ learningMode: nextMode });
            const params = new URLSearchParams(searchParams.toString());
            params.set("mode", nextMode);
            router.replace(`${pathname}?${params.toString()}`);
          }}
        >
          Switch to {learningMode === "exam" ? "Learn" : "Exam"}
        </button>
      </div>
    </div>
  );
}
