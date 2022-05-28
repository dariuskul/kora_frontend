import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { createNewTask, getAllTasks, getAvailableTasks, getCurrentTimer, getTimeEntries, startTask, stopTask } from "store/tasks/actions";
import { ITasks } from "store/types/Task";

const reducer = {
  stopManually: (state: ITasks) => {
    return {
      ...state,
      currentTimer: undefined,
    }
  }
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
  builder.addCase(getAvailableTasks.fulfilled, (state, { payload }) => {
    state.availableTasks = payload;
  })
  builder.addCase(createNewTask.fulfilled, (state, { payload }) => {
    state.tasks.push(payload);
    state.availableTasks.push(payload);
  });
};


export { reducer, thunkReducer };