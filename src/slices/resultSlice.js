// client/src/slices/resultSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const fetchLeaderboard = createAsyncThunk(
  'result/fetchLeaderboard',
  async (_, { rejectWithValue }) => {
    try {
      // GET /api/results/leaderboard route we just created
      const { data } = await api.get(`/results/leaderboard`); 
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


// Fetch a single result by ID
export const getResultDetails = createAsyncThunk(
  'result/getResultDetails',
  async (resultId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/results/${resultId}`); 
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

// Fetch all results for the logged-in user
export const listMyResults = createAsyncThunk(
  'result/listMyResults',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/results/myresults`); 
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

const resultSlice = createSlice({
  name: 'result',
  initialState: {
    resultDetails: null,
    myResults: [],
    // ==========================================================
    // NEW LEADERBOARD STATE
    // ==========================================================
    leaderboard: [],
    leaderboardLoading: false,
    leaderboardError: null,
    // ==========================================================
    loading: false, // General loading state for other actions
    error: null, // General error state for other actions
    certificatePrice: null,
  },
  reducers: {
    // We will add reducers here if needed
    setResultDetails: (state, action) => {
        state.resultDetails = action.payload;
        state.loading = false;
        state.error = null; 
    },
  },
  extraReducers: (builder) => {
    builder
      // ==========================================================
      // Leaderboard Cases
      // ==========================================================
      .addCase(fetchLeaderboard.pending, (state) => {
        state.leaderboardLoading = true;
        state.leaderboardError = null;
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.leaderboardLoading = false;
        state.leaderboard = action.payload;
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.leaderboardLoading = false;
        state.leaderboardError = action.payload;
        state.leaderboard = []; // Clear data on error
      })

      // Fetch Result Details Cases
      .addCase(getResultDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.resultDetails = null;
      })
      .addCase(getResultDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.resultDetails = action.payload;
      })
      .addCase(getResultDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // List My Results Cases
      .addCase(listMyResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(listMyResults.fulfilled, (state, action) => {
        state.loading = false;
        state.myResults = action.payload;
      })
      .addCase(listMyResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setResultDetails } = resultSlice.actions;

export default resultSlice.reducer;