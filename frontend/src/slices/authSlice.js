import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  error: false,
  success: false,
  loading: false,
};

// Cadastro e login automático
// padrão do nome -> entidade (auth) / ação (register)
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    const data = await authService.register(user);

    // Checa se deu erro
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.success = true;
        state.user = action.payload
      });
      builder.addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;