import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import patrolPlacesReducer from './patrolPlacesSlice';
import countUsersPropsReducer from './countUsersPropsSlice';
import currentTimetableReducer from './currentTimetableSlice';
import patrolStatusReducer from './patrolStatusSlice';
import countUsersStatusReducer from './countUsersStatusSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        patrolPlaces: patrolPlacesReducer,
        countUsersProps: countUsersPropsReducer,
        currentTimetable: currentTimetableReducer,
        patrolStatus: patrolStatusReducer,
        countUsersStatus: countUsersStatusReducer,
    },
});

export default store;