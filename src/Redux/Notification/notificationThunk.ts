import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../utils/apiClient';

export const fetchNotifications = createAsyncThunk(
  'notification/fetchNotifications',
  async ({page = 1, limit = 10}: {page?: number; limit?: number}, thunkAPI) => {
    try {
      const response = await apiClient.get('/notification/list', {
        params: {page, limit},
      });
      console.log('🚀 ~ response:', response);
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? 'Error fetching notifications',
      );
    }
  },
);

export const markNotificationRead = createAsyncThunk(
  'notification/markNotificationRead',
  async (id: string, thunkAPI) => {
    try {
      await apiClient.put(`/notification/${id}`);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? 'Error updating notification',
      );
    }
  },
);
