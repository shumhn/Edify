"use client";

import { useMemo, useState } from "react";
import { z } from "zod";
import { recordQuizResult } from "@/lib/study-stats";
import { useTamboThread } from "@tambo-ai/react";
import { useUserProfile } from "@/hooks/use-user-profile";

export const quizQuestionSchema = z.object({
  id: z.string(),
  question: z.string(),
  options: z.array(z.string()).min(2),
  correctIndex: z.number().min(0),
  explanation: z.string().optional(),
});

export const quizCardSchema = z.object({
  title: z.string(),
  topic: z.string(),
  questions: z.array(quizQuestionSchema).min(1),
});

export type QuizCardProps = z.infer<typeof quizCardSchema>;

type AnswerState = Record<string, number | null>;

export function QuizCard({ title, topic, questions = [] }: QuizCardProps) {
  const safeQuestions = Array.isArray(questions) ? questions : [];
  const { sendThreadMessage, isIdle } = useTamboThread();
  const { profile } = useUserProfile();
  const skillLevel = profile.skillLevel ?? "Intermediate";
  const [answers, setAnswers] = useState<AnswerState>(() => {
    return safeQuestions.reduce((acc, question) => {
      acc[question.id] = null;
      return acc;
    }, {} as AnswerState);
  });
  const [checked, setChecked] = useState(false);
  const [showExplanations, setShowExplanations] = useState(true);

  const score = useMemo(() => {
    if (!checked || safeQuestions.length === 0) return 0;
    return safeQuestions.reduce((acc, question) => {
      const answer = answers[question.id];
      if (answer === question.correctIndex) return acc + 1;
      return acc;
    }, 0);
  }, [answers, checked, safeQuestions]);

  const total = safeQuestions.length;
  const accuracy = total > 0 && checked ? Math.round((score / total) * 100) : 0;

  const handleCheck = () => {
    if (checked || total === 0) return;
    const computedScore = safeQuestions.reduce((acc, question) => {
      const answer = answers[question.id];
      if (answer === question.correctIndex) return acc + 1;
      return acc;
    }, 0);
    const computedAccuracy = Math.round((computedScore / total) * 100);
    const mistakes = safeQuestions
      .filter((question) => {
        const answer = answers[question.id];
        return answer !== null && answer !== question.correctIndex;
      })
      .map((question) => {
        const selectedIndex = answers[question.id];
        const selected =
          typeof selectedIndex === "number"
            ? question.options[selectedIndex] ?? "No answer"
            : "No answer";
        const correct = question.options[question.correctIndex] ?? "Correct answer";
        return {
          id: question.id,
          topic,
          question: question.question,
          correctAnswer: correct,
          selectedAnswer: selected,
          timestamp: new Date().toISOString(),
        };
      });
    recordQuizResult(computedAccuracy, mistakes);
    setChecked(true);
  };

  const handleLesson = () => {
    sendThreadMessage(
      `Give me a short lesson card on ${topic} at a ${skillLevel} level, then a 3-question quiz.`,
    );
  };

  const handleReview = () => {
    const wrong = safeQuestions.filter(
      (question) => answers[question.id] !== null && answers[question.id] !== question.correctIndex,
    );
    if (wrong.length === 0) {
      sendThreadMessage(
        `I got everything right on the ${topic} quiz. Give me deeper explanations for each question.`,
      );
      return;
    }
    const details = wrong
      .map((question) => {
        const selectedIndex = answers[question.id];
        const selected =
          typeof selectedIndex === "number"
            ? question.options[selectedIndex] ?? "No answer"
            : "No answer";
        const correct = question.options[question.correctIndex] ?? "Correct answer";
        return `Q: ${question.question} | My answer: ${selected} | Correct: ${correct}`;
      })
      .join(" || ");
    sendThreadMessage(
      `Review my wrong answers for the ${topic} quiz with detailed explanations. ${details}`,
    );
  };

  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-600">
            Adaptive Quiz
          </p>
          <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">Topic: {topic}</p>
        </div>
        <div className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
          {checked ? `Score ${score}/${total}` : "Answer all questions"}
        </div>
      </div>

      <div className="mt-6 space-y-6">
        {safeQuestions.map((question, index) => {
          const selectedIndex = answers[question.id];
          const isCorrect = selectedIndex === question.correctIndex;
          const safeOptions = Array.isArray(question.options)
            ? question.options
            : [];

          return (
            <div key={`${question.id}-${index}`} className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
                  {index + 1}
                </div>
                <div>
                  <p className="text-base font-medium text-gray-900">
                    {question.question}
                  </p>
                  {checked && (
                    <p
                      className={`mt-1 text-sm ${isCorrect ? "text-emerald-600" : "text-rose-500"
                        }`}
                    >
                      {isCorrect ? "Correct" : "Needs revision"}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {safeOptions.map((option, optionIndex) => {
                  const isSelected = selectedIndex === optionIndex;
                  const showCorrect = checked && optionIndex === question.correctIndex;
                  const showWrong = checked && isSelected && !showCorrect;

                  return (
                    <button
                      key={`${question.id}-${optionIndex}`}
                      type="button"
                      onClick={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          [question.id]: optionIndex,
                        }))
                      }
                      className={`rounded-xl border px-4 py-3 text-left text-sm transition ${isSelected
                        ? "border-emerald-400 bg-emerald-50"
                        : "border-gray-200 bg-white hover:border-emerald-300"
                        } ${showCorrect
                          ? "border-emerald-500 bg-emerald-100"
                          : ""
                        } ${showWrong ? "border-rose-400 bg-rose-50" : ""}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {checked && showExplanations && question.explanation && (
                <div className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-600">
                  <span className="font-semibold text-gray-800">Why:</span>{" "}
                  {question.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleCheck}
            className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Check answers
          </button>
          <button
            type="button"
            onClick={handleLesson}
            disabled={!isIdle}
            className="rounded-full border border-emerald-200 px-4 py-2 text-xs font-semibold text-emerald-700 transition hover:border-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Need a quick lesson
          </button>
        </div>

        {checked && (
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span className="font-semibold text-gray-900">Accuracy</span>
            <div className="h-2 w-32 rounded-full bg-gray-200">
              <div
                className="h-2 rounded-full bg-emerald-500"
                style={{ width: `${accuracy}%` }}
              />
            </div>
            <span className="font-semibold text-emerald-600">{accuracy}%</span>
            <button
              type="button"
              onClick={() => setShowExplanations((prev) => !prev)}
              className="rounded-full border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-700 transition hover:border-emerald-300"
            >
              {showExplanations ? "Hide explanations" : "Show explanations"}
            </button>
            <button
              type="button"
              onClick={handleReview}
              disabled={!isIdle}
              className="rounded-full border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-700 transition hover:border-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Review mistakes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
