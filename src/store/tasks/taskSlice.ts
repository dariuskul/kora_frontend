import { createSlice } from "@reduxjs/toolkit";
import { reducer, thunkReducer } from "store/tasks/reducer";
import { initialTaskState } from "store/types/Task";

const taskSlice = createSlice({
  name: 'tasksState',
  initialState: initialTaskState,
  extraReducers: thunkReducer,
  reducers: reducer
})

export default taskSlice.reducer;