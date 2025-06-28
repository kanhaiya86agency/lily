import {createSlice} from '@reduxjs/toolkit';
import {
  createServiceProvider,
  updateServiceProvider,
} from './serviceProviderThunk';

const serviceProviderSlice = createSlice({
  name: 'serviceProvider',
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: builder => {
    // Create
    builder
      .addCase(createServiceProvider.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createServiceProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createServiceProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update
    builder
      .addCase(updateServiceProvider.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateServiceProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateServiceProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default serviceProviderSlice.reducer;
