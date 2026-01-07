/** @format */

import RecentUser from "@/components/DashboardComponents/RecentUser";
import Stats from "@/components/DashboardComponents/Stats";
import React from "react";

const Dashboard = () => {
  return (
    <div className="space-y-5">
      <Stats />
      <RecentUser />
    </div>
  );
};

export default Dashboard;
