import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { createProject, getProjects } from "store/projects/actions";
import { TInitialProjectState } from "store/types/Project";

const reducer = {};

const thunkReducer = (builder: ActionReducerMapBuilder<TInitialProjectState>) => {
  builder.addCase(getProjects.fulfilled, (state, { payload }) => {
    state.projects = payload;
  });
  builder.addCase(createProject.fulfilled, (state, { payload }) => {
    state.projects.push(payload);
  })
};

export { reducer, thunkReducer };