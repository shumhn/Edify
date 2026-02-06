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
}

/**
 * A full-screen chat thread component with message history, input, and suggestions
 */
export const MessageThreadFull = React.forwardRef<
  HTMLDivElement,
  MessageThreadFullProps
>(({ className, variant, ...props }, ref) => {
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
  const learningMode = profile.learningMode ?? "exam";

  const examSuggestions: Suggestion[] = [
    {
      id: "suggestion-1",
      title: "Study plan",
      detailedSuggestion:
        "I have 14 days before my engineering entrance exam. Build a daily STEM study plan with quizzes.",
      messageId: "study-plan",
    },
    {
      id: "suggestion-2",
      title: "Quick quiz",
      detailedSuggestion:
        "Quiz me on electromagnetism and explain wrong answers.",
      messageId: "quick-quiz",
    },
    {
      id: "suggestion-3",
      title: "Formula card",
      detailedSuggestion:
        "Explain Maxwell's equations with formulas, variables, and an example.",
      messageId: "formula-card",
    },
    {
      id: "suggestion-4",
      title: "Progress dashboard",
      detailedSuggestion:
        "Create a progress dashboard for Physics: score 62%, target 75%, streak 4 days, 210 minutes this week, topics mastered: Vectors, Newton's Laws.",
      messageId: "progress-dashboard",
    },
    {
      id: "suggestion-5",
      title: "Completion chart",
      detailedSuggestion:
        "Show a 30-day completion chart for my study plan.",
      messageId: "completion-chart",
    },
    {
      id: "suggestion-6",
      title: "Real-world examples",
      detailedSuggestion:
        "Show real-world applications of electromagnetic induction.",
      messageId: "real-world-examples",
    },
    {
      id: "suggestion-7",
      title: "Coach insight",
      detailedSuggestion:
        "My recent accuracy is 72%, streak 4 days, 210 minutes this week. Give me a coaching insight.",
      messageId: "coach-insight",
    },
    {
      id: "suggestion-8",
      title: "Readiness score",
      detailedSuggestion:
        "Give me an exam readiness score based on my recent quiz results.",
      messageId: "readiness-score",
    },
    {
      id: "suggestion-9",
      title: "Weak-topic radar",
      detailedSuggestion:
        "Show a weak-topic radar chart for Physics with scores for Vectors, Magnetism, Induction, Waves, and Energy.",
      messageId: "weak-topic-radar",
    },
    {
      id: "suggestion-10",
      title: "Intake form",
      detailedSuggestion:
        "Create a quick intake form to capture subject, exam date, weakest topic, and daily study minutes.",
      messageId: "intake-form",
    },
    {
      id: "suggestion-11",
      title: "Pie chart",
      detailedSuggestion:
        "Create a pie chart showing my weekly study time split: Physics 40%, Math 30%, Chemistry 20%, Computer Science 10%.",
      messageId: "pie-chart",
    },
    {
      id: "suggestion-12",
      title: "CS quiz",
      detailedSuggestion:
        "Quiz me on data structures and algorithms (arrays, stacks, queues) with explanations.",
      messageId: "cs-quiz",
    },
    {
      id: "suggestion-13",
      title: "Area chart",
      detailedSuggestion:
        "Show an area chart of my weekly accuracy trend for Physics, Math, and Chemistry over 6 weeks.",
      messageId: "area-chart",
    },
    {
      id: "suggestion-14",
      title: "Gauge chart",
      detailedSuggestion:
        "Show a gauge chart for my readiness score at 72% with status 'On track'.",
      messageId: "gauge-chart",
    },
    {
      id: "suggestion-15",
      title: "Donut chart",
      detailedSuggestion:
        "Create a donut chart of my revision focus split: Mechanics 35%, Calculus 25%, Thermodynamics 20%, DSA 20%.",
      messageId: "donut-chart",
    },
    {
      id: "suggestion-16",
      title: "Scatter plot",
      detailedSuggestion:
        "Show a scatter plot of my study hours vs quiz accuracy for the last 12 sessions.",
      messageId: "scatter-plot",
    },
    {
      id: "suggestion-17",
      title: "Histogram",
      detailedSuggestion:
        "Show a histogram of my last 12 quiz scores (0-100).",
      messageId: "histogram",
    },
    {
      id: "suggestion-18",
      title: "Heatmap",
      detailedSuggestion:
        "Show a heatmap of topic mastery for Mechanics, Calculus, Thermodynamics, and DSA over Weeks 1-4.",
      messageId: "heatmap",
    },
    {
      id: "suggestion-19",
      title: "Math drill",
      detailedSuggestion:
        "Quiz me on differentiation and integration basics with explanations.",
      messageId: "math-drill",
    },
    {
      id: "suggestion-20",
      title: "Chem quiz",
      detailedSuggestion:
        "Quiz me on chemical equilibrium and Le Chatelier's principle with explanations.",
      messageId: "chem-quiz",
    },
    {
      id: "suggestion-21",
      title: "CS topics",
      detailedSuggestion:
        "Show the Computer Science topic list for engineering exam prep.",
      messageId: "cs-topics",
    },
    {
      id: "suggestion-22",
      title: "Roadmap",
      detailedSuggestion:
        "Create a 4-week roadmap for Physics covering Mechanics, Waves, E&M, and Optics.",
      messageId: "roadmap",
    },
    {
      id: "suggestion-23",
      title: "Mastery matrix",
      detailedSuggestion:
        "Show a mastery heatmap for Mechanics, Calculus, Thermodynamics, and DSA over Weeks 1-4.",
      messageId: "mastery-matrix",
    },
    {
      id: "suggestion-24",
      title: "Mistake bank",
      detailedSuggestion:
        "Show my mistake bank and help me retry the weakest topics.",
      messageId: "mistake-bank",
    },
  ];

  const learnSuggestions: Suggestion[] = [
    {
      id: "learn-1",
      title: "Learning roadmap",
      detailedSuggestion:
        "Help me learn Data Structures from scratch. Create a learning roadmap with practice quizzes.",
      messageId: "learn-roadmap",
    },
    {
      id: "learn-2",
      title: "Quick quiz",
      detailedSuggestion:
        "Quiz me on stacks and queues with explanations.",
      messageId: "learn-quiz",
    },
    {
      id: "learn-3",
      title: "Formula card",
      detailedSuggestion:
        "Explain differentiation rules with formulas, variables, and an example.",
      messageId: "learn-formula",
    },
    {
      id: "learn-4",
      title: "Progress dashboard",
      detailedSuggestion:
        "Create a progress dashboard: score 62%, target 75%, streak 4 days, 210 minutes this week.",
      messageId: "learn-progress",
    },
    {
      id: "learn-5",
      title: "Completion chart",
      detailedSuggestion:
        "Show a 30-day completion chart for my practice sessions.",
      messageId: "learn-completion",
    },
    {
      id: "learn-6",
      title: "Real-world examples",
      detailedSuggestion:
        "Show real-world applications of algorithms.",
      messageId: "learn-apps",
    },
    {
      id: "learn-7",
      title: "Coach insight",
      detailedSuggestion:
        "My recent accuracy is 72%, streak 4 days, 210 minutes this week. Give me a coaching insight.",
      messageId: "learn-insight",
    },
    {
      id: "learn-8",
      title: "Readiness score",
      detailedSuggestion:
        "Give me a readiness score based on my recent quiz results.",
      messageId: "learn-readiness",
    },
    {
      id: "learn-9",
      title: "Weak-topic radar",
      detailedSuggestion:
        "Show a weak-topic radar chart for Computer Science with scores for DSA, OOP, DBMS, OS, Networks.",
      messageId: "learn-radar",
    },
    {
      id: "learn-10",
      title: "Intake form",
      detailedSuggestion:
        "Create a quick intake form to capture subject, goal, weakest topic, and weekly study time.",
      messageId: "learn-form",
    },
    {
      id: "learn-11",
      title: "Pie chart",
      detailedSuggestion:
        "Create a pie chart showing my weekly study time split: Physics 40%, Math 30%, Chemistry 20%, Computer Science 10%.",
      messageId: "learn-pie",
    },
    {
      id: "learn-12",
      title: "Area chart",
      detailedSuggestion:
        "Show an area chart of my weekly accuracy trend for Physics, Math, and Chemistry over 6 weeks.",
      messageId: "learn-area",
    },
    {
      id: "learn-13",
      title: "Gauge chart",
      detailedSuggestion:
        "Show a gauge chart for my mastery score at 72% with status 'On track'.",
      messageId: "learn-gauge",
    },
    {
      id: "learn-14",
      title: "Scatter plot",
      detailedSuggestion:
        "Show a scatter plot of my study hours vs quiz accuracy for the last 12 sessions.",
      messageId: "learn-scatter",
    },
    {
      id: "learn-15",
      title: "Histogram",
      detailedSuggestion:
        "Show a histogram of my last 12 quiz scores (0-100).",
      messageId: "learn-histogram",
    },
    {
      id: "learn-16",
      title: "Heatmap",
      detailedSuggestion:
        "Show a heatmap of topic mastery for Mechanics, Calculus, Thermodynamics, and DSA over Weeks 1-4.",
      messageId: "learn-heatmap",
    },
    {
      id: "learn-17",
      title: "Math drill",
      detailedSuggestion:
        "Quiz me on differentiation and integration basics with explanations.",
      messageId: "learn-math",
    },
    {
      id: "learn-18",
      title: "Chem quiz",
      detailedSuggestion:
        "Quiz me on chemical equilibrium and Le Chatelier's principle with explanations.",
      messageId: "learn-chem",
    },
    {
      id: "learn-19",
      title: "CS topics",
      detailedSuggestion:
        "Show the Computer Science topic list for beginner learners.",
      messageId: "learn-cs-topics",
    },
    {
      id: "learn-20",
      title: "Roadmap",
      detailedSuggestion:
        "Create a 6-week learning roadmap for Data Structures and Algorithms.",
      messageId: "learn-roadmap-2",
    },
    {
      id: "learn-21",
      title: "Mastery matrix",
      detailedSuggestion:
        "Show a mastery heatmap for DSA, OOP, DBMS, OS across Weeks 1-4.",
      messageId: "learn-mastery",
    },
    {
      id: "learn-22",
      title: "Mistake bank",
      detailedSuggestion:
        "Show my mistake bank and suggest a retry quiz.",
      messageId: "learn-mistake-bank",
    },
  ];

  const defaultSuggestions =
    learningMode === "learn" ? learnSuggestions : examSuggestions;

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
              <div className="mb-4">
                <DiagnosticStartCard />
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
            <MessageInputTextarea placeholder="Choose a subject or ask for a plan, quiz, formulas, or progress..." />
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
          initialSuggestions={defaultSuggestions}
          maxSuggestions={learningMode === "learn" ? 22 : 24}
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
