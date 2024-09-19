import api from "../../../utils/Api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ADD_HOLIDAYS, UPDATE_ORDER } from "../../../utils/baseURL";

const addHolidays = createAsyncThunk(
    "slots/addHolidays",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await api.post(`${ADD_HOLIDAYS}/${id}`, data);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const updateOrder = createAsyncThunk(
    "slots/updateOrder",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await api.put(`${UPDATE_ORDER}/${id}`, data);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);



export { addHolidays, updateOrder };
