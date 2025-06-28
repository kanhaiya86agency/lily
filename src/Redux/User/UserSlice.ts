import {createSlice} from '@reduxjs/toolkit';
import {
  changePassword,
  fetchUserProfile,
  updateUserPassword,
  updateUserProfile,
} from './UserThunk';
import {UserState} from './userType';

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  success: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserState: state => {
      state.loading = false;
      state.success = null;
      state.error = null;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchUserProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateUserProfile.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = 'Profile updated successfully';
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(updateUserPassword.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateUserPassword.fulfilled, state => {
        state.loading = false;
        state.success = 'Password updated successfully';
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // change password

      .addCase(changePassword.pending, state => {
        state.loading = true;
        state.success = null;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const {resetUserState} = userSlice.actions;
export default userSlice.reducer;
