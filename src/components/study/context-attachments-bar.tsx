"use client";

import { useState } from "react";
import { useTamboContextAttachment } from "@tambo-ai/react";
import { ChevronDown, ChevronUp, Paperclip, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserProfile } from "@/hooks/use-user-profile";

export function ContextAttachmentsBar({ className }: { className?: string }) {
  const {
    attachments,
    addContextAttachment,
    removeContextAttachment,
    clearContextAttachments,
  } = useTamboContextAttachment();
  const { profile } = useUserProfile();
  const learningMode = profile.learningMode ?? "exam";
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const quickAttachments =
    learningMode === "learn"
      ? [
          {
            label: "Goal: Mastery",
            context: "Goal: Master the basics with steady practice.",
            type: "goal",
          },
          {
            label: "Weak: Data Structures",
            context:
              "Weakest topic: Data Structures (stacks/queues). Need extra practice.",
            type: "weak-topic",
          },
          {
            label: "Time: 30 min/day",
            context: "Preferred pace: 30 minutes per day.",
            type: "timeline",
          },
        ]
      : [
          {
            label: "Exam in 14 days",
            context: "Exam in 14 days. Need a realistic daily plan.",
            type: "timeline",
          },
          {
            label: "Weak: Magnetism",
            context: "Weakest topic: Magnetism & Induction. Need extra practice.",
            type: "weak-topic",
          },
          {
            label: "Weak: Data Structures",
            context:
              "Weakest topic: Data Structures (stacks/queues). Need extra practice.",
            type: "weak-topic",
          },
          {
            label: "Goal: 75%",
            context: "Target score: 75%. Current confidence: medium.",
            type: "goal",
          },
        ];

  const addAttachment = (context: string, displayName?: string, type?: string) => {
    if (!context.trim()) return;
    addContextAttachment({
      context: context.trim(),
      displayName: displayName ?? context.trim().slice(0, 36),
      type,
    });
  };

  return (
    <div
      className={cn(
        "mt-2 rounded-xl border border-slate-200 bg-white/90 px-3 py-2 text-xs text-slate-600 shadow-sm",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
        >
          <Paperclip className="h-3.5 w-3.5" />
          Notes ({attachments.length})
          {isOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </button>
        <div className="flex items-center gap-2">
          {attachments.length > 0 && (
            <button
              type="button"
              onClick={clearContextAttachments}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            >
              Clear
            </button>
          )}
          {!isOpen && (
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold text-white shadow-sm"
            >
              <Plus className="h-3 w-3" /> Add
            </button>
          )}
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        {attachments.map((attachment) => (
          <span
            key={attachment.id}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-700 shadow-sm"
          >
            {attachment.displayName ?? "Attachment"}
            <button
              type="button"
              onClick={() => removeContextAttachment(attachment.id)}
              className="text-slate-400 hover:text-slate-700"
              aria-label="Remove attachment"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>

      {isOpen && (
        <>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <input
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addAttachment(value, "Custom note", "note");
                  setValue("");
                }
              }}
              placeholder="Add a custom note (e.g., Exam in 12 days)"
              className="flex-1 min-w-[220px] rounded-full border border-slate-200 bg-white px-4 py-2 text-xs text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
            <button
              type="button"
              onClick={() => {
                addAttachment(value, "Custom note", "note");
                setValue("");
              }}
              className="rounded-full bg-slate-900 px-4 py-2 text-[11px] font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Add note
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {quickAttachments.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => addAttachment(item.context, item.label, item.type)}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-slate-500">
            Tip: Attachments apply to your next message only.
          </p>
        </>
      )}
    </div>
  );
}
