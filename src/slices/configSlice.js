// client/src/slices/configSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// --- Async Thunks ---

// Fetch the current test configuration
export const fetchTestConfig = createAsyncThunk(
  'config/fetchTestConfig',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/config/test');
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

// Update the test configuration (Admin only)
export const updateTestConfig = createAsyncThunk(
  'config/updateTestConfig',
  async (configData, { rejectWithValue }) => {
    try {
      // The API endpoint is the same for GET and PUT
      const { data } = await api.put('/config/test', configData); 
      return data;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

// --- Config Slice Definition ---

const configSlice = createSlice({
  name: 'config',
  initialState: {
    testConfig: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetConfigSuccess: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Config Cases
      .addCase(fetchTestConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.testConfig = action.payload;
      })
      .addCase(fetchTestConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Config Cases
      .addCase(updateTestConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateTestConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.testConfig = action.payload; // Update with the new config
      })
      .addCase(updateTestConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetConfigSuccess } = configSlice.actions;

export default configSlice.reducer;