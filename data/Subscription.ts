/** @format */

import { ISubscriptionPlan } from "../types/AllTypes";

export const subscriptionPlans: ISubscriptionPlan[] = [
  {
    id: 1,
    name: "Company Subscription",
    pricePerMonth: 49,
    benefits: [
      "Post jobs",
      "Access verified guards",
      "Manage contracts and payroll reports",
      "Company dashboard and analytics",
    ],
  },
  {
    id: 2,
    name: "Guard Subscription",
    pricePerMonth: 29,
    benefits: [
      "Take control of your Income and Career",
      "Apply for verified jobs from trusted companies",
      "Track your completed and upcoming shifts",
      "Access your work history and performance ratings",
    ],
  },
];
