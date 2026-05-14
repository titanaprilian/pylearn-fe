"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getQuizzes,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} from "../services/quizApi";

export const quizKeys = {
  all: ["quizzes"] as const,
  lists: () => [...quizKeys.all, "list"] as const,
  list: (materialId: string) => [...quizKeys.lists(), { materialId }] as const,
};

export function useFetchQuizzes(materialId: string) {
  return useQuery({
    queryKey: quizKeys.list(materialId),
    queryFn: () => getQuizzes(materialId),
    enabled: !!materialId,
  });
}

export function useCreateQuiz(materialId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuiz,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: quizKeys.list(materialId),
      });
      toast.success(response.message || "Quiz created successfully.");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to create quiz.",
      );
    },
  });
}

export function useUpdateQuiz(materialId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Parameters<typeof updateQuiz>[1];
    }) => updateQuiz(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: quizKeys.list(materialId),
      });
      toast.success(response.message || "Quiz updated successfully.");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to update quiz.",
      );
    },
  });
}

export function useDeleteQuiz(materialId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteQuiz,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: quizKeys.list(materialId),
      });
      toast.success(response.message || "Quiz deleted successfully.");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to delete quiz.",
      );
    },
  });
}
