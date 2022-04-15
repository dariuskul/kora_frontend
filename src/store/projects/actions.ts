import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { getAllProjects, postProject, updateProject } from "services/tracking.service";
import { CreateProject, GetProjects, UpdateProject } from "store/types/Project";
import { ICreateProjectValues, IUpdateProject } from "store/projects/types";

export const getProjects = createAsyncThunk(GetProjects.GetProjects, async (filters: any | undefined = {}, { rejectWithValue }) => {
  try {
    const response = await getAllProjects(filters);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
  }
})


export const createProject = createAsyncThunk(CreateProject.CreateProject, async (values: ICreateProjectValues, { rejectWithValue }) => {
  const { name, isPublic } = values;
  try {
    const response = await postProject(name, isPublic);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
  }
})

export const modifyProject = createAsyncThunk(UpdateProject.UpdateProject, async (values: IUpdateProject, { rejectWithValue }) => {
  try {
    const response = await updateProject(values.projectId, values.projectInfo);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
  }
})
