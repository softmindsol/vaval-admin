import { createSlice } from '@reduxjs/toolkit';
import { login, logout } from './auth.service';

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    message: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.message = action.payload.data?.message;
                state.error = null;
                state.user = true
                console.log("gsgggsg",action.payload)
                localStorage.setItem("token", action.payload?.data?.token?.accessToken);
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.error = null;
                state.message = action.payload.data?.message;
                localStorage.clear();
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});


export default authSlice.reducer;
