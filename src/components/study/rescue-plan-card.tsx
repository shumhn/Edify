"use client";

import { useState } from "react";
import { useTamboThread } from "@tambo-ai/react";
import { useUserProfile } from "@/hooks/use-user-profile";

const topicPresets = [
  "Projectile Motion",
  "Newton's Laws",
  "Work, Energy, Power",
  "Waves and Sound",
  "Calculus: Differentiation",
  "Chemical Equilibrium",
  "Data Structures (Stacks/Queues)",
];

export function RescuePlanCard() {
  const { sendThreadMessage, isIdle } = useTamboThread();
  const { profile } = useUserProfile();
  const learningMode = profile.learningMode ?? "exam";
  const [days, setDays] = useState(10);
  const [topic, setTopic] = useState("");

  const handleSubmit = () => {
    const focus = topic.trim() || "Projectile Motion";
    const message =
      learningMode === "learn"
        ? `I want a ${days}-day learning roadmap for ${focus}. Create a plan and include a short quiz.`
        : `I have ${days} days before my engineering entrance exam. My weakest topic is ${focus}. Create a rescue study plan and include a short quiz.`;
    sendThreadMessage(message);
  };

  return (
    <div className="rounded-2xl border border-purple-100 bg-white p-6 shadow-sm">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-purple-600">
          Rescue plan builder
        </p>
        <h3 className="text-2xl font-semibold text-gray-900">
          Build a personalized plan
        </h3>
        <p className="text-sm text-gray-500">
          Tell us your timeline and weakest topic.
        </p>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="text-sm text-gray-600">
          {learningMode === "learn" ? "Days to focus" : "Days until exam"}
          <input
            type="number"
            min={3}
            max={45}
            value={days}
            onChange={(event) => setDays(Number(event.target.value))}
            className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-purple-300 focus:outline-none"
          />
        </label>
        <label className="text-sm text-gray-600">
          Weakest topic
          <input
            type="text"
            placeholder="Projectile Motion"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:border-purple-300 focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {topicPresets.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setTopic(preset)}
            className="rounded-full border border-purple-200 px-3 py-1 text-xs font-semibold text-purple-700 transition hover:border-purple-300"
          >
            {preset}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isIdle}
          className="rounded-full bg-purple-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Generate rescue plan
        </button>
      </div>
    </div>
  );
}
