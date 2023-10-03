import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
    status: [],
    error: null,
};

const patrolStatusSlice = createSlice({
    name: 'patrolStatus',
    initialState,
    reducers: {
        patrolStatusFetchSuccess: (state, action) => {
            state.isLoading = false;
            state.status = action.payload;
            state.error = null;
        },
        patrolStatusFetchFailure: (state, action) => {
            state.isLoading = false;
            state.status = [];
            state.error = action.payload;
        },
    },
});

export const { patrolStatusFetchSuccess, patrolStatusFetchFailure } = patrolStatusSlice.actions;
export default patrolStatusSlice.reducer;