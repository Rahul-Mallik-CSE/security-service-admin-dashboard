/** @format */

"use client";
import { ISubscriptionPlan } from "@/types/AllTypes";
import { useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { useUpdateSubscriptionPlanMutation } from "@/redux/freatures/settingAPI";
import { toast } from "react-toastify";

const SubscriptionCard = ({
  subscription,
}: {
  subscription: ISubscriptionPlan;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [duration, setDuration] = useState(subscription.duraton_day.toString());
  const [price, setPrice] = useState(subscription.price);
  const [updatePlan, { isLoading }] = useUpdateSubscriptionPlanMutation();

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await updatePlan({
        id: subscription.id,
        data: {
          duraton_day: parseInt(duration),
          price: parseFloat(price),
        },
      }).unwrap();

      toast.success("Subscription plan updated successfully!");
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("Failed to update plan:", error);
      toast.error(
        error?.data?.message || "Failed to update plan. Please try again."
      );
    }
  };

  return (
    <>
      <div className="shadow-2xl p-10 rounded-3xl space-y-10">
        <div className="text-center space-y-4">
          <h2 className="font-semibold text-3xl text-bg-primary capitalize">
            {subscription.plan_for}
          </h2>
          <h3 className="text-title font-semibold text-3xl">
            ${subscription.price}
            <span className="text-sm text-paragraph">
              /{subscription.duraton_day} days
            </span>
          </h3>
        </div>
        <div>
          <h2 className="text-heading font-semibold text-xl mb-5">
            Description
          </h2>
          <p className="text-[16px] text-paragraph leading-relaxed">
            {subscription.discriptions}
          </p>
        </div>
        <div className="space-y-4">
          <button
            onClick={handleEdit}
            className="font-semibold text-[16px] w-full bg-bg-primary py-4 text-white cursor-pointer rounded-2xl hover:bg-bg-primary/90 transition-colors"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <h3 className="text-2xl font-semibold text-heading mb-6">
              Edit {subscription.plan_for} Plan
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-[16px] font-medium block text-heading mb-2">
                  Duration (Days)
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="appearance-none w-full outline-none border border-gray-300 p-4 rounded-xl"
                  required
                  min="1"
                />
              </div>
              <div>
                <label className="text-[16px] font-medium block text-heading mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="appearance-none w-full outline-none border border-gray-300 p-4 rounded-xl"
                  required
                  min="0"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-bg-primary text-white font-medium text-[15px] rounded-xl py-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Updating..." : "Update"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-300 text-gray-700 font-medium text-[15px] rounded-xl py-3 cursor-pointer hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SubscriptionCard;
