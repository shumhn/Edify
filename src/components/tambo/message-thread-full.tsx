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
import { SmartSuggestions } from "@/components/study/smart-suggestions";
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

  const subjectKey = effectiveSubject ?? "Physics";
  const placeholderSubject = effectiveSubject ?? "a subject";

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

        <SmartSuggestions subject={subjectKey} mode={learningMode} />
      </ThreadContainer>

      {/* Thread History Sidebar - rendered last if history is on the right */}
      {historyPosition === "right" && threadHistorySidebar}
    </div>
  );
});
MessageThreadFull.displayName = "MessageThreadFull";
