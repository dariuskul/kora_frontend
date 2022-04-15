import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { getAllTasks, getCurrentTimer, getTimeEntries, startTask, stopTask } from "store/tasks/actions";
import { ITasks } from "store/types/Task";

const reducer = {
};

const thunkReducer = (builder: ActionReducerMapBuilder<ITasks>) => {
  builder.addCase(getTimeEntries.fulfilled, (state, { payload }) => {
    state.timeEntries = [...payload];
  });
  builder.addCase(getAllTasks.fulfilled, (state, { payload }) => {
    state.tasks = [...payload];
  });
  builder.addCase(stopTask.fulfilled, (state, { payload }) => {
    state.timeEntries = [...payload];
    state.currentTimer = undefined;

  })
  builder.addCase(getCurrentTimer.fulfilled, (state, { payload }) => {
    state.currentTimer = payload;
  })
  builder.addCase(startTask.fulfilled, (state, { payload }) => {
    state.currentTimer = payload;
  })
};


export { reducer, thunkReducer };