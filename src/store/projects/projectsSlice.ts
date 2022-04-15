import { createSlice } from "@reduxjs/toolkit";
import { reducer, thunkReducer } from "store/projects/reducer";
import { initialProjectState } from "store/types/Project";

const projectsSlice = createSlice({
  name: 'projectsState',
  initialState: initialProjectState,
  extraReducers: thunkReducer,
  reducers: reducer
})

export default projectsSlice.reducer;