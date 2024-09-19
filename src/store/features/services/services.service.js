import api from "../../../utils/Api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { DELETE_SERVICE, GET_SERVICES, UPDATE_SERVICE } from "../../../utils/baseURL";


const getServices = createAsyncThunk(
    "service/getServices",
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.get(
                `${GET_SERVICES}`,
                data
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const deleteService = createAsyncThunk(
    "service/deleteService",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.delete(
                `${DELETE_SERVICE}/${id}`
            );
            return id;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const updateService = createAsyncThunk(
    "service/updateService",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await api.put(
                `${UPDATE_SERVICE}/${id}`,
                data
            );
            return { id, data: response.data };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export { getServices, deleteService, updateService };
