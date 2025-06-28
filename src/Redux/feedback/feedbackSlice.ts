import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Feedback, getAllFeedback, submitFeedbackAPI} from './feedbackThunk';

export const submitFeedback = createAsyncThunk(
  'feedback/submitFeedback',
  async (feedbackData: {
    serviceId: string;
    rating: number;
    message: string;
    type: string;
  }) => {
    return await submitFeedbackAPI(feedbackData);
  },
);

interface FeedbackState {
  loading: boolean;
  success: boolean;
  error: string | null;
  feedbacks: Feedback[];
}

const initialState: FeedbackState = {
  loading: false,
  success: false,
  error: null,
  feedbacks: [],
};

export const fetchAllFeedback = createAsyncThunk(
  'feedback/fetchAll',
  async _ => {
    return await getAllFeedback();
  },
);

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    resetStatus: state => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(submitFeedback.pending, state => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitFeedback.fulfilled, state => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error submitting feedback';
      })
      .addCase(fetchAllFeedback.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(fetchAllFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch feedback';
      });
  },
});

export const {resetStatus} = feedbackSlice.actions;
export default feedbackSlice.reducer;
