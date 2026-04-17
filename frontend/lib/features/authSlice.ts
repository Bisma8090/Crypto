'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
  createdAt?: string;
}

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
}

const getInitialState = (): AuthState => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('cc_token');
    const userStr = localStorage.getItem('cc_user');
    if (token && userStr) {
      try {
        return { token, user: JSON.parse(userStr), isAuthenticated: true };
      } catch {
        // ignore
      }
    }
  }
  return { token: null, user: null, isAuthenticated: false };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null, user: null, isAuthenticated: false } as AuthState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ token: string; user: AuthUser }>) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem('cc_token', action.payload.token);
        localStorage.setItem('cc_user', JSON.stringify(action.payload.user));
      }
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('cc_token');
        localStorage.removeItem('cc_user');
      }
    },
    hydrateAuth(state) {
      const initial = getInitialState();
      state.token = initial.token;
      state.user = initial.user;
      state.isAuthenticated = initial.isAuthenticated;
    },
  },
});

export const { setCredentials, logout, hydrateAuth } = authSlice.actions;
export default authSlice.reducer;
