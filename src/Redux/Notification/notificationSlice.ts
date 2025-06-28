import {createSlice} from '@reduxjs/toolkit';
import {fetchNotifications, markNotificationRead} from './notificationThunk';

export type NotificationType = {
  _id: string;
  title: string;
  message: string;
  isRead: boolean;
};

type NotificationState = {
  data: NotificationType[];
  loading: boolean;
  error: string | null;
};

const initialState: NotificationState = {
  data: [],
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    resetNotificationState: state => {
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNotifications.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(markNotificationRead.fulfilled, (state, action) => {
        state.data = state.data.map(n =>
          n._id === action.payload ? {...n, isRead: true} : n,
        );
      });
  },
});

export const {resetNotificationState} = notificationSlice.actions;
export default notificationSlice.reducer;
