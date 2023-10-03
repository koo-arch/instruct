import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
    status: [],
    error: null,
};

const countUsersStatusSlice = createSlice({
    name: 'countUsersStatus',
    initialState,
    reducers: {
        countUsersStatusFetchSuccess: (state, action) => {
            state.isLoading = false;
            state.status = action.payload;
            state.error = null;
        },
        countUsersStatusFetchFailure: (state, action) => {
            state.isLoading = false;
            state.status = [];
            state.error = action.payload;
        },
    },
});

export const { countUsersStatusFetchSuccess, countUsersStatusFetchFailure } = countUsersStatusSlice.actions;
export default countUsersStatusSlice.reducer;