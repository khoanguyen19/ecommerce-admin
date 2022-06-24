import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const INITIAL_STATE = {
  currentUser: null,
  isFetching: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    loginCancel: (state) => {
      state.isFetching = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => INITIAL_STATE);
  },
});

export const { loginStart, loginSuccess, loginFailure, loginCancel } =
  userSlice.actions;

export default userSlice.reducer;
