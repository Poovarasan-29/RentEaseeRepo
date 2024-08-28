import { createSlice } from '@reduxjs/toolkit';

const checkUserLoginSlice = createSlice({
    name: 'checkUserLogin',
    initialState: {
        userID: false
    },
    reducers: {
        setLoginSuccess: (state, action) => {
            state.userID = action.payload;
        },
        setLogout: (state) => {
            state.userID = false;
        }
    }
});

export const { setLoginSuccess, setLogout } = checkUserLoginSlice.actions;
export default checkUserLoginSlice.reducer;