/** @format */

import React from "react";
import { ISubscription } from "@/types/AllTypes";

interface EarningInfoModalProps {
  subscription: ISubscription | null;
  isOpen: boolean;
  onClose: () => void;
}

const EarningInfoModal = ({
  subscription,
  isOpen,
  onClose,
}: EarningInfoModalProps) => {
  if (!subscription) return null;

  return (
    <dialog
      id="my_modal_2"
      className="modal"
      open={isOpen}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-box bg-white p-10">
        <h3 className="font-medium text-center text-[30px]">User Details</h3>
        <div>
          <div className="flex justify-between items-center py-3 border-b border-gray-300">
            <h3 className="font-normal text-lg text-heading">User Name:</h3>
            <p className="text-paragraph text-lg font-normal">
              {subscription.user.first_name}
            </p>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-300">
            <h3 className="font-normal text-lg text-heading">User Role:</h3>
            <p className="text-paragraph text-lg font-normal">
              {subscription.user.user_type}
            </p>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-300">
            <h3 className="font-normal text-lg text-heading">Email:</h3>
            <p className="text-paragraph text-lg font-normal">
              {subscription.user.email}
            </p>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-300">
            <h3 className="font-normal text-lg text-heading">Amount:</h3>
            <p className="text-paragraph text-lg font-normal">
              ${subscription.price}
            </p>
          </div>
          <div className="flex justify-between items-center py-3">
            <h3 className="font-normal text-lg text-heading">Purchase Date:</h3>
            <p className="text-paragraph text-lg font-normal">
              {new Date(subscription.invoice_date).toLocaleDateString()}
            </p>
          </div>
          <div className="flex justify-between items-center py-3">
            <h3 className="font-normal text-lg text-heading">
              Next Billing Date:
            </h3>
            <p className="text-paragraph text-lg font-normal">
              {new Date(subscription.end_date).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="modal-action">
          <form
            method="dialog"
            className="flex justify-center items-center w-full"
            onSubmit={onClose}
          >
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-bg-primary text-white font-medium text-[15px] rounded-xl py-3"
            >
              Okay
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default EarningInfoModal;
