import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { createTask, fetchAvailableTasks, fetchTimeEntries, getCurrent, getTasks, startTimer, stopTimer } from "services/tracking.service";
import { CreateNewTask, GetAvailableTasks, GetCurrentTimer, GetTasks, GetTimeEntries, StartTimer, StopTimer, TCreateTask, TGetAvailableTasks } from "store/types/Task";

export const getTimeEntries = createAsyncThunk(GetTimeEntries.GetTimeEntries, async (_, { rejectWithValue }) => {
  try {
    const response = await fetchTimeEntries();
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
  }
})

export const getAllTasks = createAsyncThunk(GetTasks.GetTasks, async (_, { rejectWithValue }) => {
  try {
    const response = await getTasks();
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
  }
})

export const startTask = createAsyncThunk(StartTimer.StartTimer, async (id: number, { rejectWithValue }) => {
  try {
    const response = await startTimer(id);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
  }
})

export const stopTask = createAsyncThunk(StopTimer.StopTimer, async (_, { rejectWithValue }) => {
  try {
    await stopTimer();
    const response = await fetchTimeEntries();
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
  }
})

export const getCurrentTimer = createAsyncThunk(GetCurrentTimer.GetCurrentTimer, async (_, { rejectWithValue }) => {
  try {
    const response = await getCurrent();
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
  }
})

export const createNewTask = createAsyncThunk(CreateNewTask.CreateNewTask, async (values: TCreateTask, { rejectWithValue }) => {
  const { description, projectId } = values;
  try {
    const response = await createTask(description, projectId);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
  }
})

export const getAvailableTasks = createAsyncThunk(GetAvailableTasks.GetAvailableTasks, async (values: TGetAvailableTasks, { rejectWithValue }) => {
  try {
    const response = await fetchAvailableTasks(values.projectId, values.assigneeId);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
  }
})

