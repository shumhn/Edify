export type StudyStats = {
  streakDays: number;
  lastStudyDate?: string;
  quizScores: number[];
  totalSessions: number;
  mistakes: MistakeItem[];
};

export type MistakeItem = {
  id: string;
  topic: string;
  question: string;
  correctAnswer: string;
  selectedAnswer: string;
  timestamp: string;
};

const STORAGE_KEY = "adaptiveStudyCoachStats";
const STATS_UPDATED_EVENT = "study-stats-updated";

const getTodayKey = () => new Date().toISOString().slice(0, 10);

const getYesterdayKey = () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().slice(0, 10);
};

const defaultStats: StudyStats = {
  streakDays: 0,
  lastStudyDate: undefined,
  quizScores: [],
  totalSessions: 0,
  mistakes: [],
};

export const loadStudyStats = (): StudyStats => {
  if (typeof window === "undefined") return defaultStats;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStats;
    const parsed = JSON.parse(raw) as StudyStats;
    return {
      ...defaultStats,
      ...parsed,
      quizScores: Array.isArray(parsed.quizScores) ? parsed.quizScores : [],
      mistakes: Array.isArray(parsed.mistakes) ? parsed.mistakes : [],
    };
  } catch {
    return defaultStats;
  }
};

const saveStudyStats = (stats: StudyStats) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  window.dispatchEvent(
    new CustomEvent(STATS_UPDATED_EVENT, { detail: stats }),
  );
};

export const recordStudySession = (): StudyStats => {
  if (typeof window === "undefined") return defaultStats;
  const stats = loadStudyStats();
  const today = getTodayKey();
  const yesterday = getYesterdayKey();

  const nextStats: StudyStats = { ...stats };
  if (stats.lastStudyDate === today) {
    return stats;
  }

  if (stats.lastStudyDate === yesterday) {
    nextStats.streakDays = stats.streakDays + 1;
  } else {
    nextStats.streakDays = 1;
  }

  nextStats.lastStudyDate = today;
  nextStats.totalSessions = stats.totalSessions + 1;

  saveStudyStats(nextStats);
  return nextStats;
};

export const recordQuizScore = (accuracy: number): StudyStats => {
  return recordQuizResult(accuracy, []);
};

export const recordQuizResult = (
  accuracy: number,
  mistakes: MistakeItem[],
): StudyStats => {
  if (typeof window === "undefined") return defaultStats;
  const stats = recordStudySession();
  const scores = [...stats.quizScores, accuracy].slice(-5);
  const mergedMistakes = [...mistakes, ...stats.mistakes].slice(0, 20);
  const nextStats = {
    ...stats,
    quizScores: scores,
    mistakes: mergedMistakes,
  };
  saveStudyStats(nextStats);
  return nextStats;
};

export const subscribeStudyStats = (
  handler: (stats: StudyStats) => void,
) => {
  if (typeof window === "undefined") return () => {};
  const listener = (event: Event) => {
    const detail = (event as CustomEvent<StudyStats>).detail;
    handler(detail);
  };
  window.addEventListener(STATS_UPDATED_EVENT, listener);
  return () => window.removeEventListener(STATS_UPDATED_EVENT, listener);
};
