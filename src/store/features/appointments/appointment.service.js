import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/Api";
import { GET_APPOINTMENTS } from "../../../utils/baseURL";

const getAppointments = createAsyncThunk(
    "appointments/getAppointments",
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.get(`${GET_APPOINTMENTS}`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export { getAppointments };
