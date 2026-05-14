"use client";

import {
  useFetchQuizQuestions,
  useCreateQuizQuestion,
  useDeleteQuizQuestion,
} from "../hooks/useQuizQuestions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Trash2, HelpCircle, FileText, Loader2 } from "lucide-react";

interface QuizLevelSectionProps {
  levelId: string;
  levelTitle: string;
  levelOrder: number;
  materialId: string;
}

export default function QuizLevelSection({
  levelId,
  levelTitle,
  levelOrder,
  materialId,
}: QuizLevelSectionProps) {
  const { data: questions, isLoading } = useFetchQuizQuestions(levelId);

  const { mutate: createQuestion, isPending: scCreating } =
    useCreateQuizQuestion(levelId, materialId);
  const { mutate: deleteQuestion, isPending: isDeleting } =
    useDeleteQuizQuestion(levelId, materialId);

  const totalQuestions = questions ? questions.length : 0;
  const nextQuestionOrder = totalQuestions + 1;

  const handleAddQuestion = () => {
    createQuestion({
      quizLevelId: levelId,
      questionText: `Pertanyaan esai untuk ${levelTitle} - Nomor ${nextQuestionOrder}`,
      answerText: "Tuliskan kunci jawaban instruktur di sini.",
      maxScore: 10,
      questionOrder: nextQuestionOrder,
    });
  };

  return (
    <div className="space-y-4">
      {/* SEPARATOR / HEADER LEVEL */}
      <div className="flex items-center justify-between border-b pb-2 bg-muted/20 px-4 py-2 rounded-lg border">
        <div className="flex items-center gap-2">
          <Badge className="h-6 w-6 rounded-full p-0 flex items-center justify-center font-bold text-xs">
            {levelOrder}
          </Badge>
          <h3 className="font-bold text-base text-foreground tracking-tight">
            {levelTitle}
          </h3>
          <span className="text-xs text-muted-foreground">
            ({totalQuestions} Pertanyaan Terdaftar)
          </span>
        </div>

        <Button
          onClick={handleAddQuestion}
          disabled={isLoading || scCreating || isDeleting}
          size="sm"
          variant="outline"
          className="border-dashed border-primary text-primary hover:bg-primary/5 shrink-0"
        >
          {scCreating ? (
            <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
          ) : (
            <Plus className="h-4 w-4 mr-1.5" />
          )}
          {scCreating ? "Menambahkan..." : "Tambah Pertanyaan"}
        </Button>
      </div>

      {/* LIST PERTANYAAN DI BAWAH SEPARATOR */}
      <div className="pl-2 space-y-3">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>
        ) : questions && questions.length > 0 ? (
          <div className="grid gap-3 grid-cols-1">
            {questions.map((question) => (
              <Card
                key={question.id}
                className="shadow-sm border bg-card hover:border-muted-foreground/30 transition-all"
              >
                <CardContent className="p-4 flex items-start justify-between gap-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                        Soal #{question.questionOrder}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <FileText className="h-3 w-3" /> Max Skor:{" "}
                        {question.maxScore}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground/90">
                      {question.questionText}
                    </p>
                    <p className="text-xs text-muted-foreground bg-muted p-2 rounded italic">
                      <span className="font-semibold not-italic text-muted-foreground/90 block mb-0.5">
                        Kunci Jawaban:
                      </span>
                      {question.answerText}
                    </p>
                  </div>

                  {/* Tombol Hapus Pertanyaan Spesifik */}
                  <Button
                    onClick={() => deleteQuestion(question.id)}
                    disabled={scCreating || isDeleting}
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 border border-dashed rounded-xl bg-muted/10 text-xs text-muted-foreground/80 flex flex-col items-center justify-center gap-1.5">
            <HelpCircle className="h-5 w-5 text-muted-foreground/50" />
            Belum ada pertanyaan esai di tingkatan ini. Silakan klik tombol di
            atas untuk menambahkan.
          </div>
        )}
      </div>
    </div>
  );
}
