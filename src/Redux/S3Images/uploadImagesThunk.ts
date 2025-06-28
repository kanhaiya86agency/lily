import {createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../utils/apiClient';

type ImageFile = {
  uri: string;
  type: string;
  fileName: string;
};

export const uploadImage = createAsyncThunk<string, ImageFile>(
  'imageUpload/uploadImage',
  async (file, {rejectWithValue}) => {
    try {
      const formData = new FormData();

      formData.append('file', {
        uri: file.uri,
        name: file.fileName,
        type: file.type,
      } as any);

      const response = await apiClient.post('/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data?.data?.originalName;
    } catch (error: any) {
      console.error('Upload error:', error.response?.data ?? error.message);
      return rejectWithValue(error.response?.data?.message ?? 'Upload failed');
    }
  },
);
