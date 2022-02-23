import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authApi } from 'src/redux/api/authApi';
import type { User } from 'src/models/user.model';
import type { RootState } from 'src/redux/store';
type AuthState = {
  user: User | null;
  token: string | null;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = user;
      state.token = token;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.user = payload;
    });
  }
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
