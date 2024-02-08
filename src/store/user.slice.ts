import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import UseApi from "../helpers/api";
import { User, UsersListDataResponse } from "../types/users";

const initialState: {
  usersList: User[];
} = {
  usersList: [],
};

const usersListSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
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
    console.log("getting data apii ");
    const response = await UseApi().fetch<UsersListDataResponse>(
      `?results=10&inc=name,gender,phone,email,picture,location,login`,
      "GET"
    );
    return response;
  }
);

export const {} = usersListSlice.actions;
export default usersListSlice.reducer;
