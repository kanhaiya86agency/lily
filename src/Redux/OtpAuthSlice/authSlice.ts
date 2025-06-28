import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';
import {AuthResponse} from '../AuthSlice/authTypes';
import {storeToken} from '../../utils/tokenStorage';

export const requestOtp = createAsyncThunk(
  'auth/requestOtp',
  async (phone: string, {rejectWithValue}) => {
    try {
      const response = await axios.post(`${config.BASE_URL}/auth/request-otp`, {
        phone,
      });
      console.log('🚀 ~ response:', response.data);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data ?? 'Something went wrong');
    }
  },
);

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async (formData, {rejectWithValue}) => {
    try {
      const response = await axios.post(
        `${config.BASE_URL}/auth/verify-otp`,
        formData,
      );
      const data: AuthResponse = response.data.data;
      await storeToken(data.token, data.id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data ?? 'Verification failed');
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    success: false,
    error: null,
    verificationSuccess: false,
    verificationError: null,
  },
  reducers: {
    resetAuthState: state => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.verificationSuccess = false;
      state.verificationError = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(requestOtp.pending, state => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(requestOtp.fulfilled, state => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(requestOtp.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : action.payload?.message ?? 'Something went wrong';
      })
      .addCase(verifyOtp.pending, state => {
        state.loading = true;
        state.verificationSuccess = false;
        state.verificationError = null;
      })
      .addCase(verifyOtp.fulfilled, state => {
        state.loading = false;
        state.verificationSuccess = true;
        state.verificationError = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.verificationSuccess = false;
        state.verificationError = action.payload;
      });
  },
});

export const {resetAuthState} = authSlice.actions;
export default authSlice.reducer;
