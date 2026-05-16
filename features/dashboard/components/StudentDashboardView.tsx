"use client";

import { DashboardStats } from "./DashboardStats";
import { StudentDashboardData } from "../types";
import { ClipboardCheck, GraduationCap, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface StudentDashboardViewProps {
  data?: StudentDashboardData;
}

export function StudentDashboardView({ data }: StudentDashboardViewProps) {
  const statsConfig = [
    {
      titleKey: "Total Percobaan",
      dataKey: "totalAttempts",
      icon: ClipboardCheck,
      color: "orange" as const,
      descriptionKey: "Jumlah kuis yang Anda ikuti",
    },
    {
      titleKey: "Kuis Selesai",
      dataKey: "quizzesCompleted",
      icon: GraduationCap,
      color: "green" as const,
      descriptionKey: "Kuis yang telah Anda selesaikan",
    },
  ];

  const statsData = data?.overview;

  return (
    <div className="space-y-6">
      <DashboardStats data={statsData} config={statsConfig} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              Sedang Dikerjakan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.inProgress.map((item) => (
                <div key={item.attemptId} className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{item.quizTitle}</p>
                    <p className="text-xs text-muted-foreground">
                      Dimulai: {new Date(item.startedAt).toLocaleString("id-ID")}
                    </p>
                  </div>
                  <Button size="sm" asChild className="ml-4">
                    <Link href={`/quizzes/attempts/${item.attemptId}`}>
                      Lanjutkan <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
              {(!data?.inProgress || data.inProgress.length === 0) && (
                <p className="text-center py-8 text-sm text-muted-foreground italic">
                  Tidak ada kuis yang sedang dikerjakan.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-green-500" />
              Hasil Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data?.recentResults.map((item) => (
                <div key={item.attemptId} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{item.quizTitle}</p>
                    <p className="text-xs text-muted-foreground">
                      Selesai: {new Date(item.submittedAt).toLocaleString("id-ID")}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild className="ml-4">
                    <Link href={`/quizzes/attempts/${item.attemptId}`}>
                      Lihat Hasil
                    </Link>
                  </Button>
                </div>
              ))}
              {(!data?.recentResults || data.recentResults.length === 0) && (
                <p className="text-center py-8 text-sm text-muted-foreground italic">
                  Belum ada riwayat hasil kuis.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
