"use client";

import { MessageThreadFull } from "@/components/tambo/message-thread-full";
import { useMcpServers } from "@/components/tambo/mcp-config-modal";
import { components, tools } from "@/lib/tambo";
import {
  TamboProvider,
  currentPageContextHelper,
  currentTimeContextHelper,
  useCurrentInteractablesSnapshot,
} from "@tambo-ai/react";
import { loadUserProfile, saveUserProfile } from "@/lib/user-profile";
import { useUserProfile } from "@/hooks/use-user-profile";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

/**
 * Home page component that renders the Tambo chat interface.
 *
 * @remarks
 * The `NEXT_PUBLIC_TAMBO_URL` environment variable specifies the URL of the Tambo server.
 * You do not need to set it if you are using the default Tambo server.
 * It is only required if you are running the API server locally.
 *
 * @see {@link https://github.com/tambo-ai/tambo/blob/main/CONTRIBUTING.md} for instructions on running the API server locally.
 */
import { Suspense } from "react";

function ChatContent() {
  // Load MCP server configurations
  const mcpServers = useMcpServers();
  const searchParams = useSearchParams();
  const { profile } = useUserProfile();
  const interactablesSnapshot = useCurrentInteractablesSnapshot();
  const allowedSubjects = ["Physics", "Math", "Chemistry", "Computer Science"];
  const subjectParam = searchParams.get("subject");
  const initialSubject =
    subjectParam && allowedSubjects.includes(subjectParam)
      ? subjectParam
      : undefined;
  const autoStartSubject = searchParams.get("autostart") === "1";
  const modeParam = searchParams.get("mode");
  const modeOverride =
    modeParam === "exam" || modeParam === "learn" ? modeParam : undefined;
  const subjectSeed = profile.focusSubject ?? initialSubject;

  useEffect(() => {
    const mode = searchParams.get("mode");
    const subject = searchParams.get("subject");
    const autostart = searchParams.get("autostart");
    const clearSubject = searchParams.get("clearSubject");
    const updates: Partial<ReturnType<typeof loadUserProfile>> = {};

    if (mode === "exam" || mode === "learn") {
      if (mode !== profile.learningMode) updates.learningMode = mode;
    }
    if (clearSubject === "1") {
      if (profile.focusSubject) updates.focusSubject = undefined;
      if (profile.autoStartSubject) updates.autoStartSubject = false;
    }
    if (
      subject &&
      ["Physics", "Math", "Chemistry", "Computer Science"].includes(subject)
    ) {
      if (subject !== profile.focusSubject) updates.focusSubject = subject;
      const shouldAutoStart = autostart === "1";
      if (shouldAutoStart !== profile.autoStartSubject) {
        updates.autoStartSubject = shouldAutoStart;
      }
    }

    if (Object.keys(updates).length > 0) {
      saveUserProfile(updates);
    }
  }, [
    searchParams,
    profile.learningMode,
    profile.focusSubject,
    profile.autoStartSubject,
  ]);

  const learningMode = modeOverride ?? profile.learningMode ?? "exam";
  const modeGuide =
    learningMode === "learn"
      ? [
        "Learning mode is active: do NOT assume an exam deadline.",
        "Ask one short follow-up for preferred pace (sessions/week or total weeks) before creating a StudyPlan.",
        "Focus on learning roadmaps, practice, and concept clarity.",
      ].join(" ")
      : [
        "Exam prep mode is active: you may ask for days until exam.",
        "If user doesn't provide a timeline, you can suggest a 7–14 day plan.",
      ].join(" ");
  const contextHelpers = {
    userTime: currentTimeContextHelper,
    userPage: currentPageContextHelper,
    studyCoachProfile: () => {
      const profile = loadUserProfile();
      return {
        appName: "Edify",
        studentName: profile.name,
        focusSubjects: ["Physics", "Math", "Chemistry", "Computer Science"],
        targetLevel: profile.gradeLevel ?? "Engineering-track +2 (MPC/CS)",
        learningMode: profile.learningMode ?? "exam",
        skillLevel: profile.skillLevel ?? "Intermediate",
        focusSubject: profile.focusSubject,
        examDaysLeft: profile.examDaysLeft,
        paceSessionsPerWeek: profile.paceSessionsPerWeek,
        responseStyle: "concise, component-first",
      };
    },
    currentInteractables: () => {
      return {
        snapshot: interactablesSnapshot,
      };
    },
    userIdentity: () => {
      const profile = loadUserProfile();
      return {
        id: profile.id,
        name: profile.name,
      };
    },
  };
  const initialMessages = useMemo(() => {
    const onboarding =
      learningMode === "learn"
        ? [
          "Onboarding flow:",
          "1) Ask for subject (Physics/Math/Chemistry/Computer Science) and learning goal.",
          "2) Ask skill level (Beginner/Intermediate/Advanced) if missing.",
          "3) Use getStemTopicPack to show key topics and ask their weakest topic.",
          "4) Ask preferred pace (sessions/week or total weeks), then generate StudyPlan and offer a short quiz.",
        ]
        : [
          "Onboarding flow:",
          "1) Ask for subject (Physics/Math/Chemistry/Computer Science) and days until exam.",
          "2) Ask skill level (Beginner/Intermediate/Advanced) if missing.",
          "3) Use getStemTopicPack to show key topics and ask their weakest topic.",
          "4) Generate StudyPlan and offer a short quiz.",
        ];

    const welcomeText =
      learningMode === "learn"
        ? subjectSeed
          ? `Welcome! I’m your ${subjectSeed} learning coach. Tell me your learning goal and pace, and I’ll build quizzes, formulas, progress charts, and a roadmap.`
          : "Welcome! I’m your STEM learning coach. Choose a subject (Physics, Math, Chemistry, or Computer Science) and tell me your learning goal. I can make quizzes, explain formulas, show progress charts, and build a learning roadmap once you share your pace."
        : subjectSeed
          ? `Welcome! I’m your ${subjectSeed} exam coach. Tell me how many days you have before the exam and I’ll build a plan, quizzes, and progress tracking.`
          : "Welcome! I’m your engineering exam coach. Choose a subject (Physics, Math, Chemistry, or Computer Science) and tell me how many days you have before the exam. I can also make a quick quiz, explain formulas, show progress charts, or give real‑world examples.";

    return [
      {
        role: "system" as "system",
        content: [
          {
            type: "text" as "text",
            text: [
              "You are Edify, a STEM learning coach for engineering-track exams (+2 MPC/CS).",
              "Sound professional, friendly, and concise.",
              modeGuide,
              "If context includes a student name, greet them by name.",
              "If the user asks to change their name, tell them to use the Edit button in the identity bar.",
              "If context attachments are provided, incorporate them in the response.",
              "If focusSubject is provided in context, treat it as locked and do not ask to switch subjects unless the user asks.",
              "If focusSubject is set, do not mention or list other subjects; keep all components scoped to that subject.",
              "If learningMode is learn, never ask about exam timelines or deadlines.",
              "If learningMode is exam and examDaysLeft is missing, ask for days until exam before creating a StudyPlan.",
              "Prefer using the registered components to answer:",
              "QuizCard for practice, FormulaCard for formulas, StudyPlan for schedules,",
              "QuizReview for answer explanations and post-quiz review.",
              "ConceptExplainer for conceptual 'why/how' explanations.",
              "ProgressDashboard for tracking, CoachInsight for guidance based on accuracy,",
              "CompletionChart for 30-day completion (use demo data if user doesn't provide),",
              "ApplicationCards for real-world examples and applications.",
              "GaugeCard for gauge-style score or readiness visuals.",
              "TopicListCard to show subject topic lists with clickable chips.",
              "LessonCard for a short concept lesson before practice.",
              "RoadmapTimeline for structured learning roadmaps.",
              "MasteryMatrix for topic mastery heatmaps.",
              "MistakeBank for saved wrong answers and retry actions.",
              "Form for intake or diagnostic questionnaires to collect study preferences.",
              "Graph is a pre-built Tambo component for generic charts (bar/line/area/pie/donut/scatter/histogram/heatmap). Use it when a user asks for a generic chart or trend.",
              "Use tools when needed: buildStudyPlan, scoreQuiz, buildProgressSignal, getStemTopicPack.",
              "When calling getStemTopicPack, always use focusSubject if provided.",
              "If asked for a completion chart and no data is given, render CompletionChart with demo data.",
              "Hard rules (must follow):",
              "• If user asks for quiz or practice: ALWAYS render QuizCard (3–5 questions) with explanations.",
              "• If learning mode is learn and user asks for quiz: render LessonCard first, then QuizCard.",
              "• Adjust quiz difficulty to skill level (Beginner = simple, Intermediate = balanced, Advanced = challenging).",
              "• If user asks to explain answers, review mistakes, or wants detailed explanations: ALWAYS render QuizReview.",
              "• If user asks for formulas or derivations: ALWAYS render FormulaCard with variables and an example.",
              "• If user asks to explain a concept, asks a 'why/how' question, or wants conceptual reasoning: ALWAYS render ConceptExplainer.",
              "• If user asks for a lesson, primer, or 'teach me': ALWAYS render LessonCard.",
              "• If user asks for plan/schedule: ALWAYS render StudyPlan once pace is known; keep text brief.",
              "• If user asks for a roadmap, learning path, or curriculum: ALWAYS render RoadmapTimeline.",
              "• If user asks for mastery heatmap or matrix: ALWAYS render MasteryMatrix.",
              "• If user asks to review mistakes, wrong answers, or error log: ALWAYS render MistakeBank.",
              "• If user asks for progress/graph/chart: ALWAYS render CompletionChart or ProgressDashboard; never respond with only text.",
              "• If user asks for a generic chart/trend without completion context: render Graph.",
              "• If user asks for real-world applications/examples: ALWAYS render ApplicationCards.",
              "• If user asks for coaching insight or next steps with metrics: ALWAYS render CoachInsight.",
              "• If user asks for readiness, confidence, or exam score: ALWAYS render ReadinessScore.",
              "If readiness metrics are not provided, omit score/status so ReadinessScore can use live quiz stats.",
              "• If user asks for a gauge chart or speedometer-style score: ALWAYS render GaugeCard.",
              "• If user asks for weak topics, topic mastery, or radar chart: ALWAYS render WeakTopicRadar.",
              "• If user asks for an intake form, signup form, or diagnostic questionnaire: ALWAYS render Form.",
              "• If user asks for topics/syllabus/chapters list or diagnostic: ALWAYS render TopicListCard (use getStemTopicPack).",
              "• Keep text under 4 lines if a component is rendered.",
            ].join(" "),
          },
        ],
      },
      {
        role: "assistant" as "assistant",
        content: [
          {
            type: "text" as "text",
            text: welcomeText,
          },
        ],
      },
    ];
  }, [learningMode, modeGuide, subjectSeed]);

  return (
    <TamboProvider
      apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
      components={components}
      tools={tools}
      tamboUrl={process.env.NEXT_PUBLIC_TAMBO_URL}
      mcpServers={mcpServers}
      contextHelpers={contextHelpers}
      initialMessages={initialMessages}
      autoGenerateThreadName={false}
      key={learningMode}
    >
      <div className="h-screen">
        <MessageThreadFull
          className="max-w-4xl mx-auto"
          initialSubject={initialSubject}
          autoStartSubject={autoStartSubject}
          modeOverride={modeOverride}
        />
      </div>
    </TamboProvider>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading coach...</div>}>
      <ChatContent />
    </Suspense>
  );
}
