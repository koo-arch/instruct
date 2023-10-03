import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
    places: [],
    error: null,
};

const countUsersPropsSlice = createSlice({
    name: 'countUsersProps',
    initialState,
    reducers: {
        countUsersPropsFetchSuccess: (state, action) => {
            state.isLoading = false;
            state.places = action.payload;
            state.error = null;
        },
        countUsersPropsFetchFailure: (state, action) => {
            state.isLoading = false;
            state.places = [];
            state.error = action.payload;
        },
    },
});

export const { countUsersPropsFetchSuccess, countUsersPropsFetchFailure } = countUsersPropsSlice.actions;
export default countUsersPropsSlice.reducer;