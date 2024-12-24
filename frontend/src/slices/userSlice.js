import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../services/userService';

const initialState = {
  user: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

export const profile = createAsyncThunk(
  'user/profile',
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await userService.profile(user, token);
    return data;
  }
);

export const updateProfile = createAsyncThunk(
  'user/update',
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await userService.updateProfile(user, token);
    // Check for errors
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const getUserDetails = createAsyncThunk('user/get', async (id) => {
  const data = await userService.getUserDetails(id);
  return data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
      state.error = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(profile.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(profile.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.user = action.payload;
    });
    builder.addCase(profile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
      state.user = null;
    });
    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.user = action.payload;
      state.message = 'Updated successfully!';
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
      state.user = {};
    });
    builder.addCase(getUserDetails.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.user = action.payload;
    });
  },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;
