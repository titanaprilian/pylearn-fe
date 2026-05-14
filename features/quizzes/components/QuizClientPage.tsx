"use client";

import { useFetchQuizzes } from "@/features/quizzes/hooks/useQuizzes";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, BookOpen, Eye, HelpCircle } from "lucide-react";
import { Quiz } from "@/features/quizzes/types";
import Link from "next/link";
import QuizCard from "./QuizCard";

interface QuizClientPageProps {
  materialId: string;
  materialTitle?: string;
}

function QuizClientPage({ materialId, materialTitle }: QuizClientPageProps) {
  const { data: quizzes, isLoading: areQuizzesLoading } =
    useFetchQuizzes(materialId);

  const hasQuiz = quizzes && quizzes.length > 0;

  return (
    <div className="space-y-6 max-w-5xl mx-auto p-2">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5 text-muted-foreground">
            <BookOpen className="h-5 w-5 text-primary animate-pulse" />
            <span className="text-sm font-semibold tracking-wider uppercase">
              Modul Pembelajaran
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-card-foreground">
            Materi: {materialTitle?.trim() || "Detail Materi"}
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Atur parameter, kelola batas lini waktu pengerjaan, dan tambahkan
            tingkatan (levels) pertanyaan esai adaptif untuk modul pembelajaran
            saat ini.
          </p>
        </div>

        {!areQuizzesLoading && !hasQuiz && (
          <Button
            asChild
            size="default"
            className="shadow-sm font-medium shrink-0"
          >
            <Link
              href={`/materials/${materialId}/quiz/create?title=${encodeURIComponent(
                materialTitle || "",
              )}`}
            >
              <Plus className="h-4 w-4 mr-2" />
              Buat Kuis Baru
            </Link>
          </Button>
        )}
      </div>

      {/* Konten Utama Dashboard */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Konfigurasi Evaluasi Aktif
          </h2>
        </div>

        {areQuizzesLoading ? (
          <div className="grid gap-4 grid-cols-1">
            <Skeleton className="h-40 w-full rounded-xl" />
          </div>
        ) : hasQuiz ? (
          <div className="grid gap-6 grid-cols-1">
            {quizzes.map((quiz: Quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} materialId={materialId} />
            ))}
          </div>
        ) : (
          <Card className="border-dashed bg-muted/20 py-12">
            <CardContent className="flex flex-col items-center justify-center space-y-3 text-center">
              <Eye className="h-10 w-10 text-muted-foreground/60 stroke-[1.5]" />
              <div className="space-y-1">
                <p className="font-semibold text-muted-foreground">
                  Evaluasi Belum Dibuat
                </p>
                <p className="text-sm text-muted-foreground/70 max-w-sm">
                  Silakan buat kuis terlebih dahulu untuk mengaktifkan sesi
                  evaluasi berjenjang pada materi ini.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default QuizClientPage;
