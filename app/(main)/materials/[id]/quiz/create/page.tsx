import CreateQuizFormWrapper from "@/features/quizzes/components/CreateQuizFormWrapper";
import { Badge } from "@/components/ui/badge";

interface CreateQuizPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ title?: string }>;
}

export default async function CreateQuizPage({
  params,
  searchParams,
}: CreateQuizPageProps) {
  const { id } = await params;
  const { title } = await searchParams;

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Kuis Materi</h1>
        {title && (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Materi:</span>
            <Badge variant="secondary" className="text-sm font-medium">
              {title}
            </Badge>
          </div>
        )}
      </div>

      {/* This wrapper component handles the check dynamically */}
      <CreateQuizFormWrapper materialId={id} materialTitle={title} />
    </div>
  );
}
