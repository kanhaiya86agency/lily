import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import apiClient from '../../utils/apiClient';
import {Room, RoomDetail} from './type';

interface RoomsState {
  rooms: Room[];
  room: RoomDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: RoomsState = {
  rooms: [],
  room: null,
  loading: false,
  error: null,
};

export const fetchRooms = createAsyncThunk<Room[]>(
  'rooms/fetchRooms',
  async () => {
    const response = await apiClient.get('/communication/rooms');
    return response.data.data;
  },
);

export const fetchRoomDetail = createAsyncThunk<RoomDetail, string>(
  'rooms/fetchRoomDetail',
  async roomId => {
    const response = await apiClient.get<RoomDetail>(
      `/communication/${roomId}`,
    );
    return response.data;
  },
);

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    clearRoomDetail: state => {
      state.room = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRooms.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load rooms';
      })

      .addCase(fetchRoomDetail.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoomDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.room = action.payload;
      })
      .addCase(fetchRoomDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load room detail';
      });
  },
});

// export default roomsSlice.reducer;
export const {clearRoomDetail} = roomsSlice.actions;
export default roomsSlice.reducer;
