"use client";

import { useFetchQuizzes } from "../hooks/useQuizzes";
import CreateQuizForm from "./CreateQuizForm";
import QuizClientPage from "./QuizClientPage";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

interface CreateQuizFormWrapperProps {
  materialId: string;
  materialTitle?: string;
}

export default function CreateQuizFormWrapper({
  materialId,
  materialTitle,
}: CreateQuizFormWrapperProps) {
  const { data: quizzes, isLoading } = useFetchQuizzes(materialId);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="pt-6 space-y-4">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (quizzes && quizzes.length > 0) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-sm">
          Kuis untuk materi ini sudah dibuat. Menampilkan detail kuis yang
          aktif.
        </div>
        <QuizClientPage materialId={materialId} materialTitle={materialTitle} />
      </div>
    );
  }

  return <CreateQuizForm materialId={materialId} />;
}
