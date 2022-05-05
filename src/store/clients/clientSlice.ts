import { createSlice } from "@reduxjs/toolkit";
import { reducer, thunkReducer } from "store/clients/reducer";
import { initialClientState } from "store/clients/types";

const clientSlice = createSlice({
  name: 'clientSlice',
  initialState: initialClientState,
  reducers: reducer,
  extraReducers: thunkReducer,
})

export default clientSlice.reducer;