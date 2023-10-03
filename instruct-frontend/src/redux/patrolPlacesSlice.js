import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
    places: [],
    error: null,
};

const patrolPlacesSlice = createSlice({
    name: 'patrolPlaces',
    initialState,
    reducers: {
        patrolPlacesFetchSuccess: (state, action) => {
            state.isLoading = false;
            state.places = action.payload;
            state.error = null;
        },
        patrolPlacesFetchFailure: (state, action) => {
            state.isLoading = false;
            state.places = [];
            state.error = action.payload;
        },
    },
});

export const { patrolPlacesFetchSuccess, patrolPlacesFetchFailure } = patrolPlacesSlice.actions;
export default patrolPlacesSlice.reducer;