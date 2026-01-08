/** @format */

"use client";

import RecentUser from "@/components/DashboardComponents/RecentUser";
import Stats from "@/components/DashboardComponents/Stats";
import { useGetDashboardSummaryQuery } from "@/redux/freatures/dashboardAPI";
import React from "react";

const Dashboard = () => {
  const { data, isLoading, error } = useGetDashboardSummaryQuery();

  const stats = {
    total_earnings: data?.data.total_earnings || 0,
    total_companies: data?.data.total_companies || 0,
    total_guards: data?.data.total_guards || 0,
  };

  const recentUsers = data?.data.recent_users || [];

  if (error) {
    return (
      <div className="space-y-5">
        <div className="text-center text-red-500 py-10">
          Error loading dashboard data. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <Stats stats={stats} isLoading={isLoading} />
      <RecentUser users={recentUsers} isLoading={isLoading} />
    </div>
  );
};

export default Dashboard;
