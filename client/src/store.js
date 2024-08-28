import { configureStore } from '@reduxjs/toolkit';
import checkUserLoginSlice from './slice/checkUserLoginSlice';


const store = configureStore({
    reducer: {
        checkUserLoginSlice
    }
})
export default store;