/** @format */

"use client";
import SubscriptionCard from "@/components/DashboardComponents/SubscriptionCard";
import BackButton from "@/components/SharedComponents/BackButton";
import { useGetSubscriptionPlansQuery } from "@/redux/freatures/settingAPI";

const Subscription = () => {
  const { data, isLoading, error } = useGetSubscriptionPlansQuery();

  if (isLoading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-5">
          <div className="flex gap-5 items-center">
            <BackButton />
            <h2 className="text-2xl font-medium text-heading">Subscription</h2>
          </div>
        </div>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading subscription plans...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="flex justify-between items-center mb-5">
          <div className="flex gap-5 items-center">
            <BackButton />
            <h2 className="text-2xl font-medium text-heading">Subscription</h2>
          </div>
        </div>
        <div className="flex items-center justify-center h-96">
          <p className="text-red-600">
            Failed to load subscription plans. Please try again.
          </p>
        </div>
      </div>
    );
  }

  const subscriptionPlans = data?.data || [];

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <BackButton />
          <h2 className="text-2xl font-medium text-heading">Subscription</h2>
        </div>
      </div>

      {/* subscription card */}
      <div className="grid grid-cols-2 gap-9 px-10 mt-5">
        {subscriptionPlans.map((subscription) => (
          <SubscriptionCard key={subscription.id} subscription={subscription} />
        ))}
      </div>
    </div>
  );
};

export default Subscription;
