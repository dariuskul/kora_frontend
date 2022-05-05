import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createClient, deleteClient, getClients, patchClient } from "services/admin.service";
import { IUpdateClient } from "store/clients/types";

export const fetchClients = createAsyncThunk('clients/getAll', async (_, { rejectWithValue }) => {
  try {
    const response = await getClients();
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
  }
})

export const postClient = createAsyncThunk('clients/create', async (name: string, { rejectWithValue }) => {
  try {
    const response = await createClient(name);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
  }
})

export const removeClient = createAsyncThunk('clients/remove', async (id: number, { rejectWithValue }) => {
  try {
    await deleteClient(id);
    return id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
  }
});

export const updateClient = createAsyncThunk('clients/updated', async (client: IUpdateClient, { rejectWithValue }) => {
  try {
    const response = await patchClient(client);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
  }
});