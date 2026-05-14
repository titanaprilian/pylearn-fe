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

export type ApiQuizzesResponse = ApiResponse<Quiz[]>;
