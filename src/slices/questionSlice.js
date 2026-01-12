// client/src/slices/questionSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

// --- Admin Thunks ---

// Fetch all questions for Admin view
export const fetchQuestions = createAsyncThunk(
'questions/fetchQuestions',
async (_, { rejectWithValue }) => {
 try {
 const { data } = await api.get('/questions');
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

// NEW THUNK: Fetch all unique categories from the database
export const fetchCategories = createAsyncThunk(
'questions/fetchCategories',
async (_, { rejectWithValue }) => {
 try {
 // Calls the new backend route GET /api/questions/categories
 const { data } = await api.get('/questions/categories');
 return data; // Data is an array of strings: ['Verbal', 'Numerical', ...]
 } catch (error) {
 const message =
  error.response && error.response.data.message
  ? error.response.data.message
  : error.message;
 return rejectWithValue(message);
 }
}
);

// Create a new question
export const createQuestion = createAsyncThunk(
'questions/createQuestion',
async (questionData, { rejectWithValue }) => {
 try {
 const { data } = await api.post('/questions', questionData);
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

// Update an existing question
export const updateQuestion = createAsyncThunk(
'questions/updateQuestion',
async ({ id, questionData }, { rejectWithValue }) => {
 try {
 const { data } = await api.put(`/questions/${id}`, questionData);
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

// Delete a question
export const deleteQuestion = createAsyncThunk(
'questions/deleteQuestion',
async (id, { rejectWithValue }) => {
 try {
 await api.delete(`/questions/${id}`);
 return id; // Return the deleted ID
 } catch (error) {
 const message =
  error.response && error.response.data.message
  ? error.response.data.message
  : error.message;
 return rejectWithValue(message);
 }
}
);

// --- User Quiz Thunk ---

// Fetch randomized questions for the user test
export const getTestQuestions = createAsyncThunk(
'questions/getTestQuestions',
async (_, { rejectWithValue }) => {
 try {
 // Calls the public backend route for randomized questions
 const { data } = await api.get('/questions/test');
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


// --- Slice Definition ---

const initialState = {
// Admin-specific states (for question list/CRUD)
questions: [], 
loading: false,
error: null,
success: false,

 // NEW: Category specific states
 availableCategories: [],
 categoryLoading: false,
 categoryError: null,

// User Quiz-specific states
testQuestions: null, // The array of questions for the current test
testLoading: false,
testError: null,
};

const questionSlice = createSlice({
name: 'question',
initialState,
reducers: {
 // Reducer to reset success state after Admin CRUD
 resetQuestionSuccess: (state) => {
 state.success = false;
 state.error = null;
 },
  // Optionally, add a reducer to manually update categories if a new one is created
  addCategory: (state, action) => {
    if (!state.availableCategories.includes(action.payload)) {
      state.availableCategories.push(action.payload);
      state.availableCategories.sort(); // Keep the list sorted
    }
  }
},
extraReducers: (builder) => {
 builder
 // Admin Fetch Questions Cases
 .addCase(fetchQuestions.pending, (state) => {
  state.loading = true;
  state.error = null;
  state.success = false;
 })
 .addCase(fetchQuestions.fulfilled, (state, action) => {
  state.loading = false;
  state.questions = action.payload;
 })
 .addCase(fetchQuestions.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
 })

  // NEW: Fetch Categories Cases
 .addCase(fetchCategories.pending, (state) => {
  state.categoryLoading = true;
  state.categoryError = null;
 })
 .addCase(fetchCategories.fulfilled, (state, action) => {
  state.categoryLoading = false;
  state.availableCategories = action.payload; 
 })
 .addCase(fetchCategories.rejected, (state, action) => {
  state.categoryLoading = false;
  state.categoryError = action.payload;
 })
 
  // --- Admin Create Question Cases ---
  .addCase(createQuestion.pending, (state) => {
   state.loading = true;
   state.success = false;
  })
  .addCase(createQuestion.fulfilled, (state, action) => {
   state.loading = false;
   state.success = true;
   // Add the newly created question to the list
   state.questions.push(action.payload);
   // If a new category was created, manually add it (though fetching again is safer)
   if (action.payload.category && !state.availableCategories.includes(action.payload.category)) {
    state.availableCategories.push(action.payload.category);
    state.availableCategories.sort();
   }
  })
  .addCase(createQuestion.rejected, (state, action) => {
   state.loading = false;
   state.error = action.payload;
   state.success = false;
  })

  // --- Admin Update Question Cases ---
  .addCase(updateQuestion.pending, (state) => {
   state.loading = true;
   state.success = false;
  })
  .addCase(updateQuestion.fulfilled, (state, action) => {
   state.loading = false;
   state.success = true;
   // Replace the old question with the updated one
   state.questions = state.questions.map(q => 
    q._id === action.payload._id ? action.payload : q
   );
  })
  .addCase(updateQuestion.rejected, (state, action) => {
   state.loading = false;
   state.error = action.payload;
   state.success = false;
  })

  // --- Admin Delete Question Cases ---
  .addCase(deleteQuestion.pending, (state) => {
   state.loading = true;
   state.success = false;
  })
  .addCase(deleteQuestion.fulfilled, (state, action) => {
   state.loading = false;
   state.success = true;
   // Remove the deleted question from the list
   state.questions = state.questions.filter(q => q._id !== action.payload);
  })
  .addCase(deleteQuestion.rejected, (state, action) => {
   state.loading = false;
   state.error = action.payload;
   state.success = false;
  })
 
 // --- User Test Questions Cases (Quiz Fetch) ---
 .addCase(getTestQuestions.pending, (state) => {
  state.testLoading = true;
  state.testError = null;
  state.testQuestions = null;
 })
 .addCase(getTestQuestions.fulfilled, (state, action) => {
  state.testLoading = false;
  state.testQuestions = action.payload; // Store the randomized questions here
 })
 .addCase(getTestQuestions.rejected, (state, action) => {
  state.testLoading = false;
  state.testError = action.payload;
 });
},
});

export const { resetQuestionSuccess, addCategory } = questionSlice.actions;

export default questionSlice.reducer;