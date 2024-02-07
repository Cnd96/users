import { configureStore } from "@reduxjs/toolkit";
import usersListReducer from "./user.slice";

export const store = configureStore({
  reducer: {
    users: usersListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
