/** @format */

"use client";

import * as React from "react";
import { IDashboardStats } from "@/types/AllTypes";

interface StatsProps {
  stats: IDashboardStats;
  isLoading: boolean;
}

const Stats = ({ stats, isLoading }: StatsProps) => {
  return (
    <div className="flex gap-8 items-center">
      <div className="border border-heading flex flex-col justify-between rounded-xl h-28 p-5 min-w-[200px]">
        <div className="flex justify-between gap-5 items-center text-sm text-heading">
          <p>Total Earnings</p>
        </div>
        <h3 className="text-3xl font-medium text-heading">
          {isLoading ? "..." : `$${stats.total_earnings.toFixed(2)}`}
        </h3>
      </div>
      <div className="border border-heading flex flex-col justify-between rounded-xl h-28 p-5 min-w-[200px]">
        <p className="text-sm text-heading">Total Companies</p>
        <h3 className="text-3xl font-medium text-heading">
          {isLoading ? "..." : stats.total_companies}
        </h3>
      </div>
      <div className="border border-heading flex flex-col justify-between rounded-xl h-28 p-5 min-w-[200px]">
        <p className="text-sm text-heading">Total Guards</p>
        <h3 className="text-3xl font-medium text-heading">
          {isLoading ? "..." : stats.total_guards}
        </h3>
      </div>
    </div>
  );
};

export default Stats;
