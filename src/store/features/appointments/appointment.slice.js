import { createSlice } from "@reduxjs/toolkit";
import { getAppointments } from "./appointment.service";

const initialState = {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
    message: "",
};

export const servicesSlice = createSlice({
    name: "appointments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAppointments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAppointments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.data = action.payload;
            })
            .addCase(getAppointments.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.errorMessage = action.payload;
            })
    },
});

export default servicesSlice.reducer;
