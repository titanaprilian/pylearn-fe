"use client";

import { DashboardStats } from "./DashboardStats";
import { LecturerDashboardData } from "../types";
import { BookOpen, ClipboardList, UserCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LecturerDashboardViewProps {
  data?: LecturerDashboardData;
}

export function LecturerDashboardView({ data }: LecturerDashboardViewProps) {
  const statsConfig = [
    {
      titleKey: "Total Materi",
      dataKey: "totalMaterials",
      icon: BookOpen,
      color: "blue" as const,
      descriptionKey: "Materi yang Anda buat",
    },
    {
      titleKey: "Total Kuis",
      dataKey: "totalQuizzes",
      icon: ClipboardList,
      color: "purple" as const,
      descriptionKey: "Kuis yang tersedia",
    },
    {
      titleKey: "Total Pengerjaan",
      dataKey: "totalStudentAttempts",
      icon: UserCheck,
      color: "green" as const,
      descriptionKey: "Pengerjaan oleh siswa",
    },
  ];

  const statsData = data?.overview;

  return (
    <div className="space-y-6">
      <DashboardStats data={statsData} config={statsConfig} />

      <Card>
        <CardHeader>
          <CardTitle>Analisis Materi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left font-medium text-muted-foreground">
                  <th className="pb-3 pr-4">Judul Materi</th>
                  <th className="pb-3 pr-4">Tipe</th>
                  <th className="pb-3 pr-4 text-center">Kuis</th>
                  <th className="pb-3 pr-4 text-center">Level</th>
                  <th className="pb-3 text-right">Siswa Terlibat</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data?.materialBreakdown.map((item) => (
                  <tr key={item.materialId} className="group hover:bg-muted/50 transition-colors">
                    <td className="py-4 pr-4 font-medium">{item.title}</td>
                    <td className="py-4 pr-4">
                      <Badge variant="secondary" className="capitalize">
                        {item.materialType}
                      </Badge>
                    </td>
                    <td className="py-4 pr-4 text-center">{item.quizCount}</td>
                    <td className="py-4 pr-4 text-center">{item.levelCount}</td>
                    <td className="py-4 text-right font-semibold text-primary">
                      {item.uniqueStudentsEngaged}
                    </td>
                  </tr>
                ))}
                {(!data?.materialBreakdown || data.materialBreakdown.length === 0) && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground italic">
                      Belum ada data materi.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
