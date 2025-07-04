import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';


interface UserState {
  user: null | Record<string, string>;
}

const initialState: UserState = {
  user: null,
};


export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user: Record<string, string>, { rejectWithValue }) => {
    try {
      if (!user.name || !user.email) throw new Error('Registration failed');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials: Record<string, string>, { rejectWithValue }) => {
    try {
      if (!credentials.email || !credentials.password) throw new Error('Login failed');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return credentials;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Record<string, string>>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<Record<string, string>>) => {
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state) => {
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<Record<string, string>>) => {
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.user = null;
      });
  }

});


export const { setUser } = userSlice.actions;


export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
