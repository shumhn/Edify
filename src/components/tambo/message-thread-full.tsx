"use client";

import type { messageVariants } from "@/components/tambo/message";
import {
  MessageInput,
  MessageInputError,
  MessageInputFileButton,
  MessageInputMcpPromptButton,
  MessageInputMcpResourceButton,
  MessageInputSubmitButton,
  MessageInputTextarea,
  MessageInputToolbar,
} from "@/components/tambo/message-input";
import {
  MessageSuggestions,
  MessageSuggestionsList,
  MessageSuggestionsStatus,
} from "@/components/tambo/message-suggestions";
import { ScrollableMessageContainer } from "@/components/tambo/scrollable-message-container";
import { MessageInputMcpConfigButton } from "@/components/tambo/message-input";
import { ThreadContainer, useThreadContainerContext } from "./thread-container";
import {
  ThreadContent,
  ThreadContentMessages,
} from "@/components/tambo/thread-content";
import {
  ThreadHistory,
  ThreadHistoryHeader,
  ThreadHistoryList,
  ThreadHistoryNewButton,
  ThreadHistorySearch,
} from "@/components/tambo/thread-history";
import { useMergeRefs } from "@/lib/thread-hooks";
import type { Suggestion } from "@tambo-ai/react";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { StudentIdentityBar } from "@/components/study/student-identity-bar";
import { ContextAttachmentsBar } from "@/components/study/context-attachments-bar";
import { useUserProfile } from "@/hooks/use-user-profile";
import { DiagnosticStartCard } from "@/components/study/diagnostic-start-card";
import { SubjectTrackCard } from "@/components/study/subject-track-card";
import { useTambo } from "@tambo-ai/react";

/**
 * Props for the MessageThreadFull component
 */
export interface MessageThreadFullProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Controls the visual styling of messages in the thread.
   * Possible values include: "default", "compact", etc.
   * These values are defined in messageVariants from "@/components/tambo/message".
   * @example variant="compact"
   */
  variant?: VariantProps<typeof messageVariants>["variant"];
  initialSubject?: string;
  autoStartSubject?: boolean;
  modeOverride?: "exam" | "learn";
}

/**
 * A full-screen chat thread component with message history, input, and suggestions
 */
export const MessageThreadFull = React.forwardRef<
  HTMLDivElement,
  MessageThreadFullProps
