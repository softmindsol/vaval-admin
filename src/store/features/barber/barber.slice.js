import { createSlice } from "@reduxjs/toolkit";
import { getBarbers, deleteBarber, updateBarber, unavailableBarber } from "./barber.service";

const initialState = {
   data: [],
   isLoading: false,
   isSuccess: false,
   errorMessage: "",
   message: "",
};

export const barberSlice = createSlice({
   name: "barber",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getBarbers.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(getBarbers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
         })
         .addCase(getBarbers.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = action.payload;
         })
         .addCase(deleteBarber.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(deleteBarber.fulfilled, (state, action) => {
            const updatedData = state.data.barber.filter(
               (barber) => barber._id !== action.payload
            );

            return {
               ...state,
               isLoading: false,
               isSuccess: true,
               data: { ...state.data, barber: updatedData },
            };
         })
         .addCase(deleteBarber.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = action.payload;
         })
         .addCase(updateBarber.pending, (state) => {
            state.isLoading = true;
         })
         .addCase(updateBarber.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.data = action.payload;
            state.message = action.payload.message;
         })
         .addCase(updateBarber.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errorMessage = action.payload;
         })
   },
});

export default barberSlice.reducer;
