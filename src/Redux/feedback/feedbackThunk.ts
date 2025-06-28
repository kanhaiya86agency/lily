import axios from 'axios';
import apiClient from '../../utils/apiClient';
export interface Feedback {
  _id: string;
  serviceId: string;
  rating: number;
  message: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export const submitFeedbackAPI = async (data: {
  serviceId: string;
  rating: number;
  message: string;
  type: string;
}) => {
  try {
    const response = await apiClient.post('/feedback', data, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    console.log('🚀 ~ response:', response);
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const msg = error.response?.data?.message ?? error.message;
      console.log('🚀 ~ msg:', msg);
      throw new Error(msg);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export const getAllFeedback = async (): Promise<Feedback[]> => {
  try {
    const response = await apiClient.get('/feedback');
    return response.data.data;
  } catch (error: any) {
    console.error(
      'Failed to fetch feedback:',
      error?.response?.data ?? error.message,
    );
    throw new Error(error?.response?.data?.message ?? 'Something went wrong');
  }
};
