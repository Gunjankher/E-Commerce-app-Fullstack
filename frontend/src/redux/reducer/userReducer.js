import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    userExist: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    userNotExist: (state, action) => {
      state.loading = true;
    state.user = null
    },
  },
});

export const {userExist,userNotExist} = userReducer.actions