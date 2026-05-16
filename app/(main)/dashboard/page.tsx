"use client";

import {
  DashboardHeader,
  AdminDashboardView,
  LecturerDashboardView,
  StudentDashboardView,
} from "@features/dashboard";
import {
  useFetchDashboard,
  useFetchLecturerDashboard,
  useFetchStudentDashboard,
} from "@features/dashboard/hooks/useDashboard";
import { useAuth } from "@features/auth/context/AuthProvider";

export default function DashboardPage() {
  const { user } = useAuth();
  const roleName = user?.roleName?.toLowerCase();

  // Call all hooks but they are enabled/disabled inside the hooks themselves based on auth
  // However, for efficiency, we can conditionally enable them here if we had control over parameters.
  // In useDashboard.ts, they are enabled if user exists.
  
  const adminQuery = useFetchDashboard();
  const lecturerQuery = useFetchLecturerDashboard();
  const studentQuery = useFetchStudentDashboard();

  const renderDashboard = () => {
    switch (roleName) {
      case "dosen":
        return <LecturerDashboardView data={lecturerQuery.data} />;
      case "mahasiswa":
        return <StudentDashboardView data={studentQuery.data} />;
      default:
        return <AdminDashboardView data={adminQuery.data} />;
    }
  };

  return (
    <div className="p-8">
      <DashboardHeader />
      <div className="mt-6">
        {renderDashboard()}
      </div>
    </div>
  );
}
