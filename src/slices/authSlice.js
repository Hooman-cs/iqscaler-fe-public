// client/src/slices/authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// Login Thunk
export const authUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/users/login', credentials);
      localStorage.setItem('userInfo', JSON.stringify(data));
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

// Register Thunk
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/users', userData);
      localStorage.setItem('userInfo', JSON.stringify(data));
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

// --- NEW Admin User Management Thunks ---

// Fetch all users (Admin only)
export const listUsers = createAsyncThunk(
  'users/list',
  async (_, { rejectWithValue }) => {
    try {
      // Uses axios interceptor for token authorization
      const { data } = await api.get('/users'); 
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

// Delete a user (Admin only)
export const deleteUser = createAsyncThunk(
  'users/delete',
  async (userId, { rejectWithValue }) => {
    try {
      // DELETE /api/users/:id
      const { data } = await api.delete(`/users/${userId}`); 
      return { id: userId, message: data.message }; // Return ID and message
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

// Update a user (Admin only)
export const updateUser = createAsyncThunk(
  'users/update',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      // PUT /api/users/:id
      const { data } = await api.put(`/users/${userId}`, userData); 
      return data; // Returns the updated user object
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (idToken, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/users/google', { idToken });
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// --- Slice Definition ---

const initialState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
  loading: false,
  error: null,
  // NEW ADMIN MANAGEMENT STATES
  usersList: [],
  usersLoading: false,
  usersError: null,
  usersSuccess: false, // For delete/update operations success
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Logout Reducer
    logout: (state) => {
      state.userInfo = null;
      state.usersList = []; // Clear user list on logout
      localStorage.removeItem('userInfo');
    },
    // Reducer to reset success state after Admin CRUD operation
    resetUserSuccess: (state) => {
      state.usersSuccess = false;
      state.usersError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Auth Cases
      .addCase(authUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // --- Admin User List Cases (List Users) ---
      .addCase(listUsers.pending, (state) => {
        state.usersLoading = true;
        state.usersError = null;
        state.usersSuccess = false;
      })
      .addCase(listUsers.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.usersList = action.payload;
      })
      .addCase(listUsers.rejected, (state, action) => {
        state.usersLoading = false;
        state.usersError = action.payload;
      })

      // --- Admin Delete User Cases (Delete User) ---
      .addCase(deleteUser.pending, (state) => {
        state.usersLoading = true;
        state.usersSuccess = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.usersSuccess = true;
        // Filter the list to remove the deleted user by ID
        state.usersList = state.usersList.filter(user => user._id !== action.payload.id);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.usersLoading = false;
        state.usersError = action.payload;
        state.usersSuccess = false;
      })

      // --- Admin Update User Cases (Update User) ---
      .addCase(updateUser.pending, (state) => {
        state.usersLoading = true;
        state.usersSuccess = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.usersSuccess = true;
        // Replace the old user with the updated user in the list
        state.usersList = state.usersList.map(user => 
          user._id === action.payload._id ? action.payload : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.usersLoading = false;
        state.usersError = action.payload;
        state.usersSuccess = false;
      })

      .addCase(googleLogin.pending, (state) => { state.loading = true; })
  .addCase(googleLogin.fulfilled, (state, action) => {
    state.loading = false;
    state.userInfo = action.payload;
  })
  .addCase(googleLogin.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  });
  },
});

export const { logout, resetUserSuccess } = authSlice.actions;

export default authSlice.reducer;