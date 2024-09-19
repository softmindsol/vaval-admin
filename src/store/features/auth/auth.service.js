import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

// Static API URLs
const ADMIN_LOGIN_URL = "http://74.208.237.94:6060/auth/login";
const ADMIN_LOGOUT_URL = "http://74.208.237.94:6060/auth/logout";

const login = createAsyncThunk(
   "auth/login",
   async (data, { rejectWithValue }) => {
      try {
         const response = await axios.post(ADMIN_LOGIN_URL, data);
         return response;
      } catch (error) {
         Swal.fire({
            title: "Error",
            text: error.message,
            icon: "error",
            timer: 2000
         });
         return rejectWithValue(error.message);
      }
   }
);

const logout = createAsyncThunk(
   "auth/logout",
   async (data, { rejectWithValue }) => {
      try {
         const response = await axios.post(ADMIN_LOGOUT_URL, data);
         return response;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   }
);

export { login, logout };
