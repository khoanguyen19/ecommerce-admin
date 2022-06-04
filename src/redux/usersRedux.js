import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    // GET ALL PRODUCTS
    getUsersStart: (state) => {
      state.isFetching = true;
    },
    getUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    getUsersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // DELETE PRODUCTS
    deleteUsersStart: (state) => {
      state.isFetching = true;
    },
    deleteUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.users.splice(
        state.users.findIndex((u) => u._id === action.payload),
        1
      );
    },
    deleteUsersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // UPDATE PRODUCTS
    updateUsersStart: (state) => {
      state.isFetching = true;
    },
    updateUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.users[state.users.findIndex((p) => p._id === action.payload._id)] =
        action.payload.user;
    },
    updateUsersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // ADD PRODUCTS
    addUsersStart: (state) => {
      state.isFetching = true;
    },
    addUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.users.push(action.payload);
    },
    addUsersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  deleteUsersStart,
  deleteUsersSuccess,
  deleteUsersFailure,
  updateUsersStart,
  updateUsersSuccess,
  updateUsersFailure,
  addUsersStart,
  addUsersSuccess,
  addUsersFailure,
} = usersSlice.actions;

export default usersSlice.reducer;
