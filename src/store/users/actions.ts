import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TokenStorage } from 'constants/tokenStorage';
import { removeUser } from 'services/admin.service';

import { loginUser, update } from 'services/auth.service';
import { LoginUser, RemoveUser, UpdateUser } from 'store/types/User';
import { ILoginValues, IUpdateValues } from 'store/users/types';

export const login = createAsyncThunk(LoginUser.Login, async (values: ILoginValues, { rejectWithValue }) => {
  const { email, password } = values;
  try {
    const response = await loginUser(email, password);
    TokenStorage.storeToken(response.data.token);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
  }
})

export const updateUser = createAsyncThunk(UpdateUser.UpdateUser, async (values: IUpdateValues, { rejectWithValue }) => {
  try {
    await update(values);
    return values;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
  }
})

export const removeEmployee = createAsyncThunk(RemoveUser.RemoveUser, async (value: string, { rejectWithValue }) => {
  try {
    await removeUser(value);
    return value;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
  }
})