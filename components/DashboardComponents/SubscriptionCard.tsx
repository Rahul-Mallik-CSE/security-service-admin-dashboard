/** @format */

"use client";
import { ISubscriptionPlan } from "@/types/AllTypes";
import Link from "next/link";
import { IoCheckmark } from "react-icons/io5";

const SubscriptionCard = ({
  subscription,
}: {
  subscription: ISubscriptionPlan;
}) => {
  const handleDeletePlan = () => {
    console.log("delete plan");
  };
  return (
    <div className="shadow-2xl p-10 rounded-3xl space-y-10">
      <div className="text-center space-y-4">
        <h2 className="font-semibold text-3xl text-bg-primary">
          {subscription?.name}
        </h2>
        <h3 className="text-title font-semibold text-3xl">
          ${subscription.pricePerMonth}
          <span className="text-sm text-paragraph">/per month</span>
        </h3>
      </div>
      <div>
        <h2 className="text-heading font-semibold text-xl mb-5">Benefits</h2>
        <ul className="space-y-5">
          {subscription.benefits.map((benefit: string, index: number) => (
            <li className="flex items-center gap-2" key={index}>
              <IoCheckmark
                className="bg-title text-white p-1 rounded-full"
                size={24}
              />
              <span className="text-[16px] font-medium text-[#454545]">
                {benefit}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-4">
        <button className="font-semibold text-[16px] w-full bg-bg-primary py-4 text-white cursor-pointer rounded-2xl">
          Edit
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
