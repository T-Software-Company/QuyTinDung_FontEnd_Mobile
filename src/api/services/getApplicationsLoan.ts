import axiosInstance from '../axiosInstance';
import {
  Application,
  ApplicationsListResponse,
  ApiResponse,
} from '../types/getApplications';

export const getApplication = async (
  customerId: string,
): Promise<Application | undefined> => {
  try {
    const response = await axiosInstance.get<ApiResponse<ApplicationsListResponse>>(
      `/applications?filter=customer.id:'${customerId}' and status:'CREATING'`
    );

    return response.data.result.content[0];
  } catch (error) {
    console.error('Error fetching application:', error);
    return undefined;
  }
};

export const getApplications = async (
  customerId: string,
): Promise<Application[] | undefined> => {
  try {
    const response = await axiosInstance.get<ApiResponse<ApplicationsListResponse>>(
      `/applications?filter=customer.id:'${customerId}'`
    );

    return response.data.result.content;
  } catch (error) {
    console.error('Error fetching applications:', error);
    return undefined;
  }
};
