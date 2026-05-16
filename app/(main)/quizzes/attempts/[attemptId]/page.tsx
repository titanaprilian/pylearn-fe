import { QuizAttemptClient } from "@/features/quizzes/components/attempts/QuizAttemptClient";

interface PageProps {
  params: Promise<{ attemptId: string }>;
}

export default async function QuizAttemptPage({ params }: PageProps) {
  const { attemptId } = await params;

  return <QuizAttemptClient attemptId={attemptId} />;
}