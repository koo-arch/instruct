import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
    period: 0,
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
            state.period = 0;
            state.error = action.payload;
        },
    },
});

export const { currentTimetableFetchSuccess, currentTimetableFetchFailure } = currentTimetableSlice.actions;
export default currentTimetableSlice.reducer;