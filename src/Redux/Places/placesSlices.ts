import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchAutocomplete, fetchCoordinates} from './placesThunk';
import {Coordinates, Place, PlacesState} from './placesType';

export const initialState: PlacesState = {
  autocompleteResults: [],
  coordinates: null,
  loading: false,
  error: null,
};

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    resetAutoCompleteResults: state => {
      state.autocompleteResults = [];
    },
  },
  extraReducers: builder => {
    builder
      // Autocomplete
      .addCase(fetchAutocomplete.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAutocomplete.fulfilled,
        (state, action: PayloadAction<Place[]>) => {
          state.autocompleteResults = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchAutocomplete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Coordinates
      .addCase(fetchCoordinates.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCoordinates.fulfilled,
        (state, action: PayloadAction<Coordinates>) => {
          state.coordinates = action.payload;
          state.loading = false;
        },
      )
      .addCase(fetchCoordinates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {resetAutoCompleteResults} = placesSlice.actions;
export default placesSlice.reducer;
