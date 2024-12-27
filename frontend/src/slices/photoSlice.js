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

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const getUserPhotos = createAsyncThunk(
  'photo/userPhotos',
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.getUserPhotos(id, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const deletePhoto = createAsyncThunk(
  'photo/delete',
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.deletePhoto(id, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const updatephoto = createAsyncThunk(
  'photo/update',
  async (photoData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    const data = await photoService.updatePhoto(
      { title: photoData.title },
      photoData.id,
      token
    );

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const getPhotoById = createAsyncThunk(
  'photo/getphoto',
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.getPhotoById(id, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const likePhoto = createAsyncThunk(
  'photo/like',
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.likePhoto(id, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const commentPhoto = createAsyncThunk(
  'photo/comment',
  async (commentData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.commentPhoto(
      { comment: commentData.comment },
      commentData.id,
      token
    );
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const getAllPhotos = createAsyncThunk(
  'photo/getall',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.getAllPhotos(token);

    return data;
  }
);

export const searchPhoto = createAsyncThunk(
  'photo/search',
  async (query, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await photoService.searchPhoto(query, token);

    return data;
  }
);

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(publishPhoto.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(publishPhoto.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.photo = action.payload;
      state.photos.unshift(state.photo);
      state.message = 'Photo published successfully!';
    });
    builder.addCase(publishPhoto.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
      state.photo = {};
    });
    builder.addCase(getUserPhotos.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUserPhotos.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.photos = action?.payload;
    });
    builder.addCase(deletePhoto.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deletePhoto.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.photos = state.photos.filter((photo) => {
        return photo._id !== action.payload.id;
      });
      state.message = action.payload.message;
    });
    builder.addCase(deletePhoto.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.photo = {};
    });

    builder.addCase(updatephoto.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatephoto.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.photos.map((photo) => {
        if (photo._id === action.payload.photo._id) {
          return (photo.title = action.payload.photo.title);
        }
        return photo;
      });
      state.message = action.payload.message;
    });
    builder.addCase(updatephoto.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.photo = {};
    });
    builder.addCase(getPhotoById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getPhotoById.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.photo = action?.payload;
    });
    builder.addCase(likePhoto.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      if (state.photo.likes) {
        state.photo.likes.push(action.payload.userId);
      }
      state.photos.map((photo) => {
        if (photo._id === action.payload.photoId) {
          return photo.likes.push(action.payload.userId);
        }
        return photo;
      });
      state.message = action.payload.message;
    });
    builder.addCase(likePhoto.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(commentPhoto.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.message = action.payload.message;
      state.photo.comments.unshift(action.payload.userComment);
    });
    builder.addCase(commentPhoto.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getAllPhotos.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getAllPhotos.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.photos = action?.payload;
    });
    builder.addCase(searchPhoto.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(searchPhoto.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.photos = action?.payload;
    });
  },
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;
