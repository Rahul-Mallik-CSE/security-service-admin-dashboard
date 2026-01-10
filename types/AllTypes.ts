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

export interface IDashboardStats {
  total_earnings: number;
  total_companies: number;
  total_guards: number;
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

export interface ICompanyManagementTableData extends ICompanyManagement {
  subscriptionDate?: string;
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
  created_at?: string;
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

// Contract Engagement API Types
export interface ILicenceType {
  id: number;
  title: string;
  discription: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ILicenceImage {
  id: number;
  file: string;
  created_at: string;
  updated_at: string;
}

export interface ILicence {
  id: number;
  state_or_territory: string | null;
  licence_no: string | null;
  expire_date: string | null;
  created_at: string;
  licence_type: ILicenceType;
  licence_images: ILicenceImage[];
}

export interface IAccreditationType {
  id: number;
  title: string;
  discription: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface IAccreditation {
  id: number;
  accreditation: string;
  expire_date: string | null;
  created_at: string;
  updated_at: string;
  accreditation_type: IAccreditationType;
}

export interface ICandidate {
  id: number;
  first_name: string;
  email: string;
  phone: string | null;
  is_email_varified: boolean;
  create_at: string;
  updated_at: string;
  image: string | null;
  last_activity: string | null;
  user_type: string;
  gender: string;
  is_admin_aproved: boolean;
  is_admin_rejected: boolean;
  is_subscribe: boolean;
  exprience_in_years: number;
  licences: ILicence[];
  accreditations: IAccreditation[];
  bank_name: string | null;
  account_holder_name: string | null;
  account_no: string | null;
  bank_branch: string | null;
}

export interface IApplication {
  id: number;
  status: string;
  candidate: ICandidate;
  currency: string;
  is_admin_aproved: boolean;
  avg_rating_main: string;
  avg_presentation_grooming: string;
  avg_communication: string;
  avg_reports_administration: string;
  avg_punctuality_reliability: string;
  avg_skills_attributes: string;
}

export interface IJobProvider {
  id: number;
  company: ICandidate;
  company_name: string;
  phone_number: string | null;
  abn_number: number | null;
  average_rating_main: string;
  average_comunication: string;
  average_reliability: string;
  average_pay_rate: string;
  average_professionalism: string;
  average_job_support: string;
}

export interface IJobDetails {
  id: number;
  applications: IApplication[];
  job_provider: IJobProvider;
  selected_list: IApplication[];
  job_title: string;
  latitude: number;
  longitude: number;
  address: string;
  job_date: string;
  start_time: string;
  end_time: string;
  job_duration: string;
  pay_type: string;
  pay_rate: string;
  operative_required: number;
  licence_type_requirements: number;
  min_rating_requirements: number;
  accreditations_requirements: number;
  is_preferred_guard: string;
  gender_requirements: string;
  language_requirements: string;
  status: string;
  engagement_type: string;
  provident_fund: number;
  job_details: string;
  created_at: string;
  updated_at: string;
}

export interface IContractEngagement {
  id: number;
  job_details: IJobDetails;
  application: IApplication;
  operative_trackers: string;
  contacts_trackers: string;
  amend_trackers: string;
  amend_details: string;
  new_end_time: string | null;
  total_amount: string;
  new_job_duration: string;
  signature_party_a: string | null;
  signature_party_b: string | null;
  created_at: string;
}

export interface IContractListAPIResponse {
  success: boolean;
  message: string;
  data: IContractEngagement[];
}

export interface IContractDetailsAPIResponse {
  success: boolean;
  message: string;
  engagements: IContractEngagement;
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

export interface IOperativeManagementData {
  candidate: IVerificationCenter;
  avg_rating_main: string;
}

export interface IOperativeManagementAPIResponse {
  success: boolean;
  message: string;
  data: IOperativeManagementData[];
}
