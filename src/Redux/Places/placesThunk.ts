import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../utils/apiClient';

export const fetchAutocomplete = createAsyncThunk(
  'places/fetchAutocomplete',
  async (query: string, thunkAPI) => {
    try {
      const response = await apiClient.get(
        `/places/autocomplete?input=${query}`,
      );
      return response.data.data;
    } catch (error: any) {
      console.log('🚀 ~ error:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchCoordinates = createAsyncThunk(
  'places/fetchCoordinates',
  async (placeId: string, thunkAPI) => {
    try {
      const response = await apiClient.get(
        `/places/coordinates?placeId=${placeId}`,
      );
      console.log('🚀 ~ response:', response);
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
