import axiosInstance from '../axiosInstance';
import { LoanWorkflowResponse } from '../types/loan';



export const fetchWorkflowStatus = async (userId: string): Promise<LoanWorkflowResponse> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Add 5s delay
  const response = await axiosInstance.get(
    `/onboarding-workflows/${userId}?1.73720794742933E9`,
  );
  return response.data;
};
