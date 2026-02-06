"use client";

import { useEffect, useState } from "react";
import {
  loadStudyStats,
  recordStudySession,
  recordQuizScore,
  recordQuizResult,
  subscribeStudyStats,
  type StudyStats,
} from "@/lib/study-stats";

export const useStudyStats = () => {
  const [stats, setStats] = useState<StudyStats>(() => loadStudyStats());

  useEffect(() => {
    setStats(loadStudyStats());
    const unsubscribe = subscribeStudyStats((nextStats) => {
      setStats(nextStats);
    });
    return unsubscribe;
  }, []);

  return {
    stats,
    recordStudySession: () => setStats(recordStudySession()),
    recordQuizScore: (score: number) => setStats(recordQuizScore(score)),
    recordQuizResult: (score: number, mistakes: Parameters<typeof recordQuizResult>[1]) =>
      setStats(recordQuizResult(score, mistakes)),
  };
};
