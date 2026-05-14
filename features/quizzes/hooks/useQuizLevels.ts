"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getQuizLevels,
  getQuizLevelById,
  createQuizLevel,
  updateQuizLevel,
  deleteQuizLevel,
} from "../services/quizApi";
import { quizKeys } from "./useQuizzes";

export const levelKeys = {
  all: ["quiz-levels"] as const,
  lists: () => [...levelKeys.all, "list"] as const,
  list: (quizId: string) => [...levelKeys.lists(), { quizId }] as const,
  details: () => [...levelKeys.all, "detail"] as const,
  detail: (id: string) => [...levelKeys.details(), id] as const,
};

export function useFetchQuizLevels(quizId: string) {
  return useQuery({
    queryKey: levelKeys.list(quizId),
    queryFn: () => getQuizLevels(quizId),
    enabled: !!quizId,
  });
}

export function useFetchQuizLevelDetail(id: string) {
  return useQuery({
    queryKey: levelKeys.detail(id),
    queryFn: () => getQuizLevelById(id),
    enabled: !!id,
  });
}

export function useCreateQuizLevel(quizId: string, materialId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createQuizLevel,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: levelKeys.list(quizId) });
      if (materialId) {
        queryClient.invalidateQueries({ queryKey: quizKeys.list(materialId) });
      }
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to create level.",
      );
    },
  });
}

export function useUpdateQuizLevel(quizId: string, materialId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Parameters<typeof updateQuizLevel>[1];
    }) => updateQuizLevel(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: levelKeys.list(quizId) });
      if (materialId) {
        queryClient.invalidateQueries({ queryKey: quizKeys.list(materialId) });
      }
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to update level.",
      );
    },
  });
}

export function useDeleteQuizLevel(quizId: string, materialId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteQuizLevel,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: levelKeys.list(quizId) });
      if (materialId) {
        queryClient.invalidateQueries({ queryKey: quizKeys.list(materialId) });
      }
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to delete level.",
      );
    },
  });
}
