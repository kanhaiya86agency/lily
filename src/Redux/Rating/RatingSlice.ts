import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getRating, submitRating} from './RatingThunk';

export interface Rating {
  _id: string;
  rating: number;
  comment: string;
  user: string;
  serviceId: string;
  createdAt: string;
}

interface RatingState {
  ratings: Rating[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: RatingState = {
  ratings: [],
  loading: false,
  error: null,
  success: false,
};

export const fetchRatings = createAsyncThunk<
  Rating[],
  {id: string},
  {rejectValue: string}
>('ratings/fetchRatings', async ({id}, {rejectWithValue}) => {
  try {
    const data = await getRating({id});
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message ?? 'Failed to fetch ratings');
  }
});

const ratingSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {
    resetRatingState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch Ratings
      .addCase(fetchRatings.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRatings.fulfilled, (state, action) => {
        state.loading = false;
        state.ratings = action.payload;
      })
      .addCase(fetchRatings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch ratings';
      })

      // Submit Rating
      .addCase(submitRating.pending, state => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitRating.fulfilled, state => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitRating.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const {resetRatingState} = ratingSlice.actions;
export default ratingSlice.reducer;
