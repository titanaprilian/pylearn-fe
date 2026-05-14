import { z } from "zod";

export const quizSchema = z.object({
  title: z.string().min(1, "Title is required"),
  materialId: z.string().min(1, "Material selection is required"),
  description: z.string().optional(),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  isPublished: z.boolean().default(true),
});

export const quizLevelSchema = z.object({
  quizId: z.string().min(1, "Quiz ID relation is required"),
  title: z.string().min(1, "Level title is required"),
  levelOrder: z.number().int().min(1),
});

export const quizQuestionSchema = z.object({
  quizLevelId: z.string().min(1, "Quiz Level ID relation is required"),
  questionText: z.string().min(1, "Pertanyaan wajib diisi"),
  answerText: z.string().min(1, "Kunci jawaban wajib diisi"),
  maxScore: z.number().int().min(1, "Skor minimal adalah 1").default(100),
  questionOrder: z.number().int().min(1),
});

export type QuizLevelFormData = z.infer<typeof quizLevelSchema>;
export type QuizFormData = z.infer<typeof quizSchema>;
export type QuizQuestionFormData = z.infer<typeof quizQuestionSchema>;
