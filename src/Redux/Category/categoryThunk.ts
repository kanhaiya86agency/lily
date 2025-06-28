import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../utils/apiClient';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, {rejectWithValue}) => {
    try {
      const response = await apiClient.get('/service-providers/category');
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ?? 'Failed to fetch categories',
      );
    }
  },
);
