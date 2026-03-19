
export type Subject = {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
};

export type Message = {
  role: 'user' | 'model';
  text: string;
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  content: string;
  objectives: string[];
  initialAssessment: string[];
  trainingActivities: string[];
  steps: string[];
  practicalTasks?: string[];
  videoUrl?: string;
  quiz?: {
    id: string;
    text: string;
    options: string[];
    correctAnswer: number;
    feedback: string;
  }[];
  moduleId: string;
};

export type Module = {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  finalAssessment: string[];
};

export type UserProgress = {
  uid: string;
  email: string;
  name: string;
  role: string;
  completedLessons: string[]; // Array of lesson IDs
  completedModules: string[]; // Array of module IDs
  lastActive: any; // Timestamp
  diagnosticScore?: number;
  finalAssessmentScore?: number;
  activitiesCompleted: string[]; // Array of activity IDs or descriptions
};

export type Achievement = {
  id: string;
  uid: string;
  type: 'lesson' | 'module' | 'assessment' | 'activity';
  targetId: string; // lessonId, moduleId, etc.
  timestamp: any;
  score?: number;
};
