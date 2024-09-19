import { createSlice } from "@reduxjs/toolkit";
import { deleteService, getServices, updateService } from "./services.service";

const initialState = {
    servicesData: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
    message: "",
};

export const servicesSlice = createSlice({
    name: "service",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getServices.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getServices.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.servicesData = action.payload;
            })
            .addCase(getServices.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.errorMessage = action.payload;
            })
            .addCase(deleteService.pending, (state) => {
                state.isLoading = true;
            })

            .addCase(deleteService.fulfilled, (state, action) => {
                const updatedData = state.servicesData.data.filter(
                    (service) => service._id !== action.payload
                );
                return {
                    ...state,
                    isLoading: false,
                    isSuccess: true,
                    servicesData: {
                        data: updatedData,
                    },
                };
            })
            .addCase(deleteService.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.errorMessage = action.payload;
            })
            .addCase(updateService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateService.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.servicesData = action.payload;
                state.message = action.payload?.data?.message;
            })

            .addCase(updateService.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.errorMessage = action.payload;
            })
    },
});

export default servicesSlice.reducer;
