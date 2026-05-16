import { ApiAxios } from "@utils/axios";
import {
  ApiDashboardResponse,
  ApiLecturerDashboardResponse,
  ApiStudentDashboardResponse,
  DashboardData,
  LecturerDashboardData,
  StudentDashboardData,
} from "../types";

export async function fetchDashboard(): Promise<DashboardData> {
  const { data } = await ApiAxios.get<ApiDashboardResponse>("/dashboard");
  return data.data;
}

export async function getLecturerDashboard(): Promise<LecturerDashboardData> {
  const { data: result } =
    await ApiAxios.get<ApiLecturerDashboardResponse>("/dashboard/dosen");

  return result.data;
}

export async function getStudentDashboard(): Promise<StudentDashboardData> {
  const { data: result } = await ApiAxios.get<ApiStudentDashboardResponse>(
    "/dashboard/mahasiswa",
  );

  return result.data;
}
