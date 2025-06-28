import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../utils/apiClient';

interface RatingPayload {
  serviceId: string;
  rating: number;
  comment: string;
}

export const submitRating = createAsyncThunk(
  'rating/submitRating',
  async (payload: RatingPayload, {rejectWithValue}) => {
    try {
      await apiClient.post('/rating', payload);
      return 'Rating submitted successfully';
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ?? 'Failed to submit rating',
      );
    }
  },
);

export const getRating = async ({id}: {id: string}) => {
  try {
    const response = await apiClient.get(`/rating/${id}`);
    console.log('🚀 ~ getRating ~ response:', response);
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message ?? 'Failed to fetch rating');
  }
};
