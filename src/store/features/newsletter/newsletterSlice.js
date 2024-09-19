// src/redux/slices/newsletterSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Utility function to get the access token
const getToken = () => {
  // Example: fetch token from localStorage, Redux state, or another source
  return localStorage.getItem('token');
};

// Async thunk to fetch newsletter data
export const fetchNewsletters = createAsyncThunk(
  'newsletters/fetchNewsletters',
  async () => {
    const token = getToken();
    const response = await axios.get('http://74.208.237.94:6060/admin/newsletters', {
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the headers
      },
    });
    return response.data; // Assuming the data is an array
  }
);

const newsletterSlice = createSlice({
  name: 'newsletters',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsletters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsletters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNewsletters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default newsletterSlice.reducer;
