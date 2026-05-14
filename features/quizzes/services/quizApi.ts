import { ApiAxios } from "@utils/axios";
import { Quiz, ApiQuizzesResponse, QuizLevel } from "../types";
import { ApiResponse } from "@/lib/types";

export async function getQuizzes(materialId: string): Promise<Quiz[]> {
  const { data: result } = await ApiAxios.get<ApiQuizzesResponse>(
    `/quizzes?materialId=${materialId}`,
  );

  return result.data;
}

export async function createQuiz(data: {
  materialId: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  isPublished: boolean;
}): Promise<{ quiz: Quiz; message: string }> {
  const { data: result } = await ApiAxios.post<ApiResponse<Quiz>>(
    "/quizzes",
    data,
  );

  return {
    quiz: result.data,
    message: result.message,
  };
}

export async function updateQuiz(
  id: string,
  data: {
    title?: string;
    description?: string;
    startTime?: string;
    endTime?: string;
    isPublished?: boolean;
  },
): Promise<{ quiz: Quiz; message: string }> {
  const { data: result } = await ApiAxios.patch<ApiResponse<Quiz>>(
    `/quizzes/${id}`,
    data,
  );

  return {
    quiz: result.data,
    message: result.message,
  };
}

export async function deleteQuiz(id: string): Promise<{ message: string }> {
  const { data: result } = await ApiAxios.delete<ApiResponse<any>>(
    `/quizzes/${id}`,
  );

  return {
    message: result.message,
  };
}

export async function getQuizLevels(quizId: string): Promise<QuizLevel[]> {
  const { data: result } = await ApiAxios.get<ApiResponse<QuizLevel[]>>(
    `/quizzes/levels?quizId=${quizId}`,
  );

  return result.data;
}

export async function getQuizLevelById(id: string): Promise<QuizLevel> {
  const { data: result } = await ApiAxios.get<ApiResponse<QuizLevel>>(
    `/quizzes/levels/${id}`,
  );

  return result.data;
}

export async function createQuizLevel(data: {
  quizId: string;
  title: string;
  levelOrder: number;
}): Promise<{ level: QuizLevel; message: string }> {
  const { data: result } = await ApiAxios.post<ApiResponse<QuizLevel>>(
    "/quizzes/levels",
    data,
  );

  return {
    level: result.data,
    message: result.message,
  };
}

export async function updateQuizLevel(
  id: string,
  data: {
    title?: string;
    levelOrder?: number;
  },
): Promise<{ level: { id: string }; message: string }> {
  // Your PATCH response example shows it returns an object containing just the level id: { id: "string" }
  const { data: result } = await ApiAxios.patch<ApiResponse<{ id: string }>>(
    `/quizzes/levels/${id}`,
    data,
  );

  return {
    level: result.data,
    message: result.message,
  };
}

export async function deleteQuizLevel(
  id: string,
): Promise<{ message: string }> {
  const { data: result } = await ApiAxios.delete<ApiResponse<any>>(
    `/quizzes/levels/${id}`,
  );

  return {
    message: result.message,
  };
}
