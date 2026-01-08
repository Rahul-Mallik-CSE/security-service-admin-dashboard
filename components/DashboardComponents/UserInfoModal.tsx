/** @format */

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IDashboardUser } from "@/redux/freatures/dashboardAPI";
import { format } from "date-fns";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: IDashboardUser | null;
}

const InfoModal = ({ isOpen, onClose, user }: InfoModalProps) => {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="font-medium text-center text-[30px]">
            User Details
          </DialogTitle>
        </DialogHeader>
        <div>
          <div className="flex justify-between items-center py-3 border-b border-gray-300">
            <h3 className="font-normal text-lg text-heading">User Name:</h3>
            <p className="text-paragraph text-lg font-normal">
              {user.email.split("@")[0]}
            </p>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-300">
            <h3 className="font-normal text-lg text-heading">User Role:</h3>
            <p className="text-paragraph text-lg font-normal">
              {user.user_type}
            </p>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-300">
            <h3 className="font-normal text-lg text-heading">Email:</h3>
            <p className="text-paragraph text-lg font-normal">{user.email}</p>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-300">
            <h3 className="font-normal text-lg text-heading">Gender:</h3>
            <p className="text-paragraph text-lg font-normal">
              {user.gender || "N/A"}
            </p>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-300">
            <h3 className="font-normal text-lg text-heading">Phone:</h3>
            <p className="text-paragraph text-lg font-normal">
              {user.phone || "N/A"}
            </p>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-300">
            <h3 className="font-normal text-lg text-heading">Status:</h3>
            <p className="text-paragraph text-lg font-normal">
              {user.is_admin_aproved
                ? "Approved"
                : user.is_admin_rejected
                ? "Rejected"
                : "Pending"}
            </p>
          </div>
          <div className="flex justify-between items-center py-3">
            <h3 className="font-normal text-lg text-heading">Join Date:</h3>
            <p className="text-paragraph text-lg font-normal">
              {format(new Date(user.create_at), "MM-dd-yyyy")}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center w-full pt-4">
          <Button
            onClick={onClose}
            className="w-full bg-bg-primary text-white font-medium text-[15px] rounded-xl py-3"
          >
            Okay
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;
