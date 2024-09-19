import { createSlice } from '@reduxjs/toolkit';
import { addHolidays, updateOrder } from './slots.service';

const initialState = {
  data: [],
  orders: [],
  isLoading: false,
  error: null,
  message: '',
};

const slotsSlice = createSlice({
  name: 'slots',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(addHolidays.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addHolidays.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.data?.message;
        state.error = null;
        state.data = action.payload.data;
      })
      .addCase(addHolidays.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateOrder.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.data?.message;
        state.error = null;
        state.orders = action.payload.data;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

export default slotsSlice.reducer;
