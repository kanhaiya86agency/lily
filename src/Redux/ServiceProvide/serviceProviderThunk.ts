import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../utils/apiClient';

export const createServiceProvider = createAsyncThunk(
  'serviceProvider/create',
  async (data, {rejectWithValue}) => {
    try {
      const response = await apiClient.post('/service-providers', data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data ?? err.message);
    }
  },
);

export const updateServiceProvider = createAsyncThunk(
  'serviceProvider/update',
  async ({id, data}: any, {rejectWithValue}) => {
    try {
      const response = await apiClient.put(`/service-providers/${id}`, data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data ?? err.message);
    }
  },
);
