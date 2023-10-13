import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
    period: [],
    error: null,
};

const currentTimetableSlice = createSlice({
    name: 'currentTimetable',
    initialState,
    reducers: {
        currentTimetableFetchSuccess: (state, action) => {
            state.isLoading = false;
            state.period = action.payload;
            state.error = null;
        },
        currentTimetableFetchFailure: (state, action) => {
            state.isLoading = false;
            state.period = [];
            state.error = action.payload;
        },
    },
});

export const { currentTimetableFetchSuccess, currentTimetableFetchFailure } = currentTimetableSlice.actions;
export default currentTimetableSlice.reducer;