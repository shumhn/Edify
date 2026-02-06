export type UserProfile = {
  id: string;
  name: string;
  gradeLevel?: string;
  learningMode?: "exam" | "learn";
  skillLevel?: "Beginner" | "Intermediate" | "Advanced";
  examDaysLeft?: number;
  paceSessionsPerWeek?: number;
  focusSubject?: string;
};

const STORAGE_KEY = "adaptiveStudyCoachProfile";
const PROFILE_UPDATED_EVENT = "study-profile-updated";
const DEFAULT_GRADE_LEVEL = "Engineering-track +2 (MPC/CS)";
const DEFAULT_LEARNING_MODE: UserProfile["learningMode"] = "exam";
const DEFAULT_SKILL_LEVEL: UserProfile["skillLevel"] = "Intermediate";

const createGuestProfile = (): UserProfile => ({
  id: `guest-${Math.random().toString(36).slice(2, 10)}`,
  name: "Guest Student",
  gradeLevel: DEFAULT_GRADE_LEVEL,
  learningMode: DEFAULT_LEARNING_MODE,
  skillLevel: DEFAULT_SKILL_LEVEL,
});

const normalizeGradeLevel = (gradeLevel?: string) => {
  if (!gradeLevel) return DEFAULT_GRADE_LEVEL;
  if (/neb/i.test(gradeLevel)) return DEFAULT_GRADE_LEVEL;
  return gradeLevel;
};

const normalizeLearningMode = (mode?: UserProfile["learningMode"]) => {
  if (mode === "learn" || mode === "exam") return mode;
  return DEFAULT_LEARNING_MODE;
};

const normalizeSkillLevel = (level?: UserProfile["skillLevel"]) => {
  if (level === "Beginner" || level === "Intermediate" || level === "Advanced") {
    return level;
  }
  return DEFAULT_SKILL_LEVEL;
};

export const loadUserProfile = (): UserProfile => {
  if (typeof window === "undefined") return createGuestProfile();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const guest = createGuestProfile();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(guest));
      return guest;
    }
    const parsed = JSON.parse(raw) as UserProfile;
    const merged = {
      ...createGuestProfile(),
      ...parsed,
    };
    const normalized = {
      ...merged,
      gradeLevel: normalizeGradeLevel(merged.gradeLevel),
      learningMode: normalizeLearningMode(merged.learningMode),
      skillLevel: normalizeSkillLevel(merged.skillLevel),
    };
    if (normalized.gradeLevel !== merged.gradeLevel) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    }
    return normalized;
  } catch {
    const guest = createGuestProfile();
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(guest));
    }
    return guest;
  }
};

export const saveUserProfile = (updates: Partial<UserProfile>): UserProfile => {
  if (typeof window === "undefined") return createGuestProfile();
  const current = loadUserProfile();
  const next = { ...current, ...updates };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(PROFILE_UPDATED_EVENT, { detail: next }));
  return next;
};

export const subscribeUserProfile = (
  handler: (profile: UserProfile) => void,
) => {
  if (typeof window === "undefined") return () => {};
  const listener = (event: Event) => {
    const detail = (event as CustomEvent<UserProfile>).detail;
    handler(detail);
  };
  window.addEventListener(PROFILE_UPDATED_EVENT, listener);
  return () => window.removeEventListener(PROFILE_UPDATED_EVENT, listener);
};