>(
  (
    { className, variant, initialSubject, autoStartSubject, modeOverride, ...props },
    ref,
  ) => {
  const { containerRef, historyPosition } = useThreadContainerContext();
  const mergedRef = useMergeRefs<HTMLDivElement | null>(ref, containerRef);
  const { thread } = useTambo();
  const hasUserMessage = thread?.messages?.some(
    (message) => message.role === "user",
  );

  const threadHistorySidebar = (
    <ThreadHistory position={historyPosition}>
      <ThreadHistoryHeader />
      <ThreadHistoryNewButton />
      <ThreadHistorySearch />
      <ThreadHistoryList />
    </ThreadHistory>
  );

  const { profile } = useUserProfile();
  const learningMode = modeOverride ?? profile.learningMode ?? "exam";
  const focusSubject = profile.focusSubject;
  const effectiveSubject = focusSubject ?? initialSubject;

  const subjectPalette: Record<
    string,
    {
      quiz: string;
      formula: string;
      examples: string;
      weakTopics: string;
      roadmap: string;
      mastery: string;
      topicList: string;
    }
  > = {
    Physics: {
      quiz: "Quiz me on electromagnetism and explain wrong answers.",
      formula: "Explain Maxwell's equations with formulas, variables, and an example.",
      examples: "Show real-world applications of electromagnetic induction.",
      weakTopics: "Vectors, Magnetism, Induction, Waves, and Energy.",
      roadmap: "Create a 4-week roadmap for Physics covering Mechanics, Waves, E&M, and Optics.",
      mastery: "Show a mastery heatmap for Mechanics, Waves, E&M, and Optics over Weeks 1-4.",
      topicList: "Show the Physics topic list for engineering exam prep.",
    },
    Math: {
      quiz: "Quiz me on differentiation and integration basics with explanations.",
      formula: "Explain integration rules with formulas, variables, and an example.",
      examples: "Show real-world applications of calculus in engineering.",
      weakTopics: "Limits, Differentiation, Integration, Vectors, and Probability.",
      roadmap: "Create a 4-week Math roadmap covering Calculus, Algebra, and Probability.",
      mastery: "Show a mastery heatmap for Calculus, Algebra, and Probability over Weeks 1-4.",
      topicList: "Show the Math topic list for engineering exam prep.",
    },
    Chemistry: {
      quiz: "Quiz me on chemical equilibrium and Le Chatelier's principle with explanations.",
      formula: "Explain the Arrhenius equation with variables and an example.",
      examples: "Show real-world applications of chemical equilibrium.",
      weakTopics: "Equilibrium, Thermodynamics, Kinetics, Redox, and Solutions.",
      roadmap: "Create a 4-week Chemistry roadmap covering Equilibrium, Thermo, and Organic basics.",
      mastery: "Show a mastery heatmap for Equilibrium, Thermo, Kinetics, and Organic over Weeks 1-4.",
      topicList: "Show the Chemistry topic list for engineering exam prep.",
    },
    "Computer Science": {
      quiz: "Quiz me on data structures (arrays, stacks, queues) with explanations.",
      formula: "Explain Big-O time complexity with a worked example.",
      examples: "Show real-world applications of algorithms and data structures.",
      weakTopics: "DSA, OOP, DBMS, OS, and Networks.",
      roadmap: "Create a 4-week CS roadmap covering DSA, OS, DBMS, and Networks.",
      mastery: "Show a mastery heatmap for DSA, OOP, DBMS, OS across Weeks 1-4.",
      topicList: "Show the Computer Science topic list for engineering exam prep.",
    },
  };

  const subjectKey = effectiveSubject ?? "Physics";
  const placeholderSubject = effectiveSubject ?? "a subject";
  const subjectSpec = subjectPalette[subjectKey] ?? subjectPalette.Physics;

  const buildExamSuggestions = (): Suggestion[] => [
    {
      id: "exam-plan",
      title: "Study plan",
      detailedSuggestion: `I have 14 days before my ${subjectKey} exam. Build a daily study plan with quizzes.`,
      messageId: "study-plan",
    },
    {
      id: "exam-quiz",
      title: "Quick quiz",
      detailedSuggestion: subjectSpec.quiz,
      messageId: "quick-quiz",
    },
    {
      id: "exam-formula",
      title: "Formula card",
      detailedSuggestion: subjectSpec.formula,
      messageId: "formula-card",
    },
    {
      id: "exam-progress",
      title: "Progress dashboard",
      detailedSuggestion: `Create a progress dashboard for ${subjectKey}: score 62%, target 75%, streak 4 days, 210 minutes this week.`,
      messageId: "progress-dashboard",
    },
    {
      id: "exam-completion",
      title: "Completion chart",
      detailedSuggestion: "Show a 30-day completion chart for my study plan.",
      messageId: "completion-chart",
    },
    {
      id: "exam-intake",
      title: "Intake form",
      detailedSuggestion:
        "Create a quick intake form to capture subject, exam date, weakest topic, and daily study minutes.",
      messageId: "intake-form",
    },
    {
      id: "exam-examples",
      title: "Real-world examples",
      detailedSuggestion: subjectSpec.examples,
      messageId: "real-world-examples",
    },
    {
      id: "exam-insight",
      title: "Coach insight",
      detailedSuggestion:
        "My recent accuracy is 72%, streak 4 days, 210 minutes this week. Give me a coaching insight.",
      messageId: "coach-insight",
    },
    {
      id: "exam-readiness",
      title: "Readiness score",
      detailedSuggestion: "Give me an exam readiness score based on my recent quiz results.",
      messageId: "readiness-score",
    },
    {
      id: "exam-radar",
      title: "Weak-topic radar",
      detailedSuggestion: `Show a weak-topic radar chart for ${subjectKey} with scores for ${subjectSpec.weakTopics}`,
      messageId: "weak-topic-radar",
    },
    {
      id: "exam-roadmap",
      title: "Roadmap",
      detailedSuggestion: subjectSpec.roadmap,
      messageId: "roadmap",
    },
    {
      id: "exam-mastery",
      title: "Mastery matrix",
      detailedSuggestion: subjectSpec.mastery,
      messageId: "mastery-matrix",
    },
    {
      id: "exam-mistakes",
      title: "Mistake bank",
      detailedSuggestion: "Show my mistake bank and help me retry the weakest topics.",
      messageId: "mistake-bank",
    },
    {
      id: "exam-chart",
      title: "Chart",
      detailedSuggestion:
        "Show a line chart of my weekly accuracy trend for the last 6 weeks.",
      messageId: "generic-chart",
    },
    {
      id: "exam-topiclist",
      title: "Topic list",
      detailedSuggestion: subjectSpec.topicList,
      messageId: "topic-list",
    },
  ];

  const buildLearnSuggestions = (): Suggestion[] => [
    {
      id: "learn-roadmap",
      title: "Learning roadmap",
      detailedSuggestion: `Help me learn ${subjectKey} from scratch. Create a learning roadmap with practice quizzes.`,
      messageId: "learn-roadmap",
    },
    {
      id: "learn-quiz",
      title: "Quick quiz",
      detailedSuggestion: subjectSpec.quiz,
      messageId: "learn-quiz",
    },
    {
      id: "learn-formula",
      title: "Formula card",
      detailedSuggestion: subjectSpec.formula,
      messageId: "learn-formula",
    },
    {
      id: "learn-progress",
      title: "Progress dashboard",
      detailedSuggestion:
        "Create a progress dashboard: score 62%, target 75%, streak 4 days, 210 minutes this week.",
      messageId: "learn-progress",
    },
    {
      id: "learn-completion",
      title: "Completion chart",
      detailedSuggestion: "Show a 30-day completion chart for my practice sessions.",
      messageId: "learn-completion",
    },
    {
      id: "learn-intake",
      title: "Intake form",
      detailedSuggestion:
        "Create a quick intake form to capture subject, goal, weakest topic, and weekly study time.",
      messageId: "learn-form",
    },
    {
      id: "learn-examples",
      title: "Real-world examples",
      detailedSuggestion: subjectSpec.examples,
      messageId: "learn-apps",
    },
    {
      id: "learn-insight",
      title: "Coach insight",
      detailedSuggestion:
        "My recent accuracy is 72%, streak 4 days, 210 minutes this week. Give me a coaching insight.",
      messageId: "learn-insight",
    },
    {
      id: "learn-readiness",
      title: "Readiness score",
      detailedSuggestion: "Give me a readiness score based on my recent quiz results.",
      messageId: "learn-readiness",
    },
    {
      id: "learn-radar",
      title: "Weak-topic radar",
      detailedSuggestion: `Show a weak-topic radar chart for ${subjectKey} with scores for ${subjectSpec.weakTopics}`,
      messageId: "learn-radar",
    },
    {
      id: "learn-topiclist",
      title: "Topic list",
      detailedSuggestion: subjectSpec.topicList,
      messageId: "learn-topiclist",
    },
    {
      id: "learn-mastery",
      title: "Mastery matrix",
      detailedSuggestion: subjectSpec.mastery,
      messageId: "learn-mastery",
    },
    {
      id: "learn-mistakes",
      title: "Mistake bank",
      detailedSuggestion: "Show my mistake bank and suggest a retry quiz.",
      messageId: "learn-mistake-bank",
    },
    {
      id: "learn-chart",
      title: "Chart",
      detailedSuggestion:
        "Show a bar chart of my study hours across the last 6 sessions.",
      messageId: "learn-chart",
    },
  ];

  const defaultSuggestions =
    learningMode === "learn" ? buildLearnSuggestions() : buildExamSuggestions();

  return (
    <div className="flex h-full w-full">
      {/* Thread History Sidebar - rendered first if history is on the left */}
      {historyPosition === "left" && threadHistorySidebar}

      <ThreadContainer
        ref={mergedRef}
        disableSidebarSpacing
        className={className}
        {...props}
      >
        <div className="px-4 pt-4">
          <StudentIdentityBar />
        </div>
        <ScrollableMessageContainer className="p-4">
          <ThreadContent variant={variant}>
            {!hasUserMessage && (
              <div className="mb-4 space-y-4">
                {effectiveSubject ? (
                  <SubjectTrackCard
                    subjectOverride={effectiveSubject}
                    autoStartOverride={autoStartSubject}
                    modeOverride={learningMode}
                  />
                ) : (
                  <DiagnosticStartCard />
                )}
              </div>
            )}
            <ThreadContentMessages />
          </ThreadContent>
        </ScrollableMessageContainer>

        {/* Message suggestions status */}
        <MessageSuggestions>
          <MessageSuggestionsStatus />
        </MessageSuggestions>

        {/* Message input */}
        <div className="px-4 pb-4">
          <ContextAttachmentsBar />
          <MessageInput>
            <MessageInputTextarea
              placeholder={`Ask for a ${placeholderSubject} plan, quiz, formulas, or progress...`}
            />
            <MessageInputToolbar>
              <MessageInputFileButton />
              <MessageInputMcpPromptButton />
              <MessageInputMcpResourceButton />
              {/* Uncomment this to enable client-side MCP config modal button */}
              <MessageInputMcpConfigButton />
              <MessageInputSubmitButton />
            </MessageInputToolbar>
            <MessageInputError />
          </MessageInput>
        </div>

        {/* Message suggestions */}
        <MessageSuggestions
          initialSuggestions={defaultSuggestions.slice(0, 8)}
          maxSuggestions={8}
          mode="combined"
        >
          <MessageSuggestionsList />
        </MessageSuggestions>
      </ThreadContainer>

      {/* Thread History Sidebar - rendered last if history is on the right */}
      {historyPosition === "right" && threadHistorySidebar}
    </div>
  );
});
MessageThreadFull.displayName = "MessageThreadFull";
