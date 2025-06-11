import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  fullName: string | null;
  email: string | null;
  role: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  id: null,
  fullName: null,
  email: null,
  role: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Omit<UserState, 'isAuthenticated'>>) {
      return { ...action.payload, isAuthenticated: true };
    },
    logoutUser(state) {
      return { ...initialState, isAuthenticated: false };
    },
    checkAuth(state) {
      // Since we're using cookies, we don't need to check localStorage
      return state;
    }
  },
});

export const { setUser, logoutUser, checkAuth } = userSlice.actions;
export default userSlice.reducer;
