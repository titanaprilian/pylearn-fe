import { ApiResponse } from "@/lib/types";

export interface DashboardUserDistribution {
  roleName: string;
  count: number;
}

export interface DashboardData {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  totalRoles: number;
  totalFeatures: number;
  userDistribution: DashboardUserDistribution[];
}

export interface DashboardResponse {
  data: DashboardData;
}

export interface ApiDashboardResponse {
  error: boolean;
  code: number;
  message: string;
  data: DashboardData;
}

export interface LecturerDashboardData {
  overview: {
    totalMaterials: number;
    totalQuizzes: number;
    totalStudentAttempts: number;
  };
  materialBreakdown: {
    materialId: string;
    title: string;
    materialType: string;
    quizCount: number;
    levelCount: number;
    uniqueStudentsEngaged: number;
  }[];
}

export interface StudentDashboardData {
  overview: {
    totalAttempts: number;
    quizzesCompleted: number;
  };
  inProgress: {
    attemptId: string;
    quizId: string;
    quizTitle: string;
    startedAt: string;
  }[];
  recentResults: {
    attemptId: string;
    quizId: string;
    quizTitle: string;
    submittedAt: string;
  }[];
}

export type UserDistributionData = DashboardUserDistribution;
export type ApiLecturerDashboardResponse = ApiResponse<LecturerDashboardData>;
export type ApiStudentDashboardResponse = ApiResponse<StudentDashboardData>;
