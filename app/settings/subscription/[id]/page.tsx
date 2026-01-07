/** @format */

"use client";
import FormHandler from "@/components/FormComponents/FormHandler";
import FormInput from "@/components/FormComponents/FormInput";
import BackButton from "@/components/SharedComponents/BackButton";
import React, { useState } from "react";
import { IoCheckmark } from "react-icons/io5";

type TSubscriptionData = {
  title: string;
  duration: string;
  amount: number;
};

const features: string[] = [
  "Take control of your Income and Career",
  "Apply for verified jobs from trusted companies",
  "Track your completed and upcoming shifts",
  "Access your work history and performance ratings",
  "Post jobs",
  "Access verified guards",
  "Manage contracts and payroll reports",
  "Company dashboard and analytics",
];

const AddSubscription = () => {
  const [role, setRole] = useState<string>("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const onsubmit = (data: TSubscriptionData) => {
    const newData = {
      ...data,
      role,
      features: selectedFeatures,
    };
    console.log(newData);
  };
  return (
    <div>
      <div className="flex gap-5 items-center">
        <BackButton></BackButton>
        <h2 className="text-2xl font-medium text-heading">Subscription</h2>
      </div>
      <div className="mt-5 w-1/2">
        <FormHandler onSubmit={onsubmit}>
          <div className="mb-2">
            <label className="block text-heading font-semibold text-[16px] mb-2">
              Select Role
            </label>
            <select
              onChange={(e) => setRole(e.target.value)}
              id="role"
              className="text-heading px-4 py-4 outline-none border border-gray-400 rounded-xl w-full"
            >
              <option value="company">Company</option>
              <option value="guard">Guard</option>
            </select>
          </div>
          <FormInput
            label="Package Title"
            name="title"
            type="text"
            placeholder="Enter package Title"
          ></FormInput>
          <FormInput
            label="Package Duration"
            name="duration"
            type="number"
            placeholder="Enter package duration"
          ></FormInput>
          <FormInput
            label="Package Amount"
            name="amount"
            type="number"
            placeholder="Enter package amount"
          ></FormInput>
          <div className="w-full bg-white rounded-2xl border border-title p-8 my-10">
            <h2 className="text-xl font-medium text-title mb-6">
              Select Features:
            </h2>

            <div className="space-y-3">
              {features.map((feature) => (
                <label
                  key={feature}
                  className="flex items-center gap-4 cursor-pointer group"
                >
                  <div className="relative shrink-0">
                    <input
                      type="checkbox"
                      checked={selectedFeatures.includes(feature)}
                      onChange={() => toggleFeature(feature)}
                      className="sr-only appearance-none"
                    />
                    <div
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                        selectedFeatures.includes(feature)
                          ? "bg-orange-500 border-orange-500"
                          : "bg-gray-100 border-gray-300 border-2 group-hover:border-orange-300"
                      }`}
                    >
                      {selectedFeatures.includes(feature) && (
                        <IoCheckmark className="text-white" size={20} />
                      )}
                    </div>
                  </div>

                  <span className="text-lg text-gray-800 group-hover:text-gray-900">
                    {feature}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-white font-medium text-[15px] bg-bg-primary py-3 px-10 rounded-xl cursor-pointer"
            >
              Create
            </button>
          </div>
        </FormHandler>
      </div>
    </div>
  );
};

export default AddSubscription;
