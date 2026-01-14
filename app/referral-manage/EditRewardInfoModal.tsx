/** @format */

"use client";
import { useForm } from "react-hook-form";
import { useEditRewardMutation } from "@/redux/freatures/referralManageAPI";
import { toast } from "react-toastify";

type TEditRewardData = {
  userRole: "company" | "user";
  targetReferrals: string;
  rewardType: "days" | "percent";
  rewardAmount: string;
};

const EditRewardInfoModal = () => {
  const { register, watch, reset, handleSubmit } = useForm<TEditRewardData>({
    defaultValues: {
      userRole: "company",
      rewardType: "days",
      targetReferrals: "1",
      rewardAmount: "",
    },
  });

  const [editReward, { isLoading }] = useEditRewardMutation();

  const userRole = watch("userRole");
  const rewardType = watch("rewardType");

  const onSubmit = async (formData: TEditRewardData) => {
    try {
      let requestBody: any = {};

      const minReferrals = parseInt(formData.targetReferrals) || 1;
      const rewardAmount = parseInt(formData.rewardAmount) || 0;

      if (userRole === "company") {
        if (rewardType === "days") {
          requestBody = {
            is_percentage_company: false,
            min_referral_user_of_company: minReferrals,
            total_free_days_company: rewardAmount,
          };
        } else {
          // percent
          requestBody = {
            is_percentage_company: true,
            percentage_company: rewardAmount,
            min_referral_user_of_company: minReferrals,
          };
        }
      } else {
        // user (guard)
        if (rewardType === "days") {
          requestBody = {
            is_percentage_guard: false,
            min_referral_user_of_guard: minReferrals,
            total_free_days_guard: rewardAmount,
          };
        } else {
          // percent
          requestBody = {
            is_percentage_guard: true,
            percentage_guard: rewardAmount,
            min_referral_user_of_guard: minReferrals,
          };
        }
      }

      const response = await editReward(requestBody).unwrap();
      toast.success("Reward updated successfully!");
      reset();
      // Close modal
      const modal = document.getElementById("my_modal_6") as HTMLDialogElement;
      modal?.close();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update reward");
      console.error("Error updating reward:", error);
    }
  };
  return (
    <dialog id="my_modal_6" className="modal w-full">
      <div className="modal-box bg-white p-10 rounded-xl">
        <h3 className="font-medium text-[30px] text-center">Edit Reward</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="">
            <label className="font-medium text-[16px] text-heading block mb-2">
              User Role
            </label>
            <select
              className="select h-[52px] text-heading appearance-none bg-white outline-none border border-gray-400 rounded-lg w-full"
              {...register("userRole", { required: true })}
            >
              <option value="company">Company</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className="">
            <label className="font-medium text-[16px] text-heading block mb-2">
              Reward Type
            </label>
            <select
              className="select h-[52px] text-heading appearance-none bg-white outline-none border border-gray-400 rounded-lg w-full"
              {...register("rewardType", { required: true })}
            >
              <option value="days">Days</option>
              <option value="percent">Percent</option>
            </select>
          </div>
          <div>
            <label className="font-medium text-[16px] text-heading block mb-2">
              Target Referrals
            </label>
            <input
              type="number"
              min="1"
              placeholder="Enter minimum referrals"
              className="appearance-none py-3 px-4 outline-none border border-gray-400 rounded-lg w-full"
              {...register("targetReferrals", { required: true })}
            />
          </div>

          <div className="relative">
            <label className="font-medium text-[16px] text-heading block mb-2">
              {rewardType === "days" ? "Free Days" : "Percentage"}
            </label>
            <input
              type="number"
              min="1"
              max={rewardType === "percent" ? "100" : undefined}
              placeholder={
                rewardType === "days" ? "Enter free days" : "Enter percentage"
              }
              className="appearance-none py-3 px-4 outline-none border border-gray-400 rounded-lg w-full pr-24"
              {...register("rewardAmount", { required: true })}
            />
            <p className="font-normal text-[16px] bg-orange-200 absolute px-3 py-[13px] rounded-lg right-px text-gray-600 top-[33px]">
              {rewardType === "days" ? "Days" : "%"}
            </p>
          </div>

          <div className="modal-action">
            <button
              type="button"
              onClick={() => {
                const modal = document.getElementById(
                  "my_modal_6"
                ) as HTMLDialogElement;
                modal?.close();
                reset();
              }}
              className="w-full text-bg-primary border border-bg-primary font-medium text-[15px] rounded-xl py-3 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-bg-primary text-white font-medium text-[15px] rounded-xl py-3 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditRewardInfoModal;
