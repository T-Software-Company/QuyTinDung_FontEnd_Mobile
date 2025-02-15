import axiosInstance from '../axiosInstance';
import {
  CreateFinancialInfoRequest,
  FinancialInfoResponse,
} from '../types/financialInfo';
import {LoanWorkflowResponse, UserInit} from '../types/loanInit';
import {CreateLoanPlanRequest, LoanPlanResponse} from '../types/loanPlan';
import {LoanRequestBody} from '../types/loanRequest';

export const initLoan = async (
  params: UserInit,
): Promise<LoanWorkflowResponse> => {
  const response = await axiosInstance.post(
    `/applications?customerId=${params.userId}`,
    {
      userId: params.userId,
    },
  );
  return response.data;
};

export const fetchWorkflowStatus = async (
  userId: string,
): Promise<LoanWorkflowResponse> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Add 5s delay
  const response = await axiosInstance.get(
    `/onboarding-workflows/${userId}`,
  );
  return response.data;
};

export const loanRequest = async (
  applicationId: string,
  loanData: Omit<LoanRequestBody, 'application'>,
): Promise<LoanWorkflowResponse> => {
  const requestBody: LoanRequestBody = {
    ...loanData,
    application: {
      id: applicationId,
    },
  };

  const response = await axiosInstance.post(
    `/loan-requests?applicationId=${applicationId}`,
    requestBody,
  );
  return response.data;
};

export const loanPlan = async (
  applicationId: string,
  loanPlanData: Omit<CreateLoanPlanRequest, 'application'>,
): Promise<LoanPlanResponse> => {
  const requestBody: CreateLoanPlanRequest = {
    ...loanPlanData,
    application: {
      id: applicationId,
    },
  };

  const response = await axiosInstance.post(
    `/loan-plans?applicationId=${applicationId}`,
    requestBody,
  );
  return response.data;
};

export const financialInfo = async (
  applicationId: string,
  financialInfoData: Omit<CreateFinancialInfoRequest, 'application'>,
): Promise<FinancialInfoResponse> => {
  const requestBody: CreateFinancialInfoRequest = {
    ...financialInfoData,
    application: {
      id: applicationId,
    },
  };

  const response = await axiosInstance.post(
    `/financial-infos?applicationId=${applicationId}`,
    requestBody,
  );
  return response.data;
};
