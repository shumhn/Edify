/**
 * @file tambo.ts
 * @description Central configuration file for Tambo components and tools
 *
 * This file serves as the central place to register your Tambo components and tools.
 * It exports arrays that will be used by the TamboProvider.
 *
 * Read more about Tambo at https://tambo.co/docs
 */

import { Graph, graphSchema } from "@/components/tambo/graph";
import { FormComponent, formSchema } from "@/components/tambo/form";
import { FormulaCard, formulaCardSchema } from "@/components/study/formula-card";
import {
  CoachInsight,
  coachInsightSchema,
} from "@/components/study/coach-insight";
import {
  CompletionChart,
  completionChartSchema,
} from "@/components/study/completion-chart";
import {
  ApplicationCards,
  applicationCardsSchema,
} from "@/components/study/application-cards";
import {
  InteractableProgressDashboard,
  progressDashboardSchema,
} from "@/components/study/progress-dashboard";
import {
  ReadinessScore,
  readinessScoreSchema,
} from "@/components/study/readiness-score";
import { GaugeCard, gaugeCardSchema } from "@/components/study/gauge-card";
import {
  WeakTopicRadar,
  weakTopicRadarSchema,
} from "@/components/study/weak-topic-radar";
import { QuizCard, quizCardSchema } from "@/components/study/quiz-card";
import { QuizReview, quizReviewSchema } from "@/components/study/quiz-review";
import { StudyPlan, studyPlanSchema } from "@/components/study/study-plan";
import { LessonCard, lessonCardSchema } from "@/components/study/lesson-card";
import {
  RoadmapTimeline,
  roadmapTimelineSchema,
} from "@/components/study/roadmap-timeline";
import {
  MasteryMatrix,
  masteryMatrixSchema,
} from "@/components/study/mastery-matrix";
import { MistakeBank, mistakeBankSchema } from "@/components/study/mistake-bank";
import {
  TopicListCard,
  topicListCardSchema,
} from "@/components/study/topic-list-card";
import {
  ConceptExplainer,
  conceptExplainerSchema,
} from "@/components/study/concept-explainer";
import {
  buildProgressSignal,
  buildStudyPlan,
  getStemTopicPack,
  scoreQuiz,
} from "@/services/study-tools";
import type { TamboComponent } from "@tambo-ai/react";
import { TamboTool } from "@tambo-ai/react";
import { z } from "zod";

/**
 * tools
 *
 * This array contains all the Tambo tools that are registered for use within the application.
 * Each tool is defined with its name, description, and expected props. The tools
 * can be controlled by AI to dynamically fetch data based on user interactions.
 */

export const tools: TamboTool[] = [
  {
    name: "scoreQuiz",
    description:
      "Score quiz answers and return accuracy with a list of incorrect question IDs.",
    tool: scoreQuiz,
    inputSchema: z.object({
      answers: z.array(
        z.object({
          questionId: z.string(),
          selectedIndex: z.number(),
          correctIndex: z.number(),
        }),
      ),
    }),
    outputSchema: z.object({
      total: z.number(),
      correct: z.number(),
      accuracy: z.number(),
      incorrectQuestionIds: z.array(z.string()),
    }),
  },
  {
    name: "buildStudyPlan",
    description:
      "Create a multi-day STEM study plan based on subject, topics, and time available.",
    tool: buildStudyPlan,
    inputSchema: z.object({
      subject: z.string(),
      focusTopics: z.array(z.string()).optional(),
      days: z.number(),
      dailyMinutes: z.number(),
    }),
    outputSchema: z.object({
      goal: z.string(),
      days: z.number(),
      dailyMinutes: z.number(),
      plan: z.array(
        z.object({
          day: z.number(),
          focus: z.string(),
          tasks: z.array(z.string()),
        }),
      ),
    }),
  },
  {
    name: "buildProgressSignal",
    description:
      "Generate a mastery signal and coaching tip from recent accuracy and study streaks.",
    tool: buildProgressSignal,
    inputSchema: z.object({
      recentAccuracy: z.number(),
      streakDays: z.number(),
      minutesStudiedThisWeek: z.number(),
    }),
    outputSchema: z.object({
      masteryLevel: z.enum(["starter", "steady", "accelerating", "exam-ready"]),
      nextTarget: z.string(),
      coachingTip: z.string(),
    }),
  },
  {
    name: "getStemTopicPack",
    description:
      "Fetch a STEM topic pack for Physics, Math, Chemistry, or Computer Science.",
    tool: getStemTopicPack,
    inputSchema: z.object({
      subject: z.enum(["Physics", "Math", "Chemistry", "Computer Science"]),
    }),
    outputSchema: z.object({
      subject: z.string(),
      topics: z.array(z.string()),
    }),
  },
  // Add more tools here
];

