import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {uploadImage} from './uploadImagesThunk';

interface ImageUploadState {
  loading: boolean;
  error: string | null;
  imageUrl: string | null;
}

const initialState: ImageUploadState = {
  loading: false,
  error: null,
  imageUrl: null,
};

const imageUploadSlice = createSlice({
  name: 'imageUpload',
  initialState,
  reducers: {
    clearImage: state => {
      state.imageUrl = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(uploadImage.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        uploadImage.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.imageUrl = action.payload;
        },
      )
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Image upload failed';
      });
  },
});

export const {clearImage} = imageUploadSlice.actions;
export default imageUploadSlice.reducer;
