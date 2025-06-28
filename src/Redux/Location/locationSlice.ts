import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

interface LocationState {
  currentLocation: string;
  loading: boolean;
  error: string | null;
}

const initialState: LocationState = {
  currentLocation: 'Choose your location',
  loading: false,
  error: null,
};

interface Coordinates {
  latitude: number;
  longitude: number;
}

export const fetchCurrentLocation = createAsyncThunk<
  string,
  Coordinates,
  {rejectValue: string}
>(
  'location/fetchCurrentLocation',
  async ({latitude, longitude}, {rejectWithValue}) => {
    console.log('🚀 ~ longitude:,,,,,,,,,,,,,,,,,', longitude);
    console.log('🚀 ~ latitude:', latitude);
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
      );
      return res.data.display_name;
    } catch (error) {
      console.error('Error fetching location:', error);
      return rejectWithValue('Unable to fetch location');
    }
  },
);

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCurrentLocation.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCurrentLocation.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.currentLocation = action.payload;
        },
      )
      .addCase(fetchCurrentLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to get location';
        state.currentLocation = 'Location not found';
      });
  },
});

export default locationSlice.reducer;
