import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  fullName: string | null;
  email: string | null;
  role: string | null;
}

const initialState: UserState = {
  id: null,
  fullName: null,
  email: null,
  role: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Omit<UserState, 'isAuthenticated'>>) {
      return { ...action.payload };
    },
    logoutUser(state) {
      return { ...initialState };
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
