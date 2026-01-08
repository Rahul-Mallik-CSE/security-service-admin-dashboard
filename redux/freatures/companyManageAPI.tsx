/** @format */

import baseAPI from "../api/baseAPI";

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

export interface IAccreditation {
  id: number;
  accreditation: string;
  expire_date: string | null;
  created_at: string;
  updated_at: string;
  accreditation_type: number;
}

export interface ICompanyUser {
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
  licences: ILicence[];
  accreditations: IAccreditation[];
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

export interface IInvoiceUser {
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

export interface IInvoice {
  id: number;
  user: IInvoiceUser;
  invoice_date: string;
  plan: number;
  price: string;
  end_date: string;
  is_finished: boolean;
  is_earned: boolean;
  created_at: string;
  updated_at: string;
}

export interface ICompanyData {
  company_name: string | null;
  company: ICompanyUser;
  average_rating_main: string;
  invoices: IInvoice[];
}

export interface ICompanyManagementAPIResponse {
  success: boolean;
  message: string;
  companies: ICompanyData[];
}

const companyManageAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getCompanyManagement: build.query<ICompanyManagementAPIResponse, void>({
      query: () => ({
        url: "/api/admin/company-management/",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetCompanyManagementQuery } = companyManageAPI;

export default companyManageAPI;
