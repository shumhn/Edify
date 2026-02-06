export interface QuizAnswer {
  questionId: string;
  selectedIndex: number;
  correctIndex: number;
}

export interface QuizScoreResult {
  total: number;
  correct: number;
  accuracy: number;
  incorrectQuestionIds: string[];
}

export async function scoreQuiz(input: {
  answers: QuizAnswer[];
}): Promise<QuizScoreResult> {
  const { answers } = input;
  const total = answers.length;
  const incorrectQuestionIds: string[] = [];
  let correct = 0;

  for (const answer of answers) {
    if (answer.selectedIndex === answer.correctIndex) {
      correct += 1;
    } else {
      incorrectQuestionIds.push(answer.questionId);
    }
  }

  const accuracy = total === 0 ? 0 : Math.round((correct / total) * 100);

  return {
    total,
    correct,
    accuracy,
    incorrectQuestionIds,
  };
}

export interface StudyPlanInput {
  subject: string;
  focusTopics: string[];
  days: number;
  dailyMinutes: number;
}

export interface StudyPlanDay {
  day: number;
  focus: string;
  tasks: string[];
}

export interface StudyPlanOutput {
  goal: string;
  days: number;
  dailyMinutes: number;
  plan: StudyPlanDay[];
}

export async function buildStudyPlan(
  input: StudyPlanInput,
): Promise<StudyPlanOutput> {
  const { subject, focusTopics, days, dailyMinutes } = input;
  const topics = focusTopics.length > 0 ? focusTopics : [subject];

  const plan: StudyPlanDay[] = Array.from({ length: days }, (_, index) => {
    const topic = topics[index % topics.length];
    return {
      day: index + 1,
      focus: topic,
      tasks: [
        `Warm-up recap (${Math.round(dailyMinutes * 0.25)} min)`,
        `Core practice set (${Math.round(dailyMinutes * 0.5)} min)`,
        `Reflection notes + formula review (${Math.round(dailyMinutes * 0.25)} min)`,
      ],
    };
  });

  return {
    goal: `Improve ${subject} fundamentals in ${days} days`,
    days,
    dailyMinutes,
    plan,
  };
}

export interface ProgressSignalInput {
  recentAccuracy: number;
  streakDays: number;
  minutesStudiedThisWeek: number;
}

export interface ProgressSignalOutput {
  masteryLevel: "starter" | "steady" | "accelerating" | "exam-ready";
  nextTarget: string;
  coachingTip: string;
}

export async function buildProgressSignal(
  input: ProgressSignalInput,
): Promise<ProgressSignalOutput> {
  const { recentAccuracy, streakDays, minutesStudiedThisWeek } = input;

  let masteryLevel: ProgressSignalOutput["masteryLevel"] = "starter";
  if (recentAccuracy >= 85 && streakDays >= 5) masteryLevel = "exam-ready";
  else if (recentAccuracy >= 70) masteryLevel = "accelerating";
  else if (recentAccuracy >= 55) masteryLevel = "steady";

  const nextTarget =
    masteryLevel === "exam-ready"
      ? "Try mixed-topic timed quizzes."
      : "Aim for 3 focused sessions this week.";

  const coachingTip =
    minutesStudiedThisWeek < 180
      ? "Add one short 25-minute session to lock memory."
      : "Keep momentum with a quick review at night.";

  return {
    masteryLevel,
    nextTarget,
    coachingTip,
  };
}

export interface StemTopicPackInput {
  subject: "Physics" | "Math" | "Chemistry" | "Computer Science";
}

export interface StemTopicPackOutput {
  subject: string;
  topics: string[];
}

const STEM_TOPICS: Record<StemTopicPackInput["subject"], string[]> = {
  Physics: [
    "Units & Measurements",
    "Mechanics: Kinematics & Dynamics",
    "Mechanics: Work, Energy & Power",
    "Rotational Dynamics & Torque",
    "Mechanics: Circular Motion & Gravitation",
    "Elasticity & Fluid Mechanics",
    "Oscillations (SHM) & Waves",
    "Sound & Doppler Effect",
    "Heat: Thermal Expansion & Calorimetry",
    "Heat: Thermodynamics & Kinetic Theory",
    "Electrostatics",
    "Current Electricity",
    "Magnetism & Electromagnetic Induction",
    "Electromagnetic Waves",
    "Optics: Reflection, Refraction & Lenses",
    "Wave Optics",
    "Modern Physics: Nuclear, Quantum & Solids",
    "Semiconductors & Electronics",
    "Communication Systems",
  ],
  Math: [
    "Sets, Logic & Real Numbers",
    "Relations & Functions",
    "Matrices & Determinants",
    "Sequence & Series",
    "Complex Numbers",
    "Trigonometry: Compound & Multiple Angles",
    "Trigonometry: Inverse & General Solutions",
    "Binomial Theorem & Mathematical Induction",
    "Calculus: Limits & Continuity",
    "Calculus: Differentiation & Applications",
    "Calculus: Integration & Applications",
    "Differential Equations (Basics)",
    "Coordinate Geometry: Lines & Circles",
    "Coordinate Geometry: Conic Sections",
    "Vectors & 3D Geometry",
    "Permutations, Combinations & Probability",
    "Statistics & Data Interpretation",
    "Linear Programming",
  ],
  Chemistry: [
    "Atomic Structure & Periodicity",
    "Chemical Bonding",
    "States of Matter",
    "Stoichiometry & Gas Laws",
    "Thermodynamics & Thermochemistry",
    "Chemical Equilibrium",
    "Solutions & Colligative Properties",
    "Acids, Bases & Salts",
    "Electrochemistry",
    "Chemical Kinetics",
    "Surface Chemistry",
    "Metals & Non-metals",
    "Coordination Compounds",
    "Organic: Hydrocarbons",
    "Organic: Haloalkanes, Alcohols & Ethers",
    "Organic: Aldehydes, Ketones & Carboxylic Acids",
    "Polymers & Biomolecules",
    "Environmental Chemistry",
  ],
  "Computer Science": [
    "Programming Fundamentals",
    "Data Types & Variables",
    "Control Flow & Loops",
    "Functions & Recursion",
    "Data Structures: Arrays, Stacks & Queues",
    "Data Structures: Linked Lists, Trees & Heaps",
    "Data Structures: Graphs & Hashing",
    "Searching & Sorting Algorithms",
    "Algorithm Analysis (Big-O)",
    "Discrete Math & Boolean Algebra",
    "Object-Oriented Programming",
    "Databases & SQL",
    "Computer Organization Basics",
    "Computer Networks Basics",
    "Operating Systems Basics",
    "Web Basics (HTML/CSS/JS)",
    "Software Engineering & SDLC",
    "Cybersecurity Fundamentals",
  ],
};

export async function getStemTopicPack(
  input: StemTopicPackInput,
): Promise<StemTopicPackOutput> {
  return {
    subject: input.subject,
    topics: STEM_TOPICS[input.subject] ?? [],
  };
}
