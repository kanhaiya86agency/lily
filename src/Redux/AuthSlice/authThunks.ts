import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {AuthResponse, LoginPayload, SignupPayload} from './authTypes';
import config from '../../config';
import {storeToken} from '../../utils/tokenStorage';

export const loginUser = createAsyncThunk<AuthResponse, LoginPayload>(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        `${config.BASE_URL}/auth/login`,
        credentials,
      );
      const data: AuthResponse = response.data.data;

      console.log('🚀 ~ data:', data);

      await storeToken(data.token, data.id);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? 'Login failed',
      );
    }
  },
);

export const signupUser = createAsyncThunk<AuthResponse, SignupPayload>(
  'auth/signupUser',
  async (details, thunkAPI) => {
    try {
      const response = await axios.post(
        `${config.BASE_URL}/auth/register`,
        details,
      );
      const data: AuthResponse = response.data.data;
      await storeToken(data.token);
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? 'Signup failed',
      );
    }
  },
);
