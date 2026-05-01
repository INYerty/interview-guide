export interface Question {
  id: string;
  title: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
  tags: string[];
  hints: string[];
  sampleAnswer: string;
  relatedQuestions: string[];
  timeLimit: number; // seconds
}

export type Category = '算法' | '系统设计' | '行为面试' | '数据库' | '网络' | '操作系统';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface InterviewSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  questions: Question[];
  answers: Answer[];
  totalScore: number;
}

export interface Answer {
  questionId: string;
  content: string;
  score: number;
  feedback: AIFeedback;
  timeSpent: number;
}

export interface AIFeedback {
  score: number;
  summary: string;
  strengths: string[];
  improvements: string[];
  relatedTopics: string[];
}
