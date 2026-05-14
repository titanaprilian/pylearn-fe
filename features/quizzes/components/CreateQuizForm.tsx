"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { quizSchema, QuizFormData } from "../schemas/quizSchema";
import { useCreateQuiz } from "../hooks/useQuizzes";
import { Loader2 } from "lucide-react";

interface CreateQuizFormProps {
  materialId: string;
}

export default function CreateQuizForm({ materialId }: CreateQuizFormProps) {
  const router = useRouter();

  // Menyuntikkan materialId ke dalam hook context untuk pembersihan cache query yang tepat saat sukses
  const { mutate: createQuiz, isPending: isSubmitting } =
    useCreateQuiz(materialId);

  const form = useForm<QuizFormData>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      materialId: materialId, // Otomatis ditetapkan di balik layar
      title: "",
      description: "",
      startTime: "",
      endTime: "",
      isPublished: true, // Standar ke true sesuai aturan skema Zod
    },
  });

  const onSubmit = (data: QuizFormData) => {
    const formattedPayload = {
      ...data,
      startTime: data.startTime ? new Date(data.startTime).toISOString() : "",
      endTime: data.endTime ? new Date(data.endTime).toISOString() : "",
    };

    createQuiz(formattedPayload, {
      onSuccess: () => {
        router.push(`/materials/${materialId}/quiz`);
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pengaturan Kuis</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Kolom Judul */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul Kuis</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan judul kuis" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Kolom Deskripsi */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Masukkan deskripsi kuis (opsional)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Matriks Pengaturan Waktu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Waktu Mulai */}
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Waktu Mulai</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Waktu Selesai */}
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Waktu Selesai</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Tombol Sakelar Status Publikasi */}
            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5 mr-4">
                    <FormLabel>Status Publikasi</FormLabel>
                    <FormDescription>
                      Aktifkan agar kuis ini dapat langsung dilihat oleh daftar
                      siswa Anda.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Baris Tombol Aksi Form */}
            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Buat Kuis
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