/**
 * components
 *
 * This array contains all the Tambo components that are registered for use within the application.
 * Each component is defined with its name, description, and expected props. The components
 * can be controlled by AI to dynamically render UI elements based on user interactions.
 */
export const components: TamboComponent[] = [
  {
    name: "Graph",
    description:
      "A component that renders various types of charts (bar, line, area, pie, donut, scatter, histogram, heatmap) using Recharts. Supports customizable data visualization with labels, datasets, and styling options.",
    component: Graph,
    propsSchema: graphSchema,
  },
  {
    name: "Form",
    description:
      "Pre-built Tambo form component for collecting structured inputs like study goals, weak topics, and time availability.",
    component: FormComponent,
    propsSchema: formSchema,
  },
  {
    name: "QuizCard",
    description:
      "Interactive quiz card for adaptive study sessions with instant feedback and explanations.",
    component: QuizCard,
    propsSchema: quizCardSchema,
  },
  {
    name: "QuizReview",
    description:
      "Answer explanations for a completed quiz. Use when the user asks to explain answers or review mistakes.",
    component: QuizReview,
    propsSchema: quizReviewSchema,
  },
  {
    name: "ConceptExplainer",
    description:
      "Explains a physics/chemistry/math concept or a 'why/how' question with key reasons, formula, example, and exam tip.",
    component: ConceptExplainer,
    propsSchema: conceptExplainerSchema,
  },
  {
    name: "FormulaCard",
    description:
      "Formula breakdown card with variables, explanation, and worked example.",
    component: FormulaCard,
    propsSchema: formulaCardSchema,
  },
  {
    name: "LessonCard",
    description:
      "Short lesson card with key points, optional formula, and a worked example.",
    component: LessonCard,
    propsSchema: lessonCardSchema,
  },
  {
    name: "RoadmapTimeline",
    description:
      "Learning roadmap timeline with staged focus areas and tasks.",
    component: RoadmapTimeline,
    propsSchema: roadmapTimelineSchema,
  },
  {
    name: "MasteryMatrix",
    description:
      "Heatmap matrix of topic mastery across weeks.",
    component: MasteryMatrix,
    propsSchema: masteryMatrixSchema,
  },
  {
    name: "MistakeBank",
    description:
      "Mistake bank of incorrect answers with retry actions.",
    component: MistakeBank,
    propsSchema: mistakeBankSchema,
  },
  {
    name: "ProgressDashboard",
    description:
      "Study progress dashboard with streaks, weekly minutes, and mastery targets.",
    component: InteractableProgressDashboard,
    propsSchema: progressDashboardSchema,
  },
  {
    name: "CoachInsight",
    description:
      "Insight card with mastery level, next target, and coaching tip based on recent quiz performance.",
    component: CoachInsight,
    propsSchema: coachInsightSchema,
  },
  {
    name: "CompletionChart",
    description:
      "Daily study completion chart (30-day view). Uses demo data if none provided.",
    component: CompletionChart,
    propsSchema: completionChartSchema,
  },
  {
    name: "ApplicationCards",
    description:
      "Cards showing real-world applications or examples for a concept.",
    component: ApplicationCards,
    propsSchema: applicationCardsSchema,
  },
  {
    name: "ReadinessScore",
    description:
      "Exam readiness score card with status, next steps, and focus areas.",
    component: ReadinessScore,
    propsSchema: readinessScoreSchema,
  },
  {
    name: "GaugeCard",
    description:
      "Gauge chart for a quick score or readiness indicator (0–100).",
    component: GaugeCard,
    propsSchema: gaugeCardSchema,
  },
  {
    name: "TopicListCard",
    description:
      "Topic list card for a subject with clickable chips to start a plan or quiz.",
    component: TopicListCard,
    propsSchema: topicListCardSchema,
  },
  {
    name: "WeakTopicRadar",
    description:
      "Radar chart of topic mastery to highlight weak areas for revision.",
    component: WeakTopicRadar,
    propsSchema: weakTopicRadarSchema,
  },
  {
    name: "StudyPlan",
    description:
      "Adaptive multi-day study plan with daily focus and tasks (interactable).",
    component: StudyPlan,
    propsSchema: studyPlanSchema,
  },
  // Add more components here
];
