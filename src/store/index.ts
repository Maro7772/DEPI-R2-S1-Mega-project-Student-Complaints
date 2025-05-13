import { configureStore } from "@reduxjs/toolkit";
import complaintsReducer from "./complaints/complaintsSlice";
import userReducer from "./users/userSlice";

export const store = configureStore({
  reducer: {
    complaints: complaintsReducer ,
      user: userReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

