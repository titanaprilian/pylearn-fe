import { ApiErrorResponse, ApiResponse } from "@/lib/types";

export type { ApiErrorResponse };

export interface QuizLevel {
  id: string;
  quizId: string;
  title: string;
  levelOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Quiz {
  id: string;
  materialId: string;
  material: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  levels: QuizLevel[];
}

export interface QuizQuestion {
  id: string;
  quizLevelId: string;
  quizLevelTitle: string;
  quizId: string;
  quizTitle: string;
  questionText: string;
  answerText: string;
  maxScore: number;
  questionOrder: number;
  createdAt: string;
  updatedAt: string;
}

export type ApiQuizzesResponse = ApiResponse<Quiz[]>;
export type ApiQuestionsResponse = ApiResponse<QuizQuestion[]>;
