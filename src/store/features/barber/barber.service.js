import api from "../../../utils/Api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
   ADD_HOLIDAYS,
   DELETE_BARBER,
   GET_BARBER,
   GET_SINGLE_BARBER,
   UPDATE_BARBER,
} from "../../../utils/baseURL";

const getBarbers = createAsyncThunk(
   "barber/getBarbers",
   async (data, { rejectWithValue }) => {
      try {
         const response = await api.get(`${GET_BARBER}`, data);
         return response.data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

const getSingleBarber = createAsyncThunk(
   "barber/getSingleBarber",
   async (id, { rejectWithValue }) => {
      try {
         const { response } = await api.get(`${GET_SINGLE_BARBER}/${id}`);
         return response;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

const deleteBarber = createAsyncThunk(
   "barber/deleteBarber",
   async (id, { rejectWithValue }) => {
      try {
         const response = await api.delete(`${DELETE_BARBER}/${id}`);
         return id;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

const updateBarber = createAsyncThunk(
   "barber/updateBarber",
   async ({ id, data }, { rejectWithValue }) => {
      try {
         const response = await api.put(`${UPDATE_BARBER}/${id}`, data);
         return response.data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

const unavailableBarber = createAsyncThunk(
   "slots/unavailableBarber",
   async ({ id, data }, { rejectWithValue }) => {
      try {
         const response = await api.post(
            `${ADD_HOLIDAYS}/${id}`, data
         );
         return response;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export { getBarbers, deleteBarber, getSingleBarber, updateBarber, unavailableBarber };
