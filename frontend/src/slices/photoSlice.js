import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import photoService from '../services/photoService';

const initialState = {
  photos: [],
  photo: {},
  error: false,
  success: false,
  loading: false,
  message: null,
};

export const publishPhoto = createAsyncThunk(
  'photo/publish',
  async (photo, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.publishPhoto(photo, token);

    if (data.erros) {
      return thunkAPI.rejectWithValue(data.erros[0]);
    }

    return data;
  }
);

export const getUserPhotos = createAsyncThunk(
    'photo/userPhotos',
    async (id, thunkAPI) => {
      const token = thunkAPI.getState().auth.user.token;
      const data = await photoService.getUserPhotos(id, token);
  
      if (data.erros) {
        return thunkAPI.rejectWithValue(data.erros[0]);
      }
  
      return data;
    }
  );

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
      state.error = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(publishPhoto.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(publishPhoto.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.photo = action.payload;
      state.photos.unshift(state.photo);
      state.message = "Photo published successfulyy!"
    });
    builder.addCase(publishPhoto.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
      state.photo = {};
    });
    builder.addCase(getUserPhotos.pending, (state) => {
        state.loading = true;
        state.error = false;
      });
      builder.addCase(getUserPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.photo = action.payload;
      });
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
