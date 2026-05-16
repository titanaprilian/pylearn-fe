"use client";

import { DashboardStats, QuickActions, UserDistribution } from "@features/dashboard";
import { DashboardData } from "../types";
import { dashboardStatsConfig } from "../config/dashboardStats";

interface AdminDashboardViewProps {
  data?: DashboardData;
}

export function AdminDashboardView({ data }: AdminDashboardViewProps) {
  return (
    <>
      <DashboardStats data={data} config={dashboardStatsConfig} />
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <QuickActions />
        </div>
        <div className="lg:col-span-1">
          <UserDistribution data={data?.userDistribution} />
        </div>
      </div>
    </>
  );
}
