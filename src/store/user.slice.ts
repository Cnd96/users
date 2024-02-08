import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import UseApi from "../helpers/api";
import { User, UsersListDataResponse } from "@/types/users";

const initialState: {
  usersList: User[];
} = {
  usersList: [],
};

const usersListSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
      const { id, updatedUser } = action.payload;
      state.usersList = state.usersList.map((user) =>
        user.login.uuid === id ? { ...user, ...updatedUser } : user
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getUsersListAsync.fulfilled,
      (state, action: PayloadAction<UsersListDataResponse>) => {
        state.usersList = action.payload.results;
      }
    );
  },
});

export const getUsersListAsync = createAsyncThunk(
  "user/getUsersListAsync",
  async () => {
    // Only fetching 20 users and only neccesary fileds
    const response = await UseApi().fetch<UsersListDataResponse>(
      `?results=20&inc=name,gender,phone,email,picture,location,login`,
      "GET"
    );
    return response;
  }
);

export const { updateUser } = usersListSlice.actions;
export default usersListSlice.reducer;
