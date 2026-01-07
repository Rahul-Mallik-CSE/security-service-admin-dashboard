/** @format */

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
}

export interface IRecentUserData {
  id: string;
  trId: string;
  userName: string;
  email: string;
  joinDate: string;
}

export interface IEarningList {
  id: string;
  trId: string;
  userName: string;
  name: string;
  email: string;
  date: string;
  amount: number;
  status: string;
}

export interface IVerificationCenter {
  id: number;
  email: string;
  status: boolean;
  phone: string | null;
  is_email_varified: boolean;
  is_phone_verified: boolean;
  image: string | null;
  last_activity: string | null;
  latitude: number | null;
  longitude: number | null;
  user_type: string;
  licences: any[];
  accreditations: any[];
  gender: string;
  language: string | null;
  exprience_in_years: number;
  exprience_summary: string;
  user_redus: number;
  bank_name: string | null;
  account_holder_name: string | null;
  account_no: string | null;
  bank_branch: string | null;
  is_applied: boolean;
  is_admin_aproved: boolean;
  is_admin_rejected: boolean;
  is_subscribe: boolean;
  create_at: string;
  updated_at: string;
}

export interface IVerificationAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IVerificationCenter[];
}

export interface IOperativeManagement {
  id: string;
  trId: string;
  operativeName: string;
  email: string;
  subscription: string;
  rating: number;
  status: "active" | "suspanded";
}

export interface ICompanyManagement {
  id: string;
  trId: string;
  companyName: string;
  email: string;
  subscription: string;
  rating: number;
  status: "active" | "suspanded";
}

export interface IJobs {
  id: string;
  jobId: string;
  jobTitle: string;
  assigned: number;
  company: string;
  payRate: number;
  dateTime: string;
  status: "pending" | "send";
}

export interface IContractList {
  id: string;
  contractId: string;
  job: string;
  companyName: string;
  operativesName: string;
  issueDate: string;
  status: "signed" | "cancel" | "pending";
}

export interface IPayrollReports {
  id: string;
  companyName: string;
  totalJobs: number;
  totalOperatives: number;
  totalHours: number;
  totalPay: number;
  status: "pending" | "send";
}

export interface IReferralManage {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  totalReferrals: number;
  subscribed: number;
}

export interface ISubscriptionPlan {
  id: number;
  name: string;
  pricePerMonth: number;
  benefits: string[];
}

export interface ISubscriptionUser {
  id: number;
  first_name: string;
  email: string;
  is_email_varified: boolean;
  create_at: string;
  updated_at: string;
  image: string;
  last_activity: string;
  user_type: string;
  gender: string;
  is_admin_aproved: boolean;
  is_admin_rejected: boolean;
  is_subscribe: boolean;
  exprience_in_years: number;
}

export interface ISubscription {
  id: number;
  user: ISubscriptionUser;
  invoice_date: string;
  plan: number;
  price: string;
  end_date: string;
  is_finished: boolean;
  is_earned: boolean;
  created_at: string;
  updated_at: string;
}

export interface ISubscriptionAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ISubscription[];
}

export interface PayrollAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: any[];
}
