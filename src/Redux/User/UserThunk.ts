import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../utils/apiClient';

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, {rejectWithValue}) => {
    try {
      const response = await apiClient.get('/user/profile');
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ?? 'Failed to fetch profile',
      );
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData: any, {rejectWithValue}) => {
    try {
      const response = await apiClient.put('/user/profile', profileData);
      console.log('🚀 ~ response:', response);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ?? 'Failed to update profile',
      );
    }
  },
);

export const updateUserPassword = createAsyncThunk(
  'user/updatePassword',
  async (
    passwordData: {oldPassword: string; newPassword: string},
    {rejectWithValue},
  ) => {
    try {
      const response = await apiClient.put('/user/password', passwordData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ?? 'Failed to update password',
      );
    }
  },
);

export const changePassword = createAsyncThunk<
  string,
  {oldPassword: string; newPassword: string},
  {rejectValue: string | string[]}
>('user/changePassword', async (payload, {rejectWithValue}) => {
  try {
    const response = await apiClient.put('/user/password', payload);
    console.log('🚀 ~ > ~ response:', response);
    return response.data.message;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message ?? 'Password update failed',
    );
  }
});
