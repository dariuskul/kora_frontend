import { createSlice } from "@reduxjs/toolkit";
import { initialUsersState } from "store/types/User";

import { reducer, thunkReducer } from './reducer';

const usersSlice = createSlice({
  name: 'userState',
  initialState: initialUsersState,
  reducers: reducer,
  extraReducers: thunkReducer
})

export const {
  logout
} = usersSlice.actions;

export default usersSlice.reducer;