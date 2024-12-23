import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

const user = JSON.parse(localStorage.getItem('user'));
console.log(user);
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

// Logout
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

// Login
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  const data = await authService.login(user);
  console.log(data);
  // Checa se deu erro
  if (data.errors) {
    return thunkAPI.rejectWithValue(data.errors[0]);
  }

  return data;
});

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
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
      state.user = null;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.user = null;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.success = true;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
      state.user = null;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
