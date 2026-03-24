import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// --- EXISTING THUNK (For Admins) ---
export const fetchPaymentHistory = createAsyncThunk(
  'payment/fetchHistory',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/payments/history');
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// --- NEW THUNK (For Standard Users) ---
export const fetchMyPayments = createAsyncThunk(
  'payment/fetchMyPayments',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/payments/my-history');
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: { 
    payments: [],     // Holds all payments for the Admin dashboard
    myPayments: [],   // NEW: Holds personal payments for standard users
    loading: false, 
    error: null 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // --- ADMIN CASES ---
      .addCase(fetchPaymentHistory.pending, (state) => { state.loading = true; })
      .addCase(fetchPaymentHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchPaymentHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // --- USER CASES ---
      .addCase(fetchMyPayments.pending, (state) => { state.loading = true; })
      .addCase(fetchMyPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.myPayments = action.payload; // Saves to the new user state array
      })
      .addCase(fetchMyPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;