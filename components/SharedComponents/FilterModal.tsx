/** @format */

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface FilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilter: (startDate: string, endDate: string) => void;
}

const FilterModal = ({
  open,
  onOpenChange,
  onApplyFilter,
}: FilterModalProps) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleApply = () => {
    onApplyFilter(startDate, endDate);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setStartDate("");
    setEndDate("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Filter</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Select start date"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Select end date"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 pt-6">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="flex-1 border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            className="flex-1 bg-blue-950 hover:bg-blue-900 text-white"
          >
            Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;
