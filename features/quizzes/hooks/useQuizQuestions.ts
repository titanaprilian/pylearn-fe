"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getQuizQuestions,
  createQuizQuestion,
  updateQuizQuestion,
  deleteQuizQuestion,
  getQuizQuestionsForAttempt,
} from "../services/quizApi";
import { quizKeys } from "./useQuizzes";

// Cache Keys khusus untuk fitur Questions
export const questionKeys = {
  all: ["quiz-questions"] as const,
  lists: () => [...questionKeys.all, "list"] as const,
  list: (quizLevelId: string) =>
    [...questionKeys.lists(), { quizLevelId }] as const,
  attempts: () => [...questionKeys.all, "attempt"] as const,
  attemptList: (quizLevelId: string) =>
    [...questionKeys.attempts(), { quizLevelId }] as const,
};

export function useFetchQuizQuestions(quizLevelId: string) {
  return useQuery({
    queryKey: questionKeys.list(quizLevelId),
    queryFn: () => getQuizQuestions(quizLevelId),
    enabled: !!quizLevelId,
  });
}

export function useFetchQuizQuestionsForAttempt(quizLevelId: string) {
  return useQuery({
    queryKey: questionKeys.attemptList(quizLevelId),
    queryFn: () => getQuizQuestionsForAttempt(quizLevelId),
    enabled: !!quizLevelId,
  });
}

export function useCreateQuizQuestion(
  quizLevelId: string,
  materialId?: string,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuizQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: questionKeys.list(quizLevelId),
      });
      if (materialId) {
        queryClient.invalidateQueries({
          queryKey: quizKeys.list(materialId),
        });
      }
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Gagal membuat pertanyaan kuis.",
      );
    },
  });
}

export function useUpdateQuizQuestion(
  quizLevelId: string,
  materialId?: string,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Parameters<typeof updateQuizQuestion>[1];
    }) => updateQuizQuestion(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: questionKeys.list(quizLevelId),
      });
      if (materialId) {
        queryClient.invalidateQueries({
          queryKey: quizKeys.list(materialId),
        });
      }
      toast.success("Pertanyaan kuis berhasil diperbarui.");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Gagal memperbarui pertanyaan kuis.",
      );
    },
  });
}

export function useDeleteQuizQuestion(
  quizLevelId: string,
  materialId?: string,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteQuizQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: questionKeys.list(quizLevelId),
      });
      if (materialId) {
        queryClient.invalidateQueries({
          queryKey: quizKeys.list(materialId),
        });
      }
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Gagal menghapus pertanyaan kuis.",
      );
    },
  });
}
